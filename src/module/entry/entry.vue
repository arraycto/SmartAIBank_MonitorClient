<template>
<div class="index-main-entry">
  <el-row class="index-header-entry">
    <el-col :span="6">
      <div class="index-logo-entry"></div>
    </el-col>
    <el-col :span="6" class="entry-system-name">
      <div class="index-title-entry">智慧网点综合管理平台</div>
    </el-col>
    <el-col  :span="12" >
        <top-header></top-header>
    </el-col>
  </el-row>
  <el-row class="index-content-entry">
    <el-row>
      <el-col :span="18" :offset="3">
        <!-- <div class="entry-welcome-title">您好,&nbsp;&nbsp;&nbsp;{{username}}</div> -->
        <div class="dynamic-div"></div>
      </el-col>
    </el-row>

  </el-row>
      <div  class="menu-row-margin">
  <el-carousel indicator-position="outside" :autoplay='false'  arrow="never" >
    <el-carousel-item>
        <div class="menu-item first-menu" v-if="this.showOperate"  :style="{width:this.swiperOption.width+'px'}" @click="linkSys('smartOperate')"></div>
        <div class="menu-item second-menu" v-if="this.showMonitor"  :style="{width:this.swiperOption.width+'px'}" @click="linkSys('smartMonitor')"></div>
        <div class="menu-item thrid-menu" v-if="this.showManager" :style="{width:this.swiperOption.width+'px'}" @click="linkSys('smartManager')"></div>
    </el-carousel-item>
  </el-carousel>
    </div>
  </div>
</template>

<script>
import TopHeader from './entryTopHeader'
import base from '@/common/base'
import websocketClient from '@/common/websocketClient'
export default {
  name: 'index',
  data: function () {
    return {
      swiperOption: {
        width: document.querySelector('body').clientWidth * 0.7 / JSON.parse(sessionStorage['sysArray']).length,
        initialSlide: 0
      },
      username: base.getStore({ 'key': 'userName' }),
      showMonitor: false,
      showOperate: false,
      showManager: false,
      websocket: {
        'url': window.DCSpace.sysConfig.serveUrl + 'api/v1/ws',
        'user': base.getStore({ 'key': 'userName' }),
        'token': base.getStore({ 'key': 'httpToken' })
      }
    }
  },
  components: {
    TopHeader
  },
  computed: {

  },
  mounted () {
    base.init(this)
    var self = this
    var sysArray = JSON.parse(sessionStorage['sysArray'])
    sysArray.map((item, index) => {
      var id = item.id
      if (id === 'SP') {
        self.showOperate = true
      } else if (id === 'MONITOR') {
        self.showMonitor = true
      } else {
        self.showManager = true
      }
    })
    window.addEventListener('resize', function () {
      var nodeList = document.querySelectorAll('.menu-item')
      for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].style.width = document.querySelector('body').clientWidth * 0.7 / sysArray.length + 'px'
      }
    })
    if (!sessionStorage.hasConnected || sessionStorage.hasConnected !== 'connected') {
      websocketClient.connect(this.websocket.url, self.websocket.user, this.websocket.token)
      sessionStorage.hasConnected = 'connected'
    }

    // setTimeout(function () {
    //   websocketClient.subscribeToRoom('monitorDevice',  window.DCSpace.sysConfig.socketUrl.monitorDevice, function (msg) {
    //   console.info(msg)// eslint-disable-line
    //   })
    // }, 3000)
  },
  methods: {
    linkSys (url) {
      this.$store.commit('setOrgId', base.getStore({ key: 'sessionOrgId' }))
      this.$router.push(url)
      this.$store.commit('setCurrSys', url)
    }
  }
}
</script>

<style>
.index-header-entry {
  box-shadow: 0;
}
.index-main-entry {
 position:absolute;
 width:100%;
 height:100%;
 overflow:auto;
 min-width: 1280px;
}
.menu-row-margin .el-carousel__arrow{
    height: 8vw !important;
    width: 8vw !important;
    border: 15px solid #f1b08c;
    background-color: rgba(0, 0, 0, 0.11) !important;
}
.menu-row-margin .el-carousel__container{
    min-height: 24vw;
}
.menu-row-margin .el-carousel__arrow{
    top: 11vw !important;
}
.menu-row-margin .el-carousel__arrow i{
    font-size: 5vw;
}
.entry-system-name {
  display:flex;
}
.index-left{
  position: absolute;
  bottom: 0px;
  top: 0px;
  left: 0px;
}
.index-bread-content-manage{
  height: 15px;
  background-color: #f6f6f6;
  margin-left: 1rem;
}
.index-tags-content-manage{
  height: 40px;
  background-color: #f6f6f6;
}
.index-right-content {
  background: #f6f6f6;
  padding: 1rem;
}
.entry-welcome-title {
  position:absolute;
  top:28%;
  left:18%;
  color:#fff;
  font-weight:700;
  font-size:17px;
}
.dynamic-div {
  background-image:url('../../assets/sysSelect/dynamic1.png');
  background-size: contain;
  background-repeat: no-repeat;
  image-rendering: -webkit-optimize-contrast;
  height: 16rem;
  margin-top: 3%;
}
.index-logo-entry {
  background-image: url('../../assets/sysSelect/logo.png');
  background-size: auto;
  background-repeat: no-repeat;
  height: 5rem;
  margin-left: 1.5rem;
  margin-top: 3rem;
  overflow:auto;
}
.index-title-entry{
  display: flex;
  display: -webkit-flex;
  align-items: flex-end;
  height: 7.5rem;
  font-size: 20px;
  font-weight: 550;
}
.menu-item {
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
    image-rendering: -webkit-optimize-contrast;
    height: 18vw;
    margin-top: 3%;
    width: 18vw;
    margin-left: 3vw;
    min-width: 250px;
    min-height: 250px;
}
.first-menu {
  background-image:url('../../assets/sysSelect/operation.png');
      background-position: center;
}
.first-menu:hover {
    background-image:url('../../assets/sysSelect/operation-hover.png');
    height: 18vw;
    width: 18vw;
    min-width: 250px;
    min-height: 250px;
    transform: scale(1.2);
        background-position: center;
}
.second-menu {
  background-image:url('../../assets/sysSelect/monitor.png');
      background-position: center;
}
.second-menu:hover {
    background-image:url('../../assets/sysSelect/monitor-hover.png');
    height: 18vw;
    margin-top: 3%;
    width: 18vw;
    margin-left: 3vw;
    min-width: 250px;
    min-height: 250px;
    transform: scale(1.2);
        background-position: center;
}
.thrid-menu {
  background-image:url('../../assets/sysSelect/manage.png');
      background-position: center;
}
.thrid-menu:hover {
    background-image:url('../../assets/sysSelect/manage-hover.png');
    height: 18vw;
    margin-top: 3%;
    width: 18vw;
    margin-left: 3vw;
    min-width: 250px;
    min-height: 250px;
    transform: scale(1.2);
        background-position: center;
}
.menu-row-margin {
    left: 10%;
    right: 10%;
    position: absolute;
}

@media screen and (max-width: 1350px) {
    .menu-item {
        margin-left: 2vw;
    }
}

</style>
