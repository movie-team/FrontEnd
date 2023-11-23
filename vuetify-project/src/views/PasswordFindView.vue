<template>
  <div class="search-container">
    <h3>가입하신 아이디(유저네임)를 입력해주세요!</h3>
    <input type="text" v-model="username">
    <button @click="resetPassword">
      비밀번호 찾기
      <v-dialog
        v-model="dialog"
        activator="parent"
        width="auto"
      >
        <v-card
          class="py-8 px-6 text-center mx-auto ma-4"
          elevation="12"
          max-width="800"
          width="100%"
        >
          <h3 class="text-h6 mb-4">이메일을 확인해주세요!</h3>

          <div class="text-body-2">
            기존 계정에 있는 이메일주소로 코드를 보냈습니다.<br>
            이메일을 확인하시고 코드를 같이 입력해주세요.
          </div>

          <v-sheet color="surface" class="modal-container">
            <!-- <v-otp-input
              :length="8"
              v-model="otp"
              type="password"
              variant="solo"
            ></v-otp-input> -->
            <label for="otp">보안코드 : 
              <input id="otp" class="search-input" type="text" v-model="otp">
            </label>
            <label for="password">새 비밀번호 : 
              <input id="password" class="search-input" type="password" v-model="password">
            </label>
            <label for="password2">비밀번호 확인 : 
              <input id="password2" class="search-input" type="password" v-model="password2">
            </label>
          </v-sheet>

          <v-btn
            @click.prevent="confirm"
            class="my-4"
            color="purple"
            height="40"
            text="새 비밀번호 설정"
            variant="flat"
          ></v-btn>

          <div class="text-caption">
            코드를 받지 못 했나요? <a href="#" @click.prevent="otp = ''">다시 보내기</a>
          </div>
        </v-card>
      </v-dialog>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAccountStore } from '@/store/accounts'

const store = useAccountStore()
const username = ref(null)
const dialog = ref(false)
const otp = ref('')
const password = ref(null)
const password2 = ref(null)

const resetPassword = () => {
  store.resetPassword(username.value)
}

const confirm = () => {
  const payload = {
    token: otp.value,
    password: password.value,
    username: username.value
  }
  store.newPassword(payload)
}
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-input {
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>