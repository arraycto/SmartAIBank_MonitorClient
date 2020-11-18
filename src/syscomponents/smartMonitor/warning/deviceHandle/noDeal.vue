<template>
  <div class="noDeal">
    <div class="noDeal-top">
      共{{tableDate.total}}条记录
    </div>
      <el-table
        :data="tableDate.list"
        style="width: 100%,color:'#4A4A4A'"
        size="mini"
        stripe
        fixed
        :header-row-style="{color: '#333333'}"
        class = "noDeal-table"
        :cell-class-name="tableRowClassName"
        @sort-change="getSortChange">
        <el-table-column
          min-width="30">
        </el-table-column>
        <el-table-column
          prop="alarmLevel"
          label="预警级别"
          sortable="custom"
          min-width="100">
          <template slot-scope="scope">
            <el-row :gutter="20">
             <el-col :span="4">
                <circle-panel/>
              </el-col>
              <el-col :span="4">
                <div >{{ scope.row.alarmLevel }}</div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="故障描述"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="modelId"
          label="设备编号"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="modelClassName"
          label="设备类型"
          min-width="95">
        </el-table-column>
        <el-table-column
          prop="branchName"
          label="所属机构"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="fieldName"
          label="所在位置"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="manufName"
          label="设备厂商"
          min-width="95">
        </el-table-column>
        <el-table-column
          prop="id"
          label="预警流水号"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="alarmDate"
          label="预警时间"
          sortable="custom"
          min-width="100">
          <template slot-scope="scope">
            {{scope.row.date}}<br/>{{scope.row.time}}
          </template>
        </el-table-column>
        <el-table-column label="操作"
        min-width="105">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="handleEdit(scope.row.id)" class="nodeal-btn">开始处理</el-button>
        </template>
        </el-table-column>
        <div slot="empty">
          <occupied height='52.4vh' explain='暂无数据'/>
        </div>
      </el-table>
  </div>
</template>
<script>
import circlePanel from './smallCirclePanel'
import services from '../../../../services'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'
export default {
  name: 'warnDeviceHandleNoDeal',
  data: function () {
    return {
      sortArray: {
        name: '',
        sort: 'DESC'
      }
    }
  },
  components: {
    circlePanel, occupied
  },
  props: {
    tableDate: {
      type: Object
    }
  },
  mounted () {
  },
  methods: {
    async getwarn () {
      try {
        const data = await services.api.monitor.alarmDevice.getAlarmDevCount(base.getStore({ key: 'orgId' }))
        this.$store.state.monitor.warnAmount = data
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    // 调整级别不同调整显示颜色
    tableRowClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.alarmLevel === '高' && columnIndex === 1) {
        return 'noDeal-leve-height'
      } else if (row.alarmLevel === '中' && columnIndex === 1) {
        return 'noDeal-leve-center'
      } else if (columnIndex === 1) {
        return 'noDeal-leve-low'
      }
    },
    // 开始处理逻辑
    handleEdit: async function (alarmId) {
      const self = this
      try {
        await services.api.monitor.alarmDevice.handleAlarm(alarmId, base.getStore({ 'key': 'userName' }))
        self.$emit('query')
        self.getwarn()
      } catch (err) {
        if (err.message) {
          self.$message.error(err.message)
        } else {
          self.$message.error('未知异常')
        }
      }
    },
    getSortChange (column) {
      if (column.prop === 'alarmDate') {
        this.sortArray.name = 'alarmDate'
      } else {
        this.sortArray.name = 'alarmLevel'
      }
      if (column.order === 'ascending') {
        this.sortArray.sort = 'ASC'
      } else {
        this.sortArray.sort = 'DESC'
      }
      this.$emit('sortArray', this.sortArray)
    }
  },
  watch: {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.noDeal{
  background:transparent;
  .noDeal-table{
    border-radius:0.5rem;
    .noDeal-leve-height{
      color: #DB5B73;
    }
    .noDeal-leve-center{
      color:#F5A623;
    }
    .noDeal-leve-low{
      color: #1087FF;
    }
    .nodeal-btn{
      color:#258AFF;
      border-color: #258AFF;
    }
  }
  .noDeal-top{
    margin: 0.3rem;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0;
    text-align: right;
  }
}
</style>

