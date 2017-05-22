<template>
  <div class="app">
    <ul class="x-title">
      <li v-on:click="tab(index)" v-for="(item, index) in items" :key="" :class="{active: activeIndex === index}">{{item.title}}</li>
    </ul>
    <div><list-item v-for="(content, ind) in items[activeIndex].contents" :key="ind" icon="" :text="content.con" style="color:grey;height:50px;line-height:50px"></list-item>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem'
export default {
  name: 'app',
  components: {
    ListItem
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  methods: {
    tab: function (index) {
      this.activeIndex = index
    }
  }
}
</script>


<style scoped>
.app {
  width: 100%;
  background-color: #fff;
}
.x-title{
  height: 40px;
  line-height: 40px;
  width: 100%;
  display: -webkit-box;
}
.x-title li{
  display: block;
  text-decoration: none;
  color: #000;
  font-style: normal;
  font-size: 14px;
  text-align: center;
  -webkit-box-flex: 1;
  border-bottom:1px solid #e5f0ff;
}
.active{
  background-color: #e5f0ff;
}
.x-content{
  color:grey;
  display:block;
  height:40px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 4%;
  border-bottom:1px solid #efeff4;
}
</style>

