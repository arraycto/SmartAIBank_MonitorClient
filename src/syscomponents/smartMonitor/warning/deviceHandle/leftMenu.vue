<template>
    <div>
      <el-col :span="24" class="left-menu-height">
        <el-menu
          :default-active="defaultactive"
          @select="setUser"
          background-color="#E2EEFD"
          text-color="#4A4A4A"
          active-text-color="#258AFF">
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-bell"></i>
              <span>全部预警</span>
            </template>
          </el-menu-item>
          <el-menu-item index="1-1" >
            <span slot="title" class="left-menu-item">未处理</span>
            <span v-show ="warnAmount>0?true:false" class="left-menu-amou">{{warnAmount}}</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <span slot="title" class="left-menu-item">处理中</span>
          </el-menu-item>

          <el-menu-item index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">我处理的</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2-1">
            <span slot="title"  class="left-menu-item">处理中</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <span slot="title"  class="left-menu-item">已报修</span>
          </el-menu-item>
          <el-menu-item index="2-3">
            <span slot="title"  class="left-menu-item">已挂起</span>
          </el-menu-item>
          <el-menu-item index="2-4">
            <span slot="title"  class="left-menu-item">已解除</span>
          </el-menu-item>
          </el-menu>
      </el-col>
    </div>
</template>>
<script>
import base from '@/common/base'
import services from '../../../../services'

export default {
  name: 'warnDeviceHandleLeftMenu',
  data: function () {
    return {
      defaultactive: '1',
      warnShw: false,
      warnAmount: 0
    }
  },
  mounted () {
    this.orShow()
  },
  methods: {
    setUser: function (index) {
      this.$emit('selectIndex', index)
    },
    orShow: async function () {
      try {
        this.warnAmount = await services.api.monitor.alarmDevice.getAlarmDevCount(base.getStore({ key: 'orgId' }))
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.left-menu-height{
  height: calc(100vh + 1rem);
  background-color:#E2EEFD;
  margin-left: -1rem;
  margin-top: -1rem;
}
.left-menu-amou{
  float:right;
  line-height:1.2rem;
  margin-top:1.1rem;
  margin-right:0.6rem;
  background: #D0021B;
  width:1.5rem;
  color:#FFFFFF;
  border-radius: 0.6rem;
  text-align:center;
}
.left-menu-item{
    margin-left:3rem;
}
</style>
