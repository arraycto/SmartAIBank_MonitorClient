<template>
<div>
  <div class="top-laber">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="top-laber-icon">
          <svg class="icon" aria-hidden="true">
                <use xlink:href="#dcfs-yewuleixing"></use>
          </svg>
          <span class="top-laber-name">业务类型</span>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="device-state">
      <div class="top-style">
      <el-row>
        <el-col :span="24">
          <privateBusiness></privateBusiness>
        </el-col>
      </el-row>
      <el-row class="public-business-type">
        <el-col :span="24">
          <publicBusiness></publicBusiness>
        </el-col>
      </el-row>
</div>

  </div>
</div>
</template>
<script>
import privateBusiness from '@/syscomponents/smartMonitor/monitor/busyDegree/privateBusiness'
import publicBusiness from '@/syscomponents/smartMonitor/monitor/busyDegree/publicBusiness'
export default {
  name: 'entityBusyBusinessType',
  data () {
    return {

    }
  },
  components: { privateBusiness, publicBusiness
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
  .top-laber-name{
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #333333;
    letter-spacing: 0;
    margin-left:10px;
    position: relative;
    top: -4px;
  }
  .top-laber-icon{
    font-size: 30px;
    }
.device-state{
  margin-top: 3px;
}
.public-business-type{
  margin-top:16px;
}
</style>



