<template>
  <div>
    <div class="update-todo-form">
      <div class="update-todo-form__title">
        <h1 class="text-h3 font-weight-medium">
          Edit TODO: {{ todo.data.content }}
        </h1>
      </div>

      <todo-item-form
        form-type="edit"
        :initial-todo="todo"
        @todo-change="syncTodo"
      />
    </div>
  </div>
</template>

<script>
import TodoItemForm from '@/components/TodoItem/TodoItemForm'

export default {
  components: { TodoItemForm },
  middleware: 'auth',
  validate({ params }) {
    return params.id.length < 128
  },
  async asyncData({ params, store, error }) {
    try {
      const todo = await store.dispatch('user/loadTodoById', params.id)
      return { todo }
    } catch (e) {
      error({
        statusCode: 404,
        message: `The todo you are looking for doesn't exist`,
      })
    }
  },
  methods: {
    syncTodo(todo) {
      this.todo.data = todo
    },
  },
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
