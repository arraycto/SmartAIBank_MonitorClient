<template>
  <div class="index-content">
    <div style="width:100%;" class="container-right">
      <top-header ref="topHeader" :obj="obj" @tableList="tableList" @queryCharts="queryCharts" @tabsChange="tabsChange"></top-header>
      <div class="echartBox">
        <el-row>
          <el-col :span="24">
            <div class="echarts" style="width:100%;height:20rem;" id="deviceChart" v-show="isEcharts.isable"></div>
          </el-col>
        </el-row>
        <div slot="empty" v-if="IsEmpty">
          <occupied guangdiant='52.4vh' explain='暂无数据'/>
        </div>
        <el-row>
          <el-col :span="24">
            <el-button size="mini" class="btn-isShow" @click="Echarts">
              {{isEcharts.name}}
              <span class="btn-isShow-border-echart el-icon-d-arrow-right"></span>
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="btn-locat"></div>
      <div class="reportAllwarn">
        <div class="allwarn-top">
          共{{tableDate.total!==undefined?tableDate.total:0}}条记录
        </div>
        <el-table
        :data="tableDate.list"
        style="width: 100%"
        size="samll"
        stripe
        fixed
        :header-cell-style="theadClassName"
        class = "allWarn-table">
          <el-table-column
          :prop="item.prop"
          v-for="(item,index) in mclassNameList"
          :key="index"
          :label="item.label"
          :min-width="item.width">
          </el-table-column>
          <div slot="empty">
            <occupied guangdiant='52.4vh' explain='暂无数据'/>
          </div>
        </el-table>
      </div>
      <pagination
      class="pagination-item"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="obj.historyReportParams.pageNum"
      :page-size="obj.historyReportParams.pageSize"
      :total="tableDate.total"
      position="relative"/>
    </div>
  </div>
