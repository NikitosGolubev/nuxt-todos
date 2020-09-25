function authenticatedUsersOnly({ store, redirect }) {
  if (!store.getters.isLoggedIn) return redirect('/login')
}

export default authenticatedUsersOnly
