import Main from './Main.vue'
import Shelf from './Shelf/index'
import Store from './Store/index'
import Search from './Search/index'
import My from './My/index'
import Test from './Test/index'

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
