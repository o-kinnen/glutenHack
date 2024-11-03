<template>
    <div class="container mt-5 text-center">
        <div class="card p-4 bg-dark text-white">
            <h2 class="mb-4">Mot de passe oublié ?</h2>
            <Form @submit="sendResetLink" class="resetLink-form">
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
                <button type="submit" class="btn btn-light btn-block mb-3">Envoyer un email</button>
                <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
                <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
            </Form>
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
    name: 'PasswordPage',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            email: '',
            errorMessage: '',
            successMessage: '',
        }
    },
    methods: {
        async sendResetLink () {
            try {
                const response = await fetch(`${process.env.VUE_APP_URL_BACKEND}/users/send-reset-link`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: this.email }),
                    credentials: 'include'
                })
                const data = await response.json()
                if (data.success) {
                    this.successMessage = 'Un email de réinitialisation de mot de passe a été envoyé.'
                } else {
                    this.errorMessage = data.message || 'Erreur lors de l\'envoi de l\'email de réinitialisation.'
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