<template>
  <div class="top">
    <el-row :gutter="10">
      <el-col :span="4.5">
        <span class="top-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机构</span>
        <el-select v-model="orgId" size="mini" placeholder="请选择" class="top-select" filterable>
          <el-option value="全部"></el-option>
          <el-option
            v-for="item in orglist"
            :key="item.branchNo"
            :label="item.branchNo+` - `+item.branchName"
            :value="item.branchNo"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4.5">
        <span class="top-text">设备类型</span>
        <el-select
          v-model="devType"
          size="mini"
          placeholder="请选择"
          class="top-select"
          @change="devTypeChange"
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
      <el-col :span="4.5">
        <span class="top-text">设备编号</span>
        <el-input
          v-model="obj.historyTransParams.deviceId"
          size="mini"
          class="top-select"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="6.5">
        <span class="top-text">时间</span>
        <el-date-picker
          v-model="datePicker"
          :clearable="false"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="——"
          @change="getDate"
          :editable="false"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="top-picker"
          size="mini"
          :picker-options="{disabledDate: time => time.getTime() > Date.now() - 3600 * 1000 || time.getTime() < Date.now()- 3600 * 1000 * 24 * 30}"
        ></el-date-picker>
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
import base from '@/common/base'
export default {
  data: function () {
    return {
      orglist: [], // 机构备选数据容器
      orgId: '',
      devType: '', // 设备类型
      equipTypelist: [], // 设备类型备选数据容器
      defaultDate: new Date(new Date().getTime() - 3600 * 1000 * 24),
      datePicker: []
    }
  },
  props: {
    obj: {
      type: Object
    }
  },
  created () {
  },
  mounted () {
    this.getdatatime()
    this.view()
  },
  methods: {
    devTypeChange () {
      if (this.obj.historyTransParams.devClassKey === '全部' || this.devType === '全部') {
        this.devType = '全部'
        this.obj.historyTransParams.devClassKey = ''
      } else {
        this.obj.historyTransParams.devClassKey = this.devType
      }
    },
    getDate () { // 获取选中时间
      this.obj.historyTransParams.startDate = this.datePicker[0]
      this.obj.historyTransParams.endDate = this.datePicker[1]
      // console.log('获取选中时间' + this.datePicker)
    },
    getdatatime () { // 默认开始结束日期
      const nowDate = new Date()
      const year = nowDate.getFullYear()
      var month = nowDate.getMonth() + 1
      var day = nowDate.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      const date = year + '-' + month + '-' + day
      // 空数组赋值2次
      this.datePicker.push(date)
      this.$set(this.datePicker, 1, date)
      this.$emit('dateList', this.datePicker)
      this.obj.historyTransParams.startDate = this.datePicker[0]
      this.obj.historyTransParams.endDate = this.datePicker[1]
      // console.log('默认日期' +  this.datePicker)
    },
    // 查询下拉列表备选数据
    async view () {
      try {
        this.equipTypelist = await services.api.monitor.monitorCondition.getDevType()
        this.orglist = await services.api.monitor.monitorCondition.getOrgInfo(base.getStore({ 'key': 'orgId' }))
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
      this.obj.historyTransParams.devClassKey = ''
      this.obj.historyTransParams.deviceId = ''
      this.obj.historyTransParams.seqId = ''
      this.datePicker = []
    },
    // 历史交易查询
    query: async function () {
      if (this.orgId === '全部' || this.orgId === '') {
        this.obj.branchId = base.getStore({ 'key': 'orgId' })
      } else {
        this.obj.branchId = this.orgId
      }
      if (this.datePicker.length > 0) {
        try {
          this.obj.historyTransParams.pageNum = 1
          const result = await services.api.monitor.historyTrans.getAlarmInfo(this.obj.branchId, this.obj.historyTransParams)
          result.list.map((item, index) => {  // 对预警时间进行处理
            const date = item.tranDate.substring(0, 10)
            const time = item.tranDate.slice(10)
            result.list[index]['date'] = date
            result.list[index]['time'] = time
          })
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
      } else {
        this.$message({
          message: '请输入开始时间和结束时间。'
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@media screen and (min-width: 1367px) and (max-width: 1920px) {
  .top {
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
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
  .top-picker {
    margin-left: 0.5rem;
  }
  .top-btn {
    float: right;
    line-height: 4rem;
  }
}
@media screen and (max-width: 1366px) {
  .top {
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
    padding: 18px 0;
  }
  .top-text {
    display: inline-block;
    font-size: 14px;
    line-height: 4rem;
  }
  .top-select {
    margin-left: 0.5rem;
    width: 125px;
  }
  .top-picker {
    margin-left: 0.5rem;
    width: 260px;
  }
  .top-btn {
    float: right;
    line-height: 4rem;
  }
}
</style>
