<template>
  <div id="app">
    <div>{{ router }}</div>
    <router-view></router-view>
    <router-link :to="{ name: 'Shelf' }" :class="{ active: router === 'Shelf' }">书架</router-link>
    <router-link :to="{ name: 'Store' }" :class="{ active: router === 'Store' }">书城</router-link>
    <router-link :to="{ name: 'Search' }" :class="{ active: router === 'Search' }">搜索</router-link>
    <router-link :to="{ name: 'My' }" :class="{ active: router === 'My' }">我的</router-link>
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
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.active {
  background-color: red
}

</style>
