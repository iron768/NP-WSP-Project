<script setup lang="ts">
import { getSession,   } from '@/model/session'

import FriendTable from '@/components/FriendTable.vue';

const session = getSession()

</script>

<template>
  <div v-if="session.user != null" class="friends-menu">
    <FriendTable />
  </div>
</template>

<style>

</style>
