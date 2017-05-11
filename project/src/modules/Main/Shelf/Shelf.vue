<template>
  <router-content style="flex-direction:column">
    <navigation-bar @tap="scrollTop" title="书架" :sub-title="select" :border="!top">
      <navigation-bar-item @tap="modify" slot="right" text="编辑" v-if="edit" :disable="empty"/>
      <navigation-bar-item @tap="finish" slot="right" text="完成" v-else/>
    </navigation-bar>
    <div v-if="empty" class="default">
      <icon name="myShelf" class="icon"/>
      <p class="none">您的书架空空如也，去书城看看吧</p>
    </div>
    <scroller class="scroller" ref="scroller" style="flex-grow:1" v-model="top">
      <div class="shelf">
        <touch v-for="(item,index) in books" class="book" @tap="check(index)" :key="item.id">
          <book :cover="item.cover" :title="item.title" :isEdit="item.isEdit" :edit="edit"/>
        </touch>
      </div>
    </scroller>
    <transition name="trans">
      <bottom-bar class="bottom" v-if="!edit">
        <bottom-bar-item text="全选" @tap="all" v-if="isAll"></bottom-bar-item>
        <bottom-bar-item text="取消全选" @tap="cancel" v-else></bottom-bar-item>
        <bottom-bar-item text="删除" @tap="remove" style="color:red" left-divide :disable="selectedNum<=0"></bottom-bar-item>
      </bottom-bar>
    </transition>
  </router-content>
</template>

<script>
import Scroller from '@/components/Scroller'
import RouterContent from '@/components/RouterContent'
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import { BottomBar, BottomBarItem } from '@/components/BottomBar'
import Book from './components/Book'
import Icon from '@/components/Icon'

export default {
  name: 'shelf',
  components: {
    BottomBar,
    BottomBarItem,
    Scroller,
    RouterContent,
    NavigationBar,
    NavigationBarItem,
    Book,
    Icon
  },
  data () {
    return {
      isUpdate: false,
      edit: true,
      checked: [],
      isAll: true,
      top: true,
      selectedNum: 0
    }
  },
  computed: {
    books () {
      return this.$store.state.books
    },
    select () {
      if (!this.edit) {
        if (this.selectedNum > 0) {
          return '已选择' + this.selectedNum + '本书'
        }
        return '选择书籍'
      } else {
        return ''
      }
    },
    empty () {
      if (this.books.length === 0) {
        return true
      }
      return false
    }
  },
  methods: {
    scrollTop () {
      this.$refs.scroller.scrollTop()
    },
    modify () {
      this.edit = !this.edit
    },
    finish () {
      this.edit = !this.edit
      for (var i = this.books.length - 1; i >= 0; i--) {
        this.books[i].isEdit = false
      }
      this.isAll = true
    },
    check (index) {
      if (this.edit === false) {
        this.books[index].isEdit = !this.books[index].isEdit
        if (this.books[index].isEdit) {
          this.selectedNum++
        } else {
          this.selectedNum--
        }
      } else {
        this.$router.push({name: 'detail', params: {id: this.books[index].id}})
      }
    },
    all () {
      for (var i = this.books.length - 1; i >= 0; i--) {
        this.books[i].isEdit = true
      }
      this.isAll = !this.isAll
      this.selectedNum = this.books.length
    },
    cancel () {
      for (var i = this.books.length - 1; i >= 0; i--) {
        this.books[i].isEdit = false
      }
      this.selectedNum = 0
      this.isAll = !this.isAll
    },
    remove () {
      for (var i = this.books.length - 1; i >= 0; i--) {
        if (this.books[i].isEdit) {
          this.$store.commit('remove', this.books[i].id)
          this.selectedNum--
        }
      }
    },
    add () {
      this.$router.push({name: 'detail'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .scroller{
    flex:1;
  }
  .shelf{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 20px;
    margin-left: 10%;
    font-size: 12px;
    width: 100%;
  }
  .book{
    width: 20%;
    margin-bottom: 23px;
    padding-right: 10%;
    position: relative;
    margin-top: 10px;
  }
  .bottom{
    position: absolute;
    bottom: -49px;
    z-index: 101;
  }
  .trans-enter-active, .trans-leave-active{
    transition: transform .3s;
  }
  .trans-enter-active, .trans-leave{
    transform: translateY(0);
  }
  .trans-enter, .trans-leave-active{
    transform: translateY(100%);
  }
  .default{
    /*padding-top: 200px;*/
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
  .icon{
    width: 40px;
    height: 40px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    color: gray;
  }
  .none{
    font-size: 0.5em;
    text-align: center;
    color: gray;
  }
</style>
