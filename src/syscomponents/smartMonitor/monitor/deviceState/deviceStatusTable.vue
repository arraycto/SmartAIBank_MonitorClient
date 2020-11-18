<template>
  <div class="device-table-content">
    <el-table
      ref="multipleTable"
      :data="equipmentData"
      tooltip-effect="dark"
      style="width: 100%;"
      size="small"
      @cell-mouse-enter="diveceImgShow"
      @cell-mouse-leave="diveceImgNotShow"
      :header-cell-style="theadClassName"
      @sort-change="getSortChange"
      @selection-change="selectionChange"
      stripe
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="设备编号" min-width="100"></el-table-column>
      <el-table-column prop="totalStatus" label="设备状态Id" v-if="show"></el-table-column>
      <el-table-column prop="totalStatusDesc" label="设备状态" sortable="custom" min-width="100">
        <template slot-scope="scope">
          <div
            v-bind:class="{ 'communication':scope.row.totalStatus ===5,
              'device-fail':scope.row.totalStatus ===4,
              'wraning':scope.row.totalStatus ===3,
              'application-notstart':scope.row.totalStatus ===2,
              'normal':scope.row.totalStatus === 1,
              'not-monitor':scope.row.totalStatus === 0}"
          >
            <circle-panel class="circle-panel" />
            {{scope.row.totalStatusDesc}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="commStatusDesc" label="网络通讯" sortable="custom" min-width="100"></el-table-column>
      <el-table-column prop="appStatusDesc" label="应用运行" sortable="custom" min-width="100"></el-table-column>
      <el-table-column prop="peripheralStatusDesc" label="外设运行" sortable="custom" min-width="100">
        <template slot-scope="scope">
          {{scope.row.peripheralStatusDesc}}
          <a
            href="#"
            @click.stop="handleSelectionChange(scope.row)"
            class="device-status-table-a-device"
          >
            <span class="svg-el-icon-document" :id="scope.row.id">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#dcfs-chakanxiangqing" />
              </svg>
            </span>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="deviceTypeName" label="设备类型" min-width="120"></el-table-column>
      <el-table-column prop="devModelName" label="设备型号" min-width="150"></el-table-column>
      <el-table-column prop="branchNo,branchName" label="所属机构" min-width="180">
        <template slot-scope="scope">
          <a
            href="#"
            class="device-status-table-a"
            @click="branchEquipGather(scope.row.branchNo)"
          >{{scope.row.branchNo}}-{{scope.row.branchName}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="manufacturerName" label="设备厂商" min-width="100"></el-table-column>
      <el-table-column prop="receiveTime" label="时间" width="95"></el-table-column>
      <el-table-column prop="fieldName" label="设备位置" min-width="100"></el-table-column>
      <el-table-column prop="mac" label="MAC地址" v-if="show"></el-table-column>
      <el-table-column label="操作" min-width="250">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="10">
              <remoteoption :row="scope.row" :id="scope.row.id"></remoteoption>
            </el-col>
            <el-col :span="10">
              <el-button
                @click.stop="getOperaDialog(scope.row.mac)"
                plain
                class="style-btn"
                size="medium"
              >操作记录</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <div slot="empty">
        <occupied height="52.4vh" explain="暂无数据" />
      </div>
    </el-table>
    <div class="block1">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper,sizes"
        :total="totalSize"
        background
      ></el-pagination>
    </div>
    <operationDialog :mac="Mac" ref="operationDialog"></operationDialog>
    <deviceDetailDialog ref="deviceDetailDialog"></deviceDetailDialog>
  </div>
</template>

<script>
import operationDialog from '@/syscomponents/smartMonitor/monitor/deviceState/operationDialog'
import deviceDetailDialog from '@/syscomponents/smartMonitor/monitor/deviceState/deviceDetailDialog'
import circlePanel from '@/syscomponents/smartMonitor/warning/deviceHandle/smallCirclePanel'
import remoteoption from '../../remoteOptions/remoteOption'
import services from '../../../../services'
import base from '@/common/base'
import occupied from '@/components/Occupied/occupied'
import websocketClient from '@/common/websocketClient'
export default {
  name: 'deviceStatusTable',
  components: {
    operationDialog, deviceDetailDialog, circlePanel, remoteoption, occupied
  },
  data: function () {
    return {
      value: [],
      options: [],
      equipmentData: [],
      currentPage: 1, // 当前页
      pageSize: 10,
      totalSize: 0, // 总数
      show: false,
      Mac: '',
      isshow: false,
      sortName: '',
      sortOrder: '',
      multipleSelection: [],
      branchId: '', // 查询机构
      listOrgId: '', // 列表中的机构id1
      deviceMac: '',
      visible: false// 是否显示远程操作
    }
  },
  mounted () {
    this.branchId = base.getStore({ key: 'orgId' })
    this.getEquipListNoInfo(this.sortName, this.sortOrder, this.branchId)
    this.timeOut()
  },
  props: {
    equipdomian: {
      type: Object
    }
  },
  watch: {
    equipdomian (obj) {
      this.queryEquipInfo(this.branchId)
    },
    '$store.state.monitor.managerBranchId': function (value) {
      if (this.$store.state.monitor.managerBranchId != null) {
        this.branchId = value.substring(0, value.length - 13)
        this.getEquipListNoInfo(this.sortName, this.sortOrder, this.branchId)
      }
    }
  },
  methods: {
    timeOut () {
      const self = this
      setTimeout(function () {
        self.websocket()
      }, 18000)
    },
    // websocke推送
    websocket () {
      const self = this
      websocketClient.subscribeToRoom('monitorDevice', window.DCSpace.sysConfig.socketUrl.monitorDevice, function (msg) {
        self.branchId = base.getStore({ key: 'orgId' })
        self.queryEquipInfonoInfo(self.branchId)
      })
      websocketClient.subscribeToRoom('monitorNetwork', window.DCSpace.sysConfig.socketUrl.monitorNetwork, function (msg) {
        self.branchId = base.getStore({ key: 'orgId' })
        self.queryEquipInfonoInfo(self.branchId)
      })
      websocketClient.subscribeToRoom('monitorApp', window.DCSpace.sysConfig.socketUrl.monitorApp,
        function (msg) {
          self.branchId = base.getStore({ key: 'orgId' })
          self.queryEquipInfonoInfo(self.branchId)
        })
    },

    showPopover () {
      this.visible = false
    },
    // 每页数量
    handleSizeChange (val) {
      this.pageSize = val
      this.getEquipList(this.sortName, this.sortOrder, this.branchId)
    },
    // 当前页改变
    handleCurrentChange (val) {
      this.currentPage = val
      this.getEquipList(this.sortName, this.sortOrder, this.branchId)
    },
    // 操作记录详情
    getOperaDialog (mac) {
      this.$refs.operationDialog.getOperation(mac)
    },
    // 点击外设状态列
    handleSelectionChange (row) {
      // console.log(this.scope.row.equipmentNo)
      this.$refs.deviceDetailDialog.getOperation(row)
    },
    // 点击列表中的远程操作按钮
    remoteBtnClick (mac) {
      this.deviceMac = mac
    },
    // 外设图标显示
    diveceImgShow (row, column, cell, event) {
      var id = document.getElementById(row.id)
      id.style.display = 'inline'
    },
    // 外设图标隐藏
    diveceImgNotShow (row, column, cell, event) {
      var id = document.getElementById(row.id)
      id.style.display = 'none'
    },
    getSortChange (column) {
      if (column.order === 'ascending') {
        this.sortOrder = '2'
      } else if (column.order === 'descending') {
        this.sortOrder = '1'
      }
      if (column.prop === 'totalStatusDesc') {
        this.sortName = '1'
        this.getEquipList(this.sortName, this.sortOrder, this.branchId)
      } else if (column.prop === 'commStatusDesc') {
        this.sortName = '2'
        this.getEquipList(this.sortName, this.sortOrder, this.branchId)
      } else if (column.prop === 'appStatusDesc') {
        this.sortName = '3'
        this.getEquipList(this.sortName, this.sortOrder, this.branchId)
      } else if (column.prop === 'peripheralStatusDesc') {
        this.sortName = '4'
        this.getEquipList(this.sortName, this.sortOrder, this.branchId)
      }
    },

    // 查询设备信息
    queryEquipInfo: async function (branchId) {
      this.currentPage = 1
      this.getEquipList(this.sortName, this.sortOrder, branchId)
    },

    queryEquipInfonoInfo: async function (branchId) {
      this.currentPage = 1
      this.getEquipListNoInfo(this.sortName, this.sortOrder, branchId)
    },
    // 获取列表
    getEquipList: async function (sortName, sortOrder, branchId) {
      try {
        var self = this
        const equipment = await services.api.monitor.monitorDevice.selectDeviceOperationDetails(sortName, branchId, this.equipdomian, this.currentPage, this.pageSize, sortOrder)
        self.equipmentData = equipment.list || []
        if (self.equipmentData.length == null || self.equipmentData.length === 0) {
          this.$message({
            message: '暂无数据',
            type: 'info'
          })
        }
        self.totalSize = equipment.total || 0
        self.$emit('totalSize', self.totalSize)
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 首次加载数据
    getEquipListNoInfo: async function (sortName, sortOrder, branchId) {
      try {
        var self = this
        const equipment = await services.api.monitor.monitorDevice.selectDeviceOperationDetails(sortName, branchId, this.equipdomian, this.currentPage, this.pageSize, sortOrder)
        self.equipmentData = equipment.list || []
        self.totalSize = equipment.total || 0
        if (self.equipmentData.length == null || self.equipmentData.length === 0) {
          this.$message({
            message: '暂无数据',
            type: 'info'
          })
        }
        self.$emit('totalSize', self.totalSize)
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 点击列表中的机构
    branchEquipGather (orgId) {
      var dataTime5 = parseInt(new Date().getTime())
      this.$store.commit('monitor/setMonitorBankLevel', 'entity')
      this.$store.commit('monitor/settableBranchId', orgId + dataTime5)
      // this.listOrgId = orgId
      // this.$emit('listOrgId', this.listOrgId)
    },
    selectionChange (val) {
      this.multipleSelection = val
      this.$emit('multipleSelection', this.multipleSelection)
    },
    // 调整头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333;font-size:14px;font-family: PingFangSC-Semibold;;font-weight:normal'
      }
    }
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.device-table-content {
  background: #ffffff;
  border: 0.5px solid #dcdbdd;
  box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
  border-radius: 8px 8px 0px 0px;
}
.el-button {
  padding-top: 5px;
  width: 100px;
  height: 24px;
  padding-left: 12px;
  margin-left: 10px;
  border: 1px solid #55cfb4;
  border-radius: 2px;
  color: #55cfb4;
}
.block1 {
  float: right;
  margin-top: 30px;
}
.status-button {
  margin-top: 1px;
  margin-left: -8px;
}

.remote-btn:hover {
  border: 1px solid #1087ff;
  border-radius: 2px;
  color: #1087ff;
}
.remote-btn {
  border: 1px solid #1087ff;
  border-radius: 2px;
  color: #1087ff;
}
.style-btn {
  height: 28px;
  border: 1px solid #55cfb4;
  border-radius: 2px;
  color: #55cfb4;
  padding-top: 6px;
  padding-left: 20px;
}
.style-btn:hover {
  border: 1px solid #55cfb4;
  border-radius: 2px;
  color: #55cfb4;
}
.btndropdown {
  float: left;
  margin-left: -100px;
}
.circle-panel {
  float: left;
  margin-right: 5px;
  margin-top: 4px;
}
.communication {
  color: #ee667f;
}
.device-fail {
  color: #f5a623;
}
.wraning {
  color: #9e7ef7;
}
.application-notstart {
  color: #55cfb4;
}
.normal {
  color: #1087ff;
}
.not-monitor {
  color: #9b9b9b;
}
.svg-el-icon-document {
  color: #1087ff;
  display: none;
}
.device-status-table-a {
  color: #1087ff;
}
.device-status-table-a-device {
  color: #1087ff;
}
</style>

