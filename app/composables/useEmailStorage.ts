import { ref, onMounted, computed } from 'vue'

export function useEmailStorage(key = 'email') {
  const email = ref('')
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const trimmed = computed(() => (email.value || '').trim())
  const isValid = computed(() => emailPattern.test(trimmed.value))

  onMounted(() => {
    const saved = localStorage.getItem(key)
    if (saved) {
      email.value = saved
    }
  })

  function validate() {
    return isValid.value
  }

  function save() {
    localStorage.setItem(key, trimmed.value)
  }

  return { email, isValid, save, validate }
}
