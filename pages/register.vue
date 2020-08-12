<template>
  <div>
    <div class="register-form">
      <div class="register-form__title">
        <h1 class="text--h3">Create new account</h1>
      </div>
      <register-form />
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm/RegisterForm'

export default {
  components: { RegisterForm },
}
</script>

<style scoped lang="scss">
.register-form {
  text-align: center;
  max-width: 600px;
  margin: auto;
}
</style>
