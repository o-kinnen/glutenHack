<template>
  <div class="recipe-page">
    <div class="add-ingredients-container">
      <AddIngredients @ingredients-updated="updateIngredientsList" />
    </div>
    <button @click="fetchRecipe" class="search-recipes-btn">
      Rechercher des recettes
    </button>
    <div class="filter-buttons">
      <div>
        <button @click="toggleTimeDropdown" class="dropdown-btn">
          Temps de préparation : {{ selectedTime || 'Rapide' }}
        </button>
        <div v-if="showTimeDropdown" class="dropdown">
          <ul>
            <li v-for="option in timeOptions" :key="option" @click="selectTime(option)">
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button @click="toggleDifficultyDropdown" class="dropdown-btn">
          Difficulté : {{ selectedDifficulty || 'Facile' }}
        </button>
        <div v-if="showDifficultyDropdown" class="dropdown">
          <ul>
            <li v-for="option in difficultyOptions" :key="option" @click="selectDifficulty(option)">
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button @click="toggleCuisineDropdown" class="dropdown-btn">
          Cuisine : {{ selectedCuisine || 'Européenne' }}
        </button>
        <div v-if="showCuisineDropdown" class="dropdown">
          <ul>
            <li v-for="option in cuisineOptions" :key="option" @click="selectCuisine(option)">
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button @click="togglePeopleDropdown" class="dropdown-btn">
          Nombre de personnes : {{ selectedPeople || '1' }}
        </button>
        <div v-if="showPeopleDropdown" class="dropdown">
          <ul>
            <li v-for="option in peopleOptions" :key="option" @click="selectPeople(option)">
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button @click="toggleTypeDropdown" class="dropdown-btn">
          Type : {{ selectedType || 'Petit-déjeuner' }}
        </button>
        <div v-if="showTypeDropdown" class="dropdown">
          <ul>
            <li v-for="option in typeOptions" :key="option" @click="selectType(option)">
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="loading-spinner">
      Recherche en cours ...
    </div>
    <div v-if="recipe && !isLoading" class="recipe-container">
      <div class="recipe-card" style="width: 80vw; max-width: 70%;">
        <div class="recipe-info">
          <h3>{{ recipe.title }}</h3>
          <button @click="openModal">Voir les détails</button>
        </div>
      </div>
    </div>
    <modal v-if="showModal" @close="closeModal" class="modal-overlay">
      <div class="modal-content">
        <h3 style="text-align: center;">{{ recipe.title }}</h3>
        <div class="recipe-info-container">
          <div class="recipe-info-line">
          <div class="info-item"><strong>Temps de préparation:</strong> {{ time }}</div>
          <div class="info-item"><strong>Difficulté:</strong> {{ difficulty }}</div>
          <div class="info-item"><strong>Nombre de personnes:</strong> {{ people }}</div>
        </div>
        <div class="recipe-info-line">
          <div class="info-item"><strong>Cuisine:</strong> {{ cuisine }}</div>
          <div class="info-item"><strong>Type:</strong> {{ type }}</div>
        </div>
      </div>
        <h4>Ingrédients</h4>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">
            {{ ingredient }}
          </li>
        </ul>
        <h4>Instructions</h4>
        <ol>
          <li v-for="instruction in recipe.instructions" :key="instruction">
            {{ instruction }}
          </li>
        </ol>
        <button @click="closeModal">Fermer</button>
      </div>
    </modal>
  </div>
</template>
  
<script>
import axios from 'axios';
import AddIngredients from '@/components/AddIngredients.vue'

