import Vue from 'vue'
import Router from 'vue-router'
import Shelf from '@/modules/Shelf'
import Store from '@/modules/Store'
import Search from '@/modules/Search'
import My from '@/modules/My'
import Test from '@/modules/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'shelf' }
    },
    {
      path: '/shelf',
      name: 'shelf',
      component: Shelf
    },
    {
      path: '/store',
      name: 'store',
      component: Store
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
