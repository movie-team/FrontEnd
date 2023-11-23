<template>
  <header class="header">
    <h1>사이트명</h1>
    <nav>
      <ul>
        <li><a href="/">홈</a></li>
        <li><a href="/worldcup/">영화 월드컵</a></li>
        <!-- <li><a href="#">영화</a></li>
        <li><a href="#">최신 콘텐츠</a></li>
        <li><a href="#">내가 찜한 콘텐츠</a></li> -->
      </ul>
    </nav>
    <div class="header-right">
      <!-- <div>검색버튼</div>
      <div><a href="#">알림</a></div> -->
      <div><a :href="`/profile/${userStore.userId}/`">프로필</a></div>
    </div>
  </header>
  <main class="main">
    <div>
      <h3>인기 탑 10</h3>
      <MovieItem
        v-for="movie in store.topMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <div>
      <div
        class="genres"
        v-for="genre in store.genres"
        :key="genre.id"
      >
        <h3>{{ genre.name }}</h3>
        <div>
          <MovieItem
            v-for="movie in genre.movies"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </div>
    </div>
    <div>
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
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.header > h1, nav, div {
  display: inline-block;
}
.header li {
  display: inline-block;
  margin-right: 10px;
}
.header-right {
  margin-left: auto;
}
.header-right > div {
  margin-left: 10px;
}
a {
  text-decoration: none;
  color: black;
}
.main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.genres {
  display: flex;
  flex-direction: column;
}
</style>