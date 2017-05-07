<template>
  <div id="info">
    <touch @tap="catalog">
      <div class="catalog">  
        <div>
          <p class="left"><b>目录 最近更新</b></p>
          <p class="right">{{update.time}}</p>
        </div>
        <div>
          <p class="left">{{update.chapter}}</p>
          <p class="right">>>></p>
        </div>       
      </div>
    </touch>
    <div class="hr"></div>
    <div class="info">
      <touch  @tap="changeOverflow">            
        <p class="left"><b>作品简介</b></p>
        <p class="right">{{overflow}}</p>
      </touch>
      <div class="data">
        <p :class='{overflow:isOverflow, visible:!isOverflow}' id="data">{{data}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Info',
    data () {
      return {
        isOverflow: true,
        overflow: '显示'
      }
    },
    props: {
      data: {
        type: String,
        default: ''
      },
      update: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    methods: {
      changeOverflow () {
        this.isOverflow = !this.isOverflow
        if (this.isOverflow) {
          this.overflow = '显示'
        } else {
          this.overflow = '隐藏'
        }
      },
      catalog () {
        console.log('111')
      }
    }
  }
</script>

<style lang="css" scoped>
  #info{
    padding-bottom: 0.5em;
  }
 .catalog div, .info div{
   display: flex;
   flex-direction: row;
   padding: 0 5%;
 }
 .catalog p, .info div:first-child p{
   width: 50%;
   margin-top: 0;
   margin-bottom: 5px;
 }
 .left{
   text-align: left;
 }
 .right{
   text-align: right;
 }
 .overflow{
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 3;
   -webkit-box-orient: vertical;
 }
 .visible{
   overflow: visible;
   text-overflow: inherit;
 }
 .data{
   text-align: left;
   padding-left: 5%;
   padding-right: 5%;
 }
 .data p{
   margin-top: 5px;
 }
 .hr{
   background: gray;
   height: 1px;
   margin-bottom: 10px;
 }
</style>
