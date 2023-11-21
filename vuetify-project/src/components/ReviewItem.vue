<template>
  <div class="personal-review">
    <div v-if="review.user_username !== store.username">
      <div class="review-head">
        <v-rating
          half-increments
          hover
          readonly
          :length="5"
          :size="32"
          :model-value="review.rating/2"
          color="primary"
          active-color="primary"
        />&nbsp;&nbsp;
        <span><strong>{{ review.rating }}</strong></span>
      </div>
      <div>
        <p>{{ review.content }}</p>
      </div>
      <div class="review-name-btn">
        <div>
          <span>{{ review.user_username }}</span>
        </div>
      </div>
    </div>
    <div v-if="review.user_username === store.username">
      <div class="review-head">
        <v-rating
          half-increments
          hover
          :length="5"
          :size="32"
          :model-value="review.rating/2"
          color="primary"
          active-color="primary"
          @update:model-value="value => updateRating(value, review)"
        />&nbsp;&nbsp;
        <span><strong>{{ review.rating }}</strong></span>
      </div>
      <div>
        <input type="text" v-model="review.content">
      </div>
      <div class="review-name-btn">
        <div>
          <span>{{ review.user_username }}</span>
        </div>
        <div>
          <button @click="reviewUpdate(review.movie, review.id, review.rating, review.content)">수정</button>&nbsp;&nbsp;&nbsp;&nbsp;
          <button @click="reviewDelete(review.movie, review.id)">삭제</button>
        </div>
      </div>
    </div>
    <!-- <span>{{ review.user.updated_at }}</span>&nbsp; -->
    <!-- <span>{{ review.user.updated_at.substr(11, 19) }}</span><br> -->
    
    <div class="like-hate">
      <img class="like likes" @click="likeClick(review.id)" width="30" height="30" src="https://img.icons8.com/external-thin-kawalan-studio/48/external-thumb-up-shipping-delivery-thin-kawalan-studio.png" alt="external-thumb-up-shipping-delivery-thin-kawalan-studio"/>&nbsp;
      <span v-if="review.likes_count != 0">{{ review.likes_count }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <img class="likes hate" @click="hateClick(review.id)" width="24" height="24" src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/24/external-thumbs-down-interface-royyan-wijaya-detailed-outline-royyan-wijaya.png" alt="external-thumbs-down-interface-royyan-wijaya-detailed-outline-royyan-wijaya"/>&nbsp;
      <span v-if="review.dislikes_count != 0">{{ review.dislikes_count }}</span>
      <img src="" alt="">
    </div>
  </div>
  <hr>
</template>

<script setup>
import { useMovieStore } from '@/store/movies'
import { useAccountStore } from '@/store/accounts'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

defineProps({
  review: Object
})

const movieStore = useMovieStore()
const store = useAccountStore()
const route = useRoute()

onMounted(() => {
  store.profile()
})

// 별점 업데이트 메서드
const updateRating = (value, review) => {
  console.log(value)
  review.rating = value * 2
}

const likeClick = (reviewId) => {
  // console.log('좋아요 클릭!')
  // console.log(reviewId)
  // likes.value = true
  const payload = {
    review_likes: true,
    reviewId: reviewId
  }
  movieStore.reviewLikes(payload)
  document.location.href = `/detail/${route.params.id}`
}

const hateClick = (reviewId) => {
  // console.log('싫어요 클릭!')
  console.log(reviewId)
  const payload = {
    review_likes: false,
    reviewId: reviewId
  }
  // console.log(payload)
  movieStore.reviewLikes(payload)
  document.location.href = `/detail/${route.params.id}`
}

const reviewUpdate = (movieId, reviewId, rating, content) => {
  console.log('리뷰 수정!')
  console.log(movieId)
  console.log(reviewId)
  console.log(rating)
  console.log(content)

  const payload = {
    movieId: movieId,
    reviewId: reviewId,
    rating: rating,
    content: content,
    act: 'update'
  }
  console.log(payload)
  movieStore.reviewControl(payload)
  document.location.href = `/detail/${movieId}`
}

const reviewDelete = (movieId, reviewId) => {
  console.log('리뷰 삭제!')
  console.log(movieId)
  console.log(reviewId)

  const payload = {
    movieId: movieId,
    reviewId: reviewId,
    act: 'del'
  }
  movieStore.reviewControl(payload)
  document.location.href = `/detail/${movieId}`
}
</script>

<style scoped>
.review-head {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.likes:hover {
  cursor: pointer;
}
.like-hate {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.like {
  margin-bottom: 1px;
}
.personal-review {
  padding: 3px;
}
.review-name-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>