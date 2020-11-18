<template>
  <div class="role-manage-content">
      <div class="role-manage-heade-content">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="role-manage-title">角色信息维护</div>
            </el-col>
            <el-col :span="12">
                <div class="role-manage-btn">
                    <!-- <button class="query-btn" @click="onQueryClick">查询</button> -->
                    <el-button class="query-btn" size="mini" type="primary" @click="onQueryClick">查询</el-button>
                    <el-button class="reset-btn" size="mini" @click="onResetClick">重置</el-button>
                    <!-- <button class="reset-btn" >重置</button> -->
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="input-query-info">
                    <font>角色代号</font>
                    <el-input v-model="codeValue" maxlength="10" size="mini" placeholder="请输入"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="input-query-info">
                    <font>角色名称</font>
                    <el-input v-model="nameValue" maxlength="40" size="mini" placeholder="请输入"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="input-query-info">
                    <font>所属系统</font>
                    <el-input v-model="systemValue" maxlength="10" size="mini" placeholder="请输入"></el-input>
                </div>
            </el-col>
        </el-row>
      </div>
      <div class="role-manage-bottom-content">
          <el-row :gutter="20">
            <el-col :span="24">
                <div>
                  <el-button class="new-btn" size="mini" type="primary" @click="onNewClick" icon="el-icon-document">新建</el-button>
                    <!-- <button class="new-btn" @click="onNewClick"><i class="el-icon-document"></i>&nbsp;新建</button> -->
                </div>
            </el-col>
        </el-row>
        <el-table
            ref="multipleTable"
            :data="roleList"
            tooltip-effect="dark"
            stripe
            border
            style="width: 100%;margin-top: 20px;font-size:14px;margin-bottom:45px"
            :header-row-style="{color:'#333333'}">
            <el-table-column
                prop="id"
                label="角色代号">
            </el-table-column>
            <el-table-column
                prop="name"
                label="角色名称">
            </el-table-column>
            <el-table-column
                prop="systemId"
                label="所属系统">
            </el-table-column>
            <el-table-column
                label="操作"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <button class="operation-btn compile-color" @click="onCompileClick(scope.row)">编辑</button>
                    <button class="operation-btn details-color" @click="onDetailsClick(scope.row)">详情</button>
                    <button class="operation-btn detele-color" @click="onDeleteClick(scope.row.id,scope.row.systemId)">删除</button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="totalSize"
            position="absolute"/>
      </div>
      <!-- 新建和编辑组件 -->
      <new-editor-dialog
        :visible="newEditorVisible"
        @hidden-dialog="hiddenDialog"
        :is-compile="isCompile"
        :details-data="detailsData" />
        <role-details
          :visible="detailsVisible"
          @hidden-dialog="hiddenDetails"
          :details-data="detailsData" />
  </div>
</template>

<script>
import pagination from '@/syscomponents/smartManager/pagination/pagination'
import newEditorDialog from '@/syscomponents/smartManager/roleManage/newEditorDialog'
import roleDetails from '@/syscomponents/smartManager/roleManage/roleDetails'
import services from '../../../../../services'

