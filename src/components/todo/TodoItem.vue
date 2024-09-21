<template>
  <div class="bg-gray-200 rounded-xl p-4 relative" :class="{ 'bg-green-200': todo.completed }">
    <div 
      class="absolute top-1 right-1 cursor-pointer w-4 h-4" 
      :class="{ 'text-yellow-400': isFavorite }"
      @click="handleFavorites(todo.id)"
    >
      {{ isFavorite ? '★' : '☆' }}
    </div>
    {{ todo }}
  </div>
</template>
<script setup lang="ts">
import { ITodo } from '@/store/todo/todos.interfaces';
import { useTodosStore } from '@/store/todo/todos.store';
import { computed } from 'vue';
import { PropType } from 'vue';

const props = defineProps({
  todo: {
    type: Object as PropType<ITodo>,
    required: true
  }
})

const $todos = useTodosStore()
const { handleFavorites } = $todos
const isFavorite = computed(() => $todos.favoritesTodoIds.includes(props.todo.id))
</script>