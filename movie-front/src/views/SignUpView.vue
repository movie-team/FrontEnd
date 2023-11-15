<template>
  <div class="login-container">
    <h1>시작하기</h1>
    <form @submit.prevent="signUp">
      <label for="username">유저네임 : </label>
      <input type="text" id="username" v-model.trim="username" placeholder="유저 네임"><br>

      <label for="email">이메일 : </label>
      <input type="email" id="email" v-model.trim="email" placeholder="이메일 주소"><br>

      <label for="password">비밀번호 : </label>
      <input type="password" id="password" v-model.trim="password" placeholder="비밀번호"><br>

      <label for="password2">비밀번호 확인 : </label>
      <input type="password" id="password2" v-model.trim="password2" placeholder="비밀번호 확인"><br>

      <button>시작하기</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAccountStore } from '@/stores/accounts'

const username = ref(null)
const email = ref(null)
const password = ref(null)
const password2 = ref(null)
const store = useAccountStore()

const signUp = () => {
  const payload = {
    username: username.value,
    email: email.value,
    password: password.value,
    password2: password2.value,
  }
  store.signUp(payload)
}
</script>

<style scoped>
.login-container {
  border: 1px solid black;
}
</style>