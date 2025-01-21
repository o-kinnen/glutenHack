<template>
  <div class="container">
    <div class="card p-4 text-white">
      <h1 class="text-white">Créer une nouvelle recette</h1>
      <p>Vous pouvez créer une recette en l'éditant ou bien la générer à l'aide d'une IA selon vos besoins.</p>
      <div  class="buttons-container">
        <button @click="openIARecipeModal" class="button">
          Générer
        </button>
        <button @click="openEditRecipe" class="button">
          Editer
        </button>
        <EditRecipe
          :isVisible="showEditRecipe"
          mode="create"
          @close="closeEditRecipe"
          @create-recipe="handleEditRecipe"
        />
      </div>
  <modal v-if="showIARecipeModal" @close="closeIARecipeModal" class="modal-overlay">
  <div class="modal-content">
    <h3 style="text-align: center;">Personnalisez votre recette</h3>
    <div class="filter-grid">
        <div class="filter-item">
          <button @click="toggleTimeDropdown" class="dropdown-btn">
            Préparation : {{ selectedTime || 'Rapide' }}
          </button>
          <div v-if="showTimeDropdown" class="dropdown">
            <ul>
              <li v-for="option in timeOptions" :key="option" @click="selectTime(option)">
                {{ option }}
              </li>
            </ul>
          </div>
        </div>
        <div class="filter-item">
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
        <div class="filter-item">
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
        <div class="filter-item">
          <button @click="togglePeopleDropdown" class="dropdown-btn">
            Part(s) : {{ selectedPeople || '1' }}
          </button>
          <div v-if="showPeopleDropdown" class="dropdown">
            <ul>
              <li v-for="option in peopleOptions" :key="option" @click="selectPeople(option)">
                {{ option }}
              </li>
            </ul>
          </div>
        </div>
        <div class="filter-item">
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
        <div class="filter-item">
          <button @click="toggleStockOption" class="dropdown-btn">
            Stock : {{ includeStock ? 'Oui' : 'Non' }}
          </button>
        </div>
      </div>
      <div class="action-buttons">
        <button @click="fetchRecipe" class="button">Générer</button>
        <button @click="closeIARecipeModal" class="button">Fermer</button>
      </div>  
    </div>
  </modal>
  <div v-if="isLoading" class="loading-overlay">
    <div class="loading-message">
      <h2>Recette en cours de création...</h2>
      <div class="icon-slider">
        <img src='/img/gluten.png' alt="Icône 1" class="icon" />
        <img src='/img/lait.png' alt="Icône 2" class="icon" />
        <img src='/img/oeufs.png' alt="Icône 3" class="icon" />
        <img src='/img/arachide.png' alt="Icône 4" class="icon" />
        <img src='/img/noix.png' alt="Icône 5" class="icon" />
        <img src='/img/poissons.png' alt="Icône 6" class="icon" />
        <img src='/img/soja.png' alt="Icône 7" class="icon" />
        <img src='/img/crustacés.png' alt="Icône 8" class="icon" />
        <img src='/img/moutarde.png' alt="Icône 9" class="icon" />
        <img src='/img/céleri.png' alt="Icône 10" class="icon" />
      </div>
    </div>
  </div>
  <modal v-if="showModal" @close="closeModal" class="modal-overlay">
      <div class="modal-content">
        <h3 style="text-align: center;">{{ recipe.title }}</h3>
        <img :src="recipe.image" alt="Image de la recette" v-if="recipe.image" class="modal-recipe-image" />
        <div class="recipe-info-container">
          <div class="recipe-info-line">
          <div class="info-item"><strong>Préparation:</strong> {{ recipe.time }}</div>
          <div class="info-item"><strong>Difficulté:</strong> {{ recipe.difficulty }}</div>
          <div class="info-item"><strong>Part(s):</strong> {{ recipe.people }}</div>
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
        <button @click="closeModal">Fermer</button>
      </div>
    </modal>
    <modal v-if="showAllergenAlert" @close="showAllergenAlert = false" class="modal-overlay">
      <div class="modal-content">
        <h3 style="text-align: center;">Aucun allergène enregistré dans votre profil</h3>
        <p style="text-align: center;">Souhaitez-vous continuer ou modifier votre profil ?</p>
        <p style="text-align: center;">Si vous continuez la recette générée par l'IA ne prendra pas en compte vos allergènes</p>
        <div style="display: flex; justify-content: space-around; margin-top: 20px;">
          <button @click="proceedWithoutAllergens" class="button">Continuer</button>
          <button @click="redirectToProfile" class="button">Modifier le profil</button>
        </div>
      </div>
    </modal>
    <modal v-if="showStockModal" @close="closeStockSelectionModal">
      <div class="modal-content">
        <template v-if="availableIngredients.length > 0">
          <h3>Sélectionnez les ingrédients à inclure</h3>
          <ul>
            <li v-for="(ingredient, index) in availableIngredients" :key="index">
              <label>
                <input 
                  type="checkbox" 
                  :value="ingredient.food_name" 
                  v-model="selectedIngredients" 
                />
                  {{ ingredient.food_name }} (Max: {{ ingredient.maxQuantity }} {{ ingredient.unit }})
              </label>
              <input
                type="number"
                v-model.number="ingredient.selectedQuantity"
                :placeholder="'Quantité en ' + ingredient.unit"
                :max="ingredient.maxQuantity"
                :min="1"
                :disabled="!selectedIngredients.includes(ingredient.food_name)"
                @input="validateQuantity(ingredient)"
                style="margin-left: 10px; width: 100px;"
              />
            </li>
          </ul>
          <button @click="confirmSelection" >Confirmer</button>
        </template>
        <template v-else>
          <h3>Votre liste d’ingrédients en stock est vide</h3>
          <p>Voulez-vous ajouter des ingrédients en stock ? Vous serez redirigé vers la page des ingrédients.</p>
          <div style="display: flex; justify-content: space-around; margin-top: 20px;">
            <button @click="handleStockModalResponse('add')" class="button">Ajouter des ingrédients</button>
            <button @click="handleStockModalResponse('cancel')" class="button">Annuler</button>
          </div>
        </template>
      </div>
    </modal>
  </div>
    <canvas id="confetti-canvas"></canvas>
  </div>
