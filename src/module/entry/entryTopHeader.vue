<template>
  <div class="top-header">
    <div class="top-header-user-info">
      <img class="top-header-img" :src="defaultHeadImg" width="40" height="40"/>
      <div class="top-header-user">{{username}}</div>
      <div class="top-header-user">|</div>
      <i class="icon-dcfs dcfs-logout top-header-icon"></i>
      <div class="top-header-quit" @click="quite">退出</div>
    </div>
  </div>
</template>

<script>
import base from '@/common/base'
import websocketClient from '@/common/websocketClient'
export default {
  data () {
    return {
      username: base.getStore({ 'key': 'loginUser' }),
      defaultActive: '1',
      defaultHeadImg: require('@/assets/nav_head.png')
    }
  },
  components: {},
  computed: {

  },
  watch: {

  },
  mounted () {

  },
  methods: {
    quite () {
      this.$confirm('是否退出当前系统?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        this.$router.push('login')
        this.$store.commit('setUserName', '')
        this.$store.commit('setHttpToken', '')
        this.$store.commit('setOrgId', '')
        base.clearMap()
        websocketClient.disconnect()
        sessionStorage.clear()
        this.$message({
          type: 'success',
          message: '退出系统成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/smartManager/commom-manager.scss';
.top-header-picker{
  position: absolute;
  right: 1rem;
  top: 1rem;
}
.top-header .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover {
  background-color: transparent;
  color: $menuBg !important;
}
.top-header {
  height: $topHeadeHeight;
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
    margin-top: 5px;
  }
  .top-header-icon{
    margin-left: 1rem;
    margin-right: 1em;
    margin-top: 2px;
  }
  .top-header-quit{
    cursor: pointer;
  }
}

</style>
