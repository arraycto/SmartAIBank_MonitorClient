<template>
<div>
<el-row class="row-padding" :gutter="20">
        <el-col :span="5" class="query-contion-magin">
          <div class="query-condition-laber">
            <nobr>
              <label style="color:#4A4A4A;font-weight:normal;">设备类型</label>

              <el-select v-model="deviceType" size="small" placeholder="请选择" class="input-magin" @change="deviceTypeChange" filterable>
                <el-option-group>
                <el-option label="全部" value="notValue"></el-option>
                <el-option
                  v-for="item in deviceTypeList"
                  :key="item.devClassKey"
                  :label="item.devClassName"
                  :value="item.devClassKey"
                ></el-option>
                </el-option-group>
              </el-select>
            </nobr>
          </div>
      </el-col>

      <el-col :span="5" class="query-contion-magin">
          <div class="query-condition-laber">
            <nobr>
              <label style="color:#4A4A4A;font-weight:normal;">设备型号</label>
              <el-select v-model="deviceModel" size="small" placeholder="请选择" class="input-magin" @change="deviceModelChange" filterable>
                <el-option-group>
                <el-option label="全部"  value="notValue"></el-option>
                <el-option
                  v-for="item in deviceModelList"
                  :key="item.devModelId"
                  :label="item.devModelName"
                  :value="item.devModelId"
                ></el-option>
                </el-option-group>
              </el-select>
            </nobr>
          </div>
      </el-col>

      <el-col :span="5" class="query-contion-magin">
          <div class="query-condition-laber">
            <nobr>
              <label style="color:#4A4A4A;font-weight:normal;">设备编号</label>
              <el-input v-model="deviceNo" size="small" class="input-magin" placeholder="请输入"></el-input>
            </nobr>
          </div>
      </el-col>

      <el-col :span="4" class="query-contion-magin">
          <div class="query-condition-laber">
            <nobr>
              <label style="color:#4A4A4A;font-weight:normal;">设备厂商</label>

              <el-select v-model="deviceFact" size="small" placeholder="请选择" class="input-magin" filterable>
                <el-option label="全部" value="notValue"></el-option>
                <el-option
                  v-for="item in deviceFactList"
                  :key="item.manufacturerId"
                  :label="item.name"
                  :value="item.manufacturerId"
                ></el-option>
              </el-select>
            </nobr>
          </div>
      </el-col>
      <el-col :span="4" class="top-end-col">
        <div class="top-button-style">
          <el-button class="device-btn" type="primary" @click="queryBtnClick">查询</el-button>
          <el-button @click="conditionReset">重置</el-button>
        </div>
      </el-col>
  </el-row>
  <el-row>
    <div>
      <div class="device-type-all core-equip-status-hover" v-bind:class="{'core-equip-status':allOnClick}" @click="allclick">
        <circlePanel class="equip-type-all" ref="circlePanel" :circleData="circleData[0]"></circlePanel>
          <div class="equip-line"></div>
      </div>
      <div class="device-type-other core-equip-status-hover" v-bind:class="{'core-equip-status':commFailOnClick}" @click="communicationClick">
        <circlePanel class="equip-type-other" ref="circlePanel" :circleData="circleData[1]"></circlePanel>
        <div class="equip-line"></div>
      </div>
      <div class="device-type-other core-equip-status-hover" v-bind:class="{'core-equip-status':peripheralFailOnClick}" @click="deviceClick">
        <circlePanel class="equip-type-other" ref="circlePanel" :circleData="circleData[2]"></circlePanel>
        <div class="equip-line"></div>
      </div>
      <div class="device-type-other core-equip-status-hover" @click="wraningClick" v-bind:class="{'core-equip-status':alarmOnClick}">
        <circlePanel class="equip-type-other" ref="circlePanel" :circleData="circleData[3]"></circlePanel>
        <div class="equip-line"></div>
      </div>
      <div class="device-type-other core-equip-status-hover" @click="applicationClick" v-bind:class="{'core-equip-status':appNotStartOnClick}">
         <circlePanel class="equip-type-other" ref="circlePanel" :circleData="circleData[4]"></circlePanel>
        <div class="equip-line"></div>
      </div>
      <div class="device-type-other core-equip-status-hover" @click="normalClick" v-bind:class="{'core-equip-status':normalOnClick}">
        <circlePanel class="equip-type-other" ref="circlePanel" :circleData="circleData[5]"></circlePanel>
        <div class="equip-line"></div>
      </div>
      <div class="device-type-other core-equip-status-hover" @click="monitorClick" v-bind:class="{'core-equip-status':unmonitorOnClick}">
        <circlePanel class="equip-type-other" ref="circlePanel" :circleData="circleData[6]"></circlePanel>
      </div>
    </div>
  </el-row>


  </div>
