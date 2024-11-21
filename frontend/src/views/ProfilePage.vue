<template>
    <div class="container mt-5 text-center">
      <div class="card p-4 bg-dark text-white">
        <h2>Bienvenue {{ username }} !</h2>
        <p>Votre adresse mail : <strong>{{ email }}</strong></p>
        <p>Vos allergènes : <strong>{{ selectedRestrictionsText }}</strong></p>
        <div class="mt-4">
          <button class="btn btn-primary mb-2" @click="modifyProfile">Modifier le profil</button><br>
          <button class="btn btn-secondary mb-2" @click="logout">Se déconnecter</button><br>
          <button class="btn btn-danger" @click="deleteAccount">Supprimer le compte</button>
        </div>
      </div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Mes allergènes</h2>
        <form @submit.prevent="submitForm">
          <div class="checkbox-group">
            <label v-for="restriction in restrictions" :key="restriction.name">
              <input
                type="checkbox"
                v-model="restriction.selected"
              />
              {{ restriction.name }}
            </label>
          </div>
          <button type="submit" class="btn btn-primary">Confirmer</button>
          <button type="button" class="btn btn-secondary" @click="showModal = false">Fermer</button>
        </form>
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
      email: '',
      userId: null,
      showModal: false,
      restrictions: [
        { name: "Lactose", selected: false },
        { name: "Gluten", selected: false },
        { name: "Arachide", selected: false },
        { name: "Oeuf", selected: false }
      ]
    };
  },
  computed: {
    selectedRestrictionsText() {
      const selectedRestrictions = this.restrictions
        .filter(item => item.selected)
        .map(item => item.name);
      return selectedRestrictions.length ? selectedRestrictions.join(", ") : "aucune";
    }
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await fetch(`${process.env.VUE_APP_URL_BACKEND}/users/profile`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          this.username = data.username;
          this.email = data.email;
          this.userId = data.user_id;
          this.updatePreferencesFromProfile(data.restrictions);
        } else {
          this.errorMessage = data.message || 'Erreur lors de la récupération des informations du profil.';
          this.$router.push('/login');
        }
      } catch (error) {
        this.errorMessage = 'Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.';
      }
    },
    updatePreferencesFromProfile(restrictions) {
      this.restrictions.forEach(restriction => {
        restriction.selected = restrictions.includes(restriction.name);
      });
    },
    modifyProfile() {
      this.showModal = true;
    },
    async submitForm() {
      const selectedRestrictions = this.restrictions.filter(item => item.selected).map(item => item.name);
  
      try {
        const response = await fetch(`${process.env.VUE_APP_URL_BACKEND}/users/update-preferences/${this.userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ restrictions: selectedRestrictions}),
          credentials: 'include',
        });
  
        if (response.ok) {
          this.showModal = false;
          await this.fetchProfile();
        } else {
          console.error('Erreur lors de la mise à jour des préférences.');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },
    async logout() {
      try {
        const response = await fetch(`${process.env.VUE_APP_URL_BACKEND}/users/logout`, {
          method: 'POST',
          credentials: 'include',
        });
        if (response.ok) {
          this.$store.dispatch('logout');
          this.$router.push('/login');
        } else {
          this.errorMessage = 'Erreur lors de la déconnexion.';
        }
      } catch (error) {
        this.errorMessage = 'Erreur lors de la déconnexion.';
      }
    },
    async deleteAccount() {
      if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
        try {
          const response = await fetch(`${process.env.VUE_APP_URL_BACKEND}/users/delete`, {
            method: 'DELETE',
            credentials: 'include',
          });
          if (response.ok) {
            alert('Votre compte a été supprimé avec succès.');
            this.$store.dispatch('logout');
            this.$router.push('/');
          } else {
            this.errorMessage = 'Erreur lors de la suppression du compte.';
          }
        } catch (error) {
          this.errorMessage = 'Erreur lors de la suppression du compte.';
        }
      }
    },
  },
  created() {
    this.fetchProfile();
  },
};
</script>
  
<style scoped>
.container {
  max-width: 600px;
}
.card {
  border-radius: 15px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}
.checkbox-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.section {
  text-align: left;
}
button {
  margin-top: 10px;
}
</style>
  