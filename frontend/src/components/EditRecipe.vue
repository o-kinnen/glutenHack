<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3 v-if="mode === 'create'">Créer une recette</h3>
      <h3 v-else>Modifier la recette</h3>
      <form @submit.prevent="validateForm">
        <div class="form-group">
          <label for="recipe-title">Titre de la recette</label>
          <input type="text" id="recipe-title" v-model="localRecipe.recipe_name" />
          <span v-if="errors.recipe_name">{{ errors.recipe_name }}</span>
        </div>

        <div class="form-group">
          <label for="recipe-photo">Photo de la recette</label>
          <input type="file" id="recipe-photo" @change="handleFileUpload" name="image" accept=".png, .jpg, .jpeg" />

          <div v-if="localRecipe.image_url || previewImage" class="image-preview">
            <img :src="previewImage || localRecipe.image_url" alt="Aperçu de l'image" />
          </div>
        
          <span v-if="errors.image">{{ errors.image }}</span>
        </div>

        <div class="form-group">
          <label for="recipe-preparation-time">Temps de préparation</label>
          <select id="recipe-preparation-time" v-model="localRecipe.preparation_time">
            <option value="">Choisissez une option</option>
            <option value="Rapide">Rapide</option>
            <option value="Moyen">Moyen</option>
            <option value="Long">Long</option>
          </select>
          <span v-if="errors.preparation_time">{{ errors.preparation_time }}</span>
        </div>

        <div class="form-group">
          <label for="recipe-difficulty">Difficulté</label>
          <select id="recipe-difficulty" v-model="localRecipe.difficulty">
            <option value="">Choisissez une option</option>
            <option value="Facile">Facile</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Complexe">Complexe</option>
          </select>
          <span v-if="errors.difficulty">{{ errors.difficulty }}</span>
        </div>

        <div class="form-group">
          <label for="recipe-people">Nombre de personnes</label>
          <input type="number" id="recipe-people" v-model="localRecipe.number_of_person" min="1" />
          <span v-if="errors.number_of_person">{{ errors.number_of_person }}</span>
        </div>

        <div class="form-group">
          <label for="recipe-cuisine">Cuisine</label>
          <select id="recipe-cuisine" v-model="localRecipe.cuisine_type">
            <option value="">Choisissez une option</option>
            <option value="Africaine">Africaine</option>
            <option value="Asiatique">Asiatique</option>
            <option value="Européenne">Européenne</option>
            <option value="Américaine">Américaine</option>
          </select>
          <span v-if="errors.cuisine_type">{{ errors.cuisine_type }}</span>
        </div>

        <div class="form-group">
          <label for="recipe-type">Type</label>
          <select id="recipe-type" v-model="localRecipe.category_type">
            <option value="">Choisissez une option</option>
            <option value="Petit-déjeuner">Petit-déjeuner</option>
            <option value="Lunch">Lunch</option>
            <option value="Dîner">Dîner</option>
            <option value="Dessert">Dessert</option>
          </select>
          <span v-if="errors.category_type">{{ errors.category_type }}</span>
        </div>

        <div class="form-group">
          <label>Ingrédients</label>
          <div v-for="(ingredient, index) in localRecipe.ingredients" :key="index" class="ingredient-group">
            <input type="text" v-model="ingredient.food_name" placeholder="Nom de l'ingrédient" />
            <input type="text" v-model="ingredient.quantity" placeholder="Quantité" />
            <button type="button" @click="removeIngredient(index)" class="button">Supprimer</button>
          </div>
          <button type="button" @click="addIngredient" class="button">Ajouter un ingrédient</button>
          <span v-if="errors.ingredients">{{ errors.ingredients }}</span>
        </div>

        <div class="form-group">
          <label>Instructions</label>
          <div v-for="(instruction, index) in localRecipe.instructions" :key="index" class="instruction-group">
            <input type="text" v-model="instruction.step" placeholder="Étape d'instruction" />
            <button type="button" @click="removeInstruction(index)" class="button">Supprimer</button>
          </div>
          <button type="button" @click="addInstruction" class="button">Ajouter une étape</button>
          <span v-if="errors.instructions">{{ errors.instructions }}</span>
        </div>

        <div class="form-group">
          <label>Sans allergène</label>
          <div class="checkbox-group">
            <label><input type="checkbox" value="Lactose" v-model="localRecipe.allergens_list" /> Lactose</label>
            <label><input type="checkbox" value="Gluten" v-model="localRecipe.allergens_list" /> Gluten</label>
            <label><input type="checkbox" value="Arachide" v-model="localRecipe.allergens_list" /> Arachide</label>
            <label><input type="checkbox" value="Œuf" v-model="localRecipe.allergens_list" /> Œuf</label>
          </div>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" v-model="localRecipe.public" />Rendre cette recette publique
          </label>
        </div>

        <button type="submit" class="button">
          {{ mode === 'create' ? 'Créer la recette' : 'Modifier la recette' }}
        </button>
        <button type="button" @click="closeModal" class="button">Annuler</button>
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
    mode: {
      type: String,
      required: true,
    },
    recipe: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      localRecipe: {
        recipe_name: "",
        preparation_time: "",
        difficulty: "",
        number_of_person: 1,
        cuisine_type: "",
        category_type: "",
        ingredients: [],
        instructions: [{ step: "" }],
        allergens_list: [],
        image: null,
        public: false,
      },
      previewImage: null,
      errors: {},
    };
  },
  watch: {
    recipe: {
      immediate: true,
      handler(newRecipe) {
        if (newRecipe && Object.keys(newRecipe).length > 0) {
          this.localRecipe = { ...newRecipe };
          this.previewImage = null;
          if (typeof newRecipe.instructions === "string") {
            this.localRecipe.instructions = newRecipe.instructions
              .split("\n")
              .map((step) => ({ step: step.trim() }));
          }
        } else {
          this.localRecipe = {
            recipe_name: "",
            preparation_time: "",
            difficulty: "",
            number_of_person: 1,
            cuisine_type: "",
            category_type: "",
            ingredients: [],
            instructions: [{ step: "" }],
            allergens_list: [],
            image: null,
            public: false,
          };
        }
      },
    },
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.localRecipe.recipe_name) this.errors.recipe_name = "Le titre est obligatoire.";
      if (!this.localRecipe.preparation_time)
        this.errors.preparation_time = "Veuillez choisir un temps de préparation.";
      if (!this.localRecipe.difficulty) this.errors.difficulty = "Veuillez choisir une difficulté.";
      if (!this.localRecipe.number_of_person || this.localRecipe.number_of_person < 1)
        this.errors.number_of_person = "Veuillez indiquer un nombre de personnes valide.";
      if (!this.localRecipe.cuisine_type)
        this.errors.cuisine_type = "Veuillez choisir un type de cuisine.";
      if (!this.localRecipe.category_type)
        this.errors.category_type = "Veuillez choisir une catégorie de recette.";

      if (
        !this.localRecipe.ingredients.some(
          (ingredient) => ingredient.food_name && ingredient.quantity
        )
      ) {
        this.errors.ingredients = "Veuillez ajouter au moins un ingrédient avec sa quantité.";
      }

      if (!this.localRecipe.instructions.some((instruction) => instruction.step)) {
        this.errors.instructions = "Veuillez ajouter au moins une étape d'instruction.";
      }

      if (Object.keys(this.errors).length === 0) {
        this.handleSubmit();
      }
    },
    handleSubmit() {
      if (this.mode === "create") {
      this.$emit("create-recipe", { ...this.localRecipe });
    } else if (this.mode === "edit") {
      this.$emit("update-recipe", { ...this.localRecipe, image: this.localRecipe.image });
    }
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const fileType = file.type;
        if (fileType === "image/png" || fileType === "image/jpeg") {
          this.localRecipe.image = file;
          this.previewImage = URL.createObjectURL(file);
        } else {
          this.errors.image = "Seuls les fichiers PNG et JPG sont acceptés.";
        }
      }
    },
    addIngredient() {
      if (!Array.isArray(this.localRecipe.ingredients)) {
        this.localRecipe.ingredients = [];
      }
      this.localRecipe.ingredients.push({ food_name: "", quantity: "" });
    },
    removeIngredient(index) {
      this.localRecipe.ingredients.splice(index, 1);
    },
    addInstruction() {
      if (!Array.isArray(this.localRecipe.instructions)) {
        this.localRecipe.instructions = [];
      }
      this.localRecipe.instructions.push({ step: "" });
    },
    removeInstruction(index) {
      this.localRecipe.instructions.splice(index, 1);
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
  background: #212121;
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
button {
    background-color: #BA9371;
    color: white;
    border: none; 
    transition: all 0.3s ease;
    border-radius: 4px;
    padding: 10px;
    width: auto;
}

button:hover {
    background-color: #C56929;
    transform: scale(1.05); 
    color: white;
}
input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid white; 
  border-radius: 4px; 
  background-color: #fff;
  cursor: pointer;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: #28a745;
  border-color: #28a745;
}

input[type="checkbox"]:checked::after {
  content: "✓";
  color: #ffffff;
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dropdown li:hover {
  background-color: #C56929;
}

</style>
