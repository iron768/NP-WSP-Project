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
    <table class="table">
      <caption>Friends</caption>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Profile Picture</th>
      </tr>
      <tr v-for="user in friends" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <img :src="user.profilePicture" width="100px" />
      </tr>
    </table>
  </div>
</template>

<style scoped></style>
