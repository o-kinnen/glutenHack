<template>
  <div class="recipe-page">
    <button @click="fetchRecipe" class="search-recipes-btn">
      Rechercher des recettes avec l'IA
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
      <div>
        <button @click="toggleStockOption" class="dropdown-btn">
          Inclure les ingrédients en stock : {{ includeStock ? 'Oui' : 'Non' }}
        </button>
      </div>
    </div>
    <div v-if="isLoading" class="loading-spinner">
      Recherche en cours ...
    </div>
    <div v-if="recipe && !isLoading" class="recipe-container">
      <div class="recipe-card" style="width: 80vw; max-width: 70%;">
        <div class="recipe-info">
          <h3>{{ recipe.title }}</h3>
          <img>
          <button @click="openModal">Voir les détails</button>
        </div>
      </div>
    </div>
    <modal v-if="showModal" @close="closeModal" class="modal-overlay">
      <div class="modal-content">
        <h3 style="text-align: center;">{{ recipe.title }}</h3>
        <div class="recipe-info-container">
          <div class="recipe-info-line">
          <div class="info-item"><strong>Temps de préparation:</strong> {{ recipe.time }}</div>
          <div class="info-item"><strong>Difficulté:</strong> {{ recipe.difficulty }}</div>
          <div class="info-item"><strong>Nombre de personnes:</strong> {{ recipe.people }}</div>
        </div>
        <div class="recipe-info-line">
          <div class="info-item"><strong>Cuisine:</strong> {{ recipe.cuisine }}</div>
          <div class="info-item"><strong>Type:</strong> {{ recipe.type }}</div>
          <div v-if="recipe.restrictionsList && recipe.restrictionsList.length" class="info-item">
            <strong>Sans allergène:</strong> {{ recipe.restrictionsList.join(', ') }}
          </div>
        </div>
      </div>
        <h4>Ingrédients</h4>
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            {{ recipe.quantity[index] }} {{ ingredient }}
          </li>
        </ul>
        <h4>Instructions</h4>
        <ol>
          <li v-for="instruction in recipe.instructions" :key="instruction">
            {{ instruction }}
          </li>
        </ol>
        <button @click="saveRecipe" v-if="recipe">Valider la recette</button>
        <button @click="closeModal">Fermer</button>
      </div>
    </modal>
    <modal v-if="showAllergenAlert" @close="showAllergenAlert = false" class="modal-overlay">
      <div class="modal-content">
        <h3 style="text-align: center;">Aucun allergène enregistré dans votre profil</h3>
        <p style="text-align: center;">Souhaitez-vous continuer ou modifier votre profil ?</p>
        <p style="text-align: center;">Si vous continuez la recette générée par l'IA ne prendra pas en compte vos allergènes</p>
        <div style="display: flex; justify-content: space-around; margin-top: 20px;">
          <button @click="proceedWithoutAllergens" class="confirm-btn">Continuer</button>
          <button @click="redirectToProfile" class="profile-btn">Modifier le profil</button>
        </div>
      </div>
    </modal>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'RecipePage',
  data() {
    return {
      recipe: null,
      isLoading: false,
      showModal: false,
      showAllergenAlert: false,
      showTimeDropdown: false,
      showDifficultyDropdown: false,
      showCuisineDropdown: false,
      showPeopleDropdown: false,
      showTypeDropdown: false,
      includeStock: false,
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
  mounted() {
    this.fetchAvailableIngredients();
  },
  methods: {
    async getUserRestrictions() {
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
    async fetchAvailableIngredients() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/fridge`, {
          withCredentials: true
        });
        if (Array.isArray(response.data)) {
          this.availableIngredients = response.data;
        } else {
          console.error('Les données reçues ne sont pas valides :', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des ingrédients en stock :', error);
        alert('Impossible de récupérer les ingrédients en stock. Veuillez réessayer.');
      }
    },
    async fetchRecipe() {
      try {
        const restrictions = await this.getUserRestrictions();

        if (!restrictions || restrictions.length === 0) {
          this.showAllergenAlert = true;
        } else {
          this.executeRecipeLogic();
        }
      } catch (error) {
        console.error('Erreur lors de la vérification des restrictions alimentaires :', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    },
  async executeRecipeLogic() {
    this.isLoading = true;
    try {
      const requestData = {
        time: this.selectedTime,
        difficulty: this.selectedDifficulty,
        cuisine: this.selectedCuisine,
        people: this.selectedPeople,
        type: this.selectedType,
        availableIngredients: this.includeStock ? this.availableIngredients : [],
      };

      const response = await axios.post(
        `${process.env.VUE_APP_URL_BACKEND}/openai/recipe`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data && response.data.title && response.data.ingredients && response.data.instructions) {
        const allergensList = [...new Set(response.data.restrictionsList)];
        this.recipe = {
          title: response.data.title,
          ingredients: response.data.ingredients,
          instructions: response.data.instructions,
          quantity: response.data.quantity,
          time: response.data.time,
          difficulty: response.data.difficulty,
          cuisine: response.data.cuisine,
          people: response.data.people,
          type: response.data.type,
          image: response.data.image,
          restrictionsList: allergensList,
        };
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
    async saveRecipe() {
      try {
        const requestData = {
          recipe: {
            ...this.recipe,
            restrictionsList: this.recipe.restrictionsList || []
          },
          ingredients: this.recipe.ingredients.map((ingredient) => ({
            food_id: ingredient.food_id,
            quantity: ingredient.quantity,
          })),
        };
    
        await axios.post(
          `${process.env.VUE_APP_URL_BACKEND}/recipes/save`,
          requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
        );
        alert('Recette enregistrée avec succès !');
      } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la recette :', error);
      alert('Une erreur est survenue lors de l\'enregistrement de la recette.');
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
    toggleStockOption() {
      this.includeStock = !this.includeStock;
    },
    proceedWithoutAllergens() {
      this.showAllergenAlert = false;
      this.executeRecipeLogic();
    },
    redirectToProfile() {
      this.showAllergenAlert = false;
      this.$router.push('/profile');
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
  width: 100%;
  max-width: 1000px;
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
  width: 90%; /* Passe de 80% à 90% pour une largeur plus grande */
  max-width: 700px; /* Augmenter la largeur maximale */
  text-align: left;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.confirm-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.confirm-btn:hover {
  background-color: #45a049;
}
.profile-btn {
  background-color: #2196f3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.profile-btn:hover {
  background-color: #0b7dda;
}
.dropdown-btn {
  padding: 10px;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dropdown-btn:hover {
  background-color: #555;
}

</style>