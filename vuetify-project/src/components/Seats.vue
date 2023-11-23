<template>
  <div class="seat" @click="chooseSeat(seat.id)">
    <span>{{ seat.num }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTheaterStore } from '@/store/theaters'

defineProps({
  seat: Object
})

const theaterStore = useTheaterStore()

const chooseSeat = (seatId) => {
  theaterStore.choosedSeats.push(seatId)
  console.log('선택된 좌석')
  console.log(theaterStore.choosedSeats)
}
</script>

<style scoped>
.seat {
  border: 1px solid black;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
.seat:hover {
  cursor: pointer;
}
</style>