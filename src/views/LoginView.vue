<script setup>
import { client } from '../modules/publicClient'
import { ref } from 'vue'
import { userStore } from '../stores/user'

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
  console.log('sending login request')
  client.post("/auth", {
  user: {
    "email": email.value,
    "password": password.value
  }
})
.then((response) => {
  console.log(response);
  localStorage.setItem("access", response.data.access)
  localStorage.setItem("refresh", response.data.refresh)
  localStorage.setItem("username", response.data.username)
  store.username = response.data.username
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
        <input class="input" type="text" placeholder="StrOngPasswOrd123" v-model="password">
      </div>
    </div>
    
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="login">Login</button>
      </div>
    </div>
    </template>