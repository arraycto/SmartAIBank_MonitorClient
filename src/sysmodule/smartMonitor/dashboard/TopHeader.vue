<template>
  <div class="top-header">
      <el-menu :default-active="defaultActive" mode="horizontal" text-color="#A1ADBC">
        <el-menu-item class ="top-header-itemw" index="1" @click='linkPanel("home")'>首页</el-menu-item>
        <el-menu-item class ="top-header-itemw" index="2" @click='linkPanel("monitor")'>监控</el-menu-item>
        <el-menu-item class ="top-header-itemw" index="3" @click='linkPanel("warning")'>
            <el-row>
              <el-col :span="16">
                <span>预警</span>
              </el-col>
              <el-col :span="8" >
                <span v-show="warnAmount>0?true:false" class="top-header-menu-amou top-header-itemw">{{warnAmount}}</span>
              </el-col>
            </el-row>
        </el-menu-item>
        <el-menu-item index="4" class ="top-header-itemw" @click='linkPanel("history")'>历史记录</el-menu-item>
      </el-menu>
    <div class="top-header-user-info">
      <img class="top-header-img" :src="defaultHeadImg" width="40" height="40"/>
      <div class="top-header-user">你好，{{username}}</div>
      <div class="top-header-quit" @click="quite" v-if="showSwitchSys">
        <i class="icon-dcfs dcfs-cut-system"></i>
        切换
      </div>

      <div class="top-header-quit" @click="quiteSys"> <i class="icon-dcfs dcfs-logout top-header-icon"></i>退出</div>
    </div>
    <!-- <theme-picker class="top-header-picker"></theme-picker> -->
  </div>
</template>

<script>
// import ThemePicker from '@/components/ThemePicker'
import base from '@/common/base'
import websocketClient from '@/common/websocketClient'
export default {
  data () {
    return {
      username: base.getStore({ 'key': 'loginUser' }),
      defaultActive: '1',
      defaultHeadImg: require('@/assets/nav_head.png'),
      warnAmount: 0,
      showSwitchSys: true
    }
  },
  components: { },
  computed: {
    bankLevel: function () {
      return base.getStore({ 'key': 'bankLevel' })
    },
    orgId: function () {
      return base.getStore({ key: 'orgId' })
    }
  },
  mounted () {
    var sysArrayStr = sessionStorage.sysArray
    var sysArray = JSON.parse(sysArrayStr)
    if (sysArray.length <= 1) {
      this.showSwitchSys = false
    }
  },
  methods: {
    linkPanel (type) {
      this.$store.commit('monitor/updateBoard', type)
    },
    quite () {
      this.$router.push('entry')
    },
    quiteSys () {
      this.$router.push('login')
      this.$store.commit('setUserName', '')
      this.$store.commit('setHttpToken', '')
      this.$store.commit('setOrgId', '')
      websocketClient.disconnect()
      base.clearMap()
      sessionStorage.clear()
    }
  },
  watch: {
    '$store.state.monitor.warnAmount': function (value) {
      this.warnAmount = value
    },
    '$store.state.monitor.board': function (value) {
      switch (value) {
      case 'home':// 首页
        this.defaultActive = '1'
        break
      case 'monitor':// 监控
        this.defaultActive = '2'
        if (this.$route.path !== '/deviceStateIndex') {
          sessionStorage.monitorOrgid = sessionStorage.orgId
          sessionStorage.monitorMenuBankLevel = 'core'
        }
        break
      case 'warning':// 预警
        this.defaultActive = '3'
        break
      case 'history':// 历史记录
        this.defaultActive = '4'
        break
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
.top-header-picker{
  position: absolute;
  right: 1rem;
  top: 1rem;
}
.top-header .el-menu-item-entity{
  padding: 0 2.6rem;
}
.top-header-itemw{
  display: flex;
  justify-content: center;
  width: 9.5rem;
}
.top-header .el-menu-item:hover{
    border-bottom: 2px solid #258AFF !important;
    background-color: transparent !important;
}
.top-header-menu-amou{
  position: absolute;
  top:2.5rem;
  right:-1.5rem;
  line-height:1.2rem;
  background: #D0021B;
  width:1.5rem;
  color:#FFFFFF;
  border-radius: 0.6rem;
  text-align:center;
}
.top-header-user-info{
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 4rem;
  top: 0.8rem;
  .top-header-user{
    margin-left: 1rem;
    margin-right: 1em;
  }
  .top-header-quit{
    cursor: pointer;
    padding-left: 15px;
  }
}

</style>
