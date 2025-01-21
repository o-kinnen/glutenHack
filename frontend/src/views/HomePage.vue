<template>
  <div class="home">
    <h1>Générateur de recettes AI</h1>
    <div class="content">
      <div class="features">
        <div class="feature-box">
          <i class="bi bi-journal-plus icon"></i>
          <p>Crée des recettes selon tes préférences.</p>
        </div>
        <div class="feature-box">
          <i class="bi bi-pencil-square icon"></i>
          <p>Ajoute et modifie tes propres recettes.</p>
        </div>
        <div class="feature-box">
          <i class="bi bi-arrow-repeat icon"></i>
          <p>Transforme tes restes en délicieux repas.</p>
        </div>
        <div class="feature-box">
          <i class="bi bi-shield-lock icon"></i>
          <p>Sauvegarde tes restrictions alimentaires.</p>
        </div>
        <div class="feature-box">
          <i class="bi bi-cart icon"></i>
          <p>Crée une liste de courses automatique.</p>
        </div>
        <div class="feature-box">
          <i class="bi bi-search icon"></i>
          <p>Vérifie la présence des allergènes dans un aliment.</p>
        </div>
        <div class="feature-box">
          <i class="bi bi-file-earmark-pdf icon"></i>
          <p>Partage tes recettes en format pdf.</p>
        </div>
        <div class="feature-box">
          <i class="bi bi-camera icon"></i>
          <p>Prends en photo tes ingrédients pour obtenir des recettes correspondantes.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home {
  background-color: #212121;
  border: none;
  border-radius: 8px;
  width: 90%;
  max-width: 100%;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
}
.content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #C56929;
}
.content p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}
.features {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.feature-box {
  background-color: #171717;
  border: 1px solid #C56929;
  border-radius: 10px;
  max-width: 300px;
  padding: 15px;
  flex: 1 1 calc(30% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.feature-box:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.feature-box p {
  margin: 10px 0 0;
  font-size: 1rem;
  line-height: 1.4;
}
.icon {
  font-size: 2rem;
  color: #BA9371;
  background-color: #2c2c2c;
  border-radius: 50%;
  padding: 10px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 768px) {
  .feature-box {
    flex: 1 1 100%;
  }
}
</style>
