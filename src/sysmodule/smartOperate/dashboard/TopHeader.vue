<template>
  <div class="top-header">
    <div v-if="bankLevel==&quot;core&quot;">
      <el-menu
        :default-active="defaultActive"
        mode="horizontal"
        text-color="#A1ADBC">
        <el-menu-item
          index="1"
          @click="linkPanel(&quot;Core&quot;,&quot;Survey&quot;)">
          概况
        </el-menu-item>
        <el-menu-item
          index="2"
          @click="linkPanel(&quot;Core&quot;,&quot;Custflow&quot;)">
          客流
        </el-menu-item>
        <el-menu-item
          index="3"
          @click="linkPanel(&quot;Core&quot;,&quot;Queue&quot;)">
          排队
        </el-menu-item>
        <el-menu-item
          index="4"
          @click="linkPanel(&quot;Core&quot;,&quot;BusiEfficiency&quot;)">
          业务效率
        </el-menu-item>
        <el-menu-item
          index="5"
          @click="linkPanel(&quot;Core&quot;,&quot;ServiceQuality&quot;)">
          服务质量
        </el-menu-item>
        <el-menu-item
          index="6"
          @click="linkPanel(&quot;Core&quot;,&quot;HallMarket&quot;)">
          厅堂营销
        </el-menu-item>
      </el-menu>
    </div>
    <div v-if="bankLevel==&quot;branch&quot;">
      <el-menu
        :default-active="defaultActive"
        mode="horizontal"
        text-color="#A1ADBC">
        <el-menu-item
          index="1"
          @click="linkPanel(&quot;Branch&quot;,&quot;Survey&quot;)">
          概况
        </el-menu-item>
        <el-menu-item
          index="2"
          @click="linkPanel(&quot;Branch&quot;,&quot;Custflow&quot;)">
          客流
        </el-menu-item>
        <el-menu-item
          index="3"
          @click="linkPanel(&quot;Branch&quot;,&quot;Queue&quot;)">
          排队
        </el-menu-item>
        <el-menu-item
          index="4"
          @click="linkPanel(&quot;Branch&quot;,&quot;BusiEfficiency&quot;)">
          业务效率
        </el-menu-item>
        <el-menu-item
          index="5"
          @click="linkPanel(&quot;Branch&quot;,&quot;ServiceQuality&quot;)">
          服务质量
        </el-menu-item>
        <el-menu-item
          index="6"
          @click="linkPanel(&quot;Branch&quot;,&quot;HallMarket&quot;)">
          厅堂营销
        </el-menu-item>
      </el-menu>
    </div>
    <div v-if="bankLevel==&quot;entity&quot;">
      <el-menu
        :default-active="defaultActive"
        mode="horizontal"
        text-color="#A1ADBC">
        <el-menu-item
          index="1"
          class="el-menu-item-entity"
          @click="linkPanel(&quot;Entity&quot;,&quot;Survey&quot;)">
          概况
        </el-menu-item>
        <el-menu-item
          index="2"
          class="el-menu-item-entity"
          @click="linkPanel(&quot;Entity&quot;,&quot;Custflow&quot;)">
          客流
        </el-menu-item>
        <el-menu-item
          index="3"
          class="el-menu-item-entity"
          @click="linkPanel(&quot;Entity&quot;,&quot;Queue&quot;)">
          排队
        </el-menu-item>
        <el-menu-item
          index="4"
          class="el-menu-item-entity"
          @click="linkPanel(&quot;Entity&quot;,&quot;BusiEfficiency&quot;)">
          业务效率
        </el-menu-item>
        <el-menu-item
          index="5"
          class="el-menu-item-entity"
          @click="linkPanel(&quot;Entity&quot;,&quot;ServiceQuality&quot;)">
          服务质量
        </el-menu-item>
        <el-menu-item
          index="6"
          class="el-menu-item-entity"
          @click="linkPanel(&quot;Entity&quot;,&quot;HallMarket&quot;)">
          厅堂营销
        </el-menu-item>
        <el-menu-item
          index="7"
          class="el-menu-item-entity"
          @click="linkPanel(&quot;Entity&quot;,&quot;custMovingLine&quot;)">
          客户动线
        </el-menu-item>
        <el-menu-item
          index="8"
          class="el-menu-item-entity"
          @click="linkPanel(&quot;Entity&quot;,&quot;bankteller&quot;)">
          柜员视角
        </el-menu-item>
      </el-menu>
    </div>

    <div v-if="!batchShow" class="top-header-user-info-hideen-batch">
      <img
        class="top-header-img"
        :src="defaultHeadImg"
        width="40"
        height="40">
      <div class="top-header-user-hideen-batch">
        {{ username }}
      </div>
      <div
        v-if="showSwitchSys"
        class="top-header-quit-hideen-batch"
        @click="quite">
        <i class="icon-dcfs dcfs-cut-system" />
        切换
      </div>
      <div
        class="top-header-quitSys-hideen-batch"
        @click="quiteSys">
        <i class="icon-dcfs dcfs-logout top-header-icon" />退出
      </div>
    </div>

    <div v-if="batchShow" class="top-header-user-info">
      <div class="dropdown">
        <el-menu
          mode="horizontal"
          @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">
              <img
                class="top-header-img"
                :src="defaultHeadImg"
                width="30"
                height="30">
              <span class="span-style-index">{{ username }}</span>
            </template>
            <el-menu-item index="1-1">
              跑批结果查询
              <img
                class="batch-result-png"
                width="20"
                height="20">
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div
        v-if="showSwitchSys"
        class="top-header-quit"
        @click="quite">
        <i class="icon-dcfs dcfs-cut-system" />
        切换
      </div>
      <div
        class="top-header-quitSys"
        @click="quiteSys">
        <i class="icon-dcfs dcfs-logout top-header-icon" />退出
      </div>
    </div>

    <div>
      <batchResultSummaryDialog ref="batchResultSummaryDialog" />
    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
