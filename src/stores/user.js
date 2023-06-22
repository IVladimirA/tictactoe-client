import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore('user', () => {
  const username = ref(localStorage.getItem("username") || 'Guest')
  const user_id = ref(localStorage.getItem("user_id") || '---')

  const wins = ref(localStorage.getItem("wins") || 0)
  const loses = ref(localStorage.getItem("loses") || 0)

  return { username, user_id, wins, loses }
})