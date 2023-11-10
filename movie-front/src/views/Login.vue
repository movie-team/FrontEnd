<template>
  <div class="login-container">
    <h1>로그인</h1>
    <form @submit.prevent="loginForm">
      <input type="email" id="email" v-model="email" placeholder="이메일 주소"><br>
      <input type="password" id="password" v-model="password" placeholder="비밀번호"><br>
      <button>로그인</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const url = 'http://127.0.0.1:8000/api/login/'

const loginForm = () => {
  // console.log("버튼이 제대로 눌렸다!")
  // console.log(email.value)
  // console.log(password.value)
  const data = {
    email: email.value,
    password: password.value
  }
  axios.post(url, data)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<style scoped>
.login-container {
  border: 1px solid black;
}
</style>