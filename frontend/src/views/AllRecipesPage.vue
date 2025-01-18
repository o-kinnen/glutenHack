<template>
  <div class="container">
    <div class="card p-4 text-white">
      <h2>Toutes les recettes</h2>
      <div v-if="recipes.length === 0" class="no-recipes">
        <p>Aucune recette a été rendue public par les autres utilisateurs pour le moment...</p>
      </div>
      <div v-else class="buttons-container">
        <button @click="showFilterModal = true" class="filter-button">
          Allergènes
        </button>
        <button @click="toggleFavorites">
          {{ showFavorites ? 'Toutes les recettes' : 'Favoris' }}
        </button>
        <button 
          @click="toggleProfileFilter" 
          class="profile-button" 
          :class="{ active: showProfileFilter }"
        >
          {{ showProfileFilter ? 'Toutes les recettes' : 'Mon profil' }}
        </button>
      </div>
      <div v-if="showFilterModal" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-filters">
            <label>
              <input type="checkbox" value="Gluten" v-model="selectedAllergens" />
              <span class="text-and-icon">
                <img src="/img/gluten.png" alt="Icone" class="restriction-icon" />
                  Gluten
              </span>
            </label>
            <label>
              <input type="checkbox" value="Lait" v-model="selectedAllergens" />
              <span class="text-and-icon">
                <img src="/img/lait.png" alt="Icone" class="restriction-icon" />
                  Lait
              </span>
            </label>
            <label>
              <input type="checkbox" value="Oeufs" v-model="selectedAllergens" />
              <span class="text-and-icon">
                <img src="/img/oeufs.png" alt="Icone" class="restriction-icon" />
                  Oeufs
              </span>
            </label>
            <label>
              <input type="checkbox" value="Arachide" v-model="selectedAllergens" />
              <span class="text-and-icon">
                <img src="/img/arachide.png" alt="Icone" class="restriction-icon" />
                  Arachide
              </span>
            </label>
            <label>
              <input type="checkbox" value="Fruits à coque" v-model="selectedAllergens" />
              <span class="text-and-icon">
                <img src="/img/noix.png" alt="Icone" class="restriction-icon" />
                  Noix
              </span>
            </label>
            <label>
              <input type="checkbox" value="Poissons" v-model="selectedAllergens" />
              <span class="text-and-icon">
                <img src="/img/poissons.png" alt="Icone" class="restriction-icon" />
                  Poissons
              </span>
            </label>
            <label>
              <input type="checkbox" value="Soja" v-model="selectedAllergens" />
              <span class="text-and-icon">
                <img src="/img/soja.png" alt="Icone" class="restriction-icon" />
                  Soja
              </span>
            </label>
            <label>
              <input type="checkbox" value="Crustacés" v-model="selectedAllergens" />
              <span class="text-and-icon">
                <img src="/img/crustacés.png" alt="Icone" class="restriction-icon" />
                  Crustacés
              </span>
            </label>
            <label>
              <input type="checkbox" value="Moutarde" v-model="selectedAllergens" />
              <span class="text-and-icon">
                <img src="/img/moutarde.png" alt="Icone" class="restriction-icon" />
                  Moutarde
              </span>
            </label>
            <label>
              <input type="checkbox" value="Céleri" v-model="selectedAllergens" />
              <span class="text-and-icon">
                <img src="/img/céleri.png" alt="Icone" class="restriction-icon" />
                  Céleri
              </span>
            </label>
          </div>
          <div class="modal-actions">
            <button @click="showFilterModal = false" class="close-button">Fermer</button>
          </div>
        </div>
      </div>
      <div v-if="showProfileFilter && userAllergens.length === 0" class="no-recipes">
        <p>Seules les recettes sans mention d'allergènes sont affichées car vous n'avez spécifié aucun allergène dans votre profil.</p>
      </div>
      <div v-if="(showFavorites && filteredRecipes.length === 0) || (filteredRecipes.length === 0 && recipes.length !== 0)" class="no-recipes">
        <p>Aucune recette trouvée...</p>
      </div>
      <div v-else class="recipes-list">
        <div v-for="recipe in filteredRecipes" :key="recipe.recipe_id" class="recipe-card">
          <h3>{{ recipe.recipe_name }}</h3>
          <div class="favorite-icon" v-if="recipe.isFavorite">
            <i class="bi bi-heart-fill" style="color: red;"></i>
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
        <div class="modal-content-recipe">
          <h3 style="text-align: center;">{{ currentRecipe.recipe_name }}</h3>
          <img v-if="currentRecipe.image_url" :src="currentRecipe.image_url" alt="Image de la recette" class="recipe-image" />
          <div class="recipe-info-container">
            <div class="recipe-info-line">
              <div class="info-item"><strong>Préparation:</strong><br> {{ currentRecipe.preparation_time }}</div>
              <div class="info-item"><strong>Difficulté:</strong><br> {{ currentRecipe.difficulty }}</div>
              <div class="info-item"><strong>Part(s):</strong><br> {{ currentRecipe.number_of_person }}</div>
            </div>
            <div class="recipe-info-line">
              <div class="info-item"><strong>Cuisine:</strong><br> {{ currentRecipe.cuisine_type }}</div>
              <div class="info-item"><strong>Type:</strong><br> {{ currentRecipe.category_type }}</div>
              <div class="info-item">
                <strong>Sans allergène :</strong><br>
                <span v-if="currentRecipe.allergens_list?.length">
                  <img 
                    v-for="(allergen, index) in currentRecipe.allergens_list" 
                    :key="index" 
                    :src="getAllergenIcon(allergen)" 
                    :alt="allergen" 
                    :title="allergen"
                    class="allergen-icon"
                  />
                </span>
                <span v-else>Pas de mention</span>
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
          <p style="text-align: center;" v-if="currentRecipe.averageRating === 0">Cette recette n'a pas encore été notée.</p>
          <p style="text-align: center;" v-else>Voici la note reçue de la recette.</p>
          <div class="average-rating">
            <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= currentRecipe.averageRating }">
              ★
            </span>
          </div>
          <div class="rating-container">
            <p style="text-align: center;">Noter la recette ?</p>
            <div class="stars">
              <span 
                v-for="star in 5" 
                :key="star" 
                class="star" 
                :class="{ filled: star <= currentRecipe.rating }"
                @click="rateRecipe(star)"
              >
                ★
              </span>
            </div>
          </div>
          <div class="modal-actions-icons">
            <i class="bi bi-heart-fill icon-action" 
              :class="{ active: isFavorite }" 
              @click="isFavorite ? removeFromFavorites() : addToFavorites()" 
              title="Ajouter/Retirer des favoris">
            </i>
            <i class="bi bi-cart-fill icon-action" 
              @click="addToShoppingList" 
              title="Ajouter à la liste des courses">
            </i>
            <i class="bi bi-file-earmark-pdf-fill icon-action" 
              @click="generatePDF" 
              title="Exporter en PDF">
            </i>
            <i class="bi bi-x-lg icon-action" 
              @click="closeModal" 
              title="Fermer">
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { jsPDF } from "jspdf";
export default {
  name: 'AllRecipesPage',
  data() {
    return {
      recipes: [],
      userAllergens: [],
      filteredRecipes: [],
      selectedAllergens: [],
      showProfileFilter: false,
      showModal: false,
      currentRecipe: null,
      errorMessage: '',
      isFavorite: false,
      showFavorites: false,
      showFilterModal: false
    };
  },
  computed: {
    formattedInstructionsArray() {
      return this.currentRecipe?.instructions ? this.currentRecipe.instructions.split('\n').filter((step) => step.trim() !== '') : [];
    },
  },
  methods: {
    toggleFavorites() {
      this.showFavorites = !this.showFavorites;
      this.filterRecipes();
    },
    toggleProfileFilter() {
      this.showProfileFilter = !this.showProfileFilter;
      this.filterRecipes();
    },
    getAllergenIcon(allergen) {
      const allergenIcons = {
        Gluten: '/img/gluten.png',
        Lait: '/img/lait.png',
        Oeufs: '/img/oeufs.png',
        Arachide: '/img/arachide.png',
        Noix: '/img/noix.png',
        Poissons: '/img/poissons.png',
        Soja: '/img/soja.png',
        Crustacés: '/img/crustacés.png',
        Moutarde: '/img/moutarde.png',
        Céleri: '/img/céleri.png',
      };
      return allergenIcons[allergen] || '/img/plat.png';
    },
    filterRecipes() {
      this.filteredRecipes = this.recipes.filter((recipe) => {
      const matchesFavorites = this.showFavorites ? recipe.isFavorite : true;
      const matchesAllergens = this.selectedAllergens.every(
        (allergen) => recipe.allergens_list?.includes(allergen)
      );
      const matchesProfile = this.showProfileFilter
        ? this.userAllergens.length === 0
        ? !recipe.allergens_list || 
        recipe.allergens_list.length === 0 || 
        recipe.allergens_list.includes("Pas de mention")
        : this.userAllergens.every((allergen) =>
          recipe.allergens_list?.includes(allergen)
        )
      : true;
        return matchesFavorites && matchesAllergens && matchesProfile;
      });
    },
    async convertImageToBase64(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = (error) => reject(error);
        img.src = url;
      });
    },
    async generatePDF() {
      if (!this.currentRecipe) {
        alert("Aucune recette sélectionnée pour générer le PDF.");
        return;
      }
      const doc = new jsPDF();
      let currentY = 10;
      doc.setFontSize(20);
      doc.text(this.currentRecipe.recipe_name, 10, currentY);
      currentY += 10;
      doc.setFontSize(12);
      doc.text(`Préparation: ${this.currentRecipe.preparation_time}`, 10, currentY);
      currentY += 10;
      doc.text(`Difficulté: ${this.currentRecipe.difficulty}`, 10, currentY);
      currentY += 10;
      doc.text(`Part(s): ${this.currentRecipe.number_of_person}`, 10, currentY);
      currentY += 10;
      doc.text(`Cuisine: ${this.currentRecipe.cuisine_type}`, 10, currentY);
      currentY += 10;
      doc.text(`Type: ${this.currentRecipe.category_type}`, 10, currentY);
      currentY += 10;
      const allergens = this.currentRecipe.allergens_list?.length
        ? this.currentRecipe.allergens_list.join(", ")
        : "Aucun allergène spécifié.";
      doc.text(`Sans allergène: ${allergens}`, 10, currentY);
      currentY += 10;
      if (this.currentRecipe.image_url) {
        try {
          const imageBase64 = await this.convertImageToBase64(this.currentRecipe.image_url);
          doc.addImage(imageBase64, "PNG", 10, currentY, 80, 80);
          currentY += 90;
        } catch (error) {
          console.error("Erreur lors du chargement de l'image :", error);
        }
      }
      doc.setFontSize(14);
      doc.text("Ingrédients:", 10, currentY);
      currentY += 10;
      doc.setFontSize(12);
      this.currentRecipe.ingredients.forEach((ingredient) => {
        doc.text(`${ingredient.quantity} ${ingredient.food_name}`, 10, currentY);
        currentY += 10;
      });
      doc.setFontSize(14);
      doc.text("Instructions:", 10, currentY);
      currentY += 10;
      doc.setFontSize(12);
      const lineHeight = 10;
      this.formattedInstructionsArray.forEach((step, index) => {
        const textLines = doc.splitTextToSize(`${index + 1}. ${step}`, 190);
        doc.text(textLines, 10, currentY);
        currentY += textLines.length * lineHeight;
      });
      doc.save(`${this.currentRecipe.recipe_name}.pdf`);
    },
    async rateRecipe(star) {
      try {
        if (!this.currentRecipe?.recipe_id) {
          throw new Error('Aucune recette sélectionnée.');
        }
        const response = await axios.post(`${process.env.VUE_APP_URL_BACKEND}/recipes/rate`, {
          recipeId: this.currentRecipe.recipe_id,
          rating: star,
        }, { withCredentials: true });
        alert(response.data.message || 'Note enregistrée avec succès.');
        this.currentRecipe.rating = star;
        await this.fetchAverageRating(this.currentRecipe.recipe_id);
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la note :', error);
        alert('Une erreur est survenue lors de l\'enregistrement de la note.');
      }
    },
    async fetchAverageRating(recipe_id) {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/recipes/rate/average/${recipe_id}`, {
        withCredentials: true,
      });
        this.currentRecipe.averageRating = parseFloat(response.data.averageRating) || 0;
      } catch (error) {
        console.error('Erreur lors de la récupération de la moyenne des notes :', error);
        this.currentRecipe.averageRating = 0;
        alert('Impossible de récupérer la moyenne des notes.');
      }
    },
    async fetchRecipes() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/recipes/all`, {
          withCredentials: true ,
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
        console.error('Erreur lors de la récupération des recettes :', error);
        this.errorMessage = 'Une erreur est survenue lors de la récupération des recettes. Veuillez réessayer plus tard.';
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
            recipeId: this.currentRecipe.recipe_id,
          },
          { withCredentials: true }
        );
        alert(response.data.message);
      } catch (error) {
        console.error('Erreur lors de l\'ajout à la liste des courses:', error);
        alert('Une erreur est survenue.');
      }
    },
    async openModal(recipe) {
      this.currentRecipe = { ...recipe, rating: recipe.rating || 0 };
      this.showModal = true;
      if (this.currentRecipe?.recipe_id) {
        await this.fetchAverageRating(this.currentRecipe.recipe_id);
        await this.checkIfFavorite(this.currentRecipe.recipe_id);
      }
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
  watch: {
    selectedAllergens: {
      handler() {
        this.filterRecipes();
      },
      deep: true,
    },
    showFavorites: "filterRecipes",
  },
};
</script>

