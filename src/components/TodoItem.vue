<template>
  <li :class="{ completed: todo.complete, editing: editing }">
    <div class="view">
      <input type="checkbox" class="toggle" v-model="isChecked" />
      <label @dblclick="startEditing" for="">{{ todo.title }}</label>
      <button class="destroy" @click="emit('delete-todo', todo)"></button>
    </div>
    <div class="input-container">
      <input
        ref="editRef"
        id="edit-to-input"
        type="text"
        class="edit"
        v-model="editInput"
        @keyup.enter="finishEdit"
        @blur="cancelEdit"
      />
      <label class="visual-hidden" for="edit-to-input">Editer</label>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import { ref, computed, nextTick } from 'vue'
const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'delete-todo', todo: Todo): void
  (e: 'update-todo', todo: Todo, completeVal: boolean): void
  (e: 'edit-todo', todo: Todo, value: string): void
}>()

const isChecked = computed({
  get: () => props.todo.complete,
  set: (newVal: boolean) => emit('update-todo', props.todo, newVal)
})

// const isChecked = ref<boolean>(props.todo.complete)

// watch(
//   () => isChecked.value,
//   (newVal) => {
//     emit('update-todo', props.todo, newVal)
//   }
// )

const editRef = ref<HTMLInputElement>()

const editing = ref<boolean>(false)

const editText = ref<string>('')

const editInput = computed({
  get: () => props.todo.title,
  set: (newVal) => {
    editText.value = newVal
  }
})

function startEditing() {
  editing.value = true
  //faire un focus sur le champ de saisie
  //rafraichir le dom avec nextTick
  nextTick(() => {
    editRef.value?.focus()
  })
}
function editTodo() {
  emit('edit-todo', props.todo, editText.value)
  editText.value = ''
}
function finishEdit() {
  editing.value = false
  editTodo()
}
function cancelEdit() {
  editing.value = false
}
</script>

<style scoped>
.visual-hidden {
  bottom: 0;
  clip-path: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
}
</style>
