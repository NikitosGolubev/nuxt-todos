function guestUsersOnly({ $fireAuth, redirect }) {
  /** @todo Abstraction! */
  if ($fireAuth.currentUser) return redirect('/')
}

export default guestUsersOnly
