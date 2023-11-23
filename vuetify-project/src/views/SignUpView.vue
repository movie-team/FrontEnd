<template>
  <div class="signup-container">
    <h1>시작하기</h1>

    <!-- 회원가입 단계별 시스템 -->
    <v-stepper
      class="stepper-container"
      alt-labels
      prev-text="이전 단계"
      next-text="다음 단계"
      :items="['Step 1', 'Step 2', 'Step 3']"
    >
      <!-- 회원가입 1단계 -->
      <template v-slot:item.1>
        <v-card title="필수 입력 1단계" flat class="text-center">
          <label for="username">아이디 : </label>
          <input class="signup-input" type="text" id="username" v-model.trim="username" placeholder="아이디" required><br>

          <label for="email">이메일 :
            <input class="signup-input" type="email" id="email" v-model.trim="email" placeholder="이메일 주소" required>
          </label>
          <button @click.prevent="emailCheck" class="verification-btn">
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
              <h3 class="text-h6 mb-4">이메일을 확인해주세요!</h3>

              <div class="text-body-2">
                입력하신 이메일주소로 코드를 보냈습니다.<br>
                이메일을 확인하시고 코드를 같이 입력해주세요.
              </div>

                <v-sheet color="surface">
                  <!-- <v-otp-input
                    :length="8"
                    v-model="otp"
                    type="password"
                    variant="solo"
                  ></v-otp-input> -->
                  <input class="signup-input" type="password" v-model="otp">
                </v-sheet>

                <v-btn
                  @click.prevent="secondaryConfirm"
                  class="my-4"
                  color="purple"
                  height="40"
                  text="Verify"
                  variant="flat"
                ></v-btn>

                <div class="text-caption">
                  코드를 받지 못 했나요? <a href="#" @click.prevent="otp = ''">다시 보내기</a>
                </div>
              </v-card>
            </v-dialog>
          </button>
          <br>
          <label for="password">비밀번호 :
            <input class="signup-input" type="password" id="password" v-model.trim="password" placeholder="비밀번호" required>
          </label><br>
          
          <label for="password2">비밀번호 확인 :
            <input class="signup-input" type="password" id="password2" v-model.trim="password2" placeholder="비밀번호 확인" required>
          </label>

          <!-- 비밀번호 일치 여부를 확인하고 빨간 경고 메시지를 표시합니다. -->
          <div v-if="password !== password2" style="color: red;">
            비밀번호가 일치하지 않습니다.
          </div>
          <div v-else style="color: blue;">
            비밀번호가 일치합니다.
          </div>
        </v-card>
      </template>

      <!-- 회원가입 2단계 -->
      <template v-slot:item.2>
        <v-card title="필수 입력 2단계" flat class="text-center">
          <label for="birth">생일 :
            <input class="signup-input" type="text" id="birth" placeholder="생일" :value="birth"><br>
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
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card title="선택 입력 단계" flat class="text-center">
          <label for="firstName">이름 : </label>
          <input class="signup-input" type="text" id="firstName" v-model.trim="first_name" placeholder="이름을 입력해주세요"><br>

          <label for="lastName">성 : </label>
          <input class="signup-input" type="text" id="lastName" v-model.trim="last_name" placeholder="성을 입력해주세요"><br>

          <button v-if="emailPass === 'ok'" class="verification-btn" @click="signUp">시작하기</button>
          <button v-if="emailPass !== 'ok'" class="disable-btn" @click="signUp" disabled>시작하기</button>
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
const emailPass = ref(null)

// 회원가입 2단계 변수들
const birth = ref(null)
const gender = ref(null)
const dateDialog = ref(false)
const date = useDate()
const today = ref(null)

// 회원가입 3단계 변수들
const first_name = ref('')
const last_name = ref('')

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
      emailPass.value = res.data.message
      console.log(emailPass.value)
    })
    .catch((err) => {
      console.log('인증번호 확인은 실패ㅠㅠ')
      console.log(err)
    })

  dialog.value = false

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
    gender: gender.value,
    first_name: first_name.value,
    last_name: last_name.value
  }
  store.signUp(payload)
}

const dateBtnClick = () => {
  let calendar = date.format(new Date(today.value), 'keyboardDate')
  let year = date.getYear(new Date(today.value))
  let month = date.getMonth(new Date(today.value)) + 1
  console.log(date.getYear(new Date(today.value)))
  console.log(date.getMonth(new Date(today.value)))
  // console.log(date.format(new Date(today.value), 'normalDateWithWeekday'))
  console.log(date.format(new Date(today.value), 'keyboardDate'))
  // console.log(date.format(new Date(today.value), 'monthAndDate'))
  // console.log(date.format(new Date(today.value), 'dayOfMonth'))
  console.log(calendar.slice(3, 5))

  // 날짜 변환
  if (calendar.slice(3, 4) === '0') {
    birth.value = `${year}-${month}-${calendar.slice(4, 5)}`
  } else {
    birth.value = `${year}-${month}-${calendar.slice(3, 5)}`
  }

  dateDialog.value = false
}
</script>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}
.stepper-container {
  width: 100%;
}
.signup-input {
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.verification-btn {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.verification-btn:hover {
  background-color: #0e75c2;
}
.disable-btn {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #ccc;
  color: #666;
  border: none;
  border-radius: 4px;
  cursor: not-allowed;
  position: relative;
}
.disable-btn:hover {
  background-color: #ccc;
}
.disable-btn:hover::before {
  content: '이메일 인증과 필수 요소를 모두 입력해주세요!';
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}
.kakao-btn:hover {
  cursor: pointer;
}
</style>