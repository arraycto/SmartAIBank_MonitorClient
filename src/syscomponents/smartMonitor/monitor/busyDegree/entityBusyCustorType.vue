<template>
<div>
  <div class="top-laber">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="top-laber-icon">
          <svg class="icon" aria-hidden="true">
                <use xlink:href="#dcfs-kehuleixing"></use>
          </svg>
          <span class="top-laber-name">客户类型</span>
        </div>
      </el-col>
    </el-row>
  </div>
<div class="device-state">
    <div class="top-style">
    <el-row :gutter="20">
      <el-col :span="privateWidth">
        <privateOrdinaryCustomers></privateOrdinaryCustomers>
      </el-col>
      <el-col :span="privateWidth">
        <privateVipCustomers></privateVipCustomers>
      </el-col>
      <el-col :span="privateWidth" v-if="!showA">
        <publicCustomers></publicCustomers>
      </el-col>
    </el-row>
    <el-row v-if="showA" class="public_row" :gutter="20">
       <el-col :span="12">
        <publicCustomers></publicCustomers>
      </el-col>
    </el-row>
  </div>

</div>
</div>
</template>
<script>
import privateOrdinaryCustomers from '@/syscomponents/smartMonitor/monitor/busyDegree/privateOrdinaryCustomers'
import privateVipCustomers from '@/syscomponents/smartMonitor/monitor/busyDegree/privateVipCustomers'
import publicCustomers from '@/syscomponents/smartMonitor/monitor/busyDegree/publicCustomers'
export default {
  name: 'entityBusyCustorType',
  data () {
    return {
      privateWidth: 8,
      showA: false,
      tranStatusChartId: '',
      tranNumChartId: ''
    }
  },
  components: { privateOrdinaryCustomers, privateVipCustomers, publicCustomers
  },
  mounted () {
    this.inintWidth()
  },
  methods: {
    inintWidth () {
      const self = this
      if (document.querySelector('body').clientWidth < 1830) {
        self.showA = true
        self.privateWidth = 12
      } else {
        self.showA = false
        self.privateWidth = 8
      }
      window.addEventListener('resize', function () {
        if (document.querySelector('body').clientWidth < 1830) {
          self.showA = true
          self.privateWidth = 12
        } else {
          self.showA = false
          self.privateWidth = 8
        }
      })
    }
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
  .top-laber-name{
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #333333;
    letter-spacing: 0;
    margin-left:10px;
    position: relative;
    top: -4px;
  }
  .top-laber-icon{
    font-size: 30px;
    }
.device-state{
  margin-top: 3px
}
.public_row{
  margin-top:1rem
}
</style>



