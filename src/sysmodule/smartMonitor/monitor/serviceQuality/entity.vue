<template>
  <div class="entity-service-quality">
      <el-row>
        <div class="top">
          <div class="top-layput" v-for="(item,index) in dataSum" :key="index">
              <el-row>
                <el-col :span="17" >
                  <div :class="index===3?'service-quality-labers':'service-quality-laber'">
                    <span>{{item.desc}}</span>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div :class="item.customerRate!==''?'service-quality-value':'service-quality-values'" >
                    {{item.customerRate!==''?item.customerRate:'—'+' '+'—'}}
                  </div>
                </el-col>
              </el-row>
          </div>
        </div>
      </el-row>
      <div class="middle-layout">
        <el-row >
          <el-col :span="3">
            <div class="entity-rank">
              <!-- <img src="../../../../assets/smartOperate/hallMarket/potentialCustomer.png"> -->
               <!-- <i class="icon-dcfs dcfs-guiyuanpaiming"></i> -->
              <svg class="icon" aria-hidden="true" style=" height:32px;width:32px;">
                <use xlink:href="#dcfs-guiyuanpaiming"></use>
              </svg>
            </div>
            <div class="entity-rank">
              <div class="entity-rank-ption">柜员排名</div>
            </div>
          </el-col>
          <el-col :span="item.amount" :push="5" v-for="(item,index) in laberData" :key="index"  class="entity-menu">
            <div  @click="clickSaturation(index)">
              <span class="entity-menu-font" :class="item.click===true?'entity-menu-color1':'entity-menu-color2'" >{{item.desc}}</span>
              <div class="core-quality-right-line " v-bind:class="{'core-equip-status': item.click}"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    <div>
      <entitycard :topIndex="index"></entitycard>
    </div>
  </div>
</template>
<script>
import entitycard from '@/syscomponents/smartMonitor/monitor/serviceQuality/entityCard'
import services from '../../../../services'
import base from '@/common/base'
export default {
  name: 'entityServiceQuality',
  data () {
    return {
      // 汇总信息
      branchNo: '',
      laberData: [{
        desc: '评价率',
        amount: 3,
        click: true
      }, {
        desc: '好评率',
        amount: 3,
        click: false
      }, {
        desc: '中评率',
        amount: 3,
        click: false
      }, {
        desc: '差评率',
        amount: 3,
        click: false
      }],
      dataSum: [{
        desc: '评价率(%)',
        customerRate: ''
      }, {
        desc: '好评率(%)',
        customerRate: ''
      }, {
        desc: '中评率(%)',
        customerRate: ''
      }, {
        desc: '差评率(%)',
        customerRate: ''
      }, {
        desc: '客户身份识别率(%)',
        customerRate: ''
      }, {
        desc: '差评数(个)',
        customerRate: 0
      }],
      index: 0, // 导航菜单index
      defaultactive: '1'
    }
  },
  mounted () {
    this.branchNo = base.getStore({ key: 'orgId' })
    this.querySum()
  },
  components: {
    entitycard
  },
  methods: {
    handleSelect (index) {
      this.index = index
    },
    querySum: async function () {
      try {
        const data = await services.api.monitor.monitorQuality.getBranchQualitySum(this.branchNo)
        // console.log(this.branchNo)
        if (JSON.stringify(data) !== '{}') {
          this.dataSum[0].customerRate = data.evaluateRate || ''
          this.dataSum[1].customerRate = data.positiveRate || ''
          this.dataSum[2].customerRate = data.evaluateMidRate || ''
          this.dataSum[3].customerRate = data.negativeRate || ''
          this.dataSum[4].customerRate = data.customerRate || ''
          this.dataSum[5].customerRate = data.negativeCount || 0
        }
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    clickSaturation: function (index) {
      for (let idex = 0; idex < this.laberData.length; idex++) {
        this.laberData[idex].click = false
      }
      this.laberData[index].click = true
      this.index = index + 1
    }
  },
  watch: {
    '$store.state.monitor.tableBranchId': function (value) {
      if (this.$store.state.monitor.tableBranchId != null) {
        this.branchNo = value.substring(0, value.length - 13)
        this.querySum()
      }
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.querySum()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
.entity-service-quality{
  width: 100%;
  height: 100%;
}
.top-layput{
  background-image: linear-gradient(-131deg, #A36CFB 0%, #5671F5 100%);
  height:5rem;
  float: left;
  width: 19%;
  margin-right: 0.625%;
  margin-left: 0.625%;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0;
  position:relative;
  &:first-of-type{
    margin-left: 0%;
  }
  &:last-of-type{
    margin-right: 0%;
  }
}
.service-quality-laber{
  padding-top: 1.5rem;
  padding-left: 1rem;
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #FFFFFF;
  float: left;
}
.service-quality-labers{
  padding-top: 1.6rem;
  padding-left: 0.5rem;
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #FFFFFF;
  float: left;
}
.service-quality-value{
  float: right;
  padding-top: 1rem;
  padding-right: 0.5rem;
  font-family: DINAlternate-Bold;
  font-size: 32px;
  color: #FFFFFF;
  letter-spacing: 0;
}
.service-quality-values{
  float: right;
  padding-top: 1.6rem;
  padding-right: 0.5rem;
  font-family: DINAlternate-Bold;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 0;
}
.middle-layout{
  width: 100%;
  height: 100px;
}
.entity-rank{
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #4A4A4A;
  letter-spacing: 0;
  float: left;
  padding-top: 1.2rem;
  .entity-rank-ption{
    padding-top:0.3rem;
    margin-left:1rem;
  }
}
.el-menu--horizontal>.el-menu-item:not(.is-disabled):hover {
  background-color: transparent;
  color: $menuBg !important;
}
.entity-menu{
   font-family: PingFangSC-Semibold;
   font-size: 20px;
   color: #333333;
   letter-spacing: 0;
   padding-top: 1.5rem;
   cursor: pointer;
//  .entity-img{
//   background-image: url('../../../../assets/smartOperate/hallMarket/potentialCustomer.png');
//   background-size: auto;
//   background-repeat: no-repeat;
//   image-rendering: -webkit-optimize-contrast;
//   height: 6rem;
//   width:5rem;
//   margin-top: 3%;
//  }
}
.entity-menu-font{
  font-family: PingFangSC-Regular;
  font-size: 20px;
  letter-spacing: 0;
}
.entity-menu-color1{
  color: #333333;
}
.entity-menu-color2{
  color: #999999;
}
.core-equip-status{
  border-bottom: 2px solid #258AFF;
}
.core-quality-right-line{
  margin-top: 5px;
  width: 4rem;
}
</style>



