import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../pages/HomePage.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomeView
  },
  {
    path: '/overviewhistory',
    name: 'OverviewHistory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/BookingHistoryPage.vue')
  },
  {
    path: '/roommeeting',
    name: 'RoomMeeting',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/RoomMeetingPage.vue')
  },
  {
    path: '/analytics',
    name: 'AnalyticsPAge',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/HomePage.vue')
  },
  {
    path: '/manage',
    name: 'ManagePage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/ManagePage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
