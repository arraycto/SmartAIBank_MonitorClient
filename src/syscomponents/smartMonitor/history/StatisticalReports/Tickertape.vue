<template>
  <div class="tickertape">
    <!-- top begin -->
    <div class="top">
      <el-row :span="5" style="margin-left:1vw;">
        <el-col :span="4">
          <span class="top-text" style="margin-right:15px;">机构</span>
          <el-select
            v-model="orgId"
            size="mini"
            placeholder="请选择"
            class="top-select"
            @change="orgChange"
            filterable
          >
            <el-option
              v-for="(item, index) in orglist"
              :key="index"
              :label="item.orgId + '-' + item.orgNameCn"
              :value="item.orgId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="top-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报表周期</span>
          <el-select
            v-model="dateId"
            size="mini"
            placeholder="月报表"
            class="top-select"
            @change="selectChange"
          >
            <el-option v-for="item in dateList" :key="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :span="9">
          <!--
        <el-col class="day" v-show="isDay">
          <span class="top-text">起止时间</span>
          <el-date-picker
            v-model="datePicker"
            type="daterange"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期" class="top-picker" size="mini"
            :picker-options="{disabledDate: time => time.getTime() > Date.now()- 3600 * 1000 * 24 || time.getTime() < Date.now()- 3600 * 1000 * 24 * 90}">
          </el-date-picker>
          </el-col>-->
          <!-- 月份控件 -->
          <el-col class="month" v-show="isMonth">
            <span class="demonstration">时间</span>
            <el-date-picker
              v-model="month"
              type="month"
              size="mini"
              class="top-month"
              format="yyyy/MM"
              :picker-options="{disabledDate: time => time.getTime() > Date.now() -3600*1000*24*30 || time.getTime() < Date.now()- 3600 * 1000 * 24 * 30 *24}"
              placeholder="选择月"
            ></el-date-picker>
          </el-col>
          <!-- 季度控件 -->
          <el-col class="quarter" v-show="isQuarter">
            <span class="demonstration">时间</span>
            <el-date-picker
              v-model="quarterYear"
              type="year"
              size="mini"
              format="yyyy"
              value-format="yyyy"
              class="top-quarter-year"
              :picker-options="{disabledDate: time => time.getTime() > Date.now() || time.getTime() < Date.now() -3600*1000*24*365*3}"
              placeholder="选择年份"
            ></el-date-picker>
            <span class="demonstration quarter-span">季度</span>
            <el-select
              v-model="quarterMonth"
              placeholder="请选择"
              class="quarter-select"
              size="mini"
              clearable
            >
              <el-option
                v-for="item in quarterList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-col>
          <!-- 年份控件 -->
          <el-col class="year" v-show="isYear">
            <span class="demonstration">时间</span>
            <el-date-picker
              v-model="year"
              type="year"
              size="mini"
              format="yyyy"
              value-format="yyyy"
              class="top-year"
              :picker-options="{disabledDate: time => time.getTime() > Date.now() -3600*1000*24*365}"
              placeholder="选择年份"
            ></el-date-picker>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="margin-left:1vw;">
          <span class="span">设备类型</span>
          <el-radio-group v-model="checkedDevice" size="small" class="equipTypelist">
            <!--<el-button size="small" :checkAll='checkAll' class="checkAll" @click="handleCheckAllChange">全部</el-button>-->
            <el-radio
              v-for="item in equipTypelist"
              :label="item.devClassKey"
              :key="item.devClassKey"
              @change="handleCheckedCitiesChange"
              border
            >{{item.devClassName}}</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <div style="padding:0.5vw 0;"></div>
      <el-row style="margin-left:1vw;">
        <el-col :span="20">
          <span class="span">设备厂商</span>
          <el-checkbox-group v-model="allEquips" size="mini" class="equipTypelist">
            <el-checkbox label="全部" @change="DevModelAllChange" border></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="modelCities" size="mini" class="equipTypelist">
            <!--<el-button :autofocus='!!autofocus' size="small" :DevModel='DevModel' class="checkAll" @click="DevModelAllChange">全部</el-button>-->
            <el-checkbox
              v-for="item in getDevModel"
              :label="item.manufacturerId"
              :key="item.manufacturerId"
              @change="manufIdChange"
              border
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="4" class="top-btn">
          <el-button type="primary" size="mini" @click="queryAll('queryByUser')">查询</el-button>
          <tableReport
            :tableParams="tableParams.historyReportParams"
            :branchId="tableParams.branchId"
            :buttonId="'tickertape'"
          ></tableReport>
        </el-col>
      </el-row>
    </div>
    <!-- top end -->

  <!-- echart begin -->
  <div class="echartbtn" v-show="!isEcharts.isable">
    <div class="btn-bg"></div>
    <el-row>
      <el-col :span="24">
        <el-button size="mini" class="btn-isShow" @click="Echarts">
          {{isEcharts.name}}
          <span class="btn-isShow-border el-icon-d-arrow-right"></span>
        </el-button>
      </el-col>
    </el-row>
  </div>
  <div class="tickertape-echart" v-show="isEcharts.isable">
    <div class="tickertape-echarts" id="tickertapeChart" v-show="chartData.length !== 0"></div>
    <occupied v-show="chartData.length === 0" height="20rem" explain="暂无数据" />
    <el-row>
      <el-col :span="24">
        <el-button size="mini" class="btn-isShow" @click="Echarts">
          {{isEcharts.name}}
          <span class="btn-isShow-border-echart el-icon-d-arrow-right"></span>
        </el-button>
      </el-col>
    </el-row>
  </div>
  <!-- echart end -->

    <!-- record begin -->
    <div class="record">共{{allData.total}}条记录</div>
    <!-- record end -->

  <!-- list begin -->
  <div class="list">
    <el-table
        :data="tableData"
        stripe
        fixed
        style="width: 100%"
        :header-cell-style="theadClassName"
        class="list-table">
        <el-table-column min-width="20">
        </el-table-column>
        <el-table-column
        prop="devClassName"
        label="设备类型"
        min-width="75">
        </el-table-column>
        <el-table-column
        prop="manufacturerName"
        label="设备厂商"
        min-width="75">
        </el-table-column>
        <el-table-column
        prop="numberOfReplacements"
        label="更换次数"
        min-width="75">
        </el-table-column>
        <el-table-column
        prop="useTime"
        label="使用时间(小时)"
        min-width="75">
        </el-table-column>
        <el-table-column
        prop="selfAvgUseTime"
        label="平均使用小时"
        min-width="75">
        </el-table-column>
        <el-table-column
        prop="allAvgUseTime"
        label="平均使用小时-均值"
        min-width="75">
        </el-table-column>
        <el-table-column
        prop="useTimeCompareResult"
        label="均值对比"
        min-width="75">
        </el-table-column>
         <div slot="empty" v-if="allData.total==0">
            <occupied height='200px' explain='暂无数据'/>
        </div>
      </el-table>
    </div>
    <pagination
      class="pagination-item"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tableParams.historyReportParams.pageNum"
      :page-size="tableParams.historyReportParams.pageSize"
      :total="allData.total"
      position="relative"
    />
    <!-- list end -->
  </div>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions.js'
