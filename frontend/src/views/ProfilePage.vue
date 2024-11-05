<template>
    <div class="container mt-5 text-center">
      <div class="card p-4 bg-dark text-white">
        <h2>Bienvenue {{ username }} !</h2>
        <p>Votre adresse mail : <strong>{{ email }}</strong></p>
        <p>Vos intolérances : <strong>{{ selectedIntolerancesText }}</strong></p>
        <p>Vos allergies : <strong>{{ selectedAllergiesText }}</strong></p>
        <div class="mt-4">
          <button class="btn btn-primary mb-2" @click="modifyProfile">Modifier le profil</button><br>
          <button class="btn btn-secondary mb-2" @click="logout">Se déconnecter</button><br>
          <button class="btn btn-danger" @click="deleteAccount">Supprimer le compte</button>
        </div>
      </div>
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Mes Allergies et Intolérances</h2>
          <form @submit.prevent="submitForm">
            <div class="checkbox-group">
              <div class="section">
                <h3>Intolérances</h3>
                <label v-for="intolerance in intolerances" :key="intolerance.name">
                  <input
                    type="checkbox"
                    v-model="intolerance.selected"
                  />
                  {{ intolerance.name }}
                </label>
              </div>
              <div class="section">
                <h3>Allergies</h3>
                <label v-for="allergy in allergies" :key="allergy.name">
                  <input
                    type="checkbox"
                    v-model="allergy.selected"
                  />
                  {{ allergy.name }}
                </label>
              </div>
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
        intolerances: [
          { name: "Lactose", selected: false },
          { name: "Gluten", selected: false }
        ],
        allergies: [
          { name: "Lait", selected: false },
          { name: "Œufs", selected: false }
        ],
      };
    },
    computed: {
      selectedIntolerancesText() {
        const selectedIntolerances = this.intolerances
          .filter(item => item.selected)
          .map(item => item.name);
        return selectedIntolerances.length ? selectedIntolerances.join(", ") : "aucune";
      },
      selectedAllergiesText() {
        const selectedAllergies = this.allergies
          .filter(item => item.selected)
          .map(item => item.name);
        return selectedAllergies.length ? selectedAllergies.join(", ") : "aucune";
      },
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
            this.updatePreferencesFromProfile(data.allergies, data.intolerances);
          } else {
            this.errorMessage = data.message || 'Erreur lors de la récupération des informations du profil.';
            this.$router.push('/login');
          }
        } catch (error) {
          this.errorMessage = 'Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.';
        }
      },
      updatePreferencesFromProfile(allergies, intolerances) {
        this.intolerances.forEach(intolerance => {
          intolerance.selected = intolerances.includes(intolerance.name);
        });
        this.allergies.forEach(allergy => {
          allergy.selected = allergies.includes(allergy.name);
        });
      },
      modifyProfile() {
        this.showModal = true;
      },
      async submitForm() {
        const selectedIntolerances = this.intolerances.filter(item => item.selected).map(item => item.name);
        const selectedAllergies = this.allergies.filter(item => item.selected).map(item => item.name);
  
        try {
          const response = await fetch(`${process.env.VUE_APP_URL_BACKEND}/users/update-preferences/${this.userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ allergies: selectedAllergies, intolerances: selectedIntolerances }),
            credentials: 'include',
          });
  
          if (response.ok) {
            this.showModal = false;
            this.fetchProfile();
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
              this.logout();
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
  