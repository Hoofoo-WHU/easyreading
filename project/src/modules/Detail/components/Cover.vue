<template>
  <div class="cover">
    <div style="width:30%">
      <!-- <img :src="info.cover" alt="" width="100%"> -->
      <img src="../../Main/Shelf/3310.jpg" alt="" width="100%">
    </div>
    <div class="intro">
      <p style="font-size:17px">{{info.title}}</p>
      <div class="score">
        <div class="bg">
           <span class="star" :style='{width:getStarWidth}'></span>
        </div>
        <span style="font-size:14px,white-space:nowrap">{{info.score}}分（800人评价）</span>
      </div>
      <p style="color:#3e88e8">{{info.author}}</p>
      <p style="color:#fc8332">{{info.price}}阅币</p>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Cover',
    props: {
      info: {
        type: Object,
        default: function () {
          return {
          }
        }
      }
    },
    data () {
      return {

      }
    },
    computed: {
      getStarWidth: function () {
        return this.info.score * 10 + '%'
      }
    }
  }
</script>

<style lang='css' scoped>
  .cover{
    display: flex;
    flex-direction: row;
    padding-left: 5%;
    padding-top: 10px;

  }
  .intro {
    text-align: left;
    padding-left: 5%;
    padding-right: 5%;
  }
  .intro>p{
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .bg{
    width: 93px;
    margin-right: 5%;
  }
  .star{
    display: inline-block;
    left: 0;
    top: 0;
    background: url(../png/star.png);
    height: 16px;
  }
  .score{
    display: flex;
    flex-direction: row;
    transform: scale(0.7);
    margin-left: -16%;
  }
</style>