<style scoped>
.card {
  background-color: #212121;
  border: none;
  border-radius: 8px;
  width: 90%;
  max-width: 100%;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
}
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.recipes-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
.recipe-card {
  background: #171717;
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
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background-color: #212121;
  color: #fff;
  padding: 20px;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  animation: fadeIn 0.3s ease-out;
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
.rating-container {
  margin-top: 20px;
  text-align: center;
}
.stars {
  display: flex;
  justify-content: center;
  gap: 5px;
  font-size: 24px;
  cursor: pointer;
}
.star {
  color: #ccc;
  transition: color 0.2s;
}
.star.filled {
  color: #C56929;
}
.star:hover {
  color: #C56929;
}
.average-rating {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.average-rating .star {
  font-size: 20px;
  color: #ccc;
}
.average-rating .star.filled {
  color: #C56929;
}
.allergen-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}
.allergen-filters label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1em;
  cursor: pointer;
}
.allergen-filters input[type="checkbox"] {
  margin-right: 5px;
}
button {
    background-color: #BA9371;
    color: white;
    border: none;
    transition: all 0.3s ease;
    border-radius: 4px;
    padding: 10px;
    width: auto;
}
button:hover {
    background-color: #C56929;
    transform: scale(1.05);
    color: white;
}
input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
}
input[type="checkbox"]:checked {
  background-color: #C56929;
  border-color: #C56929;
}
input[type="checkbox"]:checked::after {
  content: "✓";
  color: #ffffff;
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background-color: #212121;
  color: #fff;
  padding: 30px;
  border-radius: 15px;
  max-width: 500px;
  width: 100%;
  animation: fadeIn 0.3s ease-out;
}
.modal-content-recipe {
  max-height: 90vh;
  overflow-y: auto;
  background: #212121;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 700px;
  text-align: left;
}
.modal-filters {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}
.modal-filters label {
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  align-items: center;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.text-and-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.restriction-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  transition: all 0.3s ease;
}
.restriction-icon:hover {
  transform: scale(1.2);
  opacity: 0.8;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.buttons-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}
.modal-actions-icons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.icon-action {
  font-size: 24px;
  color: #BA9371;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.3s ease;
}
.icon-action:hover {
  transform: scale(1.2);
  color: #C56929;
}
.icon-action.active {
  color: red;
}
.allergen-icon {
  width: 24px;
  height: 24px;
  margin-right: 5px;
  vertical-align: middle;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.allergen-icon:hover {
  transform: scale(1.2);
}
</style>