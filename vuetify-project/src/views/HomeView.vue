<template>
  <div>
    <h1>여기는 메인 홈페이지</h1>
    <!-- <Home v-if="!store.isLogin" />
    <MovieList v-if="store.isLogin" />
    구성이 완료되면 로그인 인증으로 화면 구성 -->

    <Home />
    <MovieList />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAccountStore } from '@/store/accounts'
import { useMovieStore } from '@/store/movies'
import Home from '@/components/Home.vue'
import MovieList from '@/components/MovieList.vue'

const store = useAccountStore()
const movieStore = useMovieStore()

onMounted(() => {
  store.verify()
  // store.refresh()
  movieStore.getMovies()
})
</script>

<style scoped>

</style>