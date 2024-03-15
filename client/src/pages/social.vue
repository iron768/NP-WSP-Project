<script setup lang="ts">
import ActivityModal from '@/components/ActivityModal.vue';
import { type User, getUsers, addActivity, getActivity, getFriendsActivities, type Activity, deleteActivity } from '@/model/users';
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

const friendsActivities = ref([] as { friend: User, activity: Activity }[]);

function fetchFriendsActivities() {
  friendsActivities.value = [];
  const friends = getUsers().filter(user => session.value.user?.friends.includes(user.id));
  for (const friend of friends) {
    const activities = friend.activities.map(activity => ({ friend, activity }));
    friendsActivities.value.push(...activities);
  }
}

fetchFriendsActivities();

function getTotalCaloriesBurned() {
  return friendsActivities.value.reduce((total, item) => total + item.activity.caloriesBurned, 0);
}

function getTotalDistance() {
  return friendsActivities.value.reduce((total, item) => total + item.activity.distance, 0);
}

</script>

<template>
  <h1>Friend's Activity</h1>
  <div v-if="session.user != null">
  <div class="columns is-centered">
    <div class="column is-half">
      <div class="card custom-border" style="margin-top: 20px;">
        <header class="card-header">
          <p class="card-header-title">
            <img :src="session.user?.profilePicture" alt="Profile picture" class="image is-16x16">
           {{ session.user?.name }}'s friend's statistics
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <p><strong>Total Calories Burned:</strong> {{ getTotalCaloriesBurned() }}</p>
            <p><strong>Total Distance:</strong> {{ getTotalDistance() }}</p>
          </div>
        </div>
      </div>
      <div v-for="item in friendsActivities" :key="item.activity.activityID" class="card" style="margin-top: 20px;">
        <div class="card-content custom-border">
            <div class="content">
                <p>
                    <img :src="item.friend?.profilePicture" alt="Profile picture" class="image is-16x16">
                    <strong>Friend:</strong> {{ item.friend.name }}
                </p> 
                <p><strong>Date:</strong> {{ item.activity.date }}</p>
                <p><strong>Calories Burned:</strong> {{ item.activity.caloriesBurned }}</p>
                <p><strong>Distance:</strong> {{ item.activity.distance }}</p>
                <p><strong>Description:</strong> {{ item.activity.description }}</p>
                <img :src="item.activity.image" alt="Activity image">
            </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <ActivityModal :newActivity="newActivity" :modal="modal" :adding="adding" :toggleModal="toggleModal" />
  </div>
  </div>
  <div v-else> 
    <h1>
      Please sign in.
    </h1>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  font-weight: bold;
  font-size: xx-large;
}

.custom-border {
   /* border: 2px solid #ff0000; */
}
</style>
