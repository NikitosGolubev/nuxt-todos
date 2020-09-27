<template>
  <v-form
    ref="loginForm"
    class="login-form"
    @submit.native.prevent="formSubmit"
  >
    <v-slide-y-transition>
      <div v-if="serverErrors.general">
        <v-alert dense type="error">
          {{ serverErrors.general }}
        </v-alert>
      </div>
    </v-slide-y-transition>

    <div>
      <v-text-field
        v-model="user.email"
        color="deep-purple darken-1"
        label="Email"
        :rules="emailErrorMsg"
        :error="isError(emailValidator)"
      />
    </div>

    <div>
      <v-text-field
        v-model="user.password"
        type="password"
        color="deep-purple darken-1"
        label="Password"
        :rules="passwordErrorMsg"
        :error="isError(passwordValidator)"
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
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    user: {
      email: '',
      password: '',
    },
    serverErrors: {},
    wasSubmitted: false,
  }),
  validations() {
    return {
      user: {
        email: { required, email },
        password: { required },
      },
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),

    emailValidator() {
      return this.$v.user.email
    },

    passwordValidator() {
      return this.$v.user.password
    },

    emailErrorMsg() {
      let result
      const validator = this.emailValidator

      switch (true) {
        case !validator.required:
          result = 'Field is required'
          break
        case !validator.email:
          result = 'Incorrect email given'
          break
        default:
          result = true
          break
      }
      return [result]
    },

    passwordErrorMsg() {
      let result
      const validator = this.passwordValidator

      switch (true) {
        case !validator.required:
          result = 'Field is required'
          break
        default:
          result = true
          break
      }
      return [result]
    },
  },
  watch: {
    isLoggedIn(newVal) {
      if (newVal) this.$router.push('/todos')
    },
  },
  methods: {
    ...mapActions('user', ['login']),

    formSubmit() {
      this.validate()
      if (!this.$v.$invalid) this.signInAttempt()
    },

    validate() {
      this.$v.$touch()
      this.wasSubmitted = true
    },

    async signInAttempt() {
      try {
        await this.login({
          email: this.user.email,
          password: this.user.password,
        })
      } catch (error) {
        /** @todo Improvement candidate */
        if (error.code === 'auth/user-not-found') {
          const USER_NOT_FOUND_MESSAGE = `Failed to authenticate with provided credentials`
          this.$set(this.serverErrors, 'general', USER_NOT_FOUND_MESSAGE)
        }
      }
    },

    isError(validator, fieldName = '') {
      if (fieldName && this.serverErrors[fieldName]) return true
      if (this.wasSubmitted) return validator.$invalid
      return false
    },
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
