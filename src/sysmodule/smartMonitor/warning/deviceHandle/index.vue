<template>
<div class="index-content">
  <top-header ref="topHeader" @tableList="getTableList" :obj="obj"></top-header>
  <all-warn  v-show="allWarnShow" :tableDate="tableDate" @sortArray="sortArray"  @query="query"></all-warn>
  <no-deal v-show="noDealShow" :tableDate="tableDate" @sortArray="sortArray" @query="query"></no-deal>
  <in-deal v-show="inDealShow" :tableDate="tableDate" @sortArray="sortArray" @query="query"></in-deal>
  <my-deal v-show="myDealShow" :tableDate="tableDate" @sortArray="sortArray" @query="query"></my-deal>
  <my-indeal v-show="myInDealShow" :tableDate="tableDate" @sortArray="sortArray" @query="query"></my-indeal>
  <my-repair v-show="myRepairShow" :tableDate="tableDate" @sortArray="sortArray" @query="query"></my-repair>
  <my-hangup v-show="myHangupShow" :tableDate="tableDate" @sortArray="sortArray" @query="query"></my-hangup>
  <my-remove v-show="myRemoveShow" :tableDate="tableDate" @sortArray="sortArray" @query="query"></my-remove>
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
import TopHeader from '@/syscomponents/smartMonitor/warning/deviceHandle/top'
import allWarn from '@/syscomponents/smartMonitor/warning/deviceHandle/allWarn'
import noDeal from '@/syscomponents/smartMonitor/warning/deviceHandle/noDeal'
import inDeal from '@/syscomponents/smartMonitor/warning/deviceHandle/inDeal'
import myDeal from '@/syscomponents/smartMonitor/warning/deviceHandle/myDeal'
import myIndeal from '@/syscomponents/smartMonitor/warning/deviceHandle/myInDeal'
import myRepair from '@/syscomponents/smartMonitor/warning/deviceHandle/myRepair'
import myHangup from '@/syscomponents/smartMonitor/warning/deviceHandle/myHangUp'
import myRemove from '@/syscomponents/smartMonitor/warning/deviceHandle/myRemove'
import services from '../../../../services'
import pagination from '@/syscomponents/smartMonitor/pagination/pagination'
import base from '@/common/base'
export default {
  name: 'warnDeviceHandleIndex',
  data () {
    return {
      allWarnShow: true, // 全部预警展示
      noDealShow: false, // 全部预警-未处理展示
      inDealShow: false, // 全部预警-处理中展示
      myDealShow: false, // 我处理的展示
      myInDealShow: false, // 我处理的-处理中展示
      myRepairShow: false, // 我处理的-已报修展示
      myHangupShow: false, // 我处理的-已挂起展示
      myRemoveShow: false, // 我处理的-已解除展示
      leftIndex: '', // 左侧菜单index
      tableDate: {
      }, // 列表数据容器
      obj: {
        queryType: 'sum',
        branchNo: base.getStore({ key: 'orgId' }), // 机构
        index: this.$store.state.monitor.parameter,
        alarmParams: { // 查询参数
          pageNum: 1, // 当前页数
          pageSize: 10, // 每页大小
          alarmDealStatus: '',
          branchNo: '', // 机构
          devType: '', // 设备类型
          devId: '', // 设备编号
          userId: base.getStore({ key: 'userName' }), // 用户id
          orderColumn: '' // 排序 默认降序
        }
      }
    }
  },
  components: {
    // LeftMenu,
    TopHeader,
    allWarn,
    noDeal,
    inDeal,
    myDeal,
    myIndeal,
    myRepair,
    myHangup,
    myRemove,
    pagination
  },
  mounted () {
    this.init()
    this.query()
  },
  methods: {
    sortArray (msg) {
      this.obj.alarmParams.orderColumn = msg.name + ' ' + msg.sort
      this.query()
    },
    getTableList (msg) {
      this.tableDate = msg
      this.tableDate.list = this.tableDate.list
      this.iterationDate(this.tableDate.list)
    },
    // 初始化页面以及左侧选择切换
    init () {
      const self = this
      this.$refs.topHeader.reset()
      self.resetShow()
      self.leftIndex = this.$store.state.monitor.warnLeftIndex
      if (self.leftIndex === '1') {
        self.allWarnShow = true
        self.obj.queryType = 'sum'
      } else if (self.leftIndex === '1-1') {
        self.obj.queryType = 'sum'
        self.noDealShow = true
        self.obj.alarmParams.alarmDealStatus = '1'
      } else if (self.leftIndex === '1-2') {
        self.obj.queryType = 'sum'
        self.inDealShow = true
        self.obj.alarmParams.alarmDealStatus = '2'
      } else if (self.leftIndex === '2') {
        self.myDealShow = true
        self.obj.queryType = 'user'
      } else if (self.leftIndex === '2-1') {
        self.obj.queryType = 'user'
        self.myInDealShow = true
        self.obj.alarmParams.alarmDealStatus = '2'
      } else if (self.leftIndex === '2-2') {
        self.obj.queryType = 'user'
        self.myRepairShow = true
        self.obj.alarmParams.alarmDealStatus = '3'
      } else if (self.leftIndex === '2-3') {
        self.obj.queryType = 'user'
        self.myHangupShow = true
        self.obj.alarmParams.alarmDealStatus = '6'
      } else if (self.leftIndex === '2-4') {
        self.obj.queryType = 'user'
        self.myRemoveShow = true
        self.obj.alarmParams.alarmDealStatus = '4'
      }
      this.query()
    },
    // 关闭组件展示
    resetShow: function () {
      const self = this
      self.allWarnShow = false
      self.noDealShow = false
      self.inDealShow = false
      self.myDealShow = false
      self.myInDealShow = false
      self.myRepairShow = false
      self.myHangupShow = false
      self.myRemoveShow = false
      self.obj.alarmParams.alarmDealStatus = ''
      self.obj.alarmParams.devType = ''
      self.obj.alarmParams.branchNo = ''
      self.obj.branchNo = base.getStore({ key: 'orgId' })
      self.obj.alarmParams.devId = ''
      self.obj.alarmParams.pageNum = 1
      self.obj.alarmParams.pageSize = 10
      self.obj.alarmParams.orderColumn = ''
      this.tableDate = {}
    },
    // 处理数据
    iterationDate (list) {
      const self = this
      if (list) {
        for (var index = 0; index < list.length; index++) {
          if (list[index].alarmLevel === 1) {
            list[index].alarmLevel = '低'
          } else if (list[index].alarmLevel === 2) {
            list[index].alarmLevel = '中'
          } else if (list[index].alarmLevel === 3) {
            list[index].alarmLevel = '高'
          }
          if (list[index].alarmDealStatus === 1) {
            list[index].alarmDealStatus = '未处理'
          } else if (list[index].alarmDealStatus === 2) {
            list[index].alarmDealStatus = '处理中'
          } else if (list[index].alarmDealStatus === 3) {
            list[index].alarmDealStatus = '已报修'
          } else if (list[index].alarmDealStatus === 4 && list[index].repairTime) {
            list[index].alarmDealStatus = '已解除'
          } else if (list[index].alarmDealStatus === 5 && list[index].closeType == '2') {
            list[index].alarmDealStatus = '已关闭'
          } else if (list[index].alarmDealStatus === 6) {
            list[index].alarmDealStatus = '已挂起'
          } else {
            list[index].alarmDealStatus = '未知状态'
          }
          if (list[index].alarmDate) {
            const date = list[index].alarmDate.substring(0, 10)
            const time = list[index].alarmDate.slice(10)
            list[index]['date'] = date
            list[index]['time'] = time
          }
          if (list[index].repairTime) {
            const repairDate = list[index].repairTime.substring(0, 10)
            const repairTimes = list[index].repairTime.slice(10)
            list[index]['repairDate'] = repairDate
            list[index]['repairTimes'] = repairTimes
          }
          if (list[index].startTime) {
            const startDate = list[index].startTime.substring(0, 10)
            const startTimes = list[index].startTime.slice(10)
            list[index]['startDate'] = startDate
            list[index]['startTimes'] = startTimes
          }
          if (list[index].recoverTime) {
            const recoverDate = list[index].recoverTime.substring(0, 10)
            const recoverTimes = list[index].recoverTime.slice(10)
            list[index]['recoverDate'] = recoverDate
            list[index]['recoverTimes'] = recoverTimes
          }
        }
        self.tableDate.list = list
      }
    },
    // 查询
    query: async function () {
      try {
        const self = this
        // console.log('index:' + JSON.stringify(self.obj))
        console.log(self.obj.index)
        if(self.obj.index === 'red' || self.obj.index === 'yellow' || self.obj.index === 'blue'){
          this.tableDate = await services.api.monitor.alarmDevice.getAlarmInfobyLevel(self.obj.alarmParams, self.obj.branchNo, self.obj.queryType ,self.obj.index)
        }else{
          this.tableDate = await services.api.monitor.alarmDevice.getAlarmInfo(self.obj.alarmParams, self.obj.branchNo, self.obj.queryType)
        }
      
        this.tableDate.list = this.tableDate.list
        self.iterationDate(self.tableDate.list)
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
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
  },
  watch: {
    '$store.state.monitor.warnAmount': function (value) {
      this.query()
    },
    '$store.state.monitor.warnLeftIndex': function (value) {
      this.leftIndex = value
      this.init()
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



