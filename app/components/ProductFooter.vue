<script setup lang="ts">
  import MailIcon from '@/assets/icons/email.svg'
  import FbIcon from '@/assets/icons/fb.svg'
  import IgIcon from '@/assets/icons/ig.svg'
  import TwIcon from '@/assets/icons/tw.svg'

  defineProps<{
    sku: number
    category: string
  }>()

  const socialmedia = [
    { label: 'Email', to: 'mailto:shopppe@shop.com', icon: MailIcon },
    { label: 'FB', to: 'https://www.facebook.com/', icon: FbIcon },
    { label: 'IG', to: 'https://www.instagram.com/', icon: IgIcon },
    { label: 'TW', to: 'https://x.com/', icon: TwIcon },
  ]
</script>

<template>
  <div class="product-footer">
    <div class="icons-block">
      <a
        v-for="link in socialmedia"
        :key="link.label"
        :href="link.to"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
        :aria-label="link.label"
      >
        <component :is="link.icon" class="social-icon" />
      </a>
    </div>
    <span class="label">SKU:</span> {{ sku }} <br />
    <span class="label">Categories:</span> {{ category }}
  </div>
</template>

<style scoped lang="scss">
  .product-footer {
    display: none;
    gap: 6px;
    font-family: $font-dm-sans;
    font-size: 16px;
    color: $gray-600;

    @media (min-width: $bp-lg) {
      display: block;
    }
  }

  .icons-block {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 38px;

    :deep(svg) {
      width: 12px;
      height: 12px;
      color: $gray-600;
    }

    @media (min-width: $bp-lg) {
      :deep(svg) {
        width: 18px;
        height: 18px;
      }
    }
  }

  .label {
    color: $color-black;
  }
</style>
