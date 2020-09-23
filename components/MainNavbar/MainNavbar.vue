<template>
  <div>
    <v-app-bar fixed color="deep-purple darken-1" dark>
      <v-container class="d-flex justify-space-between align-center">
        <div>
          <nuxt-link :to="mainPageLink" class="white--text">
            <span class="text-h5 font-weight-medium">Nuxt TODO</span>
          </nuxt-link>
        </div>

        <div class="navigation-links">
          <template v-if="!isAuthenticated">
            <div class="navigation-links__item">
              <nuxt-link
                exact
                active-class="link_active"
                class="link link_white"
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
          </template>

          <template v-if="isAuthenticated">
            <div class="navigation-links__item">
              <nuxt-link
                exact
                active-class="link_active"
                class="link link_white"
                to="/todos"
              >
                My todos
              </nuxt-link>
            </div>
            <div class="navigation-links__item">
              <nuxt-link to="/todos/create">
                <v-btn color="green">
                  Create new
                </v-btn>
              </nuxt-link>
            </div>
            <div class="navigation-links__item">
              <nuxt-link to="/logout">
                <v-btn depressed color="deep-orange">
                  Logout
                </v-btn>
              </nuxt-link>
            </div>
          </template>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'MainNavbar',
  computed: {
    isAuthenticated() {
      /** @todo Abstraction! */
      return !!this.$fireAuth.currentUser;
    },
    
    mainPageLink() {
      if (this.isAuthenticated) return '/todos';
      return '/';
    }
  },
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
</style>
