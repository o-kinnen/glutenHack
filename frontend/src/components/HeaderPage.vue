<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light background-nav">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Accueil</router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/inscription" class="nav-link">Créer un compte</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
</template>
  
<script>
export default {
    name: 'HeaderPage',
};
</script>