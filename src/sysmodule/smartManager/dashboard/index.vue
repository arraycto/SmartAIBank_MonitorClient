<template>
<div class="index-main">
  <el-row class="index-header">
    <el-col :span="3">
        <div class="index-logo">
        </div>
    </el-col>
    <el-col :span="5">
        <div class="index-sysName-manage">
            |&nbsp;&nbsp;&nbsp;&nbsp;智能网点系统平台
        </div>
    </el-col>
    <el-col  :span="16" >
        <top-header></top-header>
    </el-col>
  </el-row>
  <el-row class="index-content">
  <el-col :span="4" class="index-left menu-bg">
     <left-menu></left-menu>
  </el-col>
   <el-col :push="4" :span="20" class="index-right">
     <el-row :span="24" class="index-tags-content-manage"><tags-view></tags-view></el-row>
     <el-row :span="24" class="index-bread-content-manage">
       <el-breadcrumb separator="/">
         <el-breadcrumb-item v-for="item in baradDataList" :key="item.id">{{item}}</el-breadcrumb-item>
       </el-breadcrumb>
     </el-row>
     <el-row :span="24" class="index-right-content">
        <div>
          <keep-alive>
            <router-view/>
          </keep-alive>
        </div>
      </el-row>
   </el-col>
  </el-row>
  </div>
</template>

<script>
// import data from "../dummy/index.json"
import TagsView from './TagsView.vue'
import LeftMenu from './LeftMenu.vue'
import TopHeader from './TopHeader.vue'
import base from '@/common/base'
export default {
  name: 'index',
  data: function () {
    return {
      baradDataList: ['我的首页']
    }
  },
  components: {
    TagsView,
    LeftMenu,
    TopHeader
  },
  mounted () {
    base.init(this)
  },
  methods: {},
  watch: {
    // 监听当前面包屑是否发生变化
    '$store.state.manager.breadcrumbs.currBreadcrumb': {
      handler (value) {
        this.$nextTick(function () {
          this.baradDataList = value
        })
      },
      deep: true
    }
  }
}
</script>

<style>
.index-header{
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.index-main{
 position:absolute;
 width:100%;
 height:100%;
 min-width: 1280px;
}
.index-content{
  min-height: calc(100vh - 75px);
  background: #F6F6F6;
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
.index-logo{
  background-image: url('../../../assets/jjLogo.png');
  background-size: auto;
  background-repeat: no-repeat;
  height: 45px;
  margin-left: 1rem;
  margin-top: 1.2rem;
}
.index-sysName-manage {
  font-weight: bold;
  color: #004E98;
  margin-top: 1.5rem;
}
</style>
