<template>
  <div class="recipe-page">
    <h2>Toutes les recettes</h2>
    <div class="recipes-list">
      <div 
        v-for="(recipe, index) in recipes" 
        :key="recipe.recipe_id" 
        class="recipe-card"
      >
        <h3>{{ recipe.recipe_name }}</h3>
        <button @click="openModal(index)">Voir les détails</button>
      </div>
    </div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">X</button>
        <h3>{{ currentRecipe.recipe_name }}</h3>
        <div class="recipe-info-container">
          <div class="recipe-info-line">
            <div class="info-item"><strong>Temps de préparation:</strong> {{ currentRecipe.preparation_time }}</div>
            <div class="info-item"><strong>Difficulté:</strong> {{ currentRecipe.difficulty }}</div>
            <div class="info-item"><strong>Nombre de personnes:</strong> {{ currentRecipe.number_of_person }}</div>
          </div>
          <div class="recipe-info-line">
            <div class="info-item"><strong>Cuisine:</strong> {{ currentRecipe.cuisine_type }}</div>
            <div class="info-item"><strong>Type:</strong> {{ currentRecipe.category_type }}</div>
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
        <button @click="closeModal">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyRecipePage',
  data() {
    return {
      recipes: [],
      showModal: false,
      currentRecipe: null
    };
  },
  computed: {
    formattedInstructionsArray() {
      return this.currentRecipe?.instructions
        ? this.currentRecipe.instructions.split('\n').filter((step) => step.trim() !== '')
        : [];
    },
  },
  methods: {
    async fetchRecipes() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/recipes/all`);
        this.recipes = response.data;
        console.log('Données reçues depuis l\'API :', response.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des recettes :', error);
      }
    },
    openModal(index) {
      this.currentRecipe = this.recipes[index];
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.currentRecipe = null;
    },
  },
  mounted() {
    this.fetchRecipes();
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
</style>
