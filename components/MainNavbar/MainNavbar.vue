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
          <template v-if="!isLoggedIn">
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

          <template v-if="isLoggedIn">
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
              <v-btn depressed color="deep-orange" @click="signOut">
                Logout
              </v-btn>
            </div>
          </template>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainNavbar',
  computed: {
    ...mapGetters(['isLoggedIn']),

    mainPageLink() {
      if (this.isLoggedIn) return '/todos'
      return '/'
    },
  },
  watch: {
    isLoggedIn(newVal) {
      if (!newVal) this.$router.push('/')
    },
  },
  methods: {
    ...mapActions('user', ['logout']),

    async signOut() {
      try {
        await this.logout()
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
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