</template>

<script>
import services from '../../../../services'
import circlePanel from '@/syscomponents/smartMonitor/monitor/deviceState/circleIcon.vue'
import base from '@/common/base'
import websocketClient from '@/common/websocketClient'
export default {
  name: 'DeviceState',
  components: { circlePanel },
  data () {
    return {
      deviceType: '', // 设备类型
      // 设备类型备选数据
      deviceTypeList: [],
      deviceModel: '', // 设备型号
      // 设备型号备选数据
      deviceModelList: [],
      deviceNo: '', // 设备编号
      deviceFact: '', // 设备编号
      // 设备厂商备选数据
      deviceFactList: [],
      deviceGather: {}, // 汇总,
      branchId: '', // 机构号码
      deviceStatus: 6,
      allOnClick: true, // 是否显示样式
      commFailOnClick: false,
      peripheralFailOnClick: false,
      alarmOnClick: false,
      appNotStartOnClick: false,
      normalOnClick: false,
      unmonitorOnClick: false,
      circleData: [{
        type: 'photo',
        circleContent: 'icon-dcfs dcfs-device-state',
        color: '#258AFF',
        title: '全部',
        count: '0',
        unit: '(个)',
        rate: ''
      },
      {
        type: '',
        circleContent: '',
        color: '#EE667F',
        title: '通讯故障',
        count: '0',
        unit: '',
        rate: '0'
      },
      {
        type: '',
        circleContent: '',
        color: '#F5A623',
        title: '外设故障',
        count: '0',
        unit: '',
        rate: '0'
      },
      {
        type: '',
        circleContent: '',
        color: '#9E7EF7',
        title: '告警',
        count: '0',
        unit: '',
        rate: '0'
      },
      {
        type: '',
        circleContent: '',
        color: '#55CFB4',
        title: '应用未启动',
        count: '0',
        unit: '',
        rate: '0'
      },
      {
        type: '',
        circleContent: '',
        color: '#1087FF',
        title: '正常',
        count: '0',
        unit: '',
        rate: '0'
      },
      {
        type: '',
        circleContent: '',
        color: '#9B9B9B',
        title: '未监控',
        count: '10',
        unit: '',
        rate: '0'
      }]
    }
  },
  mounted () {
    this.branchId = base.getStore({ key: 'orgId' })
    this.getArguService()
    this.queryEquipInfo()
    this.deviceType = null
    this.deviceModel = null
    this.deviceNo = null
    this.deviceFact = null
    this.timeOut()
  },

  watch: {
    '$store.state.monitor.managerBranchId': function (value) {
      if (this.$store.state.monitor.managerBranchId != null) {
        this.branchId = value.substring(0, value.length - 13)
        this.getArguService()
        this.queryEquipInfo()
        this.deviceType = null
        this.deviceModel = null
        this.deviceNo = null
        this.deviceFact = null
      }
    }
  },
  methods: {
    timeOut () {
      const self = this
      setTimeout(function () {
        self.websocket()
      }, 1000)
    },
    // websocke推送
    websocket () {
      const self = this
      websocketClient.subscribeToRoom('monitorDevice', window.DCSpace.sysConfig.socketUrl.monitorDevice, function (msg) {
        self.branchId = base.getStore({ key: 'orgId' })
        self.getArguService()
        self.queryEquipInfo()
        self.deviceType = null
        self.deviceModel = null
        self.deviceNo = null
        self.deviceFact = null
      })
      websocketClient.subscribeToRoom('monitorNetwork', window.DCSpace.sysConfig.socketUrl.monitorNetwork, function (msg) {
        self.branchId = base.getStore({ key: 'orgId' })
        self.getArguService()
        self.queryEquipInfo()
        self.deviceType = null
        self.deviceModel = null
        self.deviceNo = null
        self.deviceFact = null
      })
      websocketClient.subscribeToRoom('monitorApp', window.DCSpace.sysConfig.socketUrl.monitorApp,
        function (msg) {
          self.branchId = base.getStore({ key: 'orgId' })
          self.getArguService()
          self.queryEquipInfo()
          self.deviceType = null
          self.deviceModel = null
          self.deviceNo = null
          self.deviceFact = null
        })
    },
    // 获取备选数据
    getArguService: async function () {
      var self = this
      try {
        self.deviceTypeList = await services.api.monitor.monitorCondition.getDevType()
        // 获取设备厂商备选数据可以不传参数，则获取所有厂商
        self.deviceFactList = await services.api.monitor.monitorCondition.getDevModel(null, null)
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },

    // deviceTypeChange()设备类型改变，获取设备型号备选数据
    deviceTypeChange: async function () {
      this.deviceModel = ''
      var self = this

      try {
        self.deviceModelList = await services.api.monitor.monitorCondition.getDevModelType(self.deviceType)
        if (self.deviceType === 'notValue') {
          self.deviceFactList = await services.api.monitor.monitorCondition.getDevModel(null, null)
        } else {
          self.deviceFactList = await services.api.monitor.monitorCondition.getDevModel(self.deviceType, null)
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // deviceModelChange()设备型号，获取设备厂商备选数据
    deviceModelChange: async function () {
      var self = this
      self.deviceFact  = null
      try {
        if (self.deviceType === 'notValue') {
          if (self.deviceModel === 'notValue') {
            self.deviceFactList = await services.api.monitor.monitorCondition.getDevModel(null, null)
          }
        } else {
          if (self.deviceModel === 'notValue') {
            self.deviceFactList = await services.api.monitor.monitorCondition.getDevModel(self.deviceType, null)
          } else {
            self.deviceFactList = await services.api.monitor.monitorCondition.getDevModel(self.deviceType, self.deviceModel)
          }
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 重置
    conditionReset: async function () {
      this.deviceType = null
      this.deviceModel = null
      this.deviceNo = null
      this.deviceFact = null
      this.deviceModelList = []
      var self = this
      try {
        self.deviceTypeList = await services.api.monitor.monitorCondition.getDevType()
        // 获取设备厂商备选数据可以不传参数，则获取所有厂商
        self.deviceFactList = await services.api.monitor.monitorCondition.getDevModel(null, null)
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },

    // 点击全部
    allclick: async function () {
      this.deviceStatus = 6
      var self = this
      self.allOnClick = true
      self.commFailOnClick = false
      self.peripheralFailOnClick = false
      self.alarmOnClick = false
      self.appNotStartOnClick = false
      self.normalOnClick = false
      self.unmonitorOnClick = false
      const equip = {
        deviceModelKey: self.deviceType,
        deviceClassKey: self.deviceModel,
        deviceId: self.deviceNo,
        manufacturerId: self.deviceFact
      }
      self.$emit('queryEquip', equip)
      // self.$emit('childOrgId', self.branchId)
    },
    // 点击通讯故障
    communicationClick: async function () {
      this.deviceStatus = 5
      var self = this
      self.allOnClick = false
      self.allOnClick = false
      self.commFailOnClick = true
      self.peripheralFailOnClick = false
      self.alarmOnClick = false
      self.appNotStartOnClick = false
      self.normalOnClick = false
      self.unmonitorOnClick = false
      const equip = {
        deviceModelKey: self.deviceType,
        deviceClassKey: self.deviceModel,
        deviceId: self.deviceNo,
        manufacturerId: self.deviceFact,
        deviceStatus: this.deviceStatus
      }
      self.$emit('queryEquip', equip)
      // self.$emit('childOrgId', self.branchId)
    },
    // 点击外设故障
    deviceClick: async function () {
      this.deviceStatus = 4
      var self = this
      self.allOnClick = false
      self.commFailOnClick = false
      self.peripheralFailOnClick = true
      self.alarmOnClick = false
      self.appNotStartOnClick = false
      self.normalOnClick = false
      self.unmonitorOnClick = false
      const equip = {
        deviceModelKey: self.deviceType,
        deviceClassKey: self.deviceModel,
        deviceId: self.deviceNo,
        manufacturerId: self.deviceFact,
        deviceStatus: this.deviceStatus
      }
      self.$emit('queryEquip', equip)
      // self.$emit('childOrgId', self.branchId)
    },
    // 点击告警
    wraningClick: async function () {
      this.deviceStatus = 3
      var self = this
      self.allOnClick = false
      self.commFailOnClick = false
      self.peripheralFailOnClick = false
      self.alarmOnClick = true
      self.appNotStartOnClick = false
      self.normalOnClick = false
      self.unmonitorOnClick = false
      const equip = {
        deviceModelKey: self.deviceType,
        deviceClassKey: self.deviceModel,
        deviceId: self.deviceNo,
        manufacturerId: self.deviceFact,
        deviceStatus: this.deviceStatus
      }
      self.$emit('queryEquip', equip)
      // self.$emit('childOrgId', self.branchId)
    },
    // 点击应用未启动
    applicationClick: async function () {
      this.deviceStatus = 2
      var self = this
      self.allOnClick = false
      self.commFailOnClick = false
      self.peripheralFailOnClick = false
      self.alarmOnClick = false
      self.appNotStartOnClick = true
      self.normalOnClick = false
      self.unmonitorOnClick = false
      const equip = {
        deviceModelKey: self.deviceType,
        deviceClassKey: self.deviceModel,
        deviceId: self.deviceNo,
        manufacturerId: self.deviceFact,
        deviceStatus: this.deviceStatus
      }
      self.$emit('queryEquip', equip)
      // self.$emit('childOrgId', self.branchId)
    },
    // 点击正常
    normalClick: async function () {
      this.deviceStatus = 1
      var self = this
      self.allOnClick = false
      self.commFailOnClick = false
      self.peripheralFailOnClick = false
      self.alarmOnClick = false
      self.appNotStartOnClick = false
      self.normalOnClick = true
      self.unmonitorOnClick = false
      const equip = {
        deviceModelKey: self.deviceType,
        deviceClassKey: self.deviceModel,
        deviceId: self.deviceNo,
        manufacturerId: self.deviceFact,
        deviceStatus: this.deviceStatus
      }
      self.$emit('queryEquip', equip)
      // self.$emit('childOrgId', self.branchId)
    },
    // 点击未监控
    monitorClick: async function () {
      this.deviceStatus = 0
      var self = this
      self.allOnClick = false
      self.commFailOnClick = false
      self.peripheralFailOnClick = false
      self.alarmOnClick = false
      self.appNotStartOnClick = false
      self.normalOnClick = false
      self.unmonitorOnClick = true
      const equip = {
        deviceModelKey: self.deviceType,
        deviceClassKey: self.deviceModel,
        deviceId: self.deviceNo,
        manufacturerId: self.deviceFact,
        deviceStatus: this.deviceStatus
      }
      self.$emit('queryEquip', equip)
      // self.$emit('childOrgId', self.branchId)
    },
    // 查询设备状态汇总
    queryEquipInfo: async function  () {
      var self = this
      const equip = {
        deviceModelKey: self.deviceType,
        deviceClassKey: self.deviceModel,
        deviceId: self.deviceNo,
        manufacturerId: self.deviceFact
      }
      const branchStatsType = 2
      this.getEquipInfo(self.branchId, branchStatsType, equip)
    },
    // 搜索框选择机构后调用方法
    inputChange: async function  () {
      var self = this
      self.allOnClick = true
      self.commFailOnClick = false
      self.peripheralFailOnClick = false
      self.alarmOnClick = false
      self.appNotStartOnClick = false
      self.normalOnClick = false
      self.unmonitorOnClick = false
      this.conditionReset()
      const equip = {
        deviceModelKey: self.deviceType,
        deviceClassKey: self.deviceModel,
        deviceId: self.deviceNo,
        manufacturerId: self.deviceFact
      }
      self.$emit('queryEquip', equip)
      // self.$emit('childOrgId', self.branchId)
      const branchStatsType = 2
      this.getEquipInfo(self.branchId, branchStatsType, equip)
    },
    // 点击查询按钮
    queryBtnClick: async function  () {
      var self = this
      let deviceType1
      let deviceModel1
      let deviceFact1
      if (self.deviceType === 'notValue') {
        deviceType1 = ''
      } else {
        deviceType1 = self.deviceType
      }
      if (self.deviceModel === 'notValue') {
        deviceModel1 = ''
      } else {
        deviceModel1 = self.deviceModel
      }
      if (self.deviceFact === 'notValue') {
        deviceFact1 = ''
      } else {
        deviceFact1 = self.deviceFact
      }
      let equip
      if (this.deviceStatus === 6) {
        equip = {
          deviceModelKey: deviceType1,
          deviceClassKey: deviceModel1,
          deviceId: self.deviceNo,
          manufacturerId: deviceFact1
        }
      } else {
        equip = {
          deviceModelKey: deviceType1,
          deviceClassKey: deviceModel1,
          deviceId: self.deviceNo,
          manufacturerId: deviceFact1,
          deviceStatus: this.deviceStatus
        }
      }
      self.$emit('queryEquip', equip)
      // self.$emit('childOrgId', self.branchId)
      const branchStatsType = 2
      this.getEquipInfo(self.branchId, branchStatsType, equip)
    },
    // 查询设备汇总
    getEquipInfo: async function (orgId, branchStatsType, equip) {
      var self = this
      try {
        self.deviceGather = await services.api.monitor.monitorDevice.selectEachStatusCountGatherInfo(orgId, branchStatsType, equip)
        self.circleData[0].count = self.deviceGather.totalCount || 0
        self.circleData[1].count = self.deviceGather.commFailureCount || 0
        self.circleData[1].rate = parseFloat(self.deviceGather.commFailureRate || 0).toFixed(2)
        self.circleData[2].count = self.deviceGather.peripheralFailureCount || 0
        self.circleData[2].rate = parseFloat(self.deviceGather.peripheralFailureRate || 0).toFixed(2)
        self.circleData[3].count = self.deviceGather.alarmCount || 0
        self.circleData[3].rate = parseFloat(self.deviceGather.alarmRate || 0).toFixed(2)
        self.circleData[4].count = self.deviceGather.appNotStartedCount || 0
        self.circleData[4].rate = parseFloat(self.deviceGather.appNotStartedRate || 0).toFixed(2)
        self.circleData[5].count = self.deviceGather.normalCount || 0
        self.circleData[5].rate = parseFloat(self.deviceGather.normalRate || 0).toFixed(2)
        self.circleData[6].count = self.deviceGather.unmonitoredCount || 0
        self.circleData[6].rate = parseFloat(self.deviceGather.unmonitoredRate || 0).toFixed(2)
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.row-padding{
  .query-contion-magin{
    margin-right: 0.2vw
  }
}
    .top-button-style{
        float:right;
        margin-right: -25px;
    }
    .query-condition-laber{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0;
      text-align: left;
      text-indent: 0.5vw;
    }
    .input-magin {
      width: 10.4vw;
        // margin-left: 10px;
    }
    .el-button{
      padding-top: 8px;
      width: 70px;
      height: 30px;
    }
    .device-type-all{
      width: 13%;
      padding: 25px 0px 47px 1px;
      float: left;
    }
    .device-type-other{
      width: 14.5%;
      padding: 25px 2px 47px 12px;
      float: left;
    }

    .communication{
      color: #EE667F;
    }
    .device-fail{
      color: #F5A623;
    }
    .wraning{
      color: #9E7EF7;
    }
    .application-notstart{
      color: #55CFB4;
    }
    .normal{
      color: #1087FF;
    }
    .not-monitor{
      color: #9B9B9B;
    }
    .equip-line{
      width: 1px;
      height: 35px;
      float:right;
      // border: 0.5px solid #D8D6D6;
      margin-right: 2px;
      margin-top: -38px;
      background: linear-gradient(top,#FFFFFF 100%, #D8D6D6 0%,#D8D6D6 100%,#FFFFFF 100%);
    }
    .core-equip-status{
      border-bottom: 4px solid #258AFF;
      border-radius: 2px;
    }
    .core-equip-status-hover:hover{
      border-bottom: 4px solid #258AFF;
      border-radius: 2px;
      cursor: pointer;
    }
</style>
