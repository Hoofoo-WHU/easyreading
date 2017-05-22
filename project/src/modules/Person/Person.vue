<template>
  <router-content style="flex-direction:column;background:#fff">
    <navigation-bar title="个人资料">
      <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller">
      <aside class="aside">
        <list-item @tap="" right text="修改头像" style="height:50px;line-height:50px"></list-item>
        <list-item @tap="" right icon="" :text="way" style="height:50px;line-height:50px"><p style="float:right;margin-right:6px;color:grey;">{{phone}}</p></list-item>
        <list-item @tap="" right icon="" text="修改密码" style="height:50px;line-height:50px"></list-item>
        <touch @tap="out" class="out">退出当前账号</touch>
      </aside>
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
  name: 'person',
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
      phone: '12345678900',
      way: '手机号码'
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
      this.$store.commit('logout')
      this.$router.push({name: 'my'})
    }
  },
  mounted () {
    this.$http.get('/user/profile')
    .then(response => {
      if (response.data.phone === '') {
        this.way = '电子邮箱'
        this.phone = response.data.email
      } else {
        this.way = '手机号码'
        this.phone = response.data.phone
      }
    })
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
