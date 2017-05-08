<template>
  <router-content style="flex-direction: column;">
    <navigation-bar title="测试">
      <navigation-bar-item @tap="read" slot="left" text="读书" icon="back"/>
      <navigation-bar-item @tap="login" slot="right" text="登录" right-icon/>
    </navigation-bar>
    <scroller style="flex-grow:1;" ref="scroller" can-pull-refresh @pullRefresh="pullRefresh" @loadMore="loadMore" can-load-more>
      <touch v-for="(item, index) in items" :key="item.index"
          class="row" :class="{'grey-bg': index % 2 == 0}" @tap="onItemClick({index:index})">
        {{ item }}
      </touch>
    </scroller>
  </router-content>
</template>

<script>
  import Scroller from '@/components/Scroller'
  import RouterContent from '@/components/RouterContent'
  import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
  export default {
    name: 'test',
    components: {
      Scroller,
      RouterContent,
      NavigationBarItem,
      NavigationBar
    },
    data () {
      return {
        items: []
      }
    },
    mounted () {
      for (let i = 1; i <= 40; i++) {
        this.items.push(i + ' - keep walking, be 2 with you.')
      }
    },
    methods: {
      onItemClick (params) {
        console.log(params.index)
      },
      scrollTop () {
        this.$refs.scroller.scrollTop()
      },
      pullRefresh (over) {
        console.log('pullRefresh')
        setTimeout(() => {
          var i = parseInt(this.items[0]) - 1
          var end = i - 1
          for (; i > end; i--) {
            this.items.unshift(i + ' - keep walking, be 2 with you.')
          }
        }, 2000)
        setTimeout(over, 2000)
      },
      loadMore (over) {
        console.log('loadMore')
        setTimeout(() => {
          var noMore = false
          var i = parseInt(this.items[this.items.length - 1]) + 1
          var end = i + 20
          for (; i < end; i++) {
            this.items.push(i + ' - keep walking, be 2 with you.')
          }
          if (i > 100) {
            noMore = true
          }
          over(noMore)
        }, 2000)
      },
      read () {
        console.log('Tap read')
        this.$router.push({'name': 'read', query: {bookid: 'bookid123'}})
        // alert(this.$statusBar.isVisible)
        // if (this.$statusBar.isVisible) {
        //   // alert('111111')
        //   this.$statusBar.hide()
        // } else {
        //   // alert('2222222')
        //   this.$statusBar.show()
        // }
      },
      login () {
        this.to('login')
      },
      to: function (name) {
        // console.log(params.name)
        this.$router.push({'name': name})
        // console.log(this.activeMoudle)
      }
    }
  }
</script>
<style lang="css" scoped>
  .row {
    width: 100%;
    height: 30px;
    padding: 10px 0;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    background-color: #fff;
  }

  .grey-bg {
    background-color: #eee;
  }
</style>
