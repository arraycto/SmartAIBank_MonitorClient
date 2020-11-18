<template>
  <div class="allHandle">
    <div class="allwarn-top">
      共{{tableDate.total!==undefined?tableDate.total:0}}条记录
    </div>
      <el-table
        :data="tableDate.list"
        style="width: 100%;"
        size="mini"
        stripe
        fixed
        class = "allWarn-table"
        :cell-class-name="tableRowClassName"
        :header-cell-style="theadClassName"
        @sort-change="getSortChange">
        <el-table-column
          min-width="10">
        </el-table-column>
        <el-table-column
          prop="alarmLevel"
          label="预警级别"
          sortable="custom"
          min-width="75" align="left">
            <template slot-scope="scope">
              <div class="columnIndex">
                  <el-row :gutter="20">
                  <el-col :span="4">
                    <circle-panel/>
                  </el-col>
                  <el-col :span="4">
                    <div>{{ scope.row.alarmLevel }}</div>
                  </el-col>
                </el-row>
              </div>
            </template>
        </el-table-column>
        <el-table-column
          prop="tranStatus"
          label="故障类型"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="description"
          label="故障描述"
          min-width="115">
        </el-table-column>
        <el-table-column
          prop="date"
          label="预警时间"
          sortable="custom"
          min-width="75"
          @sort-change="getSortChange">
          <template slot-scope="scope">
            {{scope.row.date}}<br/>{{scope.row.time}}
          </template>
          </el-table-column>
        <el-table-column
          prop="seqId"
          label="交易流水号"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="tranTypeName"
          label="交易类型"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="tranCardNo"
          label="交易卡号"
          min-width="125">
        </el-table-column>
        <el-table-column
          prop="tranAmt"
          label="交易金额"
          min-width="65">
        </el-table-column>
        <el-table-column
          prop="modelNo"
          label="设备编号"
          min-width="65">
        </el-table-column>
        <el-table-column
          prop="modelTypeName"
          label="设备类型"
          min-width="74">
        </el-table-column>
        <el-table-column
          prop="branchName"
          label="所属机构"
          min-width="105">
        </el-table-column>
        <el-table-column
          prop="fieldName"
          label="所在位置"
          min-width="75">
        </el-table-column>
        <el-table-column
          prop="manufacturerName"
          label="设备厂商"
          min-width="74">
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          min-width="75" v-if="false">
        </el-table-column>
        <el-table-column label="操作"
        min-width="80">
        <template slot-scope="scope">
          <el-button
          size="mini"
          class="remove_btn"
          @click="handleEdit(scope.row.id)">解除</el-button>
        </template>
        </el-table-column>
        <div slot="empty">
          <occupied height='52.4vh' explain='暂无数据'/>
        </div>
      </el-table>
  </div>
</template>
<script>
import circlePanel from '../deviceHandle/smallCirclePanel'
import occupied from '@/components/Occupied/occupied'
import services from '../../../../services'
import base from '@/common/base'
export default {
  name: 'deviceAllwarn',
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
    // this.$nextTick(() => {
    //   this.tranStatusList()
    // })
  },
  props: {
    tableDate: {
      type: Object
    }
  },
  methods: {
    // 故障类型数据处理
    tranStatusList () {
      const data = this.tableDate.list
      if (data.length !== 0) {
        data.map((item, index) => {
          if (item.tranStatus === 3) {
            item.tranStatus = '正常'
          } else if (item.tranStatus === 2) {
            item.tranStatus = '异常'
          } else if (item.tranStatus === 1) {
            item.tranStatus = '失败'
          }
        })
      }
    },
    // 调整级别不同调整显示颜色
    tableRowClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.alarmLevel === '高' && columnIndex === 1) {
        return 'allwarn-leve-height'
      } else if (row.alarmLevel === '中' && columnIndex === 1) {
        return 'allwarn-leve-center'
      } else if (columnIndex === 1) {
        return 'allwarn-leve-low'
      }
      if (columnIndex === 11 && row.show === true) {
        this.btnshow = true
      }
    },
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
    // 解除按钮处理逻辑
    async handleEdit (transId) {
      var self=this
      try {
        await services.api.monitor.alarmTrans.removeTrans(transId)
        self.getwarn()
        self.$emit('query')
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    getSortChange (column) {
      if (column.prop === 'alarmLevel') {
        this.sortArray.name = 't.ALARM_LEVEL'
      } else if (column.prop === 'date') {
        this.sortArray.name = 't.ALARM_Date'
      }
      if (column.order === 'ascending') {
        this.sortArray.sort = 'ASC'
      } else {
        this.sortArray.sort = 'DESC'
      }
      this.levelOrder = this.sortArray.name + ' ' + this.sortArray.sort
      this.$emit('sortArray', this.levelOrder)
    },
    // 调整头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #4A4A4A;font-size:14px;font-family: PingFangSC-Semibold;font-weight:bold;'
      }
    }
  },
  watch: {
    'tableDate': function (val) {
      if (val.total !== 0) {
        this.tranStatusList()
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "@/styles/standard-common.scss";
.allHandle{
  .allWarn-table{
    border-radius:8px;
    box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
    .allwarn-leve-height{
      color: $warnRedColor;
    }
    .allwarn-leve-center{
      color:$homeYellowColor;
    }
    .allwarn-leve-low{
      color: $warnBlueColor;
    }
    .remove_btn{
      border: 1px solid #258AFF;
      border-radius: 2px;
      color: #258AFF;
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
