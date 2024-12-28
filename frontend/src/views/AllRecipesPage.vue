<template>
  <div class="recipe-page">
    <h2>Toutes les recettes</h2>
    <div v-if="recipes.length === 0" class="no-recipes">
      <p>Aucune recette n'a été enregistrée pour le moment.</p>
    </div>
    <div v-else class="recipes-list">
      <div v-for="(recipe, index) in recipes" :key="recipe.recipe_id" class="recipe-card">
        <h3>{{ recipe.recipe_name }}</h3>
        <img v-if="recipe.image_url" :src="recipe.image_url" alt="Image de la recette" class="modal-recipe-image" />
        <button @click="openModal(index)">Voir les détails</button>
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
        <button @click="addToShoppingList">Ajouter à la liste des courses</button>
        <button @click="closeModal">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AllRecipesPage',
  data() {
    return {
      recipes: [],
      userAllergens: [],
      showModal: false,
      currentRecipe: null,
      errorMessage: ''
    };
  },
  computed: {
    formattedInstructionsArray() {
      return this.currentRecipe?.instructions ? this.currentRecipe.instructions.split('\n').filter((step) => step.trim() !== '') : [];
    },
  },
  methods: {
    async fetchRecipes() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/recipes/all`, {
          withCredentials: true ,
        });
        this.recipes = response.data;
        this.errorMessage = '';
      } catch (error) {
        console.error('Erreur lors de la récupération des recettes :', error);
        this.errorMessage = 'Une erreur est survenue lors de la récupération des recettes. Veuillez réessayer plus tard.';
      }
    },
    async loadUserAllergens() {
      this.userAllergens = await this.fetchUserAllergens();
      console.log(this.userAllergens)
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
    openModal(index) {
      this.currentRecipe = this.recipes[index];
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.currentRecipe = null;
    }
  },
  mounted() {
    this.fetchRecipes();
    this.loadUserAllergens();
  },
};
</script>

<style scoped>
.recipe-page {
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
</style>