<script setup>
import { ref, defineAsyncComponent } from "vue";

const supportedPlataforms = [
  "Select a plataform...",
  "GitHub",
  "GitLab",
  "Google Drive",
];

const selectedPlataform = ref(supportedPlataforms[0]);

function getComponent(plataform) {
  const components = new Map();
  components.set(
    "github",
    defineAsyncComponent(() => import("./GitHubPlataformConfigForm.vue")),
  );
  return components.get(plataform.trim().toLowerCase());
}
</script>

<template>
  <div>
    <label for="plataform">Plataform:</label>
    <select name="plataform" id="plataform" v-model="selectedPlataform">
      <option
        :value="plataform"
        v-for="plataform in supportedPlataforms"
        v-bind:key="plataform"
      >
        {{ plataform }}
      </option>
    </select>
  </div>
  <div
    v-if="selectedPlataform && selectedPlataform !== 'Select a plataform...'"
  >
    <component :is="getComponent(selectedPlataform)" />
  </div>
  <p v-else>No plataform found.</p>
</template>

<style scoped></style>
