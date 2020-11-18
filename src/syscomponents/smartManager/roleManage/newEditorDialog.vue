<template>
    <div class="role-modal" v-if="visible">
      <div class="role-dialog-wrapper" :style="{left:isSetResource?'40%':'70%'}">
          <transition name="move">
            <new-editor
              v-if="visible"
              @hidden-dialog="$emit('hidden-dialog')"
              @handle-resoure="handleSetResourceClick"
              :width="isSetResource?'50%':'100%'"
              :is-compile="isCompile"
              :details-data="detailsData"
              :resource-list="resourceList"
              ref="newEditorResource"/>
          </transition>
          <transition name="move">
            <visit-resource
              @hidden-dialog="$emit('hidden-dialog')"
              @handle-resoure="handleSetResourceClick"
              v-show="isSetResource"
              :is-compile="isCompile"
              :details-data="detailsData"
              ref="visitResource"/>
          </transition>
      </div>
    </div>
</template>
<script>
import newEditor from '@/syscomponents/smartManager/roleManage/newEditor'
import visitResource from '@/syscomponents/smartManager/roleManage/visitResource'

export default {
  name: 'NewEditorDialog',
  components: { newEditor, visitResource },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isCompile: {
      type: Boolean,
      default: false
    },
    detailsData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      isSetResource: false,
      resourceList: []
    }
  },
  mounted () {
    if (this.isCompile) {
      this.resourceList = this.detailsData && this.detailsData.resources ? this.detailsData.resources : []
    }
  },
  methods: {
    // 禁止页面滑动
    stop () {
      var mo = function (e) { e.preventDefault() }
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', mo, false)
    },
    // 允许页面滚动
    move () {
      var mo = function (e) { e.preventDefault() }
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', mo, false)
    },
    // 设置可访问资源设置
    handleSetResourceClick (isOpen, resList) {
      if (isOpen) {
        if (this.$refs.newEditorResource.systemValue) {
          this.$refs.visitResource.getResourceTree(this.$refs.newEditorResource.systemValue, base.getStore({ 'key': 'userName' }))
        } else {
          this.$message({
            message: '请先选择所属系统',
            type: 'warning'
          })
          return
        }
        this.isSetResource = true
      } else {
        this.isSetResource = false
      }
      if (resList) {
        this.resourceList = resList
      }
    }
  },
  watch: {
    visible: function (val) {
      if (val) {
        this.stop()
      } else {
        this.move()
      }
    },
    'detailsData': {
      handler (value) {
        this.$nextTick(function () {
          if (this.isCompile) {
            this.resourceList = this.detailsData && this.detailsData.resources ? this.detailsData.resources : []
          } else {
            this.resourceList = []
          }
        })
      },
      deep: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/smartManager/commom-manager.scss';
    .role-modal{
      position: fixed;
      left: 0;
      top: $topHeadeHeight;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.4);
      z-index: 2000;
      .role-dialog-wrapper{
          position: fixed;
          top: $topHeadeHeight;
          right: 0;
          bottom: 0;
          overflow: auto;
          margin: 0;
          z-index: 2001;
          .move-enter-active, .move-leave-active {
            transition: all 0.3s linear;
            transform: translate3d(0, 0, 0);
          }
          .move-enter, .move-leave {
            transform: translate3d(100%, 0, 0);
          }
        }
    }

</style>


