<script setup>
import { client } from '../modules/privateClient'
import { userStore } from '../stores/user'

const store = userStore()

function logout() {
  client.post("/logout")
  store.username = 'Guest'
  localStorage.removeItem('username');
}
</script>


<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
        <strong>TicTacToe</strong>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="/signup">
        Sign Up
      </a>

      <a class="navbar-item" href="/login">
        Login
      </a>

      <a class="navbar-item" @click="logout">
        Logout
      </a>

      <a class="navbar-item" href="/about">
        About
      </a>
    </div>

    <div class="navbar-end">
      <p>User: {{ store.username }}</p>
    </div>
  </div>
</nav>
</template>

<style scoped>
</style>