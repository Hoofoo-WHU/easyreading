<template>
  <div>
  <!--   <iframe src="http://www.baidu.com">
      <p>Your browser does not support iframes.</p>
    </iframe> -->
    <touch class="tab" @tap="state='login'">登录</touch>
    <touch class="tab" @tap="state='logup'">注册</touch>
    <div v-if="state === 'login'">
      <input class="input" placeholder="账号"/>
      <input class="input" placeholder="密码"/>
      <touch @tap="login">登录</touch>
    </div>
    <div v-else-if="state === 'logup'">
      <input class="input" placeholder="手机号" v-model="phonenum"/>
      <input class="input" placeholder="密码" v-model="password"/>
      <touch @tap="logup">注册</touch>
      <!-- <span>{{message}}</span> -->
      <input class="input" placeholder="验证码" v-model.number="code">
      <touch @tap="indentify">验证</touch>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
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
    login () {
      console.log('Tap login')
    },
    logup () {
      console.log('Tap logup')
      if (this.$http) {
        console.log('httpover')
      }
      this.$http.post('http://oott.me/user/identifier/check', {'identifier': this.phonenum, 'function': 0})
      .then(response => {
        alert('ok')
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

<style lang="css" scoped>
.tab{
  display: inline-block;
}
.input{
  display: block;
}
</style>
