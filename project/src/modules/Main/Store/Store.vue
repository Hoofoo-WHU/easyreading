<template>
  <router-content>
    <scroller style="flex-grow:1" ref="scroller" @loadMore="loadMore" can-load-more>
      <slider></slider>
      <container :title="'分类'"></container>
      <div class="category">
          <div class="section-content">
              <div class="type" v-for="icon in categoryIcon">
                <touch @tap="toBookCategoryList(icon.id)">
                  <div class="icon-border">
                      <icon class="icon" :name="icon.name"></icon>
                  </div>
                  <span> {{ icon.text }} </span>
                </touch>
              </div>
          </div>
      </div>

      <!--排行榜-->
      <container :title="'排行榜'"></container>
      <div class="rank-list">
          <div class="section-content">
              <ul class="book-show" >
                  <touch v-for="book in mockData" track-by="book.id" @tap="toBookDetail(book.id)">
                  <li>
                      <img :src=" book.img " alt="">
                      <p>{{ book.name }}</p>
                  </li>
                </touch>
              </ul>

              <div class="more">
              <touch @tap="toBookRankList">
               更多>>>
              </touch>
              </div>


          </div>

      </div>

      <!--个性化推荐-->
      <container :title="'个性推荐'"></container>
      <div class="per-recommand">
          <div class="section-content">
              <ul class="book-show" >
                  <touch  class="book-border" v-for="book in mockData" @tap="toBookDetail(book.id)">
                  <li>
                      <div class="book-img">
                          <img :src=" book.img " :alt=" book.name ">
                      </div>
                      <div class="book-info">
                          <p>{{ book.name }}</p>
                      </div>
                      <div class="book-price">
                          ￥ {{ book.price }}
                      </div>
                  </li>
                  </touch>

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
import Container from '@/components/Container'

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
    Message,
    Container
  },
  methods: {
    loadMore (over) {
      setTimeout(over, 3000)
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
      this.replace('detail')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.category {
    .section-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        height: 70%
        .type {
            width: 25%;
            font-size: 10px;
            text-align: center;
            line-height: 40px;
            box-sizing: border-box;
            .icon-border {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: 1px #d3d3d3 solid;
                position: relative;
                margin: 0 auto;
            }
            .icon {
                position: absolute;
                top: 50%;
                left: 50%
                transform: translate(-50%, -50%);
                width: 75%;
            }
            span {
                vertical-align: super;
            }
        }
    }
}
.rank-list {
    .section-content {
        height: 70%;
        .book-show {
            list-style: none;
            height: 70%;
            margin: 0;
            padding: 0;
            display: flex
            justify-content: space-around;
            div {
                width: 25%;
                box-sizing: border-box;
                padding: 10px;
                li {
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
        }
        .more {
            width: 30%;
            height: 20px;
            border: 1px #d3d3d3 solid
            border-radius: 50px;
            text-align: center;
            font-size: 10px;
            margin: 10px auto;
            line-height: 20px;
        }
    }
}
.per-recommand {
    .section-content {
        height: 70%;
        .book-show {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            .book-border {
                width: 50%;
                box-sizing: border-box;
                li {
                    margin: 0;
                    padding: 10px;
                    border-bottom: 1px #d3d3d3 solid;
                    border-right: 1px #d3d3d3 solid;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    .book-img {
                        width: 40%;
                        img {
                            width: 100%;
                        }
                    }
                    .book-info {
                        width: 35%;
                        padding: 0 4px;
                        font-size: 12px;
                        flex-grow: 2;
                    }
                    .book-price {
                        font-size: 9px;
                    }
                }
            }

        }
    }
}

</style>
