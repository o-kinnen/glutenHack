<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3 v-if="mode === 'create'">Créer une recette</h3>
      <h3 v-else>Modifier la recette</h3>
      <form @submit.prevent="validateForm">
        <div class="form-group">
          <label for="recipe-title">Titre de la recette : </label>
          <input type="text" id="recipe-title" v-model="localRecipe.recipe_name" />
          <span v-if="errors.recipe_name" class="error-text">{{ errors.recipe_name }}</span>
        </div>
        <div class="form-group">
          <label for="recipe-photo">Photo de la recette</label>
          <input type="file" id="recipe-photo" @change="handleFileUpload" name="image" accept=".png, .jpg, .jpeg" />
          <div class="image-preview">
            <img :src="previewImage || localRecipe.image_url || defaultImage" alt="Aperçu de l'image" />
            <i v-if="previewImage || localRecipe.image_url !== defaultImage" 
              class="bi bi-trash-fill icon-action remove-photo" 
              @click="removePhoto" 
              title="Supprimer">
            </i>
          </div>
          <span v-if="errors.image" class="error-text">{{ errors.image }}</span>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="recipe-preparation-time">Préparation : </label>
            <select id="recipe-preparation-time" v-model="localRecipe.preparation_time">
              <option value="">Choisissez une option</option>
              <option value="Rapide">Rapide</option>
              <option value="Moyen">Moyen</option>
              <option value="Long">Long</option>
            </select>
            <span v-if="errors.preparation_time" class="error-text">{{ errors.preparation_time }}</span>
          </div>
          <div class="form-group">
            <label for="recipe-difficulty">Difficulté : </label>
            <select id="recipe-difficulty" v-model="localRecipe.difficulty">
              <option value="">Choisissez une option</option>
              <option value="Facile">Facile</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Complexe">Complexe</option>
            </select>
            <span v-if="errors.difficulty" class="error-text">{{ errors.difficulty }}</span>
          </div>
          <div class="form-group">
            <label for="recipe-people">Part(s) : </label>
            <input type="number" id="recipe-people" v-model="localRecipe.number_of_person" min="1" max="8" />
            <span v-if="errors.number_of_person" class="error-text">{{ errors.number_of_person }}</span>
          </div>
          <div class="form-group">
            <label for="recipe-cuisine">Cuisine : </label>
            <select id="recipe-cuisine" v-model="localRecipe.cuisine_type">
              <option value="">Choisissez une option</option>
              <option value="Africaine">Africaine</option>
              <option value="Asiatique">Asiatique</option>
              <option value="Européenne">Européenne</option>
              <option value="Américaine">Américaine</option>
              <option value="Méditerranéenne">Méditerranéenne</option>
              <option value="Indienne">Indienne</option>
              <option value="Moyen-Orientale">Moyen-Orientale</option>
              <option value="Mexicaine">Mexicaine</option>
              <option value="Caribéenne">Caribéenne</option>
              <option value="Italienne">Italienne</option>
              <option value="Chinoise">Chinoise</option>
              <option value="Japonaise">Japonaise</option>
              <option value="Thaïlandaise">Thaïlandaise</option>
              <option value="Coréenne">Coréenne</option>
              <option value="Vietnamienne">Vietnamienne</option>
              <option value="Espagnole">Espagnole</option>
              <option value="Grecque">Grecque</option>
              <option value="Française">Française</option>
              <option value="Allemande">Allemande</option>
              <option value="Nordique">Nordique</option>
              <option value="Brésilienne">Brésilienne</option>
              <option value="Argentine">Argentine</option>
              <option value="Turque">Turque</option>
              <option value="Marocaine">Marocaine</option>
              <option value="Éthiopienne">Éthiopienne</option>
            </select>
            <span v-if="errors.cuisine_type" class="error-text">{{ errors.cuisine_type }}</span>
          </div>
          <div class="form-group">
            <label for="recipe-type">Type : </label>
            <select id="recipe-type" v-model="localRecipe.category_type">
              <option value="">Choisissez une option</option>
              <option value="Petit-déjeuner">Petit-déjeuner</option>
              <option value="Lunch">Lunch</option>
              <option value="Dîner">Dîner</option>
              <option value="Dessert">Dessert</option>
            </select>
            <span v-if="errors.category_type" class="error-text">{{ errors.category_type }}</span>
          </div>
        </div>
        <div class="form-group">
          <label>Ingrédients</label>
          <div v-for="(ingredient, index) in localRecipe.ingredients" :key="index" class="ingredient-group">
            <input type="text" v-model="ingredient.food_name" placeholder="Nom de l'ingrédient" class="ingredient-input" />
            <input type="text" v-model="ingredient.quantity" placeholder="Quantité" class="ingredient-input" />
            <div class="modal-actions-icons">
              <i class="bi bi-trash-fill icon-action" 
                @click="removeIngredient(index)" 
                title="Supprimer"></i>
            </div>
          </div>
          <button type="button" @click="addIngredient" class="button">Ajouter un ingrédient</button>
          <span v-if="errors.ingredients" class="error-text">{{ errors.ingredients }}</span>
        </div>
        <div class="form-group">
          <label>Instructions</label>
          <div v-for="(instruction, index) in localRecipe.instructions" :key="index" class="instruction-group">
            <span class="instruction-number">{{ index + 1 }}.</span>
            <textarea 
              v-model="instruction.step" 
              placeholder="Étape d'instruction" 
              class="instruction-textarea"
            ></textarea>
            <div class="modal-actions-icons">
              <i class="bi bi-trash-fill icon-action" 
                @click="removeInstruction(index)" 
                title="Supprimer"></i>
            </div>
          </div>
          <button type="button" @click="addInstruction" class="button">Ajouter une étape</button>
          <span v-if="errors.instructions" class="error-text">{{ errors.instructions }}</span>
        </div>
        <div class="form-group">
          <label>Sans allergène :</label>
          <div class="checkbox-group">
            <label class="checkbox-item"><input type="checkbox" value="Gluten" v-model="localRecipe.allergens_list" />
              <span class="text-and-icon">
                <img src="/img/gluten.png" alt="Icone" class="restriction-icon" />
                  Gluten
              </span>
            </label>
            <label class="checkbox-item"><input type="checkbox" value="Lait" v-model="localRecipe.allergens_list" />
              <span class="text-and-icon">
                <img src="/img/lait.png" alt="Icone" class="restriction-icon" />
                  Lait
              </span>
            </label>
            <label class="checkbox-item"><input type="checkbox" value="Oeufs" v-model="localRecipe.allergens_list" />
              <span class="text-and-icon">
                <img src="/img/oeufs.png" alt="Icone" class="restriction-icon" />
                  Oeufs
              </span>
            </label>
            <label class="checkbox-item"><input type="checkbox" value="Arachide" v-model="localRecipe.allergens_list" />
              <span class="text-and-icon">
                <img src="/img/arachide.png" alt="Icone" class="restriction-icon" />
                  Arachide
              </span>
            </label>
            <label class="checkbox-item"><input type="checkbox" value="Fruits à coque" v-model="localRecipe.allergens_list" />
              <span class="text-and-icon">
                <img src="/img/noix.png" alt="Icone" class="restriction-icon" />
                  Noix
              </span>
            </label>
            <label class="checkbox-item"><input type="checkbox" value="Poissons" v-model="localRecipe.allergens_list" />
              <span class="text-and-icon">
                <img src="/img/poissons.png" alt="Icone" class="restriction-icon" />
                  Poissons
              </span>
            </label>
            <label class="checkbox-item"><input type="checkbox" value="Soja" v-model="localRecipe.allergens_list" />
              <span class="text-and-icon">
                <img src="/img/soja.png" alt="Icone" class="restriction-icon" />
                  Soja
              </span>
            </label>
            <label class="checkbox-item"><input type="checkbox" value="Crustacés" v-model="localRecipe.allergens_list" />
              <span class="text-and-icon">
                <img src="/img/crustacés.png" alt="Icone" class="restriction-icon" />
                  Crustacés
              </span>
            </label>
            <label class="checkbox-item"><input type="checkbox" value="Moutarde" v-model="localRecipe.allergens_list" />
              <span class="text-and-icon">
                <img src="/img/moutarde.png" alt="Icone" class="restriction-icon" />
                  Moutarde
              </span>
            </label>
            <label class="checkbox-item"><input type="checkbox" value="Céleri" v-model="localRecipe.allergens_list" />
              <span class="text-and-icon">
                <img src="/img/céleri.png" alt="Icone" class="restriction-icon" />
                  Céleri
              </span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="localRecipe.public" />Rendre cette recette publique
          </label>
        </div>
        <div class="action-buttons">
          <button type="submit" class="button">
            {{ mode === 'create' ? 'Créer la recette' : 'Modifier la recette' }}
          </button>
          <button type="button" @click="closeModal" class="button">Annuler</button>
        </div>
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
        image_url: null,
      },
      previewImage: null,
      errors: {},
      defaultImage: "/img/plat.png",
    };
  },
  watch: {
    recipe: {
      immediate: true,
      handler(newRecipe) {
        if (newRecipe && Object.keys(newRecipe).length > 0) {
          this.localRecipe = { ...newRecipe };
          this.previewImage = newRecipe.image_url || null;
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
          this.previewImage = null;
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
      if (this.localRecipe.allergens_list.length === 0) {
        this.localRecipe.allergens_list = ["Pas de mention"];
      }
      if (Object.keys(this.errors).length === 0) {
        this.handleSubmit();
      }
    },
    handleSubmit() {
      if (this.mode === "create") {
        this.$emit("create-recipe", { ...this.localRecipe });
      } else if (this.mode === "edit") {
        if (!this.localRecipe.image && this.localRecipe.image_url) {
          this.localRecipe.image = this.defaultImage;
        }
        this.$emit("update-recipe", { ...this.localRecipe });
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
    removePhoto() {
      this.localRecipe.image = null;
      this.localRecipe.image_url = this.defaultImage;
      this.previewImage = null;
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
  padding: 10px;
}
.modal-content {
  max-height: 90vh;
  overflow-y: auto;
  background: #212121;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 1000px;
  text-align: left;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
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
  background-color: #C56929;
  border-color: #C56929;
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
.instruction-textarea {
  flex: 1;
  min-height: 60px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  resize: vertical;
  overflow-y: auto;
}
#recipe-title {
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.ingredient-input{
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.form-grid {
  display: grid;
  gap: 20px;
  margin-top: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 10px;
  align-items: center;
}
.checkbox-item {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: white;
  width: 100%;
  gap: 8px;
}
.checkbox-item input[type="checkbox"] {
  margin-right: 8px;
  width: 18px;
  height: 18px;
  accent-color: #C56929;
}
.action-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;
}
.error-text {
  color: red;
}
@media (max-width: 768px) {
  .modal-content {
    max-width: 90%;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .checkbox-group {
    grid-template-columns: 1fr;
  }
  .ingredient-group {
    flex-direction: column;
    align-items: stretch;
  }
  .ingredient-input {
    width: 100%;
  }
}
.ingredient-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
.ingredient-input {
  flex: 1;
  min-width: 120px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}
.text-and-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 170px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.restriction-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  transition: all 0.3s ease;
}
.restriction-icon:hover {
  transform: scale(1.2);
  opacity: 0.8;
}
</style>