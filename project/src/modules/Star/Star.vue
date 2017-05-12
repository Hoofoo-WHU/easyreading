<template>
  <div id="booklist">
        <navigation-bar @tap="" title="收藏列表">
          	<navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
        </navigation-bar>
        <scroller style="flex-grow:1" ref="scroller" @loadMore="loadMore" can-load-more>
            <ul>
                <li v-for="book in rank(mockData)" :key="book.rank">
                    <div class="rank-icon" v-if="book.rank === 1">
                        <icon class="icon" name="first"></icon>
                    </div>
                    <div class="rank-icon" v-else>
                        {{ book.rank }}
                    </div>
                    <div class="book-img">
                        <img :src=" book.img " :alt=" book.name ">
                    </div>
                    <div class="book-info">
                        <p>{{ book.name }}</p>
                        <div class="operate">
                            <div class="addShelf">
                                <icon class="icon" :name="'addShelf'"></icon>
                            </div>
                            <div class="addCart">
                                <icon :name="'addCart'"></icon>
                            </div>
                        </div>
                    </div>
                    <div class="book-price">
                        ￥ {{ book.price }}
                    </div>
                </li>
            </ul>
        </scroller>
    </div>
</template>

<script>
import Scroller from '@/components/Scroller'
import RouterContent from '@/components/RouterContent'
import Icon from '@/components/Icon'
import {NavigationBar, NavigationBarItem} from '@/components/NavigationBar'
import Switches from '@/components/Switches'

export default {
  name: 'star',
  components: {
    Scroller,
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem,
    Switches
  },
  data () {
    return {

    }
  },
  methods: {
    scrollTop () {
      this.$refs.scroller.scrollTop()
    },
    back () {
      this.$router.push({name: 'my'})
    },
    out () {
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroller{
  flex-grow: 1;
}

<style scoped>
.scroller{
  flex-grow: 1;
}
.icon{
  float: right;
  margin-top: 10px;
  width: 20px;
  height: 20px;
  color: grey;
}
aside ul li {
  height:40px;
  background: #fff;
  padding: 0 4%;
  border-bottom:1px solid #efeff4;
  display:block;
}
aside ul li p{
  font-size: 12px;
  line-height: 40px;
  text-align: center;
  color: #000;
  display: inline-block;
}
.out{
  width:90%;
  height:42px;
  margin:30px 5%;
  background-color: #cc0000;
  line-height: 38px;
  text-align: center;
  color:#fff;
  border-radius:12px;
}
</style>
