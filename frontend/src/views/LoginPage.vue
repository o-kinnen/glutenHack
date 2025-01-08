<template>
    <div class="auth-page">
    <div class="container mt-5 text-center">
        <div class="row justify-content-center">
        <div class="card p-4 text-white">
            <h2 class="mb-4">Se connecter</h2>
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
            <router-link to="/password" class="router-link">Mot de passe oublié ?</router-link>
            <router-link to="/signup" class="router-link">Pas de compte ?</router-link>
        </div>
    </div>
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
  
<style>
.card {
    background-color: #212121;
    border: none;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
</style>

