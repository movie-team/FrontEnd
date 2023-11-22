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
  const genreRecommendMovies = ref([])
  const userRecommendMovies = ref([])
  const groupRates = ref([])
  const manRateAvg = ref(null)
  const womanRateAvg = ref(null)
  const rateAvg10 = ref(null)
  const rateAvg20 = ref(null)
  const rateAvg30 = ref(null)
  const rateAvg40 = ref(null)
  const rateAvg50 = ref(null)
  // const worldcupList = ref([])
  // const result1 = ref([])
  // const result2 = ref([])

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

  // 장르별 추천 알고리즘
  const genreRecommend = function(movieId) {
    console.log('장르별 영화 추천!')
    console.log(movieId)

    axios({
      method: 'get',
      url: `${API_URL}/api/movies/${movieId}/genre_recommendation/`
    })
      .then((res) => {
        console.log('장르별 영화 추천 성공!')
        console.log(res)
        genreRecommendMovies.value = res.data
        console.log(genreRecommendMovies)
      })
      .catch((err) => {
        console.log('장르별 영화 추천 실패!')
        console.log(err)
      })
  }

  // 유저별 추천 알고리즘
  const userRecommend = function() {
    axios({
      method: 'get',
      url: `${API_URL}/api/movies/user_based_recommendation/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      },
    })
      .then((res) => {
        console.log('유저별 영화 추천 성공!')
        console.log(res)
        userRecommendMovies.value = res.data
        console.log(userRecommendMovies)
      })
      .catch((err) => {
        console.log('유저별 영화 추천 실패!')
        console.log(err)
      })
  }

  // 연령대, 성별에 따른 평점
  const groupRating = function(movieId) {
    axios({
      method: 'get',
      url: `${API_URL}/api/movies/${movieId}/group_rating/`,
    })
      .then((res) => {
        console.log('연령대, 성별에 따른 평점!')
        console.log(res)
        groupRates.value = res.data
        genderRating(res.data)
        ageRating(res.data)
      })
      .catch((err) => {
        console.log('연령대, 성별에 따른 평점 실패!')
        console.log(err)
      })
  }

  // 유저가 속한 연령대, 성별의 평점을 반환
  const userGroupRating = function(movieId) {
    axios({
      method: 'get',
      url: `${API_URL}/api/movies/${movieId}/user_group_rating/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      },
    })
      .then((res) => {
        console.log('유저가 속한 연령대, 성별에 따른 평점!')
        console.log(res)
        // groupRates.value = res.data
      })
      .catch((err) => {
        console.log('유저가 속한 연령대, 성별에 따른 평점 실패!')
        console.log(err)
      })
  }

  // 성별별 평점 조회
  const genderRating = function(genderRates) {
    console.log('성별별 평점 조회')
    let manRate = 0
    let womanRate = 0
    let manCnt = 0
    let womanCnt = 0
    genderRates.map((prop) => {
      // console.log(prop)
      if (prop.rating__count !== 0) {
        if (prop.gender) {
          manRate += prop.rating__avg
          manCnt++
        } else {
          womanRate += prop.rating__avg
          womanCnt++
        }
      }
    })
    if (manCnt > 0) {
      manRateAvg.value = manRate / manCnt
    } else {
      manRateAvg.value = 0
    }
    if (womanCnt > 0) {
      womanRateAvg.value = womanRate / womanCnt
    } else {
      womanRateAvg.value = 0
    }
  }

  // 연령대별 평점 조회
  const ageRating = function(ageRates) {
    let age10 = 0
    let age20 = 0
    let age30 = 0
    let age40 = 0
    let age50 = 0
    let cnt10 = 0
    let cnt20 = 0
    let cnt30 = 0
    let cnt40 = 0
    let cnt50 = 0
    ageRates.map((prop) => {
      if (prop.rating__count !== 0) {
        if (prop.age_group === 10) {
          age10 += prop.rating__avg
          cnt10++
        }
        else if(prop.age_group === 20) {
          age20 += prop.rating__avg
          cnt20++
        }
        else if(prop.age_group === 30) {
          age30 += prop.rating__avg
          cnt30++
        }
        else if(prop.age_group === 40) {
          age40 += prop.rating__avg
          cnt40++
        }
        else if(prop.age_group === 50) {
          age50 += prop.rating__avg
          cnt50++
        }
      }
    })
    if (cnt10 > 0) {
      rateAvg10.value = age10 / cnt10
    } else {
      rateAvg10.value = 0
    }
    if (cnt20 > 0) {
      rateAvg20.value = age20 / cnt20
    } else {
      rateAvg20.value = 0
    }
    if (cnt30 > 0) {
      rateAvg30.value = age30 / cnt30
    } else {
      rateAvg30.value = 0
    }
    if (cnt40 > 0) {
      rateAvg40.value = age40 / cnt40
    } else {
      rateAvg40.value = 0
    }
    if (cnt50 > 0) {
      rateAvg50.value = age50 / cnt50
    } else {
      rateAvg50.value = 0
    }
  }

  // 영화 월드컵
  // const movieWorldcup = function() {
  //   axios({
  //     method: 'get',
  //     url: `${API_URL}/api/movies/worldcup/`,
  //     headers: {
  //       Authorization: `Bearer ${VueCookies.get('access')}`
  //     },
  //   })
  //     .then((res) => {
  //       console.log('월드컵 데이터!')
  //       // console.log(res)
  //       result1.value.length = 0
  //       result2.value.length = 0
  //       worldcupList.value = res.data
  //       console.log(worldcupList.value)
  //       worldcupList.value.map((prop) => {
  //         result1.value.push(prop.id)
  //         result2.value.push(0)
  //       })
  //       console.log(result1.value)
  //       console.log(result2.value)
  //     })
  //     .catch((err) => {
  //       console.log('월드컵 데이터 실패!')
  //       console.log(err)
  //     })
  // }

  return { API_URL, movies, getMovies, writeReview, reviewList, reviews, userRecommend, groupRating, userGroupRating, rateAvg10, rateAvg20, rateAvg30, rateAvg40,
    reviewLikes, reviewControl, genreRecommend, genreRecommendMovies, userRecommendMovies, groupRates, manRateAvg, womanRateAvg, rateAvg50
  }
}, { persist: true })
