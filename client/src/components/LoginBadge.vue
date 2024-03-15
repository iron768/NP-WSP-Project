<script setup lang="ts">
import { type User, getUsers } from "../model/users";
import { getSession } from '../model/session'
import { ref } from "vue";

const session = getSession()

let isActiveLogin = ref(false);

const users = ref([] as User[]);

users.value = getUsers();

function toggleMenuLogin() {
  isActiveLogin.value = !isActiveLogin.value;
}
</script>

<template>
    <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="session.user != null" class="navbar-item">
            {{ session.user.name }}
            <img :src="session.user.profilePicture"/>
          </div>
          <div class="buttons">
            <a v-if="session.user == null" class="button is-black">
              <strong>Sign up</strong>
            </a>
            <a v-if="session.user != null" class="button is-black" @click.prevent="session.user = null">
              <strong>Logout</strong>
            </a>
            <div :class="{ 'dropdown is-active is-right': isActiveLogin }" @click="toggleMenuLogin" >
              <div v-if="session.user == null" class="dropdown-trigger">
                <button class="button is-dark" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span> Login </span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <div v-for="user in users" :key="user.id">
                    <a href="#" @click.prevent="session.user = user" class="dropdown-item">
                    <img :src="user.profilePicture"/>
                      {{ user.name }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<style scoped>

.navbar-item {
    color: #faf9f6;
}

</style>