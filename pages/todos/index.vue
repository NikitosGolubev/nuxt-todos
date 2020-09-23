<template>
  <div class="todos-page">
    <div class="todos-container todos-page__todo-block">
      <div class="todos-container__title">
        <h1 class="text-h3 font-weight-medium">Активные TODO:</h1>
      </div>

      <div>
        <todo-item class="todos-container__todo" :todo="mockTodo" />
        <todo-item class="todos-container__todo" :todo="mockTodo" />
      </div>
    </div>

    <div class="todos-container todos-page__todo-block">
      <div class="todos-container__title">
        <h1 class="text-h3 font-weight-medium">Выполненные TODO:</h1>
      </div>

      <div>
        <todo-item class="todos-container__todo" :todo="mockTodo" />
        <todo-item class="todos-container__todo" :todo="mockTodo" />
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem/TodoItem'

export default {
  components: { TodoItem },
  middleware: 'auth',
  data() {
    return {
      mockTodo: {
        completed: false,
      },
    }
  },
}
</script>

<style scoped lang="scss">
.todos-page {
  &__todo-block {
    margin-bottom: 32px;
    max-width: 100%;

    &:last-child {
      margin-bottom: 0px;
    }
  }
}

.todos-container {
  background: darken(#f8f8f8, 2%);
  max-height: 800px;
  box-sizing: border-box;
  overflow: auto;
  padding: 64px 32px;

  &__title {
    margin-bottom: 24px;
  }

  &__todo {
    max-width: 90%;
    margin-top: 10px;
  }
}
</style>
