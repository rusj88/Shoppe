<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { navigateTo } from 'nuxt/app'

  const mode = ref<'signin' | 'register'>('signin')
  const auth = useAuthStore()

  const serverError = ref<string | null>(null)
  const isSubmitting = ref(false)

  onMounted(() => {
    if (auth.isAuthenticated) {
      navigateTo('/')
    }
  })

  type SignInPayload = {
    email: string
    password: string
    remember: boolean
  }

  async function onSignInSubmit({ email, password, remember }: SignInPayload) {
    serverError.value = null
    isSubmitting.value = true

    try {
      await auth.login(email, password, remember)
    } catch (e) {
      serverError.value = e instanceof Error ? e.message : 'Something went wrong'
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<template>
  <div class="wrapper">
    <h1 class="title">My account</h1>
    <AuthSwitch v-model="mode" />

    <div v-if="mode === 'signin'" class="form-container">
      <SignInForm @submit="onSignInSubmit" />

      <p v-if="serverError" class="server-error">
        {{ serverError }}
      </p>
    </div>

    <div v-else class="form-container register">Register</div>
  </div>
</template>

<style scoped lang="scss">
  .wrapper {
    margin: 24px auto 0;

    @media (min-width: $bp-lg) {
      max-width: 500px;
      margin: 128px auto 0;
    }
  }

  .form-container {
    margin-top: 87px;

    @media (min-width: $bp-lg) {
      margin-top: 126px;
    }
  }

  .register {
    text-align: center;
  }

  .title {
    margin: 0 0 24px;
    font-family: $font-dm-sans;
    font-size: 22px;
    text-align: center;

    @media (min-width: $bp-lg) {
      margin: 0 0 64px;
      font-size: 33px;
    }
  }

  .server-error {
    margin-top: 12px;
    font-size: 12px;
    color: $color-accent-red;
    text-align: center;
  }
</style>
