<template>
    <div class="container mt-5 text-center">
        <div class="card p-4 bg-dark text-white">
            <h2 class="mb-4">Connexion</h2>
            <Form @submit="login">
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
                        rules="required"
                    />
                    <ErrorMessage name="password" class="text-danger"/>
                </div>
                <button type="submit" class="btn btn-light btn-block mb-3">Se connecter</button>
                <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
            </Form>
            <router-link to="/password" class="text-light">Mot de passe oublié ?</router-link>
            <router-link to="/signup" class="text-light">Pas de compte ?</router-link>
        </div>
    </div>
</template>

<script>
import { defineRule, Form, Field, ErrorMessage } from 'vee-validate';

defineRule('required', value => {
  return value ? true : 'Veuillez remplir ce champ correctement.';
});

defineRule('email', value => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    return 'Le format de l\'adresse mail est invalide.';
  }
  return true;
});

export default {
    name: 'LoginPage',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
        }
    },
    methods: {
        async login () {
            try {
                const response = await fetch(`${process.env.VUE_APP_URL_BACKEND}/users/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                })
                const data = await response.json()
                if (response.ok) {
                    this.$store.dispatch('login')
                    this.$router.push('/profile')
                } else {
                    if (response.status === 401) {
                        this.errorMessage = 'Mot de passe incorrect.'
                    } else if (response.status === 404) {
                        this.errorMessage = 'Compte non trouvé.'
                    } else {
                        this.errorMessage = data.message || 'Échec de la connexion. Veuillez vérifier votre email et votre mot de passe.'
                    }
                }
            } catch (error) {
                this.errorMessage = 'Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.'
            }   
        }
    }
}
</script>
  
<style scoped>
.container {
    max-width: 400px;
}
.card {
    border-radius: 15px;
}
</style>
