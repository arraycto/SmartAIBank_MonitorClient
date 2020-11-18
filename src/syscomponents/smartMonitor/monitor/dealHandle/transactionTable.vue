<template>
  <div class="device-table-content">
    <el-table
      ref="multipleTable"
      :data="transactionList"
      tooltip-effect="dark"
      style="width: 100%;"
      :header-cell-style="theadClassName"
      size="small"
      stripe
    >
    <el-table-column
    min-width="15">
    </el-table-column>
      <el-table-column prop="tranStatusDesc" label="交易状态" align="left">
        <template slot-scope="scope">
           <div
            v-bind:class="{ 'transaction-exception':scope.row.tranStatusDesc == '异常',
              'transaction-fail':scope.row.tranStatusDesc === '失败',
              'transaction-success':scope.row.tranStatusDesc === '成功'}">
                <circle-panel class="circle-panel"/>
                {{scope.row.tranStatusDesc}}
          </div>
         </template>
      </el-table-column>
      <el-table-column prop="tranReturnCode" label="错误码" align="left"></el-table-column>
      <el-table-column prop="tranReturnMsg" label="错误码描述" align="left"></el-table-column>
      <el-table-column prop="tranData" label="交易时间" align="left" width="95"></el-table-column>
      <el-table-column prop="tranTypeDesc" label="交易类型" align="left" min-width="100"></el-table-column>
      <el-table-column prop="tranSequence" label="交易流水号" align="left" min-width="130"></el-table-column>
      <el-table-column prop="deviceId" label="设备编号" align="left"></el-table-column>
      <el-table-column prop="deviceClassName" label="设备类型" align="left"></el-table-column>
      <el-table-column prop="branchId,branchName" label="设备归属机构" align="left" min-width="150">
        <template slot-scope="scope">
          {{scope.row.branchId}}-{{scope.row.branchName}}
         </template>
      </el-table-column>
      <el-table-column prop="fieldName" label="交易地点"></el-table-column>
      <div slot="empty">
        <occupied height="52.4vh" explain="暂无数据" />
      </div>
    </el-table>
  </div>
</template>

<script>
import circlePanel from '@/syscomponents/smartMonitor/warning/deviceHandle/smallCirclePanel'
import occupied from '@/components/Occupied/occupied'
export default {
  name: 'deviceStatusTable',
  components: {
    circlePanel, occupied
  },
  data: function () {
    return {
      transactionList1: [],
      orgId: '',
      branchStatsType: 2,
      tranDate: '',
      timer: null// 定时器名称
    }
  },
  mounted () {
  },
  props: {
    transactionList: {
      type: Array
    }
  },
  watch: {
    transactionList (obj, oldbjb) {
      this.transactionList1 = obj
    }
  },

  methods: {
    // 调整表格头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333333;font-size: 14px;font-family: PingFangSC-Semibold;letter-spacing: 0;'
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.device-table-content{
  border-radius: 8px 8px 0px 0px;
  .transaction-exception{
    color: #DB5B73;
  }
  .transaction-fail{
    color: #F5A623;
  }
  .transaction-success{
    color: #55CFB4;
  }
  .block{
    float: right;
    margin-right: -10px;
    margin-top: 1.5rem;
  }
  .circle-panel{
    float: left;
    margin-right: 0.5rem;
    margin-top: 4px;
  }
}
</style>

