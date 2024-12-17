<template>
  <div id='app'>
    <HeaderPage />
    <router-view />
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
