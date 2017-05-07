<template>
  <div id="book">
    <img :src="cover" alt="" width="100%">
    <div>{{title}}</div>
    <div v-if="isUpdate" class="status">XXX未读</div>
    <div v-else class="update">●有更新</div>
  </div>
</template>

<script>
  export default{
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
      }
    }
  }
</script>

<style scrope>
  .status{
    text-align: right;
    transform: 0.8em;
    color: orange;
  }
  .update{
    text-align: right;
    transform: 0.8em;
    color: green;
  }
</style>
