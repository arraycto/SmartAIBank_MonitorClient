<template>
    <div class="index-content">
      <top-header ref="topHeader" @tableList="tableList" :obj="obj"></top-header>
      <all-warn :tableDate="tableDate" @sortArray="sortArray" @query="query"></all-warn>
      <pagination
      class="pagination-item"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="obj.historyTransParams.pageNum"
      :page-size="obj.historyTransParams.pageSize"
      :total="tableDate.total"
      position="relative"/>
    </div>
</template>
<script>
import TopHeader from '@/syscomponents/smartMonitor/history/historyQuery/top'
import allWarn from '@/syscomponents/smartMonitor/history/historyQuery/allWarn'
import pagination from '@/syscomponents/smartMonitor/pagination/pagination'
import services from '../../../services'
import base from '@/common/base'
export default {
  name: 'historyTransQuery',
  data () {
    return {
      tableDate: {
      }, // 列表数据容器
      obj: {
        branchId: base.getStore({ key: 'orgId' }), // 机构
        historyTransParams: { // 查询参数
          pageNum: 1, // 当前页数
          pageSize: 10, // 每页大小
          devClassKey: '', // 设备类型
          deviceId: '', // 设备编号
          startDate: '', // 开始时间
          endDate: '' // 结束时间
        }
      }
    }
  },
  components: {
    TopHeader,
    allWarn,
    pagination
  },
  mounted () {
    this.query()
  },
  methods: {
    tableList (res) { // 将查询数据赋给列表
      this.tableDate = res
    },
    // 获取列表数据
    query: async function (HistoryTransParams) {
      try {
        const self = this
        self.tableDate = await services.api.monitor.historyTrans.getAlarmInfo(self.obj.branchId, self.obj.historyTransParams)
        self.tableDate.list.map((item, index) => {  // 对预警时间进行处理
          const date = item.tranDate.substring(0, 10)
          const time = item.tranDate.slice(10)
          self.tableDate.list[index]['date'] = date
          self.tableDate.list[index]['time'] = time
        })
        this.tableDate.list = this.tableDate.list
      } catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    sortArray (msg) {
      this.obj.historyTransParams.alarmOrder = msg
      this.query()
    },
    // 每页条数
    handleSizeChange (val) {
      this.obj.historyTransParams.pageSize = val
      this.query()
    },
    // 当前页数
    handleCurrentChange (val) {
      this.obj.historyTransParams.pageNum = val
      this.query()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.index-content{
  background: transparent;
  height: calc(100vh-61);
  .pagination-item{
    margin: 1.5rem 0;
    margin-left:1rem
  }
}
</style>


