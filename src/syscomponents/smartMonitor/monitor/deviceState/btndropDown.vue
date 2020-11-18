<template>
<div class="nav_menu3" >
    <ul>
    <li>
      <ul>
        <li><el-button class="btn-dropdown-button" @click.stop="staterServer">启动服务</el-button></li>
        <li><el-button class="btn-dropdown-button" @click.stop="stopServer">暂停服务</el-button></li>
        <li><el-button class="btn-dropdown-button" @click.stop="equipmentRestart">设备重启</el-button></li>
        <li><el-button class="btn-dropdown-button eeeee" disabled>设备关机<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          <ul>
            <li><el-button class="btn-dropdown-button" @click.stop="nowshutdown">立即关机</el-button></li>
            <li><el-button class="btn-dropdown-button" @click.stop="fiveminshutdown">5分钟后关机</el-button></li>
            <li><el-button class="btn-dropdown-button"  @click.stop="thirtyMinShutdown">30分钟后关机</el-button></li>
            <li><el-button class="btn-dropdown-button" @click.stop="oneHourShutdown">1小时后关机</el-button></li>
          </ul>
        </li>
        <li><el-button class="btn-dropdown-button" @click.stop="closePopover">设备截屏</el-button></li>
        <li><el-button class="btn-dropdown-button" @click.stop="closePopover">日志抓取<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          <ul>
            <li><el-button class="btn-dropdown-button" @click.stop="closePopover">APP日志</el-button></li>
            <li><el-button class="btn-dropdown-button" @click.stop="closePopover">VENUS日志</el-button></li>
            <li><el-button class="btn-dropdown-button" @click.stop="closePopover">DEVICE日志</el-button></li>
          </ul>
        </li>
        <li><el-button  class="btn-dropdown-button" @click.stop="closePopover">刷新硬件状态</el-button></li>
        <li><el-button  class="btn-dropdown-button" @click.stop="closePopover">模块复位<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          <ul>
            <li v-for="(item,index) in deviceModelList" :key="index"><el-button class="btn-dropdown-button" @click.stop="closePopover">{{item.deviceModelName}}</el-button></li>
          </ul>
        </li>
        <li><el-button class="btn-dropdown-button" @click.stop="closePopover">解除</el-button></li>
      </ul>
    </li>
    </ul>
</div>
</template>

<script>

import deviceModel from '@/dummy/smartMonitor/deviceStatus/deviceModel.json'
export default {

  name: 'remotDropDown',
  data () {
    return {
      mac: '',
      deviceModelList: [], // 模块
      isShow: false
    }
  },
  props: {
    deviceMac: {
      type: String
    }
  },
  watch: {
    deviceMac (obj) {
      this.mac  = this.deviceMac
      this.getDeviceModel(this.mac)
    }
  },
  components: {

  },
  mounted () {
    this.getDeviceModel('23123')
  },
  methods: {
    //  获取模块信息
    getDeviceModel (mac) {
      this.deviceModelList = deviceModel.list
    },
    // 启动服务
    staterServer () {
      console.log('启动服务')// eslint-disable-line
      this.$emit('isShow', false)
    },
    // 暂停服务
    stopServer () {
      console.log('暂停服务')// eslint-disable-line
      this.$emit('isShow', false)
    },
    // 设备重启
    equipmentRestart () {
      console.log('设备重启')// eslint-disable-line
      this.$emit('isShow', false)
    },
    // 立即关机
    nowshutdown () {
      console.log('立即关机')// eslint-disable-line
      this.$emit('isShow', false)
    },
    // 五分钟后关机
    fiveminshutdown () {
      console.log('五分钟后关机')// eslint-disable-line
      this.$emit('isShow', false)
    },
    // 30分钟后关机
    thirtyMinShutdown () {
      console.log('30分钟后关机')// eslint-disable-line
      this.$emit('isShow', false)
    },
    // 一小时后关机
    oneHourShutdown () {
      console.log('五分钟后关机')// eslint-disable-line
      this.$emit('isShow', false)
    },
    // 关闭弹框
    closePopover () {
      this.$emit('isShow', false)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.nav_menu3,
.nav_menu3 ul,
.nav_menu3 ul li,
.nav_menu3 ul li a,
.nav_menu3 #menu-button {
  margin: 0;
  padding: 0;
  border: 0;
  list-style: none;
  line-height: 1;
  display: block;
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.nav_menu3 {
  width: 102px;
  line-height: 1;
  height: 24px;
  margin-left: -10px;
}

//二级菜单显示样式
.nav_menu3 ul ul {
  position: absolute;
  left: -9999px;
}
//一级菜单是否显示
.nav_menu3 li{
  left: auto;
}
.nav_menu3>ul>li>ul{
  left: auto;
  }
.nav_menu3>ul>li>ul>li:hover>ul{
  left: auto;
}

//二级菜单位置
.nav_menu3 ul ul ul {
  margin-left: 98%;
  top: 0;
}
// 菜单内字体
.nav_menu3 ul ul li a {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  padding-right: 5px;
  width: 110px;
  background: #FFF;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #4A4A4A;
  letter-spacing: 0;
}
//选中背景
.nav_menu3 ul ul li:hover > a,
.nav_menu3 ul ul li a:hover {
  color: #000;
  background: #E2EEFD;
}
.btn-dropdown-button{
  text-align: left;
  padding-top: 5px;
  width: 100px;
  height: 25px;
  padding-left: 10px;
  margin-left: 5px;
  margin-top: -1px;
  border: 1px solid #fff;
  border-radius: 1px;
  color: #000;
}
</style>
