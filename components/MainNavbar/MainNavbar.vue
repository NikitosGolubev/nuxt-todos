<template>
  <div>
    <v-app-bar fixed color="deep-purple darken-1" dark>
      <v-container class="d-flex justify-space-between align-center">
        <div>
          <nuxt-link to="/" class="white--text">
            <span class="text-h5 font-weight-medium">Nuxt TODO</span>
          </nuxt-link>
        </div>

        <div class="navigation-links">
          <div class="navigation-links__item">
            <nuxt-link
              exact
              active-class="navbar-link_active"
              class="navbar-link"
              to="/"
            >
              Main page
            </nuxt-link>
          </div>
          <div class="navigation-links__item">
            <nuxt-link to="/login">
              <v-btn outlined color="white">
                Sign in
              </v-btn>
            </nuxt-link>
          </div>
          <div class="navigation-links__item">
            <nuxt-link to="/register">
              <v-btn depressed color="deep-orange">
                Register
              </v-btn>
            </nuxt-link>
          </div>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'MainNavbar',
}
</script>

<style scoped lang="scss">
.navigation-links {
  display: flex;
  align-items: center;

  &__item {
    margin: 0 16px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.navbar-link {
  color: #fff;
  transition: 0.3s all opacity;

  &:hover,
  &_active {
    opacity: 0.8;
  }
}
</style>
