<template>
  <div class="container">
    <div class="card p-4 text-white">
      <h1>Analyser un aliment</h1>
      <p>Recherchez un aliment en entrant son code-barres pour savoir s'il est sûr pour vous.</p>
      <div class="camera-container d-flex flex-column justify-content-center align-items-center">
        <video id="scanner" class="camera-feed"></video>
        <button @click="activerScanner" class="btn btn-secondary mt-2">Scanner</button>
      </div>
      <div class="d-flex justify-content-center align-items-center gap-2 mt-3">
        <input 
          type="text" 
          id="codeBarreInput" 
          v-model="codeBarre" 
          placeholder="Code-barres" 
          class="form-control w-75"
        />
        <button @click="verifierAliment" class="btn btn-primary w-auto">Vérifier</button>
      </div>
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <button class="close-btn" @click="closeModal">X</button>
          <div v-if="resultat !== null" class="resultat">
            <p v-if="resultat.message">
              ⚠️ <strong>{{ resultat.nomAliment }}</strong> {{ resultat.message }}
            </p>
            <p v-else-if="!resultat.peutManger">
              ⚠️ <strong>{{ resultat.nomAliment }}</strong> contient : <strong>{{ resultat.allergenesProbleme.join(', ') }}</strong>
            </p>
            <p v-else>
              ✅ <strong>{{ resultat.nomAliment }}</strong> semble sûr pour vous.
            </p>
            <div v-if="resultat.imageUrl" class="d-flex justify-content-center">
              <img :src="`${resultat.imageUrl}`" alt="Photo de l'aliment" style="max-width: 200px; border: 1px solid #ccc;" />
            </div>
            <div v-else class="d-flex justify-content-center">
              <p>Image non disponible.</p>
            </div>
            <div v-if="resultat.allergenes && resultat.allergenes.length > 0" class="resultat">
              <p v-if="resultat.allergenes && resultat.allergenes.length > 0">
                Liste complète des allergènes : {{ resultat.allergenes.join(', ') }}
              </p>
              <p v-else>
                Aucun allergène spécifié pour cet aliment.
              </p>
            </div>
            <p class="source">
              <small>Les informations affichées proviennent de la base de données <a :href="'https://world.openfoodfacts.org/product/' + codeBarre" target="_blank" class="text-white">OpenFoodFacts</a>.</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { BrowserMultiFormatReader } from "@zxing/browser";
export default {
  name: "AnalysePage",
  data() {
    return {
      codeBarre: "",
      resultat: null, 
      scanner: null,
      scannerActive: false,
      showModal: false,
    };
  },
  methods: {
    handleError(error, message) {
      if (process.env.VUE_APP_NODE_ENV !== 'production') {
        console.error(message, error);
      }
      alert(message);
    },
    async getUserRestrictions() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/restrictions`, {
          withCredentials: true,
        });
        return (response.data.restrictions || []).map(restriction => restriction.toLowerCase());
      } catch (error) {
        this.handleError(error, 'Impossible de récupérer les restrictions alimentaires. Veuillez réessayer.');
        return [];
      }
    },
    async verifierAliment() {
      const codeBarre = this.codeBarre ? this.codeBarre.trim() : "";
      if (!codeBarre) {
        alert("Veuillez entrer un code-barre.");
        return;
      }
      if (!/^\d+$/.test(codeBarre)) {
        alert("Le code-barre doit uniquement contenir des chiffres.");
        return;
      }
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/api/food`, { params: { codeBarre } });
        const allergenesAliment = response.data.allergenes || [];
        const nomAliment = response.data.barcode_name || "Nom inconnu";
        const imageUrl = response.data.imageUrl ? `${process.env.VUE_APP_URL_BACKEND}${response.data.imageUrl}` : "";
        const source = response.data.source || "";
        const restrictionsUtilisateur = await this.getUserRestrictions();
        const allergenesProbleme = allergenesAliment.filter(allergene =>
          restrictionsUtilisateur.includes(allergene.toLowerCase())
        );
        this.resultat = {
          nomAliment, 
          imageUrl: imageUrl ? `${imageUrl}?t=${Date.now()}` : null,
          allergenes: allergenesAliment,
          peutManger: allergenesProbleme.length === 0,
          allergenesProbleme,
          message: response.data.message || null,
          source,
        };
        this.showModal = true;
      } catch (error) {
        this.handleError(error, "Une erreur est survenue lors de la vérification. Veuillez réessayer.");
        alert("Une erreur est survenue lors de la vérification. Veuillez réessayer.");
      }
    },
    closeModal() {
      this.showModal = false;
    },
    async activerScanner() {
      try {
        this.scanner = new BrowserMultiFormatReader()
        const constraints = {
          video: {
            facingMode: { exact: "environment" }
          }
        };
        const videoElement = document.getElementById("scanner");
        const result = await this.scanner.decodeOnceFromVideoDevice(null, videoElement, constraints);
        if (result) {
          this.codeBarre = result.text;
          this.verifierAliment();
        }
      } catch (error) {
        this.handleError(error, "Impossible d'accéder à la caméra. Veuillez vérifier les permissions.");
        alert("Impossible d'accéder à la caméra. Veuillez vérifier les permissions.");
      }
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  background-color: #212121;
  border: none;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
}
.modal-content {
  background-color: #212121;
  color: #fff;
  padding: 20px;
  border-radius: 12px;
  max-width: 700px;
  max-height: 80vh;
  width: 100%;
  animation: fadeIn 0.3s ease-out;
  overflow-y: auto;
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
.camera-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 16px;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.camera-feed {
  width: 100%;
  max-width: 300px;
  height: 200px;
  border-radius: 8px;
  border: 1px solid rgba(204, 204, 204, 0.6);;
  object-fit: cover;
  background-color: #212121;
}
.camera-placeholder {
  width: 100%;
  max-width: 300px;
  height: 200px;
  border-radius: 8px;
  border: 1px solid rgba(204, 204, 204, 0.6);
  object-fit: cover;
  background-color: #212121;
}
.resultat {
  margin-top: 20px;
  font-size: 1.2em;
}
.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color:white;
}
.close-btn:hover{
  transform: scale(1.05);
}
img {
  display: block;
  margin: 10px 0;
  border-radius: 8px;
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
  padding: 8px 12px;
  max-width: 100px;
}
button.btn:hover {
  background-color: #C56929;
  transform: scale(1.05);
  color: white;
}
input#codeBarreInput {
  max-width: 300px;
  padding: 8px;
  border-radius: 5px;
}
</style>