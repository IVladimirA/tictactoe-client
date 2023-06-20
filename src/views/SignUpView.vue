<script setup>
import axios from 'axios';

function signup() {
  var password = document.getElementById("password").value
  var password_confirmation = document.getElementById("passwordConfirmation").value
  console.log(password)
  if (password != password_confirmation) {
    return
  }
  console.log('before request')
  sendReq()
}

function sendReq() {
  axios.post('http://localhost:3000/users', {
  user: {
    "username": document.getElementById("username").value,
    "email": document.getElementById("email").value,
    "password": document.getElementById("password").value
  }
})
.then((response) => {
  console.log(response);
  localStorage.setItem('access', response.data.access)
  localStorage.setItem('refresh', response.data.refresh)
}, (error) => {
  console.log(error);
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