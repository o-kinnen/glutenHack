<template>
  <header>
    <nav class="sidebar" v-if="isAuthenticated">
      <img src="../../public/img/logo.png" style="width:30px; display:block; margin: 0 auto;" alt="Logo du site" class="logo" />
      <h5 class="site-name text-center">CookAller</h5>
      <ul>
        <li>
          <router-link to="/recipe">Générer une recette</router-link>
        </li>
        <li>
          <router-link to="/my-recipes">Mes recettes</router-link>
        </li>
        <li>
          <router-link to="/recipes">Toutes les recettes</router-link>
        </li>
        <li>
          <router-link to="/grocery">Liste des courses</router-link>
        </li>
        <li>
          <router-link to="/ingredients">Mes ingrédients</router-link>
        </li>
        <li>
          <router-link to="/analyse">Analyse des aliments</router-link>
        </li>
        <li>
          <router-link to="/profile">Profil</router-link>
        </li>
      </ul>
    </nav>
    <nav v-else class="navbar navbar-expand-lg navbar-light background-nav">
      <div class="container-fluid">
        <img src="../../public/img/logo.png" style="width:30px; display:block; margin: 0 auto;" alt="Logo du site" class="logo" />
        <router-link class="navbar-brand" to="/"><h5 class="site-name text-center">CookAller</h5></router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/signup" class="nav-link">Créer un compte</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Se connecter</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HeaderPage',
  computed: {
    ...mapState(['isAuthenticated']),
  },
};
</script>
