<template>
    <div class="user-manager-content">
        <div class="user-manager-heade-content">
             <el-row :gutter="20">
                 <el-col :span="12">
                     <div class="user-manage-title">用户信息维护</div>
                 </el-col>
                 <el-col :span="12">
                     <div class="user-manage-btn">
                        <!--<button class="queryUser-btn" @click="queryUserClick">查询</button>-->
                        <el-button class="queryUser-btn" size="medium" type="primary" @click="queryUserClick">查询</el-button>
                        <el-button class="resetUser-btn" size="medium" @click="resetUserClick">重置</el-button>
                        <!--<button class="resetUser-btn" @click="ResetUserClick">重置</button>-->
                     </div>
                 </el-col>
             </el-row>
             <el-row :gutter="20">
                 <el-col :span="6">
                    <div class="input-queryUser-info">
                        <font>用户代号</font>
                        <el-input v-model="queryUserId" maxlength="10" size="mini" placeholder="请输入"></el-input>
                    </div>
                 </el-col>
                 <el-col :span="6">
                     <div class="input-queryUser-info">
                         <font>用户名称</font>
                        <el-input v-model="queryUserName" maxlength="10" size="mini" placeholder="请输入"></el-input>
                     </div>
                 </el-col>
                 <el-col :span="6">
                     <div class="select-queryUser-info">
                         <font>所属机构</font>
                        <el-select v-model="queryOrg" placeholder="请选择" size="mini">
                            <el-option
                                v-for="item in orgList"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key"
                            ></el-option>
                        </el-select>
                     </div>
                 </el-col>
                 <el-col :span="6">
                     <div class="select-queryUser-info">
                         <font>所属部门</font>
                        <el-select v-model="queryDepartment" placeholder="请选择"  size="mini">
                            <el-option
                                v-for="item in departmentList"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key"
                            ></el-option>
                        </el-select>
                     </div>
                 </el-col>
             </el-row>
             <el-row>
                 <el-col :span="6">
                     <div class="select-queryUser-info">
                         <font>用户角色</font>
                        <el-select v-model="queryRole" placeholder="请选择"  size="mini">
                            <el-option
                                v-for="item in roleList"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key"
                            ></el-option>
                        </el-select>
                     </div>
                 </el-col>
             </el-row>
        </div>
        <div class="user-manager-bottom-content">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div>
                        <el-button class="query-btn" size="medium" type="primary" @click="addUser">新建</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-table
                ref="multipleTable"
                :data="userList"
                tooltip-effect="dark"
                stripe
                border
                style="width: 100%;margin-top: 20px;font-size:14;pxmargin-bottom:45px"
                :header-row-style="{color:'#333333'}">
                <el-table-column prop="userId" label="用户代号"></el-table-column>
                <el-table-column prop="userName" label="用户名称" width="250"></el-table-column>
                <el-table-column prop="userRole" label="用户角色" width="235"></el-table-column>
                <el-table-column prop="orgName" label="所属机构" width="250"></el-table-column>
                <el-table-column prop="departmentName" label="所属部门" width="250"></el-table-column>
                <el-table-column label="操作" width="250" show-overflow-tooltip>
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="onCompileClick(scope.row.userId)"
                        plain
                    >编辑</el-button>
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleEdit(scope.row)"
                        plain
                    >详情</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="onDeleteClick(scope.row.userId)"
                        plain
                    >删除</el-button>
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
        <userDialog ref="userDialog"></userDialog>
        <detailDialog ref="detailDialog"></detailDialog>
    </div>
</template>

