<template>
<router-content style="flex-direction:column">
  <navigation-bar title="">
    <navigation-bar-item @tap="back" slot="left" text="取消" icon=""/>
    <navigation-bar-item @tap="" slot="right" text="" icon=""/>
  </navigation-bar>
  <div class="di">
    <div class="con">
      <div class="title"></div>
      <div class="logup">
        <input class="input" placeholder="电子邮箱/手机号码" v-model="phonenum"/>
        <input class="input" placeholder="请输入密码" v-model="password"/>
        <touch class="getma" @tap="logup">获取验证码</touch>
        <input class="yanzheng" placeholder="请输入验证码" v-model.number="code">
        <touch @tap="indentify" class="zhuce">注册</touch>
      </div>
    </div>
  </div>
</router-content>
</template>

<script>
import Icon from '@/components/Icon'
import {NavigationBar, NavigationBarItem} from '@/components/NavigationBar'
import RouterContent from '@/components/RouterContent'

export default {
  name: 'logup',
  components: {
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem
  },
  data () {
    return {
      state: 'login',
      message: '',
      phonenum: '',
      password: '',
      code: ''
    }
  },
  methods: {
    relogin () {
      this.$router.push({name: 'login'})
    },
    back () {
      this.$router.push({name: 'person'})
    },
    logup () {
      console.log('Tap logup')
      if (this.$http) {
        console.log('httpover')
      }
      this.$http.post('/user/identifier/check', {'identifier': this.phonenum, 'function': 0})
      .then(response => {
        alert(response.data.available)
        this.$store.state.token = response.data.identifier_token
        this.message = this.$store.state.token
      })
      .catch(function (error) {
        alert('err')
        console.log(error)
      })
    },
    indentify () {
      this.$http.post(
        '/user/register',
        {
          'identifier_token': this.$store.state.token,
          'code': this.code,
          'password': this.password
        }
      ).then(response => {
        console.log(response)
        this.$store.state.token = response.data.token
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.icon{
  width:40px;
  height:40px;
}
.di{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color: #fff;
}
.con{
  width:80%;
  margin:25% 10%;
  background-color: #fff;
}
.title{
  width:100px;
  height:90px;
  background-image:url(logo.svg);
  background-repeat:no-repeat;
  background-position: 50% 50%;
  background-size: 90px 65px;
  margin:0 auto;
}
.logup{
  width:100%;
  height:100%;
}
.logup .input{
  width:100%;
  height:42px;
  margin:30px 0 0 0;
  border:none;
  color:#4f5362;
  border-bottom: 1px solid grey;
  outline:none;
  font-size: 16px;
  padding: 0 12px;
  box-sizing: border-box;
  transition: border .4s ease;
  &:focus{
    border-bottom-color:#000;
  }
}

.getma{
  width:45%;
  height:42px;
  margin:30px 0 0 0;
  float:left;
  line-height: 42px;
  text-align:center;
  background-color:#cc0000;
  color:#fff;
  border-radius:4px;
}
.yanzheng{
  width:50%;
  float:right;
  height:42px;
  margin:30px 0 0 0;
  border:none;
  color:#4f5362;
  border-bottom: 1px solid grey;
  outline:none;
  font-size: 16px;
  padding: 0 12px;
  box-sizing: border-box;
  transition: border .4s ease;
  &:focus{
    border-bottom-color:#000;
  }
}
.logup .zhuce{
  height:42px;
  margin:120px 0;
  background-color: #00cc00;
  line-height: 38px;
  text-align: center;
  color:#fff;
  border-radius:12px;
}
</style>
