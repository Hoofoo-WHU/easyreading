import Main from './Main.vue'
import Shelf from './Shelf'
import Store from './Store'
import Search from './Search'
import My from './My'
import Test from './Test'

export default {
  module: Main,
  children: [
    Shelf,
    Store,
    Search,
    My,
    Test
  ]
}
