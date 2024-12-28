<template>
  <div class="my-recipes-page">
    <h2>Mes recettes</h2>
    <div>
      <button @click="toggleFavorites">
        {{ showFavorites ? 'Afficher toutes les recettes' : 'Afficher mes favoris' }}
      </button>
    </div>
    <div v-if="filteredRecipes.length === 0" class="no-recipes">
      <p>Aucune recette trouvée dans les favoris.</p>
    </div>
    <div v-if="recipes.length === 0" class="no-recipes">
      <p>Aucune recette n'a été enregistrée pour le moment.</p>
    </div>
    <div v-else class="recipes-list">
      <div v-for="recipe in filteredRecipes" :key="recipe.recipe_id" class="recipe-card">
        <h3>{{ recipe.recipe_name }}</h3>
        <div class="favorite-icon" v-if="recipe.isFavorite">
          <i class="bi bi-heart-fill" style="color: red;"></i> <!-- Icône de favori remplie -->
        </div>
        <img v-if="recipe.image_url" :src="recipe.image_url" alt="Image de la recette" class="modal-recipe-image" />
        <button @click="openModal(recipe)">Voir les détails</button>
        <div v-if="getMissingAllergens(recipe).length > 0" class="attention-warning">
          <i class="bi bi-exclamation-triangle-fill"></i>
          <p>
            Ces allergènes ne sont pas pris en compte dans cette recette :
            <strong>{{ getMissingAllergens(recipe).join(', ') }}</strong>.
          </p>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">X</button>
        <h3>{{ currentRecipe.recipe_name }}</h3>
        <img v-if="currentRecipe.image_url" :src="currentRecipe.image_url" alt="Image de la recette" class="recipe-image" />
        <div class="recipe-info-container">
          <div class="recipe-info-line">
            <div class="info-item"><strong>Généré par l'IA :</strong> {{ currentRecipe.created_by_ai ? 'Oui' : 'Non' }}</div>
            <div class="info-item"><strong>Temps de préparation:</strong> {{ currentRecipe.preparation_time }}</div>
            <div class="info-item"><strong>Difficulté:</strong> {{ currentRecipe.difficulty }}</div>
            <div class="info-item"><strong>Nombre de personnes:</strong> {{ currentRecipe.number_of_person }}</div>
          </div>
          <div class="recipe-info-line">
            <div class="info-item"><strong>Cuisine:</strong> {{ currentRecipe.cuisine_type }}</div>
            <div class="info-item"><strong>Type:</strong> {{ currentRecipe.category_type }}</div>
            <div class="info-item">
              <strong>Sans allergène :</strong> {{ currentRecipe.allergens_list?.join(', ') || 'Pas de mention' }}
            </div>
          </div>
        </div>
        <h4>Ingrédients</h4>
        <ul>
          <li v-for="(ingredient, index) in currentRecipe.ingredients" :key="index">
            {{ ingredient.quantity }} {{ ingredient.food_name }}
          </li>
        </ul>
        <h4>Instructions</h4>
        <ol>
          <li v-for="(step, index) in formattedInstructionsArray" :key="index">
            {{ step }}
          </li>
        </ol>
        <div>
          <button v-if="!isFavorite" @click="addToFavorites">Ajouter aux favoris</button>
          <button v-else @click="removeFromFavorites">Retirer des favoris</button>
        </div>
        <button @click="addToShoppingList">Ajouter à la liste des courses</button>
        <button @click="openEditModal">Modifier</button>
        <button @click="confirmDeleteRecipe">Supprimer</button>
        <button @click="closeModal">Fermer</button>
      </div>
    </div>
    <EditRecipe
      v-if="showEditModal"
      mode="edit"
      :isVisible="showEditModal"
      @close="closeEditModal"
      @update-recipe="handleUpdateRecipe"
      :recipe="currentRecipe"
    />
  </div>
</template>

