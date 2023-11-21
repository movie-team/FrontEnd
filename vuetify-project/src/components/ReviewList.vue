<template>
  <div v-if="store.reviews">
    <ReviewItem
      v-for="review in store.reviews"
      :key="review.id"
      :review="review"
    />
  </div>
</template>

<script setup>
import { useMovieStore } from '@/store/movies'
import ReviewItem from '@/components/ReviewItem.vue'

const store = useMovieStore()
</script>

<style scoped>

</style>