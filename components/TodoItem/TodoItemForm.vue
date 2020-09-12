<template>
  <div>
    <v-form class="todo-item-form">
      <div>
        <v-text-field
          color="deep-purple dense-1"
          label="Todo goal"
          counter="300"
        />
      </div>

      <div class="todo-item-form__submit">
        <v-btn type="submit" x-large dark color="deep-orange">
          {{ submitBtnText }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'TodoItemForm',
  props: {
    formType: {
      type: String,
      default: 'create',
    },
  },
  computed: {
    submitBtnText() {
      if (this.formType === 'edit') return 'Update'
      return 'Create'
    },
  },
}
</script>

<style scoped lang="scss">
.todo-item-form {
  &__submit {
    margin-top: 16px;
  }
}
</style>
