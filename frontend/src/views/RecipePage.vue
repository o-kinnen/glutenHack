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
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.VUE_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'user',
                content: `content: Donne-moi une recette ayant aucune trace de gluten. 
                Le format de la réponse doit être en JSON valide avec les clés suivantes :
                "title", "ingredients", "instructions". La clé "ingredients" doit être une liste d'ingrédients, 
                et la clé "instructions" doit être une liste d'étapes.`,
              },
            ],
            max_tokens: 500,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const recipeData = JSON.parse(data.choices[0]?.message?.content);
 
        this.recipe = {
          title: recipeData.title,
          ingredients: recipeData.ingredients,
          instructions: recipeData.instructions,
        };

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
