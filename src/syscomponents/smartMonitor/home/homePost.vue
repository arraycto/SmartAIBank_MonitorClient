<template>
<div class="post-title">
  <div class="top-style">
    <el-row :gutter="20">
          <el-col :span="12">
              <div class="post-title-style">正在处理事项</div>
          </el-col>
          <el-col :span="12">
              <div class="post-title-more" @click="moreClick">更多
              </div>
          </el-col>
    </el-row>
  </div>
  <div class="content-style">
     <el-row :gutter="5" v-for="(item,index) in homePostData" :key="index">
              <div
              :class="[item.alarmLevel===3?'icon-red':item.alarmLevel===2?'icon-yellow':'icon-blue']"
              class="one-content-style icon-dcfs dcfs-yuanquan"></div>
              <div
              :class="[item.warnType==='tran'?'text-blue':'text-x-blue']"
              class="two-content-style">{{item.name}}
              </div>
              <div class="three-content-style">{{item.description}}
              </div>
              <div class="four-content-style">{{item.alarmDate}}
              </div>
    </el-row>
  </div>
  <div class="content-no" v-if="isNo">
    暂无数据
  </div>
</div>
</template>
<script>
export default {
  name: 'postTitle',
  props: { homePostData: Array
  },
  data () {
    return {
      isNo: true
    }
  },
  mounted () {},
  methods: {
    moreClick () {
      this.$nextTick(function () {
        this.$store.commit('monitor/setBoardDoor', 'gengDuo')
      })
      this.$store.commit('monitor/updateBoard', 'warning')
    }
  },
  watch: {
    'homePostData': function (val) {
      if (val.length > 0) {
        this.isNo = false
      } else {
        this.isNo = true
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.post-title{
  background: white;
  border-radius:0.5rem;
  height: 7rem;
  .top-style{
    padding: $smallPadding 0px;
    border-bottom: 1px solid $lineColor;
    width: 97%;
    margin: 0 auto;
    .post-title-style{
      font-size: $smallFontSize;
      font-family: $titleFontFamily;
      color: $homeTitleColor;
      font-weight: bolder;
    }
    .post-title-more{
      text-align: right;
      font-family: $textFontFamily;
      font-size: $XSmallFontSize;
      color: $homeTitleColor;
      cursor: pointer;
    }
  }
  .content-style{
    width: 97%;
    margin: 0 auto;
    text-align: left;
    font-family: $textFontFamily;
    padding: $smallPadding 0px;
    .one-content-style{
      font-size: $largeFontSize;
      float: left;
    }
    .two-content-style{
      font-size: $XXSmallFontSize;
      padding-left: 5px;
      padding-top: 2px;
       float: left;
    }
    .three-content-style{
      font-size: $XSmallFontSize;
      color: $homeTitleColor;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      float: left;
      padding-left: 16px;
    }
    .four-content-style{
      font-size: $XXSmallFontSize;
      color: #9B9B9B;
      float: right;
      padding-right: 5px
    }
    .icon-red{
      color: $homeRedColor;
    }
    .icon-yellow{
      color: $homeYellowColor;
    }
    .icon-blue{
      color: #1087FF;
    }
    .text-blue{
      color: $homeBlueColor;
    }
    .text-x-blue{
      color: #5336DF
    }
  }
  .content-no{
    margin:1rem;
    text-align: center;
    color: #9B9B9B;
    font-size: 16px;
  }
}
</style>



