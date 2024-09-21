<template>
  <div class="flex flex-col gap-4">
    <div class="font-bold text-lg text-white">My todos</div>
    <div class="grid md:grid-cols-[300px_1fr] gap-4">
      <div class="flex flex-col gap-4">
        <TodoFilter />
        <TodoCreate />
      </div>
      <TodoList />
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoCreate from '@/components/todo/TodoCreate.vue';
import TodoFilter from '@/components/todo/TodoFilter.vue';
import TodoList from '@/components/todo/TodoList.vue';
</script>