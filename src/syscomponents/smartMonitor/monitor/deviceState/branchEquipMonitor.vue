<template>
<div >
    <div class="branch-equip-monitor" :style="{minHeight:selfMinheight}">
    <!-- <div class="branch-equip-monitor" style="minHeight:100px;maxHeight:400px"> -->
      <el-row :gutter="20" class="branch-equip-monitor-first-row">
        <el-col :span="6">
          <div class="branch-equip-monitor-img" :class="[equipList.deviceType==='110000'?'icon-tiandan':equipList.deviceType==='100000'?'icon-paidui':equipList.deviceType==='120000'?'icon-ATM':equipList.deviceType==='130000'?'icon-STM':equipList.deviceType==='667'?'icon-huidan':'notyle']">
            <div class="branch-equip-monitor-equiptype" v-bind:class="{
            'deviceFail':equipList.totalStatusDesc === '外设故障',
            'communICationFail':equipList.totalStatusDesc === '通讯故障',
            'warning':equipList.totalStatusDesc === '告警',
            'application-notstart':equipList.totalStatusDesc === '应用未启动',
            'normal':equipList.totalStatusDesc === '正常' ,
            'not-monitor':equipList.totalStatusDesc === '未监控'
            }">{{equipList.totalStatusDesc}}</div>
            <!-- <div class="branch-equip-monitor-equiptype" :class="equipTypeBg">应用未启动</div> -->
          </div>
        </el-col>
        <el-col :span="12">
          <div class="branch-equip-monitor-equip-describe">
              <span class="branch-equip-monitor-equipno"><b>设备类型：</b></span>
              <span class="branch-equip-monitor-equipno"><b>{{equipList.deviceTypeName}}</b></span>
              <!-- <span class="branch-equip-monitor-equipno"><b>我是一个</b></span> -->
              <br/>
              <span class="branch-equip-monitor-equipno"><b>设备编号：</b></span>
              <span class="branch-equip-monitor-equipno"><b>{{equipList.id}}</b></span>
              <br/>
              <span class="branch-equip-monitor-equipinfo">所在位置：</span>
              <span class="branch-equip-monitor-equipinfo">{{equipList.fieldName}}</span>
              <br/>
              <span class="branch-equip-monitor-equipinfo">设备厂商：</span>
              <span class="branch-equip-monitor-equipinfo">{{equipList.manufacturerName}}</span>
              <span v-show="false">{{equipList.mac}}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="branch-equip-monitor-equip-btn">
              <!-- <el-button class="branch-equip-monitor-remote-btn" >远程操作 ▽</el-button> -->
              <remoteoption class="branch-equip-monitor-remote-btn" :row="equipList" :id="equipList.id"></remoteoption>
              <br/>
              <el-button size="medium" class="branch-equip-monitor-opera-btn" plain @click="getOperationInfo">操作记录</el-button>
          </div>
        </el-col>
      </el-row >
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="branch-equip-monitor-inter">
            <el-row>
              <el-col :span="24">
                <div class="branch-equip-monitor-inter-laber"><b>网络通讯</b></div>
              </el-col>
            </el-row>
            <el-row class="branch-equip-monitor-device-info">
              <el-col :span="24">
                <div class="branch-equip-monitor-device-cacel" v-bind:class="{ 'nomal-bg-color':equipList.commStatusDesc === '正常', 'fail-bg-color':equipList.commStatusDesc === '异常', 'warn-bg-color':equipList.commStatusDesc === '告警' }"></div>
                <span class="branch-equip-monitor-inter-status-desc">{{equipList.commStatusDesc}}</span>
                <br/>
                <span class="branch-equip-monitor-inter-status">{{equipList.commStatusTime}}更新</span>
              </el-col>
            </el-row>
          </div>

          <el-row>
            <div class="branch-equip-monitor-inter">
              <el-row>
              <el-col :span="24">
                <div class="branch-equip-monitor-inter-laber"><b>设备运行</b></div>
              </el-col>
              </el-row>
              <el-row class="branch-equip-monitor-device-info">
                <el-col :span="24">
                  <div class="branch-equip-monitor-device-cacel" v-bind:class="{ 'nomal-bg-color':equipList.appStatusDesc === '正常', 'fail-bg-color':equipList.appStatusDesc === '异常', 'warn-bg-color':equipList.appStatusDesc === '告警'}"></div>
                  <span class="branch-equip-monitor-inter-status-desc">{{equipList.appStatusDesc}}</span>
                  <br/>
                  <span class="branch-equip-monitor-inter-status">{{equipList.appStatusTime}}更新</span>
                </el-col>
              </el-row>
            </div>
          </el-row>
        </el-col>
        <el-col :span="14">
          <el-row>
            <el-col :span="24">
              <div class="branch-equip-monitor-device-laber"><b>外设运行</b><span class="branch-equip-monitor-device-laber-time">{{equipList.peripheralStatusTime}}更新</span></div>
            </el-col>
          </el-row>
           <el-row>
            <el-col :span="24">
                <div class="wrapper">
                  <ul class="timeline">
                    <li v-for="(item,index) in equipList.devicePeripheral" :key="index">
                        <h4>
                          <a href="#" @click.stop="clickDeviceStutas(item)" class="device-status-table-a-device">
                          <div class="cacel" v-bind:class="{'nomal-bg-color':item.peripheralStatus === '正常', 'fail-bg-color':item.peripheralStatus === '异常','warn-bg-color':item.peripheralStatus === '告警' }"></div>
                          <span class="device-name">{{item.peripheralName}}：</span>
                          <span class="device-status" v-bind:class="{ 'nomal-font-color':item.peripheralStatus === '正常', 'fail-font-color':item.peripheralStatus === '异常','warn-font-color':item.peripheralStatus === '告警' }">
                            {{item.peripheralStatus}}
                          </span>
                          </a>
                        </h4>
                    </li>
                  </ul>
                </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <operationDialog ref="operationDialog"></operationDialog>
    <branchDeviceDetailDialog ref="branchDeviceDetailDialog"></branchDeviceDetailDialog>
