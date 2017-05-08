<template lang="html">
    <div id="book-category">
        <navigation-bar @tap="" :title="type[typeId-1].name">
          <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
        </navigation-bar>
        <scroller style="flex-grow:1" ref="scroller" @loadMore="loadMore" can-load-more>
        <div class="book-category-intro">
            {{ type[typeId-1].intro }}
        </div>
        <div class="book-category-list">
            <ul>
                <li v-for="book in mockData" :key="book.rank">
                    <div class="book-img">
                        <img :src=" book.img " :alt=" book.name ">
                    </div>
                    <div class="book-info">
                        <p>{{ book.name }}</p>
                        <div class="operate">
                            <label class="addFavor">
                                <input type="checkbox" v-model="favorList" :value="book.id">
                                <icon class="icon" v-if="isFavor(book.id)" :name="'favor'"></icon>
                                <icon class="icon" v-else :name="'unfavor'"></icon>
                            </label>
                            <label class="addCart">
                                <input type="checkbox" v-model="buyList" :value="book.id">
                                <icon :name="'addCart'"></icon>
                            </label>


                        </div>
                    </div>
                    <div class="book-price">
                        ￥ {{ book.price }}
                    </div>
                </li>
            </ul>
        </div>
    </scroller>
    </div>
</template>

<script>
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import Icon from '@/components/Icon'
import Scroller from '@/components/Scroller'
export default {
  name: 'bookCategoryList',
  components: {
    NavigationBar,
    NavigationBarItem,
    Icon,
    Scroller
  },
  computed: {
    typeId () {
      // 点击返回键后，$router.params.typeId获取不到，页面会报错，使用这样的方法处理
      if (this.$route.params.typeId) {
        return this.$route.params.typeId
      } else {
        return 9
      }
    }
  },
  watch: {
  },
  data () {
    return {
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
      mockData: [
        {id: 1, name: '摆渡人', price: 23.40, rank: 2, img: 'http://img13.360buyimg.com/n3/jfs/t1393/113/77737149/217635/9064dd42/555408dbN8679b564.jpg'},
        {id: 2, name: '皮囊', price: 29.90, rank: 1, img: 'http://img13.360buyimg.com/n3/jfs/t526/8/239863987/140707/38421a9e/546d9a25N07687a60.jpg'},
        {id: 3, name: '朝花夕拾', price: 17.80, rank: 4, img: 'http://img13.360buyimg.com/n3/jfs/t655/238/1195078491/109034/b41afb59/54bdf6e0Nf74bdaaf.jpg'},
        {id: 4, name: '我的心只悲伤七次', price: 22.60, rank: 3, img: 'http://img13.360buyimg.com/n3/g5/M02/14/11/rBEIC1ADeo4IAAAAAAGBNTPspiAAAEAzgGbRD8AAYFN108.jpg'}
      ],
      favorList: [],
      buyList: []
    }
  },
  methods: {
    isFavor (id) {
      return this.favorList.some((x) => {
        return x === id
      })
    },
    back () {
      this.$router.go(-1)
    },
    loadMore (over) {
      console.log('loadMore')
    }
  }
}
</script>

<style lang="stylus" scoped>
#book-category {
    width: 100%;
    background: #efeff4;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    overflow: hidden;
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
                img {
                    width: 55%;
                }
            }
            .book-info{
                font-size: 12px;
                flex-grow: 2;
                .operate {
                    display: flex;
                    justify-content: flex-start
                    .addFavor {
                        margin-right: 5px
                        width: 7%
                        input {
                            display: none;
                        }
                    }
                    .addCart {
                        width: 7%
                        input {
                            display: none;
                        }
                    }
                }
            }
            .book-price {
                font-size: 12px;
            }
        }
    }

}
</style>
