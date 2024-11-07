<template>
  <div class="recipe-page">
    <button @click="fetchRecipe" class="search-recipes-btn">
      Rechercher une recette
    </button>
    <div v-if="recipe" class="recipe-container">
      <div class="recipe-card" style="width: 80vw; max-width: 50%;">
        <div class="recipe-info">
          <h3>{{ recipe.title }}</h3>
          <button @click="openModal">Voir les détails</button>
        </div>
      </div>
    </div>
    <modal v-if="showModal" @close="closeModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ recipe.title }}</h3>
        <h4>Ingrédients</h4>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">
            {{ ingredient }}
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
  </div>
</template>
  
<script>
export default {
  name: 'RecipePage',
  data() {
    return {
      recipe: null,
      showModal: false,
    };
  },
  methods: {
    async fetchRecipe() {
      try {
        const response = await fetch(`${process.env.VUE_APP_URL_BACKEND}/openai/recipe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({}),
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.title && data.ingredients && data.instructions) {
          this.recipe = {
            title: data.title,
            ingredients: data.ingredients,
            instructions: data.instructions,
          };
        } else {
          throw new Error('Les données de la recette sont manquantes ou mal formatées.');
        }

      } catch (error) {
        console.error('Erreur lors de la recherche de la recette :', error);
        alert('Une erreur est survenue lors de la recherche de la recette. Veuillez réessayer plus tard.');
      }
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>
  
<style scoped>
.recipe-page {
  text-align: center;
}
.search-recipes-btn {
  margin: 20px;
  padding: 10px 20px;
  font-size: 1.2em;
}
.recipe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.recipe-card {
  background-color: #222;
  color: #fff;
  margin: 15px;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.recipe-info {
  text-align: left;
}
button {
  background-color: #444;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #555;
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
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: left;
}
</style>
