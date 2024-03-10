<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { type User, getProducts, getUsers } from "../model/users";

let isActive = ref(false);
let isActiveLogin = ref(false);

function toggleMenu() {
  isActive.value = !isActive.value;
}

function toggleMenuLogin() {
  isActiveLogin.value = !isActiveLogin.value;
}

const users = ref([] as User[]);

users.value = getUsers();
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">Fitness Tracker</a>
      <a
        role="button"
        @click="toggleMenu"
        :class="{ 'is-active': isActive }"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isActive }"
    >
      <div class="navbar-start">
        <RouterLink to="admin" class="navbar-item"> Admin </RouterLink>

        <RouterLink to="activity" class="navbar-item"> My Activity </RouterLink>

        <RouterLink to="friends" class="navbar-item"> Friends </RouterLink>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-black">
              <strong>Sign up</strong>
            </a>
            <div
              @click="toggleMenuLogin"
              :class="{ 'dropdown is-active': isActiveLogin }"
            >
              <div class="dropdown-trigger">
                <button
                  class="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                >
                  <span> Login </span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <div v-for="user in users" :key="user.id">
                    <a href="#" class="dropdown-item"> {{ user.name }}</a>
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
  border-bottom: 2px solid #FFFDD0;
}

.navbar {
  background-color: #333333;
}

.navbar-item {
  color: #FAF9F6;
}
</style>
