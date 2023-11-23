<template>
  <div :class="{ 'seat': true, 'selected-seat': isSelected }" @click="chooseSeat(seat.id)">
    <span>{{ seat.num }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheaterStore } from '@/store/theaters'

const props = defineProps(['seat'])

const theaterStore = useTheaterStore()

const isSelected = computed(() => {
  return theaterStore.choosedSeats.includes(props.seat.id)
})

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
  transition: background-color 0.3s ease; /* 색상 변경 시 부드러운 효과 */
}
.selected-seat {
  background-color: gray; /* 선택된 좌석에 대한 배경색 적용 */
}
.seat:hover {
  cursor: pointer;
}
</style>