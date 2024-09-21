<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="max-w-[447px] w-full bg-gray-300">
    <div class="bg-gray-400 text-gray-600 text-lg text-center py-4">Todo app</div>
    <div class="pt-[15px] pb-[30px] px-[25px]">
      <form @submit.prevent="handleLogin">
        <div class="text-sm text-gray-600 mb-[14px]">Login</div>
        <div class="flex flex-col gap-5">
          <InputField placeholder="Username" v-model="form.username" @error="isError = $event"/>
          <InputField placeholder="Phone number" v-model="form.phoneNumber" type="symbols" @error="isError = $event"/>
        </div>
        <BtnSubmit :disabled="isError" :loading label="Login" class="mt-5"/>
      </form>
    </div>
  </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import InputField from '@/components/InputField.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/store/user/users.store';
import { IForm } from '@/store/user/users.interfaces';
import BtnSubmit from '@/components/BtnSubmit.vue';

const $users = useUsersStore()
const router = useRouter()
const { findUsers, login } = $users
const form = reactive<IForm>({
  username: '',
  phoneNumber: ''
})
const isError = ref<boolean>(false)
const loading = ref<boolean>(false)
const handleLogin = async () => {
  try {
    loading.value = true
    await login(form)
    router.push('/')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await findUsers()
})
</script>