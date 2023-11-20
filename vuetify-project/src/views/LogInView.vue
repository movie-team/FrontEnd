<template>
  <div class="login-container">
    <h1>로그인</h1>
    <form @submit.prevent="logIn">
      <label for="username">유저네임 : </label>
      <input type="text" id="username" v-model.trim="username" placeholder="유저네임"><br>

      <!-- <label for="email">이메일 : </label>
      <input type="email" id="email" v-model.trim="email" placeholder="이메일 주소"><br> -->

      <label for="password">비밀번호 : </label>
      <input type="password" id="password" v-model.trim="password" placeholder="비밀번호"><br>

      <button>로그인</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAccountStore } from '@/store/accounts'

const username = ref(null)
// const email = ref(null)
const password = ref(null)
const store = useAccountStore()

const logIn = () => {
  const payload = {
    username: username.value,
    // email: email.value,
    password: password.value
  }
  store.logIn(payload)
}
</script>

<style scoped>
.login-container {
  border: 1px solid black;
}
</style>