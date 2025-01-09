<template>
    <div class="container text-center">
        <div class="card p-4 text-white">
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
                <button type="submit" class="btn mb-3">Envoyer un email</button>
                <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
                <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
            </Form>
        </div>
    </div>
</template>

<script>
import { defineRule, Form, Field, ErrorMessage } from 'vee-validate';
import axios from 'axios';

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
                const response = await axios.post(`${process.env.VUE_APP_URL_BACKEND}/users/send-reset-link`,
                    { email: this.email },
                    { withCredentials: true }
                );

                if (response.data.success) {
                    this.successMessage = 'Un email de réinitialisation de mot de passe a été envoyé.';
                } else {
                    this.handleError(new Error(response.data.message || 'Erreur lors de l\'envoi de l\'email de réinitialisation.'));
                }
            } catch (error) {
                this.handleError(error);
            }
        },
        handleError(error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error);
            }
            if (error.response && error.response.data && error.response.data.message) {
                this.errorMessage = error.response.data.message;
            } else {
                this.errorMessage = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';
            }
        }
    }
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
</style>