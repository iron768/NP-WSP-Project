<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { type User, getProducts, getUsers } from "../model/users";

import { getSession, login } from '@/model/session'

let isActive = ref(false);
let isActiveLogin = ref(false);

function toggleMenu() {
  isActive.value = !isActive.value;
}

function toggleMenuLogin() {
  isActiveLogin.value = !isActiveLogin.value;
}

const session = getSession()

const users = ref([] as User[]);

users.value = getUsers();
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink to="/" class="navbar-item">Fitness Tracker</RouterLink>
      <a role="button" @click="toggleMenu" :class="{ 'is-active': isActive }" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
        <RouterLink to="admin" class="navbar-item"> Admin </RouterLink>

        <RouterLink to="activity" class="navbar-item"> My Activity </RouterLink>

        <RouterLink to="friends" class="navbar-item"> Friends </RouterLink>
      </div>
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
            <a v-if="session.user != null" class="button is-black" @click.prevent="session.user = user">
              <strong>Logout</strong>
            </a>
            <div @click="toggleMenuLogin" :class="{ 'dropdown is-active': isActiveLogin }">
              <div v-if="session.user == null" class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
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
                      {{ user.name }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  border-bottom: 2px solid #fffdd0;
}

.navbar {
  background-color: #333333;
  height: 3em;
}

.navbar-item {
  color: #faf9f6;
}
</style>
