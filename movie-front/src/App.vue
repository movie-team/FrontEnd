<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink :to="{ name: 'signup' }">회원가입</RouterLink>
      <RouterLink :to="{ name: 'login' }">로그인</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
