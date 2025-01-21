<template>
  <div class="container">
    <div class="not-found-page">
      <h1>404</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <router-link to="/" class="back-home-link">Retour à la page d'accueil</router-link>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "NotFoundPage",
};
</script>
  
<style scoped>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.not-found-page {
  text-align: center;
  margin-top: 100px;
}
.not-found-page h1 {
  font-size: 100px;
  color: #C56929;
}
.not-found-page p {
  font-size: 18px;
  margin: 20px 0;
}
.back-home-link {
  color: #BA9371;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}
.back-home-link:hover {
  color: #C56929;
}
</style>