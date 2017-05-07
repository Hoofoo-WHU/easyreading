<template lang="html">
    <div>
        <navigation-bar @tap="" title="书籍详情">
          <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
        </navigation-bar>
        <div class="book-detail">

        <div class="book-intro">
            <div class="book-img">
            <img :src="book.img" alt="">
            </div>
            <div class="book-info">
                <p class="book-title"> {{ book.name }} </p>
                <div class="book-mark">
                    <p><span>{{ book.marks.mark }}</span> 分 </p>
                    ✨✨✨✨
                </div>
                <p class="book-author"> {{ book.author }} </p>
                <p class="book-commentsnumber">  评论共 {{ book.comments.number }} 条</p>
            </div>
            <div class="book-synopsis"><span>简介:</span> {{ book.synopsis }}</div>
            <div class="book-operate">
                <touch>
                    <icon class="icon book-read" name="read"></icon>
                    <p>立即阅读</p>
                </touch>
                <touch>
                    <icon class="icon book-read" name="download"></icon>
                    <p>下载本书</p>
                </touch>
                <touch>
                    <icon class="icon book-read" name="addShelf"></icon>
                    <p>加入书架</p>
                </touch>
                <touch>
                    <label class="add-favor">
                        <input type="checkbox" v-model="favorList" :value="book.id">
                        <icon class="icon" v-if="isFavor(book.id)" name="favor"></icon>
                        <icon class="icon" v-else name="unfavor"></icon>
                        <p>添加收藏</p>
                    </label>
                </touch>
            </div>
        </div>
        <div class="book-comments">
            <ul>
                <li>
                    <p>评论</p>
                </li>
                <li v-for="comment in book.comments.commentsContent">
                    <p> {{ comment.name }} </p>
                    <p> {{ comment.content }} </p>
                </li>
            </ul>
            <div class="more">
            <touch @tap="">
             更多>>>
            </touch>
            </div>
        </div>
        <div class="book-recommand">
            <p>相关推荐</p>
            <ul class="book-show" >
               <li v-for="book in mockData" track-by="book.id">
                   <img :src=" book.img " alt="">
                   <p>{{ book.name }}</p>
               </li>
            </ul>
        </div>


      </div>
  </div>
</template>

<script>
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import Icon from '@/components/Icon'
import Scroller from '@/components/Scroller'
export default {
  name: 'bookDetail',
  components: {
    NavigationBar,
    NavigationBarItem,
    Icon,
    Scroller
  },
  data () {
    return {
      favorList: [],
      mockData: [
        {id: 1, name: '摆渡人', price: 23.40, rank: 2, img: 'http://img13.360buyimg.com/n3/jfs/t1393/113/77737149/217635/9064dd42/555408dbN8679b564.jpg'},
        {id: 2, name: '皮囊', price: 29.90, rank: 1, img: 'http://img13.360buyimg.com/n3/jfs/t526/8/239863987/140707/38421a9e/546d9a25N07687a60.jpg'},
        {id: 3, name: '朝花夕拾', price: 17.80, rank: 4, img: 'http://img13.360buyimg.com/n3/jfs/t655/238/1195078491/109034/b41afb59/54bdf6e0Nf74bdaaf.jpg'},
        {id: 4, name: '我的心只悲伤七次', price: 22.60, rank: 3, img: 'http://img13.360buyimg.com/n3/g5/M02/14/11/rBEIC1ADeo4IAAAAAAGBNTPspiAAAEAzgGbRD8AAYFN108.jpg'}
      ],
      book: {
        id: 1,
        name: '摆渡人',
        author: '张嘉佳',
        price: 29.87,
        img: 'http://img13.360buyimg.com/n3/jfs/t1393/113/77737149/217635/9064dd42/555408dbN8679b564.jpg',
        synopsis: '摆渡人是城市里的超级英雄，摆渡就是把人从痛苦中解救出来。用快乐和温暖，抵抗这个世界的悲伤。酒吧老板陈末和合伙人管春就是这座城市的“金牌摆渡人”，他们平时看起来吊儿郎当，却从不对每位需要帮助的人说拒绝，只要你“预约摆渡”，刀山火海都会“使命必达”。邻居女孩小玉为了偶像马力，预约了他们的服务，但在帮助小玉挑战整个城市的过程中，陈末和管春也逐渐发现了自己躲不过的问题。从欢天喜地的生活，到惊天动地的疯狂，摆渡人最辉煌的篇章，从这里开启。',
        marks: {
          mark: 6.5,
          peopleNumber: 2222222
        },
        comments: {
          number: 2121212,
          commentsContent: [
            {name: '张三', content: '这本书不错！'},
            {name: '少时诵诗书', content: ''},
            {name: '见好就收', content: '这本书不错！这本书不错！这本书不错！这本书不错！这本书不错！这本书不错！这本书不错！这本书不错！这本书不错！这本书不错！'},
            {name: 'inks', content: '这本书不错！这本书不错！这本书不错！'},
            {name: '快乐的蜗牛', content: '这本书不错！这本书不错！这本书不错！这本书不错！这本书不错！这本书不错！这本书不错！'}
          ]
        }
      }
    }
  },
  methods: {
    scrollTop () {
      this.$refs.scroller.scrollTop()
    },
    back () {
      this.$router.go(-1)
    },
    isFavor (id) {
      return this.favorList.some((x) => {
        return x === id
      })
    }
  }

}
</script>

<style lang="stylus" scoped>
.scroller{
  flex: 1
}
.book-intro {
    width: 100%;
    background-color: #edede6;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .book-img {
        box-sizing: border-box;
        width: 60%;
        padding: 20px;
        img {
            width: 100%
        }
    }
    .book-info {
        box-sizing: border-box;
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 10px;
        font-size: 13px;
        .book-title {
            font-size: 20px;
        }
        .book-mark {
            p {
                span {
                    font-size: 17px;
                    font-weight: bold;
                }
            }
        }
    }
    .book-synopsis {
        box-sizing: border-box;
        width: 100%;
        font-size: 12px;
        padding: 5px 20px;
        span {
            font-size: 17px;
            font-weight: bold;
        }
    }
    .book-operate {
        width: 100%;
        margin: 15px 40px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        div {
            width: 8%;
            p {
                font-size: 10px;
                text-align: center;
                margin: 0;
            }
            .add-favor {
                input {
                    display: none;
                }
            }
        }
    }
}
.book-comments {
    width: 100%;
    background-color: #edede6;
    padding: 10px 0;
    height: 100%;
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
            border-bottom: 1px solid #000;
            margin: 10px 20px;
            text-align: left;
            font-size: 13px;
            p:nth-child(1){
                font-size: 15px;
                font-weight: bold;
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
        margin: 15px auto;
        line-height: 20px;
    }
}
.book-recommand {
    width: 100%;
    background-color: #edede6;
    padding: 30px 0;
    p {
        text-align: left
        font-size: 14px
        margin: 5px 5px 0 10px;

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
}
</style>
