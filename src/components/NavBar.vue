<script setup>
function a() {
    console.log('awdadaw')
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

      <a class="navbar-item" @click="a">
        Logout
      </a>

      <a class="navbar-item" href="/about">
        About
      </a>
    </div>

    <div class="navbar-end">
        Guest
    </div>
  </div>
</nav>
</template>

<style scoped>
</style>