<template>
  <div id="app">
    <HeaderPage v-if="!$route.meta.hideNav" />
    <div class="main-content">
      <router-view />
    </div>
    <FooterPage v-if="!$route.meta.hideNav"  />
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
