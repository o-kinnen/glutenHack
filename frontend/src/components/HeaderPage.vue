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
        <div v-if="menuOpen" class="menu-overlay1" @click="closeMenu"></div>
        <div v-if="menuOpen" class="menu-mobile1">
          <ul class="navbar-nav1">
            <li class="nav-item1">
              <router-link to="/recipe" class="menu-item1" @click="closeMenu">Générer une recette</router-link>
            </li>
            <li class="nav-item1">
              <router-link to="/my-recipes" class="menu-item1" @click="closeMenu">Mes recettes</router-link>
            </li>
            <li class="nav-item1">
              <router-link to="/recipes" class="menu-item1" @click="closeMenu">Autres recettes</router-link>
            </li>
            <li class="nav-item1">
              <router-link to="/grocery" class="menu-item1" @click="closeMenu">Liste des courses</router-link>
            </li>
            <li class="nav-item1">
              <router-link to="/ingredients" class="menu-item1" @click="closeMenu">Mes ingrédients</router-link>
            </li>
            <li class="nav-item1">
              <router-link to="/analyse" class="menu-item1" @click="closeMenu">Analyse des aliments</router-link>
            </li>
            <li class="nav-item1">
              <router-link to="/profile" class="menu-item1" @click="closeMenu">Profil</router-link>
            </li>
          </ul>
        </div>
        <div v-else class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item me-3">
              <router-link to="/recipe" class="nav-link">Générer une recette</router-link>
            </li>
            <li class="nav-item me-3">
              <router-link to="/my-recipes" class="nav-link">Mes recettes</router-link>
            </li>
            <li class="nav-item me-3">
              <router-link to="/recipes" class="nav-link">Autres recettes</router-link>
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
        <div v-if="menuOpen" class="menu-overlay" @click="closeMenu"></div>
        <div v-if="menuOpen" class="menu-mobile">
          <router-link to="/signup" class="menu-item" @click="closeMenu">Créer un compte</router-link><br>
          <router-link to="/login" class="menu-item" @click="closeMenu">Se connecter</router-link>
        </div>
        <div v-else class="collapse navbar-collapse" id="navbarNav">
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
      if (this.menuOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    },
    closeMenu() {
      this.menuOpen = false;
      document.body.classList.remove('menu-open');
    },
  }
};
</script>