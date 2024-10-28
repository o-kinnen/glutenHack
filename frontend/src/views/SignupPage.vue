<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4">
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
                rules="required|email|emailFormat"
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
              <label for="terms" class="form-check-label">J'accepte les conditions d'utilisation</label>
              <a href="/conditions" class="terms-link ms-2">Lire les termes de confidentialité</a>
              <span v-if="!termsAccepted && formSubmitted" class="text-danger">Vous devez accepter les conditions d'utilisation</span>
            </div>
            <button type="submit" class="btn btn-primary w-100">Créer un compte</button>
            <p class="text-center mt-3">Déjà un compte ? <a href="/connexion">Se connecter</a></p>
          </Form>
          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
          <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { Form, Field, ErrorMessage } from 'vee-validate';
import axios from 'axios';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('required', value => {
  return value ? true : 'Veuillez remplir ce champ correctement.';
});
defineRule('matches', (value, [target], ctx) => {
  return value === ctx.form[target] || 'Les mots de passe ne correspondent pas';
});
defineRule('emailFormat', (value) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value) || 'Le format de l\'adresse mail est invalide';
});
defineRule('passwordUppercase', (value) => {
  return /[A-Z]/.test(value) || 'Le mot de passe doit contenir au moins une lettre majuscule';
});
defineRule('passwordLowercase', (value) => {
  return /[a-z]/.test(value) || 'Le mot de passe doit contenir au moins une lettre minuscule';
});
defineRule('passwordNumber', (value) => {
  return /[0-9]/.test(value) || 'Le mot de passe doit contenir au moins un chiffre';
});
defineRule('passwordSpecial', (value) => {
  return /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Le mot de passe doit contenir au moins un caractère spécial';
});
defineRule('noSpaces', (value) => {
  return !/\s/.test(value) || "Le mot de passe ne doit pas contenir d'espaces";
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
        this.errorMessage = 'Vous devez accepter les conditions d\'utilisation';
        return;
      }
      this.errorMessage = '';
      await this.handleSignup();
    },
    async handleSignup() {
      try {
        await axios.post(`${process.env.VUE_APP_URL_BACKEND}/signup`, {
          username: this.username,
          email: this.email,
          password: this.password
        }, {
          withCredentials: true
        });
        this.successMessage = 'Inscription réussie ! Redirection vers la page de connexion...';
        setTimeout(() => {
          this.$router.push('/');
        }, 1500);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.';
        }
      }
    },
  },
}
</script>

