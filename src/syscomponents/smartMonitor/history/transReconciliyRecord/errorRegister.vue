<template>
  <el-dialog title="错账处理记录登记" :visible.sync="dialogFormVisible"
   class="remote-view WrongAccount-remote-view"
   fullscreen :close-on-click-modal="false">
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="err-register">设备编号：</div>
        </el-col>
        <el-col :span="16">
          <div class="err-register-value">{{mId}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="err-register-row">
        <el-col :span="8">
          <div class="err-register">加钞周期：</div>
        </el-col>
        <el-col :span="16">
          <div class="err-register-value">{{periodId}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="err-register-row">
        <el-col :span="8">
          <div class="err-register err-register-laber">对账结果：</div>
        </el-col>
        <el-col :span="16">
          <el-input v-model="registerResult" class="input-magin" :disabled="true"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="err-register-row">
        <el-col :span="8">
          <div class="err-register err-register-laber">错账笔数：</div>
        </el-col>
        <el-col :span="16">
          <el-input-number v-model="errCount"  class="input-magin"  :min="1" :max="9999"></el-input-number>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="err-register-row">
        <el-col :span="8">
          <div class="err-register err-register-laber">开始处理时间：</div>
        </el-col>
        <el-col :span="16">
          <el-input v-model="startTime" class="input-magin" :disabled="true"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="err-register-row">
        <el-col :span="8">
          <div class="err-register err-register-laber">错账修复时间：</div>
        </el-col>
        <el-col :span="16">
          <el-date-picker v-model="errHandleTime" type="datetime" placeholder="选择日期时间" :disabled="true">
    </el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="err-register-row">
        <el-col :span="8">
          <div class="err-register">处理人员：</div>
        </el-col>
        <el-col :span="16">
          <div class="err-register-value err-register-value1">{{userName}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="err-register-row">
        <el-col :span="8">
          <div class="err-register err-register-laber">备注：</div>
        </el-col>
        <el-col :span="16">
          <el-input type="textarea" v-model="remarks" maxlength="65" class="input-magin"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="dialog-footer">
      <el-button @click="deselectClick">取 消</el-button>
      <el-button type="primary" @click="saveErrLog">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import base from '@/common/base'
import services from '../../../../services'
export default {
  name: 'errorRegister',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 设备编号
      mId: '',
      // 加钞周期
      periodId: '',
      // 对账结果
      registerResult: '',
      // 错账笔数
      errCount: 1,
      // 开始处理时间
      startTime: '',
      // 错账修复时间
      errHandleTime: new Date(),
      userName: '',
      // 备注
      remarks: ''

    }
  },
  mounted () {
  },
  props: {
  },
  methods: {
    // 打开界面
    openErrView (val) {
      var self = this
      self.dialogFormVisible = true
      this.mId = val.deviceId
      this.periodId = val.tranCardNo
      this.userName = base.getStore({ key: 'userName' })
      this.registerResult = val.tranResult
      this.startTime = val.tranDate
    },
    async saveErrLog () {
      const endTime = this.dateToString(this.errHandleTime)
      const errPostParme = {
        accountNum: this.errCount,
        checkResult: this.registerResult,
        cycleId: this.periodId,
        deviceId: this.mId,
        endTime: endTime,
        operateDesc: this.remarks,
        operateUser: base.getStore({ key: 'userName' }),
        startTime: this.startTime
      }
      try {
        await services.api.monitor.errorAccount.register(errPostParme)
        this.$message({
          message: '登记成功',
          type: 'success'
        })
        this.deselectClick()
      } catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    deselectClick () {
      this.dialogFormVisible = false
      this.errCount = ''
      this.errHandleTime = ''
      this.remarks = ''
    },
    // 日期转字符串
    dateToString: function (date) {
      var year = date.getFullYear()
      var month = (date.getMonth() + 1).toString()
      var day = (date.getDate()).toString()
      var hour = date.getHours().toString()
      var minutes = date.getMinutes().toString()
      var seconds = date.getSeconds().toString()
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      if (hour.length === 1) {
        hour = '0' + hour
      }
      if (minutes.length === 1) {
        minutes = '0' + minutes
      }
      if (seconds.length === 1) {
        seconds = '0' + seconds
      }
      var dateTime = year + month + day + ' ' + hour + minutes + seconds
      return dateTime
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.remote-view{
    width: 560px;
    margin-top: 7%;
    margin-left: 36%;
    height: 560px;
    border-radius: 4px;
  }
.err-register{
  float: right;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #4A4A4A;
  letter-spacing: 0;
}
.input-magin{
  width: 70%;
}
.err-register-row{
  margin-top: 1rem;
}
.err-register-laber{
  margin-top: 0.5rem;
}
.err-register-value1{
  font-family: PingFangSC-Semibold;
  color: #000;
  font-weight: normal;
}
.err-register-value{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #000;
  letter-spacing: 0;
}
.dialog-footer{
  margin-top: 2.5rem;
  padding-left: 200px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 238px;
}
</style>
