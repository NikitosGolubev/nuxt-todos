<template>
  <div>
    <div class="update-todo-form">
      <div class="update-todo-form__title">
        <h1 class="text-h3 font-weight-medium">Edit TODO</h1>
      </div>

      <todo-item-form form-type="edit" />
    </div>
  </div>
</template>

<script>
import TodoItemForm from '@/components/TodoItem/TodoItemForm'

export default {
  components: { TodoItemForm },
}
</script>

<style scoped lang="scss">
.update-todo-form {
  max-width: 600px;
  margin: auto;
  text-align: center;

  &__title {
    margin-bottom: 32px;
  }
}
</style>
