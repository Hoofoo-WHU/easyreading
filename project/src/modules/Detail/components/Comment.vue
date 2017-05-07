<template>
<div>
  <div id="comment">
    <p class="left">
        <b>评论</b>
        <span class="add-comment" @click="showComment">我也来评</span>
    </p>
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
        <div class="res">
          <icon class="icon" name="res"></icon>
          <span>{{ item.resNum }} 条回复</span>
        </div>
        <div class="longHr"></div>
      </div>
    </div>
  </div>
  <modal v-model="commentModalShow">
      <div slot="header">
          评论此书
      </div>
      <div class="shop-modal">
          <div class="point">
              <icon class="icon" v-for="star in sort(stars)" :name="star.name" @tap="mark(star.score)"></icon>
          </div>
          <div class="content">

          </div>
      </div>
  </modal>
</div>
</template>

<script>
  import Icon from '@/components/Icon'
  import Modal from '@/components/Modal'
  export default{
    name: 'Comment',
    props: {
      comment: {
        type: Array,
        default: []
      }
    },
    components: {
      Icon,
      Modal
    },
    computed: {
      light (star) {
        if (star.light) {
          return 'yellow'
        } else {
          return 'grey'
        }
      }
    },
    data () {
      return {
        commentModalShow: false,
        stars: []
      }
    },
    methods: {
      sort (arr) {
        return arr.slice().sort((item1, item2) => { return item1.score - item2.score })
      },
      showComment () {
        this.commentModalShow = true
      },
      mark (score) {
        for (let i = 0; i < this.stars.length; i++) {
          if (this.stars[i].score <= score) {
            this.stars[i].light = true
          } else {
            this.stars[i].light = false
          }
        }
      }
    },
    mounted () {
      this.stars = [
        {score: 1, name: 'star', light: false},
        {score: 2, name: 'star', light: false},
        {score: 3, name: 'star', light: false},
        {score: 4, name: 'star', light: false},
        {score: 5, name: 'star', light: false}
      ]
    }
  }
</script>

<style lang="stylus" scoped>
  #comment{
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 1em;
  }
  .add-comment {
    display: inline-block;
    border-radius: 12px;
    width: 100px;
    border: 1px #d3d3d3 solid
    text-align: center;
    margin: 0 12px;
  }
  .list{
    display: flex;
    flex-direction: row;
  }
  .avatar{
    width: 10%;
  }
  .longHr{
    background: #d3d3d3;
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
  .res {
      font-size: 10px;
      color: #706f6f;
      display: flex;
      align-items: center;
      .icon {
          width: 15px;
          padding: 2px;
      }
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
  .icon {
      width: 10%;
  }
  .light-score {
      color: yellow;
  }
  .dark-score {
      color: grey;
  }
</style>
