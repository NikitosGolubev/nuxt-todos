export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  createUser(context, { email, password }) {
    return this.$fireAuth.createUserWithEmailAndPassword(email, password)
  },

  login(context, { email, password }) {
    return this.$fireAuth.signInWithEmailAndPassword(email, password)
  },

  logout(context) {
    return this.$fireAuth.signOut()
  },
}
