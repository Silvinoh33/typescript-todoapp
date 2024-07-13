<template>
  <li :class="{ completed: todo.complete }">
    <div class="view">
      <input type="checkbox" class="toggle" v-model="isChecked" />
      <label for="">{{ todo.title }}</label>
      <button class="destroy" @click="emit('delete-todo', todo)"></button>
    </div>
  </li>
  <pre>{{ todo }}</pre>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import {ref,watch} from 'vue'
const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'delete-todo', todo: Todo): void
  (e: 'update-todo', todo: Todo, completeVal: boolean): void
}>()

// const isChecked = computed({
//   get: ()=> props.todo.complete,
//   set: (newVal: boolean)=> emit('update-todo',props.todo, newVal)
// })

const isChecked = ref<boolean>(props.todo.complete);

watch(()=> isChecked.value, (newVal)=>{
  emit('update-todo',props.todo, newVal)
})


</script>

<style scoped></style>
