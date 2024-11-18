<template>
  <div class="add-ingredients">
    <h4>Ajouter des ingrédients :</h4>
    <div class="input-container">
      <input 
        v-model="newIngredient" 
        placeholder="Entrez un ingrédient ou un code-barres" 
        :disabled="isLoading"
      />
      <button @click="addIngredient" :disabled="isLoading">
        Ajouter
      </button>
    </div>
    <!-- Indicateur de chargement -->
    <div v-if="isLoading" class="loading-spinner">Chargement...</div>
    <ul class="ingredient-list">
      <li v-for="(ingredient, index) in ingredients" :key="index">
        {{ ingredient }}
        <button @click="removeIngredient(index)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AddIngredients",
  data() {
    return {
      newIngredient: "",
      ingredients: [],
      isLoading: false // Indique si une recherche est en cours
    };
  },
  methods: {
    async addIngredient() {
      const isBarcode = /^\d+$/.test(this.newIngredient.trim()); // Vérifie si c'est un code-barres (entièrement numérique)

      if (isBarcode) {
        this.isLoading = true; // Début du chargement
        try {
          const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${this.newIngredient}.json`);
          const data = await response.json();
          if (data && data.status === 1 && data.product && data.product.product_name) {
            const productName = data.product.product_name;
            this.ingredients.push(productName); // Ajoute le nom du produit détecté
          } else {
            alert("Produit non trouvé pour ce code-barres.");
          }
        } catch (error) {
          console.error("Erreur lors de la recherche du produit :", error);
          alert("Une erreur est survenue lors de la recherche du produit.");
        } finally {
          this.isLoading = false; // Fin du chargement
        }
      } else {
        if (this.newIngredient.trim()) {
          this.ingredients.push(this.newIngredient.trim()); // Ajoute l'ingrédient manuellement
        }
      }

      this.newIngredient = ""; // Réinitialise le champ d'entrée
      this.$emit("ingredients-updated", this.ingredients); // Émet les ingrédients mis à jour
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
      this.$emit("ingredients-updated", this.ingredients); // Émet les ingrédients mis à jour
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
</style>
