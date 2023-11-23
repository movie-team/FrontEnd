<template>
  <div class="ticket-container">
    <h1>예매한 좌석 정보</h1>
    <div class="tickets">
      <div
        class="ticket"
        v-for="ticket in theaterStore.ticketsInfo"
        :key="ticket.id"
      >
        <h3>좌석번호 : {{ ticket.seat.num }}번</h3>
        <p>상영관 : {{ ticket.seat.theater }}번 상영관</p>
        <button @click="ticketDelete(ticket.seat.id)">예매 취소하기</button>
      </div>
    </div>
    <div class="ticket-btn">
      <button @click="deleteAll(theaterStore.ticketsInfo[0].seat.theater)">전체 예매 취소하기</button>&nbsp;&nbsp;&nbsp;
      <button @click="ticketPay">결제하기</button>
    </div>
  </div>
</template>

<script setup>
import { useTheaterStore } from '@/store/theaters'
import { useRouter } from 'vue-router'

const theaterStore = useTheaterStore()
const router = useRouter()

const deleteAll = (theaterId) => {
  theaterStore.allTicketDelete()
  router.push({ name: 'TheaterView', params: { id: theaterId } })
}

const ticketDelete = (seatId) => {
  theaterStore.ticketDelete(seatId)
}

const ticketPay = () => {
  theaterStore.ticketPay()
}
</script>

<style scoped>
.ticket-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tickets {
  padding: 50px;
}
.ticket {
  border: 1px solid black;
  margin: 20px;
  padding: 20px;
}
.ticket-btn {
  display: flex;
  margin-left: auto;
  padding: 20px;
}
</style>