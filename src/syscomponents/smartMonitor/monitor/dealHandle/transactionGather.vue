<template>
<div>
  <div class="transaction-gather">
    <div class="transaction-gather-top">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="transaction-gather-top-abnormal">
            <el-row>
            <span class="transaction-gather-top-laber">异常（笔）</span>
            <span class="transaction-gather-top-num">{{transactionGather.exceptionCount}}
              <span class="transaction-gather-top-rate">({{transactionGather.exceptionRate}}%)</span>
            </span>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="transaction-gather-top-fail">
            <el-row>
            <span class="transaction-gather-top-laber">失败（笔）</span>
            <span class="transaction-gather-top-num">{{transactionGather.failureCount}}
              <span class="transaction-gather-top-rate">({{transactionGather.failureRate}}%)</span>
            </span>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="transaction-gather-top-success">
            <el-row>
            <span class="transaction-gather-top-laber">成功（笔）</span>
            <span class="transaction-gather-top-num">{{transactionGather.successCount}}
              <span class="transaction-gather-top-rate">({{transactionGather.successRate}}%)</span>
            </span>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="transaction-gather-bottom">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="transaction-gather-bottom-total">
            <circlePanel class="equip-type-all" ref="circlePanel" :circleData="circleData[0]"></circlePanel>
          </div>
        </el-col>
        <!-- <el-col :span="8">
          <div class="transaction-gather-bottom-other">
            <circlePanel class="equip-type-all" ref="circlePanel" :circleData="circleData[1]"></circlePanel>
          </div>
        </el-col> -->
        <!-- <el-col :span="6">
          <div class="transaction-gather-bottom-other">
            <circlePanel class="equip-type-all" ref="circlePanel" :circleData="circleData[2]"></circlePanel>
          </div>
        </el-col> -->
        <el-col :span="6">
          <div class="transaction-gather-bottom-other">
            <circlePanel class="equip-type-all" ref="circlePanel" :circleData="circleData[2]"></circlePanel>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <div class="transaction-gather-total">共{{total}}条记录</div>
  <div class="transaction-gather-table">
    <transactionTable ref="transactionTable" :transactionList="transactionList"></transactionTable>
  </div>
  </div>
</template>

