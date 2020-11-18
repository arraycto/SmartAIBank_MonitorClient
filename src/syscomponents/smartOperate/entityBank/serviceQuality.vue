<template>
  <div class="serviceQuality-style">
    <el-row>
      <el-col :span="24">
        <div class="time-select-style">
          <div class="time-select">
              <time-select></time-select>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="wave-content">
          <wave-chart v-if="serviceQualityData != null && serviceQualityData.evaluteRate!=null" chart-id="waveEvaluationRate" chart-name="评价率" chart-img="EvaluationRate.png" :wave-data="serviceQualityData.evaluteRate"/>
          <occupied v-else explain='暂无评价数据~~'/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="wave-content">
          <wave-chart v-if="serviceQualityData != null && serviceQualityData.praiseRate!=null" chart-id="waveFeedbackRate" chart-name="好评率" chart-img="FeedbackRate.png" :wave-data="serviceQualityData.praiseRate"/>
          <occupied v-else explain='暂无评价数据~~'/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="wave-content">
          <wave-chart v-if="serviceQualityData != null && serviceQualityData.navigateRate!=null" chart-id="waveBadRate" chart-name="差评率" chart-img="BadRate.png" :wave-data="serviceQualityData.navigateRate"/>
          <occupied v-else explain='暂无评价数据~~'/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import timeSelect from '@/components/TimeSelect/timeSelect'
import waveChart from '@/syscomponents/smartOperate/Charts/serviceQuality/waveChart'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'entity_serviceQuality',
  data: function () {
    return {
      serviceQualityData: null
    }
  },
  components: {
    waveChart, timeSelect, occupied
  },
  mounted () {
    this.init()
  },
  activated () {
    this.init()
  },
  methods: {
    init () {
      const me = this
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      me.$http.get('serviceQualityEntity', params).then((result) => {
        me.serviceQualityData = result
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
  @import '@/styles/serviceQuality-common.scss'

</style>
