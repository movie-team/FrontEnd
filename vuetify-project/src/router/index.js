// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAccountStore } from '@/store/accounts'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LogInView from '@/views/LogInView.vue'
import DetailView from '@/views/DetailView.vue'
import ProfileView from '@/views/ProfileView.vue'
import PasswordChange from '@/views/PasswordChange.vue'
import WorldcupView from '@/views/WorldcupView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },
  {
    path: '/detail/:id',
    name: 'DetailView',
    component: DetailView
  },
  {
    path: '/profile/:id',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/profile/:id/password',
    name: 'PasswordChange',
    component: PasswordChange
  },
  {
    path: '/worldcup',
    name: 'WorldcupView',
    component: WorldcupView
  },
  // {
  //   path: '/',
  //   component: () => import('@/layouts/default/Default.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Home',
  //       // route level code-splitting
  //       // this generates a separate chunk (Home-[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import('@/views/Home.vue'),
  //     },
  //   ],
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// 비로그인 사용자의 메인 페이지 접근 제한
// router.beforeEach((to, from) => {
//   const store = useAccountStore()
//   if (to.name === 'home' && !store.isLogin) {
//     window.alert('로그인 해주세요.')
//     return { name: 'LogInView' }
//   }
//   if ((to.name === 'SignUpView' || to.name === 'LogInView') && (store.isLogin)) {
//     window.alert('이미 로그인했습니다.')
//     return { name: 'home' }
//   }
// })

export default router
