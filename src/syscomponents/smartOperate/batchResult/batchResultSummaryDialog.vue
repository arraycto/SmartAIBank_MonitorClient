<template>
  <el-dialog
    title="跑批结果查询"
    :visible.sync="dialogTableVisible"
    fullscreen :close-on-click-modal="false"
    class="remote-view">
    <div>
      <el-row>
        <el-col :span="4">
          <div class="query-condition-laber">
            <nobr>
              <label>跑批状态</label>
              <el-select
                v-model="batchStatus" size="small" placeholder="请选择" class="remote-input-magin"
                filterable>
                <el-option label="全部" value="" />
                <el-option
                  v-for="item in batchStatusList"
                  :key="item.id"
                  :label="item.desc"
                  :value="item.id" />
              </el-select>
            </nobr>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="query-condition-laber">
            <nobr>
              <label>数据日期</label>
              <el-date-picker
                v-model="dataDate"
                style="width:60%;"
                class="remote-input-magin"
                type="date"
                size="small"
                placeholder="选择日期"
                value-format="yyyyMMdd"
                :picker-options="pickerOptions" />
            </nobr>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="query-condition-laber">
            <nobr>
              <label>创建时间</label>
              <el-date-picker
                v-model="createTimeRange"
                class="remote-input-magin"
                type="daterange"
                size="small"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions" />
            </nobr>
          </div>
        </el-col>
        <el-col :span="4" :offset="1">
          <div class="query-condition-laber">
            <div class="top-button-style">
              <el-button type="primary" @click="getBatchAllSummaryInfo">
                查询
              </el-button>
              <el-button @click="conditionReset">
                重置
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="total-redao">
      共{{ totalSize }}条记录
    </div>
    <div class="remote-table">
      <el-table
        :data="gridData"
        style="width: 100%;"
        stripe
        size="small"
        :header-cell-style="theadClassName">
        <el-table-column property="executionId" label="Job实例号" min-width="45" />
        <el-table-column property="dataDate" label="数据日期" min-width="45" />
        <el-table-column property="startTime" label="开始时间" min-width="80" />
        <el-table-column property="endTime" label="结束时间" min-width="80" />
        <el-table-column property="batchExecutionStatusDesc" label="执行状态" min-width="50" />
        <el-table-column property="executionId" label="操作" min-width="80">
          <template slot-scope="scope">
            <div v-if="true">
              <el-button
                size="mini" @click.stop="downPicOrLog(scope.row)">
                详情
              </el-button>
              <el-button
                v-show="currentPage ===1 && scope.$index === 0 && scope.row.batchExecutionStatus!=='STARTED' && (new Date().getTime() - new Date(scope.row.startTime).getTime() < 86400000)"
                size="mini" @click.stop="restartJob(scope.row)">
                重新执行
              </el-button>
            </div>
          </template>
        </el-table-column>
        <div slot="empty">
          <occupied height="52.4vh" explain="暂无数据" />
        </div>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper, sizes"
        :total="totalSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <div>
      <batchStepsDialog ref="batchStepsDialog" />
    </div>
  </el-dialog>
</template>

<script>
import occupied from '@/components/Occupied/occupied'
import batchStepsDialog from '@/syscomponents/smartOperate/batchResult/batchStepsDialog'
import services from '../../../services'
export default {
  name: '',
  components: { occupied, batchStepsDialog },
  props: {
  },
  data () {
    return {
      dataDate: null,
      batchStatus: null,
      batchStatusList: [{
        id: 'FAILED',
        desc: '执行失败'
      }, {
        id: 'COMPLETED',
        desc: '执行完成'
      }, {
        id: 'STARTED',
        desc: '正在运行'
      }],
      gridData: [],
      dialogTableVisible: false, // 页面是否展示
      currentPage: 1, // 当前页
      pageSize: 10, // 页面大小，
      totalSize: 0, // 总数，
      fileSuffix: '',
      createTimeRange: [],
      pickerOptions: {
        disabledDate: time => {
          const curDate = (new Date()).getTime()
          const day = 30 * 24 * 3600 * 1000
          const dateRegion = curDate - day
          return time.getTime() > Date.now() || time.getTime() < dateRegion
        }
      }
    }
  },
  watch: {
    totalSize (val) {

    }
  },
  mounted () {
    this.getBatchAllSummaryInfo()
  },
  methods: {
    // 打开远程操作记录页面
    getBatchSummary () {
      var self = this
      self.dialogTableVisible = true
      this.getBatchAllSummaryInfo()
    },
    getBatchAllSummaryInfo: async function () {
      var self = this
      let startTime = ''
      let endTime = ''
      if (self.createTimeRange && self.createTimeRange.length > 0) {
        startTime = self.createTimeRange[0] + ' 00:00:00'
        endTime = self.createTimeRange[1] + ' 23:59:59'
      }
      const params = {
        batchExecutionStatus: self.batchStatus,
        endTime: endTime,
        startTime: startTime,
        dataDate: self.dataDate
      }
      try {
        const result = await services.api.operations.batchJob.selectByPage(params, self.currentPage, self.pageSize)
        self.gridData = result.list || []
        self.totalSize = result.total || 0
      } catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    downPicOrLog (row) {
      this.$refs.batchStepsDialog.getBatchSummary(row)
    },
    restartJob: async function (row) {
      this.$confirm('此操作将从数据导入阶段重新执行job任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await services.api.operations.batchJob.restartJobFromScratch(row.executionId)
          this.$message({
            type: 'success',
            message: '指令发送成功，请稍候打开跑批界面查询执行结果!'
          })
          this.getBatchAllSummaryInfo()
        } catch (err) {
          this.$message({
            message: err.message,
            type: 'error'
          })
          this.getBatchAllSummaryInfo()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 调整头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333;font-size:14px;font-family: PingFangSC-Semibold;;font-weight:normal'
      }
    },
    // 每页数量改变
    handleSizeChange (val) {
      this.pageSize = val
      this.getBatchAllSummaryInfo()
    },
    // 当前页改变
    handleCurrentChange (val) {
      this.currentPage = val
      this.getBatchAllSummaryInfo()
    },
    conditionReset () {
      this.batchStatus = null
      this.createTimeRange = []
      this.dataDate = null
      this.getBatchAllSummaryInfo()
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
  margin-top: 5px;
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
.total-redao{
  text-align: right;
  padding-right: 20px;
  margin-top: 20px;
}
.block{
  float:right;
  margin-top: 15px;
  margin-bottom: 15px
}
</style>