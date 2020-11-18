<template>
  <div class="role-details" v-if="visible">
    <div class="role-dialog-wrapper">
      <div class="role-details-content">
        <div class="heade-content">
            <font>角色信息详情</font>
            <i class="new-editor-close el-icon-close" @click="$emit('hidden-dialog')"></i>
        </div>
        <div class="middle-content">
            <div class="details-item">
                <div class="item-key"> 角色代号</div>
                <div class="item-value">{{detailsData.id}}</div>
            </div>
            <div class="details-item">
                <div class="item-key"> 角色名称</div>
                <div class="item-value">{{detailsData.name}}</div>
            </div>
            <div class="details-item">
                <div class="item-key"> 所属系统</div>
                <div class="item-value">{{detailsData.systemId}}</div>
            </div>
            <div class="details-item">
                <div class="item-key"> 角色描述</div>
                <div class="item-value">{{detailsData.desc}}</div>
            </div>
            <div class="details-item">
                <div class="item-key"> 可访问资源</div>
                <div class="item-value resource-list">
                    <el-tree :data="resList"  :props="defaultProps" node-key="id"></el-tree>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <el-button size="mini" type="primary" @click="$emit('hidden-dialog')">关闭</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resourceTree from './resourceTree'

export default {
  name: 'roleDetails',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailsData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      resList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted () {
  },
  methods: {
    // 禁止页面滑动
    stop () {
      var mo = function (e) { e.preventDefault() }
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', mo, false)
    },
    // 允许页面滚动
    move () {
      var mo = function (e) { e.preventDefault() }
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', mo, false)
    }
  },
  watch: {
    visible: function (val) {
      if (val) {
        this.stop()
      } else {
        this.move()
      }
    },
    'detailsData': {
      handler (value) {
        this.$nextTick(function () {
          if (value) {
            var res = resourceTree.combination(value.resources)// 重新组合成也买展示的数据结构
            this.resList = res
          }
        })
      },
      deep: true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/smartManager/commom-manager.scss";
$padding: 15px;
.role-details {
  position: fixed;
  left: 0;
  top: $topHeadeHeight;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  .role-dialog-wrapper {
    position: fixed;
    top: $topHeadeHeight;
    right: 0;
    bottom: 0;
    overflow: auto;
    margin: 0;
    z-index: 2001;
    left: 70%;
    .role-details-content {
      position: relative;
      display: inline-block;
      margin: 0 auto;
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      background-color: white;
      height: 100%;
      z-index: 2002;
      vertical-align: top;
      box-shadow: -8px 0 5px 0 rgba(144, 142, 142, 0.5);
      padding: $padding;
      .heade-content{
        width: 100%;
        position: relative;
        font-size: $fontSize18;
        color: $oneFontColor;
        padding: 5px 0px;
        border-bottom: 1px solid $lineColor;
        .new-editor-close{
            position: absolute;
            width: 26px;
            height: 26px;
            padding: 4px;
            right: -4px;
            color: #666666;
            cursor: pointer;
        }
      }
      .middle-content{
        margin-top: $padding;
        font-size: $fontSize14;
        height: 83%;
        overflow-y: auto;
        .details-item{
            padding: 10px 0px;
            .item-key{
                display: inline-block;
                box-sizing: border-box;
                width: 25%;
                color: $twoFontColor;
                text-align: right;
                vertical-align: top;
            }
            .item-value{
                display: inline-block;
                width: 75%;
                color: $oneFontColor;
                text-align: left;
                box-sizing: border-box;
                padding-left: 10px;
                vertical-align: top;
            }
            .resource-list{
                padding-left: 0px;
            }
        }
      }

      .footer-bottom{
        position: absolute;
        bottom: $padding;
        right: $padding;
        left: $padding;
        border-top: 1px solid $lineColor;
        padding-top: 10px;
        display: inline-block;
        text-align: right;
      }
    }
  }
}
</style>


