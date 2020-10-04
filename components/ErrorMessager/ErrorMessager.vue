<template>
  <v-snackbar v-model="isErrorToastVisible" color="red lighten-1">
    <template v-if="appError">
      {{ appError.message }}
    </template>

    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="isErrorToastVisible = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ErrorMessager',
  data() {
    return {
      isErrorToastVisible: false,
    }
  },
  computed: {
    ...mapState(['appError']),
  },
  watch: {
    appError(newValue) {
      if (newValue) this.isErrorToastVisible = true
    },

    isErrorToastVisible(newValue) {
      if (!newValue) this.removeAppError()
    },
  },
  methods: {
    ...mapActions(['removeAppError']),
  },
}
</script>

<style lang="scss" scoped></style>
