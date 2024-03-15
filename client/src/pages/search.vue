<script setup lang="ts">
import { ref } from "vue";
import { type User, getUserByName } from "../model/users";

const searchedUser = ref<User | null>(null);
const searchQuery = ref("");

function handleSearch() {
  if (searchQuery.value.trim() !== "") {
    searchedUser.value = getUserByName(searchQuery.value);
  } else {
    searchedUser.value = null; // Clear searched user if the search query is empty
  }
}
</script>

<template>
  <div>
    <h1>User Search</h1>
    <input class="input" type="text" placeholder="Search for user via name." v-model="searchQuery" @input="handleSearch"/>

    <div v-if="searchedUser">
      <div class="card custom-border" style="margin-top: 20px">
        <header class="card-header">
          <p class="card-header-title">{{ searchedUser?.name }}'s statistics</p>
        </header>
        <div class="card-content">
          <div class="content">
            <p class="custom-text-color">
              <strong>Calories Burned:</strong>
              {{ searchedUser?.activities.reduce((total, activity) => total + activity.caloriesBurned, 0) }}
            </p>
            <p class="custom-text-color">
                <strong>Distance:</strong>
                {{ searchedUser?.activities.reduce((total, activity) => total + activity.distance, 0) }}
            </p>
            <p class="custom-text-color" v-if="searchedUser?.admin">
                <strong>Role:</strong> Admin
            </p>
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

.custom-text-color {
  color: #08120C; /* Set the text color */
}
</style>