import batchResultSummaryDialog from '@/syscomponents/smartOperate/batchResult/batchResultSummaryDialog'
import base from '@/common/base'
export default {
  data () {
    return {
      username: base.getStore({ 'key': 'loginUser' }),
      defaultActive: '1',
      defaultHeadImg: require('@/assets/nav_head.png'),
      showSwitchSys: true,
      userOrgId: base.getStore({ key: 'userOrgId' }),
      batchShow: false
    }
  },
  components: { ThemePicker ,batchResultSummaryDialog },
  computed: {
    bankLevel: function () {
      return base.getStore({ key: 'operate' }).bankLevel
    },
    orgId: function () {
      return base.getStore({ key: 'orgId' })
    }
  },
  watch: {
    bankLevel: function () {
      this.linkIndex()
    },
    orgId: function () {
      this.linkIndex()
    },
    $route (to, from) {
      this.menuDefaultActive(to.name)
    }
  },
  mounted () {
    var clientConfig = window.DCSpace.sysConfig
    var batchOrgList = clientConfig.batchOrgList
    if (batchOrgList && batchOrgList.indexOf(this.userOrgId) > -1) {
      this.batchShow = true
    }
    var sysArrayStr = sessionStorage.sysArray
    var sysArray = JSON.parse(sysArrayStr)
    if (sysArray.length <= 1) {
      this.showSwitchSys = false
    }
    this.linkIndex()
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1-1') {
        this.modifyPassword()
      }
    },
    modifyPassword () {
      this.$refs.batchResultSummaryDialog.getBatchSummary()
    },
    linkIndex () {
      var currRoute = this.$route
      // 当改变总、分、支行才改变路由
      if (currRoute.path.indexOf(this.bankLevel + '_') < 0) {
        this.$router.push(this.bankLevel + '_survey')
      }
    },
    linkPanel (type, url, e) {
      var input = document.getElementsByClassName('el-menu-item')
      for (let index = 0; index < input.length; index++) {
        input[index].blur()
      }
      var routerUrl = type + '_' + url
      this.$router.push(routerUrl)
    },
    quite () {
      this.$router.push('entry')
    },
    quiteSys () {
      this.$confirm('是否退出当前系统?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        this.$router.push('login')
        this.$store.commit('setUserName', '')
        this.$store.commit('setHttpToken', '')
        this.$store.commit('setOrgId', '')
        this.$store.commit('operate/setBranchStatusType', '')
        this.$store.commit('operate/DEL_ALL_VISITED_VIEWS')
        base.clearMap()
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
    },
    menuDefaultActive (routeName) {
      if (routeName.indexOf('_survey') >= 0) {
        this.defaultActive = '1'
      } else if (routeName.indexOf('_custflow') >= 0) {
        this.defaultActive = '2'
      } else if (routeName.indexOf('_queue') >= 0) {
        this.defaultActive = '3'
      } else if (routeName.indexOf('_busiEfficiency') >= 0) {
        this.defaultActive = '4'
      } else if (routeName.indexOf('_serviceQuality') >= 0) {
        this.defaultActive = '5'
      } else if (routeName.indexOf('_hallMarket') >= 0) {
        this.defaultActive = '6'
      } else if (routeName.indexOf('_custMovingLine') >= 0) {
        this.defaultActive = '7'
      } else if (routeName.indexOf('_bankteller') >= 0) {
        this.defaultActive = '8'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/variables.scss";
.top-header-picker {
  position: absolute;
  right: 1rem;
  top: 1rem;
}
.top-header {
  margin-top: 1rem;
}
.top-header .el-menu-item-entity {
  padding: 0 2.6rem;
}
.top-header .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover {
  background-color: transparent;
  color: $menuBg !important;
}
.top-header-user-info {
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 4rem;
  top: -1rem;
  .top-header-user {
    margin-left: 1rem;
    margin-right: 1em;
    margin-top: 5px;
  }
  .top-header-quit {
    margin-right: 10px;
    cursor: pointer;
    margin-top: 1rem;
  }
  .top-header-quitSys {
    cursor: pointer;
    margin-top: 1rem;
  }
.dropdown {
  .span-style-index{
    padding-left: 10px;
    position: relative;
    font-size: 16px
  }
  .top-header-img {
    text-align: center;
  }
  .el-submenu__title i {
      display:none;
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title {
      height: 60px;
      padding-top: 15px;
      line-height: 50px;
      color:#000000;
      border-bottom: 0px solid #ffffff;
    }
    .el-submenu__title {
      font-size: 14px;
      color: #303133;
      padding: 0 15px 0 10px;
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
      background-image: linear-gradient(#e7edf7, #ffffff);
      border-bottom: 0px solid #ffffff;
    }
  }
}
.el-menu--popup-bottom-start {
    margin-top: -3px;
}
.el-menu--horizontal .el-menu .el-menu-item{
  border-left: 3px solid #ffffff;
  height: 45px;
  line-height: 45px;
  color: #000000;
  padding-left: 30px;
  .batch-result-png{
    position: relative;
    float:right;
    top:  10px;
    content:url('../../../assets/exchange_false.png');
  }
}
.el-menu--horizontal .el-menu .el-menu-item.is-active{
    color: #000000;
    border-left: 3px solid #ffffff;
}
.el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 81px;
    line-height: 60px;
    border-bottom: 0px solid #FFF;
    color: #9FF;
    border: none;
}
.el-menu--horizontal .el-menu .el-menu-item:hover{
  border-left: 3px solid #3881f0;
  .batch-result-png{
    content:url('../../../assets/exchange_true.png');
  }
  color: #3881f0;
}
.el-menu.el-menu--horizontal{
  border-bottom: none!important;
  margin-top: 1.1rem;
}
.top-header-user-info-hideen-batch {
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 4rem;
  top: 0.8rem;
  .top-header-user-hideen-batch {
    margin-left: 1rem;
    margin-right: 1em;
    margin-top: 4px;
  }
  .top-header-quit-hideen-batch {
    margin-right: 10px;
    cursor: pointer;
  }
  .top-header-quitSys-hideen-batch {
    cursor: pointer;
  }
}
</style>
