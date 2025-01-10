<template>
  <div class="container">
    <div class="card p-4 text-white">
      <h2>Bienvenue {{ username }} !</h2>
      <p>Mon adresse mail : <strong>{{ email }}</strong></p>
      <p>Mes allergènes :</p>
      <div v-if="selectedRestrictions.length" class="allergens-grid">
        <div v-for="(restriction, index) in selectedRestrictions" :key="index" class="allergen-item">
        <img :src="`/img/${restriction.toLowerCase()}.png`" alt="Icone" class="restriction-icon" />
        <span><strong>{{ restriction }}</strong></span>
        </div>
      </div>
      <p v-else><strong>Aucun</strong></p>
      <div v-if="errorMessage" class="error-alert">
        {{ errorMessage }}
      </div>
      <div class="mt-4">
        <button class="button btn mb-2" @click="modifyProfile">Modifier mes allergènes</button><br>
        <button class="button btn mb-2" @click="logout">Se déconnecter</button><br>
        <button class="button btn" @click="deleteAccount">Supprimer le compte</button>
      </div>
    </div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Mes allergènes</h2>
        <form @submit.prevent="submitForm">
          <div class="checkbox-group">
            <label v-for="restriction in restrictions" :key="restriction.name">
              <input type="checkbox" v-model="restriction.selected"/>
              <span class="text-and-icon">
                <img :src="`/img/${restriction.name.toLowerCase()}.png`" alt="Icone" class="restriction-icon" />
                {{ restriction.name }}
              </span>
            </label>
          </div>
          <button type="submit" class="button btn me-3">Confirmer</button>
          <button type="button" class="button btn" @click="showModal = false">Fermer</button>
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
      errorMessage: '',
      restrictions: [
        { name: "Gluten", selected: false },
        { name: "Lait", selected: false},
        { name: "Oeufs", selected: false },
        { name: "Arachide", selected: false },
        { name: "Fruits à coque", selected: false },
        { name: "Poissons", selected: false },
        { name: "Soja", selected: false },
        { name: "Crustacés", selected: false },
        { name: "Moutarde", selected: false },
        { name: "Céleri", selected: false }
      ]
    }
  },
  computed: {
    selectedRestrictions() {
      return this.restrictions.filter(item => item.selected).map(item => item.name);
    },
    selectedRestrictionsText() {
      return this.selectedRestrictions.length ? this.selectedRestrictions.join(", ") : "Aucun";
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
        this.handleError('Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.', error);
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
          this.handleError('Erreur lors de la mise à jour des préférences.');
        }
      } catch (error) {
        this.handleError('Erreur:', error);
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
          this.handleError('Erreur lors de la déconnexion. Veuillez réessayer.');
        }
      } catch (error) {
        this.handleError('Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.', error);
      }
    },
    async deleteAccount() {
      if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Les recettes publiques seront conservées en anonyme et seules les recettes privées seront supprimées.')) {
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
            this.handleError('Erreur lors de la suppression du compte. Veuillez réessayer.');
          }
        } catch (error) {
          this.handleError('Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.', error);
        }
      }
    },
    handleError(userMessage, error = null) {
      this.errorMessage = userMessage;
      if (process.env.NODE_ENV !== 'production' && error) {
        console.error('Erreur:', error);
      }
    }
  },
  created() {
    this.fetchProfile();
  },
};
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
button {
  background-color: #BA9371;
  color: white;
  border: none;
  transition: all 0.3s ease;
}
button:hover {
  background-color: #C56929;
  transform: scale(1.05);
  color: white;
}
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background-color: #212121;
  color: #fff;
  padding: 20px;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  animation: fadeIn 0.3s ease-out;
}
.checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}
.checkbox-group label {
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  align-items: center;
}
input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
}
input[type="checkbox"]:checked {
  background-color: #C56929;
  border-color: #C56929;
}
input[type="checkbox"]:checked::after {
  content: "✓";
  color: #ffffff;
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.text-and-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.restriction-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
.restriction-icon:hover {
  transform: scale(1.2);
  opacity: 0.8;
}
.checkbox-group input[type="checkbox"] {
  margin-left: 10px;
}
.allergens-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  justify-items: center;
  align-items: center;
}
.allergen-item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.error-alert {
  color: red;
  background-color: #fdd;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  text-align: center;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
  