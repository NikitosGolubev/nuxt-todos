<template>
  <div class="guest-page">
    <div class="guest-page__header">
      <div class="text-description">
        <h1 class="text-description__title text-h3 font-weight-medium">
          Planning has never been the&nbsp;same
        </h1>

        <p>
          Culpa est ut excepteur nisi laboris Lorem dolor id. Consectetur in
          duis duis laboris nostrud cupidatat aute cupidatat ea nulla aliquip ea
          proident mollit sint. Officia consequat amet culpa aliquip est officia
          cillum aute id tempor irure. Duis cupidatat enim duis eiusmod aliquip
          occaecat aliqua tempor.
        </p>

        <p>
          Culpa est ut excepteur nisi laboris Lorem dolor id. Consectetur in
          laboris nostrud cupidatat aute cupidatat ea nulla aliquip ea proident
          mollit sint. Officia consequat amet culpa aliquip est officia cillum
          aute id tempor irure. Duis cupidatat enim duis eiusmod aliquip quis
          occaecat aliqua tempor.
        </p>

        <div class="text-description__action-call">
          <nuxt-link to="/register">
            <v-btn depressed x-large color="deep-orange" class="white--text">
              Supercharge your life
            </v-btn>
          </nuxt-link>
        </div>
      </div>

      <div class="todo-illustration">
        <img
          class="todo-illustration__img"
          src="~/assets/img/illustrations/todo.svg"
          alt="Todo illustration"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
}
</script>

<style scoped lang="scss">
.guest-page {
  &__header {
    display: flex;
    justify-content: space-between;
  }
}

.text-description {
  max-width: 500px;

  &__title {
    margin-bottom: 16px;
  }

  &__action-call {
    margin-top: 32px;
  }
}

.todo-illustration {
  padding: 0 20px;
  text-align: center;

  &__img {
    max-width: 700px;
    width: 100%;
  }
}
</style>