<script>
import axios from 'axios';
import EditRecipe from '@/components/EditRecipe.vue';
export default {
  name: 'MyRecipesPage',
  components: { EditRecipe },
  data() {
    return {
      recipes: [],
      userAllergens: [],
      filteredRecipes: [],
      showModal: false,
      showEditModal: false,
      currentRecipe: null,
      errorMessage: '',
      isFavorite: false,
      showFavorites: false, 
    };
  },
  computed: {
    formattedInstructionsArray() {
    if (!this.currentRecipe?.instructions) {
      return [];
    }
    if (typeof this.currentRecipe.instructions === "string") {
      return this.currentRecipe.instructions
        .split("\n")
        .filter((step) => step.trim() !== "");
    } else if (Array.isArray(this.currentRecipe.instructions)) {
      return this.currentRecipe.instructions.map((stepObj) =>
        typeof stepObj === "object" ? stepObj.step : stepObj
      );
    }
    return [];
  },
},
  methods: {
    toggleFavorites() {
      this.showFavorites = !this.showFavorites;
      this.filterRecipes();
    },
    filterRecipes() {
      if (this.showFavorites) {
        this.filteredRecipes = this.recipes.filter(recipe => recipe.isFavorite);
      } else {
        this.filteredRecipes = this.recipes;
      }
    },
    async fetchUserRecipes() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/recipes/user`, {
          withCredentials: true,
        });
        const favoritesResponse = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/recipes/favorites`, {
        withCredentials: true,
      });

      const favoriteIds = favoritesResponse.data.map(fav => fav.recipe_id);

      this.recipes = response.data.map(recipe => ({
        ...recipe,
        isFavorite: favoriteIds.includes(recipe.recipe_id),
      }));

      this.filterRecipes();
      } catch (error) {
        console.error('Erreur lors de la récupération des recettes utilisateur :', error);
        this.errorMessage = 'Une erreur est survenue lors de la récupération de vos recettes. Veuillez réessayer plus tard.';
      }
    },
    async loadUserAllergens() {
      this.userAllergens = await this.fetchUserAllergens();
    },
    async fetchUserAllergens() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/restrictions`, {
        withCredentials: true
      });

      return response.data.restrictions || [];
      } catch (error) {
        console.error('Erreur lors de la récupération des restrictions alimentaires :', error);
        alert('Impossible de récupérer les restrictions alimentaires. Veuillez réessayer.');
        return [];
      }
    },
    getMissingAllergens(recipe) {
      if (!this.userAllergens.length) return [];
      if (!recipe.allergens_list) return [...this.userAllergens];
      return this.userAllergens.filter((allergen) => !recipe.allergens_list.includes(allergen));
    },
    async addToShoppingList() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_URL_BACKEND}/shopping-list/add`,
          {
            recipeId: this.currentRecipe.recipe_id
          },
          { withCredentials: true }
        );
        alert(response.data.message);
      } catch (error) {
        console.error('Erreur lors de l\'ajout à la liste des courses:', error);
        alert('Une erreur est survenue.');
      }
    },
    async deleteRecipe() {
      try {
        await axios.delete(`${process.env.VUE_APP_URL_BACKEND}/recipes/${this.currentRecipe.recipe_id}`, {
          withCredentials: true
        });
        this.recipes = this.recipes.filter(recipe => recipe.recipe_id !== this.currentRecipe.recipe_id);
        alert('Recette supprimée avec succès.');
        this.closeModal();
      } catch (error) {
        console.error('Erreur lors de la suppression de la recette :', error);
        alert('Une erreur est survenue lors de la suppression.');
      }
    },
    async handleUpdateRecipe(updatedRecipe) {
      try {
        const formData = new FormData();
        formData.append('title', updatedRecipe.recipe_name);
        formData.append('time', updatedRecipe.preparation_time);
        formData.append('difficulty', updatedRecipe.difficulty);
        formData.append('people', updatedRecipe.number_of_person);
        formData.append('cuisine', updatedRecipe.cuisine_type);
        formData.append('type', updatedRecipe.category_type);
        formData.append('public', updatedRecipe.public);
        formData.append('ingredients', JSON.stringify(updatedRecipe.ingredients));
        formData.append('instructions', JSON.stringify(updatedRecipe.instructions));
        formData.append('restrictionsList', JSON.stringify(updatedRecipe.allergens_list));
        if (updatedRecipe.image) {
          formData.append('image', updatedRecipe.image);
        }

        const response = await axios.put(
          `${process.env.VUE_APP_URL_BACKEND}/recipes/update/${updatedRecipe.recipe_id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert('Recette mise à jour avec succès');
          updatedRecipe.image_url = response.data.updatedRecipe.image_url;

          this.updateRecipe(updatedRecipe);
          this.currentRecipe = { ...this.currentRecipe, ...updatedRecipe };

          this.updateRecipe(updatedRecipe);
          this.currentRecipe = {
            ...updatedRecipe,
            instructions: Array.isArray(updatedRecipe.instructions)
            ? updatedRecipe.instructions.map((step) =>
              typeof step === "object" ? step.step : step
            ).join("\n")
            : updatedRecipe.instructions,
          };
        }
        this.closeEditModal();
    
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la recette :", error);
        alert("Une erreur est survenue lors de la mise à jour de la recette.");
      }
    }, 
    async addToFavorites() {
      try {
        if (!this.currentRecipe?.recipe_id) {
          throw new Error("Aucune recette sélectionnée pour ajouter aux favoris.");
        }

        const response = await axios.post(
          `${process.env.VUE_APP_URL_BACKEND}/recipes/favorites/add`,
          {
            recipeId: this.currentRecipe.recipe_id,
          },
          { withCredentials: true }
        );
        alert(response.data.message || 'Recette ajoutée aux favoris avec succès.');

        this.isFavorite = true;
        this.currentRecipe.isFavorite = true;

        const recipeIndex = this.recipes.findIndex(r => r.recipe_id === this.currentRecipe.recipe_id);
        if (recipeIndex !== -1) {
          this.recipes[recipeIndex].isFavorite = true;
        }

        this.filterRecipes();

      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert('Cette recette est déjà dans vos favoris.');
        } else {
          console.error("Erreur lors de l'ajout aux favoris :", error);
          alert("Une erreur est survenue lors de l'ajout aux favoris.");
        }
      }
    },
    async checkIfFavorite(recipeId) {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_URL_BACKEND}/recipes/favorites/check/${recipeId}`,
          { withCredentials: true }
        );
        this.isFavorite = response.data.isFavorite;
      } catch (error) {
        console.error("Erreur lors de la vérification du statut des favoris :", error);
        this.isFavorite = false;
      }
    },
    async removeFromFavorites() {
      try {
        if (!this.currentRecipe?.recipe_id) {
          throw new Error("Aucune recette sélectionnée pour retirer des favoris.");
        }
        const response = await axios.delete(
          `${process.env.VUE_APP_URL_BACKEND}/recipes/favorites/remove/${this.currentRecipe.recipe_id}`,
          { withCredentials: true }
        );
        alert(response.data.message || 'Recette retirée des favoris avec succès.');
        
        this.isFavorite = false;
        this.currentRecipe.isFavorite = false;

        const recipeIndex = this.recipes.findIndex(r => r.recipe_id === this.currentRecipe.recipe_id);

        if (recipeIndex !== -1) {
          this.recipes[recipeIndex].isFavorite = false;
        }

        this.filterRecipes();
      } catch (error) {
        console.error("Erreur lors du retrait des favoris :", error);
        alert("Une erreur est survenue lors du retrait des favoris.");
      }
    },      
    confirmDeleteRecipe() {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ? Cette action est irréversible.')) {
        this.deleteRecipe();
      }
    },
    async openModal(recipe) {
      this.currentRecipe = recipe;
      this.showModal = true;

      if (this.currentRecipe?.recipe_id) {
        await this.checkIfFavorite(this.currentRecipe.recipe_id);
      }
    },
    closeModal() {
      this.showModal = false;
      this.currentRecipe = null;
    },
    openEditModal() {
    this.showEditModal = true;
    },
    closeEditModal() {
    this.showEditModal = false;
    },
    updateRecipe(updatedRecipe) {
      const index = this.recipes.findIndex(recipe => recipe.recipe_id === updatedRecipe.recipe_id);
      if (index !== -1) {
        const existingRecipe = this.recipes[index];
        updatedRecipe.image_url = updatedRecipe.image_url || existingRecipe.image_url;
        this.recipes[index] = { ...existingRecipe, ...updatedRecipe };
      }
      this.closeEditModal();
    },
  },
  mounted() {
    this.fetchUserRecipes();
    this.loadUserAllergens();
  },
};
</script>

<style scoped>
.my-recipes-page {
  text-align: center;
}
.recipes-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
.recipe-card {
  background: #222;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}
.recipe-card img {
  max-width: 100%;
  border-radius: 10px;
}
button {
  background-color: #444;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #555;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 700px;
  text-align: left;
}
.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
.recipe-info-container {
  margin-bottom: 20px;
}
.recipe-info-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 15px;
}
.error-message {
  background-color: #ffcccc;
  color: #cc0000;
  border: 1px solid #cc0000;
  padding: 10px;
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
  border-radius: 5px;
}
.no-recipes {
  text-align: center;
  font-size: 1.2em;
  color: #666;
  margin-top: 20px;
}
.recipe-image {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
  object-fit: cover;
}
.modal-recipe-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
  object-fit: contain;
}
.attention-warning {
  margin-top: 10px;
  color: red;
  display: flex;
  align-items: center;
  gap: 10px;
}
.attention-warning i {
  font-size: 20px;
}
.attention-warning p {
  font-size: 0.9em;
  margin: 0;
}
.favorite-icon {
  display: inline-block;
  margin-left: 10px;
  font-size: 20px;
}
.favorite-icon i {
  color: red;
}
</style>

  