<template>
  <div>
    <label for="password">새로운 비밀번호 :
      <input type="password" id="password" v-model.trim="password" placeholder="비밀번호" required>
    </label><br>
    
    <label for="password2">비밀번호 확인 :
      <input type="password" id="password2" v-model.trim="password2" placeholder="비밀번호 확인" required>
    </label><br>
    <button @click="passwordChangeConfirm">비밀번호 변경!</button>
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

</style>