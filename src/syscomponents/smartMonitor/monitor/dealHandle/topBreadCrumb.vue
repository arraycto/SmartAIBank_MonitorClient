<template>
<div class="top">
  <div class="top-bread-crumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in baradDataList" :key="item.ORGID">
        <a :class="[index==baradDataList.length-1?'a-light':'a-nolmal']" @click="breadcrumb(item)" href="#">
          {{item.ORGNAME_CN}}
          </a></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="top-autocomplete" v-if="!isentityShow">
    <el-autocomplete
      class="inline-input"
      suffix-icon="el-icon-search"
      size="mini"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="请输入机构号或网点名称"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</div>
</template>
<script>
import base from '@/common/base'
export default {
  name: 'topBreadCrumb',
  data: function () {
    return {
      baradDataList: [],
      orgList: [], // 搜索框备选数据
      state: '',
      orginfo: {}, //
      orgTree: [], // 机构树
      branchId: '',
      isShow: true
    }
  },
  props: {
    isentityShow: {
      type: Boolean
    }
  },
  methods: {
    // 搜索匹配
    querySearch (queryString, cb) {
      var orgList = this.orgTree
      var results = queryString ? orgList.filter(this.createFilter(queryString)) : orgList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (orgList) => {
        return (orgList.ORGID.toLowerCase().indexOf(queryString.toLowerCase()) !== -1 || orgList.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    loadAll () {
      const branchList = base.getStore({ key: 'monitorUnderOrg' })
      branchList.map((item, index) => {
        var orgid = item.ORGID
        var orgname = item.ORGNAME_CN
        var value = orgid + '-' + orgname
        branchList[index]['value'] = value
      })
      return branchList
      // base.getStore({ key: 'monitorUnderOrg' }).map((item, index) => {
      //   debugger
      //   var orgid = item.ORGID
      //   var orgname = item.ORGNAME_CN
      //   var value = orgid + '-' + orgname
      //   base.getStore({ key: 'monitorUnderOrg' })[index]['value'] = value
      //   console.log(base.getStore({ key: 'monitorUnderOrg' }))
      // })

      // return base.getStore({ key: 'monitorUnderOrg' })
    },
    // 搜索框选择后触发
    handleSelect (item) {
      var self = this
      if (item.ORGLEVELID === '1' || item.ORGLEVELID === '2') {
        this.coreShow = true
        this.entityShow = false
        var dataTime1 = parseInt(new Date().getTime())
        self.$store.commit('monitor/setMonitorBankLevel', 'core')
        this.$store.commit('monitor/setManagerBranchId', item.ORGID + dataTime1)
      }
      if (item.ORGLEVELID === '3' && item.ORGTYPEID === '5') {
        this.coreShow = true
        this.entityShow = false
        var dataTime2 = parseInt(new Date().getTime())
        self.$store.commit('monitor/setMonitorBankLevel', 'core')
        this.$store.commit('monitor/setManagerBranchId', item.ORGID + dataTime2)
      }
      if (item.ORGLEVELID === '3' && item.ORGTYPEID === '1') {
        this.coreShow = false
        this.entityShow = true
        var dataTime3 = parseInt(new Date().getTime())
        self.$store.commit('monitor/setMonitorBankLevel', 'entity')
        this.$store.commit('monitor/settableBranchId', item.ORGID + dataTime3)
      }
      if (item.ORGLEVELID === '4' && item.ORGTYPEID === '1') {
        this.coreShow = false
        this.entityShow = true
        var dataTime4 = parseInt(new Date().getTime())
        self.$store.commit('monitor/setMonitorBankLevel', 'entity')
        this.$store.commit('monitor/settableBranchId', item.ORGID + dataTime4)
      }
      this.orginfo = item
      this.branchId = item.ORGID
      // this.$emit('getOrg', this.orginfo)
      this.state = ''
    },
    // 点击面包屑
    breadcrumb (item) {
      const self = this
      var dataTime = parseInt(new Date().getTime())
      if (item.ORGLEVELID === '1' || item.ORGLEVELID === '2') {
        this.$store.commit('monitor/setMonitorBankLevel', 'core')
        self.$store.commit('monitor/setManagerBranchId', item.ORGID + dataTime)
        self.orginfo = item
        self.branchId = item.ORGID
      } else if (item.ORGLEVELID === '3' && item.ORGTYPEID === '5') {
        this.$store.commit('monitor/setMonitorBankLevel', 'core')
        self.$store.commit('monitor/setManagerBranchId', item.ORGID + dataTime)
        self.orginfo = item
        self.branchId = item.ORGID
      } else if ((item.ORGLEVELID === '3' && item.ORGTYPEID === '1') || item.ORGLEVELID === '4') {
        this.$store.commit('monitor/setMonitorBankLevel', 'entity')
        self.$store.commit('monitor/settableBranchId', item.ORGID + dataTime)
        self.orginfo = item
        self.branchId = item.ORGID
      }
    },
    // 搜索框去重
    distinctOrglist (orgList) {
      for (var i = 0; i < orgList.length; i++) {
        var flag = true
        for (var j = 0; j < this.orgTree.length; j++) {
          if (orgList[i].BRANCH_STATYS_TYPE === '1')  {
            flag = false
          }
        }
        if (flag) {
          this.orgTree.push(orgList[i])
        }
      }
    },

    // 遍历数组 查找节点的父节点
    foreachAndSearchDeptParentNode (list, Id) {
      const self = this
      if (list) {
        list.map((value, index) => {
          if (Id === value.ORGID) { // 找到该节点
            if (value.PARENTORGID) { // 继续寻找该节点父节点的父节点，以此类推
              self.foreachAndSearchDeptParentNode(this.orgTree, value.PARENTORGID)
            }
            self.baradDataList.push(value)
          }
          if (Id !== value.ORGID) {
            if (value.children) {
              self.foreachAndSearchDeptParentNode(value.children, Id)
            }
          }
        })
      }
    }
    // getBreaData (listOrgId) {
    //   this.branchId = listOrgId
    //   this.baradDataList = []
    //   this.foreachAndSearchDeptParentNode(this.orgTree, this.branchId)
    // }
  },
  mounted () {
    this.branchId = base.getStore({ key: 'orgId' })
    this.orgList = this.loadAll()
    this.distinctOrglist(this.orgList)
  },
  watch: {
    branchId (newvalue) {
      this.baradDataList = []
      this.foreachAndSearchDeptParentNode(this.orgTree, this.branchId)
    },
    '$store.state.monitor.tableBranchId': function (value) {
      if (this.$store.state.monitor.tableBranchId != null) {
        this.branchId = value.substring(0, value.length - 13)
      }
    },
    isentityShow (obj) {
      if (obj) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
    // listbranchId (obj) {
    //   this.branchId = this.listbranchId
    // },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.top{
  background: #FFFFFF;
  box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
  border-radius: 8px;
  height: 50px;
}
.top-bread-crumb{
  float: left;
  margin-top: 1.2rem;
  margin-left: 1.5rem
}
.top-autocomplete{
  float: right;
  margin-top: 0.6rem;
  margin-right: 1.5rem
}
.a-light{
  font-family: PingFangSC-Regular;
  color: #000000;
}
.a-nolmal{
  color: #9B9B9B;
}
</style>