<script>
import gather from '@/dummy/smartMonitor/dealHandle/transactionGather.json'
import circlePanel from '@/syscomponents/smartMonitor/monitor/dealHandle/circleIcon'
import transactionTable from '@/syscomponents/smartMonitor/monitor/dealHandle/transactionTable'
import services from '../../../../services'
import base from '@/common/base'
import websocketClient from '@/common/websocketClient'
export default {
  name: '',
  data () {
    return {
      branchId: '',
      deviceClassKey: '', // 设备编号
      transactionGather: {
        exceptionCount: 0,
        exceptionRate: 0,
        failureCount: 0,
        failureRate: 0,
        successCount: 0,
        successRate: 0
      }, // 交易汇总
      branchStatsType: 2, // 营业兼管理机构标志位
      timer: null, // 定时器名称
      transactionList: [], // 列表数据
      total: 0, // 数量
      circleData: [{
        type: 'photo',
        circleContent: 'icon-dcfs dcfs-deal-handle',
        color: '#258AFF',
        title: '交易总笔数',
        count: '0',
        unit: '(笔)',
        rate: ''
      }, {
        type: 'text',
        circleContent: 'ATM',
        color: '#258AFF',
        title: 'ATM',
        count: '0',
        unit: '(笔)',
        rate: 0
      },
      // {
      //   type: 'text',
      //   circleContent: 'CRS',
      //   color: '#258AFF',
      //   title: 'CRS',
      //   count: '0',
      //   unit: '(笔)',
      //   rate: 0
      // },
      {
        type: 'text',
        circleContent: 'STM',
        color: '#258AFF',
        title: 'STM',
        count: '0',
        unit: '(笔)',
        rate: 0
      }]
    }
  },
  components: {
    circlePanel, transactionTable
  },
  mounted () {
    this.branchId = base.getStore({ key: 'orgId' })
    this.getTransactionGather()
    this.getTransactionList()
    this.timeOut()
    // clearInterval(this.timer)
    // this.setTimer()
  },
  watch: {
    '$store.state.monitor.tableBranchId': function (value) {
      if (this.$store.state.monitor.tableBranchId != null) {
        this.branchId = value.substring(0, value.length - 13)
        this.getTransactionGather()
        this.getTransactionList()
      }
    },
    '$store.state.monitor.managerBranchId': function (value) {
      if (this.$store.state.monitor.managerBranchId != null) {
        this.branchId = value.substring(0, value.length - 13)
        this.getTransactionGather()
        this.getTransactionList()
      }
    }
  },
  methods: {
    timeOut () {
      const self = this
      setTimeout(function () {
        self.websocket()
      }, 1000)
    },
    // websocket通讯
    websocket () {
      const self = this
      websocketClient.subscribeToRoom('monitorTran',  window.DCSpace.sysConfig.socketUrl.monitorTran, function (msg) {
        self.branchId = base.getStore({ key: 'orgId' })
        self.getTransactionGather()
        self.getTransactionList()
      })
    },
    // 定时任务
    setTimer: function () {
      this.timer = setInterval(() => {
        this.getTransactionGather()
        this.getTransactionList()
      }, 10000)
    },
    // 销毁定时器
    beforeDestroy () {
      clearInterval(this.timer)
    },

    // 获取交易汇总信息
    getTransactionGather: async function () {
      try {
        var self = this

        const transactionGathers = await services.api.monitor.monitorTrans.selectEachStatusCountGatherInfo(this.branchId, this.branchStatsType)
        this.transactionGather.exceptionCount = transactionGathers.exceptionCount || 0
        this.transactionGather.exceptionRate = parseFloat(transactionGathers.exceptionRate || 0).toFixed(2)
        this.transactionGather.failureCount = transactionGathers.failureCount || 0
        this.transactionGather.failureRate = parseFloat(transactionGathers.failureRate || 0).toFixed(2)
        this.transactionGather.successCount = transactionGathers.successCount
        this.transactionGather.successRate = parseFloat(transactionGathers.successRate || 0).toFixed(2)
        const equip = await services.api.monitor.monitorTrans.selectTransCount(this.branchId, this.branchStatsType)
        this.circleData[0].count = equip.totalCount || 0
        this.circleData[1].count = equip.atmCount || 0
        // this.circleData[2].count = equip.bsrCount || 0
        // this.circleData[3].count = equip.stmCount || 0
        this.circleData[2].count = equip.stmCount || 0
        this.circleData[1].rate = parseFloat(equip.atmRate || 0).toFixed(2)
        // this.circleData[2].rate = parseFloat(equip.bsrRate || 0).toFixed(2)
        // this.circleData[3].rate = parseFloat(equip.stmRate || 0).toFixed(2)
        this.circleData[2].rate = parseFloat(equip.stmRate || 0).toFixed(2)
        const transactionGatherParam = {
          branchId: this.branchId,
          branchStatsType: this.branchStatsType
        }
        this.transactionGatherParam = transactionGatherParam
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 获取列表信息
    getTransactionList: async function () {
      try {
        var self = this
        const transaction = await services.api.monitor.monitorTrans.selectTransDetail(this.branchId, this.branchStatsType)
        this.transactionList = transaction
        this.total = transaction.length
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.transaction-gather{
  background: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
  border-radius: 8px;
}
.transaction-gather-top{
  padding-top: 2%;
  padding-left: 2%;
  padding-right: 2%;
}
.transaction-gather-top-abnormal{
  background-image: linear-gradient(-135deg, #FD7790 0%, #EE667F 100%);
  border-radius: 8px;
  padding: 22px 10px 23px 11px;
}
.transaction-gather-top-fail{
  background-image: linear-gradient(-131deg, #EFB01C 0%, #F5A623 100%);
  border-radius: 8px;
  padding: 22px 10px 23px 11px;
}
.transaction-gather-top-success{
  border-radius: 8px;
  padding: 22px 10px 23px 11px;
  background-image: linear-gradient(-135deg, #64E4C7 0%, #55CFB4 100%);
}
.transaction-gather-top-laber{
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0;
    float: left;
    padding-top: 5px;
}
.transaction-gather-top-num{
  font-family: DINAlternate-Bold;
  font-size: $XXXLargeFontSize;
  color: #FFFFFF;
  letter-spacing: 0;
  float: right;
}
.transaction-gather-top-rate{
  font-family: PingFangSC-Semibold;
  font-size: $middleFontSize;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
}
.transaction-gather-bottom{
  padding-left: 2%;
  padding-top: 1.5%;
}
.transaction-gather-bottom-total{
  padding: 10px 0px 40px 0px;

}
.transaction-gather-bottom-other{
  padding: 10px 0px 40px 0px;
}

.transaction-gather-table{
  margin-top: 2rem;
  background: #FFFFFF;
  // border: 1px solid #DCDBDD;
  // box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
  border-radius: 20px;
}
.transaction-gather-total{
  font-size: $XSmallFontSize;
  color: $tableFontTotalColor;
  font-family: $textFontFamily;
  float: right;
  margin-top: 0.5rem;
  margin-right: 1.2rem;
}
</style>
