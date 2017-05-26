<template lang="html">
    <div id="book-category">
        <navigation-bar @tap="" :title="type[typeId-1].name" :border="!top">
          <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
        </navigation-bar>
        <scroller style="flex-grow:1" ref="scroller" @loadMore="loadMore" v-model="top" can-load-more>
        <div class="book-category-intro">
            {{ type[typeId-1].intro }}
        </div>
        <div class="book-category-list">
            <ul>

                <li v-for="book in bookList" :key="book.id">
                    <div class="book-img">
                        <touch @tap="toBookDetail(book.id)">
                        <img :src=" book.cover " :alt=" book.title ">
                        </touch>
                    </div>
                    <div class="book-info">
                        <p class="book-title">{{ book.title }}</p>
                        <p class="book-author">{{ book.author }}</p>
                        <div class="operate">
                            <touch class="addShelf" @tap="add(book)">
                                <icon class="icon" :name="'addShelf'"></icon>
                            </touch>
                            <touch class="addCart" @tap="shop(book.title, book.price, book.id)">
                                <icon :name="'addCart'"></icon>
                            </touch>
                        </div>
                    </div>
                    <div class="book-price">
                     {{ book.price }} 书币
                    </div>
                </li>

            </ul>
        </div>
    </scroller>
    <!--购买框-->
    <modal v-model="shopModalShow" :on-ok="confirmShop" :ok-text="'确认支付'">
        <div slot="header">
            购买本书
        </div>
        <div class="shop-modal">
            <p class="title">{{ shopBook.name }}</p>
            <p class="price">价格：<span>{{ shopBook.price }}</span>书币</p>
            <p class="hold">您还剩余 <span>{{ userHold }}</span>书币</p>
        </div>
    </modal>
    <!--购买框结束-->
    <message v-model="messageShow" :message-text="messageText" :icon-name="messageIcon"></message>
    </div>
</template>

<script>
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import Icon from '@/components/Icon'
import Scroller from '@/components/Scroller'
import Modal from '@/components/Modal'
import Message from '@/components/Message'
export default {
  name: 'bookCategoryList',
  components: {
    NavigationBar,
    NavigationBarItem,
    Icon,
    Scroller,
    Message,
    Modal
  },
  computed: {
    typeId () {
      // 点击返回键后，$router.params.typeId获取不到，页面会报错，使用这样的方法处理
      if (this.$route.query.id) {
        return this.$route.query.id
      } else {
        return 9
      }
    }
  },
  data () {
    return {
      bookList: [],
      page: 1,
      type: [
        {name: '少儿幼教', intro: '给童心插上翅膀'},
        {name: '教育科技', intro: '处处是创造之地，天天是创造之时，人人是创造之人。——陶行知'},
        {name: '文学艺术', intro: '没有思索和悲哀，就不会有文学。——鲁迅'},
        {name: '经管职场', intro: '志不强者智不达。——墨子'},
        {name: '党政军事', intro: '没有正确的政治方针，就不能有正确的军事方针。——朱德'},
        {name: '时尚娱乐', intro: '与其有乐于身，孰若元忧于其心？——韩愈'},
        {name: '情感家庭', intro: '人生是一场倾盆大雨,命运则是一把漏洞百出的雨伞,爱情是补丁。——朱德庸'},
        {name: '人文社科', intro: '鸟类会飞就是因为它们有翅膀，可不是因为有什么“飞的权利”。——尤瓦尔·赫拉利'},
        {name: '书籍列表', intro: '书籍是人类进步的阶梯。——高尔基'}
      ],
      shopModalShow: false,
      messageShow: false,
      shopBook: {
        name: '',
        price: 0,
        id: 0
      },
      userHold: 0,
      messageText: '',
      messageIcon: 'ok',
      top: true,
      next: ''
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
    load () {
      this.$http.get('/bookshopping/book', {
        params: {
          category: this.type[this.typeId - 1].name
        }
      })
      .then(response => {
        this.bookList = this.formatImg(response.data.results)
        this.next = response.data.next
        this.$refs.scroller.refresh()
      })
    },
    formatImg (arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].cover = 'http://oott.me' + arr[i].cover
      }
      return arr
    },
    isIn (id) {
      let books = this.$store.state.books
      for (let i = books.length - 1; i >= 0; i--) {
        if (id === books[i].id) {
          return true
        }
      }
      return false
    },
    back () {
      this.$router.go(-1)
    },
    loadMore (over) {
      let noMore = false
      let me = this
      console.log('loadMore')
      if (me.next === null) {
        noMore = true
        over(noMore)
      } else {
        me.$http.get(this.next, {
          params: {
            category: this.type[this.typeId - 1].name
          }
        })
        .then(response => {
          me.next = response.data.next
          me.bookList = me.formatImg(response.data.results)
          over(noMore)
          this.$refs.scroller.refresh()
        })
        .catch(error => {
          console.log(error.response.data.message)
          over(noMore)
          this.$refs.scroller.refresh()
        })
      }
    },
    add (book) {
      let me = this
      let data = {'id': book.id, 'title': book.name, 'cover': book.img, 'isEdit': false}
      if (this.isIn(data.id)) {
        this.showMessage('已添加', 'ok')
      } else {
        me.$http.post('/bookshelf', {
          'book_id': book.id
        })
        .then(response => {
          this.showMessage('添加成功', 'ok')
        })
      }
    },
    shop (name, price, id) {
      this.shopBook.name = name
      this.shopBook.price = price
      this.shopBook.id = id
      let me = this
      me.$http.get('/personal/balance')
      .then(response => {
        me.userHold = response.data.balance_book
        setTimeout(function () {
          me.shopModalShow = true
        }, 0)
      })
    },
    confirmShop () {
      this.shopModalShow = false
      let me = this
      me.$http.post('/bookshopping/book/' + this.shopBook.id + '/buy')
      .then(response => {
        this.showMessage('购买成功', 'ok')
      })
      .catch(error => {
        this.showMessage(error.response.reason, 'close')
      })
    },
    showMessage (text, icon) {
      if (icon) {
        this.messageIcon = icon
      }
      this.messageText = text
      this.messageShow = true
    },
    toBookDetail (id) {
      this.$router.push({'name': 'detail', query: {'id': id}})
    }
  },
  mounted () {
    console.log('mounted')
    this.load()
  },
  activated () {
    console.log('activated')
  }
}
</script>

<style lang="stylus" scoped>
#book-category {
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
}
.book-category-intro {
    text-align: center;
    width: 80%;
    margin: 12px auto;
    font-size: 12px;
    color: #888888;
    font-family: 'SimHei', 'Weibei SC', sans-serif;
}
.book-category-list {
    font-size: 15px;
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
            .book-img {
                width: 30%
                img {
                    width: 55%;
                }
            }
            .book-info{
                font-size: 12px;
                width: 50%;
                p {
                    margin-left: 10px;
                }
                .book-title {
                    font-weight: bold;
                    font-size: 14px;
                }
                .operate {
                    display: flex;
                    justify-content: flex-start;
                    .addShelf {
                        margin-right: 5px
                        width: 18px
                        padding: 10px
                    }
                    .addCart {
                        width: 18px
                        padding: 10px
                    }
                }
            }
            .book-price {
                font-size: 12px;
                color: #ffa500
            }
        }
    }

}
.shop-modal {
    .title {
        text-align: center;
        font-size: 15px;
        font-weight: bold;
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
        margin: 10px
        font-size: 13px;
        span{
            color: #ffa500
            padding: 0 5px
        }
    }
}
</style>
