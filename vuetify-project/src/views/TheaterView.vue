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
    <div class="btn-container">
      <button class="theater-btn" @click="ticket">좌석 예매</button>
    </div>
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
h1 {
  text-align: center;
}
.seats {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.theater-btn {
  margin-left: auto;
  margin-right: 50px;
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.theater-btn:hover {
  background-color: #2980b9;
}
.btn-container {
  display: flex;
}
</style>