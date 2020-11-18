<template>
  <div class="remote">
    <el-cascader
      size="mini"
      v-model="value"
      :options="options"
      expand-trigger="hover"
      placeholder="远程操作"
      :show-all-levels="false"
      @visible-change="visibleaaa"
      @change="handleChange"
    ></el-cascader>

    <el-dialog
      title="日志抓取"
      :visible.sync="active"
      fullscreen
      :close-on-click-modal="false"
      class="remote-view"
    >
      <el-row class="remote-top">
        <el-col :span="6" :offset="3" class="remote-date-lab">类型：</el-col>
        <el-col
          :span="14"
          :pull="4"
          class="remote-date-lab"
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{monitorRemoteParams.logType}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="3" class="remote-date">日期：</el-col>
        <el-col :span="12"  class="remote-dates">
          &nbsp;&nbsp;
          <el-date-picker
            v-model="logDate"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            :picker-options="{disabledDate: time => time.getTime() > Date.now() - 3600 * 1000 || time.getTime() < Date.now()- 3600 * 1000 * 24 * 31}"
          ></el-date-picker>
        </el-col>
      </el-row>
      <div class="remote-btn">
        <el-button type="primary" @click="remoteDateLog">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import services from '../../../services'
import base from '@/common/base'
export default {
  name: 'remoteOption',
  data () {
    return {
      value: [],
      active: false, // 日志抓取窗口开关
      defaultValue: '',
      logDate: '', // 日志日期
      options: [{
        value: 'qidong',
        label: '启动服务'
      }, {
        value: 'zanting',
        label: '暂停服务'
      }, {
        value: 'chongqi',
        label: '设备重启'
      }, {
        value: 'guanji',
        label: '设备关机',
        children: [
          {
            value: '0',
            label: '立即关机'
          }, {
            value: '5',
            label: '5分钟后关机'
          }, {
            value: '30',
            label: '30分钟后关机'
          }, {
            value: '60',
            label: '1小时关机'
          }
        ]
      }, {
        value: 'jiepin',
        label: '设备截屏'
      }, {
        value: 'rizhi',
        label: '日志抓取',
        children: [{
          value: 'app',
          label: 'APP日志'
        }, {
          value: 'venus',
          label: 'VENUS日志'
        }, {
          value: 'device',
          label: 'DEVICE日志'
        }]
      }, {
        value: 'shuaxin',
        label: '刷新硬件状态'
      }, {
        value: 'mokuai',
        label: '模块复位',
        children: []
      }, {
        value: 'duizhang',
        label: '手动对账'
      }],
      monitorRemoteParams: { // 设备操作上送
        busType: 'M', // bus类型
        isBatch: false, // 是否批量操作
        logDate: new Date(), // 日志日期
        logType: '', // 日志类型
        modelClass: '', // 外设模块id
        orgId: '',
        rc: '', // 操作类型码表
        target: [
          {
            DEVCLASSKEY: '', // 外设模块id
            IP: '',  // ip
            TARGET: '' // 机具mac
          }
        ],
        user: base.getStore({ key: 'userName' }),
        waitTime: '' // 开机等待时间
      },
      accountRecordParams: {// 手工对账查询参数
        endDate: '',
        mid: '',
        orgId: '',
        startDate: '',
        user: ''
      }
    }
  },
  mounted () {
    this.logDate = new Date()
  },
  props: {
    row: Object,
    id: String
  },
  methods: {
    queryBlock: async function () {  // 查询设备模块
      try {
        const blockList = await services.api.monitor.monitorCondition.getDevClassByDeviceKey(this.id)
        if (blockList) {
          this.iterationDate(blockList)
        }
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    handleChange (value) { // 触发远程操作选择模块整理请求数据
      const vals = JSON.stringify(value)
      this.value = ['远程操作']
      this.monitorRemoteParams.target[0].DEVCLASSKEY = this.row.devClassKey
      this.monitorRemoteParams.target[0].TARGET = this.row.mac
      this.monitorRemoteParams.target[0].IP = this.row.ip
      this.monitorRemoteParams.orgId = this.row.branchNo
      this.monitorRemoteParams.modelClass = ''
      this.monitorRemoteParams.logDate = ''
      this.monitorRemoteParams.logType = ''
      this.monitorRemoteParams.waitTime = ''
      this.monitorRemoteParams.busType = 'M'
      // console.log('branchN' + this.row.branchNo)
      const val = vals.replace(/"/g, '').replace('[', '').replace(']', '').split(',')
      if (vals.indexOf('qidong') !== -1) { // 启动服务
        this.monitorRemoteParams.rc = 'RC002'
        this.remoteOpt()
      } else if (vals.indexOf('zanting') !== -1) { // 暂停服务
        this.monitorRemoteParams.rc = 'RC001'
        this.remoteOpt()
      } else if (vals.indexOf('chongqi') !== -1) { // 设备重启
        this.monitorRemoteParams.rc = 'RC004'
        this.remoteOpt()
      } else if (vals.indexOf('guanji') !== -1) { // 设备关机
        this.monitorRemoteParams.rc = 'RC005'
        this.monitorRemoteParams.waitTime = val[1]
        this.remoteOpt()
      } else if (vals.indexOf('jiepin') !== -1) { // 设备截屏
        this.monitorRemoteParams.rc = 'RC008'
        this.remoteOpt()
      } else if (vals.indexOf('rizhi') !== -1) {
        this.monitorRemoteParams.rc = 'RC009'// 日志抓取
        this.active = true
        this.monitorRemoteParams.isBatch = 'false'
        this.monitorRemoteParams.logType = val[1]
      } else if (vals.indexOf('shuaxin') !== -1) { // 刷新硬件状态
        this.monitorRemoteParams.rc = 'RC006'
        this.monitorRemoteParams.modelClass = 'ALL'
        this.remoteOpt()
      } else if (vals.indexOf('mokuai') !== -1) { // 准备模块复位上送参数
        this.monitorRemoteParams.rc = 'RC006'
        this.monitorRemoteParams.isBatch = 'false'
        // console.log(val)
        this.monitorRemoteParams.modelClass = val[1]
        this.remoteOpt()
      } else if (vals.indexOf('duizhang') !== -1) { // 手工对账
        this.monitorRemoteParams.rc = 'RC015'
        this.remoteOpt()
      }
    },
    remoteOpt: async function () { // 发送远程操作请求
      try {
        const result = await services.api.monitor.monitorRemote.getRemoteRequest(this.monitorRemoteParams)
        if (JSON.stringify(result).indexOf('000000') !== -1) {
          this.$message('操作成功')
        } else {
          this.$message('操作失败')
        }
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('设备远程操作调用异常')
        }
      }
    },
    remoteDateLog () {
      this.monitorRemoteParams.logDate = JSON.stringify(this.logDate).substring(1, 11)
      this.active = false
      this.remoteOpt()
    },
    iterationDate (list) { // 将模块查询结果放到options中，渲染出级联列表
      this.options[7].children = list
      for (var index = 0; index < list.length; index++) {
        this.options[7].children[index]['label'] = list[index].devClassName
        this.options[7].children[index]['value'] = list[index].devClassKey
      }
    },
    visibleaaa (value) {  // 展开时查询设备模块
      if (value) {
        this.queryBlock()
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
.remote {
  display: flex;
  justify-content: center;
  .remote-view {
    left: 70%;
  }
  .remote-top {
    margin-top: 5%;
  }
  .remote-btn {
    display: flex;
    justify-content: center;
    margin-top: 10%;
  }
  .remote-date {
    font-size: 20px;
    line-height: 79px;
  }
  .remote-dates {
    margin-left: -3vw;
  }
  .remote-date-lab {
    font-size: 20px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 100% !important;
  }
}
@media screen and (max-width: 1366px) {
  .remote .remote-dates {
    margin-left: -2vw;
  }
}


</style>
