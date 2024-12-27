<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>Créer une recette manuellement</h3>
      <form @submit.prevent="validateForm">
        <div class="form-group">
          <label for="recipe-title">Titre de la recette</label>
          <input type="text" id="recipe-title" v-model="recipe.title" />
          <span v-if="errors.title">{{ errors.title }}</span>
        </div>

        <div class="form-group">
          <label for="recipe-photo">Photo de la recette</label>
          <input type="file" id="recipe-photo" @change="handleFileUpload" accept=".png, .jpg, .jpeg" />
          <div v-if="previewImage" class="image-preview">
            <img :src="previewImage" alt="Aperçu de l'image" />
          </div>
          <span v-if="errors.image">{{ errors.image }}</span>
        </div>

        <div class="form-group">
          <label for="recipe-preparation-time">Temps de préparation</label>
          <select id="recipe-preparation-time" v-model="recipe.time">
            <option value="">Choisissez une option</option>
            <option value="Rapide">Rapide</option>
            <option value="Moyen">Moyen</option>
            <option value="Long">Long</option>
          </select>
          <span v-if="errors.time">{{ errors.time }}</span>
        </div>

        <div class="form-group">
          <label for="recipe-difficulty">Difficulté</label>
          <select id="recipe-difficulty" v-model="recipe.difficulty">
            <option value="">Choisissez une option</option>
            <option value="Facile">Facile</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Complexe">Complexe</option>
          </select>
          <span v-if="errors.difficulty">{{ errors.difficulty }}</span>
        </div>

        <div class="form-group">
          <label for="recipe-people">Nombre de personnes</label>
          <input type="number" id="recipe-people" v-model="recipe.people" min="1" />
          <span v-if="errors.people">{{ errors.people }}</span>
        </div>

        <div class="form-group">
          <label for="recipe-cuisine">Cuisine</label>
          <select id="recipe-cuisine" v-model="recipe.cuisine">
            <option value="">Choisissez une option</option>
            <option value="Africaine">Africaine</option>
            <option value="Asiatique">Asiatique</option>
            <option value="Européenne">Européenne</option>
            <option value="Américaine">Américaine</option>
          </select>
          <span v-if="errors.cuisine">{{ errors.cuisine }}</span>
        </div>

        <div class="form-group">
          <label for="recipe-type">Type</label>
          <select id="recipe-type" v-model="recipe.type">
            <option value="">Choisissez une option</option>
            <option value="Petit-déjeuner">Petit-déjeuner</option>
            <option value="Lunch">Lunch</option>
            <option value="Dîner">Dîner</option>
            <option value="Dessert">Dessert</option>
          </select>
          <span v-if="errors.type">{{ errors.type }}</span>
        </div>

        <div class="form-group">
          <label>Ingrédients</label>
          <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredient-group">
            <input type="text" v-model="ingredient.name" placeholder="Nom de l'ingrédient" />
            <input type="text" v-model="ingredient.quantity" placeholder="Quantité" />
            <button type="button" @click="removeIngredient(index)" class="remove-btn">Supprimer</button>
          </div>
          <button type="button" @click="addIngredient" class="add-btn">Ajouter un ingrédient</button>
          <span v-if="errors.ingredients">{{ errors.ingredients }}</span>
        </div>

        <div class="form-group">
          <label>Instructions</label>
          <div v-for="(instruction, index) in recipe.instructions" :key="index" class="instruction-group">
            <input type="text" v-model="instruction.step" placeholder="Étape d'instruction" />
            <button type="button" @click="removeInstruction(index)" class="remove-btn">Supprimer</button>
          </div>
          <button type="button" @click="addInstruction" class="add-btn">Ajouter une étape</button>
          <span v-if="errors.instructions">{{ errors.instructions }}</span>
        </div>

        <div class="form-group">
          <label>Sans allergène</label>
          <div class="checkbox-group">
            <label><input type="checkbox" value="Lactose" v-model="recipe.restrictionsList" /> Lactose</label>
            <label><input type="checkbox" value="Gluten" v-model="recipe.restrictionsList" /> Gluten</label>
            <label><input type="checkbox" value="Arachide" v-model="recipe.restrictionsList" /> Arachide</label>
            <label><input type="checkbox" value="Œuf" v-model="recipe.restrictionsList" /> Œuf</label>
          </div>
          <span v-if="errors.restrictionsList">{{ errors.restrictionsList }}</span>
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
      },
      previewImage: null,
      errors: {},
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.recipe.title) this.errors.title = "Le titre est obligatoire.";
      if (!this.recipe.time) this.errors.time = "Veuillez choisir un temps de préparation.";
      if (!this.recipe.difficulty) this.errors.difficulty = "Veuillez choisir une difficulté.";
      if (!this.recipe.people || this.recipe.people < 1) this.errors.people = "Veuillez indiquer un nombre de personnes valide.";
      if (!this.recipe.cuisine) this.errors.cuisine = "Veuillez choisir une cuisine.";
      if (!this.recipe.type) this.errors.type = "Veuillez choisir un type de recette.";

      if (
        !this.recipe.ingredients.some(
          (ingredient) => ingredient.name && ingredient.quantity
        )
      ) {
        this.errors.ingredients = "Veuillez ajouter au moins un ingrédient avec sa quantité.";
      }

      if (!this.recipe.instructions.some((instruction) => instruction.step)) {
        this.errors.instructions = "Veuillez ajouter au moins une étape d'instruction.";
      }

      if (this.recipe.restrictionsList.length === 0) {
        this.errors.restrictionsList = "Veuillez sélectionner au moins un allergène.";
      }

      if (Object.keys(this.errors).length === 0) {
        this.handleSubmit();
      }
    },
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
        const fileType = file.type;
        if (fileType === "image/png" || fileType === "image/jpeg") {
          this.recipe.image = file;
          this.previewImage = URL.createObjectURL(file);
          this.errors.image = null;
        } else {
          this.errors.image = "Seuls les fichiers PNG et JPG sont acceptés.";
        }
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
