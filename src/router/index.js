import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Restaurants from '../views/Restaurants.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: "active",
  routes: [{
      path: '/',
      name: 'root',
      redirect: '/restaurants'
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: () => import("../views/SignUp.vue")
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: Restaurants
    },
    {
      path: '/restaurants/feeds',
      name: 'restaurants-feeds',
      component: () => import("../views/RestaurantsFeeds.vue")
    },
    {
      path: '/restaurants/top',
      name: 'restaurants-top',
      component: () => import("../views/RestaurantsTop.vue")
    },
    {
      path: '/users/top',
      name: 'users-top',
      component: () => import("../views/UsersTop.vue")
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import("../views/User.vue")
    },
    {
      path: '/restaurants/:id/dashboard',
      name: 'restaurant-dashboard',
      component: () => import('../views/RestaurantDashboard.vue')
    },
    {
      path: '/restaurants/:id',
      name: 'restaurant',
      component: () => import('../views/Restaurant.vue')
    },
    {
      path: '/admin/restaurants',
      name: 'admin-restaurants',
      component: () => import('../views/AdminRestaurants.vue')
    },
    {
      path: '/admin/restaurants/new',
      name: 'admin-restaurant-new',
      component: () => import('../views/AdminRestaurantNew.vue')
    },
    {
      path: '/admin/restaurants/:id/edit',
      name: 'admin-restaurant-edit',
      component: () => import('../views/AdminRestaurantEdit.vue')
    },
    {
      path: '/admin/restaurants/:id',
      name: 'admin-restaurant',
      component: () => import("../views/AdminRestaurant.vue")
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import("../views/AdminCategories.vue")
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/restaurants'
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})