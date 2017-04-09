<template>
  <div id="app">
    <div class="navigation-bar">{{ router }}</div>
    <div class="view">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="bottom-bar">
      <span class="router" v-tap="{methods: to, name: 'Shelf'}" :class="{ active: router === 'Shelf' }">书架</span>
      <span class="router" v-tap="{methods: to, name: 'Store'}" :class="{ active: router === 'Store' }">书城</span>
      <span class="router" v-tap="{methods: to, name: 'Search'}" :class="{ active: router === 'Search' }">搜索</span>
      <span class="router" v-tap="{methods: to, name: 'My'}" :class="{ active: router === 'My' }">我的</span>
      <!-- <router-link class="router" :to="{ name: 'Shelf' }" :class="{ active: router === 'Shelf' }">书架</router-link>
      <router-link class="router" :to="{ name: 'Store' }" :class="{ active: router === 'Store' }">书城</router-link>
      <router-link class="router" :to="{ name: 'Search' }" :class="{ active: router === 'Search' }">搜索</router-link>
      <router-link class="router" :to="{ name: 'My' }" :class="{ active: router === 'My' }">我的</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  computed: {
    router: function () {
      return this.$route.name
    }
  },
  methods: {
    to: function (params) {
      // console.log(params.name)
      this.$router.push({'name': params.name})
    }
  },
  mounted () {
    console.log(this.$router)
  }
}
</script>

<style lang="css" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.active {
  color: #2786f3;
}
.view{
  width: 100%;
  flex: 1;
  background: #f2f2f2;
  text-align: center;
  overflow: hidden;
  display: flex;
}
.navigation-bar{
  height: 45px;
  display: inline;
  text-align: center;
  line-height: 45px;
  background-color: #fff;
}
.bottom-bar{
  height: 49px;
  display: flex;
  background-color: #fff;
}
.router{
  flex: 1;
  -webkit-appearance: none;
  text-align: center;
  line-height: 49px;
}
</style>
