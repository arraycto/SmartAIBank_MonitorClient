<template>
  <el-dialog
    title="跑批详情"
    :visible.sync="dialogTableVisible1"
    fullscreen :close-on-click-modal="false"
    class="remote-view"
    append-to-body>
    <div>
      <el-row>
        <el-col :span="6">
          <div class="query-condition-laber">
            <nobr>
              <label>Job实例号：</label>
              <label>{{ summaryData.executionId }}</label>
            </nobr>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="query-condition-laber">
            <nobr>
              <label>数据日期：</label>
              <label>{{ summaryData.dataDate }}</label>
            </nobr>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="query-condition-laber">
            <nobr>
              <label>执行状态：</label>
              <label>{{ summaryData.batchExecutionStatusDesc }}</label>
            </nobr>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="query-condition-laber">
            <div class="top-button-style">
              <el-button v-show="allowRestartJobInBreakPoint" type="primary" @click="restartJobInBreakPoint">
                断点重跑
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="remote-table">
      <el-table
        :data="gridData"
        style="width: 100%;"
        stripe
        size="small"
        :header-cell-style="theadClassName">
        <el-table-column property="executionId" label="执行id" min-width="40" />
        <el-table-column property="stepId" label="步骤id" min-width="75" />
        <el-table-column property="stepDesc" label="步骤描述" min-width="75" />
        <el-table-column property="startTime" label="开始时间" min-width="55" />
        <el-table-column property="endTime" label="结束时间" min-width="55" />
        <el-table-column property="batchExecutionStatusDesc" label="执行状态" min-width="45" />
        <div slot="empty">
          <occupied height="52.4vh" explain="暂无数据" />
        </div>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import occupied from '@/components/Occupied/occupied'
import services from '../../../services'
export default {
  name: '',
  components: { occupied },
  data () {
    return {
      batchStatus: null,
      batchStatusList: [],
      gridData: [],
      dialogTableVisible1: false, // 页面是否展示
      fileSuffix: '',
      executionId: null,
      summaryData: null,
      allowRestartJobInBreakPoint: 0
    }
  },
  watch: {
    totalSize (val) {

    }
  },
  mounted () {
  },
  methods: {
    // 打开远程操作记录页面
    getBatchSummary: async function (row) {
      if (row) {
        this.executionId = row.executionId
        this.summaryData = row
        var self = this
        self.dialogTableVisible1 = true
        try {
          const status = await services.api.operations.batchJob.selectAllowRestartJobInBreakPoint(this.executionId)
          this.allowRestartJobInBreakPoint = status
        } catch (err) {
          this.$message({
            message: err.message,
            type: 'error'
          })
        }
        await this.getBatchAllSummaryInfo()
      }
    },
    getBatchAllSummaryInfo: async function () {
      var self = this
      try {
        const result = await services.api.operations.batchJob.getStepsByJobExecutionId(self.executionId)
        self.gridData = result || []
      } catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 调整头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333;font-size:14px;font-family: PingFangSC-Semibold;;font-weight:normal'
      }
    },
    conditionReset () {
      this.batchStatus = null
      this.createTimeRange = []
      this.getBatchAllSummaryInfo()
    },
    restartJobInBreakPoint: async function () {
      var self = this
      this.$confirm('此操作将从上次断点处继续执行job任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await services.api.operations.batchJob.restartJobFromBreakOut(this.executionId)
          this.$message({
            type: 'success',
            message: '指令发送成功，请稍候打开跑批界面查询执行结果!'
          })
          self.dialogTableVisible1 = false
        } catch (err) {
          this.$message({
            message: err.message,
            type: 'error'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.remote-view{
    width: 73%;
    margin-top: 7%;
    margin-left: 21%;
    height: 82%;
    border-radius: 4px;
  }
.query-condition-laber{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0;
    text-align: left;
    float: left;
    margin-left: 10px;
    height: 10px;
}
.remote-input-magin {
        width: 105px;
        margin-left: 10px;
}
.el-input--medium .el-input__inner {
    height: 30px;
    line-height: 30px;
}
.remote-table{
  margin-top: 40px;
  margin-right:10px;
  margin-left:10px;
  border: 1px solid #E5E5E5
}
.el-dialog__title{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #333333;
  letter-spacing: 0;
}
.el-row{
  margin-top: -20px;
}
.block{
  float:right;
  margin-top: 15px;
  margin-bottom: 15px
}
</style>