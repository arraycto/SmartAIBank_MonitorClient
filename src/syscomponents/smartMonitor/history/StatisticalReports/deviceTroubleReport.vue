
<template>
  <div class="erroraccount">
    <div class="erroraccount-top">
      <el-row :span="5" class="erroraccount-top-row" style="margin-left:1vw;">
        <el-col :span="5">
          <el-row>
            <el-col :span="4">
              <span class="erroraccount-top-row-span">机构</span>
            </el-col>
            <el-col :span="19" style="margin-left:5px;">
              <el-select
                v-model="branchId"
                size="mini"
                placeholder="请选择"
                class="erroraccount-top-row-select"
                filterable
              >
                <el-option
                  v-for="item in orglist"
                  :key="item.branchNo"
                  :label="item.branchNo+'-'+item.branchName"
                  :value="item.branchNo"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="7" :push="4">
              <span class="erroraccount-top-row-span">报表周期</span>
            </el-col>
            <el-col :span="16" :push="4">
              <el-select
                v-model="historyReportParams.reportType"
                size="mini"
                placeholder="请选择"
                class="erroraccount-top-row-select"
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
              <span class="erroraccount-top-row-span">起止时间</span>
            </el-col>
            <el-col :span="18" :push="2">
              <el-date-picker
                v-model="datePicker"
                class="erroraccount-top-row-day"
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
              <span class="erroraccount-top-row-span">时间</span>
            </el-col>
            <el-col :span="18" :push="2">
              <el-date-picker
                v-model="month"
                class="erroraccount-top-row-month"
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
                <span class="erroraccount-top-row-span">时间</span>
              </el-col>
              <el-col :span="10" :push="5">
                <el-date-picker
                  v-model="quarterYear"
                  type="year"
                  size="mini"
                  class="erroraccount-top-row-year"
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
                <span class="erroraccount-top-row-span">季度</span>
              </el-col>
              <el-col :span="17" :push="3">
                <el-select
                  v-model="quarterMonth"
                  placeholder="请选择"
                  class="erroraccount-top-row-select"
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
        <el-col :span="9" v-if="isYear">
          <el-row>
            <el-col :span="4" :push="1">
              <span class="erroraccount-top-row-span">时间</span>
            </el-col>
            <el-col :span="18" :push="1">
              <el-date-picker
                v-model="historyReportParams.year"
                type="year"
                size="mini"
                class="erroraccount-top-row-year"
                format="yyyy"
                value-format="yyyy"
                :picker-options="{disabledDate: time => time.getTime() > Date.now() -3600*1000*24*365}"
                placeholder="选择年份"
              ></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="margin-left:1vw;">
        <el-col :span="2" class="erroraccount-top-equip">
          <span class="erroraccount-top-span">设备类型</span>
        </el-col>
        <el-col :span="21" class="erroraccount-top-equip">
          <el-row>
            <el-button
              v-for="(item,index) in equipTypelist"
              :key="index"
              size="mini"
              @click="equipClick(index)"
              :class="(item.showView%2)===0?'erroraccount-top-equip-but':'erroraccount-top-equip-click'"
            >{{item.devClassName}}</el-button>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="margin-left:1vw;">
        <el-col :span="2" class="erroraccount-top-equip">
          <span class="erroraccount-top-span erroraccount-top-spans">厂商类型</span>
        </el-col>
        <el-col :span="16" class="erroraccount-top-equip">
          <el-row>
            <el-button
              size="mini"
              @click="branchAllClick"
              :class="(allBranch%2)===0?'erroraccount-top-equip-buts':'erroraccount-top-equip-click erroraccount-top-spans'"
            >全部</el-button>
            <el-button
              v-for="(item,index) in getDevModel"
              :key="index"
              size="mini"
              @click="branchClick(index)"
              :class="(item.showView%2)===0?'erroraccount-top-equip-buts':'erroraccount-top-equip-click erroraccount-top-spans'"
            >{{item.name}}</el-button>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-col :span="14">
            <el-button
              type="primary"
              size="mini"
              class="erroraccount-top-row-btn-query"
              @click="checkNull"
            >查&nbsp;&nbsp;询</el-button>
          </el-col>
          <el-col :span="10">
            <tableReport
              :tableParams="historyReportParams"
              :branchId="branchId"
              class="erroraccount-top-row-btn-export"
              :buttonId="'deviceTrouble'"
            ></tableReport>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div class="erroraccount-center">
      <!--Echarts图全部 -->
      <div v-show="btnShow">
        <!-- 展示按钮及背景-->
        <el-button size="mini" class="erroraccount-center-isShow" @click="Echarts">
          {{isEcharts.name}}
          <span class="erroraccount-center-border el-icon-d-arrow-right"></span>
        </el-button>
        <div class="erroraccount-center-btn"></div>
      </div>

      <div class="erroraccount-center-echart" v-show="isEcharts.isable">
        <!-- 收齐按钮及Echarts图-->
        <el-row>
          <el-col :span="24">
            <occupied v-show="disChart" height="300px" explain="暂无数据" />
            <div
              class="echarts"
              v-show="chart"
              style="height:300px;width:72vw;margin:0.5rem;"
              id="deviceTroubleReportChart"
            ></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button size="mini" class="erroraccount-center-isShow" @click="Echarts">
              {{isEcharts.name}}
              <span
                class="erroraccount-center-echart-border el-icon-d-arrow-right"
              ></span>
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="erroraccount-bottom">
      <div class="erroraccount-bottom-number">共{{total}}条记录</div>
      <el-table
        :data="tableList"
        size="samll"
        stripe
        fit
        fixed="true"
        @cell-click="equipAmountClick"
        :header-cell-style="theadClassName"
        :cell-class-name="tableRowClassName"
        class="erroraccount-bottom-table"
      >
        <el-table-column
          :prop="item.prop"
          v-for="(item,index) in mclassNameList"
          :key="index"
          :label="item.label"
          :header-align="index>4?'center':'left'"
          :min-width="item.width"
        >
          <el-table-column
            v-for="(items,indx) in mclassNameList[index].erbiao"
            :key="indx"
            :prop="items.prop"
            :label="items.label"
            :min-width="items.width"
          >
            <template slot-scope="scope">
              <div v-if="index>=4">
                <div v-if="indx===0">{{scope.row.peripheralFaultRates1[index-4]}}</div>
                <div v-if="indx===1">{{scope.row.peripheralFaultRates2[index-4]}}</div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <div slot="empty">
          <occupied height="52.4vh" explain="暂无数据" />
        </div>
      </el-table>
      <pagination
        class="erroraccount-bottom-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="historyReportParams.pageNum"
        :page-size="historyReportParams.pageSize"
        :total="total"
        position="relative"
      />
    </div>

    <!-- 外设故障详情 -->
    <el-dialog
      :center="true"
      :close-on-click-modal="false"
      width="80%"
      :visible.sync="troubleShow"
      title="外设故障详情列表"
    >
      <hr style="margin-top:-2rem;" />
      <div style="float:right;display:inline-block;">
        <div>
          <tableReport
            :tableParams="detailParams"
            :branchId="branchId"
            class="erroraccount-top-row-btn-export"
            :buttonId="'deviceTroubleDetial'"
          ></tableReport>
        </div>
        <span
          class="erroraccount-bottom-number;"
          style="float:right;margin: 0.5rem 0 0.5rem 0;"
        >共{{detailTotal}}条记录</span>
      </div>

        <el-table
        :data="tableLists"
        size="samll"
        stripe
        fit
        fixed="true"
        :header-cell-style="theadClassName"
        class="erroraccount-bottom-table"
      >
        <el-table-column
          :prop="item.prop"
          v-for="(item,index) in mclassNameLists"
          :key="index"
          :label="item.label"
          :header-align="index>1?'center':'left'"
          :min-width="item.width"
        >
          <el-table-column
            v-for="(items,indx) in mclassNameLists[index].erbiao"
            :key="indx"
            :prop="items.prop"
            :label="items.label"
            :width="items.width"
          >
            <template slot-scope="scope">
              <div v-if="index>1">
                <div v-if="indx===0">
                  {{scope.row.peripheralFaultRates3[index-2]}}
                  <!-- {{index}} -->
                </div>
                <div v-if="indx===1">{{scope.row.peripheralFaultRates4[index-2]}}</div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <div slot="empty">
          <occupied height="52.4vh" explain="暂无数据" />
        </div>
      </el-table>
      <pagination
        class="erroraccount-bottom-pagination"
        @size-change="handleSizeChanges"
        @current-change="handleCurrentChanges"
        :current-page="pageNum"
        :page-size="pageSize"
        :total="detailTotal"
        position="relative"
      />
    </el-dialog>
  </div>
