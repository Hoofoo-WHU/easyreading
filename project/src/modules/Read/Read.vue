<template>
  <div class="read" :style="'filter: brightness('+ this.$store.getters['read/brightness'] +')'">
    <toast ref="toast"></toast>
    <loading v-model="loading"></loading>
    <buy v-model="showBuy" :title="title" :author="author" :price="price" :balance="balance" @buy="buy" @deposit="showDepositModal"></buy>
    <navigation-bar class="navigation" :show="showUi">
      <navigation-bar-item slot="left" icon="back" text="返回" @tap="back"/>
      <navigation-bar-item v-if="!isBought" slot="right" icon="shop" @tap="showBuyModal"/>
      <navigation-bar-item slot="right" icon="more" @tap="more"/>
    </navigation-bar>
    <touch ref="book" class="content" @tap="tap" @panstart="panstart" :style="{transform: `translateX(${pandistance}px)`}">
      <chapter v-if="book && chapter > 0" isprev :book="book" :chapter="chapter - 1" style="transform: translateX(-100%)" :background="background" :color="foreground"></chapter>
      <chapter v-if="book" ref="chapter" :isprev="isprev" :book="book" :chapter="chapter" @swipeleft="swipeleft" @swiperight="swiperight" @panend="panend" @panHorizontal="panHorizontal" :background="background" :color="foreground"></chapter>
      <chapter v-if="book && ((book.info.is_bought && chapter + 1 < book.structure.length) || (!book.info.is_bought && chapter < book.info.trial_chapter - 1))" :book="book" :chapter="chapter + 1" style="transform: translateX(100%)" :background="background" :color="foreground"></chapter>
    </touch>
    <bottom-bar class="bottomBar" :show="showUi">
      <bottom-bar-item icon="list" @tap="showTocModal"/>
      <!-- <bottom-bar-item icon="slider"/> -->
      <bottom-bar-item icon="light" @tap="modalShow='light'" :active="modalShow==='light'"/>
      <bottom-bar-item icon="font" @tap="modalShow='font'" :active="modalShow==='font'"/>
    </bottom-bar>
    <bottom-modal :show="modalShow !== '' && showUi">
      <div v-if="modalShow==='light'" style="padding: 0 1em">
        <range :min="0.3" :max="1" :value="$store.getters['read/brightness']" @input="setBrightness" style="height: 53px;">
          <icon slot="left" name="light" style="width: 20px;height:100%;margin-right: 15px;color:#5a6773"></icon>
          <icon slot="right" name="light" style="width: 25px;height:100%;margin-left: 15px;color: #5a6773"></icon>
        </range>
        <div style="height: 53px; display: flex;justify-content: space-between;align-items: center;">
          <color-block style="height: 26px; width: 20%;" color="#f2f2f2" border :active="background==='#f2f2f2'" @tap="setColor('#f2f2f2', '#222222')"></color-block>
          <color-block style="height: 26px; width: 20%;" color="#f1e5ca" border :active="background==='#f1e5ca'" @tap="setColor('#f1e5ca', '#222222')"></color-block>
          <color-block style="height: 26px; width: 20%;" color="#C7EDCC" border :active="background==='#C7EDCC'" @tap="setColor('#C7EDCC', '#222222')"></color-block>
          <color-block style="height: 26px; width: 20%;" color="#2d3035" border :active="background==='#191d25'" @tap="setColor('#191d25', '#78797d')"></color-block>
        </div>
      </div>
      <div v-if="modalShow==='font'">
        <range :min="0" :max="6" :step="1" v-model="cfontSize" @end="setFontSize" style="height: 53px;padding: 0 1em">
          <icon slot="left" name="a" style="width: 15px;height:100%;margin-right: 15px;color:#5a6773"></icon>
          <icon slot="right" name="a" style="width: 20px;height:100%;margin-left: 15px;color: #5a6773"></icon>
        </range>
        <container divider ></container>
        <touch style="height: 53px;width: 100%; padding: 0 2em; line-height: 53px; text-align: center; box-sizing: border-box" :style="{'font-family': fontFamily}" @tap="showFontselector">{{fontFamilys[fontFamily]}}</touch>
      </div>
    </bottom-modal>
    <action-sheet :show="fontSelector" @cancel="cancelFontSelector">
      <scroller style="height: 159px">
        <action-sheet-button v-for="(value, key) in fontFamilys" :key="key" @tap="setFontFamily(key)" :text="value" :style="{'font-family': key}"></action-sheet-button>
      </scroller>
    </action-sheet>
    <toc-modal :show="showToc" @show="tocShow" @hide="tocHide" @cancel="closeTocModal">
      <div style="flex-grow:1; display: flex;">
        <div v-if="tocTab === 'toc'" style="flex-grow:1; display: flex; flex-direction: column;">
          <navigation-bar>
            <button-item @tap="$router.push({'name': 'detail', 'params': {id: $store.getters['read/bookid']}})">
              <div style="display: flex;align-items: center; flex-grow: 1;">
                <img :src="cover" alt style="width: 36px;height: 45px;box-shadow: 0 0 30px #d9d9d9;margin: 1em;"/>
                <div style="flex-grow: 1; width: 0; padding-right: 1em;">
                  <div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font-family: SourceHanserif;">{{title}}</div>
                  <div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;opacity: 0.5;font-family: SourceHanserif;">{{author}}</div>
                </div>
              </div>
            </button-item>
          </navigation-bar>
          <toc style="flex-grow: 1;" :data="getTocData()" @tap="tocTap"></toc>
        </div>
        <tag v-else-if="tocTab === 'tags'" :book="book" @tap="tagTap">书签</tag>
      </div>
      <bottom-bar>
        <bottom-bar-item text="目录" @tap="tocTab = 'toc'" :active="tocTab === 'toc'"></bottom-bar-item>
        <bottom-bar-item text="书签" @tap="tocTab = 'tags'" :active="tocTab === 'tags'" left-divide></bottom-bar-item>
      </bottom-bar>
    </toc-modal>
  </div>
