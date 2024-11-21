<template>
  <div class="grocery-container">
    <h1>Ma liste des courses</h1>
    <ul class="grocery-list">
      <li v-for="(item, index) in shoppingItems" :key="index" class="grocery-item">
        <div class="grocery-details">
          <span class="food-name">{{ item.food_name }}</span>
          <span v-if="item.quantity" class="food-quantity">{{ item.quantity }}</span>
          <span v-else class="food-quantity">(pas de quantité définie)</span>
        </div>
        <div class="grocery-actions">
          <div v-if="item.quantity && isQuantityNumeric(item.quantity)" class="update-section">
            <input type="number" v-model.number="quantities[item.food_id]" placeholder="Nouvelle quantité" class="quantity-input"/>
            <button @click="updateQuantity(item.food_id)" class="update-btn">Ajouter</button>
          </div>
          <span v-else-if="item.quantity" class="non-modifiable">
            (quantité non modifiable)
          </span>
          <button @click="deleteItem(item.food_name)" class="delete-btn">Supprimer</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'GroceryPage',
  data() {
    return {
      shoppingItems: [],
      quantities: {}
    };
  },
  methods: {
    async fetchShoppingList() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/shopping-list/`, {
          withCredentials: true,
        });

        this.shoppingItems = response.data;

        this.shoppingItems.forEach((item) => {
          if (this.isQuantityNumeric(item.quantity)) {
            const match = item.quantity.match(/^(\d+)/);
            this.quantities[item.food_id] = match ? parseInt(match[1], 10) : 0;
          }
        });
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

        this.shoppingItems = this.shoppingItems.filter((item) => item.food_name !== foodName);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'aliment :", error);
      }
    },

    async updateQuantity(foodId) {
      const newQuantity = this.quantities[foodId];
      if (newQuantity === undefined || newQuantity <= 0) {
        alert("Veuillez entrer une quantité valide.");
        return;
      }

      try {
        const listId = 8;
        console.log('Données envoyées :', { listId, foodId, incrementValue: newQuantity });

        const response = await axios.post(
          `${process.env.VUE_APP_URL_BACKEND}/shopping-list/update-quantity`,
          {
            listId,
            foodId,
            incrementValue: newQuantity,
          },
          {
            withCredentials: true,
          }
        );

        const updatedItem = this.shoppingItems.find((item) => item.food_id === foodId);
        if (updatedItem) {
          updatedItem.quantity = response.data.newQuantity;
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la quantité :", error);
      }
    },

    isQuantityNumeric(quantity) {
      return /^\d+/.test(quantity);
    },
  },
  mounted() {
    this.fetchShoppingList();
  },
};
</script>

<style scoped>
.grocery-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #343a40;
}
.grocery-list {
  list-style-type: none;
  padding: 0;
}
.grocery-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.food-name {
  font-weight: bold;
  color: #495057;
  margin-bottom: 5px;
  display: block;
}
.food-quantity {
  color: #6c757d;
  font-size: 0.9rem;
}
.grocery-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.update-section {
  display: flex;
  align-items: center;
  gap: 5px;
}
button {
  padding: 5px 10px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.update-btn {
  background-color: #28a745;
  color: white;
}
.update-btn:hover {
  background-color: #218838;
}
.delete-btn {
  background-color: #dc3545;
  color: white;
}
.delete-btn:hover {
  background-color: #c82333;
}
.quantity-input {
  width: 80px;
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
.non-modifiable {
  font-style: italic;
  color: #6c757d;
}
</style>
