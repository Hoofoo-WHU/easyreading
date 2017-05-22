<template>
<div class="page-bar">
    <ul>
        <li v-if="value>1"><a v-on:click="pageClick1(value)">上一页</a></li>
        <li v-if="value==1"><a class="banclick" style="cursor:not-allowed;color:grey;">上一页</a></li>
        <li v-for="index in indexs"  v-bind:class="{ 'active': value == index}">
            <a v-on:click="btnClick(index)">{{ index }}</a>
        </li>
        <li v-if="value!=all"><a v-on:click="pageClick2(value)">下一页</a></li>
        <li v-if="value == all"><a class="banclick" style="cursor:not-allowed;color:grey;">下一页</a></li>
        <!--<li><a>共<i>{{all}}</i>页</a></li>-->
    </ul>
</div>
</template>

<script>
export default {
  name: 'pagination',
  data () {
    return {

    }
  },
  props: {
    // 用于记录总页码，可由父组件传过来
    all: {
      type: Number,
      default: 1
    },
    // 用于记录当前页数，这个与父组件进行数据交互来完成每一页的数据更新，所以我们只要改变valuerent的值来控制整个页面的数据即可
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    btnClick (data) {
      // 页码点击事件
      if (data !== this.value) {
        this.$emit('input', data)
        console.log('现在在' + data + '页')
      }
    },
    pageClick1 (data) {
      data = data - 1
      this.$emit('input', data)
      console.log('现在在' + data + '页')
    },
    pageClick2 (data) {
      data = data + 1
      this.$emit('input', data)
      console.log('现在在' + data + '页')
    }
  },
  computed: {
    indexs () {
      var left = 1
      var right = this.all
      var ar = []
      if (this.all >= 5) {
        if (this.value > 3 && this.value < this.all - 2) {
          left = this.value - 2
          right = this.value + 2
        } else {
          if (this.value <= 3) {
            left = 1
            right = 5
          } else {
            right = this.all
            left = this.all - 4
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left = left + 1
      }
      return ar
    }
  }
}
</script>


<style scoped>
.page-bar{
    margin:10px 0;
}
ul,li{
    margin: 0px;
    padding: 0px;
}
li{
    list-style: none;
}
.page-bar li:first-child>a {
   margin-left: 0px
}
.page-bar a{
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer
}
.page-bar a:hover{
    background-color: #eee;
}
.page-bar a.banclick{
    cursor:not-allowed;
}
.page-bar .active a{
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
}
.page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
}
</style>
