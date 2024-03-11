<script setup lang="ts">
import { getSession, login } from '@/model/session'

import UserTable from '@/components/UserTable.vue';

const session = getSession()

</script>

<template>
  <div v-if="session.user?.admin" class="are-u-admin">
    <h1>Welcome admin!</h1>
    <UserTable />
  </div>
  <div v-if="!session.user?.admin" class="are-u-admin">
    <h1>You need to login.</h1>
  </div>
</template>

<style>

</style>
