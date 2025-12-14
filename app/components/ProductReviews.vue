<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useAlert } from '@/composables/useAlert'

  type Review = {
    id: number
    name: string
    email: string
    rating: number
    comment: string
    createdAt: number
  }

  const props = defineProps<{
    productId: number
    productName: string
  }>()

  const emit = defineEmits<{
    (e: 'change-count', count: number): void
  }>()

  const { show } = useAlert()

  const storageKey = computed(() => `reviews:${props.productId}`)
  const reviews = ref<Review[]>([])

  const reviewTitle = computed(() => {
    const count = reviews.value.length
    const label = count === 1 ? 'Review' : 'Reviews'
    return `${count} ${label} for ${props.productName}`
  })

  function notifyCount() {
    emit('change-count', reviews.value.length)
  }

  function loadReviews() {
    if (typeof window === 'undefined') return
    const raw = window.localStorage.getItem(storageKey.value)
    if (!raw) return

    try {
      reviews.value = JSON.parse(raw) as Review[]
    } catch {
      reviews.value = []
    }

    notifyCount()
  }

  function saveReviews() {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(storageKey.value, JSON.stringify(reviews.value))
  }

  onMounted(loadReviews)

  function handleSubmit(payload: { name: string; email: string; rating: number; comment: string }) {
    const newReview: Review = {
      id: Date.now(),
      name: payload.name.trim(),
      email: payload.email.trim(),
      rating: payload.rating,
      comment: payload.comment.trim(),
      createdAt: Date.now(),
    }

    reviews.value = [newReview, ...reviews.value]
    saveReviews()
    notifyCount()
    show({ message: 'Review submitted', duration: 4000 })
  }
</script>

<template>
  <section class="reviews-section">
    <div v-if="reviews.length" class="review-list">
      <h4 class="review-list-title">{{ reviewTitle }}</h4>

      <ul>
        <ReviewItem v-for="review in reviews" :key="review.id" :review="review" />
      </ul>
    </div>

    <p v-else class="no-reviews">No reviews yet.</p>

    <ReviewForm @submit="handleSubmit" />
  </section>
</template>

<style scoped lang="scss">
  .reviews-section {
    display: flex;
    gap: 80px;
    align-items: flex-start;
    justify-content: space-between;
  }

  .review-list {
    flex: 1 1 auto;
    min-width: 0;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $gray-600;
  }

  .review-list-title {
    margin: 0 0 75px;
    font-family: $font-dm-sans;
    font-size: 20px;
    color: $color-black;
  }

  .no-reviews {
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $gray-600;
  }
</style>
