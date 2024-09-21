<template>
  <div class="grid grid-cols-[150px_1fr] gap-4 text-white">
    <div>Name:</div>
    <div>{{ user?.name }}</div>
    <div>Username:</div>
    <div>{{ user?.username }}</div>
    <div>Phone number:</div>
    <div>{{ user?.phone }}</div>
    <div>Email:</div>
    <div>{{ user?.email }}</div>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/store/user/users.store';
import { computed } from 'vue';

const $users = useUsersStore()
const user = computed(() => $users.user)
</script>