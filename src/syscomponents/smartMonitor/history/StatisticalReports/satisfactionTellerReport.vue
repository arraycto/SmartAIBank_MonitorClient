<template>
  <div class="satisfactionTeller">
      <div class="satisfactionTeller-top">
        <el-row  class="satisfactionTeller-top-row" style="margin-left:1vw;">
            <el-col :span="5">
                <el-row>
                    <el-col :span="4">
                    <span class="satisfactionTeller-top-row-span">机构</span>
                    </el-col>
                    <el-col :span="19">
                    <el-select v-model="branchId" size="mini" placeholder="请选择" class="satisfactionTeller-top-row-select"
                    filterable>
                        <el-option
                            v-for="item in orglist"
                            :key="item.branchNo"
                            :label="item.branchNo+'-'+item.branchName"
                            :value="item.branchNo">
                        </el-option>
                    </el-select>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col :span="7" :push="4">
                    <span class="satisfactionTeller-top-row-span">报表周期</span>
                    </el-col>
                    <el-col :span="16" :push="4">
                    <el-select v-model="params.reportType" size="mini" placeholder="请选择" class="satisfactionTeller-top-row-select">
                        <el-option
                            v-for="item in dateList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    </el-col>
                </el-row>
            </el-col>
            <!-- 日控件 -->
            <el-col :span="9"  v-show="isDay">
                <el-row>
                    <el-col :span="5" :push="2">
                    <span class="satisfactionTeller-top-row-span">起止时间</span>
                    </el-col>
                    <el-col :span="18" :push="2">
                    <el-date-picker
                        v-model="datePicker"
                        class="satisfactionTeller-top-row-day"
                        type="daterange"
                        format="yyyyMMdd"
                        value-format="yyyyMMdd"
                        range-separator="——"
                        @change="changeDayDate"
                        size="mini"
                        :picker-options="{disabledDate: time => time.getTime() > Date.now()- 3600 * 1000 * 24 || time.getTime() < new Date(this.startTranDate).getTime()-3600*1000*24}">
                    </el-date-picker>
                    </el-col>
                </el-row>
            </el-col>
            <!-- 月份控件 -->
            <el-col :span="9"  v-show="isMonth">
                <el-row>
                    <el-col :span="3" :push="2">
                      <span class="satisfactionTeller-top-row-span">时间</span>
                    </el-col>
                    <el-col :span="18" :push="2">
                      <el-date-picker
                        v-model="month"
                        class="satisfactionTeller-top-row-month"
                        type="month"
                        size="mini"
                        format="yyyyMM"
                        value-format="yyyyMM"
                        @change="changeMonthDate"
                        :picker-options="{disabledDate: time => time.getTime() > Date.now() -3600*1000*24*30 || time.getTime() < Date.now()- 3600 * 1000 * 24 * 30 *24}"
                        placeholder="选择月">
                      </el-date-picker>
                    </el-col>
                </el-row>
            </el-col>
            <!-- 季度控件 -->
            <el-col :span="9" v-show="isQuarter">
                <el-col :span="12">
                    <el-row>
                        <el-col :span="5" :push="5">
                          <span class="satisfactionTeller-top-row-span">时间</span>
                        </el-col>
                        <el-col :span="10" :push="5">
                          <el-date-picker
                            v-model="quarterYear"
                            type="year"
                            size="mini"
                            class="satisfactionTeller-top-row-year"
                            format="yyyy"
                            value-format="yyyy"
                            :picker-options="{disabledDate: time => time.getTime() > Date.now() || time.getTime() < Date.now() -3600*1000*24*365*3}"
                            placeholder="选择年份">
                          </el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="7" :push="3">
                        <span class="satisfactionTeller-top-row-span">季度</span>
                        </el-col>
                        <el-col :span="17" :push="3">
                          <el-select v-model="quarterMonth" placeholder="请选择" class="satisfactionTeller-top-row-select" size="mini">
                            <!--  -->
                            <el-option
                              v-for="item in quarterList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                            </el-option>
                          </el-select>
                        </el-col>
                    </el-row>
                </el-col>
            </el-col>
            <!-- 年份控件 -->
            <el-col :span="9" v-if="isYear">
              <el-row>
                <el-col :span="4" :push="1">
                    <span class="satisfactionTeller-top-row-span">时间</span>
                </el-col>
                <el-col :span="18" :push="1">
                    <el-date-picker
                    v-model="params.year"
                    type="year"
                    size="mini"
                    class="satisfactionTeller-top-row-year"
                    format="yyyy"
                    value-format="yyyy"
                    :picker-options="{disabledDate: time => time.getTime() > Date.now() -3600*1000*24*365}"
                    placeholder="选择年份">
                    </el-date-picker>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-col :span="14" >
                <el-button type="primary" size="mini" class="satisfactionTeller-top-row-btn-query"  @click="checkNull">查&nbsp;&nbsp;询</el-button>
              </el-col>
              <el-col :span="10">
                <tableReport :tableParams="params" :branchId="branchId" class="satisfactionTeller-top-row-btn-export" :buttonId="'satisfactionTeller'"></tableReport>
              </el-col>
            </el-col>
          </el-row>
      </div>
      <div class="satisfactionTeller-bottom">
        <div class="satisfactionTeller-bottom-number">
          共{{total}}条记录
        </div>
        <el-table
        :data="tableList"
        size="samll"
        stripe fit fixed="true"
        :header-cell-style="theadClassName"
        class="satisfactionTeller-bottom-table">
          <el-table-column
          :prop="item.prop"
          v-for="(item,index) in mclassNameList"
          :key="index"
          :label="item.label"
          :min-width="item.width">
          </el-table-column>
          <div slot="empty">
            <occupied height='300px' explain='暂无数据'/>
          </div>
        </el-table>
        <pagination
        class="satisfactionTeller-bottom-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pageNum"
        :page-size="params.pageSize"
        :total="total"
        position="relative"/>
      </div>
  </div>
