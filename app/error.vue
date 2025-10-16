<script setup lang="ts">
  import type { NuxtError } from 'nuxt/app'
  import { clearError } from 'nuxt/app'

  defineProps<{ error: NuxtError }>()
</script>

<template>
  <NuxtLayout name="default">
    <div class="error-container">
      <h1 class="error-heading">{{ error.statusCode }} ERROR</h1>

      <p class="message">
        This page not found;
        <br />
        back to home and start again
      </p>

      <button class="home-btn" @click="clearError({ redirect: '/' })">HOMEPAGE</button>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
  .home-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 115px;
    height: 32px;
    font-family: $font-dm-sans;
    font-size: 12px;
    border: solid 1px $color-black;
    border-radius: 4px;
    box-shadow: 0 4px 4px rgb(0 0 0 / 25%);

    @media (min-width: $bp-lg) {
      width: 187px;
      height: 53px;
      font-size: 16px;
      font-weight: bold;
      box-shadow: none;

      &:hover {
        box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
      }
    }
  }

  .error-container {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: $font-dm-sans;
    transform: translate(-50%, -50%);
  }

  .error-heading {
    margin: 0;
    margin-bottom: 10px;
    font-size: 20px;
    color: $color-black;

    @media (min-width: $bp-lg) {
      margin-bottom: 24px;
      font-size: 33px;
    }
  }

  .message {
    margin: 0;
    margin-bottom: 20px;
    font-size: 12px;
    line-height: 20px;
    color: $gray-600;
    text-align: center;

    @media (min-width: $bp-lg) {
      margin-bottom: 64px;
      font-size: 20px;
      line-height: 26px;
    }
  }
</style>
