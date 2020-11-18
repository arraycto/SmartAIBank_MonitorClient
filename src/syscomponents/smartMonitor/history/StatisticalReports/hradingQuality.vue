<template>
  <div class="hradingQuality">
    <div class="hradingQuality-top">
      <el-row class="hradingQuality-top-row" style="margin-left:1vw;">
        <el-col :span="5">
          <el-row>
            <el-col :span="4">
              <span class="hradingQuality-top-row-span">机构</span>
            </el-col>
            <el-col :span="15">
              <el-select
                v-model="branchId"
                size="mini"
                placeholder="请选择"
                class="hradingQuality-top-row-select"
                @change="branchIdChange"
                filterable
              >
                <el-option
                  v-for="item in orglist"
                  :key="item.orgId"
                  :label="item.orgId+'-'+item.orgNameCn"
                  :value="item.orgId"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="7" :push="4">
              <span class="hradingQuality-top-row-span">报表周期</span>
            </el-col>
            <el-col :span="16" :push="4">
              <el-select
                v-model="params.reportType"
                size="mini"
                placeholder="请选择"
                class="hradingQuality-top-row-select"
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
              <span class="hradingQuality-top-row-span">起止时间</span>
            </el-col>
            <el-col :span="18" :push="2">
              <el-date-picker
                v-model="datePicker"
                class="hradingQuality-top-row-day"
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
              <span class="hradingQuality-top-row-span">时间</span>
            </el-col>
            <el-col :span="18" :push="2">
              <el-date-picker
                v-model="month"
                class="hradingQuality-top-row-month"
                type="month"
                size="mini"
                format="yyyy/MM"
                value-format="yyyy/MM"
                @change="changeMonthDate"
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
                <span class="hradingQuality-top-row-span">时间</span>
              </el-col>
              <el-col :span="10" :push="5">
                <el-date-picker
                  v-model="quarterYear"
                  type="year"
                  size="mini"
                  class="hradingQuality-top-row-year"
                  format="yyyy"
                  value-format="yyyy"
                  :picker-options="{disabledDate: time => time.getTime() > Date.now() || time.getTime() < Date.now() -3600*1000*24*365*3}"
                  placeholder="选择年份"
                ></el-date-picker>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="7" :push="3">
                <span class="hradingQuality-top-row-span">季度</span>
              </el-col>
              <el-col :span="17" :push="3">
                <el-select
                  v-model="quarterMonth"
                  placeholder="请选择"
                  class="hradingQuality-top-row-select"
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
              <span class="hradingQuality-top-row-span">时间</span>
            </el-col>
            <el-col :span="18" :push="1">
              <el-date-picker
                v-model="year"
                type="year"
                size="mini"
                class="hradingQuality-top-row-year"
                format="yyyy"
                value-format="yyyy"
                :picker-options="{disabledDate: time => time.getTime() > Date.now() -3600*1000*24*365}"
                placeholder="选择年份"
              ></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="padding:0 1.5rem 1rem 0rem; margin-left:1vw;">
        <el-col :span="5">
          <span class="span">系统类型</span>
          <el-radio-group v-model="radio" size="mini" class="equipTypelist">
            <el-radio
              v-for="item in radioList"
              :label="item.name"
              :key="item.devClassKey"
              @change="handleCheckedCitiesChange"
              border
            >{{item.laber}}</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="15" v-if="isBizType">
          <span style="font-size:14px;color:#4a4a4a;font-family: PingFangSC-Regular;">业务类型</span>
          <el-select v-model="params.bizType" placeholder="请选择" size="mini" class="bussinessSelect">
            <el-option
              v-for="(item, index) in bizTypeList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-col :span="14" :pull="3">
            <el-button type="primary" size="mini" @click="checkNull">查&nbsp;&nbsp;询</el-button>
          </el-col>
          <el-col :span="10" :pull="6">
            <tableReport
              :tableParams="params"
              :branchId="branchId"
              style="height:32px"
              :buttonId="'tranQuality'"
            ></tableReport>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div class="hradingQuality-center" v-show="isAllEcharts">
      <!--Echarts图全部 -->
      <div class="hradingQuality-center-echart">
        <!-- 收齐按钮及Echarts图-->
        <el-row>
          <el-col :span="24" v-show="isEcharts.isable">
            <div class="echarts" style="height:52.4vh;" id="hradingQuality" v-if="disChart"></div>
            <occupied height="200px" explain="暂无数据" v-else />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button size="mini" class="hradingQuality-center-isShow" @click="Echarts">
              {{isEcharts.name}}
              <span
                class="hradingQuality-center-echart-border el-icon-d-arrow-right"
              ></span>
            </el-button>
          </el-col>
        </el-row>
        <div class="btn-locat"></div>
      </div>
    </div>
    <div class="hradingQuality-bottom">
      <div class="hradingQuality-bottom-number">共{{total}}条记录</div>
      <el-table
        :data="tableList"
        size="samll"
        stripe
        fit
        fixed="true"
        :header-cell-style="theadClassName"
        class="hradingQuality-bottom-table"
      >
        <!-- <el-table-column
          :prop="item.prop"
          v-for="(item,index) in managementList"
          :key="index"
          :label="item.label"
          :min-width="item.width"> -->
          <el-table-column min-width="30">
          </el-table-column>
          <el-table-column
          prop="branchName"
          label="网点名称"
          min-width="75">
          </el-table-column>
          <el-table-column
          prop="typeName"
          label="业务类型"
          min-width="75">
          </el-table-column>
          <el-table-column
          prop="dealSuccessCount"
          label="办理成功数量"
          min-width="100">
          </el-table-column>
          <el-table-column
          prop="dealSuccessRate"
          label="办理成功率"
          min-width="75">
          </el-table-column>
          <el-table-column
          prop="dealSuccessAvgRate"
          label="办理成功率-均值"
          min-width="75">
          </el-table-column>
          <el-table-column
          prop="desc"
          label="均值对比"
          min-width="60">
          </el-table-column>
          <!-- <div slot="empty" v-if="empty">
            <occupied height='52.4vh' explain='暂无数据'/>
          </div> -->
        </el-table>
        <pagination
        class="hradingQuality-bottom-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pageNum"
        :page-size="params.pageSize"
        :total="total"
        position="relative"
      />
      <el-dialog title="所有交易统计" :visible.sync="isBranchQuery">
        <el-table
          :data="branchQueryData"
          size="samll"
          stripe fit fixed="true"
          :header-cell-style="theadClassName"
          class="hradingQuality-bottom-table">
            <el-table-column min-width="30">
            </el-table-column>
            <el-table-column
            prop="typeName"
            label="业务类型"
            @click="branchQuery"
            min-width="75">
            </el-table-column>
            <el-table-column
            prop="dealSuccessCount"
            label="办理成功数量"
            min-width="100">
            </el-table-column>
            <el-table-column
            prop="dealSuccessRate"
            label="办理成功率"
            min-width="75">
            </el-table-column>
            <el-table-column
            prop="dealSuccessAvgRate"
            label="办理成功率-均值"
            min-width="75">
            </el-table-column>
            <el-table-column
            prop="desc"
            label="均值对比"
            min-width="60">
            </el-table-column>
            <div slot="empty" v-if="isBranchEmpty">
              <occupied height='52.4vh' explain='暂无数据'/>
            </div>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import pagination from '@/syscomponents/smartMonitor/pagination/pagination'
