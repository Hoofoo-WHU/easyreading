<template>
  <router-content style="flex-direction:column">
    <navigation-bar @tap="scrollTop" title="书架" :sub-title="select">
      <navigation-bar-item @tap="modify" slot="right" text="编辑" v-if="edit && !empty"/>
      <navigation-bar-item @tap="finish" slot="right" text="完成" v-else-if="!edit"/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller" style="flex-grow:1" >
      <div v-if="empty" class="default">
        <icon name="myShelf" class="icon"/>
        <p class="none">您的书架空空如也，去书城看看吧</p>
      </div>
      <div class="shelf">
        <touch v-for="(item,index) in books" class="book" @tap="check(index)" :key="item.id">
          <book :cover="item.cover" :title="item.title" :isUpdate="isUpdate" :isEdit="item.isEdit" :edit="edit"/>
        </touch>
      </div>
    </scroller>
    <transition name="trans">
      <bottom-bar class="bottom" v-if="!edit">
        <bottom-bar-item text="全选" @tap="all" v-if="isAll"></bottom-bar-item>
        <bottom-bar-item text="取消全选" @tap="cancel" v-else></bottom-bar-item>
        <bottom-bar-item text="删除" @tap="remove" style="color:red,"></bottom-bar-item>
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
      isAll: true
    }
  },
  computed: {
    books () {
      return this.$store.state.books
    },
    select () {
      if (!this.edit) {
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
      } else {
        this.$router.push({name: 'detail', params: {id: this.books[index].id}})
      }
    },
    all () {
      for (var i = this.books.length - 1; i >= 0; i--) {
        this.books[i].isEdit = true
      }
      this.isAll = !this.isAll
    },
    cancel () {
      for (var i = this.books.length - 1; i >= 0; i--) {
        this.books[i].isEdit = false
      }
      this.isAll = !this.isAll
    },
    remove () {
      for (var i = this.books.length - 1; i >= 0; i--) {
        if (this.books[i].isEdit) {
          this.$store.commit('remove', this.books[i].id)
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
    width: 90%;
    padding-top: 10px;
    margin-left: 7%;
    font-size: 12px;
  }
  .book{
    width: 80px;
    margin-bottom: 20px;
    padding-right: 5%;
    position: relative;
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
    padding-top: 200px;
  }
  .icon{
    width: 40px;
    height: 40px;
    position: relative;
    left: 140px;
  }
  .none{
    font-size: 0.5em;
    text-align: center;
  }
</style>
