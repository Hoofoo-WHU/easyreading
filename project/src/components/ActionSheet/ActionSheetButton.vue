<template>
  <action-sheet-item>
    <button-item @tap="tap" class="button">{{text}}</button-item>
  </action-sheet-item>
</template>

<script>
import ButtonItem from '@/components/ButtonItem'
import ActionSheetItem from './ActionSheetItem.vue'
export default {
  name: 'ActionSheetButton',
  components: {
    ButtonItem,
    ActionSheetItem
  },
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    tap () {
      this.$emit('tap')
    }
  }
}
</script>

<style lang="stylus" scoped>
.button{
  height: 53px;
  line-height: 53px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
}
</style>
