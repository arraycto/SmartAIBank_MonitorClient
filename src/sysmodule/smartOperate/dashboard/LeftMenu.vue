<template>
<vue-scroll >
   <el-menu
        class="left-menu-height  menu-bg"
        default-active="0"
        @open="handleOpen"
        @close="handleClose"
        background-color="#1E2D3D"
        text-color="#BFCBD9"
        active-text-color="#439AFF">

        <div v-for="(item,index) in menus" :key="item.orgId">
          <!-- 一级机构处理 -->
          <el-submenu :index="index+''" id="leftMenu" v-if="item.menus.length>0">
            <div slot="title" @click="link(item.ORGLEVELID,item,$event)" :id="'defaultActiveId'+index" class="branch-span">
              <i class="el-icon-menu" v-if="item.ORGLEVELID==1"></i>
              <span>{{item.ORGNAME_CN}}</span>
            </div>
            <!-- 二级机构处理 -->
            <div v-for="(item1,index1) in item.menus" :key="item1.orgId">
              <el-submenu :index="index+'-'+index1" v-if="item1.menus.length>0">
                <div slot="title" @click="link(item1.ORGLEVELID,item1,$event)" :id="item1.ORGID" class="branch-span">
                  <span>{{item1.ORGNAME_CN}}</span>
                </div>
                <!-- 三级机构处理 -->
                <div v-for="(item2,index2) in item1.menus" :key="item2.orgId">
                  <el-submenu :index="index+'-'+index1+'-'+index2" v-if="item2.menus.length>0">
                    <div slot="title" @click="link(item2.ORGLEVELID,item2,$event)" :id="item2.ORGID" class="branch-span">
                      <span>{{item2.ORGNAME_CN}}</span>
                    </div>
                    <!-- 四级机构处理 -->
                    <div v-for="(item3,index3) in item2.menus" :key="item3.orgId">
                      <el-submenu :index="index+'-'+index1+'-'+index2+'-'+index3" v-if="item3.menus.length>0">
                        <div slot="title" @click="link(item3.ORGLEVELID,item3,$event)" :id="item3.ORGID" class="branch-span">
                          <span>{{item3.ORGNAME_CN}}</span>
                        </div>
                      </el-submenu>
                      <!-- 判断是否是四级机构或者是三级机构但不是营业管理性机构 -->
                      <el-menu-item :index="index+'-'+index1+'-'+index2+'-'+index3" v-else> <div :id="item3.ORGID"  @click="link(((item3.ORGLEVELID=='3'&&item3.ORGTYPEID!='5')||item3.ORGLEVELID=='4')?'4':'3',item3,$event)">{{item3.ORGNAME_CN}}</div> </el-menu-item>
                    </div>
                  </el-submenu>
                  <!-- 判断是否是四级机构或者是三级机构但不是营业管理性机构 -->
                  <el-menu-item :index="index+'-'+index1+'-'+index2" v-else> <div :id="item2.ORGID"  @click="link(((item2.ORGLEVELID=='3'&&item2.ORGTYPEID!='5')||item2.ORGLEVELID=='4')?'4':'3',item2,$event)">{{item2.ORGNAME_CN}}</div> </el-menu-item>
                </div>
              </el-submenu>
              <!-- 判断是否是四级机构或者是三级机构但不是营业管理性机构 -->
              <el-menu-item :index="index+'-'+index1" v-else> <div :id="item1.ORGID"  @click="link(((item1.ORGLEVELID=='3'&&item1.ORGTYPEID!='5')||item1.ORGLEVELID=='4')?'4':'3',item1,$event)">{{item1.ORGNAME_CN}}</div> </el-menu-item>
            </div>
          </el-submenu>
          <!-- 判断是否是四级机构或者是三级机构但不是营业管理性机构 -->
          <el-menu-item :index="index+''" v-else> <div id="defaultActiveId0"  @click="link(((item.ORGLEVELID=='3'&&item.ORGTYPEID!='5')||item.ORGLEVELID=='4')?'4':'3',item,$event)">{{item.ORGNAME_CN}}</div> </el-menu-item>
        </div>
      </el-menu>
</vue-scroll>
</template>

<script>
import menus from './menu'
import base from '@/common/base'
var $ = require('jquery')
export default {
  data () {
    return {
      lastTarget: null,
      currTime: null,
      menus: []
    }
  },
  computed: {

  },
  mounted () {
    // 重新组合菜单
    this.menus = menus.combination(JSON.parse(sessionStorage.monitorUnderOrg))
  },
  updated () {
    // 渲染菜单后默认点击第一个菜单
    this.$nextTick(function () {
      $('#defaultActiveId0').trigger('click')
    })
  },
  methods: {
    link (index, item, event) {
      this.currTime = new Date().getTime()
      this.$store.commit('setOrgId', item.ORGID)
      this.$store.commit('operate/setBranchStatusType', item.BRANCH_STATYS_TYPE)
      if (index == 1) {
        this.$store.commit('operate/setbankLevel', 'core')
      } else if (index == 2 || index == 3) {
        this.$store.commit('operate/setbankLevel', 'branch')
      } else {
        this.$store.commit('operate/setbankLevel', 'entity')
      }
      this.setSelectMenuColor(event.currentTarget)
    },
    handleOpen (index) {
      $('#leftMenu').find('li').removeClass('is-active')
      // $('.el-menu-item').addClass('color', '#BFCBD9')
    },
    handleClose () {
      $('#leftMenu').find('li').removeClass('is-active')
      // $('.el-menu-item').css('color', '#BFCBD9')
    },
    // 设置选中菜单颜色
    setSelectMenuColor (event) {
      if (this.lastTarget) this.lastTarget.style.color = '#BFCBD9'
      if (event) {
        event.style.color = '#439AFF'
        this.lastTarget = event
      }
    }
  },
  watch: {
    '$store.state.orgId': function (newValue, oldValue) {
      if ($('#' + newValue)) {
        var currT = new Date().getTime()
        if ((currT - this.currTime) > 1000) {
          $('#' + newValue)[0].click()
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
  .left-menu-height{
    height: 100%;
  }
  .branch-span{
    max-width: 135px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space:nowrap;
  }
</style>