export default {
  name: 'RecipePage',
  components: {
    AddIngredients
  },
  data() {
    return {
      recipe: null,
      isLoading: false,
      showModal: false,
      showTimeDropdown: false,
      showDifficultyDropdown: false,
      showCuisineDropdown: false,
      showPeopleDropdown: false,
      showTypeDropdown: false,
      selectedTime: 'Rapide',
      selectedDifficulty: 'Facile',
      selectedCuisine: 'Européenne',
      selectedPeople: '1',
      selectedType: 'Petit-déjeuner',
      timeOptions: ['Rapide', 'Moyen', 'Long'],
      difficultyOptions: ['Facile', 'Intermédiaire', 'Complexe'],
      cuisineOptions: ['Européenne', 'Asiatique', 'Américaine', 'Africaine'],
      peopleOptions: ['1', '2', '3', '4'],
      typeOptions: ['Petit-déjeuner', 'Lunch', 'Dîner', 'Dessert'],
      time: '',
      difficulty: '',
      cuisine: '',
      people: '',
      type: '',
      availableIngredients: []
    };
  },
  methods: {
    async fetchRecipe() {
      this.isLoading = true;
      try {
        const requestData = {
          time: this.selectedTime,
          difficulty: this.selectedDifficulty,
          cuisine: this.selectedCuisine,
          people: this.selectedPeople,
          type: this.selectedType,
          availableIngredients: this.availableIngredients
        };

        console.log('Requête envoyée au backend :', requestData);

        const response = await axios.post(
          `${process.env.VUE_APP_URL_BACKEND}/openai/recipe`, requestData,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );

        if (response.data && response.data.title && response.data.ingredients && response.data.instructions) {
          this.recipe = {
            title: response.data.title,
            ingredients: response.data.ingredients,
            instructions: response.data.instructions
          };
          this.time = requestData.time;
          this.difficulty = requestData.difficulty;
          this.cuisine = requestData.cuisine;
          this.people = requestData.people;
          this.type = requestData.type;
        } else {
          throw new Error('Les données de la recette sont manquantes ou mal formatées.');
        }

      } catch (error) {
        console.error('Erreur lors de la recherche de la recette :', error);
        alert('Une erreur est survenue lors de la recherche de la recette. Veuillez réessayer plus tard.');
      } finally {
        this.isLoading = false;
      }
    },
    updateIngredientsList(ingredients) {
      this.availableIngredients = ingredients;
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    toggleTimeDropdown() {
      this.showTimeDropdown = !this.showTimeDropdown;
    },
    selectTime(option) {
      this.selectedTime = option;
      this.showTimeDropdown = false;
    },
    toggleDifficultyDropdown() {
      this.showDifficultyDropdown = !this.showDifficultyDropdown;
    },
    selectDifficulty(option) {
      this.selectedDifficulty = option;
      this.showDifficultyDropdown = false;
    },
    toggleCuisineDropdown() {
      this.showCuisineDropdown = !this.showCuisineDropdown;
    },
    selectCuisine(option) {
      this.selectedCuisine = option;
      this.showCuisineDropdown = false;
    },
    togglePeopleDropdown() {
      this.showPeopleDropdown = !this.showPeopleDropdown;
    },
    selectPeople(option) {
      this.selectedPeople = option;
      this.showPeopleDropdown = false;
    },
    toggleTypeDropdown() {
      this.showTypeDropdown = !this.showTypeDropdown;
    },
    selectType(option) {
      this.selectedType = option;
      this.showTypeDropdown = false;
    },
  },
};
</script>
  
<style scoped>
.recipe-page {
  text-align: center;
}
.loading-spinner {
  font-size: 1.5em;
  margin-top: 20px;
}
.search-recipes-btn {
  margin: 20px;
  padding: 10px 20px;
  font-size: 1.2em;
}
.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px;
}
.dropdown-btn {
  padding: 10px;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.dropdown {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 150px;
  text-align: left;
  margin-top: 5px;
  z-index: 100;
}
.dropdown ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.dropdown li {
  padding: 10px;
  cursor: pointer;
}
.dropdown li:hover {
  background-color: #f0f0f0;
}
.recipe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.recipe-card {
  background-color: #222;
  color: #fff;
  margin: 15px;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.recipe-info {
  text-align: left;
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
.recipe-info-container {
  margin-bottom: 20px;
}
.recipe-info-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 15px;
}
.info-item {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  flex: 1;
  text-align: center;
}
.add-ingredients-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
