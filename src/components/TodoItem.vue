<template>
  <li :class="{ completed: todo.complete, editing: editing }">
    <div class="view">
      <input type="checkbox" class="toggle" v-model="isChecked" />
      <label @dblclick="startEditing" for="">{{ todo.title }}</label>
      <button class="destroy" @click="emit('delete-todo', todo)"></button>
    </div>
    <div class="input-container">
      <input
        id="edit-to-input"
        type="text"
        class="edit"
        v-model="editInput"
        @keyup.enter="finishEdit"
        @blur="cancelEdit"
      />
      <label class="hidden" for="edit-to-input">Editer</label>
    </div>
  </li>
  <pre>{{ todo }}</pre>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import { ref, watch, computed } from 'vue'
const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'delete-todo', todo: Todo): void
  (e: 'update-todo', todo: Todo, completeVal: boolean): void
  (e: 'edit-todo', todo: Todo, value: string): void
}>()

// const isChecked = computed({
//   get: ()=> props.todo.complete,
//   set: (newVal: boolean)=> emit('update-todo',props.todo, newVal)
// })

const isChecked = ref<boolean>(props.todo.complete)

watch(
  () => isChecked.value,
  (newVal) => {
    emit('update-todo', props.todo, newVal)
  }
)

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
  // alert('cancel')
  console.log('cancel');
  
}
</script>

<style scoped></style>
