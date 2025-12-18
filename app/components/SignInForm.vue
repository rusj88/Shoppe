<script setup lang="ts">
  import { ref, computed } from 'vue'
  import CancelIcon from '@/assets/icons/cancel.svg'

  type SignInPayload = {
    email: string
    password: string
    remember: boolean
  }

  const emit = defineEmits<{
    (e: 'submit', payload: SignInPayload): void
  }>()

  const email = ref('')
  const password = ref('')
  const remember = ref(false)

  const triedSubmit = ref(false)

  const isEmailValid = computed(() => email.value.trim().length > 0)
  const isPasswordValid = computed(() => password.value.trim().length > 0)
  const hasErrors = computed(() => !isEmailValid.value || !isPasswordValid.value)

  function submit() {
    triedSubmit.value = true
    if (hasErrors.value) {
      return
    }

    emit('submit', {
      email: email.value.trim(),
      password: password.value,
      remember: remember.value,
    })
  }

  function clearEmail() {
    email.value = ''
  }
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <div class="inputs">
      <div class="input-wrapper">
        <BaseInput
          id="email"
          v-model="email"
          placeholder="Email"
          autocomplete="email"
          inputmode="email"
          :error="triedSubmit && !isEmailValid"
          error-message="Please enter a valid login."
        >
          <template #end>
            <button v-if="email" class="clear-btn" type="button" @click="clearEmail">
              <CancelIcon />
            </button>
          </template>
        </BaseInput>
      </div>

      <div class="input-wrapper">
        <BaseInput
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
          autocomplete="current-password"
          :error="triedSubmit && !isPasswordValid"
          error-message="Please enter your password."
        />
      </div>
    </div>

    <label class="remember">
      <input v-model="remember" class="checkbox" type="checkbox" />
      <span>Remember me</span>
    </label>

    <button class="submit" type="submit">SIGN IN</button>

    <NuxtLink class="forgot" to="/reset-password">Have you forgotten your password?</NuxtLink>
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
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 47px;
    margin-bottom: 22px;
    font-size: 12px;

    @media (min-width: $bp-lg) {
      font-size: 16px;
    }
  }

  .remember {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 12px;
    font-size: 12px;
    color: $color-black;

    @media (min-width: $bp-lg) {
      margin-bottom: 69px;
      font-size: 16px;
    }
  }

  .checkbox {
    width: 13px;
    height: 13px;
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
      width: 100%;
      height: 53px;
      font-size: 16px;
    }
  }

  .forgot {
    display: block;
    margin-top: 16px;
    font-size: 12px;
    color: $color-black;
    text-align: center;

    @media (min-width: $bp-lg) {
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
