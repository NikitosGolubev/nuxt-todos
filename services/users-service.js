import isAuth from './firebase/users/isAuth'

const UsersService = {
  isAuth() {
    return isAuth()
  },
}

export default UsersService
