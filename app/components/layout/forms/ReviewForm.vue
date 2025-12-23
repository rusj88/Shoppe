<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import Rating from 'primevue/rating'
  import { isEmailValid } from '@/utils/validators'
  import {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem,
  } from '@/utils/localStorage'

  type RememberedDetails = {
    name?: string
    email?: string
  }

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
  const isMailValid = computed(() => isEmailValid(email.value))
  const isRatingValid = computed(() => rating.value > 0)
  const isCommentValid = computed(() => comment.value.trim().length > 5)

  const hasErrors = computed(
    () => !isNameValid.value || !isMailValid.value || !isRatingValid.value || !isCommentValid.value,
  )

  function loadRememberedDetails() {
    const parsed = getLocalStorageItem<RememberedDetails>(REMEMBER_KEY)
    if (!parsed) return

    if (typeof parsed.name === 'string') name.value = parsed.name
    if (typeof parsed.email === 'string') email.value = parsed.email

    remember.value = Boolean((parsed.name ?? '').trim() || (parsed.email ?? '').trim())
  }

  function persistRememberedDetails() {
    if (remember.value) {
      setLocalStorageItem(REMEMBER_KEY, {
        name: name.value.trim(),
        email: email.value.trim(),
      })
    } else {
      removeLocalStorageItem(REMEMBER_KEY)
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
        class="review-textarea"
        placeholder="Your Review*"
      />
      <p v-if="triedSubmit && !isCommentValid" class="error">Please enter at least a few words.</p>
    </div>

    <div class="field">
      <BaseInput
        id="review-name"
        v-model="name"
        autocomplete="name"
        placeholder="Enter your name*"
        :error="triedSubmit && !isNameValid"
        error-message="Please enter your name."
      />
    </div>

    <div class="field">
      <BaseInput
        id="review-email"
        v-model="email"
        autocomplete="email"
        placeholder="Enter your Email*"
        :error="triedSubmit && !isEmailValid"
        error-message="Please enter a valid email."
      />
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
    font-family: $font-dm-sans;
    color: $color-black;

    @media (min-width: $bp-lg) {
      flex: 0 0 580px;
    }
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

  .review-textarea {
    width: 100%;
    min-height: 36px;
    padding: 0;
    padding-bottom: 10px;
    margin: 0;
    overflow-y: auto;
    font: inherit;
    color: inherit;
    resize: none;
    outline: none;
    background: transparent;
    border: none;
    border-bottom: 1px solid $color-black;

    &::-webkit-scrollbar {
      display: none;
    }
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
