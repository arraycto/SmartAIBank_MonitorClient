<template>
    <div class="core-device-main-content">
      <div class="device-status">
        <deviceStatus ref="deviceStatus" v-on:queryEquip="getEquip"></deviceStatus>
      </div>
      <el-row>
      <div class="mid-button-style">
          <el-button type="primary" class="icon-dcfs dcfs-qidong" @click="optionServe(1)">&nbsp;&nbsp;启动服务</el-button>
          <el-button type="warning" class="icon-dcfs dcfs-zantingfuwu" @click="optionServe(2)">&nbsp;&nbsp;暂停服务</el-button>
          <el-button type="primary" class="icon-dcfs dcfs-zhongqi" @click="optionServe(3)">&nbsp;&nbsp;设备重启</el-button>
          <el-button type="danger" class="icon-dcfs dcfs-guanji" @click="optionServe(4)">&nbsp;&nbsp;设备关机</el-button>
          <el-button type="primary" class="remote-btn"  @click="openRemote" icon="el-icon-edit">远程操作记录</el-button>
          <span class="table-num">共{{totalnum}}条记录</span>
        </div>
    </el-row>
      <div class="device-table">
        <deviceTable ref="deviceTable" :equipdomian="equipObj" v-on:totalSize="getTotalNum"  v-on:multipleSelection="getmultipleSelection"></deviceTable>
      </div>
      <remoteDialog  ref="remoteDialog"></remoteDialog>
    </div>

</template>
<script>
import services from '../../../../services'
import deviceStatus from '@/syscomponents/smartMonitor/monitor/deviceState/deviceOperationStatus'
import deviceTable from '@/syscomponents/smartMonitor/monitor/deviceState/deviceStatusTable'
import remoteDialog from '@/syscomponents/smartMonitor/monitor/deviceState/remoteOpeartionDialog'
import base from '@/common/base'
export default {
  name: 'coreDeviceState',
  data () {
    return {
      totalnum: 0,
      equipObj: {},
      multipleSelection: [],
      monitorRemoteParams: { // 设备操作上送
        rc: '', // 操作类型码表
        isBatch: true, // 是否批量操作
        orgId: '',
        user: base.getStore({ key: 'userName' }),
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
  mounted () {},
  components: {
    deviceStatus, deviceTable, remoteDialog
  },

  watch: {
    multipleSelection: {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) {

          }
        })
      },
      deep: true
    }
  },
  methods: {
    openRemote () {
      this.$refs.remoteDialog.getRemoteLog()
    },
    getEquip (obj) {
      this.equipObj = obj
      // this.$refs.deviceTable.queryEquipInfo()
    },

    getTotalNum (obj) {
      this.totalnum = obj
    },
    // getlistOrgId (obj) {
    //   this.listOrgId = obj
    //   this.$emit('listOrgId', this.listOrgId)
    // },
    getmultipleSelection (obj) {
      this.multipleSelection = obj
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
        this.monitorRemoteParams.target = []
        this.multipleSelection.map((item, index) => {
          this.monitorRemoteParams.orgId = item.branchNo
          this.monitorRemoteParams.target.push({
            'DEVCLASSKEY': item.devClassKey,
            'IP': item.ip,
            'TARGET': item.mac
          })
        })
        // console.log(val + ':' + this.monitorRemoteParams.taret)
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
<style rel="stylesheet/scss" lang="scss" scoped>
.device-table{
  margin-top: 20px;
  background-color: #fff;
  border: 0.5px solid #DCDBDD;
  box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
  border-radius: 8px 8px 0px 0px;
  padding:  2px 2px 0px 2px;
}
.device-status{
  padding-top: 20px;
  padding-left: 20px;
  background-color: #fff;
  border-radius: 4px;
}
.el-button{
      padding-top: 8px;
      width: 120px;
      height: 30px;
}
.mid-button-style{
  padding-top: 20px;
  .icon-dcfs{
    font-size: 14px;
  }
}
.remote-btn{
  float: right;
  width: 150px;
}
.table-num{
  float: right;
  color: #4A4A4A;
  margin-right:10px;
  margin-top:6px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
}
.core-device-top{
  margin-bottom: 20px;
}
</style>



