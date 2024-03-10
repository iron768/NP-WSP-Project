<script setup lang="ts">
import { ref } from "vue";
import { type User, getUsers } from "../model/users";

const users = ref([] as User[]);

users.value = getUsers();
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
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.admin }}</td>
        <img :src="user.profilePicture" width="100px" />
      </tr>
    </table>
  </div>
</template>

<style scoped></style>
