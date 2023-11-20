<template>
  <div class="login-container">
    <h1>시작하기</h1>
    <label for="username">유저네임 : </label>
    <input type="text" id="username" v-model.trim="username" placeholder="유저 네임"><br>

    <label for="email">이메일 : </label>
    <input type="email" id="email" v-model.trim="email" placeholder="이메일 주소">
    <button @click.prevent="emailCheck">인증</button>
    
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
    
    <br>

    <label for="password">비밀번호 : </label>
    <input type="password" id="password" v-model.trim="password" placeholder="비밀번호"><br>

    <label for="password2">비밀번호 확인 : </label>
    <input type="password" id="password2" v-model.trim="password2" placeholder="비밀번호 확인"><br>

    <label for="birth">생일 : </label>
    <input type="text" id="birth" v-model.trim="birth" placeholder="생일"><br>

    <label for="gender">성별 : </label>
    <input type="radio" name="gender" v-model.trim="gender" value="True"><br>
    <input type="radio" name="gender" v-model.trim="gender" value="False"><br>

    <button @click="signUp" disabled>시작하기</button>
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

const username = ref(null)
const email = ref(null)
const password = ref(null)
const password2 = ref(null)
const birth = ref(null)
const gender = ref(null)
const otp = ref('')
const emailPass = ref(null)
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
      url: `${API_URL}/api/confirm/`,
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
</script>

<style scoped>
.login-container {
  border: 1px solid black;
}
</style>