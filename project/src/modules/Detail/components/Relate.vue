<template>
  <div class="relate">
    <div class="relates">
      <p class="left"><b>相关推荐</b></p>
      <div class="recommend">
        <touch v-for="item in initialInfo" style="width:30%" @tap="toBookDetail(item.id)">
          <!-- <img :src="item.cover" alt="" width="100%"> -->
          <img :src="item.cover" alt="" width="100%">
          {{item.title}}
        </touch>
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
        /* let me = this
        me.$http.get('/recommendation/individuation', {
          params: {
            amount: 10
          }
        })
        .then(response => {
          me.recommendInfo = me.formatImg(response.data.results)
        })
        .catch(error => {
          console.log(error.response)
      }) */
      },
      toBookDetail (id) {
        this.$router.push({'id': 'detail', params: {'id': id}})
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
