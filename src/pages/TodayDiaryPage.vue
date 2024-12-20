<script setup>
import { ref, onMounted } from "vue";
import { Octokit } from "octokit";

const userData = JSON.parse(localStorage.getItem("userData"));
const todayDateString = new Date().toLocaleDateString().split("/");
const todayDiaryTitle = `${todayDateString[2]}-${todayDateString[0]}-${todayDateString[1]}.md`;

const todayDiary = ref(null);
const isContentRevealed = ref(false);
const todayDiaryContent = ref(null);
const isEditingDisabled = ref(true);

async function toggleContent() {
  isContentRevealed.value = isContentRevealed.value ? false : true;

  if (isContentRevealed.value) {
    todayDiaryContent.value = atob(todayDiaryContent.value);
    isEditingDisabled.value = false;
  } else {
    todayDiaryContent.value = btoa(todayDiaryContent.value);
    isEditingDisabled.value = true;
  }
}

async function getTodayDiary() {
  try {
    const octokit = new Octokit({
      auth: userData.apiKey,
    });

    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}/?ref={ref}",
      {
        owner: userData.username,
        repo: userData.repositoryName,
        path: todayDiaryTitle,
        ref: userData.branchName,
      },
    );

    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function createTodayDiary() {
  try {
    const octokit = new Octokit({
      auth: userData.apiKey,
    });

    const response = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner: userData.username,
        repo: userData.repositoryName,
        path: todayDiaryTitle,
        message: "created today's diary",
        committer: {
          name: userData.username,
          email: userData.email,
        },
        content: btoa(""),
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

onMounted(async () => {
  todayDiary.value = await getTodayDiary();
  todayDiaryContent.value = todayDiary.value.content;
  if (todayDiary.value === null) {
    todayDiary.value = await createTodayDiary();
    todayDiaryContent.value = todayDiary.value.content;
  }
});
</script>

<template>
  <h1 v-if="todayDiary">{{ todayDiary.name.split(".")[0] }}</h1>
  <h1 v-else>Loading...</h1>
  <hr />
  <section id="today-diary-content-section">
    <div>
      <label for="reveal-content">Reveal Content</label>
      <input
        v-on:change="toggleContent"
        v-bind="isContentRevealed"
        type="checkbox"
        name="revealContent"
        id="reveal-content"
      />
    </div>
    <div>
      <textarea
        :disabled="isEditingDisabled"
        v-model="todayDiaryContent"
        name="diary-content"
        id="diary-content"
      ></textarea>
    </div>
  </section>
</template>

<style scoped></style>
