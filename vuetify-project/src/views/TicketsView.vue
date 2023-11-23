<template>
  <div class="ticket-container">
    <h1>예매한 좌석 정보</h1>
    <div class="tickets">
      <div
        class="ticket"
        v-for="ticket in theaterStore.ticketsInfo"
        :key="ticket.id"
      >
        <h3 class="seat-number">좌석번호 : {{ ticket.seat.num }}번</h3>
        <p>상영관 : {{ ticket.seat.theater }}번 상영관</p>
        <div class="cancel-btn">
          <button class="ticket-btn" @click="ticketDelete(ticket.seat.id)">예매 취소하기</button>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <button class="ticket-btn" @click="deleteAll(theaterStore.ticketsInfo[0].seat.theater)">전체 예매 취소하기</button>&nbsp;&nbsp;&nbsp;
      <button class="ticket-btn" @click="ticketPay">결제하기</button>
    </div>
  </div>
</template>

<script setup>
import { useTheaterStore } from '@/store/theaters'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const theaterStore = useTheaterStore()
const router = useRouter()
const route = useRoute()

const deleteAll = (theaterId) => {
  theaterStore.allTicketDelete()
  router.push({ name: 'TheaterView', params: { id: theaterId } })
}

const ticketDelete = (seatId) => {
  theaterStore.ticketDelete(seatId)
}

const ticketPay = () => {
  theaterStore.ticketPay(route.params.id)
}
</script>

<style scoped>
.ticket-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.tickets {
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
}
.ticket {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 20px;
  transition: box-shadow 0.3s ease; /* 그림자 변경 시 부드러운 효과 */
}
.ticket:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.seat-number {
  margin-bottom: 10px;
  font-size: 1.2em;
}
.btn-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
}
.ticket-btn {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}
.ticket-btn:hover {
  background-color: #2980b9;
}
.cancel-btn {
  display: flex;
  flex-direction: row-reverse;
}
</style>