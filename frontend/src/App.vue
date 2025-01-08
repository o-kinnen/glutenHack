<template>
  <div id="app">
    <HeaderPage />
    <div class="main-content">
      <router-view />
    </div>
    <FooterPage />
  </div>
</template>

<script>
import HeaderPage from './components/HeaderPage.vue'
import FooterPage from './components/FooterPage.vue'
export default {
  name: 'App',
  components: {
    HeaderPage,
    FooterPage
  }
}
</script>