<script>
import pagination from '@/syscomponents/smartManager/pagination/pagination'
import userDialog from  '@/syscomponents/smartManager/userManage/newEditorUserDialog'
import detailDialog from  '@/syscomponents/smartManager/userManage/UserDetailDialog'
import services from '../../../../services'
export default {
  name: 'UserManage',
  // eslint-disable-next-line vue/no-unused-components
  components: { pagination, userDialog, detailDialog },
  data: function () {
    return {
      totalSize: 0, // 总数目
      pageSize: 10, // 每一页显示的数目
      currentPage: 1, // 当前页数
      // 用户id
      queryUserId: '',
      // 用户名
      queryUserName: '',
      // 所属机构
      queryOrg: '',
      orgList: [],
      // 所属部门
      queryDepartment: '',
      departmentList: [],
      // 用户角色
      queryRole: '',
      roleList: [],
      // 用户集合
      userList: [{
        userId: '12345',
        userName: '测试',
        userRole: ['总行', '分行'],
        orgName: '管理机构',
        departmentName: '科技部'
      },
      {
        userId: '12346',
        userName: '测试1',
        userRole: ['总行1', '分行1'],
        orgName: '管理机构1',
        departmentName: '科技部1'
      }]
    }
  },
  mounted () {
    console.log('11111111')
    // this.userRole = this.userRole.tostring()
    this.getArguService()
  },
  methods: {
    // 查询
    queryUserClick: function () {
      this.currentPage = 1
      this.getUserInfo()
    },
    // 重置
    resetUserClick: function () {
      this.queryUserId = ''
      this.queryUserName = ''
      this.queryOrg = ''
      this.queryDepartment = ''
      this.queryRole = ''
      this.currentPage = 1
    },
    // 编辑
    onCompileClick: function (userId) {
      this.$refs.userDialog.editItem(userId)
    },
    // 详情
    handleEdit: function (userId) {
      this.$refs.detailDialog.detaiItem(userId)
    },
    // 查询备选数据
    getArguService: async function () {
      var self = this
      try {
        const arguResult = await services.api.base.commonQuery.getSpareData()
        self.orgList = arguResult.orgList || []
        self.departmentList = arguResult.departmentList || []
        self.roleList = arguResult.orgList || []
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 新建用户
    addUser: function () {
      this.$refs.userDialog.addNewItem()
    },
    // 隐藏dialog(新建和编辑)
    hiddenDialog (isRefresh) {
      this.newEditorVisible = false
      if (isRefresh) {
        this.getRoleInfo()
      }
    },
    // 每页条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getUserInfo()
    },
    // 当前页数
    handleCurrentChange (val) {
      this.currentPage = val
      this.getUserInfo()
    },
    // 调用分页查询接口
    getUserInfo () {
    // 定义对象
    // eslint-disable-next-line no-unused-vars
      var obj = { 'id': this.queryUserId, 'name': this.queryUserName, 'orgId': this.queryOrg, 'departmentId': this.queryDepartment, 'roles': [this.queryRole] }
      this.$services.api.base.user.selectByPage(this.currentPage, this.pageSize, obj).then((result) => {
        this.userList = result.list
        this.totalSize = result.total
      }).catch((err) => {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      })
    },
    // 发送后台服务删除用户
    onDeleteClick (userId) {
      this.$services.api.base.user.deleteById(userId).then((result) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getUserInfo()
      }).catch((err) => {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      })
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/smartManager/commom-manager.scss';
.user-manager-content{
  width: 100%;
  min-height: calc(100vh - 120px);
  background: transparent;
  .user-manager-heade-content{
    width: 100%;
    background: white;
    padding: $pageMargins;
    border-top-right-radius: $pageBorderRadius;
    border-top-left-radius: $pageBorderRadius;
    .user-manage-title{
        font-size: $fontSize18;
        color: $oneFontColor;
        font-weight: 600;
        height: 100%;
        padding: 4px 0;
    }
    .user-manage-btn{
        text-align: right;
        .queryUser-btn{
            outline: none;
            background: $themeColor;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            font-size: $fontSize14;
            color: white;
            padding: 5px 15px;
        }
        .resetUser-btn{
            outline: none;
            border-radius: 5px;
            background: white;
            border: 1px solid $lineColor;
            cursor: pointer;
            font-size: $fontSize14;
            color: $twoFontColor;
            margin-left: 15px;
            padding: 5px 15px;
        }
    }
    .input-queryUser-info{
        font-size: $fontSize14;
        color: $twoFontColor;
        padding: 10px 10px;
        .el-input{
            width: 65%;
            margin-left: 10px;
        }
    }
    .select-queryUser-info{
        font-size: $fontSize14;
        color: $twoFontColor;
        padding: 10px 10px;
        .el-select{
            width: 150px;
            margin-left: 10px;
        }
    }
  }
    .user-manage-bottom-content{
    width: 100%;
    background: white;
    margin-top: 5px;
    padding: $pageMargins;
    border-bottom-left-radius: $pageBorderRadius;
    border-bottom-right-radius: $pageBorderRadius;
    min-height: calc(100vh*0.5);
    .newuser-btn{
        padding: $paddBtnPadding;
    }
    .deleteuser-btn{
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
    }
  }
</style>
