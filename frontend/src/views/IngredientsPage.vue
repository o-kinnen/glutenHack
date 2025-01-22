<template>
  <div class="container">
    <div class="card p-4 text-white">
      <h1>Ingrédients en stock </h1>
      <p>Entrez un ingrédient pour l'ajouter à votre stock.</p>
      <div class="input-text">
        <input type="text" v-model="newIngredient" placeholder="Ingrédient" :disabled="isLoading" />
      </div>
      <div class="input-container">
        <input v-model="newQuantity" type="number" min="1" placeholder="Quantité" :disabled="isLoading" class="quantity-input"/>
        <select v-model="newUnit" :disabled="isLoading">
          <option value="">Unités</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="l">l</option>
        </select>
        <div class="modal-actions-icons">
          <i class="bi bi-plus-circle-fill icon-action" 
            @click="addIngredient" 
            title="Ajouter">
          </i>
        </div>
      </div>
      <div class="upload-container">
        <h5>Uploader une photo :</h5>
        <input type="file" @change="onFileChange" accept="image/*" />
        <div v-if="imageUrl" class="image-preview">
          <img :src="imageUrl" alt="Aperçu de l'image" />
        </div>
      </div>
      <button @click="analyzeImage" :disabled="!imageFile || isLoading" class="analyze-button">Analyser</button>
      <div class="search-container">
        <input v-model="searchIngredient" placeholder="Rechercher" />
      </div>
      <br>
      <div v-if="ingredients.length === 0" class="empty-message">
        La liste des ingrédients est vide...
      </div>
      <div v-if="isLoading" class="overlay">
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
      </div>
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <button class="close-btn" @click="closeModal">X</button>
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
                <input v-model="item.quantity" type="number" min="1" placeholder="Quantité" class="quantity-input" :class="{ 'error': item.selected && (!item.quantity || parseFloat(item.quantity) <= 0) }"/>
                <div v-if="errorMessage" class="error-message">
                  {{ errorMessage }}
                </div>
                <select v-model="item.unit" class="unit-select">
                  <option value="">Unités</option>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="kg">kg</option>
                  <option value="l">l</option>
                </select>
              </div>
            </div>
            <button @click="validateSelection" class="button align-center">Ajouter</button>
          </div>
        </div>
      </div>
      <div class="ingredient-list">
        <div  v-for="(ingredient, index) in filteredIngredients" :key="index" class="ingredient-item">
          <div class="ingredient-info">
            <strong>{{ ingredient.name }}</strong>
            <div class="ingredient-quantity"><strong>({{ ingredient.quantity }})</strong></div>
          </div>
          <div class="ingredient-actions">
            <input v-model.number="ingredient.updateQuantity" type="number" min="1" placeholder="Quantité" class="quantity-input"/>
            <div class="modal-actions-icons">
              <i class="bi bi-plus-circle-fill icon-action" 
                @click="updateIngredientQuantity(index, ingredient.name, ingredient.updateQuantity, 'add')" 
                title="Ajouter">
              </i>
              <span class="tooltip-text">Ajouter</span>
              <i class="bi bi-dash-circle-fill icon-action" 
                @click="updateIngredientQuantity(index, ingredient.name, ingredient.updateQuantity, 'subtract')" 
                title="Diminuer">
              </i>
              <span class="tooltip-text">Diminuer</span>
              <i class="bi bi-trash-fill icon-action" 
                @click="removeIngredient(index, ingredient.name)" 
                title="Supprimer">
              </i>
              <span class="tooltip-text">Supprimer</span>
            </div>
          </div>
        </div>
      </div>
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
      errorMessage: "",
      showModal: false,
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
  },
  created() {
    this.fetchIngredientsFromFridge();
  },
  methods: {
    handleError(error, message) {
      if (process.env.VUE_APP_NODE_ENV !== 'production') {
        console.error(message, error);
      }
      this.errorMessage = message;
    },
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
        const response = await axios.post(`${process.env.VUE_APP_URL_BACKEND}/users/analyzeImage`, formData, {
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
        this.showModal = true;
      } catch (error) {
        this.handleError(error, "Erreur lors de l'analyse de l'image");
        alert("Une erreur est survenue lors de l'analyse de l'image.");
      } finally {
        this.isLoading = false;
      }
    },
    async validateSelection() {
      this.showModal = false;
      this.errorMessage = '';
      const selectedItems = this.analysisResult.filter(item => item.selected && item.quantity);
      const invalidItems = selectedItems.filter(item => !item.quantity || parseFloat(item.quantity) <= 0);
      if (invalidItems.length > 0) {
        this.errorMessage = "Veuillez indiquer une quantité valide pour tous les ingrédients sélectionnés.";
        return;
      }
      for (const item of selectedItems) {
        const existingIngredientIndex = this.ingredients.findIndex(
          ingredient => 
            ingredient.name.toLowerCase() === item.name.toLowerCase() && ingredient.quantity.includes(item.unit)
        );
        if (existingIngredientIndex !== -1) {
          const existingIngredient = this.ingredients[existingIngredientIndex];
          const currentQuantityString = existingIngredient.quantity;
          const quantityMatch = currentQuantityString.match(/^([\d.]+)\s*(.*)$/);
          if (quantityMatch) {
            const currentQuantity = parseFloat(quantityMatch[1]);
            const currentUnit = quantityMatch[2];
            const updatedQuantity = currentQuantity + parseFloat(item.quantity);
            this.ingredients[existingIngredientIndex].quantity = `${updatedQuantity} ${currentUnit}`.trim();
            try {
              await axios.put(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/update`, {
                foodName: item.name,
                quantity: updatedQuantity,
                unit: currentUnit
              }, {
                withCredentials: true
              });
            } catch (error) {
              this.handleError(error, `Erreur lors de la mise à jour de ${item.name} dans la base de données`);
            }
          }
        } else {
          this.ingredients.push({
            name: item.name,
            quantity: `${item.quantity} ${item.unit}`.trim(),
            category: 'ajoutés',
            updateQuantity: 0,
          });
          try {
            await axios.post(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/add`, {
              foodName: item.name,
              quantity: `${item.quantity} ${item.unit}`.trim(),
            }, {
              withCredentials: true
            });
          } catch (error) {
            this.handleError(error, `Erreur lors de l'ajout de ${item.name} dans la base de données`);
          }
        }
      }
      this.analysisResult = [];
      this.$emit("ingredients-updated", this.ingredients);
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
        this.handleError(error, 'Erreur lors de la récupération des ingrédients');
      } finally {
        this.isLoading = false;
      }
    },
    async addIngredient() {
      const input = this.newIngredient.trim();
      let ingredientName = input;
      if (/\d/.test(ingredientName)) {
        alert("Le nom de l'ingrédient ne peut pas contenir de chiffres. Veuillez entrer un aliment valide.");
        return;
      }
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
            this.handleError(error, "Erreur lors de la mise à jour de l'aliment");
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
              this.handleError(error, "Erreur lors de l'ajout de l'aliment");
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
        await axios.put(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/update`, {
          foodName: ingredientName,
          quantity: updatedQuantity,
          unit: currentUnit
        }, {
          withCredentials: true
        });
        this.ingredients[index].quantity = `${updatedQuantity} ${currentUnit}`.trim();
      } catch (error) {
        this.handleError(error, "Erreur lors de la mise à jour de l'aliment");
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
        this.handleError(error, "Erreur lors de la suppression de l'aliment");
      }
    },
    closeModal() {
      this.showModal = false;
    },
  }
};
</script>

<style scoped>
.card {
  background-color: #212121;
  border: none;
  border-radius: 8px;
  width: 100%;
  max-width: 1500px;
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
.action-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  margin-left: 10px;
}
.action-icon:hover {
  transform: scale(1.2);
  opacity: 0.8;
}
.add-icon {
  margin-left: 0;
}
.subtract-icon {
  margin-left: 10px;
}
.delete-icon {
  margin-left: auto;
}
.tooltip-text {
  visibility: hidden;
  width: 80px;
  background-color: #212121;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 5px;
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s;
  font-size: 0.8rem;
  white-space: nowrap;
}
.icon-wrapper:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
.modal-content {
  background-color: #212121;
  color: #fff;
  padding: 20px;
  border-radius: 12px;
  max-width: 700px;
  max-height: 80vh;
  width: 100%;
  animation: fadeIn 0.3s ease-out;
  overflow-y: auto;
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
.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color:white;
}
.close-btn:hover{
  transform: scale(1.05);
}
.add-ingredients {
  text-align: left;
  margin: 20px 0;
}
.add-ingredients input[type="text"] {
  display: block;
  margin: 0 auto 15px auto;
  width: 80%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  font-size: 1rem;
  text-align: center;
}
.input-container, .upload-container {
  margin-top: 20px;
}
.search-container {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  text-align: center;
}
.image-preview {
  margin-top: 15px;
  max-width: 400px;
  border-radius: 8px;
}
.image-preview img {
  display: block;
  margin: 0 auto;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
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
.ingredient-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* Par défaut : 1 colonne */
  gap: 20px; /* Espacement entre les éléments */
  width: 100%;
  margin: 0 auto;
}
.ingredient-item {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #171717;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
}
.ingredient-item.removed {
  opacity: 0;
  transform: translateX(-20px);
}
.quantity-input {
  width: 50px;
  padding: 5px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9rem;
}
.quantity-input:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
}
.ingredient-info {
  margin-bottom: 10px;
}
.ingredient-quantity {
  font-size: 0.9em;
  color: white;
}
.ingredient-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sort-button {
  background-color: #BA9371;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
button.validate-button{
  background-color: #BA9371;
  color: white;
  border: none;
  transition: all 0.3s ease;
  border-radius: 4px;
}
.loading-spinner {
  margin-top: 10px;
  font-size: 16px;
  color: white;
  font-weight: bold;
  text-align: center;
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
.add-ingredients-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.quantity-input.error {
  border: 2px solid red;
  background-color: #ffe6e6;
}
.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
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
.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}
.input-container input[type="text"],
.input-container input[type="number"],
.input-container select {
  width: 100px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  text-align: center;
}
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.empty-message {
  text-align: center;
  font-size: 1.2em;
  color: #666;
  margin-top: 20px;
}
.modal-actions-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
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
.camera-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 16px;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.camera-feed {
  width: 100%;
  max-width: 300px;
  height: 200px;
  border-radius: 8px;
  border: 1px solid rgba(204, 204, 204, 0.6);;
  object-fit: cover;
  background-color: #212121;
}
.camera-placeholder {
  width: 100%;
  max-width: 300px;
  height: 200px;
  border-radius: 8px;
  border: 1px solid rgba(204, 204, 204, 0.6);
  object-fit: cover;
  background-color: #212121;
}
.input-text {
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  font-size: 0.9rem;
}
.buttons-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}
.analyze-button {
  display: block;
  margin: 20px auto;
  width: 50%;
  max-width: 150px;
  border: none;
  border-radius: 8px;
}
.search-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.input-text input[type="text"] {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  font-size: 1rem;
  text-align: center;
  background-color: white;
  color: black;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.spinner-container {
  text-align: center;
}
.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}
.spinner-container p {
  color: #fff;
  margin-top: 15px;
  font-size: 1.2rem;
  font-weight: bold;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@media (min-width: 576px) {
  .ingredient-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 768px) {
  .ingredient-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 992px) {
  .ingredient-list {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>