<template>
  <div>
    <h1>Analyser un aliment</h1>
    <p>Recherchez un aliment en entrant son code-barre pour savoir s'il est sûr pour vous.</p>
      <label for="codeBarreInput">Entrez un code-barre :</label>
      <input 
        type="text" 
        id="codeBarreInput" 
        v-model="codeBarre" 
        placeholder="Entrez un code-barre" 
      />
      <button @click="verifierAliment" class="btn btn-primary w-5">Vérifier</button>

    <div v-if="resultat !== null" class="resultat">
      <p><strong>Nom de l'aliment :</strong> {{ resultat.nomAliment }}</p>
      <div v-if="resultat.imageUrl">
        <p><strong>Photo de l'aliment :</strong></p>
        <img :src="resultat.imageUrl" alt="Photo de l'aliment" style="max-width: 200px; border: 1px solid #ccc;" />
        <p v-if="!resultat.peutManger">
        ⚠️ Cet aliment contient des allergènes problématiques pour vous : {{ resultat.allergenesProbleme.join(', ') }}
      </p>
      <p v-else>
        ✅ Cet aliment semble sûr pour vous. Aucun allergène de votre profil n'est mentionné.
      </p>
      <p class="source">
        <small>{{ resultat.source }}</small>
      </p>
      </div>
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

      if (!codeBarre) {
        alert("Veuillez entrer un code-barre.");
        return;
      }

      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/api/food`, { params: { codeBarre } });
        const allergenesAliment = response.data.allergenes || [];
        const nomAliment = response.data.barcode_name || "Nom inconnu";
        const imageUrl = response.data.imageUrl || "";
        const source = response.data.source || "";

        const restrictionsUtilisateur = await this.getUserRestrictions();

        const allergenesProbleme = allergenesAliment.filter(allergene =>
          restrictionsUtilisateur.includes(allergene.toLowerCase())
        );

        this.resultat = {
          nomAliment, 
          imageUrl, 
          allergenes: allergenesAliment,
          peutManger: allergenesProbleme.length === 0,
          allergenesProbleme,
          source,
        };
      } catch (error) {
        console.error("Erreur lors de la vérification de l'aliment :", error);
        alert("Une erreur est survenue lors de la vérification. Veuillez réessayer.");
      }
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}
.resultat {
  margin-top: 20px;
  font-size: 1.2em;
}
img {
  display: block;
  margin: 10px 0;
}
.source {
  margin-top: 20px;
  font-size: 0.9em;
  color: #666;
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
</style>