<template lang="html">
    <div id="book-rank-list">
        <navigation-bar @tap="" title="排行列表" :border="!top">
          <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
        </navigation-bar>
        <scroller style="flex-grow:1" ref="scroller" @loadMore="loadMore" v-model="top" can-load-more>
            <ul>
                <li v-for="book in rank(mockData)" :key="book.rank">
                    <div class="rank-icon" v-if="book.rank === 1">
                        <icon class="icon" name="first"></icon>
                    </div>
                    <div class="rank-icon" v-else>
                        {{ book.rank }}
                    </div>
                    <div class="book-img">
                        <touch @tap="toBookDetail()">
                        <img :src=" book.img " :alt=" book.name ">
                        </touch>
                    </div>
                    <div class="book-info">
                        <p>{{ book.name }}</p>
                        <div class="operate">
                            <touch class="addShelf" @tap="add(book)">
                                <icon class="icon" :name="'addShelf'"></icon>
                            </touch>
                            <touch class="addCart" @tap="shop(book.name, book.price)">
                                <icon :name="'addCart'"></icon>
                            </touch>
                        </div>
                    </div>
                    <div class="book-price">
                        ￥ {{ book.price }}
                    </div>
                </li>
            </ul>
        </scroller>
        <!--购买框-->
        <modal v-model="shopModalShow" :on-ok="confirmShop" :ok-text="'确认支付'">
          <div slot="header">
              购买本书
          </div>
          <div class="shop-modal">
              <p class="title">{{ shopBook.name }}</p>
              <p class="price">价格：<span>{{ shopBook.price }}</span>代币</p>
              <p class="hold">您还剩余 <span>{{ userHold }}</span>阅币</p>
          </div>
        </modal>
        <!--购买框结束-->
        <message v-model="messageShow" :message-text="messageText"></message>
    </div>
</template>

<script>
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import Scroller from '@/components/Scroller'
import Icon from '@/components/Icon'
import Modal from '@/components/Modal'
import Message from '@/components/Message'
export default {
  name: 'bookRankList',
  components: {
    NavigationBar,
    NavigationBarItem,
    Icon,
    Scroller,
    Message,
    Modal
  },
  data () {
    return {
      mockData: [
        {id: 1, name: '摆渡人', price: 23.40, rank: 2, img: 'http://img13.360buyimg.com/n3/jfs/t1393/113/77737149/217635/9064dd42/555408dbN8679b564.jpg'},
        {id: 2, name: '皮囊', price: 29.90, rank: 1, img: 'http://img13.360buyimg.com/n3/jfs/t526/8/239863987/140707/38421a9e/546d9a25N07687a60.jpg'},
        {id: 3, name: '朝花夕拾', price: 17.80, rank: 4, img: 'http://img13.360buyimg.com/n3/jfs/t655/238/1195078491/109034/b41afb59/54bdf6e0Nf74bdaaf.jpg'},
        {id: 4, name: '我的心只悲伤七次', price: 22.60, rank: 3, img: 'http://img13.360buyimg.com/n3/g5/M02/14/11/rBEIC1ADeo4IAAAAAAGBNTPspiAAAEAzgGbRD8AAYFN108.jpg'}
      ],
      shopModalShow: false,
      messageShow: false,
      shopBook: {
        name: '',
        price: 0
      },
      userHold: 4000,
      messageText: '',
      top: true
    }
  },
  watch: {
    shopModalShow (val) {
      if (val) {
        this.$store.commit('addmodal', () => { this.shopModalShow = true })
      } else {
        this.$store.commit('removemodal', () => { this.shopModalShow = false })
      }
    }
  },
  methods: {
    isIn (id) {
      let books = this.$store.state.books
      for (let i = books.length - 1; i >= 0; i--) {
        if (id === books[i].id) {
          return true
        }
      }
      return false
    },
    rank (arr) {
      return arr.slice().sort((item1, item2) => { return item1.rank - item2.rank })
    },
    back () {
      this.$router.go(-1)
    },
    loadMore (over) {
      console.log('loadMore')
    },
    toBookDetail () {
      this.$router.push({'name': 'detail'})
    },
    add (book) {
      let data = {'id': book.id, 'title': book.name, 'cover': book.img, 'isEdit': false}
      if (this.isIn(data.id)) {
        this.showMessage('已添加')
      } else {
        this.$store.commit('add', data)
        this.showMessage('添加成功')
      }
    },
    shop (name, price) {
      this.shopBook.name = name
      this.shopBook.price = price
      this.shopModalShow = true
    },
    confirmShop () {
      this.shopModalShow = false
      this.showMessage('购买成功')
    },
    showMessage (text) {
      this.messageText = text
      this.messageShow = true
    }
  }
}
</script>

<style lang="stylus" scoped>
#book-rank-list {
    font-size: 15px;
    width: 100%;
    background-color: #ffffff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        li {
            padding: 10px 10px;
            border-bottom: 1px solid #d3d3d3;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            .rank-icon {
                width: 7%;
                font-size: 20px;
                margin: 12px;
            }
            .book-img {
                img {
                    width: 58%;
                }
            }
            .book-info{
                font-size: 12px;
                flex-grow: 2;
                .operate {
                    display: flex;
                    justify-content: space-between;
                    margin: 15px 0;
                    width: 35%;
                    .addShelf {
                        margin-right: 5px
                        width: 18px
                    }
                    .addCart {
                        width: 18px
                    }
                }
            }
            .book-price {
                font-size: 12px;
            }
        }
    }
}
.shop-modal {
    .title {
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        margin: 10px
    }
    .price {
        font-size: 13px;
        margin: 10px
        span {
            color: #ffa500
            padding: 0 5px
        }
    }
    .hold {
        font-size: 13px;
        span{
            color: #ffa500
            padding: 0 5px
        }
    }
}
</style>
