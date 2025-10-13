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

  function save() {
    if (!isValid.value) {
      return false
    }
    try {
      localStorage.setItem(key, trimmed.value)
      return true
    } catch {
      return false
    }
  }

  return { email, isValid, save, trimmed }
}
