import Vue from 'vue'
import VueRouter from 'vue-router'
import VehiclesView from '../views/Vehicles.vue'
import RolesView from '../views/Roles.vue'
import UsersView from '../views/Users.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'roles',
    component: RolesView
  },{
      path: '/vehicles',
      name:'vehicles',
      component: VehiclesView
  },{
      path: '/users',
      name:'users',
      component: UsersView
  }]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