</div>
</template>

<script>
import remoteoption from '../../remoteOptions/remoteOption'
import operationDialog from '@/syscomponents/smartMonitor/monitor/deviceState/operationDialog'
import branchDeviceDetailDialog from '@/syscomponents/smartMonitor/monitor/deviceState/branchDeviceDetailDialog'
export default {
  name: 'branchEquipMonitor',
  components: {
    operationDialog, remoteoption, branchDeviceDetailDialog
  },
  props: {
    equipList: {
      type: Object
    }
  },
  watch: {
    'equipList': {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) {
            this.getHeight()
          }
        })
      },
      deep: true
    }
  },

  data () {
    return {
      selfMinheight: '',
      equipTypeBg: 'communICationFail', // 设备状态背景颜色样式
      isActive: false,
      hasError: false,
      options: [],
      value: []
    }
  },
  mounted () {
    this.changebg()
    // var aa = document.querySelector('.entity-bottom').clientHeight
    this.getHeight()
  },
  methods: {
    async changebg () {
      // 背景颜色设置
      if (this.equipList.totalStatusDesc === '外设故障') {
        this.equipTypeBg = 'deviceFail'
      } else if (this.equipList.totalStatusDesc === '通讯故障') {
        this.equipTypeBg = 'communICationFail'
      } else if (this.equipList.totalStatusDesc === '告警') {
        this.equipTypeBg = 'warning'
      } else if (this.equipList.totalStatusDesc === '应用未启动') {
        this.equipTypeBg = 'application-notstart'
      } else if (this.equipList.totalStatusDesc === '正常') {
        this.equipTypeBg = 'normal'
      } else if (this.equipList.totalStatusDesc === '未监控') {
        this.equipTypeBg = 'not-monitor'
      }
    },
    getHeight () {
      var aa = document.querySelector('.entity-equip-list_s').clientHeight
      this.selfMinheight = aa + 'px'
    },

    getOperationInfo () {
      this.$refs.operationDialog.getOperation(this.equipList.mac)
    },
    clickDeviceStutas (item) {
      // console.log(this.scope.row.equipmentNo)
      this.$refs.branchDeviceDetailDialog.getOperation(item, this.equipList)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.branch-equip-monitor{
  background: #ffffff;
  padding:1.2rem 0.3rem 1.2rem 0.3rem
}
.branch-equip-monitor-img{
  background: #2C70B3;
  border-radius: 4px;
  padding: 30px 30px;
}
.branch-equip-monitor-equiptype{
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #FFFFFF;
  float: left;
  width: 60px;
  margin-left: -30px;
  margin-top: 11px;
  text-align: center;
}
// 外设故障
.deviceFail{
  background: #F5A623;
}
//通讯故障
.communICationFail{
  background: #ec4545;
}
//告警
.warning{
  background:#9E7EF7;
}
//停用未启动
.application-notstart{
  background: #55CFB4
}
//正常
.normal{
  background: #1087FF;
}
//未监控
.not-monitor{
  background: #9B9B9B;
}
//外设正常字体样式
.nomal-font-color{
  color: #55CFB4
}
.warn-font-color{
  color: #f5a623;
  }
//外设异常字体样式
.fail-font-color{
  color: #EE667F
}
//背景颜色
.nomal-bg-color{
  background: #55CFB4;
  border-color: #55CFB4
}
.warn-bg-color{
  background: #f5a623;
  border-color: #f5a623
}
//背景颜色
.fail-bg-color{
  background: #EE667F
}
.branch-equip-monitor-equipno{
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #151515;
  line-height: 1.36rem;
}
.branch-equip-monitor-equipinfo{
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #151515;
  line-height: 1.36rem;
}


.el-button--medium {
    padding: 5px 0px;
    font-size: 12px;
    border-radius: 2px;
}

.branch-equip-monitor-inter{
  margin-top: 1rem;
  border-radius: 4px;
  height: 5rem;
}
.branch-equip-monitor-inter-laber{
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #333333;
  line-height: 1.6rem;
  background:#E4ECF4;
  padding-left: 0.5rem
}
.branch-equip-monitor-inter-status{
  font-family: PingFangSC-Semibold;
  font-size: 0.75rem;
  color: #333333;
  letter-spacing: 0;
  line-height: 1.36rem;
  float: right;
  margin-right: 0.5rem
}
.branch-equip-monitor-inter-status-desc{
  font-family: PingFangSC-Semibold;
  font-size: 0.75rem;
  color: #333333;
  letter-spacing: 0;
  line-height: 1.36rem;
  float: left;
  padding-left: 0.25rem
}
.branch-equip-monitor-device-laber{
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #333333;
  line-height: 1.6rem;
  background:#E4ECF4;
  padding-left: 0.5rem;
  margin-top: 1rem;
}
// 外设详细信息样式
.wrapper{
  border-radius: 2px;
  margin-left: -2.8rem;
}
.timeline{
width: 100%;
  height: auto;
  margin-top: -11px;
  margin-left: 1rem;
  list-style:none
}
.timeline li{
position: relative;
}
.device-name{
  font-family: PingFangSC-Regular;
  font-size:12px;
  color: #4A4A4A;
  letter-spacing: 0;
  margin-left: 2px;

}
.device-status{
  font-family: PingFangSC-Regular;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 1.25rem;
}
.timeline li h4{
color:  #4A4A4A;
    font-size: 12px;
    margin-bottom: -15px;
    font-family: PingFangSC-Semibold;
}
.cacel{
  float: left;
  width: 10px;
  height: 10px;
  border: 1px ;
  border-radius: 5px;
  margin-top: 5px;
  margin-left: -8px;
  margin-right: 4px;
}
.branch-equip-monitor-device-cacel{
  float: left;
  width: 10px;
  height: 10px;
  border: 1px ;
  border-radius: 5px;
  margin-top: 5px;
  margin-left: 1px;
  margin-right: 5px;
}
.branch-equip-monitor-device-info{
  padding-top: 5px;
}
.branch-equip-monitor-device-laber-time{
  float:right;
  font-size:12px;
  padding-right:5px;
}
// @media screen and (min-width: 1280px) {
//   .branch-equip-monitor-img{
//   background: #2C70B3;
//   border-radius: 4px;
//   padding: 30px 30px;
//   }

// }
// @media screen and (min-width: 1920px) {
  .branch-equip-monitor-img{
  background: #2C70B3;
  border-radius: 4px;
  padding: 40px 40px;
  }
  .branch-equip-monitor{
  background: #ffffff;
  padding:1rem 1rem 1rem 1rem
}
.branch-equip-monitor-equiptype{
  font-family: PingFangSC-Medium;
  font-size: 15px;
  color: #FFFFFF;
  width: 80px;
  height:20px;
  margin-left:-40px;
  margin-top:20px;
  text-align: center;
}
.branch-equip-monitor-equipno{
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #151515;
}
.branch-equip-monitor-equipinfo{
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #151515;
}
.branch-equip-monitor-equip-btn{
  float: right
}
.branch-equip-monitor-remote-btn{
  width: 103px;
  height: 28px;
  margin-top: 0.1rem;
}
.el-button--medium {
    padding: 5px 0px;
    font-size: 16px;
    border-radius: 2px;
}
.branch-equip-monitor-opera-btn{
  width: 103px;
  height: 28px;
  border: 1px solid #55CFB4;
  color: #55CFB4;
  float: right;
}
.cacel{
  float: left;
  width: 10px;
  height: 10px;
  border: 1px ;
  border-radius: 5px;
  margin-top: 5px;
  margin-left: -8px;
  margin-right: 4px;
}
.icon-tiandan{
background-image: url('');
}
.icon-paidui{
background-image: url('');
}
.icon-ATM{
background-image: url('');
}
.icon-STM{
background-image: url('');
}
.icon-huidanji{
background-image: url('');
}
// }

</style>
