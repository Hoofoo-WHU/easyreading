import Paging from './page.js'
var EventEmitter2 = require('eventemitter2').EventEmitter2

var paging
var currChater
var emitter

var BookToPages = class {
  constructor (buffer, pageHeight, book) {
    this.buffer = buffer
    this.book = book
    this.pageHeight = pageHeight
    emitter = new EventEmitter2()
  }
  start (chapter) {
    if (!this.paging) {
      this.paging = new Paging()
    }
    currChater = chapter
    emit('start')
  }
  on (...args) {
    emitter.on(...args)
  }
}

var emit = (...args) => {
  emitter.emit(...args)
}

var getData = (book, chapter) => {
  if (book.structure.data !== undefined) {
    return book.structure.data
  } else {
    
  }
}

export default BookToPages
