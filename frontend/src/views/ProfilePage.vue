<template>
    <div class="container mt-5 text-center">
        <div class="card p-4 bg-dark text-white">
            <h2>Bienvenue {{ username }} !</h2>
            <p>Votre adresse mail : <strong>{{ email }}</strong></p>
            <p>Vos intolérances : <strong>aucune</strong></p>
            <p>Vos allergies : <strong>aucune</strong></p>
            <div class="mt-4">
                <button class="btn btn-primary mb-2" @click="modifyProfile">Modifier le profil</button><br>
                <button class="btn btn-secondary mb-2" @click="logout">Se déconnecter</button><br>
                <button class="btn btn-danger" @click="deleteAccount">Supprimer le compte</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ProfilePage',
    data() {
        return {
            username: '',
            email: ''
        }
    },
    methods: {
        async fetchProfile () {
            try {
                const response = await fetch(`${process.env.VUE_APP_URL_BACKEND}/users/profile`, {
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    this.username = data.username
                    this.email = data.email
                } else {
                    this.errorMessage = data.message || 'Erreur lors de la récupération des informations du profil.'
                    this.$router.push('/login')
                }
            } catch (error) {
            this.errorMessage = 'Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.'
            }
        },
        async logout () {
            try {
                const response = await fetch(`${process.env.VUE_APP_URL_BACKEND}/users/logout`, {
                method: 'POST',
                credentials: 'include'
                })
                if (response.ok) {
                    this.$store.dispatch('logout')
                    this.$router.push('/login')
                } else {
                    this.errorMessage = 'Erreur lors de la déconnexion.'
                }
            } catch (error) {
                this.errorMessage = 'Erreur lors de la déconnexion.'
            }
        },
        modifyProfile() {
            // Logique pour modifier le profil
            console.log('Modification du profil');
        },
        async deleteAccount () {
            if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
                try {
                    const response = await fetch(`${process.env.VUE_APP_URL_BACKEND}/users/delete`, {
                        method: 'DELETE',
                        credentials: 'include'
                    })
                    if (response.ok) {
                        alert('Votre compte a été supprimé avec succès.')
                        this.logout()
                    } else {
                        this.errorMessage = 'Erreur lors de la suppression du compte.'
                    }
                } catch (error) {
                    this.errorMessage = 'Erreur lors de la suppression du compte.'
                }
            }
        },
    },
    created() {
        this.fetchProfile()
    }
}
</script>
  
<style scoped>
.container {
    max-width: 600px;
}
.card {
    border-radius: 15px;
}
</style>
   