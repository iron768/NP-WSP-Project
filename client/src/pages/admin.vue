<script setup lang="ts">
import { getSession, login } from '@/model/session'

import UserTable from '@/components/UserTable.vue';

const session = getSession()

console.log(session.user)

</script>

<template>
  <div v-if="session.user?.admin" class="are-u-admin">
    <h1>Welcome admin!</h1>
    <UserTable />
  </div>
</template>

<style>

</style>
