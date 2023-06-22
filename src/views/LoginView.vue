<script setup>
import { client } from '../modules/publicClient'
import { ref } from 'vue'
import { userStore } from '../stores/user'
import router from '../router/index'

const store = userStore()

const email = ref('')
const password = ref('')

function login() {
  if (!isFormValid()) {
    return
  }
  sendRequest()
}

function isFormValid() {
  return email != "" && password != ""
}

function sendRequest() {
  client.post("/auth", {
  user: {
    "email": email.value,
    "password": password.value
  }
})
.then((response) => {
  localStorage.setItem("access", response.data.access)
  localStorage.setItem("refresh", response.data.refresh)
  localStorage.setItem("username", response.data.username)
  localStorage.setItem("user_id", response.data.user_id)
  localStorage.setItem("wins", response.data.wins)
  localStorage.setItem("loses", response.data.loses)
  store.username = response.data.username
  store.user_id = response.data.user_id
  store.wins = response.data.wins
  store.loses = response.data.loses
  router.push({ path: '/' })
}, (error) => {
  console.log(error);
});
}
</script>

<template>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="text" placeholder="destroyer@gmail.com" v-model="email">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="StrOngPasswOrd123" v-model="password">
      </div>
    </div>
    
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="login">Login</button>
      </div>
    </div>
    </template>