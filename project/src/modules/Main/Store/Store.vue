<template>
  <router-content>
    <scroller class="scroller" ref="scroller">
      <slider></slider>
      <div class="category">
          <div class="section-title">
              分类
          </div>
          <div class="section-content">
              <div class="type" v-for="icon in categoryIcon">
                <touch @tap="toBookCategoryList(icon.id)">
                  <icon class="icon" :name="icon.name"></icon>
                  <span> {{ icon.text }} </span>
                </touch>
              </div>
          </div>
      </div>

      <!--排行榜-->
      <div class="rank-list">
          <div class="section-title">
              <p>排行榜</p>

          </div>
          <div class="section-content">
              <ul class="book-show" >
                 <li v-for="book in mockData">
                        <touch @tap="toBookDetail(book.id)">
                         <img :src=" book.img " alt="">
                        </touch>
                     <p>{{ book.name }}</p>
                 </li>
              </ul>

              <div class="more">
              <touch @tap="toBookRankList">
               更多>>>
              </touch>
              </div>


          </div>

      </div>

      <!--个性化推荐-->
      <div class="per-recommand">
          <div class="section-title">
              <p>个性化推荐</p>
          </div>
          <div class="section-content">
              <ul class="book-show" >
                 <li v-for="book in mockData" track-by="book.id" @click="messageShow=!messageShow">
                     <img :src=" book.img " alt="">
                     <p>{{ book.name }}</p>
                 </li>
              </ul>

          </div>
      </div>
      <modal v-model="modalShow"></modal>
      <message v-model="messageShow" :message-text="'购买成功'"></message>

    </scroller>
  </router-content>
</template>

<script>
import RouterContent from '@/components/RouterContent'
import Scroller from '@/components/Scroller'
import Icon from '@/components/Icon'
import Slider from '@/components/Slider'
import Modal from '@/components/Modal'
import Message from '@/components/Message'

export default {
  name: 'store',
  data () {
    return {
      modalShow: false,
      messageShow: false,
      msg: '这里是商城模块',
      categoryIcon: [
        {id: 1, name: 'dog', text: '少儿幼教'},
        {id: 2, name: 'library', text: '教育科技'},
        {id: 3, name: 'musicbox', text: '文学艺术'},
        {id: 4, name: 'computer', text: '经管职场'},
        {id: 5, name: 'plane', text: '党政军事'},
        {id: 6, name: 'xbox', text: '时尚娱乐'},
        {id: 7, name: 'rose', text: '情感家庭'},
        {id: 8, name: 'newspaper', text: '人文社科'}
      ],
      mockData: [
        {id: 1, name: '摆渡人', price: 23.40, img: 'http://img13.360buyimg.com/n3/jfs/t1393/113/77737149/217635/9064dd42/555408dbN8679b564.jpg'},
        {id: 2, name: '皮囊', price: 29.90, img: 'http://img13.360buyimg.com/n3/jfs/t526/8/239863987/140707/38421a9e/546d9a25N07687a60.jpg'},
        {id: 3, name: '朝花夕拾', price: 17.80, img: 'http://img13.360buyimg.com/n3/jfs/t655/238/1195078491/109034/b41afb59/54bdf6e0Nf74bdaaf.jpg'},
        {id: 4, name: '我的心只悲伤七次', price: 22.60, img: 'http://img13.360buyimg.com/n3/g5/M02/14/11/rBEIC1ADeo4IAAAAAAGBNTPspiAAAEAzgGbRD8AAYFN108.jpg'}
      ]
    }
  },
  components: {
    Scroller,
    RouterContent,
    Icon,
    Slider,
    Modal,
    Message
  },
  methods: {
    scrollTop () {
      this.$refs.scroller.scrollTop()
    },
    replace (name, id) {
      this.$router.push({'name': name, params: {'typeId': id}})
    },
    toBookCategoryList (id) {
      this.replace('bookCategoryList', id)
    },
    toBookRankList () {
      this.replace('bookRankList')
    },
    toBookDetail () {
      this.replace('bookDetail')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.scroller{
  flex: 1
}
.section-title {
    text-align: left
    font-size: 14px
    margin: 5px 5px 0 10px;

}
.category {
    border-bottom: 1px #d3d3d3 solid
    .section-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        height: 70%
        .type {
            width: 20%;
            height: 40px;
            font-size: 10px;
            border-radius: 20px;
            border: 1px #d3d3d3 solid;
            text-align: center;
            line-height: 40px;
            margin: 10px;
            .icon {
                width: 26%;
                height: 60%;
            }
            span {
                vertical-align: super;
            }
        }
    }
}
.rank-list {
    border-bottom: 1px #d3d3d3 solid
    .section-title {
        p {
            margin: 0;
        }
    }
    .section-content {
        height: 90%
        display: flex;
        flex-direction: column
        justify-content: space-between;
        align-items: center
        .more {
            width: 30%;
            height: 20px;
            border: 1px #d3d3d3 solid
            border-radius: 50px;
            text-align: center;
            font-size: 10px;
            margin: 0 0 10px 0;
            line-height: 20px;
        }
    }
}
.per-recommand {
    height: 160px;
    .section-title {
        p {
            margin: 0;
        }
    }
    .section-content {
        height: 70%
        .more {

        }
    }
}
.book-show {
    list-style: none;
    height: 70%;
    margin: 0;
    padding: 0;
    display: flex
    justify-content: space-around;
    li {
        padding: 10px 20px 0 20px;
        width: 25%;
        height: 100%;
        img {
            display: block;
            width: 100%;
        }
        p {
            font-size: 10px;
            text-align: center;
        }
    }
}
</style>
