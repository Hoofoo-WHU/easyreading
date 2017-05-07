<template>
  <router-content style="flex-direction:column">
    <navigation-bar @tap="scrollTop" title="书架" :sub-title="select">
      <navigation-bar-item @tap="modify" slot="right" text="编辑" v-if="edit"/>
      <navigation-bar-item @tap="finish" slot="right" text="完成" v-else/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller" style="position:relative">
      <div class="shelf">
        <touch v-for="item in books" class="book" @tap="clickAll(item.id)">
            <input type="checkbox" :id="item.id" :value="item.id" v-model="checked" class="check" v-if="!edit" @click.prevent>
            <img :src="item.cover" alt="" width="100%" for="item.id">
          <div>{{item.title}}</div>
          <div v-if="isUpdate" class="status">XXX未读</div>
          <div v-else class="update">●有更新</div>
        </touch>
       <!--  <touch class="book" @tap="add">
            <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2891742048,3830076574&fm=58" width="100%">
        </touch> -->
      </div>
    </scroller>
    <transition name="trans">
      <bottom-bar class="bottom" v-if="!edit">
        <bottom-bar-item text="全选" @tap="all" v-if="isAll"></bottom-bar-item>
        <bottom-bar-item text="取消全选" @tap="cancel" v-else></bottom-bar-item>
        <bottom-bar-item text="删除" @tap="remove" style="color:red "></bottom-bar-item>
      </bottom-bar>
    </transition>
  </router-content>
</template>

<script>
import Scroller from '@/components/Scroller'
import RouterContent from '@/components/RouterContent'
import { NavigationBar, NavigationBarItem } from '@/components/NavigationBar'
import { BottomBar, BottomBarItem } from '@/components/BottomBar'

export default {
  name: 'shelf',
  components: {
    BottomBar,
    BottomBarItem,
    Scroller,
    RouterContent,
    NavigationBar,
    NavigationBarItem
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
      this.checked = []
      this.isAll = true
    },
    clickAll (id) {
      if (this.edit === false) {
        if (this.checked.filter(function (bid) {
          return id === bid
        }).length !== 0) {
          this.checked = this.checked.filter(function (bid) {
            return bid !== id
          })
        } else {
          this.checked.push(id)
        }
      } else {
        this.$router.push({name: 'detail', params: {id: id}})
      }
    },
    all () {
      this.checked = []
      for (var i = this.books.length - 1; i >= 0; i--) {
        this.checked.push(this.books[i].id)
      }
      this.isAll = !this.isAll
    },
    cancel () {
      this.checked = []
      this.isAll = !this.isAll
    },
    remove () {
      for (var i = this.checked.length - 1; i >= 0; i--) {
        this.$store.commit('remove', this.checked[i])
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
  .status{
    text-align: right;
    transform: scale(0.8);
    color: orange;
  }
  .update{
    text-align: right;
    transform: scale(0.8);
    color: green;
  }
  .check{
    border-radius: 100%;
    width: 15px;
    height: 15px;
    position: absolute;
    top: -8px;
    right: 5px;
    opacity: 0.4;
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
</style>
