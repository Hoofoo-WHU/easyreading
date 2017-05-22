<template>
  <router-content style="flex-direction:column;background:#fff">
    <navigation-bar title="福利券">
      <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller">
      <list-item right icon="sign" text="新手礼包" style="height:50px;line-height:50px;margin: 10px 0;">
      <span class="lb">领取</span>
      </list-item>
      <list-item right icon="sign1" text="其他福利" style="height:50px;;line-height:50px;margin: 10px 0;">
      <span class="lb" style="color:#e59b1a">领取</span>
      </list-item>
    </scroller>
  </router-content>
</template>

<script>
import Scroller from '@/components/Scroller'
import RouterContent from '@/components/RouterContent'
import Icon from '@/components/Icon'
import {NavigationBar, NavigationBarItem} from '@/components/NavigationBar'
import Switches from '@/components/Switches'
import ListItem from '@/components/ListItem'

export default {
  name: 'ticket',
  components: {
    Scroller,
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem,
    Switches,
    ListItem
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
      this.$router.go(-1)
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
