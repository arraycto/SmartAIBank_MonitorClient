<template>
  <div class="org-dialog-content">
    <transition name="dialog">
      <el-dialog title="外设详细信息"
        :visible.sync="dialogTableVisible"
        width="30%"
        top="0"
        fullscreen :close-on-click-modal="false"
        class="opera-view">
        <hr class="device-hr"/>
        <div class="device-title">
          <el-row :gutter="20">
            <el-col :span="12">
              <span>设备类型：</span>
              <span>{{equipName}}</span>
            </el-col>
            <el-col :span="12">
              <span>设备编号：</span>
              <span>{{equipNo}}</span>
            </el-col>
          </el-row>

        </div>
        <el-collapse accordion class="device-el-collapse" v-if="deviceList&&deviceList!=null&&deviceList!=''">
          <el-collapse-item v-for="(item,index) in deviceList" :key="index">
            <template slot="title">
              <span class="cacel nomal-bg-color" v-bind:class="{ 'nomal-bg-color':item.peripheralStatus === '正常', 'fail-bg-color':item.peripheralStatus === '异常','warn-bg-color':item.peripheralStatus === '告警' }"></span>
              <span class="device-name">{{item.peripheralName}}：</span>
              <span class="device-status" v-bind:class="{ 'nomal-font-color':item.peripheralStatus === '正常', 'fail-font-color':item.peripheralStatus === '异常','warn-font-color':item.peripheralStatus === '告警' }">
                          {{item.peripheralStatus}}
              </span>
            </template>
            <div class="device-peripheralStatusDetail">
              <el-table
                    ref="multipleTable"
                    :data="item.peripheralcc"
                    style="width: 100%;"
                    size="small"
                    :cell-style="cellStyleFuncation"
                    :header-cell-style="theadClassName"
                  >
                  <el-table-column prop="key" :label="item.peripheralName"></el-table-column>
                  <el-table-column prop="value" label="状态"></el-table-column>
                   <!-- <div slot="empty">
                        <occupied height='20px' explain='暂无数据'/>
                    </div> -->
                </el-table>
            </div>
          </el-collapse-item>
        </el-collapse>
    <occupied v-else height='600px' explain='暂无数据'/>
    <el-button type="primary" class="footer-bottom" @click="closeview">关闭</el-button>
      </el-dialog>
    </transition>
  </div>
</template>
<script>

import occupied from '@/components/Occupied/occupied'
import services from '../../../../services'
export default {
  name: 'deviceDetailDialog',
  data () {
    return {
      dialogTableVisible: false, // 是否打开界面
      deviceList: [],
      equipName: '',
      equipNo: ''
    }
  },
  components: { occupied
  },
  mounted () {

  },
  methods: {
    // 打开外设详细信息页面
    getOperation: async function (row) {
      var self = this
      self.equipName = row.deviceTypeName || '--'
      self.equipNo = row.id || '--'
      self.dialogTableVisible = true
      var arr = []
      try {
        self.deviceList = await services.api.monitor.monitorDevice.selectPeripheralDetails(row.mac) || []
        if (self.deviceList != null && self.deviceList.length > 0) {
          self.deviceList.map((item, index) => {
            if (item.peripheralStatusDetail != null) {
              const peripheralcc =  JSON.parse(item.peripheralStatusDetail)
              if (peripheralcc != null && peripheralcc !== '') {
                for (const i in peripheralcc) {
                  arr.push({
                    key: i,
                    value: peripheralcc[i]
                  })
                }
              }
              this.$set(self.deviceList[index], 'peripheralcc', arr)
              arr = []
            }
          })
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
      // self.deviceList = banknoteBox.list
    },
    // 调整头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333333;font-size:16px;font-family: PingFangSC-Semibold;background:#E7E7E7 100%;font-weight:700;border:0.5px #979797 solid'
      }
    },
    cellStyleFuncation ({ row, column, rowIndex, columnIndex }) {
      return 'color:#4A4A4A;font-size:16px;font-family: PingFangSC-Regular;background:#ffffff 100%;border:0.5px #979797 solid'
    },
    // 关闭页面
    closeview () {
      var self = this
      self.dialogTableVisible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.org-dialog-content {
  .el-dialog__wrapper {
    left: 70%;
  }
}
.device-title{
  font-weight: 700;
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #333333;
  letter-spacing: 0;
  margin-top: 1rem;
}
.device-el-collapse{
  margin-top: 1rem;
}
.device-peripheralStatusDetail{
  margin-left: 3rem;
  margin-top: 5px;
  width: 85%;
  border: 0.5px solid #979797;
}
.device-name{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 0;
  margin-left: 10px;
}
.device-status{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #1c88e0;
  letter-spacing: 0;
  line-height: 22px;
}

.cacel{
  float: left;
  width: 16px;
  height: 16px;
  border: 1px ;
  border-radius: 8px;
  margin-top: 3px;
  margin-left: 1.5rem;
}
//外设正常字体样式
.nomal-font-color{
  color: #55CFB4
}
//外设正常字体样式
.fail-font-color{
  color: #EE667F
}
.warn-font-color{
  color: #f5a623;
  }
.warn-bg-color{
  background: #f5a623;
  border-color:#f5a623
}
//背景颜色
.nomal-bg-color{
  background: #55CFB4;
  border-color: #55CFB4
}
//背景颜色
.fail-bg-color{
  background: #EE667F
}
.footer-bottom{
  position:fixed;
  bottom: 1rem;
  right: 2rem;
  padding-top: 10px;
  display: inline-block;
  text-align: right;
}
.device-hr{
  margin-top: -1.8rem;
  border: 1px solid #E5E5E5;
}
</style>
