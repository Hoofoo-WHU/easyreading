<template>
  <div id="book">
    <div class="cover">
      <img :src="cover" alt="" width="100%">
<!--       <icon v-if="!edit" name="unchecked" class="icon" :class='{gray:!isEdit, blue:isEdit}'/> -->
      <transition name="trs">
        <icon v-if="!edit" name="check" class="check" :class='{gray:!isEdit, blue:isEdit}'/>
      </transition>
    </div> 
    <div class="title">{{title}}</div>  
  </div>
</template>

<script>
  import Icon from '@/components/Icon'

  export default{
    components: {
      Icon
    },
    name: 'Book',
    props: {
      cover: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      isEdit: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: true
      }
    }
    // computed: {
    //   relCover () {
    //     return 'http://oott.me' + this.cover
    //   }
    // }
  }
</script>

<style scoped>
  .cover{
    position: relative;
    width: 100%;
    /*min-height: 10px;*/
    height: 0;
    padding-bottom: 125%;
    overflow: visible;
    margin-bottom: 4%;
    box-shadow: 0 0 30px #d9d9d9;
  }
  .title{
    height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .check{
    width: 10px;
    height: 10px;
    padding: 3px;
    position: absolute;
    right: 3px;
    bottom: 3px;
    color: white;
    border-radius: 100%;
    transition: all .2s;
  }
  .blue{
    background-color: rgba(21, 122, 251, 1);
  }
  .gray{ 
    background-color: rgba(90, 90, 90, 0.6);
  }
  .trs-enter-active, .trs-leave-active{
    transition: transform .3s;
  }
  .trs-enter-active, .trs-leave{
    transform: scale(1);
  }
  .trs-enter, .trs-leave-active{
    transform: scale(0);
  }
</style>
