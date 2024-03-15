<script setup lang="ts">
import { ref } from "vue";
import type { Activity } from "@/model/users";
import { addActivity } from "@/model/users";
import { getSession } from "@/model/session";

const props = defineProps<{
    newActivity: Activity,
    modal: boolean,
    toggleModal: () => void
}>()

const session = getSession()

</script>

<template>
  <div class="modal" :class="{ 'is-active': modal }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <h1 class="title">Add Activity</h1>
        <div class="field">
          <label class="label">Date</label>
          <div class="control">
            <input class="input" type="date" placeholder="Date" v-model="newActivity.date" />
          </div>
        </div>
        <div class="field">
          <label class="label">Calories Burned</label>
          <div class="control">
            <input class="input" type="number" min="1" max="9999.99" placeholder="Calories Burned" v-model="newActivity.caloriesBurned" />
          </div>
        </div>
        <div class="field">
          <label class="label">Distance Ran</label>
          <div class="control">
            <input class="input" type="number" min="1" max="9999.99" placeholder="Distance Ran" v-model="newActivity.distance" />
          </div>
        </div>
        <div class="field">
          <label class="label">Description of activity</label>
          <div class="control">
            <input class="input" type="text" placeholder="Description" v-model="newActivity.description" />
          </div>
        </div>
        <div class="field">
          <label class="label">Image</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Image url"
              v-model="newActivity.image"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button @click="addActivity(session.user, newActivity); toggleModal();" class="button is-primary">
              Create Activity
            </button>
          </div>
        </div>
      </div>
    </div>
    <button @click="toggleModal();" class="modal-close is-large" aria-label="close">
    </button>
  </div>
</template>

<style scoped></style>
