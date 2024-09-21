<template>
  <div class="flex items-center gap-2">
    <div class="rounded-full w-10 h-10 border border-white bg-gray-100"></div>
    <div class="text-white text-sm">{{ user?.name }}</div>
  </div>
</template>
<script setup lang="ts">
import { useUsersStore } from '@/store/user/users.store';
import { computed } from 'vue';

const $users = useUsersStore()
const user = computed(() => $users.user)
</script>