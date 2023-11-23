import axios from 'axios'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import VueCookies from 'vue-cookies'

export const useTheaterStore = defineStore('theater', () => {
  // 인스턴스 및 변수들
  const API_URL = 'http://127.0.0.1:8000'
  const router = useRouter()
  const theaterInfo = ref({})
  const choosedSeats = ref([])
  const ticketsInfo = ref([])
  const paymentMaching = ref({})

  // 영화관 좌석 정보 받기
  const getSeats = function(theaterId) {
    axios({
      method: 'get',
      url: `${API_URL}/api/movies/theater/${theaterId}/`
    })
      .then((res) => {
        console.log('상영관 정보!')
        console.log(res)
        console.log(res.data)
        theaterInfo.value = res.data
        console.log(theaterInfo.value)
        choosedSeats.value = []
      })
      .catch((err) => {
        console.log('상영관 정보 실패')
        console.log(err)
      })
  }

  // 예매 티켓 조회
  const readTickets = function() {
    axios({
      method: 'get',
      url: `${API_URL}/api/movies/ticket/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      },
    })
      .then((res) => {
        console.log('예매 정보 성공!')
        console.log(res)
        console.log(res.data)
        ticketsInfo.value = res.data
        router.push({ name: 'TicketsView' })
      })
      .catch((err) => {
        console.log('예매 정보 실패')
        console.log(err)
      })
  }

  // 영화 좌석 예매
  const tickets = function() {
    console.log('티켓 잘 저장됐는지?')
    console.log(choosedSeats.value)

    axios({
      method: 'post',
      url: `${API_URL}/api/movies/ticket/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      },
      data: {
        'seat': choosedSeats.value
      }
    })
      .then((res) => {
        console.log('좌석 예매 성공!')
        console.log(res)
        console.log(res.data)
        readTickets()
      })
      .catch((err) => {
        console.log('좌석 예매 실패')
        console.log(err)
      })
  }

  // 티켓 전체 삭제
  const allTicketDelete = function() {
    axios({
      method: 'delete',
      url: `${API_URL}/api/movies/ticket/delete/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      }
    })
      .then((res) => {
        console.log('티켓 삭제 성공!')
        console.log(res)
        console.log(res.data)
      })
      .catch((err) => {
        console.log('티켓 삭제 실패')
        console.log(err)
      })
  }

  // 티켓 하나씩 삭제
  const ticketDelete = function(seatId) {
    axios({
      method: 'delete',
      url: `${API_URL}/api/movies/ticket/${seatId}/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      }
    })
      .then((res) => {
        console.log('티켓 삭제 성공!')
        console.log(res)
        console.log(res.data)
        readTickets()
      })
      .catch((err) => {
        console.log('티켓 삭제 실패')
        console.log(err)
      })
  }

  // 티켓 결제 요청
  const ticketPay = function() {
    axios({
      method: 'post',
      url: `${API_URL}/api/movies/ticket/pay/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      }
    })
      .then((res) => {
        console.log('티켓 결제 요청 성공!')
        console.log(res)
        console.log(res.data)
        document.location.href = `${res.data.next_redirect_pc_url}`
        // readTickets()
      })
      .catch((err) => {
        console.log('티켓 결제 요청 실패')
        console.log(err)
      })
  }

  // 결제 최종 승인
  const ticketPayConfirm = function(pg_token, userId) {
    axios({
      method: 'post',
      url: `${API_URL}/api/movies/confirm/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      },
      data: {
        "pg_token": pg_token
      }
    })
      .then((res) => {
        console.log('티켓 결제 성공!')
        console.log(res)
        console.log(res.data)
        router.push({ name: 'ProfileView', params: { id: userId } })
      })
      .catch((err) => {
        console.log('티켓 결제 실패')
        console.log(err)
      })
  }

  // 티켓 결제 매칭
  const payment = function() {
    axios({
      method: 'get',
      url: `${API_URL}/api/movies/payment/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      },
    })
      .then((res) => {
        console.log('결제 매칭 성공!')
        console.log(res)
        console.log(res.data)
        paymentMaching.value = res.data
      })
      .catch((err) => {
        console.log('결제 매칭 실패')
        console.log(err)
      })
  }

  // 결제 취소
  const ticketCancel = function(payment, userId) {
    axios({
      method: 'delete',
      url: `${API_URL}/api/movies/cancel/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      },
      data: {
        'payment': payment
      }
    })
      .then((res) => {
        console.log('결제 취소 성공!')
        console.log(res)
        console.log(res.data)
        // router.push({ name: 'ProfileView', params: { id: userId } })
        location.reload()
      })
      .catch((err) => {
        console.log('결제 취소 실패')
        console.log(err)
      })
  }

  return { getSeats, API_URL, theaterInfo, choosedSeats, tickets, ticketsInfo, ticketCancel,
    allTicketDelete, ticketDelete, ticketPay, ticketPayConfirm, payment, paymentMaching
  }
}, { persist: true })