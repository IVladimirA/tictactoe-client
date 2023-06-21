<script setup>
import { client } from '../modules/publicClient'

function signup() {
  if (!isFormValid()) {
    return
  }
  sendRequest()
}

function isFormValid() {
  return !(
    document.getElementById("username").value == "" ||
    document.getElementById("email").value == "" ||
    document.getElementById("password").value == "" ||
    document.getElementById("passwordConfirmation").value == "" ||
    document.getElementById("password").value != document.getElementById("passwordConfirmation").value
  )
}

function sendRequest() {
  console.log('sending signup request')
  client.post("/users", {
  user: {
    "username": document.getElementById("username").value,
    "email": document.getElementById("email").value,
    "password": document.getElementById("password").value
  }
})
.then((response) => {
  console.log(response);
}, (error) => {
  //console.log(error);
});
}


</script>

<template>
<div class="field">
  <label class="label">Username</label>
  <div class="control">
    <input class="input" type="text" placeholder="ZerosDestroyer" id="username">
  </div>
</div>
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
<div class="field">
  <label class="label">Password confirmation</label>
  <div class="control">
    <input class="input" type="text" placeholder="StrOngPasswOrd123" id="passwordConfirmation">
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button class="button is-link" @click="signup">Submit</button>
  </div>
</div>
</template>