<template>
  <div class="gray-500 w-screen min-h-screen flex flex-col">
    <HeaderComponent />
    <div class="p-4">
      <RouterView />
    </div>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { onMounted } from 'vue';
import { useUsersStore } from '@/store/user/users.store';

const $users = useUsersStore()
const { getProfile } = $users

onMounted(getProfile)
</script>