<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>Créer une recette manuellement</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="recipe-title">Titre de la recette</label>
          <input type="text" id="recipe-title" v-model="recipe.title" required />
        </div>

        <div class="form-group">
          <label for="recipe-photo">Photo de la recette</label>
          <input type="file" id="recipe-photo" @change="handleFileUpload" />
          <div v-if="previewImage" class="image-preview">
            <img :src="previewImage" alt="Aperçu de l'image" />
          </div>
        </div>

        <div class="form-group">
          <label for="recipe-preparation-time">Temps de préparation</label>
          <select id="recipe-preparation-time" v-model="recipe.time" required>
            <option value="Rapide">Rapide</option>
            <option value="Moyen">Moyen</option>
            <option value="Long">Long</option>
          </select>
        </div>

        <div class="form-group">
          <label for="recipe-difficulty">Difficulté</label>
          <select id="recipe-difficulty" v-model="recipe.difficulty" required>
            <option value="Facile">Facile</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Complexe">Complexe</option>
          </select>
        </div>

        <div class="form-group">
          <label for="recipe-people">Nombre de personnes</label>
          <input type="number" id="recipe-people" v-model="recipe.people" min="1" required />
        </div>

        <div class="form-group">
          <label for="recipe-cuisine">Cuisine</label>
          <select id="recipe-cuisine" v-model="recipe.cuisine" required>
            <option value="Africaine">Africaine</option>
            <option value="Asiatique">Asiatique</option>
            <option value="Européenne">Européenne</option>
            <option value="Américaine">Américaine</option>
          </select>
        </div>

        <div class="form-group">
          <label for="recipe-type">Type</label>
          <select id="recipe-type" v-model="recipe.type" required>
            <option value="Petit-déjeuner">Petit-déjeuner</option>
            <option value="Lunch">Lunch</option>
            <option value="Dîner">Dîner</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        <div class="form-group">
          <label>Ingrédients</label>
          <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredient-group">
            <input type="text" v-model="ingredient.name" placeholder="Nom de l'ingrédient" required />
            <input type="text" v-model="ingredient.quantity" placeholder="Quantité" required />
            <button type="button" @click="removeIngredient(index)" class="remove-btn">Supprimer</button>
          </div>
          <button type="button" @click="addIngredient" class="add-btn">Ajouter un ingrédient</button>
        </div>

        <div class="form-group">
          <label>Instructions</label>
          <div v-for="(instruction, index) in recipe.instructions" :key="index" class="instruction-group">
            <input type="text" v-model="instruction.step" placeholder="Étape d'instruction" required />
            <button type="button" @click="removeInstruction(index)" class="remove-btn">Supprimer</button>
          </div>
          <button type="button" @click="addInstruction" class="add-btn">Ajouter une étape</button>
        </div>

        <div class="form-group">
          <label>Sans allergène</label>
          <div class="checkbox-group">
            <label><input type="checkbox" value="Lactose" v-model="recipe.restrictionsList" /> Lactose</label>
            <label><input type="checkbox" value="Gluten" v-model="recipe.restrictionsList" /> Gluten</label>
            <label><input type="checkbox" value="Arachide" v-model="recipe.restrictionsList" /> Arachide</label>
            <label><input type="checkbox" value="Œuf" v-model="recipe.restrictionsList" /> Œuf</label>
          </div>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" v-model="recipe.public" />
            Rendre cette recette publique
          </label>
        </div>

        <button type="submit" class="confirm-btn">Créer la recette</button>
        <button type="button" @click="closeModal" class="cancel-btn">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditRecipe",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      recipe: {
        title: "",
        time: "",
        difficulty: "",
        people: 1,
        cuisine: "",
        type: "",
        ingredients: [{ name: "", quantity: "" }],
        instructions: [{ step: "" }],
        restrictionsList: [],
        image: null,
        public: false,
        created_by_ai: false,
      },
      previewImage: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleSubmit() {
      this.$emit("create-recipe", { ...this.recipe });
      this.closeModal();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.recipe.image = file;
        this.previewImage = URL.createObjectURL(file);
      }
    },
    addIngredient() {
      this.recipe.ingredients.push({ name: "", quantity: "" });
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    addInstruction() {
      this.recipe.instructions.push({ step: "" });
    },
    removeInstruction(index) {
      this.recipe.instructions.splice(index, 1);
    },
  },
};
</script>

<style scoped>
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
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  text-align: left;
}
.form-group {
  margin-bottom: 15px;
}
.ingredient-group,
.instruction-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.add-btn,
.remove-btn {
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.remove-btn {
  background-color: #f44336;
}
.confirm-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.cancel-btn {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}
.image-preview {
  margin-top: 10px;
  text-align: center;
}
.image-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 10px;
  object-fit: cover;
}
</style>
