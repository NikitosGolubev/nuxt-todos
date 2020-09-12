function guestUsersOnly({ $fireAuth, redirect }) {
  if ($fireAuth.currentUser) return redirect('/')
}

export default guestUsersOnly
