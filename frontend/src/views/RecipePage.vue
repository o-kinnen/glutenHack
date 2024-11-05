<template>
  <div class="recette-page">
    <button @click="fetchRecettes" class="search-recipes-btn">
      Rechercher des recettes
    </button>
    <div v-if="showRecettes && recettes.length > 0" class="recettes-container">
      <div v-for="recette in recettes" :key="recette.id" class="recette-card">
        <div class="recette-info">
          <h3>{{ recette.name }}</h3>
          <p>{{ recette.description }}</p>
          <button @click="openModal(recette)">Voir les détails</button>
        </div>
      </div>
    </div>
    <modal v-if="selectedRecette" @close="closeModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ selectedRecette.name }}</h3>
        <h4>Ingrédients</h4>
        <ul>
          <li v-for="ingredient in selectedRecette.ingredients" :key="ingredient">
            {{ ingredient }}
          </li>
        </ul>
        <h4>Instructions</h4>
        <p>{{ selectedRecette.instructions }}</p>
        <button @click="closeModal">Fermer</button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: "RecettePage",
  data() {
    return {
      recettes: [
        {
          id: 1,
          name: "Recette 1",
          description: "Description 1",
          ingredients: ["A", "B", "C"],
          instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          id: 2,
          name: "Recette 2",
          description: "Description 2",
          ingredients: ["D", "E", "F"],
          instructions: "Suspendisse potenti. In faucibus massa arcu, eu aliquam."
        },
        {
          id: 3,
          name: "Recette 3",
          description: "Description 3",
          ingredients: ["G", "H", "I"],
          instructions: "Cras lacinia magna vel molestie faucibus."
        }
      ],
      selectedRecette: null,
      showRecettes: false
    };
  },
  methods: {
    fetchRecettes() {
      // Pour l'instant, affiche les exemples de recettes
      this.showRecettes = true;
    },
    openModal(recette) {
      this.selectedRecette = recette;
    },
    closeModal() {
      this.selectedRecette = null;
    },
  },
};
</script>

<style scoped>
.recette-page {
  text-align: center;
}
.search-recipes-btn {
  margin: 20px;
  padding: 10px 20px;
  font-size: 1.2em;
}
.recettes-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.recette-card {
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
.recette-image {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.recette-info {
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
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
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
</style>
  