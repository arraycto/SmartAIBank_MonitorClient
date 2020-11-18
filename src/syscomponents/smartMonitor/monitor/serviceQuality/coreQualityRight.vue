<template>
    <div class="core-quality-right">
      <div class="core-quality-right-title">
          <span>网点排名</span>
      </div>
      <div class="core-quality-right-laber">
        <el-row>
          <el-col style="text-align:center" :span="item.amount" @click.native="clickSaturation(index)" v-for="(item,index) in laberData" :key="index">
              <span><a href="#" :class="item.click === true?'core-quality-right-descs':'core-quality-right-desc'">{{item.desc}}</a></span>
              <div class="core-quality-right-line " v-bind:class="{'core-equip-status': item.click}"></div>
          </el-col>
        </el-row>
      </div>
      <div class="core-quality-right-table">
        <coreQualityBranchRank ref="coreQualityBranchRank" :queryRanklist="queryRanklist1" :topIndex="topIndex"></coreQualityBranchRank>
      </div>
    </div>
</template>

<script>

import coreQualityBranchRank from '@/syscomponents/smartMonitor/monitor/serviceQuality/coreQualityBranchRank'
import services from '../../../../services'
import base from '@/common/base'
export default {
  name: 'coreQualityRight',
  data () {
    return {
      queryType: 'eva',
      branchNo: '', // 机构号
      topIndex: 0,
      queryRanklist1: {},
      laberData: [{
        desc: '评价率',
        amount: 5,
        click: true
      }, {
        desc: '好评率',
        amount: 5,
        click: false
      }, {
        desc: '中评率',
        amount: 5,
        click: false
      },{
        desc: '差评率',
        amount: 5,
        click: false
      }, {
        desc: '客户身份识别率',
        amount: 9,
        click: false
      }]
    }
  },
  components: { coreQualityBranchRank
  },
  mounted () {
    this.branchNo = base.getStore({ key: 'orgId' })
    this.queryRank()
  },
  methods: {
    clickSaturation: function (index) {
      for (let idex = 0; idex < 4; idex++) {
        this.laberData[idex].click = false
      }
      this.topIndex = index
      this.laberData[index].click = true
      if (index === 0) {
        this.queryType = 'eva'
      } else if (index === 1) {
        this.queryType = 'good'
      } else if (index === 2) {
        this.queryType = 'mid'
      } else if (index === 3) {
        this.queryType = 'bad'
      }else {
        this.queryType = 'customer'
      }
      this.queryRank()
    },
    queryRank: async function () {
      try {
        // console.log(this.queryType)
        this.queryRanklist1 = await services.api.monitor.monitorQuality.getQualityRate(this.branchNo, this.queryType)
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    }
  },
  watch: {
    '$store.state.monitor.managerBranchId': function (value) {
      if (this.$store.state.monitor.managerBranchId != null) {
        this.branchNo = value.substring(0, value.length - 13)
        this.queryRank()
      }
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.queryRank()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.core-quality-right{
  background: #FFFFFF;
  box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
  border-radius: 8px;
}
.core-quality-right-title{
  padding: 1rem 0 1rem 1rem;
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #436199;
  letter-spacing: 0;
}
.core-quality-right-laber{
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  display:block;
  padding: 1rem 1rem 0.5rem 1rem 1rem;
  justify-content: center;
}
.core-quality-right-desc{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  letter-spacing: 0;
}
.core-quality-right-descs{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
}
.core-quality-right-table{
  padding: 0 1rem 0 1rem;
}
.core-quality-right-line{
  margin-top: 5px;
}
.core-equip-status{
  border-bottom: 2px solid #258AFF;
  // padding: 0 1rem 0 1rem;
}


</style>



