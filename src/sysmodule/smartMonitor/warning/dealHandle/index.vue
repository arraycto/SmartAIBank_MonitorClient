<template>
  <div class="index-content">
    <top-header ref="topHeader" @tableList="getTableList" :obj="obj"></top-header>
    <all-warn :tableDate="tableDate" @sortArray="sortArray" @query="query"></all-warn>
     <pagination
    class="pagination-item"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="obj.alarmParams.pageNum"
    :page-size="obj.alarmParams.pageSize"
    :total="tableDate.total"
    position="relative"/>
  </div>
</template>
<script>
import TopHeader from '@/syscomponents/smartMonitor/warning/dealHandle/TopHeader'
import allWarn from '@/syscomponents/smartMonitor/warning/dealHandle/allWarn'
import pagination from '@/syscomponents/smartMonitor/pagination/pagination'
import services from '../../../../services'
import base from '@/common/base'
export default {
  name: 'warnDeviceHandleIndex',
  data () {
    return {
      allWarnShow: true,
      tableDate: {}, // 列表数据容器
      obj: {
        branchNo: base.getStore({ key: 'orgId' }), // 机构
        index: this.$store.state.monitor.parameter,
        alarmParams: { // 查询参数
          pageNum: 1, // 当前页数
          pageSize: 10, // 每页大小
          startDateTime: '',
          endDateTime: '',
          isManager: false, // 是否为管理机构
          branchNo: '', // 机构编号
          devType: '', // 设备类型
          devId: '', // 设备编号
          seqId: '', // 交易流水号
          alarmOrder: '' // 预警级别，默认降序
        }
      }
    }
  },
  components: {
    TopHeader,
    pagination,
    allWarn
  },
  watch: {
    obj: {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) {}
        })
      },
      deep: true
    },
    '$store.state.monitor.warnAmount': function (value) {
      this.query()
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    orgIdChange (branchNo) {  // 判断是否为管理机构
      const self = this
      let orglist = base.getStore({ key: 'monitorBranchList' })
      orglist = JSON.parse(orglist)
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
    // 获取列表数据
    query: async function (alarmTransParams) {
      try {
        const self = this
        this.orgIdChange(self.obj.branchNo)
        console.log(self.obj.index)
        console.log(self.obj.branchNo)
        if(self.obj.index === 'red' || self.obj.index === 'yellow' || self.obj.index === 'blue'){
          this.tableDate = await services.api.monitor.alarmTrans.getAlarmTranInfobyLevel(self.obj.alarmParams, self.obj.branchNo, self.obj.index)
        }else{
          this.tableDate = await services.api.monitor.alarmTrans.getAlarmTranInfo(self.obj.alarmParams, self.obj.branchNo)
        }
        
        this.tableDate.list.map((item, index) => {  // 对预警时间进行处理
          const date = item.alarmDate.substring(0, 10)
          const time = item.alarmDate.slice(10)
          this.tableDate.list[index]['date'] = date
          this.tableDate.list[index]['time'] = time
        })
        this.tableDate.list = this.tableDate.list
        self.iterationDate(self.tableDate.list)
      } catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 处理预警级别
    iterationDate (list) {
      const self = this
      for (var index = 0; index < list.length; index++) {
        if (list[index].alarmLevel === 1) {
          list[index].alarmLevel = '低'
        } else if (list[index].alarmLevel === 2) {
          list[index].alarmLevel = '中'
        } else {
          list[index].alarmLevel = '高'
        }
      }
      self.tableDate.list = list
    },
    getTableList (msg) {
      this.tableDate = msg
      this.tableDate.list.map((item, index) => {  // 对预警时间进行处理
        const date = item.alarmDate.substring(0, 10)
        const time = item.alarmDate.slice(10)
        this.tableDate.list[index]['date'] = date
        this.tableDate.list[index]['time'] = time
      })
      this.tableDate.list = this.tableDate.list
      this.iterationDate(this.tableDate.list)
    },
    sortArray (msg) {
      this.obj.alarmParams.alarmOrder = msg
      this.query()
    },
    // 每页条数
    handleSizeChange (val) {
      this.obj.alarmParams.pageSize = val
      this.query()
    },
    // 当前页数
    handleCurrentChange (val) {
      this.obj.alarmParams.pageNum = val
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
    margin-left:1rem
  }
}
</style>



