function authenticatedUsersOnly({ $fireAuth, redirect}) {
  /** @todo Abstraction! */
  if (!$fireAuth.currentUser) redirect('/login')
}

export default authenticatedUsersOnly
