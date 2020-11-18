<template>
<div class="time-select-main">
  <div class="time-select-content">
    <div class="time-select-label" :class="{active:activeRange=='day'}" @click="changeRange('day')">{{dayValue}}</div>
    <div class="time-select-label" :class="{active:activeRange=='month'}" @click="changeRange('month')">{{monthValue}}</div>
    <div class="time-select-label" :class="{active:activeRange=='quarter'}" @click="changeRange('quarter')">{{quarterValue}}</div>
    <div class="time-select-label" :class="{active:activeRange=='year'}" @click="changeRange('year')">{{yearValue}}</div>
  </div>
  <div v-show="dateType==='day'" :class="dateControllerFlag?'':'day-type-hidden-class'" style="display:inline-block;float: right;margin-left:1rem">
      <el-date-picker
        v-show="dateControllerFlag"
        v-model="dayDateRange"
        size="mini"
        type="daterange"
        value-format="yyyyMMdd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :clearable="false"
        :editable="false"
        :picker-options="{disabledDate: time => time.getTime() >= Date.now()-24*60*60*1000 || time.getTime() <= Date.now()-31*24*60*60*1000}"
        change="changeRangeDate" />
      <i v-show="!dateControllerFlag" class="el-icon-date" style="margin-left:1rem" @click="showDateController()" />
      <i v-show="dateControllerFlag" class="el-icon-close" style="margin-left:1rem" @click="hiddenDateController()" />
  </div>
  <transition  name="bounce"><div v-if="showSelectPanel" class="time-select-arrayMain">
    <transition-group name="list" tag="div">
    <div  class="time-select-arrayItem" v-for="item in selectArray" :key="item.key">
      {{item.name}}
    </div>
    </transition-group>
  </div>
  </transition>
</div>
</template>

<script>
export default {
  name: 'timeSelect',
  data () {
    return {
      selectArray: [],
      currentDate: new Date(),
      activeRange: this.$store.state.operate.timeRange,
      showSelectPanel: false,
      dayValue: '日',
      monthValue: (new Date()).getMonth() === 0 ? '12月' : (new Date()).getMonth() + '月',
      quarterValue: '季',
      yearValue: '年',
      dateControllerFlag: false,
      dateType: 'day',
      // 选择的日期范围
      dayDateRange: []
    }
  },
  mounted () {
    const rangeDate = this.$store.state.operate.rangeArray
    var preDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    var tempMonth = preDay.getMonth() + 1
    var preMonth = tempMonth < 10 ? '0' + tempMonth : '' + tempMonth
    var day = preDay.getDate() < 10 ? '0' + preDay.getDate() : preDay.getDate()
    const date = preDay.getFullYear() + '' + preMonth + '' + day

    var preDay1 = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    var tempMonth1 = preDay1.getMonth() + 1
    var preMonth1 = tempMonth1 < 10 ? '0' + tempMonth1 : '' + tempMonth1
    var day1 = preDay1.getDate() < 10 ? '0' + preDay1.getDate() : preDay1.getDate()
    const date1 = preDay1.getFullYear() + '' + preMonth1 + '' + day1

    this.dayDateRange = rangeDate && rangeDate.length > 0 ? rangeDate : [date1, date]
    this.changeRange(this.$store.state.operate.timeRange)
  },
  methods: {
    changeRangeDate () {
      this.changeRange(this.dateType)
    },
    showDateController () {
      this.dateControllerFlag = true
    },
    hiddenDateController () {
      this.dateControllerFlag = false
    },
    changeRange (type) {
      this.dateType = type
      var now = new Date()
      var date = null
      // 计算前一个月
      var currMonth = now.getMonth()
      var month = currMonth < 10 ? '0' + currMonth : '' + currMonth

      // 计算前一天
      var preDay = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      var tempMonth = preDay.getMonth() + 1
      var preMonth = tempMonth < 10 ? '0' + tempMonth : '' + tempMonth
      var day = preDay.getDate() < 10 ? '0' + preDay.getDate() : preDay.getDate()
      const rangeDate = this.dayDateRange
      this.activeRange = type
      if (type === 'day') {
        date = preDay.getFullYear() + '' + preMonth + '' + day
        var tempValue = rangeDate && rangeDate.length > 0 ? rangeDate[1].substring(6, 8) : day
        if (tempValue.charAt(0) === '0') {
          tempValue = tempValue.charAt(1)
        }
        this.dayValue = tempValue + '日'
        this.initDateValue(tempValue + '日', '月', '季', '年')
      } else if (type === 'year') {
        date = (now.getFullYear() - 1) + ''
        this.initDateValue('日', '月', '季', date)
      } else if (type === 'quarter') {
        switch (month) {
        case '00':
        case '01':
        case '02':
          date = (now.getFullYear() - 1) + '10'
          this.initDateValue('日', '月', '四季度', '年')
          break
        case '03':
        case '04':
        case '05':
          date = now.getFullYear() + '01'
          this.initDateValue('日', '月', '一季度', '年')
          break
        case '06':
        case '07':
        case '08':
          date = now.getFullYear() + '04'
          this.initDateValue('日', '月', '二季度', '年')
          break
        case '09':
        case '10':
        case '11':
          date = now.getFullYear() + '07'
          this.initDateValue('日', '月', '三季度', '年')
          break
        }
      } else { // 其他默认为“月”
        if (month === '00') { // 如果为“1月”
          date = (now.getFullYear() - 1) + '12'
          this.initDateValue('日', '12月', '季', '年')
        } else {
          date = now.getFullYear() + '' + month
          this.initDateValue('日', (new Date()).getMonth() + '月', '季', '年')
        }
      }
      this.$store.commit('operate/changeTimeRange', { type: type, date: date, dayDateRange: this.dayDateRange[0] + '-' + this.dayDateRange[1], rangeArray: this.dayDateRange })
    },
    initDateValue (day, month, quarter, year) {
      this.dayValue = day
      this.monthValue = month
      this.quarterValue = quarter
      this.yearValue = year
    }
  },
  watch: {
    '$store.state.operate.timeRange': function (newValue, oldValue) {
      this.activeRange = newValue
      this.dateType = newValue
    },
    '$store.state.operate.rangeArray': function (newValue, oldValue) {
      this.dayDateRange = newValue
    },
    '$route.path': function () {
      this.changeRange(this.$store.state.operate.timeRange)
    },
    dayDateRange () {
      this.changeRange(this.dateType)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';
.time-select-main{
    width: auto;
    display: inline-block;
}
.time-select-content{
    height:1.6rem;
    background: #e4e4e4;
    border-radius: 15px;
    display:inline-block;
}
.time-select-label{
    float: left;
    text-align: center;
    width: 4rem;
    height: 1.6rem;
    line-height: 1.6rem;
    cursor: pointer;
}
.time-select-label.active{
    background: $menuBg;
    border-radius: 15px;
    color: $menuText;
}
.day-type-hidden-class{
  margin-top:0.25rem;
}
</style>
