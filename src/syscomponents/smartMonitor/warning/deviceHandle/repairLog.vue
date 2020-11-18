<template>
  <div class="repairlogContent">
    <transition name="repairlog">
      <el-dialog title="故障报修登记" :visible.sync="repairLogShow" width="30%" top="0" fullscreen :close-on-click-modal="false">
        <hr class="repairlogContent-hr"/>
        <div class="item-padding">
          <nobr>
            <span>
              预警级别
            </span>
            <el-input id="userid" placeholder  :value="repairLogInfo.row.alarmLevel" class="input-style" :disabled="true" ></el-input>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>
              描述
            </span>
            <el-input id="userid" placeholder  :value="repairLogInfo.row.description" class="input-style" :disabled="true" ></el-input>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>
              时间
            </span>
            <el-input id="userid" placeholder  :value="repairLogInfo.row.alarmDate" class="input-style" :disabled="true" ></el-input>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>
              设备编号
            </span>
            <el-input id="userid" placeholder  :value="repairLogInfo.row.modelId" class="input-style" :disabled="true" ></el-input>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>
              设备类型
            </span>
            <el-input id="userid" placeholder  :value="repairLogInfo.row.modelClassName" class="input-style" :disabled="true" ></el-input>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>
              所属机构
            </span>
            <el-input id="userid" placeholder  :value="repairLogInfo.row.branchName" class="input-style" :disabled="true" ></el-input>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>
              所在位置
            </span>
            <el-input id="userid" placeholder  :value="repairLogInfo.row.fieldName" class="input-style" :disabled="true" ></el-input>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>
              设备厂商
            </span>
            <el-input id="userid" placeholder  :value="repairLogInfo.row.manufName" class="input-style" :disabled="true" ></el-input>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>
              报修人
            </span>
            <el-input id="userid" placeholder  :value="repairLogInfo.row.userId" class="input-style" :disabled="true" ></el-input>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>
              维修人员姓名
            </span>
            <el-input id="userid" placeholder  :value="repairLogInfo.repairInfo.repairUserName" class="input-style" :disabled="true" ></el-input>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>
              电话
            </span>
            <el-input id="userid" placeholder  :value="repairLogInfo.repairInfo.moblieNo" class="input-style" :disabled="true" ></el-input>
          </nobr>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="repair">报修</el-button>
        </span>
      </el-dialog>
    </transition>
  </div>
</template>
<script>
import services from '../../../../services'
export default {
  name: 'warnDeviceHandleReisterLog',
  data () {
    return {
      repairLogShow: false,
      repairInfo: {
        alarmId: '',
        deviceId: '',
        repairUserName: '',
        repairId: ''
      }
    }
  },
  mounted () {
  },
  props: {
    repairLogInfo: {
      type: Object
    }
  },
  methods: {
    getRepairlog () {
      var self = this
      self.repairLogShow = true
    },
    repair: async function () {
      try {
        this.repairInfo.alarmId = this.repairLogInfo.row.id
        this.repairInfo.deviceId = this.repairLogInfo.row.modelId
        this.repairInfo.repairUserName = this.repairLogInfo.repairInfo.repairUserName
        if (this.repairInfo.repairUserName !== '' && this.repairInfo.moblieid !== '') {
          await services.api.monitor.alarmDevice.insertRepair(this.repairInfo)
          this.repairLogShow = false
        } else {
          this.$message({
            dangerouslyUseHTMLString: true,
            message: '<div><i class="el-icon-warning" style="color:#258aff"></i>  未设置机具维护人，无法报修，请先维护机具的维护人员信息。</div>',
            iconClass: 'default'
          })
        }
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
      this.$emit('repairLogShow', false)
    }
  },
  computed: {
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss">
@import "@/styles/smartManager/commom-manager.scss";
.repairlogContent {
  .el-dialog__wrapper {
    left: 70%;
  }
  .item-padding {
    padding-top: 1rem;
  }
  .input-style {
    margin-left: 1rem;
    width: 60%;
  }
  nobr > span {
    display: inline-block;
    width: 6rem;
    text-align: right;
  }
  .repairlogContent-hr{
    margin-top: -1.8rem;
    border: 1px solid #E5E5E5;
  }
}
</style>
