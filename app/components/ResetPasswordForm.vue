<script setup lang="ts">
  import { ref, computed } from 'vue'
  import BaseInput from '@/components/BaseInput.vue'
  import CancelIcon from '@/assets/icons/cancel.svg'
  import { useAlert } from '@/composables/useAlert'

  const email = ref('')
  const { show } = useAlert()

  const triedSubmit = ref(false)

  const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))
  const hasErrors = computed(() => !isEmailValid.value)

  function submit() {
    triedSubmit.value = true
    if (hasErrors.value) return

    show({
      message: `we'll send a reset email to ${email.value.trim()}`,
    })
  }

  function clearEmail() {
    email.value = ''
  }
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <h1 class="title mobile">Lost password</h1>
    <h1 class="title desktop">Have you Forgotten Your Password ?</h1>
    <p class="subtitle">
      If you’ve forgotten your password, enter your e-mail address and we’ll send you an e-mail
    </p>

    <div class="input-container">
      <BaseInput
        id="email"
        v-model="email"
        placeholder="Email"
        autocomplete="email"
        inputmode="email"
        :error="triedSubmit && !isEmailValid"
        error-message="Please enter a valid email."
      >
        <template #end>
          <button v-if="email" class="clear-btn" type="button" @click="clearEmail">
            <CancelIcon />
          </button>
        </template>
      </BaseInput>
    </div>

    <button class="submit" type="submit">RESET PASSWORD</button>
  </form>
</template>

<style scoped lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    font-family: $font-dm-sans;

    &:deep(#email + .end) {
      transform: translateX(-12px);
    }

    @media (min-width: $bp-lg) {
      margin-bottom: 200px;
    }
  }

  .title {
    margin: 0;
    font-family: $font-dm-sans;
    font-size: 22px;
    text-align: center;

    @media (min-width: $bp-lg) {
      font-size: 33px;
    }
  }

  .mobile {
    display: block;

    @media (min-width: $bp-lg) {
      display: none;
    }
  }

  .desktop {
    display: none;

    @media (min-width: $bp-lg) {
      display: block;
    }
  }

  .subtitle {
    margin-top: 16px;
    font-size: 12px;
    color: $color-black;

    @media (min-width: $bp-lg) {
      margin-top: 39px;
      font-size: 20px;
      color: $color-black;
      text-align: center;
    }
  }

  .input-container {
    margin-top: 18px;
    margin-bottom: 39px;
    font-size: 12px;

    @media (min-width: $bp-lg) {
      margin-top: 76px;
      margin-bottom: 64px;
    }
  }

  .submit {
    height: 32px;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $color-white;
    cursor: pointer;
    background: $color-black;
    border-radius: 4px;

    @media (min-width: $bp-lg) {
      align-self: center;
      width: 100%;
      max-width: 500px;
      height: 53px;
      font-size: 16px;
    }
  }

  .clear-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &:deep(svg) {
      width: 12px;
      height: 12px;
      color: $gray-300;
    }
  }
</style>
