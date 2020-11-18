<template>
  <div class="org-dialog-content">
    <transition name="dialog">
      <el-dialog title="操作记录"
        :visible.sync="dialogTableVisible"
        width="30%"
        top="0"
        fullscreen :close-on-click-modal="false"
        class="opera-view">
        <hr class="device-hr"/>
      <timeline ref="timeline" :operadetail="operaList" class="opera-time-line"></timeline>
      <hr class="device-hr footer-bottom-hr"/>
      <el-button type="primary" class="footer-bottom" @click="closeview">关闭</el-button>
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import timeline from '@/syscomponents/smartMonitor/monitor/deviceState/timeLine'
import services from '../../../../services'
export default {
  name: 'operationDialog',
  data () {
    return {
      dialogTableVisible: false, // 是否打开界面
      operaList: []
    }
  },
  components: {
    timeline
  },
  mounted () {

  },
  methods: {
    // 打开远程操作记录页面
    getOperation: async function  (mac) {
      var self = this
      self.dialogTableVisible = true
      try {
        self.operaList = await services.api.monitor.monitorDevice.selectRemoteInfo(mac)
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    closeview () {
      var self = this
      self.dialogTableVisible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.org-dialog-content {
  .el-dialog__wrapper {
    left: 70%;
  }
}
.footer-bottom{
  position: fixed;
  bottom: 3rem;
  right: 2rem;
  padding-top: 10px;
  display: inline-block;
  text-align: right;
}
.opera-view{
    height: 100%;
    border-radius: 4px;
}
.device-hr{
  margin-top: -1.8rem;
  border: 1px solid #E5E5E5;
}
.opera-time-line{
  margin-top: 3rem;
}
.footer-bottom-hr{
  margin: 0;
  position: relative;
  bottom: -18vh;
}
</style>
