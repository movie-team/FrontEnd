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
          <h5>관람객 평점</h5>
          <p>{{ movie.vote_average.toFixed(1) }}</p>
          <v-rating
            half-increments
            hover
            readonly
            :length="5"
            :size="32"
            :model-value="movie.vote_average.toFixed(1)/2"
            color="primary"
            active-color="primary"
          />
          <p>{{ movie.vote_count }}명 참여</p>
          <div class="gender-rate">
            <div class="gender-rate-child">
              <p>남자</p>
              <p>{{ movieStore.manRateAvg }}</p>
            </div>
            <div class="gender-rate-child">
              <p>여자</p>
              <p>{{ movieStore.womanRateAvg }}</p>
            </div>
          </div>
        </div>
        <div>
          <h5>나이별 만족도</h5>
          <p>10대 {{ movieStore.rateAvg10 }}</p>
          <p>20대 {{ movieStore.rateAvg20 }}</p>
          <p>30대 {{ movieStore.rateAvg30 }}</p>
          <p>40대 {{ movieStore.rateAvg40 }}</p>
          <p>50대 {{ movieStore.rateAvg50 }}</p>
        </div>
      </div>
    </div>
    <div class="review-box">
      <div class="review-write">
        <div class="little-title">리뷰</div>
        <p>별점을 선택해주세요.</p>
        <v-rating
          half-increments
          hover
          :length="5"
          :size="32"
          :model-value="rating"
          color="primary"
          active-color="primary"
          v-model="rating"
        />
        <div class="input-btn">
          <v-text-field clearable variant="solo" v-model="review" placeholder="감상평을 등록해주세요."></v-text-field>
          <v-btn @click="reviewBtnClick(movie.id)">등록</v-btn>
        </div>
      </div>
      <div>
        <ReviewList />
      </div>
    </div>
    <h3>관심사가 비슷한 유저가 본 영화</h3>
    <div class="recommend-poster">
      <RecommendItem
        v-for="movie in movieStore.userRecommendMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <h3>비슷한 장르의 영화</h3>
    <div class="recommend-poster">
      <RecommendItem
        v-for="movie in movieStore.genreRecommendMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useAccountStore } from '@/store/accounts'
import { useMovieStore } from '@/store/movies'
import { useRoute } from 'vue-router'
import ReviewList from '@/components/ReviewList.vue'
import RecommendItem from '@/components/RecommendItem.vue'

const store = useAccountStore()
const movieStore = useMovieStore()
const route = useRoute()
const movie = ref(null)
const rating = ref(3)
const review = ref(null)

onMounted(() => {
  store.profile()
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
  movieStore.reviewList(route.params.id)
  movieStore.genreRecommend(route.params.id)
  movieStore.userRecommend()
  movieStore.groupRating(route.params.id)
  movieStore.userGroupRating(route.params.id)

  // 토큰 유효성
  store.verify()
  store.kakaoRefresh()
})

const reviewBtnClick = (movieId) => {
  console.log('클릭하면 여기로')
  console.log(rating)
  console.log(review)
  console.log(movieId)
  
  const payload = {
    rating: rating.value * 2,
    content: review.value,
    movieId: movieId
  }
  movieStore.writeReview(payload)
  rating.value = 3
  review.value = ''
  // movieStore.reviewList(movieId)
  document.location.href = `/detail/${movieId}`
}
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
  display: flex;
}
.detail-body > div {
  width: 50%;
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
.little-title {
  border: 1px solid rgba(118, 71, 58, 83);
  color: rgba(118, 71, 58, 83);
  border-radius: 10px;
  padding: 5px 10px;
}
.review-write > p {
  margin-top: 4px;
  margin-bottom: 4px;
}
.input-btn {
  width: 60%;
  display: flex;
}
.recommend-poster {
  display: flex;
  flex-wrap: wrap;
}
.gender-rate {
  width: 60%;
  padding-top: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.gender-rate-child {
  display: flex;
  flex-direction: column;
}
</style>