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
      redirect: { name: 'Shelf' }
    },
    {
      path: '/shelf',
      name: 'Shelf',
      component: Shelf
    },
    {
      path: '/store',
      name: 'Store',
      component: Store
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
