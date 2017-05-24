<template>
  <div v-if="tags.length === 0" class="empty">
    <Icon name="tagempty" style="height: 80px; width: 100%;"></Icon>
    <p>未添加书签</p>
    <p class="tips">在阅读时向下拉动屏幕可以添加书签</p>
  </div>
  <scroller v-else style="flex-grow: 1">
  <div v-for="item in tags">
    <div style="font-family: SourceHanserif; padding-left: 22px; margin-top: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;border-left: 3px solid #157afb;">{{item.chapter}}</div>
    <button-item class="button border" v-for="(tag, index) in item.tags" :key="index" @tap="tap(tag, item.index)">
      <span style="display: -webkit-box;line-clamp: 3;box-orient: vertical;overflow: hidden;text-align:justify;">{{tag.detail}}</span>
    </button-item>
  </div>
  </scroller>
</template>

<script>
import Scroller from '@/components/Scroller'
import ButtonItem from '@/components/ButtonItem'
import Icon from '@/components/Icon'
export default {
  name: 'Tag',
  components: {
    Scroller,
    ButtonItem,
    Icon
  },
  props: {
    book: {
      type: Object,
      require: true
    }
  },
  watch: {
    data (value) {
      this.tags.splice(0, this.tags.length)
      this.book.structure.forEach((chapter, index) => {
        let _tag = value.filter(tag => {
          return tag.chapter === chapter.identifier
        })
        .sort((a, b) => {
          if (a.paragraph !== b.paragraph) {
            return a.paragraph - b.paragraph
          } else {
            return a.word - b.word
          }
        })
        if (_tag.length > 0) {
          this.tags.push({index: index, chapter: chapter.chapter, tags: _tag})
        }
      })
    }
  },
  data () {
    return {
      data: [],
      tags: []
    }
  },
  methods: {
    tap (tag, index) {
      this.$emit('tap', tag, index)
    }
  },
  mounted () {
    this.data = this.book.tagData
  }
}
</script>

<style lang="stylus" scoped>
.empty{
  height: intrinsic;
  flex-grow: 1;
  align-self: center;
  color: #999;
  p{
    text-align: center;
    margin: 20px 0;
    font-size: 14px;
  }
  .tips{
    color: #ccc;
  }
}
.button{
  font-size: 12px;
  padding:  1em 22px;
  box-sizing: border-box;
  overflow: visible;
}
.border:before{
  content: none;
}
.border:after{
  content: '';
  position: absolute;
  left: 22px;
  right: 0;
  bottom: -1px;
  border-bottom: 1px solid #c8c7cc;
  transform-origin: left top;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2.0),
only screen and (min--moz-device-pixel-ratio: 2.0),
only screen and (-o-min-device-pixel-ratio: 200/100),
only screen and (min-device-pixel-ratio: 2.0) {
  .border:after {
    transform: scaleY(0.5);
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2.5),
only screen and (min--moz-device-pixel-ratio: 2.5),
only screen and (-o-min-device-pixel-ratio: 250/100),
only screen and (min-device-pixel-ratio: 2.5) {
  .border:after {
    transform: scaleY(0.4);
  }
}
</style>
