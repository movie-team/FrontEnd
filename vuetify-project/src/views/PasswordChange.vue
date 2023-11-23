<template>
  <div class="pwd-change-container">
    <label class="pwd-change-label" for="password">새로운 비밀번호 :
      <input class="pwd-change-input" type="password" id="password" v-model.trim="password" placeholder="비밀번호" required>
    </label>
    
    <label class="pwd-change-label" for="password2">비밀번호 확인 :
      <input class="pwd-change-input" type="password" id="password2" v-model.trim="password2" placeholder="비밀번호 확인" required>
    </label>

    <!-- 비밀번호 일치 여부를 확인하고 빨간 경고 메시지를 표시합니다. -->
    <div v-if="password !== password2" style="color: red;">
      비밀번호가 일치하지 않습니다.
    </div>
    <div v-else style="color: blue;">
      비밀번호가 일치합니다.
    </div>

    <button class="pwd-change-btn" @click="passwordChangeConfirm">비밀번호 변경!</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAccountStore } from '@/store/accounts'
import { useRouter } from 'vue-router'

const store = useAccountStore()
const router = useRouter()
const password = ref(null)
const password2 = ref(null)

onMounted(() => {
  store.profile()
})

const passwordChangeConfirm = () => {
  store.PasswordChange(password.value)
  alert('비밀번호가 변경되었습니다.')
  router.push({ name: 'ProfileView', params: { id: store.userId} })
}
</script>

<style scoped>
.pwd-change-container {
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
.pwd-change-label {
  font-size: 16px;
  margin-bottom: 8px;
  color: #555;
}
.pwd-change-input {
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.pwd-change-btn {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.pwd-change-btn:hover {
  background-color: #2980b9;
}
</style>