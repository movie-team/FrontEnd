<template>
  <div>
    <h1>결제 승인 단계</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTheaterStore } from '@/store/theaters'
import { useAccountStore } from '@/store/accounts'

const theaterStore = useTheaterStore()
const store = useAccountStore()

onMounted(() => {
  store.profile()
  // 카카오페이 후 url에 들어온 토큰 받기
  const urlSearch = new URLSearchParams(location.search)
  console.log('urlSearch는?')
  console.log(urlSearch)
  console.log(urlSearch.get('pg_token'))
  theaterStore.ticketPayConfirm(urlSearch.get('pg_token'), store.userId)
})
</script>

<style scoped>

</style>