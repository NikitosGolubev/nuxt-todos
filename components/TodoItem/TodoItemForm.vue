<template>
  <div>
    <v-form
      v-if="todo"
      class="todo-item-form"
      @submit.native.prevent="onSubmit"
    >
      <div>
        <v-text-field
          v-model="todo.content"
          color="deep-purple dense-1"
          label="Todo goal"
          :counter="contentMaxLen"
          :rules="contentErrorMsg"
          :error="!!contentErrorMsg.length"
        />
      </div>

      <div class="todo-item-form__submit">
        <v-btn
          :disabled="isRequestProcessing || isNothingToUpdate"
          type="submit"
          x-large
          color="deep-orange"
          class="white--text"
        >
          <span v-show="!isRequestProcessing">{{ submitBtnText }}</span>
          <v-progress-circular
            v-show="isRequestProcessing"
            indeterminate
            color="white"
            width="3"
          />
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { cloneDeep } from 'lodash'
import { mapGetters, mapActions } from 'vuex'

/** @todo Possible abstract this into separate independent buisness-logic block */
const TODO_MAX_LEN = 300
const TOOD_MIN_LEN = 10

const EMPTY_TODO_MODEL = (userId) => ({
  content: '',
  userId,
  completed: false,
})

export default {
  name: 'TodoItemForm',
  props: {
    formType: {
      type: String,
      default: 'create',
      validator(value) {
        return ['create', 'edit'].includes(value)
      },
    },

    initialTodo: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    todo: null,
    contentMaxLen: TODO_MAX_LEN,
    serverErrors: {},
    wasSubmitted: false,
    isRequestProcessing: false,
    lastUpdatedTodo: null,
  }),
  validations() {
    return {
      todo: {
        content: {
          required,
          minLength: minLength(TOOD_MIN_LEN),
          maxLength: maxLength(TODO_MAX_LEN),
        },
      },
    }
  },
  computed: {
    ...mapGetters(['authUserId']),

    isEditing() {
      return this.formType === 'edit'
    },

    isCreating() {
      return this.formType === 'create'
    },

    submitBtnText() {
      return this.isEditing ? 'Update' : 'Create'
    },

    contentValidator() {
      return this.$v.todo.content
    },

    isNothingToUpdate() {
      if (this.lastUpdatedTodo) {
        return (
          JSON.stringify(this.lastUpdatedTodo) === JSON.stringify(this.todo)
        )
      }
      return false
    },

    contentErrorMsg() {
      let result
      const validator = this.contentValidator

      if (this.wasSubmitted || this.serverErrors.content) {
        switch (true) {
          case !validator.required:
            result = 'Field is required'
            break
          case !validator.minLength:
            result = `Too short, min length is ${TOOD_MIN_LEN}`
            break
          case !validator.maxLength:
            result = `Too long, max length is ${TODO_MAX_LEN}`
            break
          case !!this.serverErrors.content:
            result = this.serverErrors.content
            break
          default:
            break
        }
      }

      return result ? [result] : []
    },
  },
  watch: {
    todo: {
      handler(newValue, oldValue) {
        // Fire change event only if todo's really changed, not instansiated
        if (oldValue) {
          this.$emit('todo-change', newValue)
        }
      },
      deep: true,
    },
  },
  created() {
    this.initTodo()
  },
  methods: {
    ...mapActions(['setAppError']),
    ...mapActions('user', ['createTodo', 'updateTodo']),

    initTodo() {
      if (!this.initialTodo) this.todo = EMPTY_TODO_MODEL(this.authUserId)
      else {
        this.todo = cloneDeep(this.initialTodo.data)
        this.setLastUpdatedTodo()
      }
    },

    onSubmit() {
      this.validate()
      if (!this.$v.$invalid) this.manageTodoAttempt()
    },

    async manageTodoAttempt() {
      this.isRequestProcessing = true
      if (this.isEditing) await this.attemptToUpdateTodo()
      else await this.attemptToCreateTodo()
      this.isRequestProcessing = false
    },

    async attemptToCreateTodo() {
      try {
        await this.createTodo(this.todo)
        this.resetForm()
      } catch (e) {
        this.setAppError(e)
      }
    },

    async attemptToUpdateTodo() {
      try {
        await this.updateTodo({ id: this.initialTodo.id, data: this.todo })
        this.resetFormProperties()
        this.setLastUpdatedTodo()
      } catch (e) {
        this.setAppError(e)
      }
    },

    validate() {
      this.$v.$touch()
      this.wasSubmitted = true
    },

    resetFormProperties() {
      this.wasSubmitted = false
      this.serverErrors = {}
    },

    resetForm() {
      this.resetFormProperties()
      this.todo = EMPTY_TODO_MODEL(this.authUserId)
    },

    setLastUpdatedTodo() {
      this.lastUpdatedTodo = cloneDeep(this.todo)
    },
  },
}
</script>

<style scoped lang="scss">
.todo-item-form {
  &__submit {
    margin-top: 16px;
  }
}
</style>
