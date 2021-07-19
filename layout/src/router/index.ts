import { RouteConfig } from 'vue-router'
import LayoutHome from '../views/Home.vue'

const routes: Array<RouteConfig> = [
  {
    path: '/layout',
    name: 'LayoutHome',
    component: LayoutHome
  }
]

export default routes
