<script setup lang="ts">
import ActivityModal from '@/components/ActivityModal.vue';
import { type User, getUsers, addActivity, getActivity, type Activity, deleteActivity } from '@/model/users';
import { ref } from 'vue';
import { getSession } from "@/model/session";

const newActivity = ref({} as Activity);

const modal = ref(false);

function toggleModal() {
  modal.value = !modal.value;

  console.log(modal.value);
}

const session = ref(getSession());

function handleActivityDelete(activity: Activity) {
  deleteActivity(session.value.user, activity);
}

</script>

<template>
  <div v-if="session.user != null">
    <button @click="toggleModal()" class="button is-primary" style="display: block; margin: auto;" >
    Add Activity
  </button>

  <div class="columns is-centered">
    <div class="column is-half">
      <div class="card" style="margin-top: 20px;">
        <header class="card-header">
          <p class="card-header-title">
            <img :src="session.user?.profilePicture" alt="Profile picture" class="image is-16x16">
            Statistics for {{ session.user?.name }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <p><strong>Calories Burned:</strong> {{ session.user?.activities.reduce((total, activity) => total + activity.caloriesBurned, 0) }}</p>
            <p><strong>Distance:</strong> {{ session.user?.activities.reduce((total, activity) => total + activity.distance, 0) }}</p>
          </div>
        </div>
      </div>
      <div v-for="activity in session.user?.activities" :key="activity.activityID" class="card" style="margin-top: 20px;">
        <div class="card-content">
          <div class="content">
            <p><strong>Date:</strong> {{ activity.date }}</p>
            <p><strong>Calories Burned:</strong> {{ activity.caloriesBurned }}</p>
            <p><strong>Distance:</strong> {{ activity.distance }}</p>
            <p><strong>Description:</strong> {{ activity.description }} </p>
            <img :src="activity.image" alt="Activity image">
          </div>
            <button @click="newActivity = getActivity(session.user, activity.activityID); toggleModal()" class="button is-warning is-focused" style="margin-right: 20px;">Edit</button>
            <button @click="handleActivityDelete(activity)" class="button is-danger is-focused">Delete</button>
        </div>
      </div>
    </div>
  </div>

  <div>
    <ActivityModal :new-activity="newActivity" :modal="modal" :toggleModal="toggleModal" />
  </div>
  </div>
  <div v-else> 
    <h1>
      Please sign in.
    </h1>
  </div>
</template>

<style scoped>

</style>