import pagination from '@/syscomponents/smartMonitor/pagination/pagination'
import tableReport from '@/syscomponents/smartMonitor/history/StatisticalReports/tableReport'
import occupied from '@/components/Occupied/occupied'
import services from '../../../../services'
import base from '@/common/base'
// import tickertapeData from '@/dummy/smartMonitor/history/report/tickertape.json'
export default {
  data: function () {
    return {
      dateList: ['月报表', '季报表', '年报表'], // 报表周期数据容器
      quarterList: [{
        value: '1',
        label: '第一季度',
        disabled: true
      }, {
        value: '2',
        label: '第二季度',
        disabled: true
      }, {
        value: '3',
        label: '第三季度',
        disabled: true
      }, {
        value: '4',
        label: '第四季度',
        disabled: true
      }],
      quarterMonth: '', // 季度月份
      quarterYear: '', // 季度年份
      dateId: '月报表',
      orgId: base.getStore({ key: 'orgId' }),
      checkAll: false,
      orglist: [], // 机构备选数据容器
      equipTypelist: [], // 设备类型备选数据
      equipTypelistCopy: [], // copy
      checkedDevice: '', // 设备类型选中数据
      devClassKey: '',
      DevModel: true, // 厂商全选值
      getDevModel: [], // 设备厂商备选数据
      getDevModelCopy: [], // 厂商copy
      modelCities: [], // 设备厂商选中数据
      allEquips: ['全部'],
      // isDay: true,
      isMonth: true,
      isQuarter: false,
      isYear: false,
      datePicker: [], // 起止日期
      year: new Date(new Date().getTime() - 3600 * 1000 * 24 * 365).getFullYear() + '', // 默认年份
      month: new Date(new Date().getTime() - 3600 * 1000 * 24 * 30), // 默认月份
      isEcharts: {
        name: '收起',
        isable: true
      },
      allData: [],
      //  表格显示数据
      tableData: [],
      //  图表显示数据
      chartData: [],
      //  向后端请求数据需要参数
      tableParams: {
        branchId: base.getStore({ key: 'orgId' }), // 机构
        historyReportParams: { // 请求参数
          reportType: 'month', // 报表周期，日报表，月报表，季报表，年报表
          devClassKey: '', // 设备类型（'a,b,c'格式）
          endDate: '', // 结束日期
          manufacturerIds: [], // 厂商（'a,b,c'格式
          month: '', // 月
          pageNum: 1, // 当前页数
          pageSize: 10, // 每页大小
          quarter: '', // 季
          startDate: '', // 开始日期
          year: '' // 年
        }
      },
      chartParams: {
        branchId: base.getStore({ key: 'orgId' }), // 机构
        historyReportParams: { // 请求参数
          reportType: 'month', // 报表周期，日报表，月报表，季报表，年报表
          devClassKey: '', // 设备类型（'a,b,c'格式）
          endDate: '', // 结束日期
          manufacturerIds: [], // 厂商（'a,b,c'格式
          month: '', // 月
          quarter: '', // 季
          startDate: '', // 开始日期
          year: '', // 年,
          manager: false
        }
      }
    }
  },
  mounted () {
    this.view()
  },
  components: {
    pagination, occupied, tableReport
  },
  methods: {
    DevModelAllChange () {
      this.DevModel = !this.DevModel
      this.tableParams.historyReportParams.manufacturerIds = []
      this.chartParams.historyReportParams.manufacturerIds = []
      if (this.DevModel == true) {
        this.modelCities = this.getDevModelCopy.map(_ => _.manufacturerId)
      } else {
        this.modelCities = []
      }
    },
    manufIdChange () { // 设备厂商选中值
      this.tableParams.historyReportParams.manufacturerIds = this.modelCities
      this.chartParams.historyReportParams.manufacturerIds = this.modelCities
      if (this.modelCities.length === this.getDevModelCopy.length) {
        this.tableParams.historyReportParams.manufacturerIds = []
        this.chartParams.historyReportParams.manufacturerIds = []
        this.allEquips.push('全部')
        this.DevModel = true
      } else {
        this.allEquips = []
        this.DevModel = false
      }
    },
    async handleCheckedCitiesChange () {  // 设备类型选中值
      this.tableParams.historyReportParams.devClassKey = this.checkedDevice
      this.chartParams.historyReportParams.devClassKey = this.checkedDevice
      // this.getDevModel = []
      try {
        // let devModellist
        const devModellist  = await services.api.monitor.monitorCondition.getDevModel(this.checkedDevice, null)
        this.getDevModel = []
        devModellist.map((item, index) => {
          this.getDevModel.push({
            'manufacturerId': item.manufacturerId,
            'name': item.name
          })
        })
        this.getDevModelCopy = []
        this.modelCities = []
        this.getDevModelCopy = this.getDevModel.map(_ => ({ ..._ }))
        this.modelCities = this.getDevModelCopy.map(_ => _.manufacturerId)
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    /*
    handleCheckAllChange () { // 多选按钮
      this.checkAll = !this.checkAll
      this.tableParams.historyReportParams.devClassKey = []
      if (this.checkAll === true) {
        this.checkedCities = this.equipTypelistCopy.map(_ => _.devClassName)
      } else {
        this.checkedCities = []
      }
    }, */
    Echarts () { // Echarts展示
      if (this.isEcharts.isable === false) {
        this.isEcharts.isable = true
        this.isEcharts.name = '收起'
        this.btnShow = false
        this.$nextTick(function () {
          this.queryChartData()
        })
      } else {
        this.btnShow = true
        this.isEcharts.isable = false
        this.isEcharts.name = '展示'
      }
    },
    initChart () {
      const chartId = document.getElementById('tickertapeChart')
      const interval = setInterval(() => {
        if (chartId.offsetWidth > 0) {
          clearInterval(interval)
          const chart = echarts.init(chartId)
          const xAxis = []
          const barData = []
          const chartData = this.chartData
          chartData.map(function (item) {
            xAxis.push(item.manufacturerName)
            barData.push(item.selfAvgUseTime)
          })
          const yName = '平均使用时间(小时)'

          const mOption = options.lineColOption(xAxis, yName, barData)

          chart.setOption(mOption, true)

          // 根据窗口的大小变动图表
          window.onresize = () => {
            chart.resize()
          }
        }
      }, 100)
    },
    getDateTime () { // 默认开始结束日期
      const nowDate = new Date()
      const year = nowDate.getFullYear()
      var month = nowDate.getMonth() + 1
      var day = nowDate.getDate() - 1
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      const date = year + '/' + month + '/' + day
      // 空数组赋值2次
      this.datePicker.push(date)
      this.$set(this.datePicker, 1, date)
      this.view()
    },
    // 查询下拉列表备选数据
    async view () {
      try {
        const BranchList = base.getStore({ key: 'monitorBranchList' })
        this.orglist = JSON.parse(BranchList)
        this.equipTypelist = await services.api.monitor.monitorCondition.getDevType()
        this.equipTypelistCopy = this.equipTypelist.map(_ => ({ ..._ }))
        this.getDevModel = await services.api.monitor.monitorCondition.getDevModel('130000', null)
        this.getDevModelCopy = this.getDevModel.map(_ => ({ ..._ }))

        //  默认选中
        this.checkedDevice = this.equipTypelistCopy[1].devClassKey
        this.modelCities = this.getDevModelCopy.map(_ => _.manufacturerId)
        //  默认向后台查询传参
        //  选中的设备
        this.tableParams.historyReportParams.devClassKey = this.checkedDevice
        this.chartParams.historyReportParams.devClassKey = this.checkedDevice
        // 查询图表数据
        this.queryChartData()
        // 查询表格数据
        this.queryTableData()
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    async queryTableData (type) {
      try {
        const self = this
        const branchList = JSON.parse(base.getStore({ key: 'monitorBranchList' }))
        branchList.map((item, index) => {
          if (item.orgId === self.orgId) {
            // const orgType = item.orgTypeId
            if (item.orgTypeId === '1' || item.orgTypeId === '5') {
              self.tableParams.historyReportParams.manager = true
            } else {
              self.tableParams.historyReportParams.manager = false
            }
          }
        })
        //  处理表格查询参数
        switch (self.tableParams.historyReportParams.reportType) {
        case 'month':
          const date = new Date(self.month)
          self.tableParams.historyReportParams.startDate = ''
          self.tableParams.historyReportParams.endDate = ''
          self.tableParams.historyReportParams.year = date.getFullYear() + ''
          self.tableParams.historyReportParams.month = date.getMonth() + 1 + ''
          self.tableParams.historyReportParams.quarter = ''
          break
        case 'quarter':
          self.tableParams.historyReportParams.startDate = ''
          self.tableParams.historyReportParams.endDate = ''
          self.tableParams.historyReportParams.year = this.quarterYear
          self.tableParams.historyReportParams.month = ''
          self.tableParams.historyReportParams.quarter = this.quarterMonth
          break
        case 'year':
          self.tableParams.historyReportParams.startDate = ''
          self.tableParams.historyReportParams.endDate = ''
          self.tableParams.historyReportParams.year = this.year
          self.tableParams.historyReportParams.month = ''
          self.tableParams.historyReportParams.quarter = ''
          break
        /*
        default:
          self.datePicker[0] = self.datePicker[0].split('/').join('')
          self.datePicker[1] = self.datePicker[1].split('/').join('')
          self.tableParams.historyReportParams.startDate = self.datePicker[0]
          self.tableParams.historyReportParams.endDate = self.datePicker[1]
          self.tableParams.historyReportParams.year = ''
          self.tableParams.historyReportParams.month = ''
          self.tableParams.historyReportParams.quarter = ''
          break */
        }
        self.allData = await services.api.monitor.historyReport.getEquipmentSupplies(self.tableParams.branchId, self.tableParams.historyReportParams)
        // self.allData = tickertapeData.allData
        if (self.allData.list.length === 0 && type !== undefined) {
          this.$message({
            message: '暂无数据'
          })
        }
        self.tableData = self.allData.list
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    async queryChartData (type) {
      try {
        const self = this
        const branchList = JSON.parse(base.getStore({ key: 'monitorBranchList' }))
        branchList.map((item, index) => {
          if (item.orgId === self.orgId) {
            // const orgType = item.orgTypeId
            if (item.orgTypeId === '1' || item.orgTypeId === '5') {
              self.chartParams.historyReportParams.manager = true
            } else {
              self.chartParams.historyReportParams.manager = false
            }
          }
        })
        //  处理图表查询参数
        switch (self.chartParams.historyReportParams.reportType) {
        case 'month':
          const date = new Date(self.month)
          self.chartParams.historyReportParams.startDate = ''
          self.chartParams.historyReportParams.endDate = ''
          self.chartParams.historyReportParams.year = date.getFullYear() + ''
          self.chartParams.historyReportParams.month = date.getMonth() + 1 + ''
          self.chartParams.historyReportParams.quarter = ''
          break
        case 'quarter':
          self.chartParams.historyReportParams.startDate = ''
          self.chartParams.historyReportParams.endDate = ''
          self.chartParams.historyReportParams.year = this.quarterYear
          self.chartParams.historyReportParams.month = ''
          self.chartParams.historyReportParams.quarter = this.quarterMonth
          break
        case 'year':
          self.chartParams.historyReportParams.startDate = ''
          self.chartParams.historyReportParams.endDate = ''
          self.chartParams.historyReportParams.year = this.year
          self.chartParams.historyReportParams.month = ''
          self.chartParams.historyReportParams.quarter = ''
          break
          /*
        default:
          self.datePicker[0] = self.datePicker[0].split('/').join('')
          self.datePicker[1] = self.datePicker[1].split('/').join('')
          self.chartParams.historyReportParams.startDate = self.datePicker[0]
          self.chartParams.historyReportParams.endDate = self.datePicker[1]
          self.chartParams.historyReportParams.year = ''
          self.chartParams.historyReportParams.month = ''
          self.chartParams.historyReportParams.quarter = ''
          break */
        }
        // console.log(this.chartParams)
        self.chartData = await services.api.monitor.historyReport.getEquipmentSuppliesGraphicInfo(self.chartParams.branchId, self.chartParams.historyReportParams)
        // self.chartData = tickertapeData.chartData
        if (self.chartData.length !== 0) {
          this.$nextTick(function () {
            self.initChart()
          })
        } else if (type !== undefined) {
          self.$message({
            message: '暂无数据'
          })
        }
        // console.log(self.chartData)
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    checkNull (type) {
      if (this.tableParams.branchId === '') {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      if (this.isMonth === true && this.month === null) {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      if (this.isQuarter === true && this.quarterYear === null) {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      if (this.isYear === true && this.year === null) {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      this.queryTableData(type)
      this.queryChartData(type)
    },
    //  按条件查询
    queryAll (type) {
      this.checkNull(type)
    },
    //  导出报表
    exportReport () {

    },
    /*
    YearDate () { // 年报表控件赋值
      this.tableParams.historyReportParams.year = this.year
      this.chartParams.historyReportParams.year = this.year
    },
    changeMonthDate () { // 月报表控件赋值
      const date = new Date(this.month)
      this.tableParams.historyReportParams.year = date.getFullYear()
      this.chartParams.historyReportParams.year = date.getFullYear()
      this.tableParams.historyReportParams.month = date.getMonth() + 1
      this.chartParams.historyReportParams.month = date.getMonth() + 1
    },
    changeDayDate () { // 开始结束时间赋值
      this.datePicker[0] = this.datePicker[0].split('/').join('')
      this.datePicker[1] = this.datePicker[1].split('/').join('')

      this.tableParams.historyReportParams.startDate = this.datePicker[0]
      this.chartParams.historyReportParams.startDate = this.datePicker[0]
      this.tableParams.historyReportParams.endDate = this.datePicker[1]
      this.chartParams.historyReportParams.endDate = this.datePicker[1]
    }, */
    orgChange () {  //  机构切换
      this.tableParams.branchId = this.orgId
      this.chartParams.branchId = this.orgId
    },
    selectChange (val) { // 日历切换
      this.isabled()
      if (val === '月报表') {
        this.isMonth = true
        this.tableParams.historyReportParams.reportType = 'month'
        this.chartParams.historyReportParams.reportType = 'month'
      } else if (val === '季报表') {
        this.isQuarter = true
        this.quarterYear = new Date(new Date().getTime() - 3600 * 1000 * 24).getFullYear() + ''
        this.tableParams.historyReportParams.reportType = 'quarter'
        this.chartParams.historyReportParams.reportType = 'quarter'
        this.changeSeelct()
      } else if (val === '年报表') {
        this.isYear = true
        this.tableParams.historyReportParams.reportType = 'year'
        this.chartParams.historyReportParams.reportType = 'year'
      } else {
        this.isMonth =  true
        this.tableParams.historyReportParams.reportType = 'month'
        this.chartParams.historyReportParams.reportType = 'month'
      }
    },
    isabled: function () { // 切换状态
      // this.isDay =  false
      this.isMonth = false
      this.isQuarter = false
      this.isYear = false
    },
    // 调整头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333;font-size: 14px;font-family: PingFangSC-Semibold;'
      }
    },
    // 每页条数
    handleSizeChange (val) {
      this.tableParams.historyReportParams.pageSize = val
      this.queryTableData()
    },
    // 当前页数
    handleCurrentChange (val) {
      this.tableParams.historyReportParams.pageNum = val
      this.queryTableData()
    },
    changeSeelct: function () { // 季度控件逻辑
      const date = new Date()
      const newyear = date.getFullYear()
      const newMonth = date.getMonth() + 1
      if (Number(this.quarterYear) === Number(newyear)) {
        this.quarterList.map((item, index) => {
          item.disabled = true
        })
        if (newMonth === 1 || newMonth === 2 || newMonth === 3) {
          this.quarterMonth = '1'
        } else if (newMonth === 4 || newMonth === 5 || newMonth === 6) {
          this.quarterList[0].disabled = false
          this.quarterMonth = '1'
        } else if (newMonth === 7 || newMonth === 8 | newMonth === 9) {
          this.quarterList[0].disabled = false
          this.quarterList[1].disabled = false
          this.quarterMonth = '2'
        } else if (newMonth === 10 || newMonth === 11 || newMonth === 12) {
          this.quarterList[0].disabled = false
          this.quarterList[1].disabled = false
          this.quarterList[2].disabled = false
          this.quarterMonth = '3'
        }
      } else if (Number(this.quarterYear) === Number(newyear - 3)) {
        this.quarterList.map((item, index) => {
          item.disabled = true
        })
        if (newMonth === 1 || newMonth === 2 || newMonth === 3) {
        } else if (newMonth === 4 || newMonth === 5 || newMonth === 6) {
          this.quarterList[1].disabled = false
          this.quarterList[2].disabled = false
          this.quarterList[3].disabled = false
          this.quarterMonth = '2'
        } else if (newMonth === 7 || newMonth === 8 || newMonth === 9) {
          this.quarterList[2].disabled = false
          this.quarterList[3].disabled = false
          this.quarterMonth = '3'
        } else if (newMonth === 10 || newMonth === 11 || newMonth === 12) {
          this.quarterList[3].disabled = false
          this.quarterMonth = '4'
        }
      } else {
        this.quarterList[0].disabled = false
        this.quarterList[1].disabled = false
        this.quarterList[2].disabled = false
        this.quarterList[3].disabled = false
      }
    }
  },
  watch: {
    quarterYear: function (val) {
      this.changeSeelct()
    },
    month: function (val) {
      if (val == null) {
        this.tableParams.historyReportParams.month = ''
      } else {
        this.tableParams.historyReportParams.month = val
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
//  设置多选框样式
.tickertape{
  .top{
    .el-radio__input{
      display: none;
    }
    span.el-checkbox__inner{
      display: none;
    }
    span.el-checkbox__label{
      padding-left: 5px;
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.tickertape {
  background-color: transparent;
  height: 100%;
  .el-radio {
    margin-right: 1vw !important;
  }
  .top {
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
    padding-bottom: 15px;
    .span {
      display: block;
      float: left;
      margin: 0.3vw 0.4vw 0 0vw;
      font-size: 13px;
    }
    .equipTypelist {
      float: left;
    }
    .derive-btn {
      // background-color: #F5A623;
      // color: #fff;
      height: 32px;
      border-radius: 0.2rem;
    }
  }
  .echartbtn {
    margin-top: 20px;
    position: relative;
    .btn-bg {
      width: 100%;
      height: 10px;
      background-color: #ffffff;
      position: absolute;
      top: 12px;
      border-radius: 8px;
      box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    }
  }
  .tickertape-echart {
    margin-top: 20px;
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
    .tickertape-echarts {
      width: 100%;
      height: 20rem;
    }
    .btn-isShow-border-echart {
      transform: rotate(-90deg);
    }
  }
  .record{
      margin: 0.5rem;
      height: 20px;
      text-align: right;
  }
  .list {
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
    .list-table {
      border-radius: 0.5rem;
      .header-row-class {
        color: red;
        background-color: red;
      }
    }
  }
}
.top-text {
  display: inline-block;
  font-size: 14px;
  line-height: 4rem;
}
.top-picker,
.top-month,
.top-year,
.top-quarter-year,
.quarter-span,
.quarter-select {
  margin-left: 0.7rem;
}
.month,
.year,
.quarter {
  padding: 1vw 0;
}
.month{
  .top-month{
    width: 8vw;
  }
}
.year{
  .top-year{
    width:8vw;
  }
}
.quarter {
  .top-quarter-year,
  .quarter-select {
    width: 8vw;
  }
}
.top-select {
  margin-left: 0.5rem;
  width: 8vw;
}
.top-btn {
  float: right;
}
.btn-isShow {
  position: relative;
  bottom: 0;
  border: 0;
  border-radius: 8px 8px 0px 0px;
  box-shadow: 0 0 10px 0 rgba(173, 173, 173, 0.5);
  background-color: #fff;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: #4a4a4a;
  padding: 4px 1.8rem;
}
.btn-isShow-border {
  transform: rotate(90deg);
}
.checkAll {
  height: 30px;
  line-height: 10px;
  float: left;
  font-family: PingFangSC-Regular;
}
</style>
