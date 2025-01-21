<template>
  <div class="container">
    <div class="card p-4 text-white">
      <h1 class="text-white">Ma liste des courses</h1>
      <div v-if="errorMessage" class="empty-message">
        {{ errorMessage }}
      </div>
      <div v-else-if="shoppingItems.length === 0" class="empty-message">
        La liste est vide...
      </div>
      <div v-else>
        <div class="action-buttons">
          <button @click="toggleSort" class="button sort-btn">
            {{ categoriesVisible ? 'Trier' : 'Trier' }}
          </button>
          <button @click="exportToFile" class="button export-btn">Exporter</button>
        </div>
      </div>
      <div v-if="categoriesVisible">
        <div v-for="(items, category) in groupedItems" :key="category" class="category-section">
          <h2 class="category-title"><img :src="getCategoryIcon(category)" :alt="category" class="category-icon">{{ category }}</h2>
          <ul class="grocery-list">
            <li v-for="(item, index) in items" :key="index" class="grocery-item">
              <div class="grocery-details">
                <span class="food-name">{{ item.food_name }}</span>
                <span v-if="isValidQuantity(item.quantity)" class="food-name">({{ item.quantity }})</span>
              </div>
              <div class="grocery-actions">
                <div v-if="isQuantityNumeric(item.quantity)" class="update-section">
                  <input type="number" v-model.number="quantities[item.food_id]" placeholder="Nouvelle quantité" class="quantity-input"/>
                  <div class="modal-actions-icons">
                    <i class="bi bi-plus-circle-fill icon-action" 
                      @click="updateQuantity(item.food_id, 'add')" 
                      title="Ajouter">
                    </i>
                    <span class="tooltip-text">Ajouter</span>
                    <i class="bi bi-dash-circle-fill icon-action" 
                      @click="updateQuantity(item.food_id, 'subtract')" 
                      title="Diminuer">
                    </i>
                    <span class="tooltip-text">Diminuer</span>
                    <i class="bi bi-trash-fill icon-action" 
                      @click="deleteItem(item.food_name)" 
                      title="Supprimer">
                    </i>
                    <span class="tooltip-text">Supprimer</span>
                  </div>
                </div>
                <div v-else>
                <div class="modal-actions-icons">
                  <i
                    class="bi bi-trash-fill icon-action"
                    @click="deleteItem(item.food_name)"
                    title="Supprimer">
                  </i>
                  <span class="tooltip-text">Supprimer</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <ul v-else class="grocery-list">
      <li v-for="(item, index) in shoppingItems" :key="index" class="grocery-item">
        <div class="grocery-details">
          <span class="food-name">{{ item.food_name }}</span>
          <span v-if="isValidQuantity(item.quantity)" class="food-name">({{ item.quantity }})</span>
        </div>
        <div class="grocery-actions">
          <div v-if="isQuantityNumeric(item.quantity)" class="update-section">
            <input v-if="isQuantityNumeric(item.quantity)" type="number" v-model.number="quantities[item.food_id]" placeholder="Nouvelle quantité" class="quantity-input"/>
              <div class="modal-actions-icons">
                <i class="bi bi-plus-circle-fill icon-action" 
                  @click="updateQuantity(item.food_id, 'add')" 
                  title="Ajouter">
                </i>
                <span class="tooltip-text">Ajouter</span>
                <i class="bi bi-dash-circle-fill icon-action" 
                  @click="updateQuantity(item.food_id, 'subtract')" 
                  title="Diminuer">
                </i>
                <span class="tooltip-text">Diminuer</span>
                <i class="bi bi-trash-fill icon-action" 
                  @click="deleteItem(item.food_name)" 
                  title="Supprimer">
                </i>
                <span class="tooltip-text">Supprimer</span>
              </div>
            </div>
            <div v-else>
              <div class="modal-actions-icons">
                <i class="bi bi-trash-fill icon-action"
                  @click="deleteItem(item.food_name)"
                  title="Supprimer">
                </i>
                <span class="tooltip-text">Supprimer</span>
              </div>
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
  name: 'GroceryPage',
  data() {
    return {
      shoppingItems: [],
      quantities: {},
      groupedItems: {},
      categoriesVisible: false,
      errorMessage: '',
    };
  },
  methods: {
    handleError(error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Erreur :', error);
    }
    this.errorMessage = "Rien pour le moment";
  },
    getCategoryIcon(category) {
      const icons = {
        'Produits laitiers': '/img/lait.png',
        'Noix': '/img/fruits à coque.png',
        'Fruits': '/img/fruits.png',
        'Légumes': '/img/céleri.png',
        'Viande': '/img/viande.png',
        'Féculents': '/img/gluten.png',
        'Épices': '/img/épices.png',
        'Poissons': '/img/poissons.png',
        'Crustacés': '/img/crustacés.png',
        'Sauces': '/img/moutarde.png',
      };
      return icons[category] || '/img/shopping.png';
    },
    groupItemsByCategory() {
      const categoriesOrder = [
        'Produits laitiers',
        'Noix',
        'Fruits',
        'Légumes',
        'Viande',
        'Féculents',
        'Épices',
        'Poissons',
        'Crustacés',
        'Sauces'
      ];
      this.groupedItems = {};
      this.shoppingItems.forEach(item => {
        const category = item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'Autres';
        if (!this.groupedItems[category]) {
          this.groupedItems[category] = [];
        }
        this.groupedItems[category].push(item);
      });
      this.groupedItems = Object.keys(this.groupedItems)
        .sort((a, b) => categoriesOrder.indexOf(a) - categoriesOrder.indexOf(b))
        .reduce((acc, key) => {
        acc[key] = this.groupedItems[key];
        return acc;
      }, {});
    },
    toggleSort() {
      if (this.categoriesVisible) {
        this.categoriesVisible = false;
      } else {
        this.groupItemsByCategory();
        this.categoriesVisible = true;
      }
    },
    isValidQuantity(quantity) {
      return (
        quantity &&
        typeof quantity === "string" &&
        !isNaN(parseFloat(quantity)) &&
        quantity.toUpperCase() !== "N/A"
      );
    },
    async fetchShoppingList() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/shopping-list/`, {
          withCredentials: true,
        });
        this.listId = response.data.listId;
        this.shoppingItems = response.data.items;
        this.shoppingItems.forEach((item) => {
          item.category = item.category ? item.category : 'Autres';
          if (this.isQuantityNumeric(item.quantity)) {
            const match = item.quantity.match(/^(\d+)/);
            this.quantities[item.food_id] = match ? parseInt(match[1], 10) : 0;
          }
        });
      } catch (error) {
        this.handleError(error);
      }
    },
    exportToFile() {
      let fileContent = "Ma liste des courses\n\n";
      if (this.categoriesVisible) {
        Object.keys(this.groupedItems).forEach(category => {
          fileContent += `${category}\n`;
          this.groupedItems[category].forEach(item => {
            fileContent += `- ${item.food_name} (${item.quantity})\n`;
          });
          fileContent += '\n';
        });
      } else {
        this.shoppingItems.forEach(item => {
          fileContent += `- ${item.food_name} (${item.quantity})\n`;
        });
      }
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Ma_liste_des_courses.txt';
      link.click();
      URL.revokeObjectURL(link.href);
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
        if (this.categoriesVisible) {
          this.groupItemsByCategory();
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async updateQuantity(foodId, action = 'add') {
      const newQuantity = this.quantities[foodId];
      if (newQuantity === undefined || newQuantity <= 0) {
        alert("Veuillez entrer une quantité valide.");
        return;
      }
      const incrementValue = action === 'add' ? newQuantity : -newQuantity;
      try {
        const updatedItem = this.shoppingItems.find((item) => item.food_id === foodId);
        if (updatedItem) {
          const currentQuantity = parseInt(updatedItem.quantity.match(/^(\d+)/)[1], 10);
          if (action === 'subtract' && currentQuantity + incrementValue <= 0) {
            alert("La quantité ne peut pas être égale à 0.");
            return;
          }
        }
        const response = await axios.post(
          `${process.env.VUE_APP_URL_BACKEND}/shopping-list/update-quantity`,
          {
            listId : this.listId,
            foodId,
            incrementValue,
          },
          {
            withCredentials: true,
          }
        );
        if (updatedItem) {
          updatedItem.quantity = response.data.newQuantity;
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    isQuantityNumeric(quantity) {
      return /^\d+/.test(quantity);
    }
  },
  mounted() {
    this.fetchShoppingList();
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
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
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #343a40;
}
.grocery-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.grocery-item {
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
.grocery-item.removed {
  opacity: 0;
  transform: translateX(-20px);
}
.food-name {
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  display: block;
}
.food-quantity {
  color: white;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 10px;
}
.grocery-actions {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
}
.update-section {
  display: flex;
  align-items: center;
  gap: 10px;
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
.non-modifiable {
  font-style: italic;
  color: #6c757d;
}
.subtract-btn {
  background-color: #ffc107;
  color: white;
}
.subtract-btn:hover {
  background-color: #e0a800;
}
button {
    background-color: #BA9371;
    color: white;
    border: none;
    transition: all 0.3s ease;
    border-radius: 4px;
    padding: 8px 12px;
    width: 110px;
    text-align: center;
    flex-shrink: 0;
}
button:hover {
    background-color: #C56929;
    transform: scale(1.05);
    color: white;
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
.icon-wrapper {
  position: relative;
  display: inline-block;
}
.tooltip-text {
  visibility: hidden;
  width: 80px;
  background-color: #333;
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
.action-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;
}
.category-section {
  margin-bottom: 20px;
}
.category-title {
  background-color: none;
  color: white;
  border: none;
  transition: all 0.3s ease;
  border-radius: 4px;
  padding: 8px 12px;
  width: 100%;
  text-align: center;
  flex-shrink: 0;
}
.category-title:hover{
  transform: scale(1.05);
  color: white;
}
.category-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
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
.grocery-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
}
@media (min-width: 576px) {
  .grocery-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 768px) {
  .grocery-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 992px) {
  .grocery-list {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