import occupied from '@/components/Occupied/occupied'
import services from '../../../../services'
import base from '@/common/base'
import echarts from 'echarts'
import options from './errorAccountDealEcharts.js'
import tableReport from '@/syscomponents/smartMonitor/history/StatisticalReports/tableReport'
export default {
  name: 'ErrorAccountDealReport',
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
      echartsData: [],
      branchQueryData: [], // 网点详情数据容器
      isBusiness: false, // 管理机构数据展示
      bizTypeList: [],
      radioList: [ // 系统类型备选值
        {
          name: 'BSM',
          laber: '自助终端机',
          devClassKey: 130000
        }
        // ,
        // {
        //   name: 'ATM',
        //   devClassKey: 120000
        // }
      ],
      bizType: '', // 业务类型
      orglist: [],
      tableList: [],
      datePicker: [],
      total: 0,
      chart: false,
      disChart: false,
      branchId: '', // 机构号
      params: { // 查询上送参数
        branchNo: base.getStore({ key: 'orgId' }),
        reportDateEnd: '', // 结束日期
        reportMonth: '', // 月
        pageNum: 1,
        pageSize: 10,
        classKey: this.radio, // 系统类型
        bizType: this.bizType,
        reportQuarter: '', // 季
        reportType: 'day', // 报表类型
        reportDateStart: '', // 开始日期
        reportYear: this.year// 年
      },
      month: new Date(new Date().getTime() - 3600 * 1000 * 24 * 30), // 默认月份
      year: '2018', // 年
      quarterYear: '',
      quarterMonth: '',
      startTranDate: '',
      isDay: true,
      isMonth: false,
      isQuarter: false,
      isYear: false,
      dataType: '',
      btnShow: false,
      radio: 'BSM', // 系统类型
      empty: true, // 暂无数据图示
      isBizType: true, // 业务类型
      isBranchQuery: false, // 网点详情dialog
      isBranchEmpty: false, // dialog暂无数据图示
      isAllEcharts: true, // 进入机构为营业机构时，Echatrs不显示
      isEcharts: {
        name: '收起',
        isable: true
      }
    }
  },
  components: {
    occupied,
    pagination,
    tableReport
  },
  mounted () {
    this.getOrgInfo()  // 查询下拉列表备选数据
    this.getmonth()  // 获取近三月日期
    this.getdatatime() // 默认开始结束日期
    this.getYear()
    // this.query()
  },
  methods: {
    getYear () {
      const date = new Date()
      this.year = (date.getFullYear() - 1).toString()
      this.params.reportYear = this.year
    },
    branchQuery: async function () { // dialog数据展示
      try {
        var self = this
        self.isBranchQuery = true
        self.params.classKey = self.radio
        self.params.branchNo = self.branchId
        self.params.bizType = ''
        const data = await services.api.monitor.historyReport.getTransQualityInfoByBranch(self.params)
        if (data.total === '0') {
          self.isBranchEmpty = true
        } else {
          self.branchQueryData = data.list
          self.isBranchEmpty = false
        }
      } catch (err) {
        if (err.message) {
          self.$message.error(err.message)
        } else {
          self.$message.error('未知异常')
        }
      }
    },
    branchIdChange () { // 判断选择机构级别
      var self = this
      // var result = []
      self.orglist.map((item, index) => {
        if (self.branchId === item.orgId) {
          if (item.orgTypeId === '5' || item.orgLevelId === '3') { // 机构选中值是否为营业兼管理
            self.isBusiness = true
          } else {
            self.isBusiness = false
          }
        }
      })
    },
    handleCheckedCitiesChange () {
      this.bizTypeData()
    },
    bizTypeData: async function () { // 系统类型和业务类型联动
      try {
        console.log('thisradio ————————》' + this.radio)
        const data = await services.api.monitor.monitorCondition.getTransType(this.radio)
        console.log(data)
        this.bizTypeList = data
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    checkLeve (orglist) {  // 判断登录机构级别
      var self = this
      const result = []
      orglist.map((item, index) => {
        if (self.params.branchNo === item.orgId) {
          if (item.orgLevelId === '1') {  // 总行
            orglist.map((item1, index1) => {
              if (item1.orgTypeId === '5' || item1.orgLevelId === '2') {
                result.push(item1)
                self.empty = true
              }
            })
          } else if (item.orgLevelId === '2') { // 分行
            orglist.map((item1, index1) => {
              if (item1.orgTypeId === '5' || item1.orgLevelId === '2') {
                // self.branchId = item1.orgId + '-' + item1.orgNameCn
                self.branchId = item1.orgId
                result.push(item1)
              }
            })
          } else if (item.orgTypeId === '5') { // 营业兼管理
            // self.branchId = item.orgId + '-' + item.orgNameCn
            self.branchId = item.orgId
            orglist.map((item1, index1) => {
              if (item1.orgTypeId === '5') {
                result.push(item1)
              }
            })
          } else if (item.orgTypeId === '1') { // 营业机构
            // self.branchId = item.orgId + '-' + item.orgNameCn
            self.branchId = item.orgId
            result.push(item)
            self.isBizType = false
            self.isAllEcharts = false
          }
        }
      })
      self.orglist = result
    },
    // 查询下拉列表备选数据
    getOrgInfo: async function () {
      try {
        var self = this
        const STMList = await services.api.monitor.monitorCondition.getTransType(self.radio)
        self.bizTypeList = STMList
        const BranchList = base.getStore({ key: 'monitorBranchList' })
        self.orglist = JSON.parse(BranchList)
        self.checkLeve(self.orglist)
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    Echarts () { // Echarts展开和收起
      const btn = document.getElementsByClassName('hradingQuality-center-echart-border')
      if (this.isEcharts.isable === false) {
        btn[0].style.transform = 'rotate(-90deg)'
        this.isEcharts.isable = true
        this.empty = true
        this.isEcharts.name = '收起'

        // this.btnShow = false
      } else {
        btn[0].style.transform = 'rotate(90deg)'
        this.btnShow = true
        this.empty = false

        this.isEcharts.isable = false
        this.isEcharts.name = '展示'
      }
      this.$nextTick(function () {
        this.initChart()
      })
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
    },
    query: async function () {
      try {
        var self = this
        self.params.classKey = self.radio
        self.params.branchNo = self.branchId
        const data = await services.api.monitor.historyReport.getTransQualityInfo(self.params)
        self.echartsData = data.data
        self.tableList = data.dataList.list
        self.total =  data.dataList.total
        if (self.echartsData.length !== 0) {
          // self.chart = true
          self.disChart = true
        } else {
          self.disChart = false
          this.$message({
            message: '暂无数据。'
          })
        }
      } catch (err) {
        if (err.message) {
          self.$message.error(err.message)
        } else {
          self.$message.error('未知异常')
        }
      }
      self.initChart()
    },
    checkNull () {
      if (this.isDay === true && this.datePicker === null) {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      if (this.branchId === '') {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      if (this.params.bizType === '') {
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
      if (this.bizType === '' && this.params.bizType === undefined && this.isBizType !== false) {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      this.query()
    },
    getdatatime: function () { // 默认开始结束日期
      const nowDate = new Date().getTime() - 1000 * 60 * 60 * 24
      const year = new Date(nowDate).getFullYear()
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
      this.params.reportDateStart = this.datePicker[0]
      this.params.reportDateEnd = this.datePicker[1]
    },
    changeDayDate: function () { // 开始结束时间赋值
      this.params.reportDateStart = this.datePicker[0]
      this.params.reportDateEnd = this.datePicker[1]
    },
    // 调整表格头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333333;font-size: 14px;font-family: PingFangSC-Semibold;letter-spacing: 0;'
      }
    },
    initChart () { // Echarts展示
      this.$nextTick(function () {
        const chart = echarts.init(document.getElementById('hradingQuality'))
        const xAxis = []
        const barData = []
        this.echartsData.map(function (item) { // 真实数据
          xAxis.push(item.branchName)
          barData.push(item.dealSuccessRate)
        })
        const yName = '错账处理时间(分钟)'

        const mOption = options.lineColOption(xAxis, yName, barData)
        chart.setOption(mOption, true)
        // 根据窗口的大小变动图表
        window.onresize = function () {
          chart.resize()
        }
      })
    },
    // 每页条数
    handleSizeChange (val) {
      this.params.pageSize = val
      this.query()
    },
    // 当前页数
    handleCurrentChange (val) {
      this.params.pageNum = val
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
    changeMonthDate () { // 月报表控件赋值
      const date = new Date(this.month)
      this.params.reportQuarter = date.getFullYear()
      this.params.reportMonth = date.getMonth() + 1
    }
  },
  watch: {
    quarterYear: function (val) {
      this.visibleSelect()
      this.params.reportYear = new Date(val).getFullYear()
    },
    quarterMonth: function (val) {
      this.params.reportQuarter = this.quarterMonth
    },
    'params.reportType': function (val) {
      this.isDay = false
      this.isMonth = false
      this.isQuarter = false
      this.isYear = false
      this.params.day = ''
      this.params.quarter = ''

      this.params = { // 查询上送参数
        reportDateEnd: '', // 结束日期
        month: '', // 月
        pageNum: 1,
        pageSize: 10,
        reportQuarter: '', // 季
        reportType: val, // 报表类型
        reportDateStart: '', // 开始日期
        reportYear: ''// 年
      }
      switch (val) {
      case 'day':
        this.isDay = true
        // console.log(this.datePicker[0])
        this.params.reportDateStart = this.datePicker[0]
        this.params.reportDateEnd = this.datePicker[1]
        break
      case 'month':
        this.isMonth = true

        this.params.reportMonth = new Date(this.month).getMonth() + 1
        this.params.reportYear = new Date(this.month).getFullYear()
        break
      case 'quarter':
        this.quarterYear = (new Date().getFullYear()) + ''
        this.visibleSelect()
        this.params.reportYear =  (new Date(this.quarterYear).getFullYear() - 1)
        this.params.reportQuarter = this.quarterMonth
        this.isQuarter = true
        break
      case 'year':
        this.isYear = true
        this.params.reportYear = this.year
        break
      default:
        break
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.hradingQuality{
    background-color: transparent;
    height:100%;
      .el-checkbox{
      margin-right: 1vw !important;
  }
  .hradingQuality-top{
    // height:11.1vh;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4A4A4A;
    background: #FFFFFF;
    box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
    border-radius: 8px;
    .equipTypelist {
      font-size: 14px;
      margin-left: 10px;
    }
    .hradingQuality-top-row{
      padding-top:2.4vh;
      padding-bottom: 1.5vh;
      .hradingQuality-top-row-span{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: 28px;
        padding-top: 0.5vh;
        padding-right: 0.3vw;
      }
      .hradingQuality-top-row-select,
      .hradingQuality-top-row-month,
      .hradingQuality-top-row-year {
        width: 8vw;
      }
      .hradingQuality-top-row-day{
        width: 15vw;
      }
      .hradingQuality-top-row-btn-export{
        position: absolute;
        right:1.5rem;
        background: #F5A623;
        border-radius: 2px;
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        width: 80px;
        height: 32px;
        color: #FFFFFF;
        letter-spacing: 0;
        display: flex;
        justify-content: center;
      }
     .hradingQuality-top-row-btn-query{
        position: absolute;
        right:7rem;
        background: #258AFF;
        border-radius: 2px;
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        width: 80px;
        height: 32px;
        color: #FFFFFF;
        letter-spacing: 0;
        display: flex;
        justify-content: center;
      }
    }
  }
  .hradingQuality-center {
    margin-top: 3vh;
    .hradingQuality-center-btn {
      background: #fff;
      height: 10px;
      margin-top: -10px;
      box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
      border-radius: 8px;
    }
    .hradingQuality-center-echart {
      background: #ffffff;
      box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
      border-radius: 8px;
      .hradingQuality-center-echart-border {
        transform: rotate(-90deg);
      }
    }
    .hradingQuality-center-isShow {
      position: absolute;
      bottom: -10px;
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
    .hradingQuality-center-border {
      transform: rotate(90deg);
    }
  }
  .hradingQuality-bottom {
    margin-top: 0.2vh;
    .hradingQuality-bottom-number {
      margin: 0.5rem;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #4a4a4a;
      letter-spacing: 0;
    }
    .hradingQuality-bottom-table {
      margin-top: 0.2vh;
      border: 1px solid #dcdbdd;
      box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
      border-radius: 8px;
    }
    .hradingQuality-bottom-pagination {
      margin-top: 3.3vh;
      margin-left: 1rem;
    }
  }
}
.bussinessSelect{
    margin-left: 1rem;
}

</style>
