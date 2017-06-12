<template>
  <div class="chapter" style="display: flex;">
    <toast ref="toast"></toast>
    <div style="flex-grow: 1; position: relative; display: flex;">
      <touch ref="root" @swipeleft="swipeleft" @tap="tap" @swiperight="swiperight" :style="{transform: `translateX(${pandistance}px)`, 'position': 'relative', 'flex-grow': 1, 'overflow': pandistance !== 0 ? 'visible' : 'hidden'}">
        <page v-if="pages[page - 1]" :page="`${page}/${pages.length}`" :chapter="title" :data="pages[page - 1]" :fontSize="fontSize" :fontFamily="fontFamily" style="transform: translateX(-100%)" :page-color="background" :font-color="color">
        </page>
        <page ref="page" :page="`${page + 1}/${pages.length}`" :chapter="title" :data="pages[page]" can-pull-tag :fontSize="fontSize" :fontFamily="fontFamily" @tagstart="taging = true" @tagend="taging = false" @panHorizontal="panHorizontal" @panend="panend" @tag="tag" @untag="untag"  :page-color="background" :font-color="color">
          <div style="height: 0; overflow: hidden">
            <div class="buffer" ref="buffer" style="visibility: hidden"></div>
          </div>
        </page>
        <page v-if="pages[page + 1]" :page="`${page + 2}/${pages.length}`" :chapter="title" :data="pages[page + 1]" :fontSize="fontSize" :fontFamily="fontFamily" style="transform: translateX(100%)" :page-color="background" :font-color="color">
        </page>
      </touch>
      <loading v-model="loading" background="#fff" color="#222"></loading>
    </div>
  </div>
