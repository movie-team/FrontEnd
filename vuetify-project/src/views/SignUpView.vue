<template>
  <div class="login-container">
    <h1>시작하기</h1>

    <!-- 회원가입 단계별 시스템 -->
    <v-stepper
      alt-labels
      prev-text="이전 단계"
      next-text="다음 단계"
      :items="['Step 1', 'Step 2']"
    >
      <!-- 회원가입 1단계 -->
      <template v-slot:item.1>
        <v-card title="필수 단계" flat>
          <p>사용할 아이디와 이메일을 입력하세요</p>
          <label for="username">아이디 : </label>
          <input type="text" id="username" v-model.trim="username" placeholder="아이디"><br>

          <label for="email">이메일 : </label>
          <input type="email" id="email" v-model.trim="email" placeholder="이메일 주소">
          <button @click.prevent="emailCheck">
            인증
            <v-dialog
              v-model="dialog"
              activator="parent"
              width="auto"
            >
              <v-card
                class="py-8 px-6 text-center mx-auto ma-4"
                elevation="12"
                max-width="400"
                width="100%"
              >
                <h3 class="text-h6 mb-4">Verify Your Account</h3>

                <div class="text-body-2">
                  We sent a verification code to john..@gmail.com <br>

                  Please check your email and paste the code below.
                </div>

                <v-sheet color="surface">
                  <v-otp-input
                    :length="8"
                    v-model="otp"
                    type="password"
                    variant="solo"
                  ></v-otp-input>
                </v-sheet>

                <v-btn
                  @click.prevent="secondaryConfirm"
                  class="my-4"
                  color="purple"
                  height="40"
                  text="Verify"
                  variant="flat"
                  width="70%"
                ></v-btn>

                <div class="text-caption">
                  Didn't receive the code? <a href="#" @click.prevent="otp = ''">Resend</a>
                </div>
              </v-card>
            </v-dialog>
          </button>
        </v-card>

        <label for="password">비밀번호 : </label>
        <input type="password" id="password" v-model.trim="password" placeholder="비밀번호"><br>

        <label for="password2">비밀번호 확인 : </label>
        <input type="password" id="password2" v-model.trim="password2" placeholder="비밀번호 확인"><br>
      </template>

      <!-- 회원가입 2단계 -->
      <template v-slot:item.2>
        <v-card title="선택 단계" flat>
          <label for="birth">생일 :
            <input @click.prevent="dateSelect" type="text" id="birth" placeholder="생일" :value="birth"><br>
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

          <label for="gender">성별 : </label><br>
          <span>&nbsp;&nbsp;남자&nbsp;&nbsp;&nbsp;</span><input type="radio" name="gender" v-model.trim="gender" value="True"><br>
          <span>&nbsp;&nbsp;여자&nbsp;&nbsp;&nbsp;</span><input type="radio" name="gender" v-model.trim="gender" value="False"><br>

          <button @click="signUp">시작하기</button>
        </v-card>
      </template>
    </v-stepper>

    <hr>
    <p>or</p>
    <a :href="`${store.API_URL}/accounts/kakao/login/`">
      <img class="kakao-btn" src="../images/kakao_login_small.png" alt="카카오 로그인">
    </a>
  </div>
</template>

<!-- <script>
export default {
  data: () => ({
    otp: '',
  }),
}
</script> -->

<script setup>
import { ref } from 'vue'
import { useAccountStore } from '@/store/accounts'
import { useDate } from 'vuetify'
import axios from 'axios'

// 회원가입 1단계 변수들
const username = ref(null)
const email = ref(null)
const password = ref(null)
const password2 = ref(null)
const otp = ref('')
const dialog = ref(false)
let emailPass = ''

// 회원가입 2단계 변수들
const birth = ref(null)
const gender = ref(null)
const dateDialog = ref(false)
const date = useDate()
const today = ref(null)

const store = useAccountStore()

const emailCheck = () => {
  console.log('이메일 체크 버튼 클릭!')
  const payload = {
    email: email.value,
    username: username.value
  }
  store.emailCheck(payload)
}

const secondaryConfirm = () => {
  // console.log('인증번호 확인 버튼 클릭!')
  // console.log(otp.value)
  // const payload = {
  //   uidb64: otp.value,
  //   username: username.value
  // }

  // 이메일 인증 후 인증번호 확인
  function confirm() {
    // const { uidb64, username } = payload
    // console.log('인증번호 확인 store로 이동!')
    // console.log(uidb64)

    axios({
      method: 'post',
      url: `${store.API_URL}/api/confirm/`,
      data: {
        uidb64: otp.value,
        username: username.value
      }
    })
      .then((res) => {
        console.log('인증번호 확인까지 성공!')
        console.log(res.data)
        console.log(res.data.message)
        emailPass = res.data.message
      })
      .catch((err) => {
        console.log('인증번호 확인은 실패ㅠㅠ')
        console.log(err)
      })
  }

  console.log(emailPass)

  // const msg = store.secondaryConfirm(payload)
  // console.log('메세지 확인!')
  // console.log(msg)
}

const signUp = () => {
  console.log('회원가입 버튼 클릭!')
  const payload = {
    username: username.value,
    email: email.value,
    password: password.value,
    password2: password2.value,
    birth: birth.value,
    gender: gender.value
  }
  store.signUp(payload)
}

// function getToday() {
//   let date = new Date()
//   let year = date.getFullYear()
//   let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
//   let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

//   return year + '-' + month + '-' + day
// }

const dateSelect = () => {
  console.log('셀렉터 클릭!')
  console.log(date.getMonth(new Date(today)))
}

const dateBtnClick = () => {
  console.log(date.getMonth(new Date(today)))
  dateDialog.value = false
}
</script>

<style scoped>
.login-container {
  border: 1px solid black;
}
.kakao-btn:hover {
  cursor: pointer;
}
</style>