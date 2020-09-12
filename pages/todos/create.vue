<template>
  <div>
    <div class="create-todo-form">
      <div class="create-todo-form__title">
        <h1 class="text-h3 font-weight-medium">Create new TODO</h1>
      </div>

      <todo-item-form />
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
.create-todo-form {
  max-width: 600px;
  margin: auto;
  text-align: center;

  &__title {
    margin-bottom: 32px;
  }
}
</style>
