<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import UserIcon from '@/assets/icons/user.svg'

  const auth = useAuthStore()

  const hydrated = ref(false)
  onMounted(() => {
    hydrated.value = true
  })

  const isLoggedIn = computed(() => hydrated.value && !!auth.user.token)
</script>

<template>
  <span class="user-status-icon" :class="{ 'is-logged-in': isLoggedIn }">
    <UserIcon />
  </span>
</template>

<style scoped lang="scss">
  .user-status-icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .user-status-icon.is-logged-in::after {
    position: absolute;
    top: -7px;
    left: -3px;
    width: 8px;
    height: 8px;
    content: '';
    background: $color-accent-green;
    border-radius: 50%;
  }
</style>
