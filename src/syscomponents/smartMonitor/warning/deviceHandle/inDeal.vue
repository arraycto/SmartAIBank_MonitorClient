<template>
  <div class="inDeal">
    <div class="inDeal-top">
      共{{tableDate.total}}条记录
    </div>
      <el-table
        :data="tableDate.list"
        style="width: 100%,color:'#4A4A4A'"
        size="small"
        stripe
        fixed
        :header-row-style="{color: '#333333'}"
        class = "inDeal-table"
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
          prop="userName"
          label="处理人"
          min-width="90">
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
          min-width="140">
        <template slot-scope="scope">
            {{scope.row.date}}<br/>{{scope.row.time}}
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
import occupied from '@/components/Occupied/occupied'
// import services from '../../../../services'
export default {
  name: 'warnDeviceHandleInDeal',
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
        return 'inDeal-leve-height'
      } else if (row.alarmLevel === '中' && columnIndex === 1) {
        return 'inDeal-leve-center'
      } else if (columnIndex === 1) {
        return 'inDeal-leve-low'
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
<style rel="stylesheet/scss" lang="scss" >
.inDeal{
  background:transparent;
  .inDeal-table{
    border-radius:0.5rem;
    .inDeal-leve-height{
      color: #DB5B73;
    }
    .inDeal-leve-center{
      color:#F5A623;
    }
    .inDeal-leve-low{
      color: #1087FF;
    }
  }
  .inDeal-top{
    margin: 0.3rem;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0;
    text-align: right;
  }
}
</style>

