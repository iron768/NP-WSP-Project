<script setup lang="ts">
import { getSession,   } from '@/model/session'

import FriendTable from '@/components/FriendTable.vue';

const session = getSession()

</script>

<template>
  <div class="about">
    <h1>This is an friends page</h1>
    <i class="fas fa-coffee"></i> <!-- Example icon: coffee -->
  </div>
  <div v-if="session.user != null" class="friends-menu">
    <FriendTable />
  </div>
</template>

<style>

</style>
