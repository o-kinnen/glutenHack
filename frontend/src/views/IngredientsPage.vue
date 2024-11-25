<template>
  <div class="add-ingredients-container">
    <div class="add-ingredients">
      <h4>Ajouter des ingédients :</h4>
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
          {{ ingredient.name }} : {{ ingredient.quantity }}
          <button @click="removeIngredient(index)">Supprimer</button>
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
          quantity: item.quantity
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
            const ingredientName = data.product.product_name;
            this.ingredients.push({ name: ingredientName, quantity: `${this.newQuantity || 1} ${this.newUnit}`.trim() });
          } else {
            alert("Produit non trouvé pour ce code-barres.");
          }
        } catch (error) {
          console.error("Erreur lors de la recherche du produit :", error);
          alert("Une erreur est survenue lors de la recherche du produit.");
        } finally {
          this.isLoading = false;
        }
      } else {
        if (this.newIngredient.trim()) {
          ingredientName = this.newIngredient.trim();
          this.ingredients.push({ name: ingredientName, quantity: `${this.newQuantity || 1} ${this.newUnit}`.trim() });
        }
      }
      if (ingredientName) {
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
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'aliment :', error);
      }
    }

      this.newIngredient = "";
      this.newQuantity = "";
      this.newUnit = "";
      this.$emit("ingredients-updated", this.ingredients);
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
      this.$emit("ingredients-updated", this.ingredients);
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
.ingredient-list li {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
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

