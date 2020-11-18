<template>
<div>
<el-row :gutter="20">
  <el-col :span="15">
    <el-row :gutter="20">
      <el-col :span="8" class="core-home-titil">
        <home-title homeTitle="严重警告" :titleData="importData" index="red"></home-title>
      </el-col>
      <el-col :span="8">
        <home-title homeTitle="普通警告" :titleData="commonData" index="yellow"></home-title>
      </el-col>
      <el-col :span="8">
        <home-title homeTitle="低级警告" :titleData="smallData" index="blue"></home-title>
      </el-col>
    </el-row>
  </el-col>
  <el-col :span="9">
    <home-post :homePostData="homePostData"></home-post>
  </el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12">
    <device-state></device-state>
  </el-col>
  <el-col :span="12">
    <deal-handle></deal-handle>
  </el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12">
    <busy-degree></busy-degree>
  </el-col>
  <el-col :span="12">
    <service-quality></service-quality>
  </el-col>
</el-row>
</div>
</template>
<script>
import homeTitle from '@/syscomponents/smartMonitor/home/homeTitle'
import homePost from '@/syscomponents/smartMonitor/home/homePost'
import deviceState from '@/syscomponents/smartMonitor/home/deviceState'
import dealHandle from '@/syscomponents/smartMonitor/home/dealHandle'
import busyDegree from '@/syscomponents/smartMonitor/home/coreBusyDegree'
import serviceQuality from '@/syscomponents/smartMonitor/home/coreServiceQuality'
import base from '@/common/base'
import homeTitlejson from '@/dummy/smartMonitor/home/homeTitle.json'
import homePostjson from '@/dummy/smartMonitor/home/homePost.json'
import services from '../../../services'

export default {
  name: 'coreHome',
  data () {
    return {
      importData: {},
      commonData: {},
      smallData: {},
      homePostData: []
    }
  },
  components: {
    homeTitle,
    homePost,
    deviceState,
    dealHandle,
    busyDegree,
    serviceQuality
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getTitleInfo()
      this.getPostInfo()
    },
    async getTitleInfo () {
      try {
        var self = this
        // const Condition = {
        //   id: self.codeValue,
        //   name: self.nameValue,
        //   systemId: self.systemValue
        // }
        // const Result = await services.api.base.role.selectByPage(this.currentPage, this.pageSize, roleCondition)
        // const Result = homePostjson
        // self.importData = Result.alarmThree[0] || {}
        // self.commonData = Result.alarmTwo[0] || {}
        // self.smallData = Result.alarmOne[0] || {}
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    async getPostInfo () {
      try {
        var self = this
        // const Condition = {
        //   id: self.codeValue,
        //   name: self.nameValue,
        //   systemId: self.systemValue
        // }
        // const Result = await services.api.base.role.selectByPage(this.currentPage, this.pageSize, roleCondition)
        let Result = homePostjson
        Result = await services.api.monitor.alarmDevice.getSimpleAlarmInfo(base.getStore({ key: 'orgId' }))
        self.homePostData = Result.alarmInfo || []
        self.homePostData.map((item, index) => {
          if (item.warnType == 'device') {
            self.homePostData[index]['name'] = '设备预警'
          } else {
            self.homePostData[index]['name'] = '交易预警'
          }
        })
        self.importData = Result.alarmThree[0] || {}
        self.commonData = Result.alarmTwo[0] || {}
        self.smallData = Result.alarmOne[0] || {}
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    }
  },
  watch: {
    '$store.state.monitor.warnAmount': function (value) {
      this.getPostInfo()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>



