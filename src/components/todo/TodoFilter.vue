<template>
  <div class="flex flex-col gap-4">
    <InputField v-model="query" placeholder="Search in todos" :validate="false"/>
    <select name="status" v-model="status">
      <option value="All">All</option>
      <option value="Completed">Completed</option>
      <option value="Uncompleted">Uncompleted</option>
      <option value="Favorites">Favorites</option>
    </select>
    <select name="ids" v-model="selectedIds">
      <option :value="null">All users</option>
      <option v-for="userId in userIds" :key="userId" :value="userId">{{ userId }}</option>
    </select>
    <BtnSubmit label="Clear filters" @click="clearFilters"/>
  </div>
</template>
<script setup lang="ts">
import InputField from '@/components/InputField.vue';
import { ITodo } from '@/store/todo/todos.interfaces';
import { useTodosStore } from '@/store/todo/todos.store';
import { computed } from 'vue';
import BtnSubmit from '../BtnSubmit.vue';

const $todos = useTodosStore()
const { clearFilters } = $todos
const query = computed({
  get: () => $todos.params.query,
  set: (value: string) => {
    $todos.params.query = value
  }
})

const status = computed({
  get: () => $todos.params.status,
  set: (val: 'All' | 'Completed' | 'Uncompleted' | 'Favorites') => {
    $todos.params.status = val
  }
})

const selectedIds = computed({
  get: () => $todos.params.selectedId,
  set: (userId: number | null) => {
    console.log(userId)
    if (!userId) $todos.params.selectedId = null
    else $todos.params.selectedId = userId
  }
})

const userIds = computed(() => Array.from(new Set($todos.todos.map((todo: ITodo) => todo.userId))))
</script>