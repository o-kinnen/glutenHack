<template>
    <div class="add-ingredients">
      <h4>Ajouter des ingrédients en stock :</h4>
      <div class="input-container">
        <input v-model="newIngredient" placeholder="Entrez un ingrédient" />
        <button @click="addIngredient">Ajouter</button>
      </div>
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
    name: 'AddIngredients',
    data() {
      return {
        newIngredient: '',
        ingredients: []
      };
    },
    methods: {
      addIngredient() {
        if (this.newIngredient) {
          this.ingredients.push(this.newIngredient);
          this.newIngredient = '';
          this.$emit('ingredients-updated', this.ingredients);
        }
      },
      removeIngredient(index) {
        this.ingredients.splice(index, 1);
        this.$emit('ingredients-updated', this.ingredients);
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
  </style>
  