<script setup lang="ts">
import { ref } from "vue";
import { type User, getUsers } from "../model/users";

const users = ref([] as User[]);

users.value = getUsers();

const deleteUser = (userId: number) => {
  const indexToRemove = users.value.findIndex(user => user.id === userId);
  if (indexToRemove !== -1) {
    users.value.splice(indexToRemove, 1); // Removes the user at the found index
  }
}
</script>

<template>
  <div>
    <table class="table">
      <caption>Users</caption>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Admin</th>
        <th>Profile Picture</th>
        <th>Edit</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.admin }}</td>
        <img :src="user.profilePicture" width="100px" />
        <button class="button is-danger" @click.prevent="deleteUser(user.id)">Delete</button>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>
