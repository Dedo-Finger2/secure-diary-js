<script setup>
import { ref } from "vue";

const alreadyRegisteredUserData =
  JSON.parse(localStorage.getItem("userData")) ?? {};

const userData = {
  apiKey: ref(alreadyRegisteredUserData.apiKey ? "secret..." : ""),
  repositoryName: ref(alreadyRegisteredUserData.repositoryName ?? ""),
  username: ref(alreadyRegisteredUserData.username ?? ""),
  email: ref(alreadyRegisteredUserData.email ?? ""),
  branchName: ref(alreadyRegisteredUserData.branchName ?? ""),
};

function handleFormSubmit() {
  const formatedUserData = {};
  for (const key in userData) {
    formatedUserData[key] = userData[key].value;
  }
  localStorage.setItem("userData", JSON.stringify(formatedUserData));
  alert("User data saved!");
}
</script>

<template>
  <form v-on:submit.prevent="handleFormSubmit">
    <div class="form-input-container">
      <label for="api-key">API Key:</label>
      <input
        required
        v-model="userData.apiKey.value"
        type="text"
        name="apiKey"
        id="api-key"
      />
    </div>
    <div class="form-input-container">
      <label for="repository-name">Repository Name:</label>
      <input
        required
        v-model="userData.repositoryName.value"
        type="text"
        name="repositoryName"
        id="repository-name"
      />
    </div>
    <div class="form-input-container">
      <label for="github-username">GitHub Username:</label>
      <input
        required
        v-model="userData.username.value"
        type="text"
        name="githubUsername"
        id="github-username"
      />
    </div>
    <div class="form-input-container">
      <label for="github-email">GitHub E-mail:</label>
      <input
        required
        v-model="userData.email.value"
        type="email"
        name="githubEmail"
        id="github-email"
      />
    </div>
    <div class="form-input-container">
      <label for="github-branch">Branch Name:</label>
      <input
        required
        v-model="userData.branchName.value"
        type="text"
        name="githubBranch"
        id="github-branch"
      />
    </div>

    <button type="submit">Save</button>
  </form>
</template>

<style scoped></style>
