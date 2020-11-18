<template>
  <div>
    <div class="device-table-content">
      <el-table
        ref="multipleTable"
        :data="busyList"
        tooltip-effect="dark"
        style="width: 100%;"
        size="small"
        stripe
        :header-cell-style="theadClassName"
        @sort-change="getSortChange"
      >
        <el-table-column min-width="43"></el-table-column>
        <el-table-column prop="branchId,branchName" label="网点名称" min-width="150">
          <template slot-scope="scope">
            <a
              href="#"
              class="device-status-table-a"
              @click="branchEquipGather(scope.row.branchId)"
            >{{scope.row.branchId}}-{{scope.row.branchName}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="statusDesc" label="状态" sortable="custom" min-width="78">
          <template slot-scope="scope">
            <div
              v-bind:class="{ 'saturation':scope.row.status == '4',
              'busy':scope.row.status === '3',
              'normal':scope.row.status === '2',
              'idle':scope.row.status === '1',
              'not-monitor':scope.row.status === '0'}"
            >
              <el-row :gutter="10">
                <el-col :span="4">
                  <circle-panel class="circle-panel" />
                </el-col>
                <el-col :span="20">{{scope.row.statusDesc}}</el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="waitingCustomers" label="等待客户数" sortable="custom" min-width="115">
          <template slot-scope="scope">{{scope.row.waitingCustomers}}人</template>
        </el-table-column>
        <el-table-column
          prop="avgWindowWaitingCustomers"
          label="窗口平均等待客户数"
          min-width="175"
          sortable="custom"
        >
          <template slot-scope="scope">{{scope.row.avgWindowWaitingCustomers}}人</template>
        </el-table-column>
        <el-table-column prop="avgWaitingTime" label="客户平均等待时间" min-width="162" sortable="custom">
          <template slot-scope="scope">{{scope.row.avgWaitingTime}}分钟</template>
        </el-table-column>
        <el-table-column prop="maxWaitingTime" label="客户最长等待时间" min-width="162" sortable="custom">
          <template slot-scope="scope">{{scope.row.maxWaitingTime}}分钟</template>
        </el-table-column>
        <div slot="empty">
          <occupied height="50.2vh" explain="暂无数据" />
        </div>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper,sizes"
        :total="totalSize"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import services from '../../../../services'
import circlePanel from '@/syscomponents/smartMonitor/monitor/busyDegree/smallCirclePanel'
import occupied from '@/components/Occupied/occupied'
export default {
  name: 'deviceStatusTable',
  components: {
    circlePanel, occupied
  },
  data: function () {
    return {
      currentPage: 1, // 当前页
      pageSize: 10, // 每页条数
      sortName: '', // 排序列
      sortOrder: '', // 排序方式
      totalSize: 0,
      busyList: []
    }
  },
  mounted () {
    // this.getlist(this.org, this.busyStarStatus)
  },
  props: { busyStatus: String, branchId: String },
  watch: {
    busyStatus (val) {
      this.getlist(this.branchId, val)
    },
    branchId (val) {
      this.getlist(val, this.busyStatus)
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.getlist(this.branchId, this.busyStatus)
    }
  },
  methods: {
    getlist: async function (brancho, busyStatus) {
      this.busyList = []
      try {
        var self = this
        const list = await services.api.monitor.monitorBusy.selectBusyDetails(this.sortName, brancho, busyStatus, this.currentPage, this.pageSize, this.sortOrder)
        this.busyList = list.list || []
        this.totalSize = list.total
        self.$emit('totalSize', self.totalSize)
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 改变pageSize
    handleSizeChange (val) {
      this.pageSize = val
      this.getlist(this.branchId, this.busyStatus)
    },
    // 当前页改变
    handleCurrentChange (val) {
      this.currentPage = val
      this.getlist(this.branchId, this.busyStatus)
    },
    // 获取排序参数
    getSortChange (column) {
      if (column.order === 'ascending') {
        this.sortOrder = '2'
      } else if (column.order === 'descending') {
        this.sortOrder = '1'
      }
      if (column.prop === 'statusDesc') {
        this.sortName = '1'
        this.getlist(this.branchId, this.busyStatus)
      } else if (column.prop === 'waitingCustomers') {
        this.sortName = '2'
        this.getlist(this.branchId, this.busyStatus)
      } else if (column.prop === 'avgWindowWaitingCustomers') {
        this.sortName = '3'
        this.getlist(this.branchId, this.busyStatus)
      } else if (column.prop === 'avgWaitingTime') {
        this.sortName = '4'
        this.getlist(this.branchId, this.busyStatus)
      } else if (column.prop === 'maxWaitingTime') {
        this.sortName = '5'
        this.getlist(this.branchId, this.busyStatus)
      }
    },
    // 点击列表中的机构
    branchEquipGather (orgId) {
      var dataTime5 = parseInt(new Date().getTime())
      this.$store.commit('monitor/setMonitorBankLevel', 'entity')
      this.$store.commit('monitor/settableBranchId', orgId + dataTime5)

      // console.log(this.$store.state.monitor.tableBranchId)
    },
    // 调整头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333;font-size: 14px;font-family: PingFangSC-Semibold;'
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.device-table-content{
  .el-table .el-table__body .cell {
    color: #4a4a4a;
  }
  .transaction-exception {
    color: #db5b73;
  }
  .transaction-fail {
    color: #f5a623;
  }
  .transaction-success {
    color: #55cfb4;
  }
  .device-status-table-a {
    color: #1087ff;
  }
  .saturation {
    color: #ee667f;
  }
  .busy {
    color: #f5a623;
  }
  .normal {
    color: #55cfb4;
  }
  .idle {
    color: #1087ff;
  }
  .not-monitor {
    color: #9b9b9b;
  }
}
.block {
  float: right;
  margin-right: -10px;
  margin-top: 1.5rem;
}
</style>

