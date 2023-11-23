<template>
  <div>
    <h1>영화 좌석 예매 페이지</h1>
    <div class="seats">
      <Seats
        v-for="seat in theaterStore.theaterInfo.seat_set"
        :key="seat.id"
        :seat="seat"
      />
    </div>
    <button @click="ticket">좌석 예매</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTheaterStore } from '@/store/theaters'
import { useRoute } from 'vue-router'
import Seats from '@/components/Seats.vue'

const theaterStore = useTheaterStore()
const route = useRoute()

onMounted(() => {
  theaterStore.getSeats(route.params.id)
})

const ticket = () => {
  if (theaterStore.choosedSeats.length !== 0) {
    theaterStore.tickets()
  } else {
    alert('좌석을 먼저 선택해주세요!')
  }
}
</script>

<style scoped>
.seats {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>