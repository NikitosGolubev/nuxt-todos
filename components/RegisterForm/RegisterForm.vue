<template>
  <v-form class="register-form" @submit.native.prevent="formSubmit">
    <div>
      <v-text-field
        v-model="user.email"
        color="deep-purple darken-1"
        label="E-mail"
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
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
} from 'vuelidate/lib/validators'

export default {
  name: 'RegisterForm',
  data: () => ({
    user: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    wasSubmitted: false,
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
  methods: {
    formSubmit() {
      this.validate()
    },

    validate() {
      this.$v.$touch()
      this.wasSubmitted = true
    },

    isError(validator) {
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
