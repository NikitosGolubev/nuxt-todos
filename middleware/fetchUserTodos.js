async function fetchUserTodos({ store }) {
  if (!store.state.user.haveTodosBeenRequested) {
    try {
      await store.dispatch('user/loadUserTodos')
      store.commit('user/SWITCH_TODOS_REQUESTED', true, { root: true })
    } catch (e) {
      store.dispatch('setAppError', e)
    }
  }
}

export default fetchUserTodos
