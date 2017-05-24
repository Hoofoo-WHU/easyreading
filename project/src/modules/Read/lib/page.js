var EventEmitter2 = require('eventemitter2').EventEmitter2
// var _ = require('lodash')
const fuhao = [',', '。', ',', '？', '！', '，', '、', '；', '：', '「', '」', '『', '』', '‘', '’', '“', '”', '（', '）', '〔', '〕', '【', '】', '—', '…', '–', '．', '《', '》', '〈', '〉']

function Paging () {
  var emitter = new EventEmitter2()
  var emit = function () {
    EventEmitter2.prototype.emit.apply(emitter, arguments)
  }
  var state = {
    paging: false,
    cut: false,
    count: 0,
    newPage: true,
    paragraph: 0,
    offset: 0
  }
  var para = {
    buffer: null,
    height: null,
    data: null,
    chapter: null
  }
  var Page = function (chapter) {
    this.chapter = chapter
    this.start = true
    this.end = true
    this.count = 0
    this.data = []
    this.tag = false
    this.paragraph = 0
    this.offset = 0
  }
  var page
  // 生命周期
  this.start = (buffer, height, data, chapter) => {
    buffer !== undefined ? para.buffer = buffer : console.error('缺少buffer')
    height !== undefined ? para.height = height : console.error('缺少height')
    data !== undefined ? para.data = data.slice(0) : console.error('缺少data')
    chapter !== undefined ? para.chapter = chapter : console.error('缺少chapter')
    emit('start')
    _start()
  }
  this.cancel = () => {
    state.paging = false
    emit('cancel')
  }
  this.distroy = () => {
    state.paging = false
    emit('destroyed')
    emitter.removeAllListeners()
  }
  this.on = function () {
    EventEmitter2.prototype.on.apply(emitter, arguments)
  }
  var _start = () => {
    state.paging = true
    page = new Page(para.chapter)
    setTimeout(_paging, 0)
  }
  var _paging = () => {
    if (state.paging) {
      if (para.data.length > 0) {
        var part = para.data.shift()
        var p = document.createElement('p')
        if (state.newPage && state.cut) {
          // console.log('newpage cut')
          p.style.textIndent = 0
        }
        state.newPage = false
        p.textContent = part[0]
        para.buffer.appendChild(p)
        if (para.buffer.offsetHeight > para.height) {
          page.start = !state.cut
          state.cut = false
          page.end = true
          page.count = ++state.count
          p.remove()
          para.data.unshift(part)
          page.paragraph = state.paragraph
          page.offset = state.offset
          state.offset = 0
          emit('page', page)
          if (!page.end) {
            state.paragraph += page.data.length - 1
          } else {
            state.paragraph += page.data.length
          }
          para.buffer.innerHTML = ''
          page = new Page(para.chapter, state.paragraph)
          state.newPage = true
        } else {
          p.textContent = part
          if (para.buffer.offsetHeight > para.height) {
            page.start = !state.cut
            page.end = false
            page.count = ++state.count
            state.cut = true
            p.textContent = ''
            while (para.buffer.offsetHeight <= para.height) {
              p.textContent = part.slice(0, p.textContent.length + 8)
            }
            while (para.buffer.offsetHeight > para.height || fuhao.includes(p.textContent.slice(-1))) {
              p.textContent = p.textContent.slice(0, -1)
            }
            p.textContent = p.textContent.slice(0, -1)
            page.data.push(p.textContent)
            para.data.unshift(part.slice(p.textContent.length))
            page.paragraph = state.paragraph
            page.offset = state.offset
            state.offset = p.textContent.length
            emit('page', page)
            if (!page.end) {
              state.paragraph += page.data.length - 1
            } else {
              state.paragraph += page.data.length
            }
            para.buffer.innerHTML = ''
            page = new Page(para.chapter, state.paragraph)
            state.newPage = true
          } else {
            page.data.push(part)
          }
        }
        setTimeout(_paging, 0)
      } else {
        page.start = !state.cut
        page.end = true
        page.count = ++state.count
        page.paragraph = state.paragraph
        page.offset = state.offset
        emit('page', page)
        if (!page.end) {
          state.paragraph += page.data.length - 1
        } else {
          state.paragraph += page.data.length
        }
        emit('finish')
      }
    } else {
      emit('cancel')
    }
  }
}
export default Paging
