<script setup lang="ts">
  import ArrowIcon from '@/assets/icons/arrow.svg'
  import FbIcon from '@/assets/icons/fb.svg'
  import IgIcon from '@/assets/icons/ig.svg'
  import TwIcon from '@/assets/icons/tw.svg'
  import { useEmailStorage } from '@/composables/useEmailStorage'
  import { useAlert } from '@/composables/useAlert'
  import { computed, ref } from 'vue'

  const links = [
    { label: 'CONTACT', to: '/' },
    { label: 'TERMS OF SERVICES', to: '/' },
    { label: 'SHIPPING AND RETURNS', to: '/' },
  ]

  const socialmedia = [
    { label: 'FB', to: 'https://www.facebook.com/', icon: FbIcon },
    { label: 'IG', to: 'https://www.instagram.com/', icon: IgIcon },
    { label: 'TW', to: 'https://x.com/', icon: TwIcon },
  ]

  const { email, isValid, save, validate } = useEmailStorage()
  const { show } = useAlert()
  const triedSubmit = ref(false)
  const showError = computed(() => triedSubmit.value && !isValid.value)

  function onSubmit() {
    triedSubmit.value = true

    if (validate()) {
      save()
      show({ message: 'Email saved', duration: 5000 })
    }
  }
</script>
<template>
  <footer class="footer">
    <div class="footer-upper">
      <form class="form" @submit.prevent="onSubmit">
        <BaseInput
          v-model="email"
          type="text"
          name="email"
          placeholder="Give an email, get the newsletter."
          autocomplete="email"
          :error="showError"
          error-message="Please enter a valid email address."
        >
          <template #end>
            <button type="submit" class="input-btn">
              <ArrowIcon />
            </button> </template
        ></BaseInput>
        <div class="agreement">
          <label>
            <input type="checkbox" /> <span>i agree to the website’s terms and conditions</span>
          </label>
        </div>
      </form>
      <nav class="nav">
        <ul class="nav-list">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="footer-lower">
      <div class="social">
        <span class="social-label">Follow us</span>
        <span class="social-line"></span>
        <div class="icons-block">
          <a
            v-for="link in socialmedia"
            :key="link.label"
            :href="link.to"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <component :is="link.icon" class="social-icon" />
          </a>
        </div>
      </div>
      <p class="copyright">
        <strong>© 2021 Shelly.</strong> Terms of use <strong>and</strong> privacy policy.
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    display: flex;
    flex-direction: column;
    gap: 36px;
    padding-top: 72px;
    padding-bottom: 27px;

    @media (min-width: $bp-lg) {
      padding-top: 118px;
      padding-bottom: 106px;
    }
  }

  .footer-upper,
  .footer-lower {
    display: flex;
    flex-direction: column;
    gap: 36px;
    align-items: flex-start;

    @media (min-width: $bp-lg) {
      flex-direction: row-reverse;
      justify-content: space-between;
    }
  }

  .footer-upper {
    @media (min-width: $bp-lg) {
      align-items: center;
      padding-top: 55px;
      border-top: 1px $gray-300 solid;
    }
  }

  .form {
    width: 100%;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $color-black;

    @media (min-width: $bp-lg) {
      width: 396px;
    }
  }

  .copyright strong {
    font-weight: normal;

    @media (min-width: $bp-lg) {
      font-weight: 700;
    }
  }

  .agreement {
    margin-top: 11px;

    @media (min-width: $bp-lg) {
      display: none;
    }
  }

  .social {
    display: flex;
    gap: 14px;
    align-items: end;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $color-black;
  }

  .social-line {
    width: 47px;
    height: 1px;
    background: $color-black;

    @media (min-width: $bp-lg) {
      display: none;
    }
  }

  .social-label {
    @media (min-width: $bp-lg) {
      display: none;
    }
  }

  .icons-block {
    display: flex;
    gap: 16px;
    align-items: center;

    &:deep(svg) {
      width: 12px;
      height: 12px;
      color: $gray-600;
    }

    @media (min-width: $bp-lg) {
      &:deep(svg) {
        width: 18px;
        height: 18px;
      }
    }
  }

  .copyright {
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $gray-600;
  }

  .nav {
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $gray-600;
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (min-width: $bp-lg) {
      flex-direction: row;
      gap: 40px;
      align-items: center;
    }
  }

  .nav-list a:hover {
    color: $color-black;
  }

  .input-btn {
    padding: 16px;
  }
</style>
