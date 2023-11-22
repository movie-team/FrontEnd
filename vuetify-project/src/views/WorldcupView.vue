<template>
  <div>
    <h1>영화 월드컵</h1>
    <button @click="worldcupStart">월드컵 시작하기</button>
    <div class="worldcup" v-if="isStart">
      <div>
        <!-- {{ newWorldcup[leftImg].id }} -->
        <img @click="userChoice(left)" :src="`https://image.tmdb.org/t/p/w400/${left.poster}`" alt="영화 포스터">
        <h6>{{ left.overview }}</h6>
      </div>
      <div>
        <img @click="userChoice(right)" :src="`https://image.tmdb.org/t/p/w400/${right.poster}`" alt="영화 포스터">
        <h6>{{ right.overview }}</h6>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMovieStore } from '@/store/movies'
import axios from 'axios'
import VueCookies from 'vue-cookies'

const movieStore = useMovieStore()
const left = computed(() => {
  if (count.value >= 14) {
    return newWorldcup.value[3][2*(count.value-14)]
  }
  else if (count.value >= 12) {
    return newWorldcup.value[2][2*(count.value-12)]
  }
  else if (count.value >=8) {
    return newWorldcup.value[1][2*(count.value-8)]
  }
  else {
    return newWorldcup.value[0][2*count.value]
  }
})
const right = computed(() => {
  if (count.value >= 14) {
    return newWorldcup.value[3][2*(count.value-14)+1]
  }
  else if (count.value >= 12) {
    return newWorldcup.value[2][2*(count.value-12)+1]
  }
  else if (count.value >=8) {
    return newWorldcup.value[1][2*(count.value-8)+1]
  }
  else {
    return newWorldcup.value[0][2*count.value+1]
  }
})
// const newWorldcup = ref([])
const count = ref(0)
const isStart = ref(false)
const worldcupList = ref([])
const newWorldcup = ref([])
const result = ref({})
for(let i = 0; i < 4; i++){
	const cells = []
  newWorldcup.value.push(cells);
}
// const result1 = ref([])
// const result2 = ref([])

// onMounted(() => {
//   movieStore.movieWorldcup()
//   console.log('월드컵 16개')
//   console.log(movieStore.worldcupList)
//   // movieStore.worldcupList.map((prop) => {
//   //   result1.value.push(prop.id)
//   //   result2.value.push(0)
//   // })
//   // console.log(result1)
// })

const worldcupStart = () => {
  axios({
    method: 'get',
    url: `${movieStore.API_URL}/api/movies/worldcup/`,
    headers: {
      Authorization: `Bearer ${VueCookies.get('access')}`
    },
  })
    .then((res) => {
      console.log('월드컵 데이터!')
      worldcupList.value = res.data
      console.log(worldcupList.value)

      worldcupList.value.map((prop) => {
        newWorldcup.value[0].push(prop)
        result.value[prop.id] = 0
      })
      console.log('새 월드컵')
      console.log(newWorldcup.value)
      console.log(result.value)
    })
    .catch((err) => {
      console.log('월드컵 데이터 실패!')
      console.log(err)
    })
    
  // movieStore.movieWorldcup()
  isStart.value = true
  
  // .then(() => {
    // movieStore.worldcupList.map((prop) => {
    //   newWorldcup.value.push(prop)
    // })
  //   console.log('result와 새 월드컵 확인')
  //   console.log(movieStore.result1)
  //   console.log(newWorldcup.value)
  // })
  // .catch((error) => {
  //   console.log('에러 났어요!')
  //   console.log(error)
  // })
}

const userChoice = (movie) => {
  // console.log(movieId)
  result.value[movie.id]++
  if (count.value >= 14) {
    console.log('하이')
    console.log(result.value)
    axios({
      method: 'post',
      url: `${movieStore.API_URL}/api/movies/worldcup/`,
      headers: {
        Authorization: `Bearer ${VueCookies.get('access')}`
      },
      data: {
        "val": result
      }
    })
      .then((res) => {
        console.log('월드컵 결과 보내기!')
        console.log(res)
      })
      .catch((err) => {
        console.log('월드컵 결과 실패!')
        console.log(err)
      })
  }
  else if(count.value >= 12){
    newWorldcup.value[3].push(movie)
  }
  else if(count.value >= 8){
    newWorldcup.value[2].push(movie)
    console.log('8강 중')
    console.log(newWorldcup.value[2])
  }
  else {
    newWorldcup.value[1].push(movie)
    
    console.log('16강 중')
    console.log(newWorldcup.value[1])
    console.log(result.value)
  }
  // movieStore.result2[movieStore.result1.indexOf(movie)] += 1
  // console.log(movieStore.result1)
  // console.log(movieStore.result2)
  // leftImg.value += 2
  // rightImg.value += 2
  count.value++
  // if (leftImg.value === 14) {
  //   newWorldcup.value.length = 0
  //   movieStore.result2.forEach((prop, index) => {
  //     if (prop === 1) {
  //       console.log(index)
  //     }
  //   })
  // }
}
</script>

<style scoped>
.worldcup {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.worldcup > div {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>