</template>
  
<script>
import EditRecipe from '@/components/EditRecipe.vue';
import confetti from 'canvas-confetti';
import axios from 'axios';
export default {
  name: 'RecipePage',
  components: {
    EditRecipe,
  },
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
      showStockModal: false,
      showEditRecipe: false,
      isSaving: false,
      isSaved: false,
      selectedTime: 'Rapide',
      selectedDifficulty: 'Facile',
      selectedCuisine: 'Européenne',
      selectedPeople: '1',
      selectedType: 'Petit-déjeuner',
      timeOptions: ['Rapide', 'Moyen', 'Long'],
      difficultyOptions: ['Facile', 'Intermédiaire', 'Complexe'],
      cuisineOptions: [
        'Européenne',
        'Asiatique',
        'Américaine',
        'Africaine',
        'Méditerranéenne',
        'Indienne',
        'Moyen-Orientale',
        'Mexicaine',
        'Caribéenne',
        'Italienne',
        'Chinoise',
        'Japonaise',
        'Thaïlandaise',
        'Coréenne',
        'Vietnamienne',
        'Espagnole',
        'Grecque',
        'Française',
        'Allemande',
        'Nordique',
        'Brésilienne',
        'Argentine',
        'Turque',
        'Marocaine',
        'Éthiopienne'
      ],
      peopleOptions: ['1', '2', '3', '4', '5', '6', '7', '8'],
      typeOptions: ['Petit-déjeuner', 'Lunch', 'Dîner', 'Dessert'],
      time: '',
      difficulty: '',
      cuisine: '',
      people: '',
      type: '',
      public: true,
      availableIngredients: [],
      selectedIngredients: [],
      showIARecipeModal: false
    };
  },
  mounted() {
    this.fetchAvailableIngredients();
  },
  methods: {
    errorHandler(error, message) {
      if (process.env.VUE_APP_NODE_ENV !== 'production') {
        console.error(message, error);
      }
    },
    triggerConfetti() {
      const canvas = document.getElementById('confetti-canvas');
      const myConfetti = confetti.create(canvas, { resize: true });
      myConfetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    },
    openEditRecipe() {
      this.showEditRecipe = true;
    },
    closeEditRecipe() {
      this.showEditRecipe = false;
    },
    openIARecipeModal() {
      this.showIARecipeModal = true;
    },
    closeIARecipeModal() {
      this.showIARecipeModal = false;
    },
    validateQuantity(ingredient) {
      if (ingredient.selectedQuantity > ingredient.maxQuantity) {
        ingredient.selectedQuantity = ingredient.maxQuantity;
      } else if (ingredient.selectedQuantity < 1) {
        ingredient.selectedQuantity = 1;
      }
    },
    confirmSelection() {
      this.selectedIngredientsWithQuantities = this.availableIngredients
        .filter(ingredient => this.selectedIngredients.includes(ingredient.food_name))
        .map(ingredient => ({
          food_name: ingredient.food_name,
          selectedQuantity: ingredient.selectedQuantity,
          unit: ingredient.unit || "unité"
        }));
      if (this.selectedIngredientsWithQuantities.some(item => item.selectedQuantity <= 0)) {
        alert("Veuillez spécifier une quantité valide pour chaque ingrédient sélectionné.");
        return;
      }
      this.includeStock = true;
      this.showStockModal = false;
    },
    async handleEditRecipe(recipe) {
      try {
        const formData = new FormData();
        formData.append('title', recipe.recipe_name);
        formData.append('time', recipe.preparation_time);
        formData.append('difficulty', recipe.difficulty);
        formData.append('people', recipe.number_of_person);
        formData.append('cuisine', recipe.cuisine_type);
        formData.append('type', recipe.category_type);
        formData.append('public', recipe.public);
        formData.append('ingredients', JSON.stringify(recipe.ingredients));
        formData.append('instructions', JSON.stringify(recipe.instructions));
        formData.append('restrictionsList', JSON.stringify(recipe.allergens_list));
        formData.append('created_by_ai', false);
        if (recipe.image) {
          formData.append('image', recipe.image);
        }
        await axios.post(
          `${process.env.VUE_APP_URL_BACKEND}/recipes/save`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );
        alert('Recette créée avec succès.');
      } catch (error) {
        this.errorHandler(error, 'Erreur lors de l\'enregistrement de la recette');
        alert('Une erreur est survenue lors de l\'enregistrement de la recette. Veuillez recommencer');
      }
    },
    async getUserRestrictions() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/restrictions`, {
        withCredentials: true
      });
      return response.data.restrictions || [];
      } catch (error) {
        this.errorHandler(error, 'Erreur lors de la récupération des restrictions alimentaires :');
        return [];
      }
    },
    async fetchAvailableIngredients() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/fridge`, {
          withCredentials: true
        });
        if (Array.isArray(response.data)) {
          this.availableIngredients = response.data.map(ingredient => {
            const quantityMatch = ingredient.quantity.match(/^(\d+\.?\d*)\s*(.*)?$/);
            return {
              ...ingredient,
              maxQuantity: quantityMatch ? parseFloat(quantityMatch[1]) : 0,
              unit: quantityMatch && quantityMatch[2] ? quantityMatch[2].trim() : '',
              selectedQuantity: 1
            };
          });
        } else {
          this.errorHandler(null, 'Les données reçues ne sont pas valides');
        }
      } catch (error) {
        this.errorHandler(error, 'Erreur lors de la récupération des ingrédients en stock');
      }
    },
    toggleStockOption() {
      if (this.availableIngredients.length === 0) {
        this.showStockModal = true;
      } else {
        this.showStockModal = true;
      }
    },
    closeStockSelectionModal() {
      this.showStockModal = false;
    },
    handleStockModalResponse(response) {
      if (response === 'add') {
        this.$router.push('/ingredients');
      } else if (response === 'cancel') {
        this.includeStock = false;
      }
      this.showStockModal = false;
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
        this.errorHandler(error, 'Erreur lors de la génération de la recette');
        if (error.response && error.response.status === 401) {
          alert('Votre session a expiré. Veuillez vous reconnecter.');
          this.$router.push('/login');
        } else {
          alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
      }
    },
    async executeRecipeLogic() {
      this.closeIARecipeModal();
      this.isLoading = true;
      try {
        const requestData = {
          time: this.selectedTime,
          difficulty: this.selectedDifficulty,
          cuisine: this.selectedCuisine,
          people: this.selectedPeople,
          type: this.selectedType,
          availableIngredients: this.includeStock ? this.selectedIngredientsWithQuantities : []
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
            created_by_ai: response.data.created_by_ai,
            public: true
          };
          await this.saveRecipe();
          this.showModal = true;
          this.triggerConfetti();
        } else {
          throw new Error('Les données de la recette sont manquantes ou mal formatées.');
        }
      } catch (error) {
        this.errorHandler(error, 'Erreur lors de la recherche de la recette :');
        alert('Une erreur est survenue lors de la recherche de la recette. Veuillez réessayer plus tard.');
      } finally {
        this.isLoading = false;
      }
    },
    async saveRecipe() {
      if (this.isSaving || this.isSaved) {
        return;
      }
      this.isSaving = true;
      try {
        const requestData = {
          recipe: {
            ...this.recipe,
            restrictionsList: this.recipe.restrictionsList || [],
            public: this.recipe.public
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
        this.isSaved = true;
      } catch (error) {
        this.errorHandler(error, 'Erreur lors de l\'enregistrement de la recette');
        alert('Une erreur est survenue lors de l\'enregistrement de la recette.');
      } finally {
        this.isSaving = false;
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
.card {
  background-color: #212121;
  border: none;
  border-radius: 8px;
  width: 700px;
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
  background-color: #C56929;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.dropdown {
  position: absolute;
  background-color: black;
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
  background-color: #C56929;
}
.recipe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.recipe-card {
  background: #171717;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}
.recipe-info {
  text-align: left;
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
  background: #212121;
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
  background: #212121;
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90vh;
  overflow-y: auto;
  background: #212121;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  text-align: left;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
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
  background-color: #BA9371;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.dropdown-btn:hover {
  background-color: #C56929;
  transform: scale(1.05);
  color: white;
}
.dropdown-btn[disabled] {
  background-color: #BA9371;
  cursor: not-allowed;
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
.cancel-btn {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.cancel-btn:hover {
  background-color: #d32f2f;
}
button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
button:disabled:hover {
  background-color: #ccc;
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
button {
    background-color: #BA9371;
    color: white;
    border: none;
    transition: all 0.3s ease;
    border-radius: 4px;
    width: 150px;
    padding: 10px;
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
.buttons-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}
.spinner {
  border: 8px solid rgba(255, 255, 255, 0.2);
  border-top: 8px solid #ffffff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}
.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
  position: relative;
  overflow: visible;
}
.filter-item {
  position: relative;
  overflow: visible;
}
.dropdown-btn {
  width: 100%;
  padding: 10px;
  background-color: #BA9371;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
  font-size: 16px;
}
.dropdown {
  position: absolute;
  width: 100%;
  background-color: #212121;
  border-radius: 5px;
  margin-top: 5px;
  z-index: 1050;
  max-height: 200px;
  overflow-y: auto;
}
.dropdown ul {
  list-style-type: none;
  padding: 10px;
  margin: 0;
}
.dropdown li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #333;
}
.dropdown li:hover {
  background-color: #C56929;
  color: white;
}
.action-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.button:hover {
  background-color: #C56929;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.loading-message {
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid #C56929;
  border-radius: 10px;
  padding: 20px;
  width: 350px;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
}
.icon-slider {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  height: 100px;
  position: relative;
}
.icon-slider .icon {
  width: 100px;
  height: 100px;
  opacity: 0;
  position: absolute;
  animation: iconFade 5s steps(10) infinite;
}
.icon-slider .icon:nth-child(1) {
  animation-delay: 0s;
}
.icon-slider .icon:nth-child(2) {
  animation-delay: 0.5s;
}
.icon-slider .icon:nth-child(3) {
  animation-delay: 1s;
}
.icon-slider .icon:nth-child(4) {
  animation-delay: 1.5s;
}
.icon-slider .icon:nth-child(5) {
  animation-delay: 2s;
}
.icon-slider .icon:nth-child(6) {
  animation-delay: 2.5s;
}
.icon-slider .icon:nth-child(7) {
  animation-delay: 3s;
}
.icon-slider .icon:nth-child(8) {
  animation-delay: 3.5s;
}
.icon-slider .icon:nth-child(9) {
  animation-delay: 4s;
}
.icon-slider .icon:nth-child(10) {
  animation-delay: 4.5s;
}
@keyframes iconFade {
  0%, 10% {
    opacity: 1;
  }
  11%, 100% {
    opacity: 0;
  }
}
</style>