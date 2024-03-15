<script setup lang="ts">
import { ref } from "vue";
import UserModal from '@/components/UserModal.vue';
import { type User, getUsers } from "../model/users";
import { getSession, login } from '@/model/session'

const users = ref([] as User[]);

users.value = getUsers();

const deleteUser = (userId: number) => {
  const indexToRemove = users.value.findIndex(user => user.id === userId);
  if (indexToRemove !== -1) {
    users.value.splice(indexToRemove, 1); // Removes the user at the found index
  }
}

const session = getSession()

const newUser = ref({} as User);

const modal = ref(false);
const adding = ref(false);

function toggleModal() {
  modal.value = !modal.value;
}
</script>

<template>
  <div>
    <h1>Admin Panel</h1>
    <button @click="newUser = {} as User; adding = true; toggleModal()" class="button is-primary mt-4" style="display: block; margin: auto;" >
      Add User
    </button>
    <div class="table-container">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>ID</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id" :class="{ 'is-selected': index % 2 === 0 }">
            <td class="custom-text-color"><img :src="user.profilePicture" alt="Profile Picture" class="image is-48x48"></td>
            <td class="custom-text-color">{{ user.name }}</td>
            <td class="custom-text-color">{{ user.id }}</td>
            <td v-if="user.admin" class="admin-subtitle custom-text-color">Admin</td>
            <td v-else></td>
            <td>
              <button v-if="user.id !== session.user?.id" @click="deleteUser(user.id)" class="button is-danger is-small">Delete</button>
              <button class="button is-warning is-small" @click="adding = false; newUser = user; toggleModal()">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <UserModal :newUser="newUser" :modal="modal" :adding="adding" :toggleModal="toggleModal" />
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

.admin-subtitle {
  color: red;
}

.is-selected {
  background-color: #f5f5f5; /* Alternate row color */
}

.custom-text-color {
  color: #08120C; /* Set the text color */
}
</style>
