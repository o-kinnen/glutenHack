<template>
  <div class="add-ingredients-container">
    <div class="add-ingredients">
      <h4>Ajouter des ingrédients :</h4>

      <div class="input-container">
        <input type="text" v-model="newIngredient" placeholder="Entrez un ingrédient ou un code-barre" :disabled="isLoading" />
        <input v-model="newQuantity" type="number" min="1" placeholder="Quantité" :disabled="isLoading"/>
        <select v-model="newUnit" :disabled="isLoading">
          <option value="">Unités (optionnel)</option>
          <option value="g">g</option>
          <option value="ml">ml</option>
          <option value="kg">kg</option>
          <option value="l">l</option>
        </select>
        <button @click="addIngredient" :disabled="isLoading">Ajouter</button>
      </div>

      <div class="search-container">
        <input v-model="searchIngredient" placeholder="Rechercher un ingrédient" />
        <button @click="sortIngredientsByCategory" class="sort-button">Trier par catégorie</button>
      </div>

      <div class="upload-container">
        <h5>Uploader une photo :</h5>
        <input type="file" @change="onFileChange" accept="image/*" />
        <div v-if="imageUrl" class="image-preview">
          <img :src="imageUrl" alt="Aperçu de l'image" />
        </div>
        <button @click="analyzeImage" :disabled="!imageFile || isLoading">Analyser</button>
      </div>

      <div v-if="analysisResult.length > 0" class="analysis-results">
        <h5>Résultats de l'analyse :</h5>
        <div class="analysis-grid">
          <div class="grid-header">
            <span>Sélection</span>
            <span>Aliment</span>
            <span>Probabilité</span>
            <span>Quantité</span>
            <span>Unités</span>
          </div>
          <div v-for="(item, index) in analysisResult" :key="index" class="grid-row">
            <input type="checkbox" v-model="item.selected" />
            <span>{{ item.name }}</span>
            <span>{{ (item.probability * 100).toFixed(2) }}%</span>
            <input v-model="item.quantity" type="number" min="1" placeholder="Quantité" class="quantity-input" />
            <select v-model="item.unit" class="unit-select">
              <option value="">Unités (optionnel)</option>
              <option value="g">g</option>
              <option value="ml">ml</option>
              <option value="kg">kg</option>
              <option value="l">l</option>
            </select>
          </div>
        </div>
        <button @click="validateSelection" class="validate-button">Valider</button>
      </div>

      <div v-if="sortByCategory" class="ingredient-list">
        <div v-for="(categoryGroup, category) in categorizedIngredients" :key="category" class="category-group">
          <h5 class="category-title">{{ category }}</h5>
          <ul>
            <li v-for="(ingredient, index) in categoryGroup" :key="index" class="ingredient-item">
              <div class="ingredient-info">
                <strong>{{ ingredient.name }}</strong>
                <div class="ingredient-quantity">{{ ingredient.quantity }}</div>
              </div>
              <div class="ingredient-actions">
                <input v-model.number="ingredient.updateQuantity" type="number" min="1" placeholder="Quantité" />
                <button @click="updateIngredientQuantity(index, ingredient.name, ingredient.updateQuantity, 'add')" class="add-button">Ajouter</button>
                <button @click="updateIngredientQuantity(index, ingredient.name, ingredient.updateQuantity, 'subtract')" class="subtract-button">Soustraire</button>
                <button @click="removeIngredient(index, ingredient.name)" class="remove-button">Supprimer</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="ingredient-list">
        <ul>
          <li v-for="(ingredient, index) in filteredIngredients" :key="index" class="ingredient-item">
            <div class="ingredient-info">
              <strong>{{ ingredient.name }}</strong>
              <div class="ingredient-quantity">{{ ingredient.quantity }}</div>
            </div>
            <div class="ingredient-actions">
              <input v-model.number="ingredient.updateQuantity" type="number" min="1" placeholder="Quantité" />
              <button @click="updateIngredientQuantity(index, ingredient.name, ingredient.updateQuantity, 'add')" class="add-button">Ajouter</button>
              <button @click="updateIngredientQuantity(index, ingredient.name, ingredient.updateQuantity, 'subtract')" class="subtract-button">Soustraire</button>
              <button @click="removeIngredient(index, ingredient.name)" class="remove-button">Supprimer</button>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="isLoading" class="loading-spinner">Chargement...</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "IngredientsPage.vue",
  data() {
    return {
      newIngredient: "",
      newQuantity: "",
      newUnit: "",
      searchIngredient: "",
      ingredients: [],
      imageFile: null,
      imageUrl: "",
      analysisResult: [],
      isLoading: false,
      sortByCategory: false
    };
  },
  computed: {
    filteredIngredients() {
      let filtered = this.ingredients;

      if (this.searchIngredient.trim() !== "") {
        filtered = filtered.filter(ingredient =>
          ingredient.name.toLowerCase().includes(this.searchIngredient.trim().toLowerCase())
        );
      }

      return filtered;
    },
    categorizedIngredients() {
      const categorized = {};
      this.filteredIngredients.forEach(ingredient => {
        if (!categorized[ingredient.category]) {
          categorized[ingredient.category] = [];
        }
        categorized[ingredient.category].push(ingredient);
      });
      return categorized;
    }
  },
  created() {
    this.fetchIngredientsFromFridge();
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        this.imageUrl = URL.createObjectURL(file);
      }
    },
    async analyzeImage() {
      if (!this.imageFile) return;

      const formData = new FormData();
      formData.append("image", this.imageFile);

      try {
        this.isLoading = true;
        const response = await axios.post(`${process.env.VUE_APP_URL_BACKEND}/users/test`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (response.data && response.data.data) {
          this.analysisResult = response.data.data.map(item => ({
            ...item,
            selected: false,
            quantity: '',
            unit: ''
          }));
        } else {
          this.analysisResult = [];
          alert("Aucun ingrédient trouvé dans l'image.");
        }
      } catch (error) {
        console.error("Erreur lors de l'analyse de l'image :", error);
        alert("Une erreur est survenue lors de l'analyse de l'image.");
      } finally {
        this.isLoading = false;
      }
    },
    validateSelection() {
      const selectedItems = this.analysisResult.filter(item => item.selected && item.quantity);
      selectedItems.forEach(item => {
        this.ingredients.push({
          name: item.name,
          quantity: `${item.quantity} ${item.unit}`.trim(),
          category: 'ajoutés',
          updateQuantity: 0
        });
      });
      this.analysisResult = [];
    },
    async fetchIngredientsFromFridge() {
      try {
        this.isLoading = true;
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/fridge`, {
          withCredentials: true
        });
        this.ingredients = response.data.map(item => ({
          name: item.food_name,
          quantity: item.quantity,
          category: item.category || "autres",
          updateQuantity: 0
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des ingrédients :', error);
      } finally {
        this.isLoading = false;
      }
    },
    async addIngredient() {
      const input = this.newIngredient.trim();
      let ingredientName = input;

      if (ingredientName) {
        const existingIngredientIndex = this.ingredients.findIndex(
          (item) => item.name === ingredientName && item.quantity.includes(this.newUnit)
        );

        if (existingIngredientIndex !== -1) {
          const existingIngredient = this.ingredients[existingIngredientIndex];
          const currentQuantityString = existingIngredient.quantity;
          const quantityMatch = currentQuantityString.match(/^([\d.]+)\s*(.*)$/);

          if (!quantityMatch) {
            alert("Impossible de traiter la quantité actuelle.");
            return;
          }

          const currentQuantity = parseFloat(quantityMatch[1]);
          const currentUnit = quantityMatch[2];
          const additionalQuantity = parseFloat(this.newQuantity) || 1;
          const updatedQuantity = currentQuantity + additionalQuantity;

          try {
            const response = await axios.put(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/update`, {
              foodName: ingredientName,
              quantity: updatedQuantity,
              unit: currentUnit
            }, {
              withCredentials: true
            });

            if (response.status !== 200) {
              throw new Error("Erreur lors de la mise à jour de l'aliment dans le réfrigérateur de l'utilisateur.");
            }

            this.ingredients[existingIngredientIndex].quantity = `${updatedQuantity} ${currentUnit}`.trim();
          } catch (error) {
            console.error("Erreur lors de la mise à jour de l'aliment :", error);
            return;
          }
        } else {
          try {
            const response = await axios.post(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/add`, {
              foodName: ingredientName,
              quantity: `${this.newQuantity || 1} ${this.newUnit}`.trim(),
            }, {
              withCredentials: true
            });

            if (response.status !== 200) {
              throw new Error("Erreur lors de l'ajout de l'aliment dans le réfrigérateur de l'utilisateur.");
            }

            await this.fetchIngredientsFromFridge();
          } catch (error) {
            if (error.response && error.response.status === 404) {
              alert("L'aliment n'est pas encore dans la base de données.");
            } else {
              console.error("Erreur lors de l'ajout de l'aliment :", error);
            }
          }
        }
      }

      this.newIngredient = "";
      this.newQuantity = "";
      this.newUnit = "";
      this.$emit("ingredients-updated", this.ingredients);
    },
    async updateIngredientQuantity(index, ingredientName, quantity, action) {
      if (!quantity || quantity <= 0) {
        alert("Veuillez entrer une quantité valide.");
        return;
      }

      const currentQuantityString = this.ingredients[index].quantity;
      const quantityMatch = currentQuantityString.match(/^([\d.]+)\s*(.*)$/);

      if (!quantityMatch) {
        alert("Impossible de traiter la quantité actuelle.");
        return;
      }

      const currentQuantity = parseFloat(quantityMatch[1]);
      const currentUnit = quantityMatch[2];
      let updatedQuantity;

      if (action === 'add') {
        updatedQuantity = currentQuantity + quantity;
      } else if (action === 'subtract') {
        updatedQuantity = currentQuantity - quantity;
        if (updatedQuantity <= 0) {
          alert("La quantité ne peut pas être inférieure ou égale à zéro.");
          return;
        }
      }

      try {
        const response = await axios.put(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/update`, {
          foodName: ingredientName,
          quantity: updatedQuantity,
          unit: currentUnit
        }, {
          withCredentials: true
        });

        if (response.status !== 200) {
          throw new Error("Erreur lors de la mise à jour de l'aliment dans le réfrigérateur de l'utilisateur.");
        }

        this.ingredients[index].quantity = `${updatedQuantity} ${currentUnit}`.trim();
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'aliment :", error);
      }
    },
    async removeIngredient(index, ingredientName) {
      try {
        const response = await axios.delete(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/delete`, {
          params: { foodName: ingredientName },
          withCredentials: true
        });

        if (response.status !== 200) {
          throw new Error("Erreur lors de la suppression de l'aliment du réfrigérateur de l'utilisateur.");
        }

        this.ingredients.splice(index, 1);
        this.$emit("ingredients-updated", this.ingredients);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'aliment :", error);
      }
    },
    sortIngredientsByCategory() {
      this.sortByCategory = !this.sortByCategory;
    }
  }
};
</script>

<style scoped>
.add-ingredients {
  text-align: left;
  margin: 20px 0;
}
.input-container, .upload-container {
  margin-top: 20px;
}
.search-container {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
.image-preview {
  margin-top: 10px;
  max-width: 300px;
}
.image-preview img {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.analysis-results {
  margin-top: 20px;
}
.analysis-grid {
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
  gap: 10px;
  align-items: center;
}
.grid-header {
  font-weight: bold;
  text-align: center;
  background-color: #f8f8f8;
  padding: 10px;
  border-bottom: 2px solid #ddd;
  display: contents;
}
.grid-row {
  display: contents;
}
.grid-row span {
  text-align: center;
}
.analysis-results .quantity-input {
  margin-left: 5px;
  width: 100%;
  padding: 5px;
}
.analysis-results .unit-select {
  margin-left: 5px;
  padding: 5px;
}
.analysis-results .validate-button {
  margin-top: 20px;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.category-group {
  margin-top: 20px;
}
.category-title {
  background-color: gray;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.ingredient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.ingredient-info {
  flex-grow: 1;
}
.ingredient-quantity {
  font-size: 0.9em;
  color: #555;
}
.ingredient-actions {
  display: flex;
  gap: 5px;
}
.add-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.subtract-button {
  background-color: #ffc107;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.sort-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.loading-spinner {
  margin-top: 10px;
  font-size: 16px;
  color: #555;
  font-weight: bold;
  text-align: center;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.add-ingredients-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
