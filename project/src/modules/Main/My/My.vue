<template>
  <router-content style="flex-direction:column;bottom:-49px">
  <navigation-bar title="" :border="!top">
      <navigation-bar-item @tap="setting" slot="left"  icon="set" style="width:20px;height:20px;"/>
      <navigation-bar-item @tap="postnew" slot="right" icon="email" style="width:20px;height:20px;" right-icon/>
    </navigation-bar>
    <scroller class="scroller" v-model="top" ref="scroller">
      <touch @tap="person" style="width:100px;height:130px;display:block;margin:0 auto">
      <div class="person">
      	<span class="headImg"><img id="headImg" :src="img" style="height:100px;width:100px;border-radius:50px;"></span>
        <span class="editifo">修改个人信息</span>
      </div>
      </touch>

	    <section>
	    <i><touch @tap="display" :show="show"><span class="shubi" style="background-color:rgb(249,204,157)" >书币</span></touch></i>
	    <i><touch @tap="display1" :show="show1"><span class="chongzhi" style="background-color:rgb(195,208,136)" >充值</span></touch></i>
	    <i><touch @tap="notice(text)"><span class="cart" style="background-color:rgb(253,221,155)" >{{text}}</span></touch></i>
	    <i><touch @tap="cart"><span class="fuli" style="background-color:rgb(140,182,192)" >福利券</span></touch></i>
	    </section>

	    <aside class="aside">
        <list-item @tap="bill" right icon="form" text="账单" style="height:53px;line-height:53px"></list-item>
        <list-item @tap="bill" v-for="item in items" :key="" right :icon="item.icon" :text="item.title" style="height:53px;line-height:53px"></list-item>
	    </aside>

    </scroller>
    <action-sheet :show="show0" @cancel="cancel" style="bottom:-49px">
      <span class="getshubi">{{currency}}</span>
    </action-sheet>
    <action-sheet :show="show1" @cancel="cancel1" style="bottom:-49px">
      <span>
      <span class="getchongzhi">
        <i v-for="money in moneys" :key=""><touch @tap="pay(money.mon)"><span class="yuan"><p>{{money.mon}}元</p><p>{{money.bi}}书币</p></span></touch></i>
      </span>
      <span class="getchongzhi">
        <i v-for="money1 in moneys1" :key=""><touch @tap="pay(money1.mon)"><span class="yuan"><p>{{money1.mon}}元</p><p>{{money1.bi}}书币</p></span></touch></i>
      </span>
      </span>
    </action-sheet>
    <!--
    <action-sheet :show="show2" @cancel="cancel2" style="bottom:-49px">
      <span>
      <list-item @tap="notice" right icon="sign" text="每日签到" style="height:50px;line-height:50px;margin: 10px 0;">
      <span class="lb">签到</span>
      </list-item>
      <list-item @tap="" right icon="sign1" text="其他福利" style="height:50px;;line-height:50px;margin: 10px 0;">
      <span class="lb" style="color:#e59b1a">领取</span>
      </list-item>
      </span>
    </action-sheet>
    -->
    <message v-model="messageShow" :message-text="messageText"></message>
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
import Message from '@/components/Message'
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
    ActionSheetButton,
    Message
  },
  data () {
    return {
      msg: '这里是我的模块',
      switchesState: false,
      top: true,
      show0: false,
      show1: false,
      items: [
        {title: '收藏', icon: 'favorite', tap: 'star'},
        {title: '推荐', icon: 'good', tap: 'star'},
        {title: '笔记', icon: 'edit', tap: 'star'},
        {title: '购买', icon: 'trade', tap: 'star'},
        {title: '下载', icon: 'download', tap: 'star'},
        {title: '已读', icon: 'office', tap: 'star'}
      ],
      iconName: 'ok',
      messageText: '已签到',
      value: false,
      closeTime: 1000,
      messageShow: false,
      show: false,
      text: '签到',
      currency: '560',
      moneys: [
        {mon: '1', bi: '100'},
        {mon: '5', bi: '500'},
        {mon: '10', bi: '1000'}
      ],
      moneys1: [
        {mon: '20', bi: '2000'},
        {mon: '50', bi: '5000'},
        {mon: '100', bi: '10000'}
      ],
      img: 'http://dynamic-image.yesky.com/600x-/uploadImages/upload/20141120/ieoqokgazxxjpg.jpg'
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
      this.show0 = false
    },
    display () {
      this.$http.get('/deposit/balance')
      .then(response => {
        this.show0 = true
        console.log(response.data)
        this.currency = response.data.balance_book
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancel1 () {
      this.show1 = false
    },
    display1 () {
      this.show1 = true
    },
    showMessage () {
      this.messageShow = true
    },
    notice () {
      if (this.text === '签到') {
        this.messageShow = true
        this.messageText = '签到成功'
        this.text = '已签到'
      } else if (this.text === '已签到') {
        this.messageShow = false
      }
    },
    pay (val) {
      console.log(val)
      this.$http.post('/deposit/record', {'amount': val})
      .then(response => {
        this.messageShow = true
        this.messageText = '充值成功' + val + '元'
        setTimeout(() => {
          this.show1 = false
        }, 2000)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  activated () {
    console.log('1234')
    this.$http.get('/user/profile')
      .then(response => {
        console.log(response.data)
        if (response.data.avatar !== '') {
          this.img = 'http://oott.me' + response.data.avatar
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    this.$http.get('/check')
      .then(response => {
        console.log(response.data)
        if (response.data.is_check_today === true) {
          this.text = '签到'
        } else {
          this.text = '已签到'
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
  /*background-image:url("");*/
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

label{
  position:absolute;
  display:block;
  top:45%;
  bottom:55%;
  left:30%;
  right:30%;
  z-index:500;
  color:#ff6600;
  background-color:#fff;
  width:40%;
  height:30px;
  line-height:30px;
  text-align:center;
  border-radius:12px;
}
</style>
