<template>
  <v-form
    ref="loginForm"
    class="login-form"
    @submit.native.prevent="formSubmit"
  >
    <div>
      <v-text-field
        color="deep-purple darken-1"
        label="Phone number"
        required
      />
    </div>

    <div class="login-form__submit">
      <v-btn x-large type="submit" color="deep-orange" class="white--text">
        Sign in
      </v-btn>
    </div>

    <div class="login-form__alternatives">
      New here? -
      <nuxt-link to="/register" class="link link_primary">
        Welcome, register an account!
      </nuxt-link>
    </div>
  </v-form>
</template>

<script>
export default {
  methods: {
    formSubmit() {},
  },
}
</script>

<style scoped lang="scss">
.login-form {
  &__submit {
    margin-top: 12px;
  }

  &__alternatives {
    margin-top: 24px;
  }
}
</style>
