<script setup lang="ts">
import { ref } from "vue";
import { type User, getUsers } from "../model/users";
import { getSession, login } from '@/model/session'

const users = ref([] as User[]);

users.value = getUsers();

const deleteUser = (userId: number) => {
  const indexToRemove = users.value.findIndex(user => user.id === userId);
  if (indexToRemove !== -1) {
    users.value.splice(indexToRemove, 1); // Removes the user at the found index
  }
}

const session = getSession()
</script>

<template>
  <div>
    <h1>Admin Panel</h1>
  </div>
  <div>
    <div v-for="user in users" :key="user.id" class="class">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="user.profilePicture" alt="Profile Picture">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ user.name }}</p>
            <p class="subtitle is-6">ID: {{ user.id }}</p>
            <p class="subtitle is-6 admin-subtitle" v-if="user?.admin">Admin</p>
          </div>
          <div class="button-container">
            <button v-if="user?.id != session.user?.id" @click="deleteUser(user.id)" class="button is-danger is-focused">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  font-weight: bold;
  font-size: xx-large;
}

.admin-subtitle {
  color: red;
  font-size: small;
}
</style>
