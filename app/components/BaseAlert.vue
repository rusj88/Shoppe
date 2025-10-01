<script setup lang="ts">
  import CheckIcon from '@/assets/icons/check.svg'
  import { useAlert } from '@/composables/useAlert'

  const { state } = useAlert()
</script>

<template>
  <transition name="fade-alert">
    <div v-if="state.open" class="alert-open">
      <div class="container">
        <div class="alert">
          <div class="message-row">
            <CheckIcon v-if="state.showIcon" />
            <p class="message">{{ state.message }}</p>
          </div>

          <NuxtLink v-if="state.link" :to="state.link.to" class="alert-link">
            {{ state.link.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
  .alert-open {
    position: fixed;
    right: 0;
    bottom: 12px;
    left: 0;
    z-index: 1000;

    @media (min-width: $bp-lg) {
      top: 16px;
      bottom: auto;
    }
  }

  .alert {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    font-family: $font-dm-sans;
    font-size: 12px;
    background: $light-gray;
    border-radius: 4px;
    box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%);

    @media (min-width: $bp-lg) {
      min-height: 68px;
    }
  }

  .message {
    width: 135px;
    margin: 0;

    @media (min-width: $bp-lg) {
      width: auto;
    }
  }

  .message-row {
    display: flex;
    gap: 6px;
    align-items: center;
    min-width: 0;
  }

  .alert-link {
    color: $color-accent-light;
    text-decoration: none;
  }

  .fade-alert-enter-active,
  .fade-alert-leave-active {
    transition:
      opacity 160ms ease,
      transform 160ms ease;
  }

  .fade-alert-enter-from,
  .fade-alert-leave-to {
    opacity: 0;
    transform: translateY(6px);
  }
</style>
