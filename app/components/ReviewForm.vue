<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import Rating from 'primevue/rating'

  const emit = defineEmits<{
    (
      e: 'submit',
      payload: { name: string; email: string; rating: number; comment: string; remember: boolean },
    ): void
  }>()

  const REMEMBER_KEY = 'reviewer:details'

  const comment = ref('')
  const name = ref('')
  const email = ref('')
  const rating = ref<number>(0)
  const remember = ref(false)

  const triedSubmit = ref(false)

  const isNameValid = computed(() => name.value.trim().length > 0)
  const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))
  const isRatingValid = computed(() => rating.value > 0)
  const isCommentValid = computed(() => comment.value.trim().length > 5)

  const hasErrors = computed(
    () =>
      !isNameValid.value || !isEmailValid.value || !isRatingValid.value || !isCommentValid.value,
  )

  function loadRememberedDetails() {
    if (typeof window === 'undefined') return
    const raw = window.localStorage.getItem(REMEMBER_KEY)
    if (!raw) return

    try {
      const parsed = JSON.parse(raw) as { name?: string; email?: string }
      if (typeof parsed?.name === 'string') name.value = parsed.name
      if (typeof parsed?.email === 'string') email.value = parsed.email
      remember.value = Boolean((parsed?.name ?? '').trim() || (parsed?.email ?? '').trim())
    } catch {}
  }

  function persistRememberedDetails() {
    if (typeof window === 'undefined') {
      return
    }

    if (remember.value) {
      window.localStorage.setItem(
        REMEMBER_KEY,
        JSON.stringify({
          name: name.value.trim(),
          email: email.value.trim(),
        }),
      )
    } else {
      window.localStorage.removeItem(REMEMBER_KEY)
    }
  }

  onMounted(loadRememberedDetails)

  function resetForm() {
    comment.value = ''
    rating.value = 0
    triedSubmit.value = false

    if (!remember.value) {
      name.value = ''
      email.value = ''
    }
  }

  function onSubmit() {
    triedSubmit.value = true
    if (hasErrors.value) {
      return
    }

    persistRememberedDetails()

    emit('submit', {
      name: name.value.trim(),
      email: email.value.trim(),
      rating: Number(rating.value),
      comment: comment.value.trim(),
      remember: remember.value,
    })

    resetForm()
  }
</script>

<template>
  <form class="review-form" @submit.prevent="onSubmit">
    <h3 class="title">Add a Review</h3>
    <p class="subtitle">Your Email Address Will Not Be Published. Required Fields Are Marked *</p>

    <div class="field">
      <textarea
        id="review-comment"
        v-model="comment"
        class="control textarea"
        placeholder="Your Review*"
      />
      <p v-if="triedSubmit && !isCommentValid" class="error">Please enter at least a few words.</p>
    </div>

    <div class="field">
      <input
        id="review-name"
        v-model="name"
        type="text"
        autocomplete="name"
        class="control input"
        placeholder="Enter your name*"
      />
      <p v-if="triedSubmit && !isNameValid" class="error">Please enter your name.</p>
    </div>

    <div class="field">
      <input
        id="review-email"
        v-model="email"
        type="email"
        autocomplete="email"
        class="control input"
        placeholder="Enter your Email*"
      />
      <p v-if="triedSubmit && !isEmailValid" class="error">Please enter a valid email.</p>
    </div>

    <label class="remember">
      <input v-model="remember" type="checkbox" class="remember-box" />
      <span class="remember-text">
        Save my name, email, and website in this browser for the next time I comment
      </span>
    </label>

    <div class="rating-block">
      <div class="rating-label">Your Rating*</div>
      <Rating v-model="rating" :cancel="false" class="custom-rating" />
      <p v-if="triedSubmit && !isRatingValid" class="error">Please select a rating.</p>
    </div>

    <button type="submit" class="submit-btn">Submit</button>
  </form>
</template>

<style scoped lang="scss">
  .review-form {
    flex: 0 0 580px;
    font-family: $font-dm-sans;
    color: $color-black;
  }

  .title {
    margin: 0 0 10px;
    font-family: $font-dm-sans;
    font-size: 20px;
    color: $color-black;
  }

  .subtitle {
    margin: 0 0 90px;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $gray-600;
  }

  .field {
    margin-bottom: 18px;
  }

  .control {
    width: 100%;
    height: 36px;
    padding: 2px 0;
    font-family: inherit;
    font-size: 12px;
    color: $color-black;
    outline: none;
    background: transparent;
    border: none;
    border-bottom: 1px solid $gray-300;
  }

  .textarea {
    overflow-y: auto;
    resize: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .control:focus {
    border-bottom-color: $color-black;
  }

  .remember {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin: 8px 0 18px;
    user-select: none;
  }

  .remember-box {
    width: 16px;
    height: 16px;
    margin-top: 2px;
    accent-color: $color-black;
  }

  .remember-text {
    font-size: 12px;
    color: $gray-600;
  }

  .rating-block {
    margin-top: 46px;
    margin-bottom: 48px;
  }

  .rating-label {
    margin-bottom: 10px;
    font-size: 12px;
    color: $gray-600;
  }

  .custom-rating {
    --p-rating-icon-size: 18px;
    --p-rating-icon-color: $gray-700;
    --p-rating-icon-hover-color: $color-black;
    --p-rating-icon-active-color: $color-black;
  }

  .error {
    margin-top: 6px;
    font-size: 11px;
    color: $color-accent-red;
  }

  .submit-btn {
    display: inline-block;
    padding: 12px 28px;
    font-family: $font-dm-sans;
    font-size: 12px;
    font-weight: 600;
    color: $color-white;
    cursor: pointer;
    background: $color-black;
    border: 1px solid $color-black;
    border-radius: 4px;

    &:hover {
      color: $color-black;
      background: $color-white;
    }
  }
</style>
