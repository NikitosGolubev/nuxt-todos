function initialState() {
  return {
    authUser: null,
  }
}

export const state = () => initialState()

export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.authUser.id !== null
    } catch {
      return false
    }
  },
}

export const mutations = {
  RESET_STORE: (state) => {
    // Assigning initial state
    Object.assign(state, initialState())
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
    }
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }, ctx) {
    if (this.$fireAuth === null) {
      throw new Error(
        'nuxtServerInit Example not working - this.$fireAuth cannot be accessed.'
      )
    }

    if (ctx.$fireAuth === null) {
      throw new Error(
        'nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.'
      )
    }

    if (ctx.app.$fireAuth === null) {
      throw new Error(
        'nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.'
      )
    }

    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser from the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },

  onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    commit('SET_AUTH_USER', { authUser })
  },

  checkVuexStore(ctx) {
    if (this.$fireAuth === null) {
      throw new Error(
        'Vuex Store example not working - this.$fireAuth cannot be accessed.'
      )
    }

    alert(
      'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
    )
  },
}
