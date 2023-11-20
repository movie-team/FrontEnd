<template>
  <header class="header">
    <h1>사이트명</h1>
    <nav>
      <ul>
        <li><a href="/">홈</a></li>
        <li><a href="#">TV프로그램</a></li>
        <li><a href="#">영화</a></li>
        <li><a href="#">최신 콘텐츠</a></li>
        <li><a href="#">내가 찜한 콘텐츠</a></li>
      </ul>
    </nav>
    <div class="header-right">
      <div>검색버튼</div>
      <div><a href="#">알림</a></div>
      <div><a href="#">프로필</a></div>
    </div>
  </header>
  <main class="main">
    <MovieItem
      v-for="movie in store.movies"
      :key="movie.id"
      :movie="movie"
    />
  </main>
</template>

<script setup>
import { useMovieStore } from '@/store/movies'
import MovieItem from '@/components/MovieItem.vue'

const store = useMovieStore()
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
</style>