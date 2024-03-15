<script setup lang="ts">
import ActivityModal from '@/components/ActivityModal.vue';
import { type User, getUsers, addActivity, getActivity, type Activity, deleteActivity, getActivitiesToday, getActivitiesThisWeek } from '@/model/users';
import { ref } from 'vue';
import { getSession } from "@/model/session";

const newActivity = ref({} as Activity);

const modal = ref(false);
const adding = ref(false);

function toggleModal() {
  modal.value = !modal.value;

  console.log(modal.value);
}

const session = ref(getSession());

function handleActivityDelete(activity: Activity) {
  deleteActivity(session.value.user, activity);
}

function getTotalBurnedCalories(activities: Activity[]): number { 
  return activities.reduce((total, activity) => total + activity.caloriesBurned, 0);
}

function getTotalDistance(activities: Activity[]): number { 
  return activities.reduce((total, activity) => total + activity.distance, 0);
}

</script>

<template>
  <div v-if="session.user != null">
    <button @click="adding = true; toggleModal()" class="button is-primary mt-4" style="display: block; margin: auto;" >
      Add Activity
    </button>

  <div class="columns is-centered">
    <div class="column is-half">
      <div class="card custom-border" style="margin-top: 20px;">
        <header class="card-header">
          <p class="card-header-title">
            <img :src="session.user?.profilePicture" alt="Profile picture" class="image is-16x16">
           {{ session.user?.name }}'s statistics
          </p>
        </header>
        <div class="card-content">
        <div class="content">
          <div class="statistics-section">
            <h3>All time statistics:</h3>
            <div class="statistics-item">
              <strong>Calories Burned:</strong> {{ getTotalBurnedCalories(session.user?.activities) }}
            </div>
            <div class="statistics-item">
              <strong>Distance:</strong> {{ getTotalDistance(session.user?.activities) }}
            </div>
          </div>

          <div class="statistics-section">
            <h3>Today's statistics:</h3>
            <div class="statistics-item">
              <strong>Calories Burned:</strong> {{ getTotalBurnedCalories(getActivitiesToday(session?.user)) }}
            </div>
            <div class="statistics-item">
              <strong>Distance:</strong> {{ getTotalDistance(getActivitiesToday(session?.user)) }}
            </div>
          </div>

          <div class="statistics-section">
            <h3>This week's statistics:</h3>
            <div class="statistics-item">
              <strong>Calories Burned:</strong> {{ getTotalBurnedCalories(getActivitiesThisWeek(session?.user)) }}
            </div>
            <div class="statistics-item">
              <strong>Distance:</strong> {{ getTotalDistance(getActivitiesThisWeek(session?.user)) }}
            </div>
          </div>
        </div>
      </div>
      </div>
      <div v-for="activity in session.user?.activities" :key="activity.activityID" class="card" style="margin-top: 20px;">
        <div class="card-content custom-border">
          <div class="content">
            <p><strong>Date:</strong> {{ activity.date }}</p>
            <p><strong>Calories Burned:</strong> {{ activity.caloriesBurned }}</p>
            <p><strong>Distance:</strong> {{ activity.distance }}</p>
            <p><strong>Description:</strong> {{ activity.description }} </p>
            <img :src="activity.image" alt="Activity image">
          </div>
            <button @click="adding = false; newActivity = getActivity(session.user, activity.activityID); toggleModal()" class="button is-warning is-focused" style="margin-right: 20px;">Edit</button>
            <button @click="handleActivityDelete(activity)" class="button is-danger is-focused">Delete</button>
        </div>
      </div>
    </div>
  </div>

  <div>
    <ActivityModal :new-activity="newActivity" :modal="modal" :adding="adding" :toggleModal="toggleModal" />
  </div>
  </div>
  <div v-else> 
    <h1>
      Please sign in.
    </h1>
  </div>
</template>

<style scoped>
.custom-border {
  border: 2px solid #ff0000; /* Red border */
}

.statistics-section {
  margin-bottom: 20px; /* Add some space between sections */
}

.statistics-item {
  margin-bottom: 10px; /* Add some space between statistics */
}
</style>
