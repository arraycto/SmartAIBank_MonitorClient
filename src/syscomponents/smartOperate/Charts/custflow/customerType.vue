<template>
  <div class="height-100" v-if="chartData!=null&&chartData.timePartCustFlowForPublicList!=null&&chartData.timePartCustFlowForPublicList.length>0">
    <el-row class="first-item">
      <el-col :span="23" :offset="1">
        <div class="first-show-data">各时段接待客户数</div>
      </el-col>
    </el-row>
    <div class="first-scale">
      {{this.chartData.privateRate}}%
    </div>
     <div class="second-scale">
      {{this.chartData.publicRate}}%
    </div>
    <el-row type="flex" class="second-item" justify="center">
      <el-col :span="3">
        <div>
          对私客户
        </div>
      </el-col>
      <el-col :span="3" id="firstScalePhoto">
        <div class="first-scale-photo"></div>
      </el-col>
      <el-col>
        <div class="break-line"></div>
      </el-col>
      <el-col :span="3" id="secondScalePhoto">
        <div class="second-scale-photo"></div>
      </el-col>
      <el-col :span="3">
        <div>
          对公客户
        </div>
      </el-col>
    </el-row>
    <el-row class="last-item">
      <el-col :span="24" class="height-100">
        <div id="customerTypeId" class="height-100"></div>
      </el-col>
    </el-row>
  </div>
  <occupied v-else height='100%' explain="暂无各时段接待客户数数据"/>
</template>

<script>
import echarts from 'echarts'
import options from './chartOptions'
import occupied from '@/components/Occupied/occupied'

export default {
  name: 'customerTypeChart',
  props: {
    chartData: {
      type: Object
    }
  },
  components: { occupied },
  data () {
    return {
    }
  },
  mounted () {
    if (this.chartData != null) {
      this.initChart()
    }
  },
  methods: {
    initChart () {
      if (!(document.getElementById('customerTypeId'))) return
      this.chart = echarts.init(document.getElementById('customerTypeId'))
      // 动态计算比例
      document.getElementById('firstScalePhoto').style.width = 0.25 * this.chartData.privateRate + '%'
      document.getElementById('secondScalePhoto').style.width = 0.25 * this.chartData.publicRate + '%'
      var periodData = []
      var privateData = []
      var publicData = []
      this.chartData.timePartCustFlowForPublicList.map((item) => {
        periodData.push(item.timeStep)
        privateData.push(item.receivePrivateCount)
        publicData.push(item.receivePublicCount)
      })
      const mOption = options.customerTypeOption(periodData, privateData, publicData)
      this.chart.setOption(mOption, true)
    }
  },
  watch: {
    'chartData.timePartCustFlowForPublicList': {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) this.initChart()
        })
      },
      deep: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.height-100 {
  height: 100%;
}
.first-scale {
  font-family: Arial;
  font-size: 20px;
  color: #258AFF;
  font-weight:700;
  position:absolute;
  left:69%;
  top: 15%;
}
.first-scale-photo {
  height:15%;
  background-image: linear-gradient(90deg, #59D1F8 0%, #599CF8 96%);
  width:100%;
  border-top-left-radius:5px;
  border-bottom-left-radius:5px;
}
.second-scale {
  font-family: Arial;
  font-size: 20px;
  color: #50E6F1;
  font-weight:700;
  position:absolute;
  left:78.5%;
  top: 15%;
}
.break-line {
  width:100%;
  background-color:#599CF8;
  height:25%;
}
.second-scale-photo {
  height:15%;
  background-image: linear-gradient(90deg, #20D6E3 2%, #50E6F1 50%);
  width:100%;
  border-top-right-radius:5px;
  border-bottom-right-radius:5px;
}
.first-item {
  height: 15%;
}
.second-item {
  margin-top: 1%;
  font-size:12px;
  color: #4A4A4A;
  font-weight:700;
  height: 12%;
}
.last-item {
  height: 72%;
}
.first-item > div {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: flex-end;
}
.second-item > div {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
}
.second-item > div:nth-child(3){
  width:0.2rem;
}
.second-item > div:last-child{
  justify-content:flex-end;
}
.first-show-data {
  font-family: PingFang SC;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 0;
  font-weight: 700;
}
</style>

