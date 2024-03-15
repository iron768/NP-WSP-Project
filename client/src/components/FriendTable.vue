<script setup lang="ts">
import { ref } from "vue";
import { getSession } from '../model/session'
import { type User, getUsers } from "../model/users";

const session = getSession()
const users = getUsers();
const friendsIds: number[] = session.user?.friends ?? [];
const friends = ref([] as User[]);

for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < friendsIds.length; j++) {
        const user = users[i];
        const friend = friendsIds[j];

        if (user.id == friend) {
            friends.value.push(user);
        }
    }
}

</script>

<template>
  <div>
    <h1>Friends List</h1>
    <div class="table-container">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in friends" :key="user.id" :class="{ 'is-selected': index % 2 === 0 }">
            <td><img :src="user.profilePicture" alt="Profile Picture" class="image is-48x48"></td>
            <td class="custom-text-color">{{ user.name }}</td>
            <td class="custom-text-color">{{ user.id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  font-weight: bold;
  font-size: xx-large;
}

.table-container {
  margin-top: 20px;
}

.is-selected {
  background-color: #9C58B4; /* Alternate row color */
}

.custom-text-color {
  color: #08120C; /* Set the text color */
}
</style>
