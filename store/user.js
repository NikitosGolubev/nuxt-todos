export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  createUser(context, { email, password }) {
    this.$fireAuth.createUserWithEmailAndPassword(email, password)
  },

  logout(context) {
    this.$fireAuth.signOut()
  },
}
