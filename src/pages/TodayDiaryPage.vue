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

async function saveChanges() {
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
        sha: todayDiary.value.sha,
        message: "updated today's diary",
        committer: {
          name: userData.username,
          email: userData.email,
        },
        content: isEditingDisabled.value
          ? btoa(todayDiaryContent.value)
          : btoa(btoa(todayDiaryContent.value)),
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    if (response.status === 200 || response.status === 201) {
      alert("Changes saved.");
      const oldContent = atob(atob(todayDiary.value.content));
      const currentContent = todayDiaryContent.value;
      const newContent = currentContent.split(oldContent)[1];
      localStorage.setItem("cachedTodayDiaryContent", btoa(btoa(newContent)));
    }

    return;
  } catch (err) {
    console.error(err);
  }
}

async function toggleContent() {
  if (isContentRevealed.value) {
    todayDiaryContent.value = atob(atob(todayDiaryContent.value));
    isEditingDisabled.value = false;
  } else {
    todayDiaryContent.value = btoa(btoa(todayDiaryContent.value));
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
  const cachedTodayDiaryContent = localStorage.getItem(
    "cachedTodayDiaryContent",
  );
  todayDiary.value = await getTodayDiary();
  if (todayDiary.value === null) {
    todayDiary.value = await createTodayDiary();
  }
  if (cachedTodayDiaryContent) {
    const decryptedTodayDiaryContent = atob(atob(todayDiary.value.content));
    const decrytedCachedTodayDiaryContent = atob(atob(cachedTodayDiaryContent));
    if (!decryptedTodayDiaryContent.includes(decrytedCachedTodayDiaryContent)) {
      todayDiary.value.content = btoa(
        btoa(
          `${atob(atob(todayDiary.value.content))}${atob(atob(cachedTodayDiaryContent))}`,
        ),
      );
    } else {
      localStorage.removeItem("cachedTodayDiaryContent");
    }
  }
  todayDiaryContent.value = todayDiary.value.content;
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
        v-model="isContentRevealed"
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

      <button
        :disabled="isEditingDisabled"
        v-on:click="saveChanges"
        type="button"
      >
        Save Changes
      </button>
    </div>
  </section>
</template>

<style scoped></style>
