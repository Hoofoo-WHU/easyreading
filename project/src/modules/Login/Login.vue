<template>
<router-content style="flex-direction:column">
  <navigation-bar title="">
    <navigation-bar-item @tap="back" slot="left" text="取消" icon=""/>
    <navigation-bar-item @tap="register" slot="right" text="注册" icon=""/>
  </navigation-bar>
  <div class="di">
    <div class="con">
      <div class="title"></div>
      <div class="login">
        <input class="input" placeholder="电子邮箱/手机号码" v-model="phonenum"/>
        <input class="input" placeholder="请输入密码" v-model="password"/>
        <touch @tap="login" class="denglu">登录</touch>
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
  name: 'login',
  components: {
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem
  },
  data () {
    return {
      state: 'login',
      phonenum: '',
      password: '',
      message: ''
    }
  },
  methods: {
    register () {
      this.$router.push({name: 'logup'})
    },
    login () {
      this.$http.post('/user/login', {'identifier': this.phonenum, 'password': this.password})
      .then(response => {
        this.$store.commit('token', {token: response.data.token, expires_at: response.data.expires_at})
        this.$router.back()
      })
      .catch(function (error) {
        alert('您输入的账号密码有误')
        console.log(error)
      })
    },
    back () {
      this.$router.back()
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
.login{
  width:100%;
  height:100%;
}
.login input{
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
.login .denglu{
  height:42px;
  margin:60px 0;
  background-color: #157afb;
  line-height: 38px;
  text-align: center;
  color:#fff;
  border-radius:12px;
}
</style>
