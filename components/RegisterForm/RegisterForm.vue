<template>
  <v-form
    ref="registerForm"
    class="register-form"
    @submit.native.prevent="formSubmit"
  >
    <div>
      <v-text-field color="deep-purple darken-1" label="Full name" required />
    </div>
    <div>
      <v-text-field color="deep-purple darken-1" label="Username" required />
    </div>
    <div>
      <v-text-field color="deep-purple darken-1" label="E-mail" required />
    </div>
    <div>
      <v-text-field
        color="deep-purple darken-1"
        label="Phone Number"
        required
      />
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
  methods: {
    formSubmit() {
      this.$refs.registerForm.validate()
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
