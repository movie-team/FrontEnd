<template>
  <header class="header">
    <h1>어영부영</h1>
    <nav class="header-right">
      <ul>
        <li><a href="/">홈</a></li>
        <li><a href="/worldcup/">영화 월드컵</a></li>
        <li v-if="userStore.isLogin"><a :href="`/profile/${userStore.userId}/`">프로필</a></li>
        <li v-if="!userStore.isLogin"><a href="/signup">회원가입</a></li>
        <li v-if="!userStore.isLogin"><a href="/login">로그인</a></li>
      </ul>
      <button class="logout" v-if="userStore.isLogin" @click="logOut">로그아웃</button>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useAccountStore } from '@/store/accounts'

const userStore = useAccountStore()

const logOut = function() {
  userStore.logOut()
}
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.header > h1, div {
  display: inline-block;
}
.header li {
  display: inline-block;
  margin-right: 10px;
}
.header-right {
  margin-left: auto;
  display: flex; /* 프로필과 로그아웃을 가로로 정렬하기 위해 추가 */
  align-items: center; /* 세로 정렬을 위해 추가 */
}
.header-right > nav {
  margin-left: 10px;
}
a {
  text-decoration: none;
  color: black;
}
.logout {
  margin-left: auto;
}
</style>
