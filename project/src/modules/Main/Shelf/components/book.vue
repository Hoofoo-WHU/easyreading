<template>
  <div id="book">
    <img :src="cover" alt="" width="100%">
    <div>{{title}}</div>
    <div v-if="isUpdate" class="status">XXX未读</div>
    <div v-else class="update">●有更新</div>
    <icon v-if="!edit" name="unchecked" class="icon" :class='{gray:!isEdit, blue:isEdit}'/>
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
      isUpdate: {
        type: Boolean,
        default: true
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
    width: 1.5em;
    height: 1.5em;
    position: absolute;
    left: 58px;
    top: 83px;
    transition: all .3s;
  }
  .blue{
    color: #33AECC;
  }
  .gray{
    color: gray;
  }
</style>
