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
  </div>

  <div>
    <div v-for="user in friends" :key="user.id" class="class">
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
</style>
