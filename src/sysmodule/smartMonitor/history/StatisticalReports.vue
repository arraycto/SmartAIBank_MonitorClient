<template>
  <div>
      <deviceTrouble v-if = "deviceTroubleShow"></deviceTrouble>
      <errorAccountDeal v-if = "errorAccountDealShow"></errorAccountDeal>
      <deviceOperation v-if = "deviceOperationShow"></deviceOperation>
      <Tickertape v-if = "TickertapeShow"></Tickertape>
      <hradingQuality v-if="hradingQuality"></hradingQuality>
      <faultHandlingSpeed v-if="faultHandlingSpeed"></faultHandlingSpeed>
      <coreBankQuWaitTime v-if="coreBankQuWaitTime"></coreBankQuWaitTime>
      <waittingTimebranchReport v-if = "waittingTimebranchShow"></waittingTimebranchReport>
      <clientFflowReport v-if = "clientFflowShow"></clientFflowReport>
      <serviceTimeReport v-if = "serviceTimeShow"></serviceTimeReport>
      <tradetimeZHReport v-if = "tradetimeZHShow"></tradetimeZHReport>
      <tradetimeLeaderReport v-if = "tradetimeLeaderShow"></tradetimeLeaderReport>
      <tradeTimeBranchReport v-if = "tradeTimeBranchShow"></tradeTimeBranchReport>
      <satisfactionOrgReport v-if = "satisfactionOrgShow"></satisfactionOrgReport>
      <satisfactionTellerReport v-if = "satisfactionTellerShow"></satisfactionTellerReport>
      <tradetimecounterclerkReport v-if = "tradetimecounterclerkShow"></tradetimecounterclerkReport>
  </div>
</template>
<script>
import deviceTrouble from '@/syscomponents/smartMonitor/history/StatisticalReports/deviceTroubleReport.vue'
import errorAccountDeal from '@/syscomponents/smartMonitor/history/StatisticalReports/errorAccountDealReport'
import deviceOperation from '@/syscomponents/smartMonitor/history/StatisticalReports/deviceOperationReport'
import Tickertape from '@/syscomponents/smartMonitor/history/StatisticalReports/Tickertape'
import hradingQuality from '@/syscomponents/smartMonitor/history/StatisticalReports/hradingQuality'
import faultHandlingSpeed from '@/syscomponents/smartMonitor/history/StatisticalReports/faultHandlingSpeed'
import coreBankQuWaitTime from '@/syscomponents/smartMonitor/history/StatisticalReports/coreBankQuWaitTime'
import waittingTimebranchReport from '@/syscomponents/smartMonitor/history/StatisticalReports/waittingTimebranchReport'
import clientFflowReport from '@/syscomponents/smartMonitor/history/StatisticalReports/clientFflowReport'
import serviceTimeReport from '@/syscomponents/smartMonitor/history/StatisticalReports/serviceTimeReport'
import tradetimeZHReport from '@/syscomponents/smartMonitor/history/StatisticalReports/tradetimeZHReport'
import tradetimeLeaderReport from '@/syscomponents/smartMonitor/history/StatisticalReports/tradetimeLeaderReport'
import tradeTimeBranchReport from '@/syscomponents/smartMonitor/history/StatisticalReports/tradeTimeBranchReport'
import satisfactionOrgReport from '@/syscomponents/smartMonitor/history/StatisticalReports/satisfactionOrgReport'
import satisfactionTellerReport from '@/syscomponents/smartMonitor/history/StatisticalReports/satisfactionTellerReport'
import tradetimecounterclerkReport from '@/syscomponents/smartMonitor/history/StatisticalReports/tradetimecounterclerkReport.vue'
export default {
  name: 'StatisticalReports',
  data () {
    return {
      deviceOperationShow: true, // 默认显示设备运行情况报表
      deviceTroubleShow: false,  // 外设故障情况
      errorAccountDealShow: false,  // 网点错账处理速度考核
      faultHandlingSpeed: false, // 故障处理速度
      TickertapeShow: false, // 设备凭条耗材统计
      hradingQuality: false,
      coreBankQuWaitTime: false,  // 总行排队等待时长统计
      waittingTimebranchShow: false,
      clientFflowShow: false,
      serviceTimeShow: false,
      tradetimeZHShow: false,
      tradetimeLeaderShow: false,
      tradeTimeBranchShow: false,
      satisfactionOrgShow: false,
      satisfactionTellerShow: false,
      tradetimecounterclerkShow: false
    }
  },
  components: {
    deviceTrouble,
    errorAccountDeal,
    deviceOperation,
    Tickertape,
    faultHandlingSpeed,
    hradingQuality,
    coreBankQuWaitTime,
    waittingTimebranchReport,
    clientFflowReport,
    serviceTimeReport,
    tradetimeZHReport,
    tradetimeLeaderReport,
    tradeTimeBranchReport,
    satisfactionOrgReport,
    satisfactionTellerReport,
    tradetimecounterclerkReport
  },
  mounted () {
    this.inIt(this.$store.state.monitor.reportsLeftIndex)
  },
  methods: {
    inIt: function (val) {
      this.resetShow()
      switch (val) {
      case 'reports-shebei': // 设备运行情况显示
        this.deviceOperationShow = true
        break
      case 'reports-waishe': // 外设故障情况显示
        this.deviceTroubleShow = true
        break
      case 'reports-cuozhang': // 网点错账处理速度考核显示
        this.errorAccountDealShow = true
        break
      case 'reports-guzhangchuli': // 故障处理速度考核显示
        this.faultHandlingSpeed = true
        break
      case 'reports-jiaoyi': // 交易质量统计显示
        this.hradingQuality = true
        break
      case 'reports-haocai': // 设备凭条耗材统计显示
        this.TickertapeShow = true
        break
      case 'reports-corequtime': //
        this.coreBankQuWaitTime = true
        break
      case 'reports-waitingTime-branch': //
        this.waittingTimebranchShow = true
        break
      case 'reports-client-flow': //
        this.clientFflowShow = true
        break
      case 'reports-serviceTime': //
        this.serviceTimeShow = true
        break
      case 'reports-tradetime-ZH': //
        this.tradetimeZHShow = true
        break
      case 'reports-tradetime-leader': //
        this.tradetimeLeaderShow = true
        break
      case 'reports-tradeTime-branch': //
        this.tradeTimeBranchShow = true
        break
      case 'reports-satisfaction-org': //
        this.satisfactionOrgShow = true
        break
      case 'reports-satisfaction-teller': //柜员满意度评价数据显示
        this.satisfactionTellerShow = true
        break
      case 'reports-tradetime-counterclerk': //
        this.tradetimecounterclerkShow = true
        break
      }
    },
    // 关闭组件
    resetShow: function () {
      this.deviceOperationShow = false
      this.deviceTroubleShow = false
      this.errorAccountDealShow = false
      this.TickertapeShow = false
      this.hradingQuality = false
      this.faultHandlingSpeed = false
      this.coreBankQuWaitTime = false
      this.waittingTimebranchShow = false
      this.clientFflowShow = false
      this.serviceTimeShow = false
      this.tradetimeZHShow = false
      this.tradetimeLeaderShow = false
      this.tradeTimeBranchShow = false
      this.satisfactionOrgShow = false
      this.satisfactionTellerShow = false
      this.tradetimecounterclerkShow = false
    }
  },
  watch: {
    '$store.state.monitor.reportsLeftIndex': function (value) {
      this.inIt(value)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped></style>
