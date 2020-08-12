<template>
  <v-app>
    <div class="page">
      <div class="page__content">
        <main-navbar />
        <v-container class="content-container">
          <Nuxt />
        </v-container>
      </div>
      <div class="page__footer">
        <main-footer />
      </div>
    </div>
  </v-app>
</template>

<script>
import MainNavbar from '@/components/MainNavbar/MainNavbar'
import MainFooter from '@/components/MainFooter/MainFooter'

export default {
  components: { MainNavbar, MainFooter },
}
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: space-between;
  justify-content: space-between;
}

a {
  text-decoration: none;
}

.content-container {
  padding-top: 140px;
  padding-bottom: 60px;
}
</style>
