<template>
  <div class="container">
    <div class="card p-4 text-white">
      <h2 class="mb-4 text-center">Créer un compte</h2>
      <Form @submit="handleSubmit" class="signup-form">
        <div class="mb-3">
          <label for="username" class="form-label">Nom</label>
          <Field 
            id="username" 
            name="username" 
            type="text" 
            class="form-control" 
            v-model="username"
            rules="required|min:3"
          />
          <ErrorMessage name="username" class="text-danger"/>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Adresse mail</label>
          <Field 
            id="email" 
            name="email" 
            type="email" 
            class="form-control" 
            v-model="email"
            rules="required|email"
          />
          <ErrorMessage name="email" class="text-danger"/>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe</label>
          <Field 
            id="password" 
            name="password" 
            type="password" 
            class="form-control" 
            v-model="password"
            rules="required|min:8|passwordUppercase|passwordLowercase|passwordNumber|passwordSpecial|noSpaces"
          />
          <ErrorMessage name="password" class="text-danger"/>
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Répéter le mot de passe</label>
          <Field 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password" 
            class="form-control" 
            v-model="confirmPassword"
            rules="required|matches:password"
          />
          <ErrorMessage name="confirmPassword" class="text-danger"/>
        </div>
        <div class="mb-3 form-check">
          <input 
            id="terms" 
            name="terms" 
            type="checkbox" 
            class="form-check-input" 
            v-model="termsAccepted"
          />
          <label for="terms" class="form-check-label">J'accepte les <router-link to="/terms" class="router-link">conditions d'utilisation</router-link></label><br>
          <router-link to="/privacy-policy" class="router-link">Lire les termes de confidentialité</router-link>
        </div>
        <button type="submit" class="btn btn-primary w-100">Créer un compte</button>
        <p class="text-center mt-3">Déjà un compte ? <router-link class="router-link" to="/login">Se connecter</router-link></p>
      </Form>
      <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
      <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
    </div>
  </div>
</template>

<script>
import { defineRule } from 'vee-validate';
import { Form, Field, ErrorMessage } from 'vee-validate';
import axios from 'axios';
defineRule('required', value => {
  return value ? true : 'Veuillez remplir ce champ correctement.';
});
defineRule('min', (value, [limit]) => {
  if (value && value.length < limit) {
    return `Veuillez remplir ce champ avec au moins ${limit} caractères.`;
  }
  return true;
});
defineRule('email', (value) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    return 'Le format de l\'adresse mail est invalide.';
  }
  return true;
});
defineRule('matches', (value, [target], ctx) => {
  return value === ctx.form[target] || 'Les mots de passe ne correspondent pas.';
});
defineRule('passwordUppercase', (value) => {
  return /[A-Z]/.test(value) || 'Le mot de passe doit contenir au moins une lettre majuscule.';
});
defineRule('passwordLowercase', (value) => {
  return /[a-z]/.test(value) || 'Le mot de passe doit contenir au moins une lettre minuscule.';
});
defineRule('passwordNumber', (value) => {
  return /[0-9]/.test(value) || 'Le mot de passe doit contenir au moins un chiffre.';
});
defineRule('passwordSpecial', (value) => {
  return /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Le mot de passe doit contenir au moins un caractère spécial.';
});
defineRule('noSpaces', (value) => {
  return !/\s/.test(value) || "Le mot de passe ne doit pas contenir d'espaces.";
});
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
      formSubmitted: false,
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async handleSubmit() {
      this.formSubmitted = true;
      if (!this.termsAccepted) {
        this.errorMessage = 'Vous devez accepter les conditions d\'utilisation.';
        return;
      }
      this.errorMessage = '';
      await this.handleSignup();
    },
    async handleSignup() {
      try {
        await axios.post(`${process.env.VUE_APP_URL_BACKEND}/users/signup`, {
          username: this.username,
          email: this.email,
          password: this.password
        }, {
          withCredentials: true
        });
        this.successMessage = 'Inscription réussie ! Redirection vers la page de connexion...';
        setTimeout(() => {
          this.$router.push('/login');
        }, 1500);
      } catch (error) {
        this.errorHandler(error);
      }
    },
    errorHandler(error) {
      if (error.response && error.response.data && error.response.data.message) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = 'Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.';
      }
      if (process.env.VUE_APP_NODE_ENV !== 'production') {
        console.error('[Erreur API]', error);
      }
    },
  },
}
</script>

<style scoped>
.card {
  background-color: #212121;
  border: none;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
button.btn {
  background-color: #BA9371;
  color: white;
  border: none;
  transition: all 0.3s ease;
}
button.btn:hover {
  background-color: #C56929;
  transform: scale(1.05);
  color: white;
}
.router-link {
  text-decoration: none!important;
  color: #ffffff;
  transition: text-decoration 0.3s;
}
.router-link:hover {
  text-decoration: underline!important;
}
input[type="checkbox"]:checked {
  background-color: #C56929;
  border-color: #C56929;
}
</style>