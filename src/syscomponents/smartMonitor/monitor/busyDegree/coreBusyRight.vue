<template>
    <div class="core-busy-right">
      <div class="core-busy-right-title">
          <span>网点排名</span>
      </div>
      <div class="core-busy-right-laber">
        <el-row>
          <el-col :span="12">
            <div>
              <span><a href="#" v-bind:class="{'core-busy-right-laber-style':showClass}" @click="waitCustomerClick">等待客户数</a></span>
              <div class="core-busy-right-line" v-bind:class="{'core-equip-status':waitCustomer}"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <span><a href="#" v-bind:class="{'core-busy-right-laber-style':!showClass}" @click="avgWaitTimeClick">客户平均等待时间</a></span>
              <div class="core-busy-right-line" v-bind:class="{'core-equip-status':avgWaitTime}"></div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="core-busy-right-table">
        <coreBusyWaitCustomer ref="coreBusyWaitCustomer" :branchId="branchId" :queryCondition="queryCondition"></coreBusyWaitCustomer>
      </div>
    </div>
</template>

<script>

import coreBusyWaitCustomer from '@/syscomponents/smartMonitor/monitor/busyDegree/coreBusyWaitCustomer'
export default {
  name: 'coreBusyRight',
  data () {
    return {
      queryCondition: '1',
      waitCustomer: true,
      avgWaitTime: false,
      showClass: true
    }
  },
  components: { coreBusyWaitCustomer },
  props: { branchId: String },
  watch: {
    branchId (val) {
      this.waitCustomerClick()
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.waitCustomerClick()
    }
  },
  mounted () {
  },
  methods: {
    waitCustomerClick () {
      this.waitCustomer =  true
      this.avgWaitTime =  false
      this.queryCondition = '1'
      this.showClass = true
    },
    avgWaitTimeClick () {
      this.waitCustomer =  false
      this.avgWaitTime =  true
      this.queryCondition = '2'
      this.showClass = false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.core-busy-right{
  background: #FFFFFF;
  box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
  border-radius: 8px;
}
.core-busy-right-title{
  padding: 1rem 0 0 1rem;
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #436199;
  letter-spacing: 0;
  font-weight: 560;
}
.core-busy-right-laber{
  padding-left: 1rem;
  padding-top: 1.5rem;
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #999999;
  letter-spacing: 0;
}
.core-busy-right-line{
  margin-top: 5px;
  width: 2.5rem;
  margin-left: 1rem;
}
.core-equip-status{
  border-bottom: 2px solid #258AFF;
}
.core-busy-right-laber-style{

  color: #333333;
}
</style>



