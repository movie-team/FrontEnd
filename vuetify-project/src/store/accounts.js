import axios from 'axios'
import VueCookies from 'vue-cookies'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAccountStore = defineStore('account', () => {
  // 인스턴스 및 변수들
  const API_URL = 'http://127.0.0.1:8000'
  // const API_URL = 'https://6d5f-223-38-29-153.ngrok-free.app'
  const a_token = ref(null)
  const r_token = ref(null)
  const ka_token = ref(null)
  const kr_token = ref(null)
  const router = useRouter()

  // 이메일 인증
  const emailCheck = function(payload) {
    console.log('이메일 스토어 접근!')
    const { email, username } = payload
    console.log(email)

    axios({
      method: 'post',
      url: `${API_URL}/api/emailVerify/`,
      data: {
        email, username
      }
    })
      .then((res) => {
        console.log('이메일 인증 정상 통신!')
        console.log(res)
      })
      .catch((err) => {
        console.log('이메일 통신 실패ㅠㅠ')
        console.log(err)
      })
  }

  // 이메일 인증 후 인증번호 확인
  // const secondaryConfirm = function(payload) {
  //   const { uidb64, username } = payload
  //   console.log('인증번호 확인 store로 이동!')
  //   console.log(uidb64)

  //   axios({
  //     method: 'post',
  //     url: `${API_URL}/api/confirm/`,
  //     data: {
  //       uidb64, username
  //     }
  //   })
  //     .then((res) => {
  //       console.log('인증번호 확인까지 성공!')
  //       console.log(res.data)
  //       console.log(res.data.message)
  //     })
  //     .catch((err) => {
  //       console.log('인증번호 확인은 실패ㅠㅠ')
  //       console.log(err)
  //     })
  // }

  // 회원가입
  const signUp = function(payload) {
    const { username, email, password, password2, birth, gender } = payload
    
    axios({
      method: 'post',
      url: `${API_URL}/api/signup/`,
      data: {
        username, email, password, password2, birth, gender
      }
    })
      .then((res) => {
        console.log('회원가입 완료!')
        console.log(res.data)

        // 회원가입 후 로그인까지 진행
        // const password = password1
        // logIn({ email, password })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 로그인
  const logIn = function(payload) {
    const { username, password } = payload

    axios({
      method: 'post',
      url: `${API_URL}/api/login/`,
      data: {
        username, password
      }
    })
      .then((res) => {
        a_token.value = res.data.token.access
        r_token.value = res.data.token.refresh
        console.log('로그인 완료')
        // console.log(res)
        // console.log(res.data)
        // console.log(token)
        // console.log(token.value)
        console.log(a_token.value)
        console.log(r_token.value)
       
        VueCookies.set('access', a_token.value, '30m') // '30m'는 만료 기간을 나타냅니다.
        VueCookies.set('refresh', r_token.value, '7d') // '7d'는 만료 기간을 나타냅니다.

        // 로그인 후 메인 페이지로 이동
        router.push({ name: 'home' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 카카오 회원가입 또는 로그인
  const kakaoLogin = function(urlSearch) {
    console.log('새로고침할 때마다 여기가 바뀌면 안돼')
    console.log(VueCookies.get('kaccess'))
    console.log(VueCookies.get('krefresh'))
    if (VueCookies.get('kaccess') === null && VueCookies.get('krefresh') === null) {
      ka_token.value = urlSearch.get('a')
      kr_token.value = urlSearch.get('r')
      VueCookies.set('kaccess', ka_token.value, '30M')
      VueCookies.set('krefresh', kr_token.value, '7d')
    }
  }

  // 사용자 로그인 여부 확인
  const isLogin = computed(() => {
    if (VueCookies.get('access') === null && VueCookies.get('kaccess') === null) {
      return false
    } else {
      return true
    }
  })

  // 로그아웃
  const logOut = function() {
    if (VueCookies.get('kaccess') === null) {
      axios({
        method: 'post',
        url: `${API_URL}/api/logout/`,
        headers: {
          Authorization: `Bearer ${VueCookies.get('access')}`
        }
      })
      .then((res) => {
        console.log('로그아웃 성공?')
        console.log(res)
      })
      .catch((err) => {
        console.log('일반 로그아웃으로 들어가?')
        console.log(err)
      })

    } else {
      console.log('토큰 어디갔어')
      console.log(VueCookies.get('kaccess'))
      axios({
        method: 'post',
        url: `${API_URL}/accounts/kakao/logout/`,
        // headers: {
        //   Authorization: `Bearer ${VueCookies.get('kaccess')}`
        // }
        data: {
          'access': VueCookies.get('kaccess')
        }
      })
        .then((res) => {
          console.log('카카오 로그아웃 성공?')
          console.log(res)
        })
        .catch((err) => {
          console.log('카카오 로그아웃 실패ㅠㅠ')
          console.log(err)
        })
    }

    // 쿠키 초기화
    VueCookies.remove('access')
    VueCookies.remove('refresh')
    VueCookies.remove('kaccess')
    VueCookies.remove('krefresh')
  }

  // refresh 토큰 재발급
  const refresh = function() {
    console.log(a_token.value)
    console.log(r_token.value)
    axios({
      method: 'post',
      url: `${API_URL}/api/auth/refresh/`,
      // headers: {
      //   Authorization: `Bearer ${a_token.value}`
      // },
      data: { 'refresh': r_token.value }
    })
      .then((res) => {
        console.log('access 토큰 재발급!')
        console.log(res.data)
        a_token.value = res.data.access
        r_token.value = res.data.refresh
        VueCookies.set('access', a_token.value, '30M')
        VueCookies.set('refresh', r_token.value, '7d')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // access 토큰 유효성 검증
  const verify = function() {
    axios({
      method: 'post',
      url: `${API_URL}/api/auth/verify/`,
      // headers: {
      //   Authorization: `Bearer ${a_token.value}`
      // },
      data: { 'token': a_token.value }
    })
      .then((res) => {
        console.log('토큰 유효성 검증!')
        console.log(res)
        // a_token.value = res.data.access
        // r_token.value = res.data.refresh
      })
      .catch((err) => {
        console.log('유효기간이 지나면 여기로!')
        console.log(err)
        refresh()
      })
  }

  // 카카오 토큰 재발급
  const kakaoRefresh = function() {
    // ka_token.value = VueCookies.get('access')
    kr_token.value = VueCookies.get('krefresh')
    console.log('쿠키에 저장된 토큰은?')
    console.log(VueCookies.get('kaccess'))
    console.log(VueCookies.get('krefresh'))
    axios({
      method: 'post',
      url: `${API_URL}/accounts/kakao/refresh/`,
      // headers: {
      //   Authorization: `Bearer ${kr_token.value}`
      // },
      data: {
        'refresh': kr_token.value
      }
    })
      .then((res) => {
        console.log('카카오 토큰 재발급')
        console.log(res.data)
        if (res.data.error === null) {
          console.log('지금 여기는 못 들어오잖아?')
          VueCookies.set('kaccess', res.data.access_token, '30M')
        }
      })
      .catch((err) => {
        console.log('카카오 토큰 재발급 실패ㅠㅠ')
        console.log(err)
      })
  }

  return {
    API_URL, signUp, logIn, a_token, r_token, isLogin, logOut, refresh,
    verify, emailCheck, kakaoLogin, kakaoRefresh
  }
}, { persist: true })
