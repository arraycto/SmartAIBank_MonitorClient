<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="entity-grid-content">
          <span class="entity-equiptype-laber">设备总数(个)</span>
          <span class="entity-equiptype-no">{{equipGather.sumCount}}</span>
        </div>
      </el-col>
      <!-- <el-col :span="4">
        <div class="entity-grid-content">
          <span class="entity-equiptype-laber">填单机(个)</span>
          <span class="entity-equiptype-no">{{equipGather.fillerCount}}</span>
        </div>
      </el-col> -->
      <el-col :span="8">
        <div class="entity-grid-content">
          <span class="entity-equiptype-laber">排队机(个)</span>
          <span class="entity-equiptype-no">{{equipGather.queueCount}}</span>
        </div>
      </el-col>
      <!-- <el-col :span="6">
        <div class="entity-grid-content">
          <span class="entity-equiptype-laber">ATM(个)</span>
          <span class="entity-equiptype-no">{{equipGather.atmCount}}</span>
        </div>
      </el-col> -->
      <el-col :span="8">
        <div class="entity-grid-content">
          <span class="entity-equiptype-laber">STM(个)</span>
          <span class="entity-equiptype-no">{{equipGather.stmCount}}</span>
        </div>
      </el-col>
      <!-- <el-col :span="4">
        <div class="entity-grid-content">
          <span class="entity-equiptype-laber">回单机(个)</span>
          <span class="entity-equiptype-no">{{equipGather.bsrCount}}</span>
        </div>
      </el-col> -->
    </el-row>
    <el-row class="entity-second-row">
      <el-col :span="16" :offset="4">
        <el-row :gutter="5">
          <el-col :span="8">
            <div class="entity-second-row-laber">
              <span v-bind:class="{'entity-equip-laber':allOnClick}">
                <a href="#" @click="onClickAll">全部</a>
              </span>
            </div>
          </el-col>
          <!-- <el-col :span="4">
            <div class="entity-second-row-laber">
              <span v-bind:class="{'entity-equip-laber':CRSOnClick}">
                <a href="#" @click="onClickFiller">填单机</a>
              </span>
            </div>
          </el-col> -->
          <el-col :span="8">
            <div class="entity-second-row-laber">
              <span v-bind:class="{'entity-equip-laber':queueOnClick}">
                <a href="#" @click="onClickQueue">排队机</a>
              </span>
            </div>
          </el-col>
          <!-- <el-col :span="6">
            <div class="entity-second-row-laber">
              <span v-bind:class="{'entity-equip-laber':ATMOnClick}">
                <a href="#" @click="onClickATM">ATM</a>
              </span>
            </div>
          </el-col> -->
          <el-col :span="8">
            <div class="entity-second-row-laber">
              <span v-bind:class="{'entity-equip-laber':VTMOnClick}">
                <a href="#" @click="onClickVTM">STM</a>
              </span>
            </div>
          </el-col>
          <!-- <el-col :span="4">
            <div class="entity-second-row-laber">
              <span v-bind:class="{'entity-equip-laber':receiptOnClick}">
                <a href="#" @click="onClickReceipt">回单机</a>
              </span>
            </div>
          </el-col> -->
        </el-row>
      </el-col>
    </el-row>
    <div v-if="equiplist!=null&&equiplist.length>0">
      <div v-if="equiplist!=null&&equiplist.length>0&&!showA" class="entity-equip-panel">
        <el-row
          :gutter="20"
          v-for="(item,index) in equiplist"
          :key="index+20"
          class="entity-equip-list_s"
        >
          <el-col :span="6" class="entity-equip-list">
            <branchEquipMonitor ref="branchEquipMonitor" v-if="null!=item[0]" :equipList="item[0]"></branchEquipMonitor>
          </el-col>
          <el-col :span="6" class="entity-equip-list">
            <branchEquipMonitor ref="branchEquipMonitor" v-if="null!=item[1]" :equipList="item[1]"></branchEquipMonitor>
          </el-col>
          <el-col :span="6" class="entity-equip-list">
            <branchEquipMonitor ref="branchEquipMonitor" v-if="null!=item[2]" :equipList="item[2]"></branchEquipMonitor>
          </el-col>
          <el-col :span="6" class="entity-equip-list">
            <branchEquipMonitor ref="branchEquipMonitor" v-if="null!=item[3]" :equipList="item[3]"></branchEquipMonitor>
          </el-col>
        </el-row>
      </div>
      <!--分辨率为1280时-->
      <div v-if="equiplist!=null&&equiplist.length>0&&showA" class="entity-equip-panel">
        <el-row
          :gutter="20"
          v-for="(item,index) in equiplist"
          :key="index+20"
          class="entity-equip-list_s"
        >
          <el-col :span="8" class="entity-equip-list">
            <branchEquipMonitor ref="branchEquipMonitor" v-if="null!=item[0]" :equipList="item[0]"></branchEquipMonitor>
          </el-col>
          <el-col :span="8" class="entity-equip-list">
            <branchEquipMonitor ref="branchEquipMonitor" v-if="null!=item[1]" :equipList="item[1]"></branchEquipMonitor>
          </el-col>
          <el-col :span="8" class="entity-equip-list">
            <branchEquipMonitor ref="branchEquipMonitor" v-if="null!=item[2]" :equipList="item[2]"></branchEquipMonitor>
          </el-col>
        </el-row>
      </div>
    </div>
    <occupied v-else height="700px" explain="暂无数据" margin-top="15px" />
  </div>
