<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";
import LoginBadge from './LoginBadge.vue';
import { getSession, login } from '@/model/session'

let isActive = ref(false);

function toggleMenu() {
  isActive.value = !isActive.value;
}

const session = getSession()
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
        <RouterLink to="admin" class="navbar-item" v-if="session.user?.admin"> Admin </RouterLink>

        <RouterLink to="activity" class="navbar-item" v-if="session.user != null"> My Activity </RouterLink>

        <RouterLink to="friends" class="navbar-item" v-if="session.user != null"> Friends </RouterLink>
      </div>
      <LoginBadge />
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