</template>

<script>
import {NavigationBar, NavigationBarItem} from '@/components/NavigationBar'
import Toast from '@/components/Toast'
import {BottomBar, BottomBarItem} from '@/components/BottomBar'
import {ActionSheet, ActionSheetItem, ActionSheetButton} from '@/components/ActionSheet'
import ButtonItem from '@/components/ButtonItem'
import Range from '@/components/Range'
import Icon from '@/components/Icon'
import Toc from '@/components/Toc'
import ColorBlock from '@/components/ColorBlock'
import Container from '@/components/Container'
import Scroller from '@/components/Scroller'
import Buy from '@/components/Buy'
import Loading from '@/components/Loading'
import TocModal from './TocModal'
import BottomModal from './BottomModal'
import Chapter from './Chapter'
import Tag from './Tag'
import Page from './Page'
import bounce from './lib/bounce.js'
export default {
  name: 'read',
  components: {
    NavigationBar,
    NavigationBarItem,
    Toast,
    BottomBar,
    BottomBarItem,
    Page,
    ActionSheet,
    ActionSheetItem,
    ActionSheetButton,
    ButtonItem,
    TocModal,
    Toc,
    Tag,
    Chapter,
    Range,
    Icon,
    ColorBlock,
    BottomModal,
    Container,
    Scroller,
    Buy,
    Loading
  },
  data () {
    return {
      showUi: false,
      showBuy: false,
      showToc: false,
      balance: undefined,
      paning: false,
      tocTab: 'toc',
      fontFamilys: {
        'initial': '系统字体',
        'SourceHanSerif': '思源宋体',
        'SourceHanSans': '思源黑体'
      },
      modalShow: '',
      fontSelector: false,
      cfontSize: (this.$store.getters['read/fontSize'] - 14) / 2,
      book: undefined,
      loading: false,
      chapter: 0,
      paragraph: 0,
      word: 0,
      pandistance: 0,
      velocity: require('velocity-animate'),
      isprev: false
    }
  },
  computed: {
    isBought () {
      if (this.book) {
        return this.book.info.is_bought
      } else {
        return false
      }
    },
    title () {
      if (this.book) {
        return this.book.info.title
      } else {
        return ''
      }
    },
    author () {
      if (this.book) {
        return this.book.info.author
      } else {
        return ''
      }
    },
    price () {
      if (this.book) {
        return this.book.info.price
      } else {
        return 0
      }
    },
    cover () {
      if (this.book) {
        return this.$http.defaults.baseURL + this.book.info.cover
      } else {
        return ''
      }
    },
    page () {
      return this.$store.state.read.page
    },
    fontFamily () {
      return this.$store.getters['read/fontFamily']
    },
    foreground () {
      return this.$store.getters['read/foreground']
    },
    background () {
      return this.$store.getters['read/background']
    }
  },
  watch: {
    showUi: function (val) {
      if (this.$statusBar) {
        if (val) {
          this.$statusBar.show()
        } else {
          this.$statusBar.hide()
        }
      }
    },
    showBuy: function (val) {
      if (val) {
        this.$store.commit('addmodal', this.hideBuyModal)
      } else {
        this.$store.commit('removemodal', this.hideBuyModal)
      }
    }
  },
  methods: {
    refreshBalance () {
      if (this.balance === undefined) {
        this.$http.get('/personal/balance')
        .then(response => {
          this.balance = response.data.balance_book
        })
      }
    },
    back () {
      this.$router.back()
    },
    showBuyModal () {
      this.refreshBalance()
      this.showBuy = true
    },
    hideBuyModal () {
      this.showBuy = false
    },
    buy () {
      this.loading = true
      this.$http.post(`/bookshopping/book/${this.$route.query.bookid}/buy`)
      .then(response => {
        this.book.info.is_bought = true
        this.loading = false
        this.showBuy = false
        this.$refs.toast.open('购买成功')
      })
      .catch(error => {
        this.loading = false
        this.showBuy = false
        this.$refs.toast.open(error.response.data.reason)
      })
    },
    showDepositModal () {
      console.log('showDepositModal')
    },
    more () {
      this.$store.state.read.showmore = true
    },
    closeMore () {
      this.$store.state.read.showmore = false
    },
    getTocData () {
      if (this.book) {
        var isLock = (index) => {
          if (this.book.info.is_bought) {
            return false
          } else {
            return !this.book.info.allow_trial || index >= this.book.info.trial_chapter
          }
        }
        return this.book.structure.map((value, index) => {
          return {
            identifier: value.identifier,
            name: value.chapter,
            lock: isLock(index),
            cache: value.data !== undefined
          }
        })
      } else {
        return []
      }
    },
    tocShow () {
      this.$store.commit('addmodal', this.closeTocModal)
    },
    tocHide () {
      this.$store.commit('removemodal', this.closeTocModal)
    },
    showTocModal () {
      this.tocTab = 'toc'
      this.showToc = true
    },
    closeTocModal () {
      this.showToc = false
    },
    tocTap (item, index) {
      console.log(item)
      console.log(index)
      if (!item.lock) {
        this.isprev = false
        this.chapter = index
        this.closeTocModal()
        this.showUi = false
      } else {
        this.$refs.toast.open('暂未购买')
      }
    },
    tagTap (tag, index) {
      console.log(tag)
      console.log(index)
    },
    setBrightness (brightness) {
      this.$store.commit('read/brightness', brightness)
    },
    setColor (color, fontColor) {
      this.$store.commit('read/background', color)
      this.$store.commit('read/foreground', fontColor)
    },
    showFontselector () {
      this.fontSelector = true
    },
    setFontFamily (fontFamily) {
      this.$store.commit('read/fontFamily', fontFamily)
      this.fontSelector = false
    },
    setFontSize (size) {
      console.log('size', size)
      this.$store.commit('read/fontSize', 14 + size * 2)
    },
    cancelFontSelector () {
      this.fontSelector = false
    },
    tap (e) {
      var width = window.innerWidth
      if (this.showUi) {
        this.showUi = false
      } else {
        if (e.center.x < width / 3) {
          // this.prev()
        } else if (e.center.x > width * 2 / 3) {
          // this.next()
        } else {
          this.showUi = true
          this.modalShow = ''
        }
      }
    },
    panstart (e) {
      this.showUi = false
    },
    swiperight () {
      this.prev()
      console.log('swiperight')
    },
    swipeleft () {
      this.next()
      console.log('swipeleft')
    },
    next () {
      this.isprev = false
      this.velocity(this.$refs.book.$el, 'finish')
      setTimeout(() => {
        if (this.book.info.is_bought) {
          if (this.chapter < this.book.structure.length - 1) {
            console.log('next')
            const width = this.$refs.chapter.$el.offsetWidth
            if (this.pandistance === 0) {
              this.pandistance = -1
            }
            this.velocity(this.$refs.book.$el, {translateX: [-width, this.pandistance]}, [0.3, 0.5, 0.29, 0.99], () => {
              this.$refs.book.$el.style.transform = 'translateX(0)'
              this.pandistance = 0
              this.chapter++
            })
          }
        } else {
          if (this.chapter < this.book.info.trial_chapter - 1) {
            console.log('next')
            const width = this.$refs.chapter.$el.offsetWidth
            if (this.pandistance === 0) {
              this.pandistance = -1
            }
            this.velocity(this.$refs.book.$el, {translateX: [-width, this.pandistance]}, [0.3, 0.5, 0.29, 0.99], () => {
              this.$refs.book.$el.style.transform = 'translateX(0)'
              this.pandistance = 0
              this.chapter++
            })
          } else {
            this.reset()
          }
        }
      }, 50)
    },
    prev () {
      this.isprev = true
      this.velocity(this.$refs.book.$el, 'finish')
      setTimeout(() => {
        if (this.chapter > 0) {
          console.log('prev')
          this.velocity(this.$refs.book.$el, 'finish')
          const width = this.$refs.chapter.$el.offsetWidth
          if (this.pandistance === 0) {
            this.pandistance = 1
          }
          this.velocity(this.$refs.book.$el, {translateX: [width, this.pandistance]}, [0.3, 0.5, 0.29, 0.99], () => {
            this.$refs.book.$el.style.transform = 'translateX(0)'
            this.pandistance = 0
            this.chapter--
          })
        } else {
          this.reset()
        }
      }, 50)
    },
    reset () {
      this.velocity(this.$refs.book.$el, {translateX: [0, this.pandistance]}, [0.3, 0.5, 0.29, 0.99], () => {
        this.$refs.book.$el.style.transform = 'translateX(0)'
        this.pandistance = 0
      })
    },
    panHorizontal (e) {
      // if (!this.taging && this.paning) {
      //   if ((this.$store.state.read.page <= 0 && e.deltaX > 0) || (this.$store.state.read.page >= this.pages.length - 1 && e.deltaX < 0)) {
      //     this.pandistance = bounce(e.deltaX - this.fixdistance)
      //   } else {
      //     this.pandistance = e.deltaX - this.fixdistance
      //   }
      // }
      if (this.chapter <= 0) {
        this.pandistance = bounce(e)
      } else {
        if (!this.book.info.is_bought) {
          if (this.chapter >= this.book.info.trial_chapter - 1) {
            this.pandistance = bounce(e)
          } else {
            this.pandistance = e
          }
        } else {
          if (this.chapter >= this.book.info.total_chapter) {
            this.pandistance = bounce(e)
          } else {
            this.pandistance = e
          }
        }
      }
    },
    panend (e) {
      console.log('panend')
      var width = window.innerWidth
      if (this.pandistance > width / 2 && this.chapter > 0) {
        this.prev()
      } else if (this.pandistance < -width / 2) {
        this.next()
      } else {
        this.reset()
      }
      // if (!this.taging && this.paning) {
      //   var width = window.innerWidth
      //   // console.log(e.deltaX - this.fixdistance - this.pandistance)
      //   // console.log(new Date().getTime() - this.pantime)
      //   if (this.pandistance < -width * 0.5 && this.$store.state.read.page + 1 < this.pages.length) {
      //     this.pandistance = -width
      //   } else if (this.pandistance > width * 0.5 && this.$store.state.read.page > 0) {
      //     this.pandistance = width
      //   } else {
      //     this.pandistance = 0
      //   }
      //   this.paning = false
      // }
    }
  },
  activated () {
    this.showUi = false
    this.$http.get('/reading/book/' + this.$route.query.bookid)
    .then(response => {
      this.book = response.data
      this.$store.commit('read/bookid', this.book.info.id)
      this.$http.get(`/reading/book/${this.book.info.id}/bookmark`)
      .then(response => {
        this.book.tagData = response.data.results
      })
    })
    .catch(err => {
      console.error(err)
    })
  },
  deactivated () {
  },
  mounted () {
    // console.log(this.$route.query.bookid)
  }
}
</script>

<style lang="stylus" scoped>
.read {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  user-select: none;
  background: #e2e2e2;
  .navigation{
    position: absolute;
    transform: translateY(-100%);
    transition: transform .3s;
    &[show]{
      transform: translateY(0);
    }
  }
  .content{
    flex-grow: 1;
    display: flex;
  }
  .trans{   
    transition: transform .4s cubic-bezier(.3,.5,.29,.99);
  }
  .bottomBar{
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    transition: transform .3s;
    &[show]{
      transform: translateY(0)
    }
  }
  .pageContentWrapper{
    text-indent: 2em;
    text-align: justify;
    line-height: 1.8em;
    font-size: 16px;
    width: 100%;
  }
  .noindent>:first-child{
    text-indent: 0em;
  }
}
</style>
