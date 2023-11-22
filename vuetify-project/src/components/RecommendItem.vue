<template>
  <div>
    <img :src="`https://image.tmdb.org/t/p/w200${movie.poster}`" alt="영화 포스터">
  </div>
</template>

<script setup>
defineProps({
  movie: Object
})
</script>

<style scoped>
/* .recommend-poster {
  display: inline-block;
} */
</style>