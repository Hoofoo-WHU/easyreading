<template>
  <div id="comment">
    <p class="left"><b>评论</b></p>
    <div v-for="item in comment" class="list">
      <div class="avatar">
        <img src="../png/avatar.png" style="width:100%">
      </div>
      <div class="texts">
        <div class="textTop">
          <p class="left"><b>{{item.author}}</b></p>
          <p class="right"> {{item.time}}</p>
        </div>
        <div> 
          {{item.data}}
        </div>
        <div class="longHr"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Comment',
    props: {
      comment: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="css" scoped>
  #comment{
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 1em;
  }
  .list{
    display: flex;
    flex-direction: row;
  }
  .avatar{
    width: 10%;
  }
  .longHr{
    background: gray;
    height: 1px;
    margin-bottom: 10px;
    width: 200%;
    margin-left: -25%;
    margin-top: 10px;
  }
  .texts{
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-left: 5%;
  }
  .textTop{
    display: flex;
    flex-direction: row;
    margin-top: -5px;
  }
  .textTop p{
    width: 50%;
  }
  .left{
    margin-bottom: 1em;
  }
</style>