</template>
<script>
import pagination from '@/syscomponents/smartMonitor/pagination/pagination'
import occupied from '@/components/Occupied/occupied'
import services from '../../../../services'
import base from '@/common/base'
import tableReport from '@/syscomponents/smartMonitor/history/StatisticalReports/tableReport'
import echarts from 'echarts'
// import options from './errorAccountDealEcharts.js'
import options from './deviceTroubleReport.js'
export default {
  name: 'DeviceTroubleReport',
  data () {
    return {
      dateList: [{
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
      echartsData: [],
      mclassNameList: [{
        label: '设备类型',
        prop: 'devClassName',
        width: '120',
        erbiao: []
      }, {
        label: '设备型号',
        prop: 'devModelKey',
        width: '120',
        erbiao: []
      },
      {
        label: '设备型号名称',
        prop: 'devModelName',
        width: '120',
        erbiao: []
      },
      {
        label: '设备厂商',
        prop: 'manufacturerName',
        width: '120',
        erbiao: []
      }, {
        label: '计划开机时间',
        prop: 'startUpTime',
        width: '120',
        erbiao: []
      }],
      mclassNameLists: [{
        label: '设备编号',
        prop: 'mid',
        width: '120',
        erbiao: []
      }, {
        label: '计划开机时间',
        prop: 'normalTime',
        width: '120',
        erbiao: []
      }],
      underOrg: [],
      orglist: [],
      tableList: [],
      tableLists: [],
      datePicker: [],
      chart: false,
      disChart: true,
      troubleShow: false, // 故障详情diog
      branchId: base.getStore({ key: 'orgId' }),
      historyReportParams: { // 查询上送参数
        dataType: 'DEVICE',
        endDate: '', // 结束日期
        month: '', // 月
        pageNum: 1,
        modelKey: '',
        pageSize: 10,
        quarter: '', // 季
        reportType: 'day', // 报表类型
        devClassKey: '',
        manufacturerIds: [],
        startDate: '', // 开始日期
        year: '', // 年
        isManager: false
      },
      allBranch: 0,
      devClassKey: '',
      manufacturerIds: [],
      equipTypelist: [], // 设备类型备选数据
      getDevModel: [], // 设备厂商备选数据
      peripheralFaultRates1: [],
      peripheralFaultRates2: [],
      peripheralFaultRates3: [],
      peripheralFaultRates4: [],
      total: 0, // 列表数据总数
      detailTotal: 0, // 详情列表总数
      pageNum: 1,
      pageSize: 10,
      month: new Date(new Date().getTime() - 3600 * 1000 * 24 * 30), // 默认月份
      year: new Date(new Date().getTime() - 3600 * 1000 * 24), // 年
      quarterYear: new Date(new Date().getTime() - 3600 * 1000 * 24),
      quarterMonth: '',
      startTranDate: '',
      isDay: true,
      isMonth: false,
      isQuarter: false,
      isYear: false,
      dataType: '',
      btnShow: false,
      isEcharts: {
        name: '收起',
        isable: true
      },
      detailParams: {

      }
    }
  },
  components: {
    occupied, pagination, tableReport
  },
  mounted () {
    this.getdatatime() // 默认起止时间
    this.getmonth() // 查询近三月
    this.getOrgInfo() // 查询下拉列表备选数据及厂商设备类型
    this.historyReportParams.devClassKey = '130000'
    this.checkAuth()
    this.query()
  },
  methods: {
    // 查询表头
    getModel: async function () {
      try {
        // console.log('devClassKey:' + this.devClassKey)
        this.modelList =  await services.api.monitor.historyReport.getPeripheralFaultRateHeader(base.getStore({ key: 'orgId' }), this.historyReportParams.devClassKey)
        this.mclassNameList = [{
          label: '设备类型',
          prop: 'devClassName',
          width: '120',
          erbiao: []
        }, {
          label: '设备型号',
          prop: 'devModelKey',
          width: '120',
          erbiao: []
        }, {
          label: '设备型号名称',
          prop: 'devModelName',
          width: '120',
          erbiao: []
        }, {
          label: '设备厂商',
          prop: 'manufacturerName',
          width: '120',
          erbiao: []
        }, {
          label: '计划开机时间',
          prop: 'startUpTime',
          width: '120',
          erbiao: []
        }]
        this.mclassNameLists = [{
          label: '设备编号',
          prop: 'mid',
          width: '120',
          erbiao: []
        }, {
          label: '计划开机时间',
          prop: 'normalTime',
          width: '120',
          erbiao: []
        }]
        this.modelList.map((item, index) => {
          const arr = {
            label: item.peripheralName,
            width: '180',
            erbiao: [
              { label: '故障时间',
                prop: 'sumFaultTimeInt',
                width: '100'
              },
              { label: '故障率',
                prop: 'faultTimeIntRate',
                width: '80'
              }
            ]
          }
          this.mclassNameList.push(arr)
          this.mclassNameLists.push(arr)
        })
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    // 查询下拉列表备选数据
    getOrgInfo: async function () {
      try {
        this.orglist =  await services.api.monitor.monitorCondition.getOrgInfo(base.getStore({ key: 'orgId' }))
        const list1 =  await services.api.monitor.monitorCondition.getDevType()
        const list2  =  await services.api.monitor.monitorCondition.getDevModel('130000', null)
        this.getDevModel = []
        this.equipTypelist =  []
        list1.map((item, index) => {
        //   console.log(item.devClassKey)
          if (item.devClassKey === '130000') {
            this.equipTypelist.push({
              'showView': 1,
              'devClassName': item.devClassName,
              'devClassKey': item.devClassKey
            })
            this.historyReportParams.devClassKey = item.devClassKey
            this.devClassKey = item.devClassKey
            this.getModel() // 查询表头
          } else {
            this.equipTypelist.push({
              'showView': 0,
              'devClassName': item.devClassName,
              'devClassKey': item.devClassKey
            })
          }
        })
        list2.map((item, index) => {
          this.getDevModel.push({
            'showView': 0,
            'manufacturerId': item.manufacturerId,
            'name': item.name
          })
        })
        // console.log('this.getDevModel' + JSON.stringify(this.getDevModel))
        // console.log('this.equipTypelist' + JSON.stringify(this.equipTypelist))
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
      this.branchAllClick()
    },
    Echarts () { // Echarts展开和收起
      if (this.isEcharts.isable === false) {
        this.isEcharts.isable = true
        this.isEcharts.name = '收起'
        this.btnShow = false
        this.query()
      } else {
        this.btnShow = true
        this.isEcharts.isable = false
        this.isEcharts.name = '展示'
      }
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
      this.getModel()
      var self = this
      try {
        // console.log('branchId' + this.branchId + 'historyReportParams:' + JSON.stringify(this.historyReportParams))
        const peripheralParams = this.historyReportParams
        // console.log(JSON.stringify(peripheralParams))
        const tableList = await services.api.monitor.historyReport.getPeripheralFaultRateGather(this.branchId, peripheralParams)
        self.echartsData = await services.api.monitor.historyReport.getPeripheralGraphic(this.branchId, this.historyReportParams)
        self.total = tableList.total
        self.tableList = tableList.list
        self.peripheralFaultRates1 = []
        self.peripheralFaultRates2 = []
        if (self.echartsData.length !== 0) {
          self.chart = true
          self.disChart = false
        } else {
          self.chart = false
          self.disChart = true
        }
        // console.log(JSON.stringify(this.echartsData))
        // console.log(JSON.stringify(this.tableList))
        self.tableList.map((item, indexA) => {
          item.peripheralFaultRates.map((items, indx) => {
            self.peripheralFaultRates1[indx] = items.sumFaultTimeInt
            self.peripheralFaultRates2[indx] = items.faultTimeIntRate
          })
          self.tableList[indexA]['peripheralFaultRates1'] = self.peripheralFaultRates1
          self.tableList[indexA]['peripheralFaultRates2'] = self.peripheralFaultRates2
        })
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
      this.$nextTick(function () {
        this.initChart()
      })
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
      this.historyReportParams.startDate = this.datePicker[0]
      this.historyReportParams.endDate = this.datePicker[1]
    },
    changeDayDate: function () { // 开始结束时间赋值
      if (this.datePicker !== null) {
        this.historyReportParams.startDate = this.datePicker[0]
        this.historyReportParams.endDate = this.datePicker[1]
      } else {
        this.historyReportParams.startDate = ''
        this.historyReportParams.endDate = ''
      }
    },
    // 调整表格头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333333;font-size: 14px;font-family: PingFangSC-Semibold;letter-spacing: 0;'
      }
    },
    initChart () { // Echarts展示
      var self = this
      this.$nextTick(function () {
        setTimeout(function () {
          const chart = echarts.init(document.getElementById('deviceTroubleReportChart'))
          const xAxis = []
          // console.log('echartsData:' + JSON.stringify(this.echartsData))
          self.echartsData.map((item, index) => { // 传入横坐标
            xAxis.push(item.devClassName)
          })
          const series = []
          const checkArr = []
          const color1 = ['#77B6FF', '#73E9EE', '#F7D205', '#FFA3A3', '#C7B3FF', '#F5974E']
          const arr = []
          const checkArrs = []
          self.manufacturerIds.map((item1, index1) => {
            self.getDevModel.map((item2, index2) => {
              if (item1 === item2.manufacturerId) {
                const arrChild = { name: item2.name, icon: 'circle' }
                const seriesChild = {
                  type: 'bar',
                  name: '',
                  data: [],
                  barWidth: 30,
                  color: ''
                }
                seriesChild.name = item2.name
                self.echartsData.map((item3, index3) => {
                  if (item3.manufFaultInfo.length > 0) {
                    item3.manufFaultInfo.map((item4, index4) => {
                      if (item1 === item4.manufId) {
                        // console.log('aaa:' + item4.manufName + '::::' + item4.devFaultRate + ';;;;;' + item4.manufId)
                        seriesChild.data.push(item4.devFaultRate)
                        checkArr.push(item4.manufName)
                        seriesChild.color = color1[index2]
                      }
                    })
                  } else {
                    seriesChild.data.push(0)
                  }
                })
                checkArr.map((item5, index5) => {
                  if (checkArrs.indexOf(item5) === -1) {
                    checkArrs.push(item5)
                  }
                })
                checkArrs.map((item6, index6) => {
                  if (item2.name === item6) {
                    arr.push(arrChild)
                    series.push(seriesChild)
                  }
                })
                // console.log(JSON.stringify(checkArrs))
              }
            })
          })
          // var amount = 0
          // console.log(JSON.stringify(series))
          // series.map((item, index) => {
          //   item.data.map((items, indexs) => {
          //     if (items === 0) {
          //       amount = amount + 1
          //     }
          //   })
          // })
          // console.log(amount === Number(this.manufacturerIds.length) * Number(xAxis.length) + ':' + amount)
          // if (amount === Number(checkArrs.length) * Number(xAxis.length)) {
          //   this.disChart = true
          //   this.chart = false
          //   return
          // }
          // console.log(JSON.stringify('aaa' + JSON.stringify(series)))
          const yName = '外设模块故障率(%)'
          const mOption = options.lineColOption(xAxis, yName, series, arr)
          // console.log('series' + JSON.stringify(mOption))
          chart.setOption(mOption, true)
          // 根据窗口的大小变动图表
          window.onresize = function () {
            chart.resize()
          }
        }, 500)
      })
    },
    // 每页条数
    handleSizeChange (val) {
      this.historyReportParams.pageSize = val
      this.query()
    },
    // 当前页数
    handleCurrentChange (val) {
      this.historyReportParams.pageNum = val
      this.query()
    },
    // 详情每页条数
    handleSizeChanges (val) {
      this.pageSize = val
      this.getDetailList()
    },
    // 详情当前页数
    handleCurrentChanges (val) {
      this.pageNum = val
      this.getDetailList()
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
      if (this.month !== null) {
        const date = new Date(this.month)
        this.historyReportParams.year = date.getFullYear()
        this.historyReportParams.month = date.getMonth() + 1
      } else {
        this.historyReportParams.year = null
        this.historyReportParams.month = null
      }
    },
    branchClick (index) {  // 设备厂商选中值
      this.getDevModel[index].showView = this.getDevModel[index].showView + 1
      this.historyReportParams.manufacturerIds = []
      this.manufacturerIds = []
      this.getDevModel.map((item, index) => {
        if ((item.showView % 2) === 1) {
          this.historyReportParams.manufacturerIds.push(item.manufacturerId)
          this.manufacturerIds.push(item.manufacturerId)
        }
        if ((item.showView % 2) === 0) {
          this.allBranch = 0
        }
        var a = 0
        this.getDevModel.map((item, index) => {
          if ((item.showView % 2) === 1) {
            a = a + 1
          }
          if (a === this.getDevModel.length) {
            this.allBranch = 1
          }
        })
      })

    //   console.log(JSON.stringify(this.historyReportParams.manufacturerIds))
    },
    branchAllClick () { // 设备厂商点击全部
      this.historyReportParams.manufacturerIds = []
      this.manufacturerIds = []
      this.allBranch = this.allBranch + 1
      this.getDevModel.map((item, index) => { // 高亮显示
        if ((this.allBranch % 2) === 1) {
          item.showView = 0
        }
        item.showView = item.showView + 1
      })
      this.getDevModel.map((item, index) => { // 赋值
        if ((item.showView % 2) === 1) {
          this.historyReportParams.manufacturerIds.push(item.manufacturerId)
          this.manufacturerIds.push(item.manufacturerId)
        }
      })
    //   console.log(JSON.stringify(this.historyReportParams.manufacturerIds))
    },
    equipClick: async function (index) { // 设备类型选中值
      this.equipTypelist.map((item, index) => {
        item.showView = 0
      })
      this.equipTypelist[index].showView = this.equipTypelist[index].showView + 1
      this.historyReportParams.devClassKey = this.equipTypelist[index].devClassKey
      this.devClassKey = this.equipTypelist[index].devClassKey
      try {
        // let devModellist
        const devModellist  = await services.api.monitor.monitorCondition.getDevModel(this.devClassKey, null)
        this.getDevModel = []
        devModellist.map((item, index) => {
          this.getDevModel.push({
            'showView': 0,
            'manufacturerId': item.manufacturerId,
            'name': item.name
          })
        })
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    tableRowClassName ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return 'color'
      }
    },
    equipAmountClick (row, column, cell, event) { // 点击单元格
      if (column.property === 'devModelKey') {
        this.troubleShow = true
        this.getDetailList(row.devModelKey)
      }
    },
    getDetailList: async function (devModelKey) { // 查询详细外设列表
      try {
        const peripheralParams = {
          dataType: 'DEVICE',
          devClassKey: '',
          endDate: '',
          manufacturerIds: [],
          modelKey: '',
          month: '',
          pageNum: 0,
          pageSize: 0,
          quarter: '',
          reportType: '',
          startDate: '',
          year: '',
          isManager: false
        }
        peripheralParams.isManager = this.historyReportParams.isManager
        peripheralParams.devClassKey = this.devClassKey
        peripheralParams.endDate = this.historyReportParams.endDate
        peripheralParams.manufacturerIds = this.manufacturerIds
        peripheralParams.modelKey = devModelKey
        peripheralParams.month = this.historyReportParams.month
        peripheralParams.pageNum = this.pageNum
        peripheralParams.pageSize = this.pageSize
        peripheralParams.quarter = this.historyReportParams.quarter
        peripheralParams.reportType = this.historyReportParams.reportType
        peripheralParams.startDate = this.historyReportParams.startDate
        peripheralParams.year = this.historyReportParams.year

        // console.log(JSON.stringify(peripheralParams))
        this.detailParams = peripheralParams
        const tableList = await services.api.monitor.historyReport.getPeripheralDetail(this.branchId, peripheralParams)
        this.detailTotal = tableList.total
        // console.log('tableList' + JSON.stringify(tableList.list))
        this.tableLists = tableList.list
        this.peripheralFaultRates3 = []
        this.peripheralFaultRates4 = []
        this.tableLists.map((item, index) => {
          item.lists.map((items, indx) => {
            this.peripheralFaultRates3[indx] = items.normalTime
            this.peripheralFaultRates4[indx] = items.rate
          })
          this.tableLists[index]['peripheralFaultRates3'] = this.peripheralFaultRates3
          this.tableLists[index]['peripheralFaultRates4'] = this.peripheralFaultRates4
          // this.tableLists[index]['peripheralFaultRates3'] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          // this.tableLists[index]['peripheralFaultRates4'] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          // console.log(index + ':' + JSON.stringify(this.tableLists[index].peripheralFaultRates3) + JSON.stringify(this.tableLists[index].peripheralFaultRates4))
        })
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    checkNull () {
      if (JSON.stringify(this.manufacturerIds) === '[]') {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      if (this.isDay === true && this.datePicker === null) {
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
      if (this.isYear === true && this.historyReportParams.year === '') {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      this.query()
    },
    checkAuth () {
      const branckList = base.getStore({ key: 'monitorBranchList' })
      this.underOrg = JSON.parse(branckList)
      this.underOrg.map((item, index) => {
        if (this.branchId === item.orgId) {
          // console.log(item)
          if (item.orgLevelId === '3' && item.orgTypeId === '5') { // 营业兼管理
            this.historyReportParams.isManager = true
          } else {
            this.historyReportParams.isManager = false
          }
          // console.log(this.branchId + ':' + this.historyReportParams.isManage)
        }
      })
    }
  },
  watch: {
    branchId: function () {
      this.checkAuth()
    },
    quarterYear: function (val) {
      this.visibleSelect()
      this.historyReportParams.year = this.quarterYear
    },
    quarterMonth: function (val) {
      this.historyReportParams.quarter = this.quarterMonth
    },
    'historyReportParams.reportType': function (val) {
      this.isDay = false
      this.isMonth = false
      this.isQuarter = false
      this.isYear = false
      this.modelList = []
      this.historyReportParams.day = ''
      this.historyReportParams.quarter = ''
      this.historyReportParams = { // 查询上送参数
        dataType: 'DEVICE',
        endDate: '', // 结束日期
        month: '', // 月
        pageNum: 1,
        pageSize: 10,
        devClassKey: '',
        manufacturerIds: [],
        quarter: '', // 季
        reportType: val, // 报表类型
        startDate: '', // 开始日期
        year: '', // 年
        isManager: false
      }
      this.checkAuth()
      this.historyReportParams.devClassKey = this.devClassKey
      this.historyReportParams.manufacturerIds = this.manufacturerIds
      switch (val) {
      case 'day':
        this.isDay = true
        // console.log(this.datePicker[0])
        this.historyReportParams.startDate = this.datePicker[0]
        this.historyReportParams.endDate = this.datePicker[1]
        break
      case 'month':
        this.isMonth = true

        this.historyReportParams.month = new Date(this.month).getMonth() + 1
        this.historyReportParams.year = new Date(this.month).getFullYear()
        break
      case 'quarter':
        this.quarterYear = (new Date().getFullYear()) + ''
        this.visibleSelect()
        this.historyReportParams.year =  new Date(this.quarterYear).getFullYear()
        this.historyReportParams.quarter = this.quarterMonth
        this.isQuarter = true
        break
      case 'year':
        this.isYear = true
        this.historyReportParams.year = new Date(new Date().getTime() - 3600 * 1000 * 24 * 365).getFullYear() + ''
        this.year = new Date(new Date().getTime() - 3600 * 1000 * 24 * 365).getFullYear() + ''
        break
      default:
        break
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
.erroraccount{

    background-color: transparent;
    height:100%;
          .el-checkbox{
      margin-right: 1vw !important;
  }
  .el-button--mini {
    font-size: 12px !important;
  }
  .el-button {
    transition: 0s !important;
  }
  .erroraccount-top {
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
    .erroraccount-top-row{
      padding-top:20px;
      .erroraccount-top-row-span{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: 25px;
        padding-top: 0.5vh;
        padding-right: 0.3vw;
      }
      .erroraccount-top-row-select,
      .erroraccount-top-row-month,
      .erroraccount-top-row-year {
        width: 8vw;
      }
      .erroraccount-top-row-day{
        width: 15vw;
      }
    }
    .erroraccount-top-row-btn-export {
      position: absolute;
      right: 1.5rem;
      // background: #F5A623;
      border-radius: 2px;
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      width: 80px;
      height: 32px;
      // color: #FFFFFF;
      letter-spacing: 0;
      display: flex;
      justify-content: center;
    }
    .erroraccount-top-row-btn-query {
      position: absolute;
      right: 7rem;
      background: #258aff;
      border-radius: 2px;
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      height: 32px;
      color: #ffffff;
      letter-spacing: 0;
      display: flex;
      justify-content: center;
    }
    .erroraccount-top-equip {
      margin-top: 10px;
      float: left;
      .el-button:focus,
      .el-button:hover {
        background: white;
      }
      .erroraccount-top-span {
        display: block;
        float: left;
        font-size: 14px;
        line-height: 28px;
        font-family: PingFangSC-Regular;
        color: #4a4a4a;
      }
      .erroraccount-top-spans {
        margin-top: -1rem;
      }
      .erroraccount-top-equip-but {
        margin-left: 7px;
        float: left;
        margin-bottom: 0.5rem;
        margin-right: 1vw;
        // margin:0 auto;
      }
      .erroraccount-top-equip-buts {
        float: left;
        margin-bottom: 1.2rem;
        margin-top: -1rem;
        border: 1px solid #dcdfe6;
        color: #606266;
        margin-right: 1vw;
        margin-left: 7px;
      }
      .erroraccount-top-equip-click {
        float: left;
        margin-right: 1vw;
        margin-left: 7px;
        margin-bottom: 1.2rem;
        border: 1px solid #258aff;
        color: #258aff;
        // margin:0 auto;
      }
    }
    .erroraccount-top-equips {
      margin-top: 3rem;
    }
  }
  .erroraccount-center {
    margin-top: 2vh;
    .erroraccount-center-btn {
      background: #fff;
      height: 10px;
      margin-top: -10px;
      box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
      border-radius: 8px;
    }
    .erroraccount-center-echart {
      background: #ffffff;
      box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
      border-radius: 8px;
      .erroraccount-center-echart-border {
        transform: rotate(-90deg);
      }
    }
    .erroraccount-center-isShow{
      position: relative;
      bottom: 0;
      border:0;
      border-radius: 8px 8px 0px 0px;
      box-shadow: 0 0 10px 0 rgba(173, 173, 173, 0.5);
      background-color: #fff;
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: #4A4A4A;
      padding: 4px 1.8rem;
    }
    .erroraccount-center-border {
      transform: rotate(90deg);
    }
  }
  .erroraccount-bottom{
    margin-top:0.2vh;
    .erroraccount-bottom-number{
    //   margin: 0.3rem;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0;
    }
    .erroraccount-bottom-table {
      margin-top: 0.2vh;
      border: 1px solid #dcdbdd;
      box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
      border-radius: 8px;
    }
    .erroraccount-bottom-pagination{
      margin-top:3.3vh;
      margin-left:1rem;
    }
  }
}
.color{
  color:#258AFF;
  cursor: pointer;
}
</style>
