<template>
  <div class="allhistory">
    <div class="allwarn-top">
      共{{tableDate.total!==undefined?tableDate.total:0}}条记录
    </div>
    <el-table
        :data="tableDate.list"
        style="width: 100%"
        size="mini"
        stripe
        fixed
        :header-cell-style="theadClassName"
        :cell-class-name="tableRowClassName"
        class = "allWarn-table">
        <el-table-column
          min-width="20">
        </el-table-column>
        <el-table-column
          prop="tranStatus"
          label="交易状态"
          min-width="100"
          align="left">
          <template slot-scope="scope">
              <div class="columnIndex">
                  <el-row :gutter="15">
                  <el-col :span="4">
                    <circle-panel/>
                  </el-col>
                  <el-col :span="11">
                    <div>{{ scope.row.tranStatus }}</div>
                  </el-col>
                </el-row>
              </div>
            </template>
        </el-table-column>
        <el-table-column
          prop="tranName"
          label="交易类型"
          min-width="125">
        </el-table-column>>
        <el-table-column
          prop="tranDate"
          label="交易时间"
          min-width="100">
          <template slot-scope="scope">
            {{scope.row.date}}<br/>{{scope.row.time}}
          </template>
          </el-table-column>
        <el-table-column
          prop="fieldName"
          label="交易地点"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="deviceId"
          label="设备编号"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="devClassName"
          label="设备类型"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="branchName"
          label="设备归属机构"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="tranAmt"
          label="交易金额"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="tranCardNo"
          label="交易卡号"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="tranCardType"
          label="卡类型"
          min-width="75"
          v-if='false'>
        </el-table-column>
        <el-table-column
          prop="seqNo"
          label="交易流水"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="tranRetCode"
          label="错误码"
          min-width="70">
        </el-table-column>
        <el-table-column
          prop="tranRetDesc"
          label="错误描述"
          min-width="140">
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import circlePanel from '../../warning/deviceHandle/smallCirclePanel'
export default {
  data: function () {
    return {
      list: {
        total: 0
      }
    }
  },
  props: {
    tableDate: {
      type: Object
    }
  },
  components: {
    circlePanel
  },
  methods: {
    // 调整级别不同调整显示颜色
    tableRowClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.tranStatus === '异常' && columnIndex === 1) {
        return 'allwarn-leve-height'
      } else if (row.tranStatus === '失败' && columnIndex === 1) {
        return 'allwarn-leve-center'
      } else if (columnIndex === 1) {
        return 'allwarn-leve-low'
      }
      if (columnIndex === 11 && row.show === true) {
        this.btnshow = true
      }
    },
    // 调整头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333;font-size: 14px;font-family: PingFangSC-Semibold;'
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "@/styles/standard-common.scss";
.allhistory{
  font-size: 14px;
  background:transparent;
  .allWarn-table{
    border-radius:0.5rem;
    .allwarn-leve-height{
      color: $warnRedColor;
    }
    .allwarn-leve-center{
      color: $homeYellowColor;
    }
    .allwarn-leve-low{
      color: $greenColor;
    }
  }
  .el-table_1_column_1, .el-table_1_column_13{
    padding-right: 1vw;
  }
  .el-table_1_column_1{
    padding-left: 1vw;
  }
  .allwarn-top{
  margin: 0.5rem;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #4A4A4A;
  letter-spacing: 0;
  text-align: right;
  }
}
</style>
