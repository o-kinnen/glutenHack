<template>
  <div class="add-ingredients-container">
    <div class="add-ingredients">
      <h4>Ajouter des ingrédients :</h4>
      <div class="input-container">
        <input v-model="newIngredient" placeholder="Entrez un ingrédient ou un code-barres" :disabled="isLoading"/>
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
      <div v-if="isLoading" class="loading-spinner">Chargement...</div>
      <ul class="ingredient-list">
        <li v-for="(ingredient, index) in ingredients" :key="index">
          <div class="ingredient-item">
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
          </div>
        </li>
      </ul>
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
      ingredients: [],
      isLoading: false
    };
  },
  created() {
    this.fetchIngredientsFromFridge();
  },
  methods: {
    async fetchIngredientsFromFridge() {
      try {
        this.isLoading = true;
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/fridge`, {
          withCredentials: true
        });
        this.ingredients = response.data.map(item => ({
          name: item.food_name,
          quantity: item.quantity,
          updateQuantity: 0
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des ingrédients :', error);
      } finally {
        this.isLoading = false;
      }
    },
    async addIngredient() {
      const isBarcode = /^\d+$/.test(this.newIngredient.trim());
      let ingredientName;

      if (isBarcode) {
        this.isLoading = true;
        try {
          const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${this.newIngredient}.json`);
          const data = await response.json();
          if (data && data.status === 1 && data.product && data.product.product_name) {
            ingredientName = data.product.product_name;
          } else {
            alert("Produit non trouvé pour ce code-barres.");
            return;
          }
        } catch (error) {
          console.error("Erreur lors de la recherche du produit :", error);
          alert("Une erreur est survenue lors de la recherche du produit.");
          return;
        } finally {
          this.isLoading = false;
        }
      } else {
        if (this.newIngredient.trim()) {
          ingredientName = this.newIngredient.trim();
        } else {
          return;
        }
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
            console.error("Erreur lors de la mise à jour de l'aliment :", error);
            return;
          }
        } else {
          try {
            const response = await axios.post(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/add`, {
              foodName: ingredientName,
              quantity: `${this.newQuantity || 1} ${this.newUnit}`.trim()
            }, {
              withCredentials: true
            });

            if (response.status !== 200) {
              throw new Error("Erreur lors de l'ajout de l'aliment dans le réfrigérateur de l'utilisateur.");
            }

            this.ingredients.push({ name: ingredientName, quantity: `${this.newQuantity || 1} ${this.newUnit}`.trim(), updateQuantity: 0 });
          } catch (error) {
            if (error.response && error.response.status === 404) {
              alert("L'aliment n'est pas encore dans la base de données.");
            } else {
              console.error('Erreur lors de l\'ajout de l\'aliment :', error);
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
    }
  }
};
</script>

<style scoped>
.add-ingredients {
  text-align: left;
  margin: 20px 0;
}
.input-container {
  display: flex;
  gap: 10px;
}
.ingredient-list {
  list-style-type: none;
  padding: 0;
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