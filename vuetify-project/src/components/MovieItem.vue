<template>
  <div class="item" @click="goDetail(movie.id)">
    <img :src="`https://image.tmdb.org/t/p/w200${movie.poster}`" alt="영화 포스터">
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  movie: Object
})

const goDetail = (movieId) => {
  router.push({ name: 'DetailView', params: { id: movieId } })
}
</script>

<style scoped>
.item:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>