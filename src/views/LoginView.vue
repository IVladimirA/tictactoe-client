<script setup>
import { client } from '../modules/publicClient'

function login() {
  if (!isFormValid()) {
    return
  }
  sendRequest()
}

function isFormValid() {
  return (
    document.getElementById("email").value != "" &&
    document.getElementById("password").value != ""
  )
}

function sendRequest() {
  console.log('sending login request')
  client.get("/auth", { params:
  {
    "email": document.getElementById("email").value,
    "password": document.getElementById("password").value
  }})
.then((response) => {
  console.log(response);
}, (error) => {
  //console.log(error);
});
}
</script>

<template>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="text" placeholder="destroyer@gmail.com" id="email">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="text" placeholder="StrOngPasswOrd123" id="password">
      </div>
    </div>
    
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="login">Login</button>
      </div>
    </div>
    </template>