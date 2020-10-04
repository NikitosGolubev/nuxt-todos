<template>
  <div class="todos-page">
    <div class="todos-container todos-page__todo-block">
      <div class="todos-container__title">
        <h1 class="text-h3 font-weight-medium">Active TODOs:</h1>
      </div>

      <div>
        <todo-item
          v-for="todo in activeTodos"
          :key="todo.id"
          class="todos-container__todo"
          :todo="todo"
        />
        <div v-show="!activeTodos.length">
          It's empty here, perfect time for new challenges!
        </div>
      </div>
    </div>

    <div class="todos-container todos-page__todo-block">
      <div class="todos-container__title">
        <h1 class="text-h3 font-weight-medium">Completed TODOs:</h1>
      </div>

      <div>
        <todo-item
          v-for="todo in completedTodos"
          :key="todo.id"
          class="todos-container__todo"
          :todo="todo"
        />
        <div v-show="!completedTodos.length">
          No todo's yet done! What about stop being lazy asshole?
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoItem from '@/components/TodoItem/TodoItem'

export default {
  components: { TodoItem },
  middleware: ['auth', 'fetchUserTodos'],
  data() {
    return {
      mockTodo: {
        completed: false,
      },
    }
  },
  computed: {
    ...mapGetters('user', ['activeTodos', 'completedTodos']),
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
