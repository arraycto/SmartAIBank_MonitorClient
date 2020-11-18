<template>
<div class="survey-style">
    <el-row>
      <el-col :span="24">
        <div class="time-select-style">
          <div class="time-select" v-if="timeShow">
              <time-select class="time-color"></time-select>
          </div>
        </div>
      </el-col>
      </el-row>
      <el-row>
      <el-col :span="24">
        <div>
           <radar-chart v-on:timeShowEvent="timeShowEvent" :chartData="radarChartData" :bankType="bankType"></radar-chart>
        </div>
      </el-col>
    </el-row>
</div>
</template>

<script>
import timeSelect from '@/components/TimeSelect/timeSelect'
import radarChart from '@/syscomponents/smartOperate/Charts/survey/radarCharts'
import base from '@/common/base'
export default {
  name: 'core_survey',
  data: function () {
    return {
      radarChartData: null,
      bankType: 'core',
      timeShow: true
    }
  },
  components: {
    timeSelect, radarChart
  },
  mounted () {
    // this.init()
  },
  activated () {
    this.init()
  },
  methods: {
    timeShowEvent (data) {
      this.timeShow = data
    },
    init () {
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.get('surveySum', params).then((result) => {
        this.radarChartData = result
      })
    }
  },
  watch: {
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': {
      handler (newValue, oldValue) {
        if (base.isActivity(this.$options.name)) this.init()
      }
    },
    '$store.state.orgId': {
      handler (newValue, oldValue) {
        if (base.isActivity(this.$options.name)) this.init()
      }
    },
    '$store.state.operate.dayDateRange': {
      handler (newValue, oldValue) {
        if (base.isActivity(this.$options.name)) this.init()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '@/styles/survey-common.scss'
</style>
