import UsersService from '@/services/users-service'

export const state = () => ({})

export const getters = {
  isUserAuth: () => {
    return UsersService.isAuth()
  },
}

export const mutations = {}

export const actions = {}
