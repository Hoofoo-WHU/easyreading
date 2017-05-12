<template>
  <div id="book">
    <div class="cover">
      <img src="../3310.jpg" alt="" width="100%">
<!--       <icon v-if="!edit" name="unchecked" class="icon" :class='{gray:!isEdit, blue:isEdit}'/> -->
      <transition name="trs">
        <icon v-if="!edit" name="check" class="check" :class='{gray:!isEdit, blue:isEdit}'/>
      </transition>
    </div> 
    <div>{{title}}</div>  
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
  .status{
    text-align: right;
    transform: 0.5em;
    color: orange;
  }
  .update{
    text-align: right;
    transform: 0.5em;
    color: green;
  }
/*  .icon{
    width: 20%;
    height: 20%;
    position: absolute;
    left: 78%;
    top: 78%;
    transition: all .3s;
  }*/
  .check{
/*    width: 18%;
    height: 18%;*/
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
