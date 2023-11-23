<template>
  <h1>프로필 페이지</h1>
  <div v-if="store.acc.social === false" class="profile-container">
    <label for="username" class="profile-label">아이디 :
      <input class="profile-input" id="username" type="text" v-model="store.acc.username" readonly>
    </label>

    <label for="email" class="profile-label">이메일 :
      <input class="profile-input" id="email" type="email" v-model="store.acc.email">
    </label>

    <label for="birth" class="profile-label">생년월일 :
      <input class="profile-input" id="birth" type="text" v-model="store.acc.birth">
      <v-dialog
        v-model="dateDialog"
        activator="parent"
        width="auto"
      >
        <v-container>
          <v-row justify="space-around">
            <v-date-picker
              elevation="24"
              color="primary"
              show-adjacent-months
              v-model="today"
            ></v-date-picker>
            <v-btn
              @click.prevent="dateBtnClick"
              class="my-4"
              color="primary"
              height="40"
              text="선택 완료"
              variant="flat"
              width="70%"
            ></v-btn>
          </v-row>
        </v-container>
      </v-dialog>
    </label>

    <label for="age" class="profile-label">나이 :
      <input class="profile-input" id="age" type="text" v-model="store.acc.age" readonly>
    </label>

    <label for="gender" class="profile-label">성별 : </label>
    <div v-if="store.acc.gender">
      <input type="radio" id="male" name="gender" value="남자" v-model.trim="store.acc.gender" checked>
      <label for="male">&nbsp;&nbsp;남자&nbsp;&nbsp;&nbsp;</label>

      <input type="radio" id="female" name="gender" value="여자" v-model.trim="store.acc.gender">
      <label for="female">&nbsp;&nbsp;여자&nbsp;&nbsp;&nbsp;</label>
    </div>
    <div v-else>
      <input type="radio" id="male" name="gender" value="남자" v-model.trim="store.acc.gender">
      <label for="male">&nbsp;&nbsp;남자&nbsp;&nbsp;&nbsp;</label>

      <input type="radio" id="female" name="gender" value="여자" v-model.trim="store.acc.gender" checked>
      <label for="female">&nbsp;&nbsp;여자&nbsp;&nbsp;&nbsp;</label>
    </div>

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
        </li>
      </ul>
    </div>
    <div v-else id="tickets">
      <span>예약한 티켓 없음</span>
    </div>
    <div class="btn-container">
      <button class="profile-btn" @click="ticketCancel">결제 취소</button>&nbsp;&nbsp;
      <button class="profile-btn" @click="profileUpdate(store.acc.username, store.acc.email, store.acc.birth, store.acc.gender, store.acc.first_name, store.acc.last_name)">
        회원정보 수정하기
      </button>&nbsp;&nbsp;
      <button class="profile-btn" @click="profileDelete">회원 탈퇴하기</button>&nbsp;&nbsp;
      <button class="profile-btn" @click="passwordChange">비밀번호 변경하기</button>
    </div>
  </div>
  <div v-else class="profile-container">
    <label for="username" class="profile-label">아이디 :
      <input class="profile-input" id="username" type="text" v-model="store.acc.username" readonly>
    </label>

    <label for="email" class="profile-label">이메일 :
      <input class="profile-input" id="email" type="email" v-model="store.acc.email" readonly>
    </label>

    <label for="birth" class="profile-label">생년월일 :
      <input class="profile-input" id="birth" type="text" v-model="store.acc.birth">
      <v-dialog
        v-model="dateDialog"
        activator="parent"
        width="auto"
      >
        <v-container>
          <v-row justify="space-around">
            <v-date-picker
              elevation="24"
              color="primary"
              show-adjacent-months
              v-model="today"
            ></v-date-picker>
            <v-btn
              @click.prevent="dateBtnClick"
              class="my-4"
              color="primary"
              height="40"
              text="선택 완료"
              variant="flat"
              width="70%"
            ></v-btn>
          </v-row>
        </v-container>
      </v-dialog>
    </label>

    <label for="age" class="profile-label">나이 :
      <input class="profile-input" id="age" type="text" v-model="store.acc.age" readonly>
    </label>

    <label for="gender" class="profile-label">성별 : </label>
    <div v-if="store.acc.gender">
      <input type="radio" id="male" name="gender" value="남자" v-model.trim="store.acc.gender" checked>
      <label for="male">&nbsp;&nbsp;남자&nbsp;&nbsp;&nbsp;</label>

      <input type="radio" id="female" name="gender" value="여자" v-model.trim="store.acc.gender">
      <label for="female">&nbsp;&nbsp;여자&nbsp;&nbsp;&nbsp;</label>
    </div>
    <div v-else>
      <input type="radio" id="male" name="gender" value="남자" v-model.trim="store.acc.gender">
      <label for="male">&nbsp;&nbsp;남자&nbsp;&nbsp;&nbsp;</label>

      <input type="radio" id="female" name="gender" value="여자" v-model.trim="store.acc.gender" checked>
      <label for="female">&nbsp;&nbsp;여자&nbsp;&nbsp;&nbsp;</label>
    </div>

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
        </li>
      </ul>
    </div>
    <div v-else id="tickets">
      <span>예약한 티켓 없음</span>
    </div>
    <div>
      <button class="profile-btn" @click="ticketCancel">결제 취소</button>&nbsp;&nbsp;
      <button class="profile-btn" @click="profileUpdate(store.acc.username, store.acc.email, store.acc.birth, store.acc.gender, store.acc.first_name, store.acc.last_name)">회원정보 수정하기</button><br>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/store/accounts'
import { useTheaterStore } from '@/store/theaters'
import { useDate } from 'vuetify'

const router = useRouter()
const store = useAccountStore()
const theaterStore = useTheaterStore()
const checkedTickets = ref([])
const checkedPayment = ref([])
const dateDialog = ref(false)
const date = useDate()
const today = ref(null)
// const birth = ref(null)

onMounted(() => {
  store.profile()
  theaterStore.payment()
})

const profileUpdate = (username, email, birth, gender, first_name, last_name) => {
  console.log(gender)
  if (gender === '남자') {
    gender = true
  } else {
    gender = false
  }
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
  location.reload()
  // document.location.href = `/profile/${store.userId}`
}

const profileDelete = () => {
  store.profileDelete()
  alert('그동안 이용해주셔서 감사합니다.')
  // document.location.href = `/`
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

const dateBtnClick = () => {
  let calendar = date.format(new Date(today.value), 'keyboardDate')
  let year = date.getYear(new Date(today.value))
  let month = date.getMonth(new Date(today.value)) + 1

  // 날짜 변환
  if (calendar.slice(3, 4) === '0') {
    store.acc.birth = `${year}-${month}-${calendar.slice(4, 5)}`
  } else {
    store.acc.birth = `${year}-${month}-${calendar.slice(3, 5)}`
  }

  dateDialog.value = false
}
</script>

<style scoped>
h1 {
  text-align: center;
}
.profile-container {
  width: 40%;
  height: 80%;
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
  padding-bottom: 60px;
}
.profile-label {
  font-size: 16px;
  margin-bottom: 8px;
  color: #555;
}
.profile-input {
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.profile-btn {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.profile-btn:hover {
  background-color: #2980b9;
}
.btn-container {
  display: flex;
}
</style>