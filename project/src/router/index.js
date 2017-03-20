import Vue from 'vue'
import Router from 'vue-router'
import Shelf from '@/components/Shelf'
import Store from '@/components/Store'
import Search from '@/components/Search'
import My from '@/components/My'

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
    }
  ]
})
