<script setup>
import { client } from '../modules/publicClient'
import { ref } from 'vue'
import { userStore } from '../stores/user'

const store = userStore()

const username = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

function signup() {
  if (!isFormValid()) {
    return
  }
  sendRequest()
}

function isFormValid() {
  return !(
    username.value == "" ||
    email.value == "" ||
    password.value == "" ||
    password_confirmation.value == "" ||
    password.value != password_confirmation.value
  )
}

function sendRequest() {
  console.log('sending signup request')
  client.post("/users", {
  user: {
    "username": username.value,
    "email": email.value,
    "password": password.value
  }
})
.then((response) => {
  console.log(response);
  localStorage.setItem("access", response.data.access)
  localStorage.setItem("refresh", response.data.refresh)
  store.username = response.data.username
}, (error) => {
  console.log(error);
});
}


</script>

<template>
<div class="field">
  <label class="label">Username</label>
  <div class="control">
    <input class="input" type="text" placeholder="ZerosDestroyer" v-model="username">
  </div>
</div>
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
<div class="field">
  <label class="label">Password confirmation</label>
  <div class="control">
    <input class="input" type="text" placeholder="StrOngPasswOrd123" v-model="password_confirmation">
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button class="button is-link" @click="signup">Submit</button>
  </div>
</div>
</template>