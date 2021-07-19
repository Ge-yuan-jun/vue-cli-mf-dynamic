import { RouteConfig } from 'vue-router'
import ContentHome from '../views/Home.vue'

const routes: Array<RouteConfig> = [
  {
    path: '/content',
    name: 'ContentHome',
    component: ContentHome
  }
]

export default routes
