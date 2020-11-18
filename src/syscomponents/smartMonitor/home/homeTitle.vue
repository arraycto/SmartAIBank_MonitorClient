<template>
<div class="home-title" :class="[index==='red'?'icon-red':index==='yellow'?'icon-yellow':'icon-blue']">
  <el-row :gutter="20">
    <el-col :offset="2" :span="11">
      <div class="layout-style">
        <div class="title-style">{{homeTitle}}</div>
      </div>
    </el-col>
    <el-col :span="11">
      <div class="layout-style icon-dcfs dcfs-jingbao jingbao-style">
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="1">
    <el-col :span="11" :offset="2">
      <div class="layout-style layout-tap" @click="putHandle">
        <span class="text-style layout-tran-style">交易</span>
        <span class="number-style">{{titleData.tranNum}}</span>
        <span class="text-style layout-device-style">个问题</span>
      </div>
    </el-col>
    <el-col :span="11">
      <div class="layout-style layout-tap layout-device" @click="putEquip">
        <span class="text-style layout-tran-style">设备</span>
        <span class="number-style">{{titleData.deviceNum}}</span>
        <span class="text-style layout-device-style">个问题</span>
      </div>
    </el-col>
  </el-row>
</div>
</template>
<script>
export default {
  name: 'homeTitle',
  props: { homeTitle: String,
    titleData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    index: String
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    putHandle () {
      this.$nextTick(function () {
        this.$store.commit('monitor/setBoardDoor', 'jiaoYi')
      })
      this.$store.commit('monitor/updateBoard', 'warning')
      this.$store.commit('monitor/setParameter', this.index)
    },
    putEquip () {
      this.$nextTick(function () {
        this.$store.commit('monitor/setBoardDoor', 'sheBei')
      })
      this.$store.commit('monitor/updateBoard', 'warning')
      this.$store.commit('monitor/setParameter', this.index)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.home-title{
  background: white;
  border-radius:0.5rem;
  background-position: center center;
  background-size: auto;
  background-repeat: no-repeat;
  height: 7rem;
  @media screen and (min-width: 1420px) {
    .layout-style{
      margin-top: 20%;
      // padding-bottom: 11%;
    }
  }

   @media screen and (min-width: 1620px) {
    .layout-style{
      margin-top: 15%;
      // padding-bottom: 11%;
    }
  }

  @media screen and (max-width: 1720px) {
    .layout-style{
      margin-top: 15%;
      // padding-bottom: 11%;
    }
  }
   @media screen and (max-width: 1620px) {
    .layout-style{
      margin-top: 17%;
      // padding-bottom: 11%;
    }
  }
  @media screen and (min-width: 1720px) {
    .layout-style{
      margin-top: 13%;
      // padding-bottom: 11%;
    }
  }
@media screen and (max-width: 1420px) {
    .layout-style{
      margin-top: 19%;
      // padding-bottom: 11%;
    }
  }
  .layout-tran-style{
    padding-right: 5px;
  }
  .layout-device-style{
    padding-left: 5px;
  }
  .layout-tap{
    cursor: pointer;
  }
  .layout-device{
    text-align: center
  }
  .title-style{
    font-family: $titleFontFamily;
    font-size: $largeFontSize;
    color: white;
  }
  .text-style{
    font-family: $textFontFamily;
    font-size: $XSmallFontSize;
    color: white;
  }
  .number-style{
    font-family: $numberFontFamily;
    font-size: $XLargeFontSize;
    font-weight: bolder;
    line-height: 20px;
    color: $homeTitleNumberColor;
  }
  .jingbao-style{
    font-size: $XXLargeFontSize;
    margin-left: 50%;
    color: white;
  }
}
.icon-red{
  background-image: url('../../../assets/smartMonitor/home/homeRed.png');
  box-shadow: 0 5px 10px 0 rgba(255,122,101,0.42);
}
.icon-yellow{
  background-image: url('../../../assets/smartMonitor/home/homeYellow.png');
  box-shadow: 0 5px 10px 0 rgba(255,181,132,1);
}
.icon-blue{
  background-image: url('../../../assets/smartMonitor/home/homeBlue.png');
  box-shadow: 0 5px 10px 0 rgba(139,200,245,1);
}
</style>



