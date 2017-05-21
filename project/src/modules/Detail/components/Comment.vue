<template>
<div>
  <div id="comment">
    <p class="left">
        <b>评论</b>
        <touch class="add-comment" @tap="addComment">
            我也来评
        </touch>
    </p>
    <div v-if="comment.length === 0" class="no-comment">
        来做第一个评论的人吧！
    </div>

    <touch v-else v-for="item in comment" :key="item.id" @tap="toCommentDetail(item.id)">
        <div class="list" >
          <div class="avatar">
            <img :src="item.user_avatar" style="width:100%">
          </div>
          <div class="texts">
            <div class="textTop">
              <p class="left"><b>{{item.user_id}}</b></p>
              <p class="right"> {{item.timestamp}}</p>
            </div>
            <div>
              {{item.content}}
            </div>
            <div class="res">
              <icon class="icon" name="res"></icon>
              <span>{{ item.sub_comment_count }} 条回复</span>
            </div>
            <div class="longHr"></div>
          </div>
        </div>
    </touch>

  </div>

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
    data () {
      return {
        commentModalShow: false
      }
    },
    methods: {
      addComment () {
        this.$emit('showComment')
      },
      toCommentDetail (id) {
        this.$emit('showCommentDetail', id)
      },
      wakeupKeyboard () {
        // if (this.$Keyboard) {
          // this.$Keyboard.show()
        // }
      }
    },
    mounted () {
    }
  }
</script>

<style lang="stylus" scoped>
  #comment{
    padding-left: 5%;
    padding-right: 5%;
    margin: 20px 0;
  }
  .no-comment {
    text-align: center;
    font-size: 15px;
    margin: 40px;
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
    color: #706f6f;
  }
  .left{
    margin-bottom: 1em;
  }
  .right {
      text-align: right;
  }

</style>
