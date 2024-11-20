<template>
  <div>
    <h1>Ma liste des courses</h1>
    <ul>
      <li v-for="(food_name, index) in shoppingItems" :key="index">
        {{ food_name }} 
        <button @click="deleteItem(food_name)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'GroceryList',
  data() {
    return {
      shoppingItems: [],
    };
  },
  methods: {
    async fetchShoppingList() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_URL_BACKEND}/shopping-list/`,
          {
            withCredentials: true,
          }
        );
        this.shoppingItems = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération de la liste des courses :', error);
      }
    },
    async deleteItem(foodName) {
      try {
        await axios.delete(
          `${process.env.VUE_APP_URL_BACKEND}/shopping-list/delete`,
          {
            params: { food_name: foodName },
            withCredentials: true,
          }
        );

        this.shoppingItems = this.shoppingItems.filter(item => item !== foodName);
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'aliment :', error);
      }
    },
  },
  mounted() {
    this.fetchShoppingList();
  },
};
</script>