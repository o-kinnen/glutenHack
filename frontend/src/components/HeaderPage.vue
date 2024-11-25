<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light background-nav">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Accueil</router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link to="/signup" class="nav-link">Créer un compte</router-link>
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link to="/login" class="nav-link">Se connecter</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link to="/recipe" class="nav-link">Générer une recette</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link to="/my-recipes" class="nav-link">Mes recettes</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link to="/recipes" class="nav-link">Toutes les recettes</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link to="/grocery" class="nav-link">Liste des courses</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link to="/ingredients" class="nav-link">Mes ingrédients</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link to="/analyse" class="nav-link">Analyse des aliments</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link to="/planner" class="nav-link">Planification</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link to="/profile" class="nav-link">Profil</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
</template>
  
<script>
import { mapState } from 'vuex'
export default {
    name: 'HeaderPage',
    computed: {
      ...mapState(['isAuthenticated'])
  }
};
</script>