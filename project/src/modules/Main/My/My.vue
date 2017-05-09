<template>
  <router-content style="flex-direction:column">
  <navigation-bar title="个人中心" id="line">
      <navigation-bar-item @tap="setting" slot="left"  icon="set" style="width:20px;height:20px;"/>
      <navigation-bar-item @tap="postnew" slot="right" icon="email" style="width:20px;height:20px;" right-icon/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller">
      <div class="person">
      	<touch class="headImg" @tap="star"><img id="headImg">头像</touch>
      </div>

	    <section>
	    <i><span class="shubi" style="background-color:rgb(249,204,157)" >阅书币</span></i>
	    <i><span class="chongzhi" style="background-color:rgb(195,208,136)" >去充值</span></i>
	    <i><span class="cart" style="background-color:rgb(253,221,155)" >购物车</span></i>
	    <i><span class="fuli" style="background-color:rgb(140,182,192)" >福利券</span></i>
	    </section>


	    <aside class="aside">
	      <ul>
	      	<li><icon name="form" class="icon2"></icon><p>账单</p><icon style="float: right; margin:10px" name="more" class="icon"></icon></li>
          <li><icon name="favorite" class="icon2"></icon><p>收藏</p><icon style="float: right; margin:10px" name="more" class="icon"></icon></li>
          <li><icon name="good" class="icon2"></icon><p>推荐</p><icon style="float: right; margin:10px" name="more" class="icon"></icon></li>
          <li><icon name="edit" class="icon2"></icon><p>笔记</p><icon style="float: right; margin:10px" name="more" class="icon"></icon></li>
          <li><icon name="trade" class="icon2"></icon><p>购买</p><icon style="float: right; margin:10px" name="more" class="icon"></icon></li>
          <li><icon name="download" class="icon2"></icon><p>下载</p><icon style="float: right; margin:10px" name="more" class="icon"></icon></li>
          <li><icon name="office" class="icon2"></icon><p>已读</p><icon style="float: right; margin:10px" name="more" class="icon"></icon></li>
        </ul>
	    </aside>

    </scroller>
  </router-content>
</template>

<script>
import Scroller from '@/components/Scroller'
import RouterContent from '@/components/RouterContent'
import Icon from '@/components/Icon'
import {NavigationBar, NavigationBarItem} from '@/components/NavigationBar'
export default {
  name: 'my',
  components: {
    Scroller,
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem
  },
  data () {
    return {
      msg: '这里是我的模块'
    }
  },
  methods: {
    scrollTop () {
      this.$refs.scroller.scrollTop()
    },
    setting () {
      this.$router.push({name: 'setting'})
    },
    postnew () {
      this.$router.push({name: 'new'})
    },
    star () {
      this.$router.push({name: 'star'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroller{
	flex-grow: 1;
}

.icon{
	width: 20px;
  height: 20px;
	color: grey;
}
.icon2{
	width: 16px;
  height: 16px;
	color: grey;
	margin:12px;
	float:left;
}


.person{
	width:100%;
  height:80px;
  background-color:#fff;
  padding:20px 0 20px 0;
}
.headImg{
	height:80px;
	width:80px;
	margin:0 auto;
	background-color:#e5f0ff;
	border-radius:40px;
	line-height:80px;
	text-align:center;
}


section{
  margin-top:10px;
	width:100%;
  	height:80px;
  	background-color:#fff;
  	display: -webkit-box;
}
section i{
	-webkit-box-flex: 1;
    text-align: center;
    display: block;
}
section i span{
	border-radius:30px;
    width:60px;
    margin: 10px auto;
    display: block;
    font-size:14px;
    font-style:normal;
    height:60px;
    line-height:60px;
}


aside {
    margin-top:10px;
}
aside ul li {
    height:40px;
    background: #fff;
    padding: 0 2%;
    border-bottom:1px solid #efeff4;
    display:block;
}
aside ul li p{
	font-size: 12px;
    color: #000;
    display: inline-block;
    float:left;
    margin:12px 0;
}
</style>
