import { ref } from 'vue'

// Singleton: one reactive ref shared across every component that imports this.
const lang = ref('en')

export function useLang() {
  return { lang }
}
