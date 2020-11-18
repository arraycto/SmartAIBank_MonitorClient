<template>
  <div class="top">
    <el-row :gutter="10">
      <el-col :span="5">
        <span class="top-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机构</span>
        <el-select
          v-model="orgId"
          size="mini"
          placeholder="请选择"
          class="top-select"
          @change="branchNoChange"
          filterable
        >
          <el-option value="全部"></el-option>
          <el-option
            v-for="item in orglist"
            :key="item.orgId"
            :label="item.orgId+` - `+item.orgNameCn"
            :value="item.orgId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span class="top-text">设备类型</span>
        <el-select
          v-model="devType"
          size="mini"
          placeholder="请选择"
          class="top-select"
          @change="devTypeChange"
          filterable
        >
          <el-option value="全部"></el-option>
          <el-option
            v-for="item in equipTypelist"
            :key="item.devClassKey"
            :label="item.devClassName"
            :value="item.devClassKey"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span class="top-text">设备编号</span>
        <el-input v-model="obj.alarmParams.devId" size="mini" class="top-select" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5">
        <span class="top-text">交易流水号</span>
        <el-input v-model="obj.alarmParams.seqId" size="mini" class="top-select" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="4" class="top-btn">
        <el-button type="primary" size="mini" @click="query">查询</el-button>
        <el-button size="mini" @click="reset">重置</el-button>
      </el-col>
    </el-row>
  </div>

</template>
<script>
import services from '../../../../services'
// import websocketClient from '@/common/websocketClient'
import base from '@/common/base'
export default {
  data: function () {
    return {
      orgId: '', // 机构号
      devType: '', // 设备类型
      orglist: [], // 机构备选数据容器
      equipTypelist: [] // 设备类型备选数据容器
    }
  },
  mounted () {
    this.view()
    this.query()
  },
  props: {
    obj: {
      type: Object
    }
  },
  methods: {
    devTypeChange () {
      if (this.devType === '全部') {
        this.obj.alarmParams.devType = ''
      } else {
        this.obj.alarmParams.devType = this.devType
      }
    },
    branchNoChange () { // 机构选中值是否为管理机构
      if (this.orgId === '全部') {
        this.obj.alarmParams.branchNo = ''
        this.obj.alarmParams.isManager = true
      } else {
        this.obj.alarmParams.branchNo = this.orgId
      }
      this.orgIdChange(this.obj.alarmParams.branchNo)
    },
    orgIdChange (branchNo) {  // 判断是否为管理机构
      const self = this
      const orglist = self.orglist
      for (var i = 0; i < orglist.length; i++) {
        if (orglist[i].orgId === branchNo) {
          if (orglist[i].orgTypeId === '3' || orglist[i].orgTypeId === '5') {
            self.obj.alarmParams.isManager = true
          } else {
            self.obj.alarmParams.isManager = false
          }
        }
      }
    },
    orglist1: async function () { // 机构备选数据
      try {
        const orglist = base.getStore({ key: 'monitorBranchList' })
        this.orglist = JSON.parse(orglist)
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    // 查询下拉列表备选数据
    async view () {
      try {
        this.equipTypelist = await services.api.monitor.monitorCondition.getDevType()
        this.orglist1()
        this.orgIdChange(this.obj.branchNo)
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    // 重置下拉列表及选中值
    reset () {
      this.orgId = ''
      this.devType = ''
      this.obj.alarmParams.devType = ''
      this.obj.alarmParams.devId = ''
      this.obj.alarmParams.seqId = ''
    },
    // 查询结果
    query: async function () {
      try {
        if (this.obj.alarmParams.branchNo === null || this.obj.alarmParams.branchNo === '') {
          this.obj.branchNo = base.getStore({ key: 'orgId' })
        } else {
          this.obj.branchNo = this.obj.alarmParams.branchNo
        }
        this.obj.alarmParams.pageNum = 1
        const result = await services.api.monitor.alarmTrans.getAlarmTranInfo(this.obj.alarmParams, this.obj.branchNo)
        this.$emit('tableList', result)
        if (result.total === 0 || result.total === undefined) {
          this.$message({
            message: '查询无记录，请更改筛选条件。',
            type: 'info',
            iconClass: ''
          })
        }
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    }
  }
  // websocket () {
  //   websocketClient.subscribeToRoom('alamTran',  window.DCSpace.sysConfig.socketUrl.alamTran, function (msg) { // 订阅
  //     this.query()
  //   })
  // }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@media screen and (min-width: 1367px) and (max-width: 1920px) {
  .top {
    background: #ffffff;
    border-radius: 0.5rem;
    padding: 18px 0;
  }
  .top-text {
    display: inline-block;
    font-size: 14px;
    line-height: 4rem;
  }
  .top-select {
    margin-left: 0.5rem;
    width: 10.4vw;
  }
  .top-btn {
    float: right;
    line-height: 4rem;
  }
}
@media screen and (max-width: 1366px) {
  .top {
    background: #ffffff;
    border-radius: 0.5rem;
    padding: 18px 0;
  }
  .top-text {
    display: inline-block;
    font-size: 14px;
    line-height: 4rem;
  }
  .top-select {
    margin-left: 0.5rem;
    width: 130px;
  }
  .top-btn {
    float: right;
    line-height: 4rem;
  }
}
</style>

