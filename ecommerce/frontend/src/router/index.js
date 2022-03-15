import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/details/:id',
    name:'details',
    component: Details

  },
  {
    path:'/cart/',
    name: 'cart',
    component: Cart
  },
  {
    path:'/checkout',
    name: 'checkout',
    component: Checkout
  },
]

const router = new VueRouter({
  routes
})

export default router
