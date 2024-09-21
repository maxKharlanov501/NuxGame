<template>
  <div class="flex flex-col gap-4">
    <div class="font-bold text-white">Add new todo</div>
    <form @submit.prevent="handleAddTodo" class="flex flex-col gap-4">
      <InputField v-model="form.userId" @error="isError = $event" placeholder="User id" type="number" />
      <InputField v-model="form.title" placeholder="Title" :validate="false"/>
      <BtnSubmit :disabled="isError" :loading label="Add" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import InputField from '../InputField.vue';
import { useTodosStore } from '@/store/todo/todos.store';
import { ref } from 'vue';
import BtnSubmit from '../BtnSubmit.vue';
const $todos = useTodosStore()
const form = reactive({
  userId: '',
  title: ''
})
const isError = ref<boolean>(false)
const loading = ref<boolean>(false)
const handleAddTodo = async () => {
  try {
    loading.value = true
    await createTodo(form)
    form.userId = ''
    form.title = ''
  } finally {
    loading.value = false
  }
}

const { createTodo } = $todos
</script>