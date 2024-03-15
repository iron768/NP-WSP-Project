<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="page">
    <NavBar class="mb-4" />

    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style>

html {
  background-size: auto auto; 
  background-attachment: fixed; 

  background-image: linear-gradient(to bottom right, color1 0%, color2 100%);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  margin: 0;
}

</style>
