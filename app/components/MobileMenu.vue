<script setup lang="ts">
  import LogoutIcon from '@/assets/icons/logout.svg'
  import type { NavLink } from '@/types'
  import { useAuthStore } from '@/stores/auth'

  const props = withDefaults(
    defineProps<{
      links?: NavLink[]
    }>(),
    {
      links: () => [],
    },
  )

  const auth = useAuthStore()

  const handleLogout = () => auth.logout()
</script>

<template>
  <ul class="mm-list">
    <li v-for="link in props.links" :key="link.to">
      <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
    </li>
  </ul>

  <hr class="mm-divider" />

  <ul class="mm-actions">
    <li>
      <NuxtLink to="/account" class="row">
        <span class="icon">
          <UserStatusIcon />
        </span>
        <span>My account</span>
      </NuxtLink>
    </li>
    <li>
      <span class="row" @click="handleLogout">
        <span class="icon"><LogoutIcon /></span> <span>Logout</span>
      </span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .mm-divider {
    height: 1px;
    margin: 24px 0;
    background: #d8d8d8;
    border: 0;
  }

  .mm-list,
  .mm-actions {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .row {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
</style>
