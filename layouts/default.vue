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
    <error-messager />
  </v-app>
</template>

<script>
import MainNavbar from '@/components/MainNavbar/MainNavbar'
import MainFooter from '@/components/MainFooter/MainFooter'
import ErrorMessager from '@/components/ErrorMessager/ErrorMessager'

export default {
  components: { MainNavbar, MainFooter, ErrorMessager },
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

.link {
  text-decoration: none;
  transition: 0.3s opacity;

  &_white {
    color: #fff !important;
  }

  &_primary {
    color: #ff5722 !important;
  }

  &:hover,
  &_active {
    opacity: 0.7;
  }
}

.content-container {
  padding-top: 140px;
  padding-bottom: 60px;
}
</style>