export default {
  name: 'RoleManage',
  components: { pagination, newEditorDialog, roleDetails },
  data () {
    return {
      codeValue: '', // 角色代号输入类容
      nameValue: '', // 角色名称输入类容
      systemValue: '', // 所属系统输入类容
      roleList: [], // 列表数据
      totalSize: 0, // 总数目
      pageSize: 10, // 每一页显示的数目
      currentPage: 1, // 当前页数
      newEditorVisible: false, // 是否显示编辑或者新建弹框
      detailsVisible: false, // 详情的弹框
      isCompile: false, // 是否是编辑
      detailsData: null
    }
  },
  mounted () {
    this.getRoleInfo()
  },
  methods: {
    // 查询
    onQueryClick () {
      this.currentPage = 1
      this.getRoleInfo()
    },
    // 重置
    onResetClick () {
      this.codeValue = ''
      this.nameValue = ''
      this.systemValue = ''
      this.currentPage = 1
      this.getRoleInfo()
    },
    // 新建
    onNewClick () {
      window.scrollTo(0, 0)// 滚动页面到顶部
      this.detailsData = null
      this.newEditorVisible = true
      this.isCompile = false
    },
    // 隐藏dialog(新建和编辑)
    hiddenDialog (isRefresh) {
      this.newEditorVisible = false
      if (isRefresh) {
        this.getRoleInfo()
      }
    },
    // 隐藏详情
    hiddenDetails () {
      this.detailsVisible = false
    },
    // 编辑
    onCompileClick (item) {
      window.scrollTo(0, 0)// 滚动页面到顶部
      this.detailsData = item
      this.newEditorVisible = true
      this.isCompile = true
    },
    // 详情
    onDetailsClick (item) {
      window.scrollTo(0, 0)// 滚动页面到顶部
      this.detailsVisible = true
      this.detailsData = item
    },
    // 删除
    async onDeleteClick (roleId, systemId) {
      try {
        var self = this
        await services.api.base.role.deleteById(roleId, systemId)
        self.$message({
          message: '删除成功',
          type: 'success'
        })
        self.getRoleInfo()
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 每页条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getRoleInfo()
    },
    // 当前页数
    handleCurrentChange (val) {
      this.currentPage = val
      this.getRoleInfo()
    },
    async getRoleInfo () {
      try {
        var self = this
        const roleCondition = {
          id: self.codeValue,
          name: self.nameValue,
          systemId: self.systemValue
        }
        const arguResult = await services.api.base.role.selectByPage(this.currentPage, this.pageSize, roleCondition)
        self.roleList = arguResult.list || []
        self.totalSize = arguResult.total || 0
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/smartManager/commom-manager.scss';
.role-manage-content{
  width: 100%;
  min-height: calc(100vh - 120px);
  background: transparent;
  .role-manage-heade-content{
    width: 100%;
    background: white;
    padding: $pageMargins;
    border-top-right-radius: $pageBorderRadius;
    border-top-left-radius: $pageBorderRadius;
    .role-manage-title{
        font-size: $fontSize16;
        color: $oneFontColor;
        font-weight: 600;
        height: 100%;
        padding: 4px 0;
    }
    .role-manage-btn{
        text-align: right;
        .query-btn{
            // outline: none;
            // background: $themeColor;
            // border-radius: 5px;
            // border: none;
            // cursor: pointer;
            font-size: $fontSize14;
            // color: white;
            // padding: 5px 15px;
        }
        .reset-btn{
            // outline: none;
            // border-radius: 5px;
            // background: white;
            // border: 1px solid $lineColor;
            // cursor: pointer;
            font-size: $fontSize14;
            // color: $twoFontColor;
            // margin-left: 15px;
            // padding: 5px 15px;
        }
    }
    .input-query-info{
        font-size: $fontSize14;
        color: $twoFontColor;
        padding: 15px 10px;
        .el-input{
            width: 65%;
            margin-left: 10px;
        }
    }
  }
  .role-manage-bottom-content{
    width: 100%;
    background: white;
    margin-top: 5px;
    padding: $pageMargins;
    border-bottom-left-radius: $pageBorderRadius;
    border-bottom-right-radius: $pageBorderRadius;
    min-height: calc(100vh*0.6);
    position: relative;
    .new-btn{
        // outline: none;
        // background: $themeColor;
        // border-radius: 5px;
        // border: none;
        // cursor: pointer;
        font-size: $fontSize14;
        // color: white;
        // padding: 5px 15px;
    }
    .delete-btn{
        outline: none;
        background: $redColor;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        font-size: $fontSize14;
        color: white;
        padding: 5px 15px;
        margin-left: 10px;
    }
    .operation-btn{
        outline: none;
        outline: none;
        border-radius: 3px;
        background: white;
        cursor: pointer;
        font-size: $fontSize14;
        margin-left: 15px;
        padding: 2px 10px;
    }
    .compile-color{
        border: 1px solid $hoverColor;
        color: $hoverColor;
    }
    .details-color{
        border: 1px solid $greenColor;
        color: $greenColor;
        margin-left: 10px;
    }
    .detele-color{
        border: 1px solid $redColor;
        color: $redColor;
        margin-left: 10px;
    }
  }
}
</style>