</template>
<script>
import Loading from '@/components/Loading'
import Toast from '@/components/Toast'
import Page from '../Page'
import Paging from '../lib/page.js'
export default {
  name: 'Chapter',
  components: {
    Page,
    Loading,
    Toast
  },
  props: {
    book: {
      type: Object,
      require: true
    },
    chapter: {
      type: Number,
      default: 0
    },
    isprev: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: '#fff'
    },
    color: {
      type: String,
      default: '#222'
    }
  },
  watch: {
    chapter: function (value) {
      this.page = 0
      this.pages.splice(0, this.pages.length)
      this.refresh()
    },
    fontFamily: function (value) {
      this.refresh()
    },
    fontSize: function (value) {
      this.refresh()
    }
  },
  data () {
    return {
      pages: [],
      title: '',
      pandistance: 0,
      page: 0,
      loading: false,
      taging: false,
      velocity: require('velocity-animate')
    }
  },
  computed: {
    fontSize () {
      return this.$store.getters['read/fontSize']
    },
    fontFamily () {
      return this.$store.getters['read/fontFamily']
    }
  },
  methods: {
    refresh: async function () {
      this.loading = true
      if (this._paging) {
        this._paging.distroy()
      }
      this.pages.splice(0, this.pages.length)
      const value = this.chapter
      this.title = this.book.structure[value].chapter
      let _structure = this.book.structure[value]
      if (_structure.pages !== undefined && _structure.pages.fontSize === this.fontSize && _structure.pages.fontFamily === this.fontFamily) {
        this.pages.splice(0, this.pages.length, ..._structure.pages.data)
        console.log(this.book.structure)
        console.log('原来分好了已经', this.pages)
        if (this.isprev) {
          this.page = this.pages.length - 1
        }
        this.loading = false
      } else {
        if (_structure.data === undefined) {
          await new Promise((resolve, reject) => {
            this.$http.get(`/reading/book/${this.book.info.id}/chapter`, {
              params: {
                identifier: this.book.structure[value].identifier
              }
            })
            .then(response => {
              _structure.data = response.data
              this.paging(value)
              resolve()
            })
            .catch(error => {
              console.error(error)
              reject()
            })
          })
        } else {
          this.paging(value)
        }
      }
    },
    paging (value) {
      var _structure = this.book.structure[value]
      this.pages.splice(0, this.pages.length)
      this._paging = new Paging()
      this._paging.on('start', () => {
        this.loading = true
        console.log('start', new Date())
      })
      this._paging.on('destroyed', () => {
        // delete _structure.pages
        console.log('destroyed')
      })
      this._paging.on('finish', () => {
        // console.log(this.pages)
        console.log('finish', value)
        var pages = {
          fontSize: this.fontSize,
          fontFamily: this.fontFamily
        }
        pages.data = this.pages.slice(0)
        _structure.pages = pages
        setTimeout(() => {
          console.log(this.pages)
          if (this.isprev) {
            this.page = this.pages.length - 1
          }
          this.loading = false
        }, 10)
        // console.error('finish')
        // this.$emit('paged', this.chapter, pages)
        // console.log('finish', new Date())
        // console.log(this.pages)
      })
      this._paging.on('page', (page) => {
        this.pages.push(page)
      })
      this.$refs.buffer.innerHTML = ''
      let height = this.$refs.page.getContentHeight()
      this._paging.start(this.$refs.buffer, height, _structure.data.paragraphs, _structure.data.chapter)
    },
    panHorizontal (e) {
      this.velocity(this.$refs.root.$el, 'finish')
      if (this.pages.length === 1) {
        this.$emit('panHorizontal', e)
        return
      }
      if (this.page <= 0) {
        if (e <= 0) {
          this.pandistance = e
        } else {
          this.pandistance = 0
          this.$emit('panHorizontal', e)
        }
      } else if (this.page >= this.pages.length - 1) {
        if (e >= 0) {
          this.pandistance = e
        } else {
          this.pandistance = 0
          this.$emit('panHorizontal', e)
        }
      } else {
        this.pandistance = e
      }
    },
    panend () {
      if (this.swiped) {
        this.swiped = false
        return
      }
      const width = this.$refs.page.$el.offsetWidth
      if (this.pandistance >= width / 2) {
        this.prev()
      } else if (this.pandistance <= -width / 2) {
        this.next()
      } else {
        this.reset()
      }
      this.$emit('panend')
    },
    swipeleft () {
      if (!this.taging) {
        this.swiped = true
        this.next()
      }
    },
    swiperight () {
      if (!this.taging) {
        this.swiped = true
        this.prev()
      }
    },
    tap (e) {
      var width = window.innerWidth
      if (e.center.x < width / 3) {
        this.prev()
      } else if (e.center.x > width * 2 / 3) {
        this.next()
      } else {
        this.$emit('tap')
      }
    },
    prev () {
      this.velocity(this.$refs.root.$el, 'finish')
      setTimeout(() => {
        if (this.page > 0) {
          console.log('prev')
          this.velocity(this.$refs.root.$el, 'finish')
          const width = this.$refs.page.$el.offsetWidth
          if (this.pandistance === 0) {
            this.pandistance = 1
          }
          this.velocity(this.$refs.root.$el, {translateX: [width, this.pandistance]}, [0.3, 0.5, 0.29, 0.99], () => {
            this.$refs.root.$el.style.transform = 'translateX(0)'
            this.pandistance = 0
            this.page--
          })
        } else {
          this.$emit('swiperight')
        }
      }, 50)
    },
    next () {
      this.velocity(this.$refs.root.$el, 'finish')
      setTimeout(() => {
        if (this.page < this.pages.length - 1) {
          console.log('next')
          const width = this.$refs.page.$el.offsetWidth
          if (this.pandistance === 0) {
            this.pandistance = -1
          }
          this.velocity(this.$refs.root.$el, {translateX: [-width, this.pandistance]}, [0.3, 0.5, 0.29, 0.99], () => {
            this.$refs.root.$el.style.transform = 'translateX(0)'
            this.pandistance = 0
            this.page++
          })
        } else {
          this.$emit('swipeleft')
        }
      }, 50)
    },
    reset () {
      this.velocity(this.$refs.root.$el, {translateX: [0, this.pandistance]}, [0.3, 0.5, 0.29, 0.99], () => {
        this.pandistance = 0
      })
    },
    tag (e) {
      e.tag = true
      this.$http.post(`/reading/book/${this.book.info.id}/bookmark`, {
        chapter: this.book.structure[this.chapter].identifier,
        paragraph: e.paragraph,
        word: e.offset
      })
      .then(response => {
        response.data.detail = e.data.join('')
        this.book.tagData.push(response.data)
        this.$refs.toast.open('添加书签成功')
      })
      .catch(() => {
        e.tag = false
        this.$refs.toast.open('添加书签失败')
      })
    },
    untag (e) {
      e.tag = false
      this.book.tagData = this.book.tagData.filter((value) => {
        if (value.chapter === this.book.structure[this.chapter].identifier) {
          if (value.paragraph > e.paragraph && value.paragraph < e.paragraph + e.data.length - 1) {
            return false
          } else if (value.paragraph === e.paragraph && value.word >= e.offset) {
            return false
          } else if (value.paragraph === e.paragraph + e.data.length - 1 && value.word < e.data[e.data.length - 1].length) {
            return false
          } else {
            return true
          }
        }
        return true
      })
    }
  },
  mounted () {
    this.refresh()
  },
  beforeDestroy () {
    if (this._paging) {
      this._paging.distroy()
    }
  }
}
</script>
<style lang="stylus" scoped>
.chapter{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
