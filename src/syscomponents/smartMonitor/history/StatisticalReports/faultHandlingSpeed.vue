<template>
  <div class="faultSpeed">
    <div class="faultSpeed-top">
      <el-row  class="faultSpeed-top-row" style="margin-left:1vw;">
        <el-col :span="5">
          <el-row>
            <el-col :span="4">
              <span class="faultSpeed-top-row-span">机构</span>
            </el-col>
            <el-col :span="19">
              <el-select
                v-model="orgIds"
                size="mini"
                placeholder="请选择"
                class="faultSpeed-top-row-select"
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
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="7" :push="4">
              <span class="faultSpeed-top-row-span">报表周期</span>
            </el-col>
            <el-col :span="16" :push="4">
              <el-select
                v-model="obj.queryParams.reportType"
                size="mini"
                placeholder="请选择"
                class="faultSpeed-top-row-select"
              >
                <el-option
                  v-for="item in dateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="9" v-show="isDay">
          <el-row>
            <el-col :span="5" :push="2">
              <span class="faultSpeed-top-row-span">起止时间</span>
            </el-col>
            <el-col :span="18" :push="2">
              <el-date-picker
                v-model="datePicker"
                class="faultSpeed-top-row-day"
                type="daterange"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                range-separator="——"
                @change="changeDayDate"
                size="mini"
                :picker-options="{disabledDate: time => time.getTime() > Date.now()- 3600 * 1000 * 24 || time.getTime() < new Date(this.startTranDate).getTime()-3600*1000*24}"
              ></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <!-- 月份控件 -->
        <el-col :span="9" v-show="isMonth">
          <el-row>
            <el-col :span="3" :push="2">
              <span class="faultSpeed-top-row-span">时间</span>
            </el-col>
            <el-col :span="18" :push="2">
              <el-date-picker
                v-model="obj.queryParams.month"
                class="faultSpeed-top-row-month"
                type="month"
                size="mini"
                value-format="yyyy/MM"
                format="yyyy/MM"
                :picker-options="{disabledDate: time => time.getTime() > Date.now() -3600*1000*24*30 || time.getTime() < Date.now()- 3600 * 1000 * 24 * 30 *24}"
                placeholder="选择月"
              ></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <!-- 季度控件 -->
        <el-col :span="9" v-show="isQuarter">
          <el-col :span="12">
            <el-row>
              <el-col :span="5" :push="5">
                <span class="faultSpeed-top-row-span">时间</span>
              </el-col>
              <el-col :span="10" :push="5">
                <el-date-picker
                  v-model="quarterYear"
                  type="year"
                  size="mini"
                  class="faultSpeed-top-row-year"
                  format="yyyy"
                  value-format="yyyy"
                  :picker-options="{disabledDate: time => time.getTime() >= Date.now() || time.getTime() < Date.now() -3600*1000*24*365*3}"
                  placeholder="选择年份"
                ></el-date-picker>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="7" :push="3">
                <span class="faultSpeed-top-row-span">季度</span>
              </el-col>
              <el-col :span="17" :push="3">
                <el-select
                  v-model="quarterMonth"
                  placeholder="请选择"
                  class="faultSpeed-top-row-select"
                  size="mini"
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
            </el-row>
          </el-col>
        </el-col>
        <!-- 年份控件 -->
        <el-col :span="9" v-show="isYear">
          <el-row>
            <el-col :span="4" :push="1">
              <span class="faultSpeed-top-row-span">时间</span>
            </el-col>
            <el-col :span="18" :push="1">
              <el-date-picker
                v-model="obj.queryParams.year"
                type="year"
                size="mini"
                class="faultSpeed-top-row-year"
                format="yyyy"
                value-format="yyyy"
                :picker-options="{disabledDate: time => time.getTime() > Date.now() -3600*1000*24*365}"
                placeholder="选择年份"
              ></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="warningLevel" style="margin-left:1vw;">
        <el-col :span="20">
          <span class="span">预警等级</span>
          <el-checkbox-group
            v-model="allEquips"
            size="mini"
            class="equipTypelist"
          >
            <el-checkbox label="全部" @change="handleCheckedCitiesChange" border></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group
            v-model="obj.queryParams.warningLevel"
            size="mini"
            class="equipTypelist"
          >
            <el-checkbox
              v-for="item in warningLevelList"
              :label="item.warnKey"
              :key="item.warnKey"
              @change="warnLevelChange"
              border
            >{{item.warnName}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="4" class="warningLevel_btn">
          <el-button
            type="primary"
            size="small"
            class="faultSpeed-top-row-btn-query"
            @click="checkNull"
          >查&nbsp;&nbsp;询</el-button>
          <tableReport
            :tableParams="obj.queryParams"
            :branchId="obj.branchId"
            style="height:32px"
            :buttonId="'faulHand'"
          ></tableReport>
        </el-col>
      </el-row>
    </div>
    <div class="tabs" style="width:100%;position:relative">
      <el-tabs @tab-click="handleClick" class="el-tabs" v-model="activeName">
        <el-tab-pane label="响应速度" name="first"></el-tab-pane>
        <el-tab-pane label="处理速度" name="second"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- Echarts图表 -->
    <div class="echartBox">
      <el-row >
        <el-col :span="24"  v-show="isEcharts.isable">
          <div class="echarts" style="width:100%;height:300px;" id="faultHand" v-if="echartShow"></div>
          <occupied height="200px" explain="暂无数据" v-else />
        </el-col>
      </el-row>
      <!-- <div slot="empty" >

      </div> -->
      <el-row>
        <el-col :span="24">
          <el-button size="mini" class="btn-isShow" @click="Echarts">
            {{isEcharts.name}}
            <span class="btn-isShow-fault-echart el-icon-d-arrow-right"></span>
          </el-button>
        </el-col>
      </el-row>
      <div class="btn-locat"></div>
    </div>
    <div class="faultSpeed-bottom">
      <div class="faultSpeed-bottom-number">共{{tableData.total!==undefined?tableData.total:0}}条记录</div>
      <el-table
        :data="tableData.list"
        size="samll"
        stripe
        fit
        fixed="true"
        :header-cell-style="theadClassName"
        class="faultSpeed-bottom-table"
      >
        <el-table-column
          :prop="item.prop"
          v-for="(item,index) in mclassNameList"
          :key="index"
          :label="item.label"
          :min-width="item.width"
        ></el-table-column>
        <div slot="empty" v-if="empty">
          <occupied height="52.4vh" explain="暂无数据" />
        </div>
      </el-table>
      <pagination
        class="faultSpeed-bottom-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="obj.queryParams.pageNum"
        :page-size="obj.queryParams.pageSize"
        :total="tableData.total"
        position="relative"
      />
    </div>
  </div>
</template>
<script>
import pagination from '@/syscomponents/smartMonitor/pagination/pagination'
import occupied from '@/components/Occupied/occupied'
import services from '../../../../services'
import base from '@/common/base'
import echarts from 'echarts'
import options from './faultHandSpeedEcharts.js'
import tableReport from '@/syscomponents/smartMonitor/history/StatisticalReports/tableReport'
// import faultHandlingSpeed from '@/dummy/smartMonitor/history/report/faultHandlingSpeed.json'
export default {
  data () {
    return {
      dateList: [
        {
          label: '日报表',
          value: 'day'
        }, {
          label: '月报表',
          value: 'month'
        }, {
          label: '季报表',
          value: 'quarter'
        }, {
          label: '年报表',
          value: 'year'
        }], // 报表周期数据容器
      quarterList: [
        {
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
      checkAll: true,
      echartsData: [],
      allEquips: ['全部'], // 预警级别全选值
      warningLevelList: [// 预警级别备选值
        {
          warnName: '高',
          warnKey: '3'
        },
        {
          warnName: '中',
          warnKey: '2'
        },
        {
          warnName: '低',
          warnKey: '1'
        }
      ],
      mclassNameList: [
        {
          width: 20
        }, { // 表头项
          label: '设备管理员姓名',
          prop: 'userName',
          width: '75'
        }, {
          label: '预警等级',
          prop: 'warningLevelDesc',
          width: '75'
        }, {
          label: '各预警等级响应速度',
          prop: 'solveTime',
          width: '75'
        }, {
          label: '各预警等级响应速度-均值',
          prop: 'avgSolveTime',
          width: '120'
        }, {
          label: '响应速度对比结果',
          prop: 'responseTimeCompareResult',
          width: '75'
        }],
      mclassNameListB: [
        {
          width: 20
        }, { // 表头项
          label: '设备管理员姓名',
          prop: 'userName',
          width: '75'
        }, {
          label: '预警等级',
          prop: 'warningLevelDesc',
          width: '75'
        }, {
          label: '各预警等级响应速度',
          prop: 'solveTime',
          width: '75'
        }, {
          label: '各预警等级响应速度-均值',
          prop: 'avgSolveTime',
          width: '120'
        }, {
          label: '响应速度对比结果',
          prop: 'responseTimeCompareResult',
          width: '75'
        }],
      mclassNameListA: [
        {
          width: 20
        }, { // 表头项
          label: '设备管理员姓名',
          prop: 'userName',
          width: '75'
        }, {
          label: '预警等级',
          prop: 'warningLevelDesc',
          width: '75'
        }, {
          label: '各预警等级处理速度',
          prop: 'solveTime',
          width: '75'
        }, {
          label: '各预警等级处理速度-均值',
          prop: 'avgSolveTime',
          width: '120'
        }, {
          label: '处理速度对比结果',
          prop: 'responseTimeCompareResult',
          width: '75'
        }],
      isEcharts: {
        name: '收起',
        isable: true
      },
      orgIds: '', // 机构号
      orglist: [], // 机构备选值
      tableData: [],
      datePicker: [],
      obj: {
        branchId: '',
        queryParams: {
          dataType: 2, // 报表类型，处理时间-1，响应速度-2
          endDate: '', // 结束日期
          month: '', // 默认月份, // 月
          pageNum: 1,
          pageSize: 10,
          manger: true, // 营业兼管理判断
          quarter: '', // 季
          reportType: 'day', // 报表类型
          warningLevel: [],
          startDate: '', // 开始日期
          year: '' // 年
        }
      },
      quarterYear: '',
      quarterMonth: '',
      startTranDate: '',
      activeName: 'first',
      result: {},
      isDay: true,
      isMonth: false,
      isQuarter: false,
      isYear: false,
      btnShow: true,
      empty: true, // 暂无数据图示
      month: '',
      echartShow: false
    }
  },
  components: {
    occupied, pagination, tableReport
  },
  mounted () {
    this.getOrgInfo()
    this.getdatatime()
    this.getmonth()
    // this.queryCharts()
    //
    const orgType = base.getStore({ key: 'monitorOrgType' })
    if (orgType === '5' || orgType === '5') {
      this.initQuery()
    }
  },
  methods: {
    checkNull () {
      if (this.isDay === true && this.datePicker === null) {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      if (this.orgIds === '') {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      if (this.obj.queryParams.warningLevel.length === 0) {
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
      if (this.isYear === true && this.obj.year === '') {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      this.query()
    },
    // orgIdChange () {
    //   var self = this
    //   self.orglist.map((item, index) => {
    //     if (self.orgIds === item.orgId) {
    //       if (item.orgTypeId === '5' || item.orgLevelId === '3') {
    //         self.orgIds = item.orgId + '-' + item.orgNameCn
    //         self.obj.branchId = item.orgId
    //         self.obj.queryParams.manger = true
    //       } else {
    //         self.obj.queryParams.manger = false
    //       }
    //     }
    //   })
    // },
    warnLevelChange () {  // 预警级别全选判断
      var self = this
      if (self.obj.queryParams.warningLevel.length === 3) {
        self.allEquips.push('全部')
        self.checkAll = true
      } else {
        self.checkAll = false
        self.allEquips = []
      }
    },
    handleCheckedCitiesChange () { // 预警级别数据处理
      var self = this
      self.checkAll = !self.checkAll
      if (self.checkAll === true) {
        self.obj.queryParams.warningLevel = ['1', '2', '3']
      } else {
        self.obj.queryParams.warningLevel = []
      }
    },
    // tabs切换
    handleClick (tab, event) { // tabs 切换
      if (tab.label === '响应速度') {
        this.mclassNameList = []
        this.mclassNameList = this.mclassNameListB
        this.obj.queryParams.dataType = 2
      } else if (tab.label === '处理速度') {
        this.mclassNameList = []
        this.mclassNameList = this.mclassNameListA
        this.obj.queryParams.dataType = 1
      }
      this.$nextTick(function () {
        this.checkNull()
      })
    },
    // 查询下拉列表备选数据
    getOrgInfo: async function () {
      try {
        var self = this
        self.obj.queryParams.warningLevel = ['3', '2', '1']
        const BranchList = base.getStore({ key: 'monitorBranchList' })
        const orglist1 = JSON.parse(BranchList)
        self.checkLeve(orglist1)
      } catch (err) {
        if (err.message) {
          self.$message.error(err.message)
        } else {
          self.$message.error('未知异常')
        }
      }
    },
    checkLeve (orglist) {  // 判断登录机构级别
      var orgType = base.getStore({ key: 'monitorOrgType' })
      var self = this
      var result = []
      if (orgType !== '1' && orgType !== '5') {
        orglist.map((item, index) => {
          if (item.orgTypeId === '1' || item.orgTypeId === '5') {
            result.push(item)
          }
        })
      } else if (orgType === '5' || orgType === '1') {
        result = orglist
        self.orgIds = base.getStore({ key: 'orgId' })
      }
      self.orglist = result
      // orglist.map((item, index) => {
      //   if (self.obj.branchId === item.orgId) {
      //     if (item.orgLevelId === '1' || item.orgLevelId === '2') { // 总/分行
      //       orglist.map((item1, index1) => {
      //         if (item1.orgTypeId === '5' || item1.orgLevelId === '4' || item1.orgTypeId === '1' || item1.orgLevelId === '3') {
      //           result.push(item1)
      //           self.empty = true
      //         }
      //       })
      //     } else if (item.orgTypeId === '5' || item.orgLevelId === '3') { // 营业兼管理
      //       self.orgIds = item.orgId + '-' + item.orgNameCn
      //       self.obj.queryParams.manger = true
      //       orglist.map((item1, index1) => {
      //         if (item1.orgTypeId === '1' || item1.orgLevelId === '4') {
      //           result.push(item1)
      //         }
      //       })
      //     } else if (item.orgTypeId === '1') { // 营业机构
      //       self.orgIds = item.orgId + '-' + item.orgNameCn
      //       result.push(item)
      //     }
      //   }
      // })
    },
    // unique (arr) { // 去重
    //   var result = []
    //   var obj = {}
    //   for (var i = 0; i < arr.length; i++) {
    //     if (!obj[arr[i].ORGNAME_CN]) {
    //       result.push(arr[i])
    //       obj[arr[i].ORGNAME_CN] = true
    //     }
    //   }
    //   return result
    // },
    query: async function () { // 查询
      try {
        var self = this
        self.result = {}
        self.obj.branchId = self.orgIds || base.getStore({ key: 'orgId' })
        switch (this.obj.queryParams.reportType) {
        case 'quarter':
          if (this.quarterYear) {
            const date = new Date(this.quarterYear)
            this.obj.queryParams.year = date.getFullYear()
            this.obj.queryParams.quarter = this.quarterMonth
          }
          break
        case 'year':
          if (this.year) {
            const date = new Date(this.year)
            this.obj.queryParams.year = date.getFullYear()
          }
          break
        default:
          if (this.month) {
            const date = new Date(this.month)
            this.obj.queryParams.year = date.getFullYear()
            this.obj.queryParams.month = date.getMonth() + 1
          }
          break
        }
        self.tableData = []
        self.result = []
        self.tableData = await services.api.monitor.historyReport.getManagersFaultHandlingSpeedInfo(self.obj.branchId, self.obj.queryParams)
        self.result = await services.api.monitor.historyReport.getManagersFaultHandlingSpeedGraphicInfo(self.obj.branchId, self.obj.queryParams)
        if (self.tableData.list.length > 0) {
          self.echartShow = true
          self.isEcharts.isable = true
          this.$nextTick(function () {
            self.initChart()
          })
        } else {
          self.echartShow = false
        }

        if (self.tableData.list.length === 0) {
          self.$message({
            message: '暂无数据'
          })
        }
        // self.queryCharts()
      } catch (err) {
        if (err.message) {
          self.$message.error(err.message)
        } else {
          self.$message.error('未知异常')
        }
      }
    },
    initQuery: async function () { // 查询
      try {
        var self = this
        self.result = {}
        self.obj.branchId = self.orgIds
        self.tableData = await services.api.monitor.historyReport.getManagersFaultHandlingSpeedInfo(self.obj.branchId, self.obj.queryParams)
        self.result = await services.api.monitor.historyReport.getManagersFaultHandlingSpeedGraphicInfo(self.obj.branchId, self.obj.queryParams)
        if (self.tableData.list.length > 0) {
          self.echartShow = true
          self.isEcharts.isable = true
          this.$nextTick(function () {
            self.initChart()
          })
        } else {
          self.echartShow = false
        }

        // self.queryCharts()
      } catch (err) {
        if (err.message) {
          self.$message.error(err.message)
        } else {
          self.$message.error('未知异常')
        }
      }
    },
    getdatatime: function () { // 默认开始结束日期
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
      // 空数组赋值2次
      this.datePicker.push(date)
      this.$set(this.datePicker, 1, date)
      this.obj.queryParams.startDate = this.datePicker[0]
      this.obj.queryParams.endDate = this.datePicker[1]
    },
    changeDayDate: function () { // 开始结束时间赋值
      this.obj.queryParams.startDate = this.datePicker[0]
      this.obj.queryParams.endDate = this.datePicker[1]
    },
    // 调整表格头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333333;font-size: 14px;font-family: PingFangSC-Semibold;letter-spacing: 0;'
      }
    },
    // queryCharts: async function () {  // echarts数据查询
    //   try {
    //     var self = this
    //     if (self.orgIds !== '') {
    //       self.obj.branchId = self.orgIds
    //     } else {
    //       self.obj.branchId = base.getStore({ 'key': 'orgId' })
    //     }
    //     self.isEcharts.isable = true
    //     self.obj.queryParams.startDate = '20190701'
    //     self.result = await services.api.monitor.historyReport.getManagersFaultHandlingSpeedGraphicInfo(self.obj.branchId, self.obj.queryParams)
    //     this.$nextTick(function () {
    //       self.initChart()
    //     })
    //   } catch (err) {
    //     if (err.message) {
    //       this.$message.error(err.message)
    //     } else {
    //       this.$message.error('未知异常')
    //     }
    //   }
    // },
    initChart () { // echarts数据处理逻辑
      // const result = []
      const arrList = []
      const manufFaultInfo = []
      // const xLegend1 = []
      if (this.result.operatorList.length > 0) {
        this.result.operatorList.map((item, index) => {
          arrList.push({
            devClassName: item.userName
          })
        })
      }
      if (this.result.managersFaultHandlingSpeedGraphicInfoList.length) {
        // 循环managersFaultHandlingSpeedGraphicInfoList
        this.result.managersFaultHandlingSpeedGraphicInfoList.map((item, index) => {
          // 循环singleManagerFaultHandlingSpeedList
          item.singleManagerFaultHandlingSpeedList.map((item1, index1) => {
            // 循环arrlIST
            arrList.map((item2, index2) => {
              if (item2.devClassName === item1.userName) {
                const obj = {}
                obj.devFaultRate = item1.solveTime
                obj.manufName = item.warningLevelDesc
                manufFaultInfo.push(obj)
                arrList[index2].manufFaultInfo = manufFaultInfo
              }
            })
          })
        })
      }
      const chartId = document.getElementById('faultHand')
      const interval = setInterval(() => {
        if (chartId.offsetWidth > 0) {
          clearInterval(interval)
          const chart = echarts.init(chartId)
          const xAxis = []
          const heigh = []
          const middle = []
          const low = []
          arrList.map((item, index) => {
            xAxis.push(item.devClassName)
            if (item.manufFaultInfo != null) {
              item.manufFaultInfo.map(function (item1) {
                // 数组中是否存在高
                if (item1.manufName === '高') {
                  heigh[index] = {
                    value: item1.devFaultRate
                  }
                  // console.log(item1.devFaultRate)
                } else {
                  heigh[index] = {
                    value: 0
                  }
                }
                // 数组中是否存在中
                if (item1.manufName === '中') {
                  middle[index] = {
                    value: item1.devFaultRate
                  }
                } else {
                  middle[index] = {
                    value: 0
                  }
                }
                // 数组中是否存在低
                if (item1.manufName === '低') {
                  low[index] = {
                    value: item1.devFaultRate
                  }
                } else {
                  low[index] = {
                    value: 0
                  }
                }
              })
            } else {
              heigh[index] = {
                value: 0
              }
              middle[index] = {
                value: 0
              }
              low[index] = {
                value: 0
              }
            }
          })
          const yName = '响应速度（分钟/次）'
          const mOption = options.lineColOption(xAxis, yName, heigh, middle, low)
          chart.setOption(mOption, true)
          // 根据窗口的大小变动图表
          // window.onresize = function () {
          //   chart.resize()
          // }
        }
      }, 100)
    },
    Echarts () { // Echarts展示
      const btn = document.getElementsByClassName('btn-isShow-fault-echart')
      if (this.isEcharts.isable === true) {
        btn[0].style.transform = 'rotate(90deg)'
        this.isEcharts.isable = false
        // this.empty = false
        this.isEcharts.name = '展示'
      } else {
        btn[0].style.transform = 'rotate(-90deg)'
        // this.empty = true
        this.isEcharts.isable = true
        this.isEcharts.name = '收起'
        this.$nextTick(function () {
          this.initChart()
        })
      }
    },
    // 每页条数
    handleSizeChange (val) {
      this.obj.queryParams.pageSize = val
      this.query()
    },
    // 当前页数
    handleCurrentChange (val) {
      this.obj.queryParams.pageNum = val
      this.query()
    },
    // 获取近三月日期
    getmonth: function () {
      let month = 0
      let year = 0
      if (Number(new Date().getMonth()) <= 2) {
        month = 12 - Number(new Date().getMonth())
        year = new Date().getFullYear() - 1
      } else {
        month = Number(new Date().getMonth()) - 2
        year = new Date().getFullYear()
      }
      var days = new Date().getDate()
      var day = 0
      if (month === 2) {
        if ((year % 4 === 0 && (year % 100) !== 0) || (year % 400) === 0) {
          day = 29
          if (day > days) {
            day = days
          }
        } else {
          day = 28
          if (day > days) {
            day = days
          }
        }
      } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        day = 30
        if (day > days) {
          day = days
        }
      } else {
        day = 31
        if (day > days) {
          day = days
        }
      }
      if (day < 10) {
        day = '0' + day
      }
      if (month < 10) {
        month = '0' + month
      }
      this.startTranDate = year + '-' + month + '-' + day
    },
    visibleSelect: function () { // 季度控件逻辑
      const date = new Date()
      const newyear = date.getFullYear()
      const newMonth = date.getMonth() + 1
      if (Number(this.quarterYear) === Number(newyear)) {
        this.quarterList.map((item, index) => {
          item.disabled = true
        })
        if (newMonth === 1 || newMonth === 2 || newMonth === 3) {
          this.quarterMonth = '1'
          this.quarterYear = (new Date().getFullYear() - 1) + ''
        } else if (newMonth === 4 || newMonth === 5 || newMonth === 6) {
          this.quarterList[0].disabled = false
          this.quarterMonth = '1'
        } else if (newMonth === 7 || newMonth === 8 || newMonth === 9) {
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
        this.quarterMonth = '1'
        this.quarterList[0].disabled = false
        this.quarterList[1].disabled = false
        this.quarterList[2].disabled = false
        this.quarterList[3].disabled = false
      }
    }
  },
  watch: {
    quarterYear: function (val) {
      this.visibleSelect()
      this.obj.queryParams.year = new Date(val).getFullYear()
    },
    // quarterMonth: function (val) {
    //   this.obj.queryParams.quarter = this.quarterMonth
    // },
    'obj.queryParams.reportType': function (val) {
      this.isDay = false
      this.isMonth = false
      this.isQuarter = false
      this.isYear = false
      this.obj.queryParams.day = ''
      this.obj.queryParams.month =  new Date(new Date().getTime() - 3600 * 1000 * 24 * 30) + ''
      this.obj.queryParams.quarter = ''
      this.obj.queryParams.year = ''
      switch (val) {
      case 'day':
        this.isDay = true
        break
      case 'month':
        this.isMonth = true
        this.year = new Date(new Date().getTime()).getFullYear() + ''
        break
      case 'quarter':
        this.isQuarter = true
        this.quarterYear = (new Date().getFullYear()) + ''
        this.visibleSelect()
        this.obj.queryParams.year = new Date(this.quarterYear).getFullYear()
        break
      case 'year':
        this.isYear = true
        this.obj.queryParams.year = new Date(new Date().getTime() - 3600 * 1000 * 24 * 365).getFullYear() + ''
        this.year = new Date(new Date().getTime() - 3600 * 1000 * 24 * 365).getFullYear() + ''
        break
      default:
        break
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.faultSpeed {
  background-color: transparent;
  height: 100%;
    .el-checkbox{
      margin-right: 1vw !important;
  }
  .el-checkbox__input {
    display: none;
  }
  .faultSpeed-top {
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
    .faultSpeed-top-row {
      padding: 1.5vh 0;
      .faultSpeed-top-row-span {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4a4a4a;
        letter-spacing: 0;
        padding-top: 0.5vh;
        padding-right: 0.3vw;
        line-height: 28px;
      }
      .faultSpeed-top-row-select,
      .faultSpeed-top-row-month,
      .faultSpeed-top-row-year {
        width: 8vw;
      }
      .faultSpeed-top-row-day {
        width: 15vw;
      }
      .faultSpeed-top-row-btn-export {
        position: absolute;
        right: 1.5rem;
        background: #f5a623;
        border-radius: 2px;
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        width: 80px;
        height: 32px;
        color: #ffffff;
        letter-spacing: 0;
        display: flex;
        justify-content: center;
      }
      .faultSpeed-top-row-btn-query {
        position: absolute;
        right: 7rem;
        background: #258aff;
        border-radius: 2px;
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        width: 80px;
        height: 32px;
        color: #ffffff;
        letter-spacing: 0;
        display: flex;
        justify-content: center;
      }
    }
    .equipTypelist {
      float: left;
      .el-button--mini,
      .el-button--small {
        font-size: 14px;
      }
      .checkAll {
        height: 30px;
        line-height: 10px;
        float: left;
        font-family: PingFangSC-Regular;
      }
    }
    .span {
      display: block;
      font-size: 14px;
      float: left;
      margin: 0.2vw 0.4vw 0 0vw;
    }
    .warningLevel {
      padding-bottom: 1.5vh;
    }
    .warningLevel_btn {
      text-align: center;
      .el-checkbox-button--small .el-checkbox-button__inner {
        padding: 7px 1.5rem;
      }
    }
  }
  .faultSpeed-center {
    margin-top: 2vh;
    .faultSpeed-center-btn {
      background: #fff;
      height: 10px;
      margin-top: -10px;
      box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
      border-radius: 8px;
    }
    .faultSpeed-center-echart {
      background: #ffffff;
      box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
      border-radius: 8px;
    }
    .faultSpeed-center-isShow {
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
  }
  .echartBox {
    border-radius: 8px;
    background-color: #fff;
  }
  .el-tabs {
    margin: 1rem 0 0.5rem 0;
    .el-tabs__nav {
      position: relative;
      left: 42.5%;
      font-family: PingFangSC-Semibold;
      font-size: 18px;
      color: #258aff;
      letter-spacing: 0;
      text-align: center;
    }
    .el-tabs__item {
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
    }
    .is-active {
      color: #258aff;
    }
    .el-tabs__active-bar {
      width: 72px;
      height: 4px;
      border-radius: 4px;
    }
    .el-tabs__nav-wrap::after {
      height: 0;
    }
    .el-tabs__nav-wrap::after {
      height: 0;
    }
  }
  .btn-locat {
    width: 100%;
    height: 10px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
  }
  .btn-isShow-fault-echart {
    transform: rotate(-90deg);
  }
  .faultSpeed-bottom {
    margin-top: 0.2vh;
    .faultSpeed-bottom-number {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #4a4a4a;
      letter-spacing: 0;
      text-align: right;
      margin: 0.5rem;
    }
    .faultSpeed-bottom-table {
      margin-top: 0.2vh;
      border: 1px solid #dcdbdd;
      box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
      border-radius: 8px;
    }
    .faultSpeed-bottom-pagination {
      margin-top: 3.3vh;
      margin-left: 1rem;
    }
  }
}
</style>