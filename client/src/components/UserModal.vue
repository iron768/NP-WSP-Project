<script setup lang="ts">

import { type User, addUser, deleteUser } from "@/model/users";

const props = defineProps<{
    newUser: User,
    modal: boolean,
    adding: boolean,
    toggleModal: () => void
}>()

function removeUser(id: number) {
    deleteUser(id);
}

</script>

<template>
  <div class="modal" :class="{ 'is-active': modal }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div class="adding" v-if="adding">
          <h1 class="title">Add User</h1>
        </div>
        <div v-else>
          <h1 class="title">Edit User</h1>
        </div>
        <div class="field">
          <label class="label">Id</label>
          <div class="control">
            <input class="input" type="number" min="1" max="9999.00" placeholder="Id" v-model="newUser.id" />
          </div>
        </div>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="Name" v-model="newUser.name" />
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" placeholder="Email" v-model="newUser.email" />
          </div>
        </div>
        <div class="field">
          <label class="label">Profile Picture</label>
          <div class="control">
            <input class="input" type="text" placeholder="Profile picture link" v-model="newUser.profilePicture" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <div class="adding" v-if="adding">
              <button @click="addUser(newUser); toggleModal();" class="button is-primary">
                Create User
              </button>
            </div>
            <div v-else>
              <button @click="removeUser(newUser.id); addUser(newUser); toggleModal();" class="button is-primary">
              Edit User
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="toggleModal();" class="modal-close is-large" aria-label="close">
    </button>
  </div>
</template>

<style scoped>

</style>