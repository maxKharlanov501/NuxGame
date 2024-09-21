<template>
  <div class="bg-gray-600 min-h-[60px] flex items-center gap-4 px-4 text-white">
    <RouterLink to="/">
      <img src="/src/assets/logo.png" class="h-10" alt="Logo">
    </RouterLink>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">My profile</RouterLink>
    <ProfileComponent class="ms-auto" />
    <Button @click="handleLogout" class="text-sm">Logout</Button>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/store/user/users.store';
import ProfileComponent from './ProfileComponent.vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter()
const $users = useUsersStore()
const { logout } = $users

const handleLogout = () => {
  logout()
  router.push('/login')
}

</script>