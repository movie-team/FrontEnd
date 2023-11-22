<template>
  <div v-if="store.acc.social === false">
    <h1>프로필 페이지!</h1>
    <label for="username">아이디 : </label>
    <input id="username" type="text" v-model="store.acc.username"><br>

    <label for="email">이메일 : </label>
    <input id="email" type="email" v-model="store.acc.email"><br>

    <label for="birth">생년월일 : </label>
    <input id="birth" type="text" v-model="store.acc.birth"><br>

    <label for="age">나이 : </label>
    <input id="age" type="text" v-model="store.acc.age"><br>

    <label for="gender">성별 : </label>
    <input id="gender" type="text" v-model="store.acc.gender"><br>

    <label for="first-name">이름 : </label>
    <input id="first-name" type="text" v-model="store.acc.first_name"><br>

    <label for="last-name">성 : </label>
    <input id="last-name" type="text" v-model="store.acc.last_name"><br>

    <label for="tickets">예약한 티켓 : </label>
    <div v-if="store.acc.ticket_set.length !== 0" id="tickets">
      <ul>
        <li v-for="ticket in store.acc.ticket_set">
          {{ ticket }}
        </li>
      </ul>
    </div>
    <div v-else id="tickets">
      <span>예약한 티켓 없음</span>
    </div>
    <button @click="profileUpdate(store.acc.username, store.acc.email, store.acc.birth, store.acc.gender, store.acc.first_name, store.acc.last_name)">회원정보 수정하기</button><br>
    <button @click="profileDelete">회원 탈퇴하기</button><br>
    <button @click="passwordChange">비밀번호 변경하기</button>
  </div>
  <div v-else>
    <h1>프로필 페이지2</h1>
    <label for="username">아이디 : </label>
    <input id="username" type="text" v-model="store.acc.username" readonly><br>

    <label for="email">이메일 : </label>
    <input id="email" type="email" v-model="store.acc.email" readonly><br>

    <label for="birth">생년월일 : </label>
    <input id="birth" type="text" v-model="store.acc.birth"><br>

    <label for="age">나이 : </label>
    <input id="age" type="text" v-model="store.acc.age" readonly><br>

    <label for="gender">성별 : </label>
    <input id="gender" type="text" v-model="store.acc.gender"><br>

    <label for="first-name">이름 : </label>
    <input id="first-name" type="text" v-model="store.acc.first_name"><br>

    <label for="last-name">성 : </label>
    <input id="last-name" type="text" v-model="store.acc.last_name"><br>

    <label for="tickets">예약한 티켓 : </label>
    <div v-if="store.acc.ticket_set.length !== 0" id="tickets">
      <ul>
        <li v-for="ticket in store.acc.ticket_set">
          {{ ticket }}
        </li>
      </ul>
    </div>
    <div v-else id="tickets">
      <span>예약한 티켓 없음</span>
    </div>
    <button @click="profileUpdate(store.acc.username, store.acc.email, store.acc.birth, store.acc.gender, store.acc.first_name, store.acc.last_name)">회원정보 수정하기</button><br>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAccountStore } from '@/store/accounts'
import { useRouter } from 'vue-router'

const store = useAccountStore()
const router = useRouter()

onMounted(() => {
  store.profile()
})

const profileUpdate = (username, email, birth, gender, first_name, last_name) => {
  const payload = {
    username: username,
    email: email,
    birth: birth,
    gender: gender,
    first_name: first_name,
    last_name: last_name
  }
  store.profileUpdate(payload)
  alert('회원정보 수정 완료!')
  document.location.href = `/profile/${store.userId}`
}

const profileDelete = () => {
  store.profileDelete()
  alert('그동안 이용해주셔서 감사합니다.')
  document.location.href = `/`
}

const passwordChange = () => {
  router.push({ name: 'PasswordChange', params: { id: store.userId} })
}
</script>

<style scoped>

</style>