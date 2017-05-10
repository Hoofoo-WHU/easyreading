<template>
  <div id="book">
    <div class="cover">
      <!-- <img :src="cover" alt="" width="100%" > -->
      <img src="../3310.jpg" alt="" width="100%">
      <icon v-if="!edit" name="unchecked" class="icon" :class='{gray:!isEdit, blue:isEdit}'/>
    </div> 
    <div>{{title}}</div>  
    <!-- <icon v-else name="checked" class="icon" /> -->
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
  .icon{
    width: 20%;
    height: 20%;
    position: absolute;
    left: 78%;
    top: 78%;
    transition: all .3s;
  }
  .blue{
    color: #33AECC;
  }
  .gray{
    color: gray;
  }
</style>
