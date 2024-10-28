<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4">
          <Form @submit="handleSignup" class="signup-form">
            <div class="mb-3">
              <label for="name" class="form-label">Nom</label>
              <Field 
                id="name" 
                name="name" 
                type="text" 
                class="form-control" 
                v-model="name"
                rules="required|min:3"
              />
              <ErrorMessage name="name" class="text-danger"/>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { Form, Field, ErrorMessage } from 'vee-validate';

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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
      formSubmitted: false,
    };
  },
  methods: {
    handleSignup(values) {
      this.formSubmitted = true;
      if (this.termsAccepted) {
        console.log('Formulaire rempli correctement');
        console.log('Formulaire soumis avec succès', values);
        // axios.post('/api/signup', values)
        //   .then(response => { /* redirection */ })
        //   .catch(error => { /* afficher message d'erreur */ })
      } else {
        console.log('Formulaire contient des erreurs');
      }
    },
  },
};
</script>
