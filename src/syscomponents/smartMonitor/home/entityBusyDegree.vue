<template>
<div class="busy-degree-state">
  <div class="top-style">
    <span class="device-title-style" @click="moreClick" @mouseover="mouseOver" @mouseleave="mouseLeave">繁忙度 <i v-show="titleShow" class="title-icon icon-dcfs dcfs-gengduo1"></i><i v-show="!titleShow" class="title-icon-hover icon-dcfs dcfs-gengduo1"></i></span>
  </div>
  <div class="content-style">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-row>
                      <el-col :span="23">
                        <circlePanel :circleData="circleData[0]"/>
                      </el-col>
                      <el-col :span="1">
                        <div class="line"></div>
                      </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                      <el-col :span="23">
                        <circlePanel :circleData="circleData[1]"/>
                      </el-col>
                      <el-col :span="1">
                        <div class="line"></div>
                      </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                      <el-col :span="23">
                        <circlePanel :circleData="circleData[2]"/>
                      </el-col>
                      <el-col :span="1">
                        <div class="line"></div>
                      </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                      <el-col :span="24">
                        <circlePanel :circleData="circleData[3]"/>
                      </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="6">
                <el-row>
                      <el-col :span="23">
                        <circlePanel :circleData="circleData[4]"/>
                      </el-col>
                      <el-col :span="1">
                        <div class="line"></div>
                      </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                      <el-col :span="24">
                        <circlePanel :circleData="circleData[5]"/>
                      </el-col>
                </el-row>
            </el-col>
        </el-row>
    <!-- 折线图 -->
    <div class="device-state-chart" id="entityBusyDegreeChartId" v-if="this.isShow"></div>
    <occupied v-else height='282px' explain='暂无数据'/>
  </div>
</div>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions.js'
import occupied from '@/components/Occupied/occupied'
import circlePanel from '@/syscomponents/smartMonitor/home/circlePanel'
import services from '../../../services'
import base from '@/common/base'

