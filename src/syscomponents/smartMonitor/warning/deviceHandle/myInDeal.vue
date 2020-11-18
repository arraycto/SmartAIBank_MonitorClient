<template>
<div class="myindeal">
  <el-row>
    <el-col :span="18">
      <div class="myindeal-button-style">
          <el-button type="primary" class="icon-dcfs dcfs-qidongfuwu" @click="optionServe(1)">&nbsp;&nbsp;启动服务</el-button>
          <el-button type="warning" icon="icon-dcfs dcfs-zantingfuwu" @click="optionServe(2)">&nbsp;&nbsp;暂停服务</el-button>
          <el-button type="primary" class="icon-dcfs dcfs-zhongqi" @click="optionServe(3)">&nbsp;&nbsp;设备重启</el-button>
          <el-button type="danger" class="icon-dcfs dcfs-guanji" @click="optionServe(4)">&nbsp;&nbsp;设备关机</el-button>
      </div>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" @click="openRemote" icon="el-icon-edit" class="myindeal-remote-btn">&nbsp;&nbsp;远程操作记录</el-button>
      <!-- <el-button type="primary" class="remote-btn"  @click="openRemote" icon="el-icon-edit">远程操作记录</el-button> -->
      <div class="myindeal-num">共{{tableDate.total}}条记录</div>
    </el-col>
      <el-table
        :data="tableDate.list"
        style="width: 100%,color:'#4A4A4A'"
        size="mini"
        stripe
        fixed
        :header-row-style="{color: '#333333'}"
        class = "myindeal-table"
        :cell-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        @sort-change="getSortChange">
        <el-table-column
          type="selection"
          width="30">
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
          min-width="120">
          <template slot-scope="scope">
            {{scope.row.date}}<br/>{{scope.row.time}}
          </template>
        </el-table-column>
        <el-table-column label="操作"
        min-width="340">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="8">
              <remoteoption :row="scope.row" :id="scope.row.modelId"></remoteoption>
            </el-col>
            <el-col :span="4">
              <el-button size="mini" class="myindeal-repair"  @click="repair(scope.row)">报修</el-button>
            </el-col>
            <el-col :span="4">
              <el-button size="mini" class="myindeal-hangup" @click="handleUp(scope.row.id)">挂起</el-button>
            </el-col>
            <el-col :span="8">
              <el-button size="mini" class="myindeal-log" @click="getOperaDialog(scope.row.mac)">操作记录</el-button>
            </el-col>
          </el-row>
        </template>
        </el-table-column>
        <div slot="empty">
          <occupied height='52.4vh' explain='暂无数据'/>
        </div>
      </el-table>
  </el-row>
  <operationDialog ref="operationDialog"></operationDialog>
  <remoteDialog ref="remoteDialog"></remoteDialog>
  <repair-log ref="repairlog" :repairLogInfo="repairLogInfo" @repairLogShow="repairLogShow"></repair-log>
</div>
</template>
<script>

