<script setup lang="ts">
  import { computed } from 'vue'
  import Rating from 'primevue/rating'
  import type { Review } from '@/types'

  const props = defineProps<{ review: Review }>()

  const formattedDate = computed(() => {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
      .format(new Date(props.review.createdAt))
      .replace(/ (\w{3}) /, ' $1, ')
  })
</script>

<template>
  <li class="review-item">
    <div class="top-row">
      <span class="name">{{ review.name }}</span>
      <span class="date">{{ formattedDate }}</span>
    </div>

    <Rating :modelValue="review.rating" readonly :cancel="false" class="rating" />

    <p class="comment">{{ review.comment }}</p>
  </li>
</template>

<style scoped lang="scss">
  .review-item {
    padding: 26px 0;
    border-bottom: 1px solid $gray-300;
  }

  .top-row {
    display: flex;
    gap: 14px;
    align-items: baseline;
    margin-bottom: 10px;
  }

  .name {
    flex: 1;
    min-width: 0;
    font-family: $font-dm-sans;
    font-size: 20px;
    color: $color-black;
    overflow-wrap: anywhere;
  }

  .date {
    font-size: 12px;
    color: $gray-600;
  }

  .rating {
    margin: 0 0 14px;

    &:deep(.p-rating-icon.p-rating-icon-active) {
      color: $color-black;
    }

    &:deep(.p-rating-icon:not(.p-rating-icon-active)) {
      color: $color-black;
    }
  }

  .comment {
    margin: 0;
    font-family: $font-dm-sans;
    font-size: 16px;
    color: $gray-600;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
  }
</style>
