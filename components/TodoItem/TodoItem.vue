<template>
  <div class="todo-item">
    <div class="todo-item__checkbox">
      <v-checkbox v-model="isCompleted" color="deep-orange" />
    </div>

    <div
      class="todo-item__text"
      :class="{ 'todo-item__text_completed': isCompleted }"
      @click="switchCompleted"
    >
      {{ todoContent }}
    </div>

    <div class="todo-controls todo-item__controls">
      <div class="todo-controls__item">
        <nuxt-link :to="`/todos/${todo.id}/edit`">
          <v-btn fab dark x-small color="deep-purple darken-1">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </nuxt-link>
      </div>
      <div class="todo-controls__item">
        <v-btn fab dark x-small color="red" @click="removeTodo">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isCompleted: this.todo.data.completed,
    }
  },
  computed: {
    todoContent() {
      return this.todo.data.content
    },
  },
  watch: {
    isCompleted(value) {
      this.asyncSwitchCompleted(value)
    },
  },
  methods: {
    ...mapActions(['setAppError']),
    ...mapActions('user', ['switchTodoCompleted', 'deleteTodo']),

    switchCompleted() {
      this.isCompleted = !this.isCompleted
    },

    async asyncSwitchCompleted(isCompleted) {
      try {
        await this.switchTodoCompleted({ id: this.todo.id, isCompleted })
      } catch (e) {
        this.setAppError(e)
      }
    },

    async removeTodo() {
      try {
        await this.deleteTodo(this.todo)
      } catch (e) {
        this.setAppError(e)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.todo-item {
  display: flex;
  align-items: center;
  font-size: 1.2rem;

  &__checkbox {
    margin-right: 6px;
  }

  &:hover &__text {
    color: rgba(#ff5722, 0.7);
    cursor: pointer;
  }

  &__text {
    transition: 0.4s all;

    &_completed {
      text-decoration: line-through;
      color: #ff5722;
    }
  }
}

.todo-controls {
  display: flex;
  align-items: center;

  &__item {
    margin-left: 12px;
  }
}
</style>
