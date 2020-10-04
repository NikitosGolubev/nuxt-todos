import { cloneDeep } from 'lodash'

export const state = () => ({
  todos: [],
  haveTodosBeenRequested: false,
})

export const getters = {
  activeTodos: (state) => {
    return state.todos.filter((todoRecord) => !todoRecord.data.completed)
  },

  completedTodos: (state) => {
    return state.todos.filter((todoRecord) => todoRecord.data.completed)
  },

  getTodoById: (state) => (todoId) => {
    return state.todos.find((todo) => todo.id === todoId)
  },
}

export const mutations = {
  ADD_TODO_ITEM(state, todoRecord) {
    state.todos.unshift(todoRecord)
  },

  UPDATE_TODO_ITEM(state, todoRecord) {
    const oldTodoIndex = state.todos.findIndex(
      (todo) => todo.id === todoRecord.id
    )
    if (oldTodoIndex >= 0) {
      state.todos.splice(oldTodoIndex, 1, todoRecord)
    }
  },

  DELETE_TODO_ITEM(state, todoRecord) {
    const todoIndex = state.todos.findIndex((todo) => todo.id === todoRecord.id)
    if (todoIndex >= 0) {
      state.todos.splice(todoIndex, 1)
    }
  },

  SWITCH_TODOS_REQUESTED(state, isRequested) {
    state.haveTodosBeenRequested = isRequested
  },
}

export const actions = {
  async loadTodoById(context, todoId) {
    const doc = await this.$fireStore.collection('todos').doc(todoId).get()
    if (!doc.exists) throw new Error('Todo was not found')
    return { id: doc.id, data: doc.data() }
  },

  async loadUserTodos({ rootGetters, commit }) {
    if (rootGetters.authUserId) {
      const querySnapshot = await this.$fireStore
        .collection('todos')
        .where('userId', '==', rootGetters.authUserId)
        .get()

      querySnapshot.forEach((doc) => {
        commit('ADD_TODO_ITEM', { id: doc.id, data: doc.data() })
      })
    }
  },

  async createTodo({ commit }, todo) {
    const response = await this.$fireStore.collection('todos').add(todo)
    commit('ADD_TODO_ITEM', {
      id: response.id,
      data: todo,
    })
  },

  async updateTodo({ commit, state }, todo) {
    await this.$fireStore.collection('todos').doc(todo.id).set(todo.data)
    if (state.haveTodosBeenRequested) {
      const todoClone = cloneDeep(todo)
      commit('UPDATE_TODO_ITEM', todoClone)
    }
  },

  async deleteTodo({ commit }, todo) {
    await this.$fireStore.collection('todos').doc(todo.id).delete()
    commit('DELETE_TODO_ITEM', todo)
  },

  async switchTodoCompleted({ commit, getters }, { id, isCompleted }) {
    const todo = getters.getTodoById(id)
    if (todo) {
      const todoClone = cloneDeep(todo)
      todoClone.data.completed = isCompleted
      await this.$fireStore.collection('todos').doc(id).set(todoClone.data)
      commit('UPDATE_TODO_ITEM', todoClone)
    }
  },

  createUser(context, { email, password }) {
    return this.$fireAuth.createUserWithEmailAndPassword(email, password)
  },

  login(context, { email, password }) {
    return this.$fireAuth.signInWithEmailAndPassword(email, password)
  },

  logout(context) {
    return this.$fireAuth.signOut()
  },
}
