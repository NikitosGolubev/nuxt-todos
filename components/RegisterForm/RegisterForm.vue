<template>
  <v-form class="register-form" @submit.native.prevent="formSubmit">
    <div>
      <v-text-field
        v-model="user.email"
        color="deep-purple darken-1"
        label="E-mail"
        :rules="emailErrorMsg"
        :error="isError(emailValidator, 'email')"
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

    <div>
      <v-text-field
        v-model="user.repeatPassword"
        type="password"
        color="deep-purple darken-1"
        label="Repeat password"
        :rules="repeatPasswordErrorMsg"
        :error="isError(repeatPasswordValidator)"
      />
    </div>

    <div class="register-form__submit">
      <v-btn
        :disabled="isRequestProcessing"
        type="submit"
        x-large
        color="deep-orange"
        class="white--text"
      >
        <span v-show="!isRequestProcessing">Submit!</span>
        <v-progress-circular
          v-show="isRequestProcessing"
          indeterminate
          color="white"
          width="3"
        />
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
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
} from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RegisterForm',
  data: () => ({
    user: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    serverErrors: {},
    wasSubmitted: false,
    isRequestProcessing: false,
  }),
  validations() {
    return {
      user: {
        email: { required, email },
        password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(128),
        },
        repeatPassword: {
          sameAsPassword: sameAs('password'),
        },
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

    repeatPasswordValidator() {
      return this.$v.user.repeatPassword
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
        case !!this.serverErrors.email:
          result = this.serverErrors.email
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
        /** @todo Make min-, max-length dynamic */
        case !validator.required:
          result = 'Field is required'
          break
        case !validator.minLength:
          result = 'Too short, min length is 6'
          break
        case !validator.maxLength:
          result = 'Too long, max length is 128'
          break
        default:
          result = true
          break
      }
      return [result]
    },

    repeatPasswordErrorMsg() {
      let result
      const validator = this.repeatPasswordValidator

      switch (true) {
        case !validator.sameAsPassword:
          result = `Doesn't match with provided password`
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
    ...mapActions(['setAppError']),
    ...mapActions('user', ['createUser']),

    formSubmit() {
      this.validate()
      if (!this.$v.$invalid) this.registerAttempt()
    },

    validate() {
      this.$v.$touch()
      this.wasSubmitted = true
    },

    async registerAttempt() {
      try {
        this.isRequestProcessing = true
        await this.createUser({
          email: this.user.email,
          password: this.user.password,
        })
      } catch (error) {
        /** @todo Improvement candidate */
        if (error.code === 'auth/email-already-in-use') {
          const EMAIL_ALREADY_EXISTS_MESSAGE =
            'You have provied email which is already registered'
          this.$set(this.serverErrors, 'email', EMAIL_ALREADY_EXISTS_MESSAGE)
          this.setAppError(error)
        }
      } finally {
        this.isRequestProcessing = false
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
.register-form {
  &__submit {
    margin-bottom: 24px;
    margin-top: 12px;
  }
}
</style>
