<template>
  <main class="main">
    <div>
      <h2>인기 탑 10</h2>
      <div class="top-container">
        <MovieItem
          v-for="movie in store.topMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
    <div>
      <div
        class="genres"
        v-for="genre in store.genres"
        :key="genre.id"
      >
        <h2>{{ genre.name }}</h2>
        <div class="genre-container">
          <MovieItem
            v-for="movie in genre.movies"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </div>
    </div>
    <div class="etc-container">
      <MovieItem
        v-for="movie in store.movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </main>
</template>

<script setup>
import { useMovieStore } from '@/store/movies'
import { useAccountStore } from '@/store/accounts'
import { onMounted } from 'vue'
import MovieItem from '@/components/MovieItem.vue'

const store = useMovieStore()
const userStore = useAccountStore()

onMounted(() => {
  userStore.profile()
  store.topTenMovie()
  store.getGenre()
})
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
.genres {
  display: flex;
  flex-direction: column;
}
.top-container {
  display: flex;
  flex-wrap: wrap;
}
.genre-container {
  display: flex;
  flex-wrap: wrap;
}
.etc-container {
  display: flex;
  flex-wrap: wrap;
}
</style>