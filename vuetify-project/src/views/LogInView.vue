<template>
  <div class="login-container">
    <h1>로그인</h1>
    <form class="login-form" @submit.prevent="logIn">
      <label class="login-label" for="username">유저네임 : </label>
      <input class="login-input" type="text" id="username" v-model.trim="username" placeholder="유저네임"><br>

      <!-- <label for="email">이메일 : </label>
      <input type="email" id="email" v-model.trim="email" placeholder="이메일 주소"><br> -->

      <label class="login-label" for="password">비밀번호 : </label>
      <input class="login-input" type="password" id="password" v-model.trim="password" placeholder="비밀번호"><br>

      <button class="login-btn">로그인</button>
    </form>
    <div class="social-container">
      <br>
      <hr>
      <p>or</p>
      <a :href="`${store.API_URL}/accounts/kakao/login/`">
        <img class="kakao-btn" src="../images/kakao_login_small.png" alt="카카오 로그인">
      </a>
    </div>
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
  width: 40%;
  height: 60vh;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 50px;
  background-color: #fff;
  padding-top: 20px;
}
.login-form{
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-label {
  font-size: 16px;
  margin-bottom: 8px;
  color: #555;
}
.login-input {
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.login-btn {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.login-btn:hover {
  background-color: #2980b9;
}
.social-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.social-container > hr {
  width: 100%;
  margin-bottom: 20px;
}
</style>