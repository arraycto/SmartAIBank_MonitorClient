<template>
  <div class="top">
    <div class="header-top">
      <el-row style="margin-left:1vw;">
        <el-col :span="5">
          <span class="top-text" style="margin-right:15px;">机构</span>
          <el-select
            v-model="orgId"
            size="mini"
            placeholder="请选择"
            class="top-select top-select-org"
            filterable
          >
            <!-- <el-option
              v-for="item in orglist"
              :key="item.ORGNAME_CN"
              :label="item.ORGID + '-' + item.ORGNAME_CN"
              :value="item.ORGID">
              {{item.ORGID + '-' + item.ORGNAME_CN}}
            </el-option>-->
            <el-option
              v-for="(item, index) in orglist"
              :key="index"
              :label="item.orgId + '-' + item.orgNameCn"
              :value="item.orgId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <span class="top-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报表周期</span>
          <el-select
            v-model="dateId"
            size="mini"
            placeholder="日报表"
            class="top-select"
            @change="selectChange"
          >
            <el-option v-for="item in dateList" :key="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :span="13" :offset="1">
          <el-col class="day" v-show="isDay">
            <span class="top-text">起止时间</span>
            <el-date-picker
              v-model="datePicker"
              type="daterange"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
              range-separator="-"
              @change="changeDayDate"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="top-picker"
              size="mini"
              :picker-options="{disabledDate: time => time.getTime() > Date.now()- 3600 * 1000 * 24 || time.getTime() < Date.now()- 3600 * 1000 * 24 * 90}"
            ></el-date-picker>
          </el-col>
          <!-- 月份控件 -->
          <el-col class="month" v-show="isMonth">
            <span class="demonstration">时间</span>
            <el-date-picker
              v-model="month"
              type="month"
              size="mini"
              class="top-month"
              @change="changeMonthDate"
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
              @change="quarterPicker"
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
              @change="changeSelect"
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
              @change="YearDate"
              class="top-year"
              :picker-options="{disabledDate: time => time.getTime() > Date.now() -3600*1000*24*365}"
              placeholder="选择年份"
            ></el-date-picker>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="el-row2" style="margin-left:1vw;">
        <el-col :span="24">
          <span class="span">设备类型  </span>
          <el-checkbox-group v-model="checkAll" size="mini" class="equipTypelist">
            <el-checkbox label="全部" @change="handleCheckAllChange" border></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="checkedCities" size="mini" class="equipTypelist">
            <el-checkbox
              v-for="item in equipTypelist"
              :label="item.devClassKey"
              :key="item.devClassKey"
              @change="handleCheckedCitiesChange"
              border
            >{{item.devClassName}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <!-- <div style="padding:0.5vw 0;"></div> -->
      <el-row style="margin-left:1vw;">
        <el-col :span="20">
          <span class="span">设备厂商</span>
          <el-checkbox-group v-model="allEquips" size="mini" class="equipTypelist">
            <el-checkbox label="全部" @change="DevModelAllChange" border></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="modelCities" size="mini" class="equipTypelist">
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
          <el-button type="primary" size="small" @click="checkNull">查询</el-button>
          <tableReport
            :tableParams="obj.historyReportParams"
            :branchId="obj.branchId"
            :buttonId="'deviceOperation'"
          ></tableReport>
        </el-col>
      </el-row>
    </div>
    <div class="Echarts" style="width:100%;position:relative">
      <el-row>
        <el-col :span="24">
          <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tabs">
            <el-tab-pane label="机具故障率" name="first"></el-tab-pane>
            <el-tab-pane label="网络故障率" name="second"></el-tab-pane>
            <el-tab-pane label="机具开机率" name="third"></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import services from '../../../../services'
import tableReport from '@/syscomponents/smartMonitor/history/StatisticalReports/tableReport'
import base from '@/common/base'
export default {
  data: function () {
    return {
      dateList: ['日报表', '月报表', '季报表', '年报表'], // 报表周期数据容器
      quarterList: [
        {
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
      quarterMonth: '2', // 季度月份
      quarterYear: '', // 季度年份
      dateId: '日报表',
      orgId: base.getStore({ key: 'orgId' }),
      isManager: '',
      orglist: [], // 机构备选数据容器
      equipTypelist: [], // 设备类型备选数据
      equipTypelistCopy: [], // copy
      checkedCities: [], // 设备类型选中数据
      devClassKey: [],
      checkAll: true, // 设备类型全选值
      checkAllEquips: ['全选'],
      DevModel: true, // 厂商全选值
      getDevModel: [], // 设备厂商备选数据
      getDevModelCopy: [], // 厂商copy
      modelCities: [], // 设备厂商选中数据
      allEquips: ['全部'],
      isDay: true,
      isMonth: false,
      isQuarter: false,
      isYear: false,
      datePicker: [], // 起止日期
      year: '', // 默认年份
      month: new Date(new Date().getTime() - 3600 * 1000 * 24 * 30), // 默认月份
      isEcharts: {
        name: '收起',
        isable: true
      },
      activeName: 'first'
    }
  },
  components: {
    tableReport
  },
  props: {
    obj: {
      type: Object
    }
  },
  created: function () {
    this.orgIdChange()
  },
  mounted () {
    this.getdatatime()
    this.getYear()
    this.getmonth()
    this.view()
    this.query('selectInit')
  },
  methods: {
    getYear () { // 年报表 默认年份
      const date = new Date()
      this.year = (date.getFullYear() - 1).toString()
      this.obj.historyReportParams.year = this.year
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
    checkNull () {
      if (this.modelCities.length == 0 || this.checkedCities.length == 0) {  // 非空判断
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
      if (this.isMonth === true && this.obj.historyReportParams.month === null) {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      if (this.isQuarter === true && this.obj.historyReportParams.quarterYear === null) {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      if (this.isYear === true && this.obj.historyReportParams.year === '') {
        this.$message({
          message: '请选择查询条件。'
        })
        return
      }
      this.query()
    },
    query: async function (type) { // 设备运行交易查询
      if (this.orgId !== '' && this.orgId !== '全部') {
        this.obj.branchId = this.orgId
      } else {
        this.obj.branchId = base.getStore({ 'key': 'orgId' })
      }
      try {
        const self = this
        self.obj.historyReportParams.pageNum = 1
        if (this.isQuarter === false) {
          const result = await services.api.monitor.historyReport.getHistroyReportInfo(self.obj.branchId, self.obj.historyReportParams)

          if (result.total === 0 || result.total === undefined) {
            if (type === undefined) {
              this.$message({
                message: '暂无数据。'
              })
            }
          }
          self.$emit('queryCharts')
          self.$emit('tableList', result)
        } else {
          if (this.obj.historyReportParams.quarter === '') {
            this.$message({
              message: '请输入查询条件'
            })
          } else {
            const result = await services.api.monitor.historyReport.getHistroyReportInfo(self.obj.branchId, self.obj.historyReportParams)
            if (result.total === 0 || result.total === undefined) {
              this.$message({
                message: '暂无数据。'
              })
              self.$emit('queryCharts')
              self.$emit('tableList', result)
            } else {
              self.$emit('queryCharts')
              self.$emit('tableList', result)
            }
          }
        }
      } catch (error) {
        this.$message({
          message: error.message
        })
      }
    },
    handleClick (tab, event) { // tabs 切换
      if (tab.label === '网络故障率') {
        this.obj.historyReportParams.dataType = 'NETWORK'
      } else if (tab.label === '机具故障率') {
        this.obj.historyReportParams.dataType = 'TOOL'
      } else {
        this.obj.historyReportParams.dataType = 'NORMAL'
      }
      this.$emit('tabsChange')
      this.query()
    },
    DevModelAllChange () { // 设备厂商全选按钮逻辑
      this.DevModel = !this.DevModel
      this.obj.historyReportParams.manufId = []
      if (this.DevModel == true) {
        this.modelCities = this.getDevModelCopy.map(_ => _.manufacturerId)
        this.obj.historyReportParams.manufId = this.modelCities
      } else {
        this.modelCities = []
      }
    },
    manufIdChange () { // 设备厂商选中值
      this.obj.historyReportParams.manufId = this.modelCities
      if (this.modelCities.length === this.getDevModelCopy.length) {
        this.obj.historyReportParams.manufId = this.modelCities
        this.allEquips.push('全部')
        this.DevModel = true
      } else {
        this.allEquips = []
        this.DevModel = false
      }
    },
    handleCheckedCitiesChange () {  // 设备类型选中值
      this.obj.historyReportParams.devClassKey = this.checkedCities
      if (this.checkedCities.length === this.equipTypelistCopy.length) {
        this.obj.historyReportParams.devClassKey = this.checkedCities
        this.checkAllEquips.push('全部')
        this.checkAll = true
      } else {
        this.checkAllEquips = []
        this.checkAll = false
      }
    },
    handleCheckAllChange () { // 设备类型全选按钮
      this.checkAll = !this.checkAll
      this.obj.historyReportParams.devClassKey = []
      if (this.checkAll == true) {
        this.checkedCities = []
        this.checkAll = false
      } else {
        this.checkedCities = this.equipTypelistCopy.map(_ => _.devClassKey)
        this.obj.historyReportParams.devClassKey = this.checkedCities
        this.checkAll = true
      }
    },
    // 查询下拉列表备选数据
    async view () {
      try {
        var self = this
        const BranchList = base.getStore({ key: 'monitorBranchList' })
        self.orglist = JSON.parse(BranchList)
        // self.orglist = self.unique(orglist)
        self.equipTypelist = await await services.api.monitor.monitorCondition.getDevType()
        self.equipTypelistCopy = self.equipTypelist.map(_ => ({ ..._ }))
        self.getDevModel = await await services.api.monitor.monitorCondition.getDevModel()
        self.getDevModelCopy = self.getDevModel.map(_ => ({ ..._ }))

        //  默认选中
        self.checkedCities = self.equipTypelistCopy.map(_ => _.devClassKey)
        self.modelCities = self.getDevModelCopy.map(_ => _.manufacturerId)
        self.obj.historyReportParams.manufId = self.modelCities
        self.obj.historyReportParams.devClassKey = self.checkedCities
      } catch (err) {
        if (err.message) {
          self.$message.error(err.message)
        } else {
          self.$message.error('未知异常')
        }
      }
    },
    unique (arr) { // 机构去重
      var result = []
      var obj = {}
      for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i].ORGNAME_CN]) {
          result.push(arr[i])
          obj[arr[i].ORGNAME_CN] = true
        }
      }
      return result
    },
    YearDate () { // 年报表控件赋值
      this.obj.historyReportParams.year = this.year
    },
    changeSelect () { // 季度报表控件
      this.obj.historyReportParams.quarter = this.quarterMonth
    },
    changeMonthDate () { // 月报表控件赋值
      const date = new Date(this.month)
      this.obj.historyReportParams.year = date.getFullYear()
      this.obj.historyReportParams.month = date.getMonth() + 1
    },
    changeDayDate: function () { // 开始结束时间赋值
      if (this.datePicker !== null) {
        this.obj.historyReportParams.startDate = this.datePicker[0]
        this.obj.historyReportParams.endDate = this.datePicker[1]
      } else {
        this.obj.historyReportParams.startDate = ''
        this.obj.historyReportParams.endDate = ''
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
      this.obj.historyReportParams.startDate = this.datePicker[0]
      this.obj.historyReportParams.endDate = this.datePicker[1]
    },
    selectChange (val) { // 日历切换
      this.isabled()
      if (val === '月报表') {
        this.isMonth = true
        this.clear()
        this.changeMonthDate()
        this.obj.historyReportParams.reportType = 'month'
      } else if (val === '季报表') {
        this.isQuarter = true
        this.clear()
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        if (month === 1 || month === 2 || month === 3) { // 如果为第一季度年份-1
          this.quarterYear = year - 1
        } else {
          this.quarterYear = year.toString()
        }
        this.obj.historyReportParams.year = this.quarterYear
        this.obj.historyReportParams.reportType = 'quarter'
      } else if (val === '年报表') {
        this.isYear = true
        this.clear()
        var date = new Date()
        this.obj.historyReportParams.year = this.year
        this.obj.historyReportParams.reportType = 'year'
      } else {
        this.isDay =  true
        this.clear()
        this.obj.historyReportParams.reportType = 'day'
        this.obj.historyReportParams.startDate = this.datePicker[0]
        this.obj.historyReportParams.endDate = this.datePicker[1]
      }
    },
    clear () { // 清空默认时间
      this.obj.historyReportParams.startDate = ''
      this.obj.historyReportParams.endDate = ''
    },
    isabled: function () { // 切换状态
      this.isDay =  false
      this.isMonth = false
      this.isQuarter = false
      this.isYear = false
    },
    quarterPicker: function (val) { // 季度年份
      this.quarterYear = val
      this.obj.historyReportParams.year = val
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
    orgIdChange () {  // 判断是否为营业机构
      const self = this
      self.view()
      const orglist = self.orglist
      for (var i = 0; i < orglist.length; i++) {
        if (orglist[i].ORGID === self.orgId) {
          if (orglist[i].ORGTYPEID === '1') {
            self.obj.historyReportParams.isManager = true
          } else {
            self.obj.historyReportParams.isManager = false
          }
        }
      }
    }
  },
  watch: {
    'orgId': function (val) {
      this.obj.branchId = val
      this.obj.historyReportParams.branchId = val
      this.orgIdChange()
      this.orglist.map((item, index) => {
        if (val === item.orgId) {
          if (item.orgTypeId === '5' || item.orgLevelId === '3') {
            this.orgIds = item.orgId + '-' + item.orgNameCn
          } else {
            this.obj.historyReportParams.isManager = true
          }
        }
      })
    },
    branchId: function () {
      this.checkAuth()
    },
    quarterYear: function (val) {
      this.visibleSelect()
      this.obj.historyReportParams.year = this.quarterYear
    },
    quarterMonth: function (val) {
      this.obj.historyReportParams.quarter = this.quarterMonth
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.top {
  width: 100%;
  margin: 0 0 0.5rem 0;
  .el-checkbox {
    margin-right: 1vw !important;
  }
  .header-top {
    font-size: 14px;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    background: #ffffff;
    border-radius: 8px;
    padding: 0 0 1rem 0vw;
    .el-row2 {
      margin: 0 0 15px 0;
    }
  }
  .Echarts {
    margin-top: 1rem;
  }
  .el-tabs__nav-wrap::after {
    background-color: 0;
  }
  .el-tabs {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #333333;
  }
  .span {
    display: block;
    float: left;
    color: #4a4a4a;
    font-family: PingFangSC-Regular;
    margin: 0.2vw 0.4vw 0 0vw;
  }
  .equipTypelist {
    float: left;
    .el-button--mini,
    .el-button--small {
      font-size: 14px;
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
  padding: 1.4vw 0 0 0;
}
.month {
  .top-month {
    width: 8vw;
  }
}
.year {
  .top-year {
    width: 8vw;
  }
}
.quarter {
  .top-quarter-year,
  .quarter-select {
    width: 130px;
  }
}
.top-select {
  margin-left: 0.5rem;
  width: 8vw;
}
.top-btn {
  float: right;
}
.derive-btn {
  background-color: #f5a623;
  color: #fff;
  height: 32px;
  border-radius: 0.2rem;
}
.checkAll{
  height: 30px;
  line-height: 10px;
  float: left;
  font-family: PingFangSC-Regular;
}
@media screen and (max-width: 1366px) {
  .top-select-org {
    width: 140px;
  }
}
@media screen and (min-width: 1367px) and (max-width: 1920px){
  .top-select-org {
    width: 140px;
  }
}
</style>
