<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light background-nav" v-if="isAuthenticated">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <router-link to="/" class="d-flex align-items-center text-decoration-none">
            <img src="../../public/img/logo.png" style="width:30px;" alt="Logo du site" class="logo me-2" />
            <h5 class="site-name mb-0">CookAller</h5>
          </router-link>
        </div>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        :class="{ collapsed: !menuOpen }"
        >
        <span class="navbar-toggler-icon"></span>
      </button>
        <div class="collapse navbar-collapse" :class="{ show: menuOpen }" id="navbarNav">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item me-3">
          <router-link to="/recipe" class="nav-link">Générer une recette</router-link>
        </li>
        <li class="nav-item me-3">
          <router-link to="/my-recipes" class="nav-link">Mes recettes</router-link>
        </li>
        <li class="nav-item me-3">
          <router-link to="/recipes" class="nav-link">Toutes les recettes</router-link>
        </li>
        <li class="nav-item me-3">
          <router-link to="/grocery" class="nav-link">Liste des courses</router-link>
        </li>
        <li class="nav-item me-3">
          <router-link to="/ingredients" class="nav-link">Mes ingrédients</router-link>
        </li>
        <li class="nav-item me-3">
          <router-link to="/analyse" class="nav-link">Analyse des aliments</router-link>
        </li>
        <li class="nav-item me-3">
          <router-link to="/profile" class="nav-link">Profil</router-link>
        </li>
      </ul>
    </div>
  </div>
    </nav>
    <nav v-else class="navbar navbar-expand-lg navbar-light background-nav">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <router-link to="/" class="d-flex align-items-center text-decoration-none">
            <img src="../../public/img/logo.png" style="width:30px;" alt="Logo du site" class="logo me-2" />
            <h5 class="site-name mb-0">CookAller</h5>
          </router-link>
        </div>
        <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        :class="{ collapsed: !menuOpen }"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" :class="{ show: menuOpen }" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item me-3">
              <router-link to="/signup" class="nav-link" @click="closeMenu">Créer un compte</router-link>
            </li>
            <li class="nav-item me-3">
              <router-link to="/login" class="nav-link" @click="closeMenu">Se connecter</router-link>
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
  data() {
    return {
      menuOpen: false,
    };
  },
  computed: {
    ...mapState(['isAuthenticated']),
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
  }
};
</script>
