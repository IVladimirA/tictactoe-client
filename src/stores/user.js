import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore('user', () => {
  const username = ref(localStorage.getItem("username") || 'Guest')

  return { username }
})