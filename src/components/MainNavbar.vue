<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> -
    <RouterLink to="/today-diary">Today's Diary</RouterLink> -
    <RouterLink to="/diary-pages">Diary Pages</RouterLink> -
    <RouterLink to="/read-diary">Read Diary</RouterLink> -
    <RouterLink to="/config">Config</RouterLink>
  </nav>
</template>

<style scoped></style>
