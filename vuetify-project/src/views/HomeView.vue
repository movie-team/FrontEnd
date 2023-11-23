<template>
  <div>
    <MovieList />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAccountStore } from '@/store/accounts'
import { useMovieStore } from '@/store/movies'
import { useTheaterStore } from '@/store/theaters'
import MovieList from '@/components/MovieList.vue'

const store = useAccountStore()
const movieStore = useMovieStore()
const theaterStore = useTheaterStore()

onMounted(() => {
  movieStore.getMovies()
  theaterStore.allTicketDelete()
  
  // 카카오 로그인 후 url에 들어온 토큰 받기
  const urlSearch = new URLSearchParams(location.search)
  console.log('urlSearch는?')
  console.log(urlSearch)
  console.log(urlSearch.size)
  if (urlSearch.size > 0) {
    store.kakaoLogin(urlSearch)
  }
  
  // 토큰 유효성
  store.verify()
  store.kakaoRefresh()
})
</script>

<style scoped>

</style>