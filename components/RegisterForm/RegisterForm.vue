<template>
  <v-form
    ref="registerForm"
    class="register-form"
    @submit.native.prevent="formSubmit"
  >
    <div>
      <v-text-field v-model="user.email" color="deep-purple darken-1" label="E-mail" />
    </div>

    <div>
      <v-text-field v-model="user.password" type="password" color="deep-purple darken-1" label="Password" />
    </div>

    <div>
      <v-text-field v-model="user.repeatPassword" type="password" color="deep-purple darken-1" label="Repeat password" />
    </div>

    <div class="register-form__submit">
      <v-btn type="submit" x-large color="deep-orange" class="white--text">
        Submit!
      </v-btn>
    </div>

    <div>
      <span class="text--caption">
        Already have an account? -
        <nuxt-link class="link link_primary" to="/login">
          Sign in!
        </nuxt-link>
      </span>
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data: () => ({
    user: {
      email: '',
      password: '',
      repeatPassword: '',
    }
  }),
  methods: {
    formSubmit() {
      // Submit form
    },
  },
}
</script>

<style scoped lang="scss">
.register-form {
  &__submit {
    margin-bottom: 24px;
    margin-top: 12px;
  }
}
</style>
