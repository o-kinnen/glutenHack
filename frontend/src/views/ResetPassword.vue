<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card p-4">
                    <Form @submit="resetPassword" class="resetPassword-form">
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
                        <button type="submit" class="btn btn-primary w-100">Réinitialiser le mot de passe</button>
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
import { Form, Field, ErrorMessage } from 'vee-validate';
  
defineRule('required', value => {
    return value ? true : 'Veuillez remplir ce champ correctement.';
});
defineRule('min', (value, [limit]) => {
    if (value && value.length < limit) {
        return `Veuillez remplir ce champ avec au moins ${limit} caractères.`;
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
    name: 'ResetPassword',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            password: '',
            confirmPassword: '',
            errorMessage: '',
            successMessage: '',
            token: this.$route.query.token
        };
    },
    methods: {
        async resetPassword () {
            try {
                const response = await fetch(`${process.env.VUE_APP_URL_BACKEND}/users/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: this.token,
                    newPassword: this.password
                }),
                credentials: 'include'
                })
                const data = await response.json()
                if (data.success) {
                    this.successMessage = 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.'
                    setTimeout(() => {
                    this.$router.push('/login')
                }, 1500)
                } else {
                    this.errorMessage = data.message || 'Erreur lors de la réinitialisation du mot de passe.'
                }
            } catch (error) {
                this.errorMessage = 'Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.'
            }
        } 
    }
}
</script>