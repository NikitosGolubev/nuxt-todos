function authenticatedUsersOnly({ $fireAuth, redirect }) {
  if (!$fireAuth.currentUser) redirect('/login')
}

export default authenticatedUsersOnly
