import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Restaurants from '../views/Restaurants.vue'
import store from "../../store"

const authenticateIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && !currentUser.isAdmin) {
    next('/404')
  }
  next()
}

Vue.use(Router)

const router = new Router({
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
      path: '/users/:id/edit',
      name: 'user-edit',
      component: () => import("../views/UserEdit.vue")
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
      component: () => import('../views/AdminRestaurants.vue'),
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '/admin/restaurants/new',
      name: 'admin-restaurant-new',
      component: () => import('../views/AdminRestaurantNew.vue'),
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '/admin/restaurants/:id/edit',
      name: 'admin-restaurant-edit',
      component: () => import('../views/AdminRestaurantEdit.vue'),
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '/admin/restaurants/:id',
      name: 'admin-restaurant',
      component: () => import("../views/AdminRestaurant.vue"),
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import("../views/AdminCategories.vue"),
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import("../views/AdminUsers.vue"),
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/restaurants',
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated
  if (tokenInLocalStorage & tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('getCurrentUser')
  }
  const pathsWithoutAuthentication = ['sign-up', 'sign-in']

  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }

  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/restaurants')
    return
  }
  next()
})

export default router