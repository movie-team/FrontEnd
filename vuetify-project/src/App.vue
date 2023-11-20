<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink> |
      <RouterLink :to="{ name: 'SignUpView' }">회원가입</RouterLink> |
      <RouterLink :to="{ name: 'LogInView' }">로그인</RouterLink> |
      <button @click="logOut">로그아웃</button>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAccountStore } from '@/store/accounts'

const store = useAccountStore()

const logOut = function() {
  store.logOut()
}
</script>

<style scoped>

</style>
