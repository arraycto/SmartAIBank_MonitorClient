<template>
  <div class="allwarn">
    <div class="allwarn-top">
      共{{tableDate.total}}条记录
    </div>
      <el-table
        :data="tableDate.list"
        style="width: 100%,color:'#4A4A4A'"
        size="mini"
        stripe
        fixed
        :header-row-style="{color: '#333333'}"
        class = "allWarn-table"
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
                <div>{{ scope.row.alarmLevel }}</div>
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
          prop="alarmDealStatus"
          label="处理状态"
          min-width="95">
        </el-table-column>
        <el-table-column
          prop="id"
          label="预警流水号"
          min-width="130">
        </el-table-column>
        <el-table-column
          label="预警时间"
          prop="alarmDate"
          sortable="custom"
          width="100">
          <template slot-scope="scope">
            {{scope.row.date}}<br/>{{scope.row.time}}
          </template>
          </el-table-column>
        <el-table-column label="操作"
        min-width="93">
        <template slot-scope="scope">
          <el-button
          size="mini"
          class = "allwarn-btn"
          v-show="scope.row.alarmDealStatus === '未处理'?true:false"
          @click="handleEdit(scope.row.id)">开始处理</el-button>
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
  name: 'warnDeviceHandleAllWarn',
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
  mounted () {
  },
  props: {
    tableDate: {
      type: Object
    }
  },
  methods: {
    // 调整级别不同调整显示颜色
    tableRowClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.alarmLevel === '高' && columnIndex === 1) {
        return 'allwarn-leve-height'
      } else if (row.alarmLevel === '中' && columnIndex === 1) {
        return 'allwarn-leve-center'
      } else if (columnIndex === 1) {
        return 'allwarn-leve-low'
      }
    },
    // 开始处理逻辑
    handleEdit: async function (alarmId) {
      try {
        await services.api.monitor.alarmDevice.handleAlarm(alarmId, base.getStore({ 'key': 'userName' }))
        this.$emit('query')
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
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
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "@/styles/standard-common.scss";
.allwarn{
  background:transparent;
  .allWarn-table{
    border-radius:0.5rem;
    .allwarn-leve-height{
      color: $warnRedColor;
    }
    .allwarn-leve-center{
      color: $homeYellowColor;
    }
    .allwarn-leve-low{
      color: $warnBlueColor;
    }
    .allwarn-btn{
      color:#258AFF;
      border-color: #258AFF;
    }
  }
  .allwarn-top{
  margin: 0.5rem;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #4A4A4A;
  letter-spacing: 0;
  text-align: right;
  }
}
</style>
