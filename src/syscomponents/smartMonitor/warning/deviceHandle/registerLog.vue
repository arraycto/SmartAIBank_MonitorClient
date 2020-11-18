<template>
  <div class="registerLogContent">
    <transition name="registerlog">
      <el-dialog :title="title" :visible.sync="registerLogShow" :before-close="close"  width="30%" top="0"
      fullscreen :close-on-click-modal="false"
      class="registerLogContent-view">
      <hr class="registerLogContent-hr"/>
        <div class="registerLogContent-item-padding">
          <nobr>
            <span>
              维修人员姓名
            </span>
            <el-input id="userid" :disabled="disabled"   v-model="alarmWorkInfo.repairUserName" class="registerLogContent-input-style" ></el-input>
          </nobr>
        </div>
        <div class="registerLogContent-item-padding">
          <nobr>
            <span>
              设备恢复时间
            </span>
            <el-input id="userid" placeholder  v-model="registerlogInfo.recoverTime" :disabled="true" class="registerLogContent-input-style"></el-input>
          </nobr>
        </div>
        <div class="registerLogContent-item-padding">
          <nobr>
            <span>维修人员到达时间</span>
            <el-input v-if="disabled" id="userid" placeholder  v-model="receiveTime" :disabled="true" class="registerLogContent-input-style"></el-input>
            <el-date-picker
            v-if="!disabled"
            type="datetime"
            size="small"
            :disabled="disabled"
            class="registerLogContent-input-style"
            placeholder="选择时间"
            format="yyyy-MM-dd HH:mm:ss"
            v-model="timeValue">
            </el-date-picker>
          </nobr>
        </div>
        <div class="registerLogContent-item-padding">
          <nobr>
            <span class="registerLogContent-repair">
              维修评价
            </span>
            <el-rate v-model="alarmWorkInfo.repairEvaluate"   :disabled="disabled"  class="registerLogContent-input-style"></el-rate>
          </nobr>
        </div>
        <div class="registerLogContent-item-padding">
          <nobr>
            <span>
              故障原因
            </span>
            <el-input autosize id="userid" :disabled="disabled" placeholder maxlength="100" v-model="desc" class="registerLogContent-input-style"></el-input>
          </nobr>
        </div>
        <div class="registerLogContent-item-padding">
          <nobr>
            <span>
              故障外设
            </span>
            <el-input id="userid" placeholder  v-model="registerlogInfo.devClassKey" :disabled="true" class="registerLogContent-input-style" ></el-input>
          </nobr>
        </div>
        <div class="registerLogContent-item-padding">
          <nobr>
            <span>修复操作</span>
            <el-select  v-model="alarmWorkInfo.repairOperate" :disabled="disabled" placeholder="请选择" class="registerLogContent-input-style" filterable>
              <el-option
              v-for="item in repairOptionList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
          </nobr>
        </div>
        <div class="registerLogContent-item-padding">
          <nobr>
            <span>
              备注
            </span>
            <el-input :disabled="disabled" autosize id="userid" maxlength="100" v-model="alarmWorkInfo.repairDesc" class="registerLogContent-input-style"></el-input>
          </nobr>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button v-if="!disabled" type="primary" @click="register">登记</el-button>
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
      registerLogShow: false,
      desc: '',
      timeValue: '',
      alarmWorkInfo: {
        alarmId: '', // 预警ID
        deviceId: '', // 设备ID
        faultReason: '', // 故障原因
        receiveTime: '', // 维修人员到达时间
        repairDesc: '', // 维修备注
        repairEvaluate: 0, // 维修评价
        repairOperate: '', // 修复操作
        repairUserName: '' // 维修人员姓名

        // closeTime: '', // 关闭时间（非必输）
        // closeType: '', // 关闭方式（非必输）
        // endTime: '' // 结束时间（非必输）
      },
      repairOptionValue: '',
      disabled: false,
      title: '',
      receiveTime: '',
      repairOptionList: [
        {
          value: '0',
          label: '维修'
        },
        {
          value: '1',
          label: '部分零件更换'
        },
        {
          value: '2',
          label: '更换模块'
        },
        {
          value: '3',
          label: '其他操作'
        }
      ]
    }
  },
  mounted () {
  },
  props: {
    registerlogInfo: {
      type: Object
    }
  },
  methods: {
    getRegisterlog () {
      this.registerLogShow = true
    },
    register: async function () {
      if (this.alarmWorkInfo.repairUserName !== '' && this.alarmWorkInfo.repairEvaluate !== 0 &&
      this.timeValue !== '' && this.desc !== '' && this.alarmWorkInfo.repairOperate !== '') {
        try {
          this.alarmWorkInfo.deviceId = this.registerlogInfo.modelId
          this.alarmWorkInfo.alarmId = this.registerlogInfo.id
          this.alarmWorkInfo.receiveTime = this.timeValue.toString().substring(16, 21)
          this.alarmWorkInfo.faultReason = this.desc
          await services.api.monitor.alarmDevice.updateRepair(this.alarmWorkInfo)
          this.close()
        } catch (error) {
          if (error.message) {
            this.$message.error(this.message)
          } else {
            this.$message.error('未知异常')
          }
        }
      } else {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '<div><i class="el-icon-warning" style="color:#258aff"></i>  请完善登记信息！</div>',
          iconClass: 'default'
        })
      }
    },
    queryRepairInfo: async function () {
      try {
        const repairUserInfo = await services.api.monitor.alarmDevice.getMaintainer(this.registerlogInfo.id)
        this.alarmWorkInfo.repairUserName = repairUserInfo.repairUserName
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    queryRegisterInfo: async function () { // 查询工单登记信息
      try {
        const registerInfo = await services.api.monitor.alarmDevice.getRepairInfo(this.registerlogInfo.id)
        this.alarmWorkInfo.repairUserName = registerInfo.repairUserName // 维修人员姓名
        this.registerlogInfo.recoverTime = registerInfo.repairTime // 设备回复时间
        this.receiveTime = registerInfo.receiveTime  // 维修人员到达时间
        this.alarmWorkInfo.repairEvaluate = registerInfo.repairEvaluate // 维修评价
        this.desc = registerInfo.faultReason // 故障描述
        this.registerlogInfo.devModelNamedevClassKey = registerInfo.devClassName // 故障外设
        this.alarmWorkInfo.repairOperate = registerInfo.repairOperate // 修复操作
        this.alarmWorkInfo.repairDesc = registerInfo.repairDesc // 备注
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    close () {
      this.registerLogShow = false
      this.$emit('registerLogShow', false)
    }
  },
  computed: {
  },
  watch: {
    'registerLogShow': function (val) {
      if (val === true) {
        if (this.registerlogInfo.alarmDealStatus === '已解除') {
          this.desc = this.registerlogInfo.description
          this.queryRepairInfo()
        }
      } else {
        this.alarmWorkInfo = {
          alarmId: '', // 预警ID
          deviceId: '', // 设备ID
          faultReason: '', // 故障原因
          receiveTime: '', // 维修人员到达时间
          repairDesc: '', // 维修备注
          repairEvaluate: 0, // 维修评价
          repairOperate: '', // 修复操作
          repairUserName: '' // 维修人员姓名
        }
        this.desc = ''
        this.timeValue = ''
      }
    },
    registerlogInfo: function (val) {
      if (val.alarmDealStatus === '已解除') {
        this.disabled = false
        this.title = '工单登记'
      } else if (val.alarmDealStatus === '已关闭') {
        this.disabled = true
        this.title = '工单信息查看'
        this.queryRegisterInfo()
      }
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss">
@import "@/styles/smartManager/commom-manager.scss";
.registerLogContent {
  .registerLogContent-item-padding {
    padding-top: 1rem;
  }
  .el-dialog__wrapper {
    left: 70%;
  }
  .registerLogContent-input-style {
    margin-left: 1.5rem;
    width: 13.8rem;
  }
  nobr > span {
    display: inline-block;
    width: 6rem;
    text-align: right;
  }
  .registerLogContent-repair{
    float:left;
    margin-right:1.5rem;
  }
  .registerLogContent-hr{
  margin-top: -1.8rem;
  border: 1px solid #E5E5E5;
  }
}
</style>