</template>
<script>
import branchEquipMonitor from '@/syscomponents/smartMonitor/monitor/deviceState/branchEquipMonitor'
import services from '../../../../services'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'
import websocketClient from '@/common/websocketClient'
export default {
  name: 'entityDeviceState',
  components: { branchEquipMonitor, occupied },
  data () {
    return {
      selfMinheight: '', // 最小高度
      equipGather: {},
      receiptNum: '', // 回单机数量
      allOnClick: false, // 是否展示样式
      CRSOnClick: false, // 是否展示样式
      queueOnClick: false, // 是否展示样式
      ATMOnClick: false, // 是否展示样式
      VTMOnClick: false, // 是否展示样式
      receiptOnClick: false, // 是否展示样式
      // 设备列表
      equiplist: [],
      branchId: '',
      flag: '1', // 营业兼管理机构
      showA: false
    }
  },
  mounted () {
    this.initWindowsWidth()
    this.timeOut()
  },
  watch: {
    '$store.state.monitor.tableBranchId': function (value) {
      if (this.$store.state.monitor.tableBranchId != null) {
        this.branchId = value.substring(0, value.length - 13)
        this.getBranchEquipGather(this.branchId)
        this.getBranchAllEquip(this.branchId)
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
        self.getBranchEquipGather(self.branchId)
        self.getBranchAllEquip(self.branchId)
      })
      websocketClient.subscribeToRoom('monitorNetwork', window.DCSpace.sysConfig.socketUrl.monitorNetwork, function (msg) {
        self.getBranchEquipGather(self.branchId)
        self.getBranchAllEquip(self.branchId)
      })
      websocketClient.subscribeToRoom('monitorApp', window.DCSpace.sysConfig.socketUrl.monitorApp,
        function (msg) {
          self.getBranchEquipGather(self.branchId)
          self.getBranchAllEquip(self.branchId)
        })
    },
    // 获取窗体大小
    initWindowsWidth () {
      const self = this
      if (document.querySelector('body').clientWidth <= 1660) {
        self.showA = true
      } else {
        self.showA = false
      }
      self.branchId = base.getStore({ key: 'orgId' })
      self.getBranchEquipGather(self.branchId)
      self.getBranchAllEquip(self.branchId)
      window.addEventListener('resize', function () {
        if (document.querySelector('body').clientWidth <= 1660) {
          self.showA = true
          self.getBranchAllEquip(self.branchId)
        } else {
          self.showA = false
          self.getBranchAllEquip(self.branchId)
        }
      })
    },
    getBranchEquipGather: async function (OrgId) {
      var self = this
      try {
        self.equipGather = await services.api.monitor.monitorDevice.selectBranchSummaryInfo(OrgId, this.flag)
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },

    // 页面加载时展示全部
    getBranchAllEquip: async function (branchId) {
      var self = this
      self.allOnClick = true
      const devClassKey = ''
      this.getEquip(devClassKey, branchId)
    },
    // 获取设备信息
    getEquip: async function (devClassKey, branchId) {
      const self = this
      // self.initWindowsWidth()
      try {
        const combinationArr = []
        let temporaryArr = []
        const result = await services.api.monitor.monitorDevice.selectBranchDetailInfo(branchId, devClassKey)
        if (result && !self.showA) {
          const length = result.length
          result.map((item, index) => {
            temporaryArr.push(item)
            if ((index + 1) % 4 === 0) {
              combinationArr.push(temporaryArr)
              temporaryArr = []
            }
            if ((index + 1) === length && (index + 1) % 4 !== 0) {
              combinationArr.push(temporaryArr)
            }
          })
        }
        if (result && self.showA) {
          const length = result.length
          result.map((item, index) => {
            temporaryArr.push(item)
            if ((index + 1) % 3 === 0) {
              combinationArr.push(temporaryArr)
              temporaryArr = []
            }
            if ((index + 1) === length && (index + 1) % 3 !== 0) {
              combinationArr.push(temporaryArr)
            }
          })
        }
        this.equiplist = combinationArr
      } catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 点击全部
    onClickAll () {
      this.allOnClick = true
      this.CRSOnClick = false
      this.queueOnClick = false
      this.ATMOnClick = false
      this.VTMOnClick = false
      this.receiptOnClick = false
      const devClassKey = ''
      this.getEquip(devClassKey, this.branchId)
      if (this.equipGather.sumCount == 0) {
        this.$message({
          message: '暂无数据',
          type: 'info'
        })
      }
    },
    // 点击填单机
    onClickFiller () {
      this.CRSOnClick = true
      this.allOnClick = false
      this.queueOnClick = false
      this.ATMOnClick = false
      this.VTMOnClick = false
      this.receiptOnClick = false
      const devClassKey = '110000'
      this.getEquip(devClassKey, this.branchId)
      if (this.equipGather.fillerCount == 0) {
        this.$message({
          message: '暂无数据',
          type: 'info'
        })
      }
    },
    // 点击排队机
    onClickQueue () {
      this.queueOnClick = true
      this.CRSOnClick = false
      this.allOnClick = false
      this.ATMOnClick = false
      this.VTMOnClick = false
      this.receiptOnClick = false
      const devClassKey = '100000'
      this.getEquip(devClassKey, this.branchId)
      if (this.equipGather.queueCount == 0) {
        this.$message({
          message: '暂无数据',
          type: 'info'
        })
      }
    },
    // 点击ATM
    onClickATM () {
      this.ATMOnClick = true
      this.queueOnClick = false
      this.CRSOnClick = false
      this.allOnClick = false
      this.VTMOnClick = false
      this.receiptOnClick = false
      const devClassKey = '120000'
      this.getEquip(devClassKey, this.branchId)
      if (this.equipGather.atmCount == 0) {
        this.$message({
          message: '暂无数据',
          type: 'info'
        })
      }
    },
    // 点击STM
    onClickVTM () {
      this.VTMOnClick = true
      this.ATMOnClick = false
      this.queueOnClick = false
      this.CRSOnClick = false
      this.allOnClick = false
      this.receiptOnClick = false
      const devClassKey = '130000'
      this.getEquip(devClassKey, this.branchId)
      if (this.equipGather.stmCount == 0) {
        this.$message({
          message: '暂无数据',
          type: 'info'
        })
      }
    },
    // 点击回单机
    onClickReceipt () {
      this.receiptOnClick = true
      this.VTMOnClick = false
      this.ATMOnClick = false
      this.queueOnClick = false
      this.CRSOnClick = false
      this.allOnClick = false
      const devClassKey = '667'
      this.getEquip(devClassKey, this.branchId)
      if (this.equipGather.bsrCount == 0) {
        this.$message({
          message: '暂无数据',
          type: 'info'
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.entity-grid-content {
  border-radius: 0.5rem;
  min-height: 5rem;
  background: linear-gradient(-131deg, #56e5c2 0%, #2eb4d5 100%);
  box-shadow: 0 2px 8px 0 rgba(167, 167, 167, 0.13);
}
.entity-equiptype-laber {
  float: left;
  margin-top: 1.75rem;
  margin-left: 0.8rem;
  font-family: PingFangSC-Regular;
  font-size: 1rem;
  color: #ffffff;
  letter-spacing: 0;
}
.entity-equiptype-no {
  float: right;
  margin-top: 1.625rem;
  margin-right: 0.94rem;
  font-family: DINAlternate-Bold;
  font-size: 1.3rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
}
.entity-second-row-laber {
  border-radius: 0.5rem;
  text-align: center;
  padding-top: 0.5rem;
  font-family: PingFangSC-Semibold;
  font-size: 1rem;
  color: #333333;
  letter-spacing: 0;
}
.entity-second-row {
  margin-top: 1.2rem;
  margin-bottom: 1rem;
}
.entity-equip-laber {
  border-radius: 0.2rem;
  border-bottom: 2px solid #2eb4d5;
  padding-bottom: 0.6rem;
}
.entity-equip-list_s {
  margin-top: 1.25rem;
}
.entity-bottom {
  margin-top: 1rem;
}
.entity-equip-panel {
  padding-top: 1px;
}
</style>



