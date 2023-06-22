<script setup>
import { ref } from 'vue'
import { client } from '../modules/privateClient'
import { userStore } from '../stores/user'
import router from '../router/index'

const store = userStore()

function stateCheck() {
  client.post("/games/state")
  .then((response) => {
    if (response.data.in_game == false) {
      game_state.value = []
      in_game.value = false
    } else {
      game_state.value = response.data.game_state
      in_game.value = true
    }
  }, (error) => {
    console.log(error);
  });

}

async function runChecks() {
  while (in_game.value) {
    setTimeout(stateCheck, 2000);
  }
}

const game_state = ref(new Array(15).fill(new Array(15).fill(0)))
const in_game = ref(false)
const opponent_id = ref('')


function makeTurn(column, row) {
  if (!in_game) {
    return
  }
  client.post("/games/turn", { colum: column, row: row })
  .then((response) => {
    if (response.data.in_game == false) {
      game_state.value = []
      in_game.value = false
    } else {
      game_state.value = response.data.game_state
      in_game.value = true
    }
  }, (error) => {
    console.log(error);
  });
}

function startGame() {
  if (in_game.value) {
    return
  }

  client.post("/games", { opponent: opponent_id.value })
  .then((response) => {
    if (response.data.in_game == false) {
      game_state.value = []
      in_game.value = false
    } else {
      game_state.value = response.data.game_state
      in_game.value = true
      runChecks()
    }
  }, (error) => {
    console.log(error);
  });
}

function guestLogin() {
  client.post("/users", {
  user: {
    "guest": true
  }
})
.then((response) => {
  console.log(response);
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
}, (error) => {
  console.log(error);
});
}
</script>


<template>
  
    <table v-if="in_game == false">
      <tr v-for="(row, r_index) in game_state">
        <td  v-for="(column, c_index) in row">
        <div  @click="makeTurn(c_index, r_index)">
          <img v-if="column == '1'" src="../../public/standard_first.ico" alt="1">
          <img v-else-if="column == '2'" src="../../public/standard_second.ico" alt="2">
          <img v-else src="../../public/standard_empty.ico" alt="0">
        </div>
        </td>
      </tr>
    </table>
    
    <div v-if="store.user_id != null && store.user_id != '---'">
    <div class="field">
      <label class="label">Your id: {{ store.user_id }}</label>
      <label class="label">Enter opponent id:</label>
      <div class="control">
        <input class="input" type="text" placeholder="777" v-model="opponent_id">
      </div>
    </div>
    
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="startGame()">Start game</button>
      </div>
    </div>
    </div>
    <div v-else>
      <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="router.push({ path: 'login' })">Login</button>
      </div>
    </div>
      <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="guestLogin()">Play as guest</button>
      </div>
    </div>
    </div>
  </template>
<style>
table, th, td {
  border: 1px solid black;
}
</style>