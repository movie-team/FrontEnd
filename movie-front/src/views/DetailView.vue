<template>
  <div class="detail-parent">
    <div v-if="movie" class="detail">
      <div class="detail-head">
        <h3>{{ movie.title }}</h3>
        <span>{{ movie.original_title }}&nbsp;&nbsp;</span>
        <span>{{ movie.release_date }}</span>
      </div>
      <div class="detail-body">
        <div>
          <p>관람객 평점</p>
          <p>{{ movie.vote_average }}</p>
          <p>{{ movie.vote_count }}명 참여</p>
        </div>
      </div>
    </div>
    <div class="review-box">
      <div class="review-write">
        <div>리뷰</div>
        <p>별점을 선택해주세요.</p>
        <p>여긴 별점</p>
        <input type="text" placeholder="감상평을 등록해주세요.">
      </div>
      <div class="review-list">
        <p>여기는 작성한 리뷰 출력</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useAccountStore } from '@/stores/accounts'
import { useMovieStore } from '@/stores/movies'
import { useRoute } from 'vue-router'

const store = useAccountStore()
const movieStore = useMovieStore()
const route = useRoute()
const movie = ref(null)

onMounted(() => {
  // store.refresh()
  store.verify()
  axios({
    method: 'get',
    url: `${movieStore.API_URL}/api/movies/${route.params.id}/`
  })
    .then((res) => {
      console.log('디테일 조회 완료')
      console.log(res)
      movie.value = res.data
    })
    .catch((err) => {
      console.log('디테일 조회 실패')
      console.log(err)
    })
})
</script>

<style scoped>
.detail-parent {
  display: flex;
  flex-direction: column;
}
.detail, .review-box {
  width: 50%;
  margin: 0 auto;
}
.detail-head {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: rgba(118, 71, 58, 83);
  color: white;
  padding: 10px;
}
.detail-head > h3 {
  margin-top: 0;
  margin-bottom: 10px;
}
.detail-body {
  border: 1px solid rgba(250, 251, 252, 236);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.detail-body > div {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10px;
  background-color: rgba(250, 251, 252, 236);
}
.detail-body p {
  display: inline-block;
  margin-top: 8px;
  margin-bottom: 8px;
}
.review-box {
  margin-top: 20px;
  border: 1px solid rgba(250, 251, 252, 236);
  border-radius: 10px;
}
.review-write {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(250, 251, 252, 236);
}
.review-write > div {
  border: 1px solid rgba(118, 71, 58, 83);
  color: rgba(118, 71, 58, 83);
  border-radius: 10px;
  padding: 5px 10px;
}
.review-write > p {
  margin-top: 4px;
  margin-bottom: 4px;
}
.review-list {
  border: 1px solid black;
}
</style>