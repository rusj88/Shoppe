<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRoute } from 'nuxt/app'

  import FindIcon from '@/assets/icons/find.svg'
  import UserIcon from '@/assets/icons/user.svg'
  import CartIcon from '@/assets/icons/cart.svg'
  import BurgerIcon from '@/assets/icons/burger.svg'
  import CloseIcon from '@/assets/icons/close.svg'

  const isMenuOpen = ref(false)
  const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)

  const route = useRoute()
  watch(
    () => route.fullPath,
    () => {
      isMenuOpen.value = false
    },
  )

  const linksDesktop = [
    { label: 'Shop', to: '/shop' },
    { label: 'Blog', to: '/blog' },
    { label: 'Our Story', to: '/about' },
  ]

  const linksMobile = [
    { label: 'Contact', to: '/' },
    { label: 'Terms Of Services', to: '/' },
    { label: 'Shipping And Returns', to: '/' },
  ]

  const links = linksDesktop.concat(linksMobile)

  const actions = [
    { name: 'search', icon: FindIcon },
    { name: 'cart', icon: CartIcon },
    { name: 'account', icon: UserIcon },
  ]
</script>

<template>
  <header class="header">
    <span class="logo">SHOPPE</span>
    <div class="right-side">
      <nav class="nav">
        <ul class="nav-list">
          <li v-for="link in linksDesktop" :key="link.to">
            <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <span class="separator"></span>

      <div class="actions">
        <span
          v-for="action in actions"
          :key="action.name"
          class="icon"
          :class="`icon--${action.name}`"
        >
          <component :is="action.icon" />
        </span>
        <button class="icon icon--burger burger-btn" type="button" @click="toggleMenu">
          <component :is="isMenuOpen ? CloseIcon : BurgerIcon" />
        </button>
      </div>
    </div>
  </header>
  <div class="search-container">
    <SearchInput placeholder="Search" />
  </div>
  <BaseDrawer v-model="isMenuOpen">
    <MobileMenu :links="links" />
  </BaseDrawer>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 18px;
    margin-top: 15px;
    color: $color-black;

    @media (min-width: $bp-md) {
      height: 42px;
      margin-top: 64px;
    }
  }

  .logo {
    font-family: $font-accent;
    font-size: 25px;

    &::first-letter {
      color: $color-accent-light;
    }

    @media (min-width: $bp-lg) {
      font-size: 35px;
    }
  }

  .right-side {
    display: flex;
    gap: 24px;
    align-items: center;

    @media (min-width: $bp-lg) {
      gap: 48px;
    }
  }

  .separator {
    display: none;

    @media (min-width: $bp-md) {
      display: block;
      flex: 0 0 1px;
      align-self: center;
      height: 17px;
      background: $gray-600;
    }
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }

  .actions {
    display: flex;
    gap: 16px;
    align-items: center;

    .icon {
      display: none;
    }

    .icon--cart,
    .icon--burger {
      display: inline-flex;
    }

    @media (min-width: $bp-md) {
      gap: 39px;

      .icon {
        display: inline-flex;
      }

      .icon--burger {
        display: none;
      }
    }
  }

  .nav-list {
    display: none;

    @media (min-width: $bp-md) {
      display: flex;
      gap: 64px;
      align-items: center;
      font-family: $font-dm-sans;
      font-size: 16px;
    }
  }

  .search-container {
    margin-top: 13px;

    @media (min-width: $bp-md) {
      display: none;
    }
  }
</style>
