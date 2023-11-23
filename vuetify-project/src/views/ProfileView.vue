<template>
  <div v-if="store.acc.social === false" class="profile-container">
    <h1>프로필 페이지!</h1>
    <label for="username" class="profile-label">아이디 :
      <input class="profile-input" id="username" type="text" v-model="store.acc.username">
    </label>

    <label for="email" class="profile-label">이메일 :
      <input class="profile-input" id="email" type="email" v-model="store.acc.email">
    </label>

    <label for="birth" class="profile-label">생년월일 :
      <input class="profile-input" id="birth" type="text" v-model="store.acc.birth">
    </label>

    <label for="age" class="profile-label">나이 :
      <input class="profile-input" id="age" type="text" v-model="store.acc.age">
    </label>

    <label for="gender" class="profile-label">성별 :
      <input class="profile-input" id="gender" type="text" v-model="store.acc.gender">
    </label>

    <label for="first-name" class="profile-label">이름 :
      <input class="profile-input" id="first-name" type="text" v-model="store.acc.first_name">
    </label>

    <label for="last-name" class="profile-label">성 :
      <input class="profile-input" id="last-name" type="text" v-model="store.acc.last_name">
    </label>

    <label for="tickets" class="profile-label">예약한 티켓 : </label>
    <div v-if="store.acc.ticket_set.length !== 0" id="tickets">
      <ul>
        <li v-for="ticket in store.acc.ticket_set" :key="ticket.id">
          <input type="checkbox" v-model="checkedTickets" :value="ticket.id">&nbsp;
          <span>{{ ticket.seat.theater }}관</span>&nbsp;
          <span>{{ ticket.seat.num }}석</span>
          {{ ticket }}
        </li>
      </ul>
    </div>
    <div v-else id="tickets">
      <span>예약한 티켓 없음</span>
    </div>
    <button @click="ticketCancel">결제 취소</button>
    <button @click="profileUpdate(store.acc.username, store.acc.email, store.acc.birth, store.acc.gender, store.acc.first_name, store.acc.last_name)">회원정보 수정하기</button>
    <button @click="profileDelete">회원 탈퇴하기</button>
    <button @click="passwordChange">비밀번호 변경하기</button>
  </div>
  <div v-else class="profile-container">
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/store/accounts'
import { useTheaterStore } from '@/store/theaters'

const router = useRouter()
const store = useAccountStore()
const theaterStore = useTheaterStore()
const checkedTickets = ref([])
const checkedPayment = ref([])

onMounted(() => {
  store.profile()
  theaterStore.payment()
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

const ticketCancel = () => {
  console.log('선택한 티켓?')
  console.log(checkedTickets.value)
  checkedTickets.value.map((prop) => {
    checkedPayment.value.push(theaterStore.paymentMaching[`${prop}`])
  })
  console.log(checkedPayment.value)
  theaterStore.ticketCancel(checkedPayment.value, store.userId)
}
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* 화면 전체 높이를 최소 높이로 설정 */
  width: 80%; /* 전체 컨테이너의 너비를 조정합니다. */
  margin: 0 auto; /* 가운데 정렬을 위해 auto 마진을 추가합니다. */
  border: 2px solid #3498db; /* 테두리 스타일 및 색상 설정 */
  border-radius: 10px; /* 테두리의 둥글기 정도를 설정합니다. */
  padding: 20px; /* 내부 컨텐츠와 테두리 사이의 간격을 조절합니다. */
}
.profile-label {
  margin-bottom: 5px;
  width: 50%;
  display: flex;
  align-items: center;
}
.profile-input {
  width: 80%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

button {
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

/* 스타일 추가 */

#tickets {
  margin-top: 10px;
}

/* 두 번째 프로필 페이지의 추가 스타일 */
.second-profile {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #3498db;
  border-radius: 5px;
}
</style>