</template>
<script>
import pagination from '@/syscomponents/smartMonitor/pagination/pagination'
import occupied from '@/components/Occupied/occupied'
import services from '../../../../services'
import base from '@/common/base'
import tableReport from '@/syscomponents/smartMonitor/history/StatisticalReports/tableReport'
export default {
  name: 'satisfactionTellerReport',
  data () {
    return {
      dateList: [{
        label: '日报表',
        value: 'day'
      }, {
        label: '月报表',
        value: 'month'
      // }, {
      //   label: '季报表',
      //   value: 'quarter'
      // }, {
      //   label: '年报表',
      //   value: 'year'
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
      mclassNameList: [{
        width: '30'
      }, {
        label: '分行',
        prop: 'unitName',
        width: '75'
      }, {
        label: '机构号',
        prop: 'branchNo',
        width: '75'
      }, {
        label: '机构名称',
        prop: 'branchName',
        width: '70'
      }, {
        label: '好评数',
        prop: 'positiveCount',
        width: '70'
      }, {
        label: '中评数',
        prop: 'midCount',
        width: '70'
      }, {
        label: '差评数',
        prop: 'negativeCount',
        width: '60'
      }, {
        label: '未评价',
        prop: 'unevaluateCount',
        width: '60'
      }, {
        label: '评价数',
        prop: 'evaluateCount',
        width: '60'
      }],
      orglist: [],
      tableList: [],
      datePicker: [],
      total: 0,
      chart: false,
      disChart: true,
      underOrg: '',
      branchId: '',
      branchIdA: base.getStore({ key: 'orgId' }),
      params: { // 查询上送参数
        endDate: '', // 结束日期
        month: '', // 月
        pageNum: 1,
        pageSize: 10,
        quarter: '', // 季
        reportType: 'day', // 报表类型
        startDate: '', // 开始日期
        year: '' // 年
      },
      month: new Date(new Date().getTime() - 3600 * 1000 * 24 * 30), // 默认月份
      year: '', // 年
      quarterYear: '',
      quarterMonth: '',
      startTranDate: '',
      isDay: true,
      isMonth: false,
      isQuarter: false,
      isYear: false,
      dataType: '',
      btnShow: false
    }
  },
  components: {
    occupied, pagination, tableReport
  },
  mounted () {
    this.getOrgInfo()  // 查询下拉列表备选数据
    this.checkLeve()
    this.getmonth()  // 获取近三月日期
    this.getdatatime() // 默r认开始结束日期
    // this.query()
  },
  methods: {
    // 查询下拉列表备选数据
    getOrgInfo: async function () {
      try {
        const list =  await services.api.monitor.monitorCondition.getOrgInfo(base.getStore({ key: 'orgId' }))
        this.orglist = []
        list.map((item, index) => {
          this.underOrg.map((items, indexs) => {
            if (item.branchNo === items.orgId) {
              // if (items.orgLevelId !== '2' && items.orgLevelId !== '1') {
              this.orglist.push(item)
              // }
            }
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
        // console.log('branchId' + this.branchId + 'params:' + JSON.stringify(this.params))
        const data = await services.api.monitor.historyReport.getSatisfactionTellerInfo(this.branchId, this.params)
        // console.log('data:' + JSON.stringify(data))
        this.tableList = data.list
        this.total =  data.total
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
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
      const date = year + month  + day
      // 空数组赋值2次
      this.datePicker.push(date)
      this.$set(this.datePicker, 1, date)
      this.params.startDate = this.datePicker[0]
      this.params.endDate = this.datePicker[1]
    },
    changeDayDate: function () { // 开始结束时间赋值
      if (this.datePicker !== null) {
        this.params.startDate = this.datePicker[0]
        this.params.endDate = this.datePicker[1]
      } else {
        this.params.startDate = ''
        this.params.endDate = ''
      }
    },
    // 调整表格头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333333;font-size: 14px;font-family: PingFangSC-Semibold;letter-spacing: 0;'
      }
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
      if (this.month !== null) {
        const date = new Date(this.month)
        this.params.year = date.getFullYear()
        this.params.month = date.getMonth() + 1
      } else {
        this.params.year = null
        this.params.month = null
      }
    },
    checkNull () {
      if (this.isDay === true && this.datePicker === null) {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      // console.log('branchId:' + this.branchId)
      if (this.branchId === '') {
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
      if (this.isYear === true && this.params.year === '') {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      this.query()
    },
    checkLeve () {
      const branckList = base.getStore({ key: 'monitorBranchList' })
      this.underOrg = JSON.parse(branckList)
      this.branchId = base.getStore({ key: 'orgId' })
      this.underOrg.map((item, index) => {
        if (this.branchId === item.orgId) {
          if (item.orgLevelId === '1' || item.orgLevelId === '2') { // 管理机构
            this.branchId = ''
          } else if (item.orgLevelId === '3' && item.orgTypeId === '5') { // 营业兼管理
            this.branchId = base.getStore({ key: 'orgId' })
            this.query()
          } else if (item.orgLevelId === '3' && item.orgTypeId === '1') { // 营业机构
            this.branchId = base.getStore({ key: 'orgId' })
            this.query()
          } else if (item.orgTypeId === '4') {
            this.branchId = base.getStore({ key: 'orgId' })
            this.query()
          }
        }
      })
    }
  },
  watch: {
    quarterYear: function (val) {
      this.visibleSelect()
      this.params.year = this.quarterYear
    },
    quarterMonth: function (val) {
      this.params.quarter = this.quarterMonth
    },
    'params.reportType': function (val) {
      this.isDay = false
      this.isMonth = false
      this.isQuarter = false
      this.isYear = false
      this.params.day = ''
      this.params.quarter = ''

      this.params = { // 查询上送参数
        endDate: '', // 结束日期
        month: '', // 月
        pageNum: 1,
        pageSize: 10,
        quarter: '', // 季
        reportType: val, // 报表类型
        startDate: '', // 开始日期
        year: ''// 年
      }
      switch (val) {
      case 'day':
        this.isDay = true
        // console.log(this.datePicker[0])
        this.params.startDate = this.datePicker[0]
        this.params.endDate = this.datePicker[1]
        break
      case 'month':
        this.isMonth = true

        this.params.month = new Date(this.month).getMonth() + 1
        this.params.year = new Date(this.month).getFullYear()
        break
      case 'quarter':
        this.quarterYear = (new Date().getFullYear()) + ''
        this.visibleSelect() // 季度逻辑赋值
        this.params.year =  new Date(this.quarterYear).getFullYear()
        this.params.quarter = this.quarterMonth
        this.isQuarter = true
        break
      case 'year':
        this.isYear = true
        this.params.year = new Date(new Date().getTime() - 3600 * 1000 * 24 * 365).getFullYear() + ''
        this.year = new Date(new Date().getTime() - 3600 * 1000 * 24 * 365).getFullYear() + ''
        break
      default:
        break
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.satisfactionTeller{
      .el-checkbox{
      margin-right: 1vw !important;
  }
    background-color: transparent;
    height:100%;
  .satisfactionTeller-top{
    height:100px;
    background: #FFFFFF;
    box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
    border-radius: 8px;
    .satisfactionTeller-top-row{
      padding-top:35px;
      .satisfactionTeller-top-row-span{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0;
        padding-top: 0.5vh;
        padding-right: 0.3vw;
      }
     .satisfactionTeller-top-row-select, .satisfactionTeller-top-row-month, .satisfactionTeller-top-row-year{
        width:8vw;
      }
      .satisfactionTeller-top-row-day{
        width: 15vw;
      }
      .satisfactionTeller-top-row-btn-export{
        position: absolute;
        right:1.5rem;
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
     .satisfactionTeller-top-row-btn-query{
        position: absolute;
        right:7rem;
        background: #258AFF;
        border-radius: 2px;
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        display: flex;
        justify-content: center;
      }
    }
  }
  .satisfactionTeller-center{
      margin-top:2vh;
      .satisfactionTeller-center-btn{
        background:#FFF;
        height:10px;
        margin-top:-10px;
        box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
        border-radius: 8px;
      }
    .satisfactionTeller-center-isShow{
      position: relative;
      bottom: 0;
      border:0;
      border-radius: 8px 8px 0px 0px;
      box-shadow: 0 0 10px 0 rgba(173,173,173,0.50);
      background-color: #fff;
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: #4A4A4A;
      padding: 4px 1.8rem;
    }
    .satisfactionTeller-center-border{
      transform: rotate(90deg)
    }
  }
  .satisfactionTeller-bottom{
    margin-top:0.2vh;
    .satisfactionTeller-bottom-number{
    //   margin: 0.3rem;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0;
    }
    .satisfactionTeller-bottom-table{
      margin-top:0.2vh;
      border: 1px solid #DCDBDD;
      box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
      border-radius: 8px;
    }
    .satisfactionTeller-bottom-pagination{
      margin-top:3.3vh;
      margin-left:1rem;
    }
  }
}
</style>
