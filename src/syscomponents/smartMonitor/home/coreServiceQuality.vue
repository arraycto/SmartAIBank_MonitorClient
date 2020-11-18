<template>
<div class="service-state">
    <div class="top-style">
    <el-row :gutter="20">
          <el-col :span="16">
              <div class="service-title-style" @click="moreClick" @mouseover="mouseOver" @mouseleave="mouseLeave">服务质量 <i v-show="titleShow" class="title-icon icon-dcfs dcfs-gengduo1"></i><i v-show="!titleShow" class="title-icon-hover icon-dcfs dcfs-gengduo1"></i></div>
          </el-col>
          <el-col :span="8">
              <el-row>
                <div class="service-type-style">
                <el-col :span="12">
                  <div @click="qualitySpreadEvent('qualityTotal')" class="service-init" :class="[initindex=='qualityTotal'?'service-type':'']">整体服务质量</div>
                </el-col>
                <el-col :span="12">
                  <div @click="qualitySpreadEvent('qualitySpread')" class="service-init" :class="[initindex=='qualitySpread'?'service-type':'']">网点质量分布</div>
                </el-col>
                </div>
              </el-row>
          </el-col>
    </el-row>
  </div>
  <div class="content-style">
    <quality-total v-if="totalShow" :chartsData="totalData" :qualityTotalChartId="qualityTotalChartId"></quality-total>
    <quality-spread v-if="spreadShow" :chartsData="spreadData" :qualitySpreadChartId="qualitySpreadChartId"></quality-spread>
  </div>
</div>
</template>
<script>
import qualityTotal from './coreServiceQualityTotal'
import qualitySpread from './coreServiceQualitySpread'
import services from '../../../services'
import base from '@/common/base'

export default {
  name: 'coreServiceQuality',
  data () {
    return {
      initindex: 'qualityTotal',
      totalShow: true,
      spreadShow: false,
      totalData: {},
      spreadData: {},
      qualityTotalChartId: '',
      qualitySpreadChartId: '',
      titleShow: true
    }
  },
  components: {
    qualityTotal,
    qualitySpread
  },
  mounted () {
    const self = this
    const banklevel = base.getStore({ key: 'monitorBankLevel' })
    // const banklevel = base.getStore({key:"bankLevel"})
    if (banklevel === 'core') {
      self.qualityTotalChartId = 'corequalityTotal'
      self.qualitySpreadChartId = 'corequalitySpread'
    } else {
      self.qualityTotalChartId = 'entityqualityTotal'
      self.qualitySpreadChartId = 'entityqualitySpread'
    }
    self.getData('qualityTotal')
  },
  methods: {
    async getData (type) {
      try {
        var self = this
        let result
        if (type === 'qualityTotal') {
          result = await services.api.monitor.monitorQuality.getSumBranchQualityInfo(base.getStore({ key: 'orgId' }), 'true')
          self.totalData = result || {}
        } else if (type === 'qualitySpread') {
          result = await services.api.monitor.monitorQuality.getSumBranchLevelQualityInfo(base.getStore({ key: 'orgId' }), 'true')
          self.spreadData = result || {}
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    qualitySpreadEvent (clickName) {
      const me = this
      me.initindex = clickName
      if (clickName === 'qualityTotal') {
        me.totalShow = true
        me.spreadShow = false
      } else if (clickName === 'qualitySpread') {
        me.totalShow = false
        me.spreadShow = true
      }
      me.getData(clickName)
    },
    moreClick () {
      this.$nextTick(function () {
        this.$store.commit('monitor/setBoardDoor', 'serviceQuality')
      })
      this.$store.commit('monitor/updateBoard', 'monitor')
    },
    mouseOver () {
      this.titleShow = false
    },
    mouseLeave () {
      this.titleShow = true
    }
  },
  watch: {
    '$store.state.monitor.refreshTime': function (value) {
      const me = this
      this.getData(me.initindex)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.service-state{
  background: white;
  .top-style{
    padding-top: $middlePadding;
    border-bottom: 1px solid $lineColor;
    width: 97%;
    margin: 0 auto;
    .service-title-style{
      font-size: $smallFontSize;
      font-family: $titleFontFamily;
      color: $homeTitleColor;
      font-weight: bolder;
      cursor: pointer;
    }
    .service-type-style{
        margin:0 auto
    }
    .service-type{
        color:$homeBlueColor;
        border-bottom: 2px solid $homeBlueColor;
        padding-bottom: 5px;
        font-weight: bold;
    }
    .service-init{
        text-align: center;
        cursor: pointer;
        font-family: $textFontFamily;
        font-size: $XSmallFontSize;
    }
    .title-icon{
      font-size: $middleFontSize;
      color: $homeTitleColor;
    }
    .title-icon-hover{
      font-size: $middleFontSize;
      color: $homeBlueColor;
    }
  }
  .content-style{
    width: 97%;
    margin: 0 auto;
  }
}
</style>



