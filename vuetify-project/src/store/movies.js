import axios from 'axios'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import VueCookies from 'vue-cookies'

export const useMovieStore = defineStore('movie', () => {
  // 인스턴스 및 변수들
  const API_URL = 'http://127.0.0.1:8000'
  // const API_URL = 'https://6d5f-223-38-29-153.ngrok-free.app'
  const router = useRouter()
  const movies = ref([])
  const reviews = ref([])

  // 영화 목록 받아오기
  const getMovies = function() {
    axios({
        method: 'get',
        url: `${API_URL}/api/movies/`
    })
      .then((res) => {
        console.log('영화 목록 받아오기 성공!')
        console.log(res)
        movies.value = res.data
      })
      .catch((err) => {
        console.log('영화 목록 받아오기 실패ㅠㅠ')
        console.log(err)
      })
  }

  // 영화 리뷰 쓰기
  const writeReview = function(payload) {
    const { rating, content, movieId } = payload
    // a_token = VueCookies.get('access')
    console.log('리뷰 쓰면 여기로')
    console.log(rating)
    console.log(content)
    console.log(movieId)
    console.log(VueCookies.get('access'))

    axios({
      method: 'post',
      url: `${API_URL}/api/movies/${movieId}/reviewCreate/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      },
      data: {
        rating, content
      }
    })
      .then((res) => {
        console.log('리뷰 작성!')
        console.log(res)
      })
      .catch((err) => {
        console.log('리뷰 작성 실패')
        console.log(err)
      })
  }

  // 리뷰 목록 가져오기
  const reviewList = function(movieId) {
    axios({
      method: 'get',
      url: `${API_URL}/api/movies/${movieId}/review/`
    })
      .then((res) => {
        console.log('리뷰 목록 불러오기')
        console.log(res)
        reviews.value = res.data
      })
      .catch((err) => {
        console.log('리뷰 목록 불러오기 실패')
        console.log(err)
      })
  }

  // 리뷰 수정
  const reviewControl = function(payload) {
    console.log('여긴 스토어@@')
    const { movieId, reviewId, act, rating, content } = payload
    console.log(act)

    if (act === 'update') {
      axios({
        method: 'put',
        url: `${API_URL}/api/movies/${movieId}/${reviewId}/`,
        headers: {
          Authorization: `Bearer ${VueCookies.get('access')}`
        },
        data: {
          rating, content
        }
      })
        .then((res) => {
          console.log('리뷰 수정 성공!')
          console.log(res)
        })
        .catch((err) => {
          console.log('리뷰 수정 실패ㅠㅠ')
          console.log(err)
        })
    } else {
      axios({
        method: 'delete',
        url: `${API_URL}/api/movies/${movieId}/${reviewId}/`,
        headers: {
          Authorization: `Bearer ${VueCookies.get('access')}`
        }
      })
        .then((res) => {
          console.log('리뷰 삭제!')
          console.log(res)
        })
        .catch((err) => {
          console.log('리뷰 삭제 실패')
          console.log(err)
        })
    }
  }

  // 좋아요, 싫어요!
  const reviewLikes = function(payload) {
    console.log(1)
    console.log(payload)
    const { review_likes, reviewId } = payload
    console.log('리뷰 스토어')
    console.log(review_likes)
    console.log(reviewId)

    axios({
      method: 'post',
      url: `${API_URL}/api/movies/review/${reviewId}/likes/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      },
      data: {
        review_likes
      }
    })
      .then((res) => {
        console.log('좋아요, 싫어요!')
        console.log(res)
      })
      .catch((err) => {
        console.log('좋아요, 싫어요 에러!')
        console.log(err)
      })
  }

  return { API_URL, movies, getMovies, writeReview, reviewList, reviews,
    reviewLikes, reviewControl
  }
}, { persist: true })
