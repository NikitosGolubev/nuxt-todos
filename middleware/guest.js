function guestUsersOnly({ store, redirect }) {
  if (store.getters.isLoggedIn) return redirect('/todos')
}

export default guestUsersOnly
