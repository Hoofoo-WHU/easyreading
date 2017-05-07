<template lang="html">
    <div>
        <navigation-bar @tap="" title="排行列表">
          <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
        </navigation-bar>
        <div class="book-rank-list">
            <ul>
                <li v-for="book in rank(mockData)" :key="book.rank">
                    <div class="rank-icon" v-if="book.rank === 1">
                        <icon class="icon" name="first"></icon>
                    </div>
                    <div class="rank-icon" v-else>
                        {{ book.rank }}
                    </div>
                    <div class="book-img">
                        <img :src=" book.img " :alt=" book.name ">
                    </div>
                    <div class="book-info">
                        <p>{{ book.name }}</p>
                        <div class="operate">
                            <label class="addFavor">
                                <input type="checkbox" v-model="favorList" :value="book.id">
                                <icon class="icon" v-if="isFavor(book.id)" name="favor"></icon>
                                <icon class="icon" v-else name="unfavor"></icon>
                            </label>
                            <label class="addCart">
                                <input type="checkbox" v-model="buyList" :value="book.id">
                                <icon name="addCart"></icon>
                            </label>


                        </div>
                    </div>
                    <div class="book-price">
                        ￥ {{ book.price }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import Icon from '@/components/Icon'
export default {
  name: 'bookRankList',
  components: {
    NavigationBar,
    NavigationBarItem,
    Icon
  },
  data () {
    return {
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
    rank (arr) {
      return arr.slice().sort((item1, item2) => { return item1.rank - item2.rank })
    },
    isFavor (id) {
      return this.favorList.some((x) => {
        return x === id
      })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.book-rank-list {
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
            .rank-icon {
                width: 7%;
                font-size: 20px;
            }
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
