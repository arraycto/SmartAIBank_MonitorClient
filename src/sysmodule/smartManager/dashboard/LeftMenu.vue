<template>
<vue-scroll >
   <el-menu
        class="left-menu-height  menu-bg"
        :default-active="defaultActive"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#2F4156"
        text-color="#BFCBD9"
        active-text-color="#439AFF">
        <div v-for="(item) in menus" :key="item.resourceId">
          <!-- 一级资源处理 -->
          <el-submenu :index="item.resourceName" id="leftMenu" v-if="item.children.length>0">
            <div slot="title" class="menus-color">
              <i :class="item.icon" class="menus-icon-color"></i>
              <span>{{item.resourceName}}</span>
            </div>
            <!-- 二级资源处理 -->
            <div v-for="(item1) in item.children" :key="item1.resourceId">
              <el-submenu :index="item1.resourceName" v-if="item1.children.length>0">
                <div slot="title" :id="item1.resourceId"  class="sub-menus-color">
                  <span>{{item1.resourceName}}</span>
                </div>
                <!-- 三级资源处理 -->
                <div v-for="(item2) in item1.children" :key="item2.resourceId">
                  <el-submenu :index="item2.resourceName" v-if="item2.children.length>0">
                    <div slot="title" :id="item2.resourceId" class="sub-menus-color">
                      <span>{{item2.resourceName}}</span>
                    </div>
                    <!-- 四级资源处理 -->
                    <div v-for="(item3) in item2.children" :key="item3.resourceId">
                      <el-submenu :index="item3.resourceName" v-if="item3.children.length>0">
                        <div slot="title" :id="item3.resourceId" class="sub-menus-color">
                          <span>{{item3.resourceName}}</span>
                        </div>
                      </el-submenu>
                      <!-- 四级资源没有下级资源 -->
                      <el-menu-item :index="item3.resourceName" v-else @click="link(item3.resourceId)">{{item3.resourceName}}</el-menu-item>
                    </div>
                    </el-submenu>
                  <!-- 三级资源没有下级资源 -->
                  <el-menu-item :index="item2.resourceName" v-else @click="link(item2.resourceId)">{{item2.resourceName}}</el-menu-item>
                </div>
              </el-submenu>
              <!-- 二级资源没有下级资源 -->
              <el-menu-item :index="item1.resourceName" v-else @click="link(item1.resourceId)">{{item1.resourceName}}</el-menu-item>
            </div>
            </el-submenu>
          <!-- 一级资源没有下级资源 -->
          <el-menu-item :index="item.resourceName" v-else @click="link(item.resourceId)">
            <div class="menus-color">
              <i :class="item.icon" class="menus-icon-color"></i>
              <span>{{item.resourceName}}</span>
            </div>
          </el-menu-item>
        </div>
      </el-menu>
</vue-scroll>
</template>

<script>
var $ = require('jquery')
var conf = window.DCSpace.sysConfig
import menus from './menus'
export default {
  data () {
    return {
      menus: [],
      lastTarget: null,
      defaultActive: '我的首页'
    }
  },
  computed: {

  },
  mounted () {
    this.menus = menus.combination()
  },
  updated () {
    // $('#defaultActiveId0').trigger('click')
  },
  methods: {
    link (resourceId, event) {
      // 从配置的交易对应的路由地址查找对应的交易路由地址
      if (conf.resourceMappingArray[resourceId]) {
        this.$router.push(conf.resourceMappingArray[resourceId])
      }
    },
    // 菜单打开回调
    handleOpen (index, indexs) {
      this.$store.commit('manager/setCurrBreadcrumb', indexs)
      $('#leftMenu').find('li').removeClass('is-active')
    },
    handleClose (index, indexs) {
      $('#leftMenu').find('li').removeClass('is-active')
    },
    // 菜单激活回调
    handleSelect (index, indexs, compment) {
      this.$store.commit('manager/setCurrBreadcrumb', indexs)
    }
  },
  watch: {
    '$route.path': function () {
      const hisBreadcrumb = JSON.parse(JSON.stringify(this.$store.state.manager.breadcrumbs.hisBreadcrumb))
      if (hisBreadcrumb[this.$route.name]) { // 历史面包屑中有
        // 把历史的面包屑去除对应路由名字的面包屑赋值给当前显示的面包屑
        this.$store.commit('manager/setCurrBreadcrumb', hisBreadcrumb[this.$route.name])
        this.defaultActive = hisBreadcrumb[this.$route.name][hisBreadcrumb[this.$route.name].length - 1]
      } else { // 历史面包屑中没有
        // 把当前的面包屑数组赋值到对应的路由名字的面包屑下面
        this.$store.commit('manager/addBreadcrumb', this.$route.name)
        // this.$store.state.manager.breadcrumbs.hisBreadcrumb = hisBreadcrumb
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .top-bank-title{
    color:white;
  }
  .el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: transparent;
  }
  .el-submenu__title:focus,.el-submenu__title:hover {
    background-color: transparent;
  }
  .left-menu-height{
    height: 100%;
  }
  .menus-color{
    color: #FFFFFF;
  }
  .menus-icon-color{
    color: #FFFFFF;
    margin-right: 5px;
  }
  .sub-menus-color{
    color: #BFCBD9;
  }
</style>
