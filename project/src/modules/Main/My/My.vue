<template>
  <router-content style="flex-direction:column;bottom:-49px">
  <navigation-bar title="" :border="!top">
      <navigation-bar-item @tap="setting" slot="left"  icon="set" style="width:20px;height:20px;"/>
      <navigation-bar-item @tap="postnew" slot="right" icon="email" style="width:20px;height:20px;" right-icon/>
    </navigation-bar>
    <scroller class="scroller" v-model="top" ref="scroller">
      <touch @tap="person" style="width:100px;height:130px;display:block;margin:0 auto">
      <div class="person">
      	<span class="headImg"><img id="headImg" src=""></span>
        <span class="editifo">修改个人信息</span>
      </div>
      </touch>

	    <section>
	    <i><touch @tap="display" :show="show"><span class="shubi" style="background-color:rgb(249,204,157)" >阅书币</span></touch></i>
	    <i><touch @tap="display1" :show="show1"><span class="chongzhi" style="background-color:rgb(195,208,136)" >去充值</span></touch></i>
	    <i><touch @tap="cart"><span class="cart" style="background-color:rgb(253,221,155)" >购物车</span></touch></i>
	    <i><touch @tap="display2" :show="show2"><span class="fuli" style="background-color:rgb(140,182,192)" >福利券</span></touch></i>
	    </section>

	    <aside class="aside" v-for="item in items">
        <list-item @tap="bill" right :icon="item.icon" :text="item.title" style="height:53px;line-height:53px"></list-item>
	    </aside>

    </scroller>
    <action-sheet :show="show" @cancel="cancel" style="bottom:-49px">
      <span class="getshubi">350</span>
    </action-sheet>
    <action-sheet :show="show1" @cancel="cancel1" style="bottom:-49px">
      <span>
      <span class="getchongzhi">
        <i><touch @tap=""><span class="yuan"><p>1元</p><p>100书币</p></span></touch></i>
        <i><touch @tap=""><span class="yuan"><p>5元</p><p>500书币</p></span></touch></i>
        <i><touch @tap=""><span class="yuan"><p>10元</p><p>1000书币</p></span></touch></i>
      </span>
      <span class="getchongzhi">
        <i><touch @tap=""><span class="yuan"><p>20元</p><p>2000书币</p></span></touch></i>
        <i><touch @tap=""><span class="yuan"><p>50元</p><p>5000书币</p></span></touch></i>
        <i><touch @tap=""><span class="yuan"><p>100元</p><p>10000书币</p></span></touch></i>
      </span>
      </span>
    </action-sheet>
    <action-sheet :show="show2" @cancel="cancel2" style="bottom:-49px">
      <span>
      <list-item @tap="" right icon="sign" text="每日签到" style="height:50px;line-height:50px;margin: 10px 0;">
        <touch @tap=""><span class="lb">签到</span></touch>
      </list-item>
      <list-item @tap="" right icon="sign1" text="其他福利" style="height:50px;;line-height:50px;margin: 10px 0;">
        <touch @tap=""><span class="lb" style="color:#e59b1a">领取</span></touch>
      </list-item>
      </span>
    </action-sheet>
  </router-content>
</template>

<script>
import Scroller from '@/components/Scroller'
import RouterContent from '@/components/RouterContent'
import Icon from '@/components/Icon'
import {NavigationBar, NavigationBarItem} from '@/components/NavigationBar'
import ListItem from '@/components/ListItem'
import Switches from '@/components/Switches'
import { ActionSheet, ActionSheetItem, ActionSheetButton } from '@/components/ActionSheet'
export default {
  name: 'my',
  components: {
    Scroller,
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem,
    ListItem,
    Switches,
    ActionSheet,
    ActionSheetItem,
    ActionSheetButton
  },
  data () {
    return {
      msg: '这里是我的模块',
      switchesState: false,
      top: true,
      show: false,
      show1: false,
      show2: true,
      items: [
        {title: '账单', icon: 'form', tap: 'bill'},
        {title: '收藏', icon: 'favorite', tap: 'star'},
        {title: '推荐', icon: 'good', tap: 'star'},
        {title: '笔记', icon: 'edit', tap: 'star'},
        {title: '购买', icon: 'trade', tap: 'star'},
        {title: '下载', icon: 'download', tap: 'star'},
        {title: '已读', icon: 'office', tap: 'star'}
      ]
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
    person () {
      this.$router.push({name: 'person'})
    },
    bill () {
      this.$router.push({name: 'bill'})
    },
    star () {
      this.$router.push({name: 'star'})
    },
    cart () {
      this.$router.push({name: 'cart'})
    },
    cancel () {
      this.show = false
    },
    display () {
      this.show = true
    },
    cancel1 () {
      this.show1 = false
    },
    display1 () {
      this.show1 = true
    },
    cancel2 () {
      this.show2 = false
    },
    display2 () {
      this.show2 = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroller{
	flex-grow: 1;
  margin-bottom:49px;
}

.icon{
	width: 20px;
  height: 80%;
	color: grey;
}

.person{
	width:100%;
  height:130px;
  background-color:#fff;
}
.headImg{
	height:100px;
	width:100px;
	margin:0 auto;
	/*background-color:#e5f0ff;*/
	border-radius:50px;
	line-height:100px;
	text-align:center;
  background-image:url("http://dynamic-image.yesky.com/600x-/uploadImages/upload/20141120/ieoqokgazxxjpg.jpg");
  background-repeat:no-repeat;
  background-size: 100px 100px;
  display:block;
}
.editifo{
  width:100%;
  height:30px;
  line-height:30px;
  text-align:center;
  margin:5px auto;
  display:block;
}

section{
  padding:20px 0;
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

.getshubi{
  height:100px;
  width:100%;
  line-height:100px;
  font-size:40px;
  color:#e59b1a;
  text-align:center;
  margin: 0 auto;
  display: block;
}

.getchongzhi{
  padding:20px 0;
  width:100%;
  height:60px;
  display: -webkit-box;
}

.getchongzhi i{
  -webkit-box-flex: 1;
  text-align: center;
  display: block;
}

.getchongzhi i span{
  border-radius:4px;
  width:80px;
  margin: 0 auto;
  display: block;
  font-size:13px;
  font-style:normal;
  height:60px;
  line-height:60px;
  border:1px solid rgb(249,204,157);
  color:#f29639;
}
.getchongzhi i span p{
  width:80px;
  display: block;
  height:30px;
  line-height:30px;
  margin:0;
}

.lb{
  height: 28px;
  width: 50px;
  text-align: center;
  border-radius: 4px;
  line-height: 28px;
  display: inline-block;
  font-size: 15px;
  float: right;
  color: #8080ff;
  margin: 10px 10px 0 0;
  border: 1px solid;
}
</style>
