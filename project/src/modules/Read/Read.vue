<template>
  <div class="read" :style="'filter: brightness('+ brightness +')'">
    <navigation-bar title="读书" class="navigation" :show="show">
      <navigation-bar-item slot="left" icon="back" text="返回" @tap="back" :disable="$store.state.read.showmore"/>
      <navigation-bar-item slot="right" icon="shop" :disable="$store.state.read.showmore"/>
      <navigation-bar-item slot="right" icon="more" @tap="more" :disable="$store.state.read.showmore"/>
    </navigation-bar>
    <touch class="content" @tap="tap" @panstart="panstart" @panmove="panHorizontal" :pan-options="{ direction: 'horizontal', threshold: 4}" @panend="panend" @swipeleft="swipeleft" @swiperight="swiperight">
      <div >
        <page v-if="pages[page - 1]" :tag="pages[page - 1].tag" :can-pull-tag="!paning" :class="{trans: !paning, prev: true}" @tagstart="tagstart" @tagend="tagend" :chapter="pages[page - 1].chapter" :page="pages[page - 1].count" @tag="pages[page - 1].tag=true" @untag="pages[page - 1].tag=false" :style="'transform: translateX(' + pandistance + 'px) translateZ(0)'" :page-color="background" :font-color="fontColor">
          <div id="pageContentWrapper" class="pageContentWrapper" style="width: 100%;" :style="{'font-family': fontFamilys[fontFamily],'font-size':fontSize+'px'}">
            <div :class="{noindent: !pages[page - 1].start}">
              <p v-for="(parts, index) in pages[page - 1].data">{{parts}}<span v-if="!pages[page - 1].end && index + 1 === pages[page - 1].data.length" style="display:inline-block; padding-left: 100%;"></span></p>
            </div>
          </div>
        </page>
      </div>
      <div>
        <page v-if="pages[page + 1]" :tag="pages[page + 1].tag" :can-pull-tag="!paning" :class="{trans: !paning, next: true}" @tagstart="tagstart" @tagend="tagend" :chapter="pages[page + 1].chapter" :page="pages[page + 1].count" @tag="pages[page + 1].tag=true" @untag="pages[page + 1].tag=false" :style="'transform: translateX(' + pandistance + 'px) translateZ(0)'" :page-color="background" :font-color="fontColor">
          <div id="pageContentWrapper" class="pageContentWrapper" style="width: 100%;" :style="{'font-family': fontFamilys[fontFamily],'font-size':fontSize+'px'}">
            <div :class="{noindent: !pages[page + 1].start}">
              <p v-for="(parts, index) in pages[page + 1].data">{{parts}}<span v-if="!pages[page + 1].end && index + 1 === pages[page + 1].data.length" style="display:inline-block; padding-left: 100%;"></span></p>
            </div>
          </div>
        </page>
      </div>
      <div>
        <page :tag="pages[page] ? pages[page].tag : false" :can-pull-tag="!paning" :class="{trans: !paning}" @tagstart="tagstart" @tagend="tagend" :chapter="pages[page] ? pages[page].chapter : ''" :page="pages[page] ? pages[page].count : ''" @tag="pages[page].tag=true" @untag="pages[page].tag=false" :style="'transform: translateX(' + pandistance + 'px) translateZ(0)'" :page-color="background" :font-color="fontColor">
          <div id="pageContentWrapper" class="pageContentWrapper" style="width: 100%;" :style="{'font-family': fontFamilys[fontFamily],'font-size':fontSize+'px'}">
            <div style="height: 0; overflow: hidden">
              <div class="buffer" style="visibility: hidden"></div>
            </div>
            <div v-if="pages[page]" :class="{noindent: !pages[page].start}">
              <p v-for="(parts, index) in pages[page].data">{{parts}}<span v-if="!pages[page].end && index + 1 === pages[page].data.length" style="display:inline-block; padding-left: 100%;"></span></p>
            </div>
          </div>
        </page>
      </div>
    </touch>
    <bottom-bar class="bottomBar" :show="show">
      <bottom-bar-item icon="list" @tap="toc"/>
      <!-- <bottom-bar-item icon="slider"/> -->
      <bottom-bar-item icon="light" @tap="modalShow='light'" :active="modalShow==='light'"/>
      <bottom-bar-item icon="font" @tap="modalShow='font'" :active="modalShow==='font'"/>
    </bottom-bar>
    <bottom-modal :show="modalShow !== '' && show">
      <div v-if="modalShow==='light'" style="padding: 0 1em">
        <range :min="0.3" :max="1" v-model="brightness" style="height: 53px;">
          <icon slot="left" name="light" style="width: 20px;height:100%;margin-right: 15px;color:#5a6773"></icon>
          <icon slot="right" name="light" style="width: 25px;height:100%;margin-left: 15px;color: #5a6773"></icon>
        </range>
        <div style="height: 53px; display: flex;justify-content: space-between;align-items: center;">
          <color-block style="height: 26px; width: 20%;" color="#f8f8f8" border :active="background==='#f8f8f8'" @tap="setColor('#f8f8f8', '#000')"></color-block>
          <color-block style="height: 26px; width: 20%;" color="#f1e5ca" border :active="background==='#f1e5ca'" @tap="setColor('#f1e5ca', '#000')"></color-block>
          <color-block style="height: 26px; width: 20%;" color="#C7EDCC" border :active="background==='#C7EDCC'" @tap="setColor('#C7EDCC', '#000')"></color-block>
          <color-block style="height: 26px; width: 20%;" color="#2d3035" border :active="background==='#191d25'" @tap="setColor('#191d25', '#78797d')"></color-block>
        </div>
      </div>
      <div v-if="modalShow==='font'">
        <range :min="0" :max="6" :step="1" v-model="cfontSize" @end="setFontSize" style="height: 53px;padding: 0 1em">
          <icon slot="left" name="a" style="width: 15px;height:100%;margin-right: 15px;color:#5a6773"></icon>
          <icon slot="right" name="a" style="width: 20px;height:100%;margin-left: 15px;color: #5a6773"></icon>
        </range>
        <container divider ></container>
        <touch style="height: 53px;width: 100%; padding: 0 2em; line-height: 53px; text-align: center; box-sizing: border-box" :style="{'font-family': fontFamilys[fontFamily]}" @tap="showFontselector">{{fontFamily}}</touch>
      </div>
    </bottom-modal>
    <action-sheet :show="fontSelector" @cancel="cancelFontSelector">
      <scroller style="height: 159px">
        <action-sheet-button v-for="(fontFamily, index) in fontFamilys" :key="index" @tap="setFontFamily(index)" :text="index" :style="{'font-family': fontFamily}"></action-sheet-button>
      </scroller>
    </action-sheet>
    <toc-modal :show="this.$store.state.read.showtoc" @show="tocShow" @hide="tocHide" @cancel="closeToc">
      <navigation-bar title="霸气侧漏的书籍信息"></navigation-bar>
      <div style="flex-grow:1; position:relative">
        <toc v-if="tocTab === 'toc'" :data="getTocData()"></toc>
        <div v-else-if="tocTab === 'tags'">书签</div>
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
import {BottomBar, BottomBarItem} from '@/components/BottomBar'
import {ActionSheet, ActionSheetItem, ActionSheetButton} from '@/components/ActionSheet'
import ButtonItem from '@/components/ButtonItem'
import Range from '@/components/Range'
import Icon from '@/components/Icon'
import Toc from '@/components/Toc'
import ColorBlock from '@/components/ColorBlock'
import Container from '@/components/Container'
import Scroller from '@/components/Scroller'
import TocModal from './TocModal'
import BottomModal from './BottomModal'
import Page from './Page'
import Paging from './lib/page.js'
import bounce from './lib/bounce.js'
export default {
  name: 'read',
  components: {
    NavigationBar,
    NavigationBarItem,
    BottomBar,
    BottomBarItem,
    Page,
    ActionSheet,
    ActionSheetItem,
    ActionSheetButton,
    ButtonItem,
    TocModal,
    Toc,
    Range,
    Icon,
    ColorBlock,
    BottomModal,
    Container,
    Scroller
  },
  data () {
    return {
      show: false,
      pages: this.$store.state.read.pages,
      finish: false,
      pandistance: 0,
      paning: false,
      showToc: false,
      tocTab: 'toc',
      fontFamilys: {
        '系统字体': 'initial',
        '思源宋体': 'SourceHanSerif',
        '思源黑体': 'SourceHanSans'
      },
      brightness: 1,
      modalShow: '',
      background: '#fff',
      fontColor: '#000',
      fontSelector: false,
      cfontSize: 1,
      fontSize: 16,
      book: undefined
    }
  },
  computed: {
    page () {
      return this.$store.state.read.page
    },
    fontFamily () {
      return this.$store.getters.fontFamily
    }
  },
  watch: {
    show: function (val) {
      this.refreshStatusBar()
    },
    fontFamily: function (val) {
      this.pages.splice(0, this.pages.length)
      this.paging(0)
    }
  },
  methods: {
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
            name: value.chapter,
            lock: isLock(index),
            cache: value.data !== undefined
          }
        })
      } else {
        return []
      }
    },
    back () {
      this.$router.back()
    },
    more () {
      console.log('moretap')
      this.$store.state.read.showmore = true
    },
    closeMore () {
      this.$store.state.read.showmore = false
    },
    tocShow () {
      this.$store.commit('addmodal', this.closeToc)
    },
    tocHide () {
      this.$store.commit('removemodal', this.closeToc)
    },
    toc () {
      this.$store.state.read.showtoc = true
    },
    closeToc () {
      this.$store.state.read.showtoc = false
    },
    setColor (color, fontColor) {
      this.background = color
      this.fontColor = fontColor
    },
    showFontselector () {
      this.fontSelector = true
    },
    setFontFamily (fontFamily) {
      this.fontFamily = fontFamily
      this.$store.commit('setFontFamily', fontFamily)
      this.fontSelector = false
    },
    setFontSize (size) {
      this.$store.commit('setFontSize', size)
      this.fontSize = 14 + size * 2
      this.pages.splice(0, this.pages.length)
      this.paging(0)
    },
    cancelFontSelector () {
      this.fontSelector = false
    },
    tap (e) {
      var width = window.innerWidth
      // var height = window.innerHeight
      if (this.show) {
        this.show = false
      } else {
        if (e.center.x < width / 3) {
          this.prev()
        } else if (e.center.x > width * 2 / 3) {
          this.next()
        } else {
          this.show = true
          this.modalShow = ''
        }
      }
    },
    refreshStatusBar () {
      // console.log(this.show)
      if (this.$statusBar && this.$platform === 'ios') {
        if (!this.show) {
          this.$statusBar.hide()
        } else {
          this.$statusBar.show()
        }
      }
    },
    prev () {
      // this.tag = true
      console.log('to prev page')
      if (this.finish) {
        this.pageReset()
        setTimeout(this.swiperight, 50)
      }
      // if (this.$store.state.read.page > 0) {
      //   this.$store.state.read.page--
      // }
      // console.log(this.pages[this.$store.state.read.page])
    },
    next () {
      // this.tag = false
      console.log('to next page')
      if (this.finish) {
        this.pageReset()
        setTimeout(this.swipeleft, 50)
      }
      // if (this.$store.state.read.page + 1 < this.pages.length) {
      //   this.$store.state.read.page++
      // }
      // console.log(this.pages[this.$store.state.read.page])
    },
    panstart (e) {
      if (this.finish) {
        if (!this.taging) {
          this.show = false
          this.pageReset()
          this.fixdistance = e.deltaX
        }
      }
    },
    panHorizontal (e) {
      if (this.finish) {
        if (!this.taging && this.paning) {
          if ((this.$store.state.read.page <= 0 && e.deltaX > 0) || (this.$store.state.read.page >= this.pages.length - 1 && e.deltaX < 0)) {
            this.pandistance = bounce(e.deltaX - this.fixdistance)
          } else {
            this.pandistance = e.deltaX - this.fixdistance
          }
        }
      }
    },
    panend (e) {
      if (this.finish) {
        if (!this.taging && this.paning) {
          var width = window.innerWidth
          // console.log(e.deltaX - this.fixdistance - this.pandistance)
          // console.log(new Date().getTime() - this.pantime)
          if (this.pandistance < -width * 0.5 && this.$store.state.read.page + 1 < this.pages.length) {
            this.pandistance = -width
          } else if (this.pandistance > width * 0.5 && this.$store.state.read.page > 0) {
            this.pandistance = width
          } else {
            this.pandistance = 0
          }
          this.paning = false
        }
      }
    },
    swiperight () {
      // console.log('swiperight')
      if (this.finish) {
        this.paning = false
        // this.paning = true
        // if (this.pandistance < 0) {
        //   this.$store.state.read.page++
        // }
        // if (this.pandistance > 0) {
        //   this.$store.state.read.page--
        // }
        // this.paning = false
        if (this.$store.state.read.page > 0 && !this.taging) {
          var width = window.innerWidth
          this.pandistance = width
        }
      }
    },
    swipeleft () {
      // console.log('swipeleft')
      // if (this.pandistance < 0) {
      //   this.$store.state.read.page++
      // }
      // if (this.pandistance > 0) {
      //   this.$store.state.read.page--
      // }
      // this.paning = false
      if (this.finish) {
        this.paning = false
        if (this.$store.state.read.page + 1 < this.pages.length && !this.taging) {
          var width = window.innerWidth
          this.pandistance = -width
        }
      }
    },
    pageReset () {
      this.paning = true
      if (this.pandistance < 0) {
        this.$store.state.read.page++
      }
      if (this.pandistance > 0) {
        this.$store.state.read.page--
      }
      this.pandistance = 0
    },
    tagstart () {
      this.show = false
      this.taging = true
    },
    tagend () {
      this.taging = false
    },
    getData: function () {
      var dataElement = this.$el.getElementsByClassName('text')[0].getElementsByTagName('p')
      var data = []
      Array.prototype.forEach.call(dataElement, function (value) {
        data.push(value.textContent)
      })
      return data
    },
    paging: function (chapterIndex) {
      console.log(chapterIndex)
      this.pageReset()
      this.finish = false
      var buffer = this.$el.getElementsByClassName('buffer')[0]
      var height = this.$el.getElementsByClassName('pageContentWrapper')[0].offsetHeight
      // var data = this.getData()
      this.$http.get('/reading/book/' + this.book.info.id + '/chapter', {
        params: {
          'identifier': this.book.structure[chapterIndex].identifier
        }
      })
      .then(response => {
        var chapter = response.data.chapter
        var paragraphs = response.data.paragraphs
        this.book.structure[chapterIndex].data = paragraphs
        if (this._paging) {
          this._paging.distroy()
        }
        this._paging = new Paging()
        // console.log(data.length)
        // console.log(this.$el.getElementsByClassName('text')[0].textContent.length)
        // this.$el.getElementsByClassName('text')[0]
        this._paging.on('start', () => {
          this.startTime = new Date().getTime()
        })
        this._paging.on('finish', () => {
          // this.finish = true
          if (this.page >= this.pages.length) {
            this.$store.state.read.page = this.pages.length - 1
          }
          if (chapterIndex + 1 < this.book.structure.length) {
            setTimeout(() => {
              this.paging(chapterIndex + 1)
            }, 0)
          }
          console.log(this.pages)
          console.log(new Date().getTime() - this.startTime)
        })
        this._paging.on('page', (page) => {
          this.pages.push(page)
          if (this.pages.length > this.$store.state.read.page + 2) {
            this.finish = true
          }
        })
        buffer.innerHTML = ''
        this._paging.start(buffer, height, paragraphs, chapter)
      })
      .catch(err => {
        this.finish = true
        this.pages.push({
          data: ['完']
        })
        console.log(err)
      })
    }
  },
  activated () {
    this.show = false
    this.refreshStatusBar()
    this.cfontSize = this.$store.getters.fontSize
    this.fontSize = 14 + this.cfontSize * 2
    this.$http.get('/reading/book/' + this.$route.query.bookid)
    .then(response => {
      console.log(response)
      this.book = response.data
      this.paging(0)
    })
    .catch(err => {
      console.err(err)
    })
  },
  deactivated () {
    this.showmore = false
    this.refreshStatusBar()
  },
  mounted () {
    console.log(this.$route.query.bookid)
    this.$store.state.read.bookid = this.$route.query.bookid
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
    flex: 1;
    display: flex;
    .prev{
      left: -100%;
      right: 100%;
    }
    .next{
      left: 100%;
      right: -100%;
    }
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
    // font-family: SourceHanSerif;
  }
  .noindent>:first-child{
    text-indent: 0em;
  }
  .buttonItem{
    height: 53px;
  }
  // .pageContentWrapper p {
  //   -webkit-margin-before: 0.5em;
  //   -webkit-margin-after: 0.5em;
  // }
  // .pageContent p:first-child{
  //   -webkit-margin-before: 0em;
  // }
  // ::-webkit-scrollbar{width:0px;}
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
