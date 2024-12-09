<template>
  <div>
    <h1>Mes analyses</h1>
    <p>Recherchez un aliment par code-barre ou nom pour savoir s'il est sûr pour vous.</p>

    <div>
      <label for="codeBarreInput">Entrez un code-barre :</label>
      <input 
        type="text" 
        id="codeBarreInput" 
        v-model="codeBarre" 
        placeholder="Entrez un code-barre" 
      />
      <label for="alimentInput">Ou entrez un nom d'aliment :</label>
      <input 
        type="text" 
        id="alimentInput" 
        v-model="aliment" 
        placeholder="Entrez un aliment" 
      />
      <button @click="verifierAliment">Vérifier</button>
    </div>

    <div v-if="resultat !== null" class="resultat">
      <p v-if="!resultat.peutManger">
        ⚠️ Cet aliment contient des allergènes problématiques pour vous : {{ resultat.allergenesProbleme.join(', ') }}
      </p>
      <p v-else>
        ✅ Cet aliment est sûr pour vous. Aucun allergène problématique détecté.
      </p>

      <p>Liste complète des allergènes identifiés : {{ resultat.allergenes.join(', ') }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AnalysePage",
  data() {
    return {
      codeBarre: "",
      aliment: "",
      resultat: null, 
    };
  },
  methods: {
    async getUserRestrictions() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/restrictions`, {
          withCredentials: true,
        });
        return (response.data.restrictions || []).map(restriction => restriction.toLowerCase());
      } catch (error) {
        console.error('Erreur lors de la récupération des restrictions alimentaires :', error);
        alert('Impossible de récupérer les restrictions alimentaires. Veuillez réessayer.');
        return [];
      }
    },

    async verifierAliment() {
      const codeBarre = this.codeBarre ? this.codeBarre.trim() : "";
      const aliment = this.aliment ? this.aliment.trim() : "";

      if (!codeBarre && !aliment) {
        alert("Veuillez entrer un code-barre ou un nom d'aliment.");
        return;
      }

      try {
        const params = codeBarre ? { codeBarre } : { aliment };

        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/api/food`, { params });
        const allergenesAliment = response.data.allergenes || [];

        const restrictionsUtilisateur = await this.getUserRestrictions();

        const allergenesProbleme = allergenesAliment.filter(allergene =>
          restrictionsUtilisateur.includes(allergene.toLowerCase())
        );

        if (allergenesProbleme.length > 0) {
          this.resultat = {
            allergenes: allergenesAliment,
            peutManger: false,
            allergenesProbleme: allergenesProbleme,
          };
        } else {
          this.resultat = {
            allergenes: allergenesAliment,
            peutManger: true,
            allergenesProbleme: [],
          };
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'aliment :", error);
        alert("Une erreur est survenue lors de la vérification. Veuillez réessayer.");
      }
    },
  },
};
</script>

<style scoped>
.resultat {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>

