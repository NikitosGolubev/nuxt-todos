<template>
  <div>
    <div class="login-form">
      <div class="login-form__title">
        <h1 class="text-h3">Sign in</h1>
      </div>
      <login-form />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm/LoginForm'

export default {
  components: { LoginForm },
}
</script>

<style lang="scss" scoped>
.login-form {
  max-width: 600px;
  margin: auto;
  text-align: center;

  &__title {
    margin-bottom: 16px;
  }
}
</style>