export default {
  name: 'entityBusyDegree',
  data () {
    return {
      circleData: [{
        type: 'symbol',
        circleContent: '#dcfs-dengdaikehushu',
        color: '#258AFF',
        title: '等待客户数',
        count: 0,
        unit: '人'
      },
      {
        type: 'symbol',
        circleContent: '#dcfs-chuangkoupingjundengdaishu',
        color: '#AE64E8',
        title: '窗口平均等待客户数',
        count: 0,
        unit: '人'
      },
      {
        type: 'symbol',
        circleContent: '#dcfs-kehupingjundengdai',
        color: '#EE667F',
        title: '客户平均等待时间',
        count: 0,
        unit: '分钟'
      },
      {
        type: 'symbol',
        circleContent: '#dcfs-kehuzuichangdengdai',
        color: '#F5A623',
        title: '客户最长等待时间',
        count: 0,
        unit: '分钟'
      },
      {
        type: 'symbol',
        circleContent: '#dcfs-yikaichuangkou',
        color: '#55CFB4',
        title: '已开窗口数',
        count: 0,
        unit: '个'
      },
      {
        type: 'symbol',
        circleContent: '#dcfs-weikaichuangkou',
        color: '#C3C3C3',
        title: '未开窗口数',
        count: 0,
        unit: '个'
      }],
      titleShow: true,
      busyData: {},
      // 获取营业时间并做内部处理
      businessHours: [],
      // 获取分段时间客户数和等待时间
      timePhasedBusiness: [],
      isShow: false
    }
  },
  components: {
    occupied, circlePanel
  },
  mounted () {
    // 初始化获取数据
    this.getData()
  },
  methods: {
    async getData () {
      this.businessHours = []
      this.timePhasedBusiness = []
      try {
        const self = this
        let result = await services.api.monitor.monitorBusy.selectBusinessGatherInfo(base.getStore({ key: 'orgId' }), 1)
        self.busyData = result || {}
        // console.log(self.busyData)
        if (JSON.stringify(self.busyData) !== '{}') {
          self.$set(self.circleData[0], 'count', self.busyData.waitingCustomers || 0)
          self.$set(self.circleData[1], 'count', self.busyData.avgWindowWaitingCustomers || 0)
          self.$set(self.circleData[2], 'count', self.busyData.avgWaitingTime || 0)
          self.$set(self.circleData[3], 'count', self.busyData.maxWaitingTime || 0)
          self.$set(self.circleData[4], 'count', self.busyData.openWindowsCount || 0)
          self.$set(self.circleData[5], 'count', self.busyData.unopenedWindowsCount || 0)
        }
        result = await services.api.monitor.monitorBusy.getOrgBusinessHours(base.getStore({ key: 'orgId' }))
        if (JSON.stringify(result) !== '{}') {
          let startTime = result.startTime
          let endTime = result.endTime
          // 获取每个时间段的客户数和等待时间
          result = await services.api.monitor.monitorBusy.getPhasedBusyInfoBeforeCurrentTime(base.getStore({ key: 'orgId' }), 1, endTime, startTime)
          if (result.length !== 0) {
            self.timePhasedBusiness = result
            // 对两个所需数据数组同时进行数据处理 08:30 - 17:00，需要字符串分割，字符串连接
            startTime = startTime.split(':')
            endTime = endTime.split(':')
            // 获取小时部分 type:string
            let h = startTime[0]
            const endH = endTime[0]
            // 获取分钟部分 type:string
            const m = startTime[1]
            const endM = endTime[1]
            // 时间数值化 type:number
            let time = parseInt(h) + parseInt(m) / 100
            const endT = parseInt(endH) + parseInt(endM) / 100
            // 用于循环暂存数据
            let temp
            // 8.3 17.3 17 9.3  16.3 16 17.3 17
            while (true) {
              time++
              if (time <= endT) {
                h = parseInt(h)
                temp = h
                h++
                if (temp < 10) {
                  temp = '0' + temp
                }
                if (h < 10) {
                  h = '0' + h
                }
                self.businessHours.push(temp + ':' + m + '-' + h + ':' + m)
              } else {
                if (time - endT < 1) {
                  h = parseInt(h)
                  if (h < 10) {
                    h = '0' + h
                  }
                  self.businessHours.push(h + ':' + m + '-' + endH + ':' + endM)
                } else {
                  break
                }
              }
            }
            self.timePhasedBusiness.map((item, index) => {
              if (item.applyCustomers !== '0' || item.callCustomers !== '0') {
                self.isShow = true
              }
            })
            self.$nextTick(function () {
              self.initChart()
            })
          }
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    initChart () {
      if (!document.getElementById('entityBusyDegreeChartId')) return
      const chart = echarts.init(
        document.getElementById('entityBusyDegreeChartId')
      )
      const me = this
      const xAxis = []
      const waitingCustomersTemp = []
      const receiveCustomersTemp = []
      const barData = []

      me.businessHours.map(function (item, index) {
        xAxis.push(item)
      })
      me.timePhasedBusiness.map(function (item, index) {
        waitingCustomersTemp.push(item.applyCustomers)
        receiveCustomersTemp.push(item.callCustomers)
      })
      barData.push(waitingCustomersTemp)
      barData.push(receiveCustomersTemp)
      const mOption = options.doubleBar(xAxis, barData)

      chart.setOption(mOption, true)
      // 根据窗口的大小变动图表
      window.onresize = function () {
        chart.resize()
      }
    },
    moreClick () {
      this.$nextTick(function () {
        this.$store.commit('monitor/setBoardDoor', 'busyDegree')
      })
      this.$store.commit('monitor/updateBoard', 'monitor')
    },
    mouseOver () {
      this.titleShow = false
    },
    mouseLeave () {
      this.titleShow = true
    }
  },
  watch: {
    '$store.state.monitor.refreshTime': function (value) {
      this.getData()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.busy-degree-state{
  background: white;
  .top-style{
    padding-top: $largePadding;
    padding-bottom: $largePadding;
    border-bottom: 1px solid $lineColor;
    width: 97%;
    margin: 0 auto;
    .device-title-style{
      font-size: $smallFontSize;
      font-family: $titleFontFamily;
      color: $homeTitleColor;
      font-weight: bolder;
      cursor: pointer;
      .title-icon{
        font-size: $middleFontSize;
        color: $homeTitleColor;
      }
      .title-icon-hover{
        font-size: $middleFontSize;
        color: $homeBlueColor;
      }
    }
  }
  .content-style{
    width: 97%;
    margin: 0 auto;
    padding: $smallPadding;
    .line{
        width: 1px;
        height: 2.5em;
        background: $lineColor;
        }
    //修改子组件circlePanel的宽度属性，以方便文字在一行显示
    .circle-main-content{
        width: 10rem;
        /deep/ .right-title-content{
            width: 7.5rem;
        }
    }
    //设置charts部分样式
    .device-state-chart{
      width: 100%;
      height: 282px;
    }
  }
}
</style>




