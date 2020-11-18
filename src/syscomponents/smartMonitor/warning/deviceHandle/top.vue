<template>
  <div class="top">
    <el-row :gutter="15">
      <el-col :span="6">
        <span class="top-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机构</span>
        <el-select v-model="branchNo" size="mini" placeholder="请选择" class="top-select" filterable>
          <el-option key="all" label="全部" value="all"></el-option>
          <el-option
            v-for="item in orglist"
            :key="item.branchNo"
            :label="item.branchNo+'-'+item.branchName"
            :value="item.branchNo"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class="top-text">设备类型</span>
        <el-select v-model="devType" size="mini" placeholder="请选择" class="top-select" filterable>
          <el-option key="all" label="全部" value="all"></el-option>
          <el-option
            v-for="item in equipTypelist"
            :key="item.devClassKey"
            :label="item.devClassName"
            :value="item.devClassKey"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class="top-text">设备编号</span>
        <el-input v-model="obj.alarmParams.devId" size="mini" placeholder="请输入" class="top-select"></el-input>
      </el-col>
      <el-col :span="5" class="top-btn">
        <el-button type="primary" size="mini" @click="query">查询</el-button>
        <el-button size="mini" @click="reset">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import base from '@/common/base'
import services from '../../../../services'
export default {
  data: function () {
    return {
      orglist: [], // 机构备选数据容器
      equipTypelist: [], // 设备类型备选数据容器
      kong: '',
      devType: '',
      branchNo: ''
    }
  },
  mounted () {
    this.view()
  },
  props: {
    obj: {
      type: Object
    }
  },
  methods: {
    // 查询下拉列表备选数据
    async view () {
      try {
        this.equipTypelist = await await services.api.monitor.monitorCondition.getDevType()
        this.orglist = await await services.api.monitor.monitorCondition.getOrgInfo(base.getStore({ key: 'orgId' }))
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
      this.branchNo = ''
      this.obj.branchNo = ''
      this.obj.alarmParams.branchNo = ''
      this.devType = ''
      this.obj.alarmParams.devType = ''
      this.obj.alarmParams.devId = ''
    },
    // 查询结果
    query: async function () {
      try {
        // if (this.obj.alarmParams.branchNo === null || this.obj.alarmParams.branchNo === '') {
        //   this.obj.branchNo = base.getStore({ key: 'orgId' })
        // } else {
        //   this.obj.branchNo = this.obj.alarmParams.branchNo
        // }
        // console.log(this.obj.queryType)

        if (this.obj.queryType === 'sum') {
          this.obj.branchNo = this.branchNo
          if (this.branchNo === '') {
            this.obj.branchNo = base.getStore({ key: 'orgId' })
          }
          if (this.branchNo === 'all') {
            this.obj.branchNo = base.getStore({ key: 'orgId' })
          }
        } else {
          if (this.branchNo === '') {
            this.branchNo = base.getStore({ key: 'orgId' })
            this.obj.alarmParams.branchNo =  ''
          } else if (this.branchNo === 'all') {
            // this.branchNo = base.getStore({ key: 'orgId' })
            this.obj.alarmParams.branchNo = base.getStore({ key: 'orgId' })
          } else if (this.branchNo === '08001') {
            this.branchNo = base.getStore({ key: 'orgId' })
            this.obj.alarmParams.branchNo =  ''
          } else {
            this.obj.branchNo =  this.branchNo
            this.obj.alarmParams.branchNo =  this.branchNo
          }
        }



        if (this.devType === 'all') {
          this.obj.alarmParams.devType = ''
        } else {
          this.obj.alarmParams.devType = this.devType
        }
        // historyTransParams = {
        //   pageNum=1,
        //   pageSize=10 ,
        //   devClassKey= '',
        //   devId='' ,
        //   startDate= '',
        //   endDate= ''
        // }
        // console.log(JSON.stringify(this.obj))
        this.obj.alarmParams.pageNum = 1
        const result = await services.api.monitor.alarmDevice.getAlarmInfo(this.obj.alarmParams, this.obj.branchNo, this.obj.queryType)
        this.$emit('tableList', result)
        if (result.total === 0 || result.total === undefined) {
          this.$message({
            message: '查询无记录，请更改筛选条件。'
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
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@media screen and (min-width: 1367px) and (max-width: 1920px) {
  .top {
    background: #ffffff;
    border-radius: 0.5rem;
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
    margin-right: 2.5vw;
    text-align: right;
  }
}
@media screen and (max-width: 1366px) {
  .top {
    background: #ffffff;
    border-radius: 0.5rem;
  }
  .top-text {
    display: inline-block;
    font-size: 14px;
    line-height: 4rem;
  }
  .top-select {
    margin-left: 0.5rem;
    width: 150px;
  }
  .top-btn {
    float: right;
    line-height: 4rem;
    margin-right: 2.5vw;
    text-align: right;
  }
}
</style>
