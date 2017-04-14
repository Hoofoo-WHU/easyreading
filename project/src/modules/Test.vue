<template>
  <scroller style="flex: 1;" ref="scroller" canPullRefresh @pullRefresh="pullRefresh">
    <div v-for="(item, index) in items" v-tap="{ methods: onItemClick, item: item, index: index }"
        class="row" :class="{'grey-bg': index % 2 == 0}">
      {{ item }}
    </div>
  </scroller>
</template>

<script>
  import Scroller from '@/components/Scroller'
  export default {
    name: 'test',
    components: {
      Scroller
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
        }, 3000)
        setTimeout(over, 3000)
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
    color: #444;
    background-color: #fff;
  }

  .grey-bg {
    background-color: #eee;
  }
</style>
