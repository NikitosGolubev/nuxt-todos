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
      Tempor sit dolore ullamco tempor dolore consectetur incididunt nisi
      eiusmod elit consectetur dolor excepteur.
    </div>

    <div class="todo-controls todo-item__controls">
      <div class="todo-controls__item">
        <nuxt-link to="/todos/1/edit">
          <v-btn fab dark x-small color="deep-purple darken-1">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </nuxt-link>
      </div>
      <div class="todo-controls__item">
        <v-btn fab dark x-small color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
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
      isCompleted: this.todo.completed,
    }
  },
  methods: {
    switchCompleted() {
      this.isCompleted = !this.isCompleted
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