import circlePanel from './smallCirclePanel'
import remoteoption from '../../remoteOptions/remoteOption'
import remoteDialog from '@/syscomponents/smartMonitor/monitor/deviceState/remoteOpeartionDialog'
import operationDialog from '@/syscomponents/smartMonitor/monitor/deviceState/operationDialog'
import repairLog from '@/syscomponents/smartMonitor/warning/deviceHandle/repairLog'
import services from '../../../../services'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'
export default {
  name: 'warnDeviceHandleMyInDeal',
  data: function () {
    return {
      repairLogInfo: { // 报修展示相关数据
        row: [], // 预警信息
        repairInfo: []  // 维修人相关信息
      },
      sortArray: {  // 排序参数
        name: '',
        sort: 'DESC'
      },
      multipleSelection: [],
      monitorRemoteParams: { // 设备操作上送
        rc: '', // 操作类型码表
        isBatch: true, // 是否批量操作
        orgId: base.getStore({ 'key': 'orgId' }),
        user: base.getStore({ 'key': 'userName' }),
        target: [
        ],
        busType: '', // bus类型
        waitTime: '', // 开机等待时间
        logDate: '', // 日志日期
        logType: '', // 日志类型
        modelClass: '' // 外设模块id
      }
    }
  },
  props: {
    tableDate: {
      type: Object
    }
  },
  components: {
    circlePanel, remoteDialog, operationDialog, repairLog, remoteoption, occupied
  },
  mounted () {},
  methods: {
    // 监控报修展示页面关闭
    repairLogShow (msg) {
      if (msg === false) {
        this.$emit('query')
      }
    },

    // 调整级别不同调整显示颜色
    tableRowClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.alarmLevel === '高' && columnIndex === 1) {
        return 'myindeal-leve-height'
      } else if (row.alarmLevel === '中' && columnIndex === 1) {
        return 'myindeal-leve-center'
      } else if (columnIndex === 1) {
        return 'myindeal-leve-low'
      }
    },
    // 远程操作记录点击
    openRemote () {
      this.$refs.remoteDialog.getRemoteLog()
    },
    // 点击列表中操作记录详情
    getOperaDialog (equipmentNo) {
      this.$refs.operationDialog.getOperation(equipmentNo)
    },
    handleUp: async function (alarmId) {
      try {
        await services.api.monitor.alarmDevice.handleUp(alarmId)
        this.$emit('query')
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    // 点击报修逻辑
    repair: async function (row) {
      try {
        const repairUserInfo = await services.api.monitor.alarmDevice.getMaintainer(row.id)
        this.repairLogInfo.repairInfo = repairUserInfo
        this.repairLogInfo.row = row
        this.$refs.repairlog.getRepairlog()
        // console.log('aaa' + this.$refs.repairlog.repairLogShow)
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    // 按排序查询
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
    },
    // 批量选中操作
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 校验以及准备请求数据
    optionServe (val) {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择批量操作信息',
          type: 'info'
        })
      } else {
        // for (let index = 0; index < this.multipleSelection.length; index++) {
        //   this.monitorRemoteParams.target[index]['DEVCLASSKEY'] = this.multipleSelection[index].modelId
        //   this.monitorRemoteParams.target[index]['IP'] = this.multipleSelection[index].ip
        //   this.monitorRemoteParams.target[index]['TARGET'] = this.multipleSelection[index].mac
        // }
        this.multipleSelection.map((item, index) => {
          this.monitorRemoteParams.target.push({
            'DEVCLASSKEY': item.devClassKey,
            'IP': item.ip,
            'TARGET': item.mac
          })
        })
        switch (val) {
        case 1: // 启动服务
          this.monitorRemoteParams.rc = 'RC002'
          break
        case 2:// 暂停服务
          this.monitorRemoteParams.rc = 'RC001'
          break
        case 3:// 设备重启
          this.monitorRemoteParams.rc = 'RC004'
          break
        case 4:// 设备关机
          this.monitorRemoteParams.rc = 'RC005'
          break
        }
        this.barchHandle()
      }
    },
    barchHandle: async function () {  // 发送批量操作请求
      try {
        const result = await services.api.monitor.monitorRemote.getRemoteRequest(this.monitorRemoteParams)
        if (result) {
          this.$message({
            message: '批量操作成功',
            type: 'info'
          })
        }
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.myindeal{
  background:transparent;
  .myindeal-button-style{
    margin-top: 1rem;
   .el-button--medium{
     padding: 6px 14px;
     width: 120px;
   }
  }
  .myindeal-remote-btn{
    margin-top: 0.8rem;
    float: right;
    width: 150px;
    height:30px;
    background-color: #258AFF;
    border: 1px solid #258AFF;
    padding: 6px 14px;
  }
  .myindeal-table{
    margin-top: 4rem;
    border-radius:0.5rem;
    .myindeal-leve-height{
      color: #DB5B73;
    }
    .myindeal-leve-center{
      color:#F5A623;
    }
    .myindeal-leve-low{
      color: #1087FF;
    }
    .myindeal-hangup{
      margin-left: -1rem;
      width:3.5rem;
      color:#DB5B73;
      border: 1px solid #DB5B73;
    }
    .myindeal-repair{
      margin-left: -1.05rem;
      width:3.5rem;
      color:#F5A623;
      border: 1px solid #F5A623;
    }
    .myindeal-sel{
      width:6rem;
      color: #1087FF;
      border-color: #1087FF;
    }
    .myindeal-log{
      margin-left: -1rem;
      width:5.5rem;
      color: #55CFB4;
      border: 1px solid #55CFB4;
    }
  }
  .myindeal-num{
    float: right;
    margin-top: 1.3rem;
    margin-right: 1.5rem;
    font-family: PingFangSC-Regular;
    font-size: 14px;
  }

}
</style>
