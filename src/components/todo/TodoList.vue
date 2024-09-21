<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div class="grid grid-cols-3 gap-4" v-else-if="filteredTodos && filteredTodos.length > 0">
      <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo />
    </div>
    <div v-else-if="isError">Oops... Error occured. Try to refresh page</div>
    <div v-else class="text-white text-lg">
      Todos not found. Try to change filters
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTodosStore } from '@/store/todo/todos.store';
import { computed } from 'vue';
import { onMounted } from 'vue';
import TodoItem from './TodoItem.vue';
import { ref } from 'vue';
import { ITodo } from '@/store/todo/todos.interfaces';

const $todos = useTodosStore()
const { findTodos } = $todos
const filteredTodos = computed<ITodo[]>(() => $todos.filteredTodos)
const loading = ref<boolean>(false)
const isError = ref<boolean>(false)

onMounted(async () => {
  try {
    loading.value = true
    await findTodos()
  } catch (error) {
    isError.value = true
  } finally {
    loading.value = false
  }
})
</script>