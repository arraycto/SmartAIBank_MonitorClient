<template>
<div class="entity-title">
  <el-row :gutter="20">
    <el-col :offset="2" :span="22">
      <div class="entity-title-num">
        <span class="entity-title-num-style">{{titleData}}</span>
      </div>
    </el-col>
  </el-row>
<el-row :gutter="20">
  <el-col :offset="2" :span="22">
    <div class="entity-title-layout">
      <span class="entity-title-layout-style">{{entityTitle}}</span>
    </div>
  </el-col>
</el-row>
</div>
</template>
<script>
export default {
  name: 'entityTitle',
  props: { entityTitle: String,
    titleData: {
      type: Number,
      default: function () {
        return 0
      }
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
@media screen and (min-width:1280px){
  .entity-title{
    background-image: linear-gradient(-131deg, #6C9DFB 0%, #276BEE 100%);
    border-radius: 8px;
    .entity-title-num{
      margin-top: 10px
    }
    .entity-title-num-style{
      font-family: DINAlternate-Bold;
      font-size: $XXXLargeFontSize;
      color: #FFFFFF;
      text-align: center;
    }
    .entity-title-layout{
      margin-top: 5px;
      margin-bottom: 11px;
    }
    .entity-title-layout-style{
      font-family: PingFangSC-Semibold;
      font-size: $XSmallFontSize;
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }
}
@media screen and (min-width:1920px) {
  .entity-title{
    background-image: linear-gradient(-131deg, #6C9DFB 0%, #276BEE 100%);
    border-radius: 8px;
    .entity-title-num{
      margin-top: 20px
    }
    .entity-title-num-style{
      font-family: DINAlternate-Bold;
      font-size: 32px;
      color: #FFFFFF;
      text-align: center;
    }
    .entity-title-layout{
      margin-top: 7px;
      margin-bottom: 28px;
    }
    .entity-title-layout-style{
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }
}
@media screen and (max-width:1280px){
  .entity-title{
    background-image: linear-gradient(-131deg, #6C9DFB 0%, #276BEE 100%);
    border-radius: 8px;
    .entity-title-num{
      margin-top: 10px
    }
    .entity-title-num-style{
      font-family: DINAlternate-Bold;
      font-size: $XXXLargeFontSize;
      color: #FFFFFF;
      text-align: center;
    }
    .entity-title-layout{
      margin-top: 5px;
      margin-bottom: 11px;
    }
    .entity-title-layout-style{
      font-family: PingFangSC-Semibold;
      font-size: $XSmallFontSize;
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }
}
</style>