</template>
<script>
// import deviceOperation from '@/dummy/smartMonitor/history/report/deviceOperation.json'
import TopHeader from '@/syscomponents/smartMonitor/history/StatisticalReports/top'
import occupied from '@/components/Occupied/occupied'
import echarts from 'echarts'
import options from './deviceOperationEcharts.js'
import pagination from '@/syscomponents/smartMonitor/pagination/pagination'
import services from '../../../../services'
import base from '@/common/base'
export default {
  data: function () {
    return {
      quarterList: [{
        value: '1',
        label: '第一季度',
        disabled: false
      }, {
        value: '2',
        label: '第二季度',
        disabled: false
      }, {
        value: '3',
        label: '第三季度',
        disabled: false
      }, {
        value: '4',
        label: '第四季度',
        disabled: false
      }],
      tableDate: {}, // 数据容器
      result: [], // echarts数据容器
      datePicker: [], // 默认开始结束时间
      mclassNameList: [], // 表头项
      mclassNameList1: [ // 机具故障
        {
          width: '20'
        }, {
          label: '设备类型',
          prop: 'toolClassName',
          width: '75'
        }, {
          label: '设备型号',
          prop: 'toolModelName',
          width: '75'
        }, {
          label: '设备厂商',
          prop: 'manufName',
          width: '75'
        }, {
          label: '机具故障时间(分钟)',
          prop: 'faultTime',
          width: '75'
        }, {
          label: '机具故障率',
          prop: 'devFaultRate',
          width: '75'
        }],
      mclassNameList2: [  // 网络通讯故障
        {
          width: '20'
        }, {
          label: '设备类型',
          prop: 'toolClassName',
          width: '75'
        }, {
          label: '设备型号',
          prop: 'toolModelName',
          width: '75'
        }, {
          label: '设备厂商',
          prop: 'manufName',
          width: '75'
        }, {
          label: '网络故障时间(分钟)',
          prop: 'faultTime',
          width: '75'
        }, {
          label: '网络故障率',
          prop: 'devFaultRate',
          width: '75'
        }],
      mclassNameList3: [  // 机具开机
        {
          width: '20'
        }, {
          label: '设备类型',
          prop: 'toolClassName',
          width: '75'
        }, {
          label: '设备型号',
          prop: 'toolModelName',
          width: '75'
        }, {
          label: '设备厂商',
          prop: 'manufName',
          width: '75'
        }, {
          label: '机具开机时间(分钟)',
          prop: 'faultTime',
          width: '75'
        }, {
          label: '机具开机率',
          prop: 'devFaultRate',
          width: '75'
        }],
      obj: {
        branchId: base.getStore({ key: 'orgId' }), // 机构
        historyReportParams: { // 请求参数
          branchId: base.getStore({ key: 'orgId' }),
          dataType: 'TOOL', // 报表类型
          reportType: 'day', // 报表周期，日报表，月报表，季报表，年报表
          devClassKey: [], // 设备类型（'a,b,c'格式）
          endDate: '', // 结束日期
          manufId: [], // 厂商（'a,b,c'格式
          isManager: false,
          month: '', // 月
          pageNum: 1, // 当前页数
          pageSize: 10, // 每页大小
          quarter: '', // 季
          startDate: '', // 开始日期
          year: '' // 年
        }
      },
      IsEmpty: true, // 暂无数据
      isEcharts: {
        name: '收起',
        isable: false
      }
    }
  },
  components: {
    TopHeader, pagination, occupied
  },
  mounted () {
    this.getdatatime()
    this.queryCharts('initSelect')
    this.tabsChange()
  },
  methods: {
    queryCharts: async function (type) { // echarts 数据查询
      try {
        var self = this
        // self.getdatatime()
        self.IsEmpty = false
        // self.obj.branchId = base.getStore({ 'key': 'orgId' })
        // self.obj.historyReportParams.startDate = '20190701'
        // self.obj.historyReportParams.endDate = '20190826'
        self.result = await services.api.monitor.historyReport.getHistroyGraphic(self.obj.historyReportParams.branchId, self.obj.historyReportParams)
        self.isEcharts.isable = true
        self.$nextTick(function () {
          self.initChart()
        })
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    initChart () { // echarts数据处理逻辑
      var arrList = []
      this.result.deviceType.map((item, index) => {
        if (item.devClassKey === '130000' || item.devClassKey === '100000') {
          arrList.push(item)
        }
      })
      // var arrList = this.result.deviceType

      var arrList2 = this.result.minfos
      const array1 = []
      const array2 = []
      const xAxis = []
      arrList2.map((item, index) => {  // 图标动态赋值
        array1.push({
          name: item.manufName,
          icon: 'circle'
        })
      })
      // 获取坐标
      arrList.map((item, index) => {
        xAxis.push(item.devClassName)
      })
      // 处理数据
      let name
      const colorList1 = ['#77B6FF', '#73E9EE', '#F7D205', '#FFA3A3', '#C7B3FF', '#77B6FF', '#73E9EE', '#F7D205', '#FFA3A3', '#C7B3FF']
      const colorList2 = ['#258AFF', '#42DFE6', '#EAB538', '#E46C6C', '#9E7EF7', '#258AFF', '#42DFE6', '#EAB538', '#E46C6C', '#9E7EF7']
      let color1
      let color2
      let yListArray = Array(arrList.length).fill(0)
      arrList2.map((item1, index1) => {
        name = item1.manufName
        arrList.map((item, index) => {
          if (item1.infos != null) {
            item1.infos.map((item2, index2) => {
              arrList.map((item, index) => {
                if (item2.deviceKey === item.devClassKey) {
                  yListArray[index] = {
                    value: item2.devFaultRate
                  }
                }
              })
            })
          }
        })
        color1 = colorList1[index1]
        color2 = colorList2[index1]
        // debugger
        const data = this.setCharts(name, yListArray, color1, color2)
        array2.push(data)
        yListArray = Array(arrList.length).fill(0)
      })
      const chartId = document.getElementById('deviceChart')
      // const interval = setInterval(() => {
      //   if (chartId.offsetWidth > 0) {
      //     clearInterval(interval)
      const chart = echarts.init(chartId)
      const yName = '故障率( % )'
      const mOption = options.lineColOption(xAxis, yName, array1, array2)
      chart.setOption(mOption, true)
      // 根据窗口的大小变动图表
      // window.onresize = function () {
      //   chart.resize()
      // }
      // }
      // }, 1000)
    },
    // series动态数据处理
    setCharts (name, arr, color1, color2) {
      var data = {
        'name': name,
        'type': 'bar',
        'data': arr,
        'barWidth': 20,
        'itemStyle': {
          'normal': {
            'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: color1 },
              { offset: 1, color: color2 }
            ]
            ),
            'barBorderRadius': 10
          }
        }
      }
      return data
    },

    Echarts () { // Echarts展示
      const btn = document.getElementsByClassName('btn-isShow-border-echart')
      if (this.isEcharts.isable === true) {
        btn[0].style.transform = 'rotate(90deg)'
        this.isEcharts.isable = false
        this.isEcharts.name = '展示'
      } else {
        btn[0].style.transform = 'rotate(-90deg)'
        this.isEcharts.isable = true
        this.IsEmpty = false
        this.isEcharts.name = '收起'
        this.queryCharts()
      }
    },
    tableList (res) { // 将查询数据赋给列表
      this.tableDate = res
    },
    query: async function (historyReportParams) { // 获取数据
      try {
        const self = this
        self.getdatatime()
        self.queryCharts()
        self.tableDate = await services.api.monitor.historyReport.getHistroyReportInfo(self.obj.historyReportParams.branchId, self.obj.historyReportParams)
        this.tableList(self.tableDate)
      } catch (error) {
        this.$message({
          message: error.message,
          type: 'error'
        })
      }
    },
    getdatatime () { // 默认开始结束日期
      const nowDate = new Date().getTime() - 1000 * 60 * 60 * 24
      const year =  new Date(nowDate).getFullYear()
      var month = new Date(nowDate).getMonth() + 1
      var day = new Date(nowDate).getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      const date = year + '/' + month + '/' + day
      this.obj.historyReportParams.startDate = date
      this.obj.historyReportParams.endDate = date
    },
    // 调整头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333;font-size: 14px;font-family: PingFangSC-Semibold;'
      }
    },
    // 每页条数
    handleSizeChange (val) {
      this.obj.historyReportParams.pageSize = val
      this.query()
    },
    // 当前页数
    handleCurrentChange (val) {
      this.obj.historyReportParams.pageNum = val
      this.query()
    },
    // tabs切换调用方法
    tabsChange () {
      if (this.obj.historyReportParams.dataType === 'NETWORK') {
        this.mclassNameList = this.mclassNameList2
      } else if (this.obj.historyReportParams.dataType === 'NORMAL') {
        this.mclassNameList = this.mclassNameList3
      } else {
        this.mclassNameList = this.mclassNameList1
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.index-content{
      .el-checkbox{
      margin-right: 1vw !important;
  }
  .reportAllwarn{
    font-size: 14px;
    background:transparent;
    .allWarn-table{
      border-radius:0.5rem;
      .el-table_7_column_51{
        padding-left: 4vw;
      }
    }
    .allwarn-top{
    margin: 0.5rem;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4A4A4A;
    letter-spacing: 0;
    text-align: right;
    }
    .el-table__body-wrapper{
      color: #4A4A4A;
      font-family: PingFangSC-Regular;
      font-size: 14px;
    }
    .pagination-item{
      margin: 1.5rem 0;
      margin-left:1rem
    }
  }
  .btn-locat{
    width: 100%;
    height: 10px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
  }
}
</style>
