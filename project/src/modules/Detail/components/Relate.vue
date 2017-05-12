<template>
  <div class="relate">
    <div class="relates">
      <p class="left"><b>相关推荐</b></p>
      <div class="recommend">
        <div v-for="item in info" style="width:30%">
          <!-- <img :src="item.cover" alt="" width="100%"> -->
          <img src="../../Main/Shelf/3310.jpg" alt="" width="100%">
          {{item.title}}
        </div>
      </div>
    </div>
    <touch class="change" @tap="change">
      换一换
    </touch>
  </div>
</template>

<script>
  export default{
    name: 'relate',
    props: {
      initialInfo: {
        type: Array,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        info: this.initialInfo
      }
    },
    mouted () {
      console.log(this.initialInfo)
    },
    methods: {
      change () {
        this.info.splice(0, this.info.length)
        for (let i = 1; i <= 3; i++) {
          this.info.push({cover: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2619242940,2733301503&fm=58',
            title: '我变了我变了'})
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  .relates{
    text-align: left;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 15px;
    padding-top: 15px;
  }
  .relate p{
    width: 50%;
    margin-top: 0;
    margin-bottom: 5px;
  }
  .left{
    text-align: left;
  }
  .recommend{
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }
  .change{
    width: 30%;
    height: 20px;
    border: 1px #d3d3d3 solid;
    border-radius: 50px;
    text-align: center;
    font-size: 10px;
    margin: 10px auto;
    line-height: 20px;
    color: grey;

  }
</style>
