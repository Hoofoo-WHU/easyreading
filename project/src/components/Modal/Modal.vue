<template lang="html">
    <div>
          <transition name="modal-zoom">
              <div class="modal-wrapper" v-show="show" @click="cancel">
                  <div class="modal">
                          <div class="modal-header" v-if="showHeader">
                              <slot name="header">
                                  <span class="modal-title">{{title}}</span>
                              </slot>
                              <slot name="close">
                                  <div class="modal-header-close" @click="cancel" v-if="showCloseButton">
                                      <icon class="icon" name="close"></icon>
                                  </div>
                              </slot>
                          </div>
                          <div class="modal-body">
                              <slot>{{content}}</slot>
                          </div>
                          <div class="modal-footer" v-if="showFooter">
                              <slot name="footer">
                                 <div class="cancel-button" v-if="showCancelButton" @click="cancel">{{cancelText}}</div>
                                 <div class="ok-button" v-if="showOkButton" @click="ok">{{okText}}</div>
                              </slot>
                          </div>
                  </div>
              </div>
          </transition>
      </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  name: 'Modal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    showOkButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    onOk: {
      type: Function,
      default: () => {}
    },
    onCancel: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    Icon
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    value (val) {
      this.show = val
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
    show (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    close (e) {
      this.show = false
    },
    ok () {
      let noClose = typeof this.onOk === 'function' && this.onOk()
      if (!noClose) {
        this.close()
      }
    },
    cancel () {
      let noClose = typeof this.onCancel === 'function' && this.onCancel()
      if (!noClose) {
        this.close()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.modal-wrapper {
    z-index: 1000;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(55, 55, 55, 0.6);
}
.modal {
    z-index: 1001;
    font-size: 14px;
    position: relative;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
    padding: 0;
    background-color: #fff;
    border-radius: 12px;
    box-sizing: border-box;
    width: 75%;
    outline: 0;

}
.modal-body {
    padding: 20px 30px;
}

.modal-header {
    font-weight: 500;
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid #d3d3d3;
    display: flex;
    justify-content: flex-end;
    .modal-header-close {
        width: 4%;
    }
}
.modal-footer {
    border-top: 1px solid #d3d3d3;
    text-align: right;
    display: flex;
    justify-content: center;
    div {
        width: 50%;
        text-align: center;
        box-sizing: border-box;
        padding: 10px 16px;
    }
    .cancel-button {
        border-radius: 0 0 0 12px;

    }
    .ok-button {
        background-color: orange;
        border-radius: 0 0 12px 0;
        color: #fff;
    }
}
.modal-zoom-enter-active{
    transition: transform .2s
}
.modal-zoom-enter{
    transform: translateY(100%);
}

</style>
