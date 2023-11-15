<template>
  <div>
    <h1>여기는 디테일</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAccountStore } from '@/stores/accounts'

const store = useAccountStore()

onMounted(() => {
  // store.refresh()
  store.verify()
})
</script>

<style scoped>

</style>