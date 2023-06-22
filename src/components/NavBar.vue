<script setup>
import { client } from '../modules/privateClient'
import { userStore } from '../stores/user'

const store = userStore()

function logout() {
  client.post("/logout")
  store.username = 'Guest'
  store.user_id = '---'
  localStorage.removeItem('username');
  localStorage.removeItem('user_id');
  localStorage.removeItem('wins');
  localStorage.removeItem('loses');
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
      <div class="navbar-item">
        <strong>User: {{ store.username }}, Wins: {{ store.wins }}, Loses: {{ store.loses }}</strong>
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>
</style>