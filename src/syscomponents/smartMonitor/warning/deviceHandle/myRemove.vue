<template>
  <div class="myRemove">
    <div class="myRemove-top">
      共{{tableDate.total}}条记录
    </div>
      <el-table
        :data="tableDate.list"
        style="width: 100%,color:'#4A4A4A'"
        size="mimi"
        stripe
        fixed
        :header-row-style="{color: '#333333'}"
        class = "myRemove-table"
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
          prop="id"
          label="预警流水号"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="alarmDate"
          label="预警时间"
          sortable="custom"
          min-width="110">
          <template slot-scope="scope">
            {{scope.row.date}}<br/>{{scope.row.time}}
          </template>
        </el-table-column>
        <el-table-column
          prop="recoverTime"
          label="恢复时间"
          min-width="95">
          <template slot-scope="scope">
            {{scope.row.recoverDate}}<br/>{{scope.row.recoverTimes}}
          </template>
        </el-table-column>
        <el-table-column label="操作"
          min-width="100">

        <template   slot-scope="scope" >
            <el-button
            v-if="scope.row.alarmDealStatus==='已关闭'"
            size="mini"
            class="myremove-btn"
            @click="handleEdit(scope.row)">{{'工单查看'}}</el-button>
            <el-button
            size="mini"
             v-else-if="scope.row.alarmDealStatus==='已解除'"
            class="myremove-btn"
            @click="handleEdit(scope.row)">{{'工单登记'}}</el-button>
          </template>
        </el-table-column>
        <div slot="empty">
          <occupied height='52.4vh' explain='暂无数据'/>
        </div>
      </el-table>
      <register-log ref="register" @registerLogShow="getRegisterLogShow" :registerlogInfo="registerlogInfo"> </register-log>
  </div>
</template>
<script>
import circlePanel from './smallCirclePanel'
import registerLog from '@/syscomponents/smartMonitor/warning/deviceHandle/registerLog'
import occupied from '@/components/Occupied/occupied'
// import services from '../../../../services'
export default {
  name: 'warnDeviceHandleMyRemove',
  data: function () {
    return {
      registerlogInfo: {},
      sortArray: {
        name: 'DESC',
        sort: 'DESC'
      }
    }
  },
  props: {
    tableDate: {
      type: Object
    }
  },
  components: {
    circlePanel, registerLog, occupied
  },
  mounted () {
  },
  methods: {
    getRegisterLogShow (msg) {
      if (msg === false) {
        this.$emit('query')
      }
    },
    // 调整级别不同调整显示颜色
    tableRowClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.alarmLevel === '高' && columnIndex === 1) {
        return 'myRemove-leve-height'
      } else if (row.alarmLevel === '中' && columnIndex === 1) {
        return 'myRemove-leve-center'
      } else if (columnIndex === 1) {
        return 'myRemove-leve-low'
      }
    },
    handleEdit: function (row) {
      this.$refs.register.getRegisterlog()
      this.registerlogInfo = row
    //   this.$refs.repairlog.getRepairlog()
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
.myRemove{
  background:transparent;
  .myRemove-table{
    border-radius:0.5rem;
    .myRemove-leve-height{
     color: #DB5B73;
    }
    .myRemove-leve-center{
      color:#F5A623;
    }
    .myRemove-leve-low{
      color: #1087FF;
    }
    .myremove-btn{
      color:#258AFF;
      border-color: #258AFF;
    }
  }
  .myRemove-top{
    /* float: right; */
    margin: 0.3rem;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0;
    text-align: right;
  }
}
</style>

