<template>
    <div class="serviceQuality-core-content">
      <el-row :gutter="15">
        <el-col :span="17">
          <coreQualityLeft ref="QualityLeft"></coreQualityLeft>
        </el-col>
        <el-col :span="7">
            <coreQualityRight ref="QualityRight"></coreQualityRight>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import coreQualityLeft from '@/syscomponents/smartMonitor/monitor/serviceQuality/coreQualityLeft'
import coreQualityRight from '@/syscomponents/smartMonitor/monitor/serviceQuality/coreQualityRight'
export default {
  name: 'coreserviceQuality',
  components: { coreQualityLeft, coreQualityRight },
  data () {
    return {

    }
  },
  mounted () {},
  methods: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>



