import axios from 'axios'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useMovieStore = defineStore('movie', () => {
  // 인스턴스 및 변수들
  const API_URL = 'http://127.0.0.1:8000'
  const router = useRouter()
  const movies = ref([])

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

  return { API_URL, movies, getMovies }
}, { persist: true })
