<template>
  <div class="user-dialog-content">
    <transition name="dialog">
      <el-dialog :title="dialogTitle" :visible.sync="isShowdialog" width="30%" top="0" fullscreen :close-on-click-modal="false">
        <div class="border-style"></div>
         <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              用户代号
            </span>
            <el-input id="userid" v-model="userid" placeholder class="input-style" :disabled="isEdit" @blur="validateInput('userid','用户代号','userIdMsg','queryUserById')"></el-input>
          </nobr>
        </div>
        <div class="error-msg">{{userIdMsg}}</div>
          <div class="item-padding">
            <nobr>
              <span>
                <span class="must-input">*</span>
                用户名称
              </span>
              <el-input id="name" v-model="name" placeholder class="input-style" @blur="validateInput('name','用户名称','nameMsg')"></el-input>
            </nobr>
          </div>
          <div class="error-msg">{{nameMsg}}</div>
          <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              用户类型
            </span>
            <el-select v-model="selectedType" class="input-style" @blur="validateInput('selectedType','用户类型','typeMsg')">
              <el-option
                v-for="item in userTypeArray"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </nobr>
        </div>
        <div class="error-msg">{{typeMsg}}</div>
        <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              性别
            </span>
            <el-select v-model="sex" class="input-style" @blur="validateInput('sex','性别','sexMsg')">
              <el-option
                v-for="item in sexArray"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </nobr>
        </div>
        <div class="error-msg">{{sexMsg}}</div>
        <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              手机号码
            </span>
            <el-input v-model="mobileCountry" placeholder="国家代码" class="mobile-first-item"></el-input>
            <el-input id="mobileNo" v-model="mobileNo" placeholder="手机号码" class="mobile-second-item" @blur="validateInput('mobileNo','手机号码','mobileNoMsg')"></el-input>
          </nobr>
        </div>
        <div class="error-msg">{{mobileNoMsg}}</div>
        <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              所属机构
            </span>
            <el-select v-model="org" class="input-style" @blur="validateInput('org','所属机构','orgMsg')">
              <el-option
                v-for="item in orgArray"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </nobr>
        </div>
        <div class="error-msg">{{orgMsg}}</div>
        <div class="item-padding">
          <nobr>
            <span>
              所属部门
            </span>
            <el-select v-model="department" class="input-style">
              <el-option
                v-for="item in departmentArray"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              使用介质
            </span>
            <el-select v-model="medium" class="input-style" @blur="validateInput('medium','使用介质','mediumMsg')">
              <el-option
                v-for="item in mediumArray"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </nobr>
        </div>
        <div class="error-msg">{{mediumMsg}}</div>
         <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              用户角色
            </span>
            <el-input id="userRole" v-model="userRole" placeholder class="input-style-role"></el-input>
            <el-button type="primary" @click="editRole">设置</el-button>
          </nobr>
        </div>
        <div id="bottomBoder" class="border-style"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowdialog = false">取 消</el-button>
          <el-button type="primary" @click="submitData" :disabled="isSaveUseable">保 存</el-button>
        </span>
      </el-dialog>
    </transition>
    <userRoleDialog ref="userRoleDialog"></userRoleDialog>
  </div>
</template>

<script>
import services from '../../../services'
import userRoleDialog from  '@/syscomponents/smartManager/userManage/newEditorUserRoleDialog'
export default {
  name: 'userManagerDialog',
  components: { userRoleDialog },
  data () {
    return {
      // 机构代号
      userid: '',
      // 标题（新增，修改）
      dialogTitle: '',
      // 机构代号只允许新建，不允许编辑
      isEdit: false,
      // 用户名称
      name: [],
      // 是否显示侧滑框
      isShowdialog: false,
      // 用户类型
      selectedType: '',
      userTypeArray: [],
      // 性别
      sex: '',
      sexArray: [],
      // 手机号码
      mobileCountry: '',
      mobileNo: '',
      // 所属机构
      org: '',
      orgArray: [],
      // 所属部门
      department: '',
      departmentArray: [],
      // 使用介质
      medium: '',
      mediumArray: [],
      userRole: [],

      // 用户详情
      userdomain: [],
      // 错误提示
      userIdMsg: '',
      nameMsg: '',
      sexMsg: '',
      typeMsg: '',
      mobileNoMsg: '',
      orgMsg: '',
      mediumMsg: ''
    }
  },
  mounted () {
    this.getSpareData()
  },
  methods: {
    getSpareData: async function () {
      var self = this
      try {
        const arguResult = await services.api.base.common.getSpareData()
        self.userTypeArray = arguResult.orgLevelList || [] // 获取用户类型备选数据需要重新定义
        self.sexArray = arguResult.orgLevelList || [] // 获取性别备选数据需要重新定义
        self.orgArray = arguResult.orgLevelList || [] // 获取机构备选数据需要重新定义
        self.departmentArray = arguResult.orgLevelList || [] // 获取部门备选数据需要重新定义
        self.mediumArray = arguResult.mediumList || [] // 获取介质备选数据需要重新定义
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 必输字段校验
    validateInput: function (val, item, itemMsg, callback) {
      if (this[val] === '') {
        this[itemMsg] = item + '不能为空'
        document.getElementById(val).style.borderColor = '#ED5013'
      } else {
        this[itemMsg] = ''
        document.getElementById(val).style.borderColor = '#dcdfe6'
        if (callback) {
          this[callback]()
        }
      }
    },
    // 查询用户代号是否重复
    queryUserById: async function () {
      var self = this
      try {
        const queryResult = await services.api.base.user.get(self.userid)
        if (queryResult.list && queryResult.list.length > 0) {
          this.userIdMsg = '该用户号已存在'
          document.getElementById('userid').style.borderColor = '#ED5013'
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 设置角色界面
    editRole () {
      this.$refs.userRoleDialog.roleItem()
    },
    // 新建用户信息界面
    addNewItem: function () {
      this.isShowdialog = true
      this.isEdit = false
      this.dialogTitle = '新建用户信息'
      // 初始化所有数据
      this.userid = ''
      this.name = ''
      this.selectedType = ''
      this.sex = ''
      this.mobileCountry = ''
      this.mobileNo = ''
      this.org = ''
      this.department = ''
      this.medium = ''
      this.userIdMsg = ''
      this.nameMsg = ''
      this.sexMsg = ''
      this.typeMsg = ''
      this.mobileNoMsg = ''
      this.orgMsg = ''
      this.mediumMsg = ''
      if (document.getElementById('userid') !== null) {
        document.getElementById('userid').style.borderColor = '#dcdfe6'
        document.getElementById('name').style.borderColor = '#dcdfe6'
      }
    },
    // 编辑用户信息
    editItem: async function (showData) {
      try {
        const queryResult = await services.api.base.user.get(showData)
        this.isShowdialog = true
        // 编辑状态 不允许修改机构代号
        this.isEdit = true
        this.dialogTitle = '修改用户信息'
        // 返显查询数据
        this.userid = queryResult.id || ''
        this.name = queryResult.name || ''
        this.mobileCountry = queryResult.mobile.country || ''
        this.mobileNo = queryResult.mobile.no || ''
        this.sex = queryResult.gender || ''
        this.org = queryResult.orgId || ''
        this.department = queryResult.departmentId || ''
        this.medium = queryResult.mediumType || ''
        this.selectedType = queryResult.userType || ''
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 提交数据
    submitData: async function () {
      var self = this
      var user = {
        'id': self.userid,
        'name': self.name,
        'userType': self.selectedType,
        'gender': self.sex,
        'orgId': self.org,
        'mediumType': self.medium,
        'mobile.country': self.mobileCountry,
        'departmentId': self.department
      }
      try {
        if (self.isEdit) {
          await services.api.base.user.update(user, self.userid)
        } else {
          await services.api.base.user.add(user)
        }
        self.isShowdialog = false
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    }

  },
  computed: {
    isSaveUseable: function () {
      if (this.userid === '' || this.name === '' || this.selectedLevel === '' || this.selectedType === '' ||
        this.sex === '' || this.mobileNo === '' || this.medium === '' || this.org === '') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss">
@import "@/styles/smartManager/commom-manager.scss";
.user-dialog-content {
  .el-dialog__wrapper {
    left: 70%;
  }
  .el-dialog__wrapper > div:first-child{
    min-width: 36rem;
  }
  .el-dialog__header span {
    font-size: $fontSize16;
    font-weight: 700;
  }
  .border-style {
    border-bottom: 3px solid #f6f6f6;
  }
  .item-padding {
    padding-top: $formItemPadding;
  }
  .input-style {
    margin-left: $formLabelInputMagin;
    width: 80%;
  }
  .must-input {
    color: $redColor;
  }
  nobr > span {
    display: inline-block;
    width: 6rem;
    text-align: right;
  }
  .error-msg {
    color: $redColor;
    font-size: 10px;
    margin: 0 6.8rem;
  }
  .mobile-first-item {
    width:30%;
    margin-left: $formLabelInputMagin;
  }
  .mobile-second-item {
    width:50%;
  }
  .mobile-first-item input{
    border-radius: 5px 0 0 5px;
  }
  .mobile-second-item input{
    border-radius: 0 5px 5px 0;
  }
  .input-style-role {
    margin-left: $formLabelInputMagin;
    width: 70%;
  }
  .button-style {
    margin-left: $formLabelInputMagin;
  }
  #bottomBoder {
    padding: 42% 0 0 0;
  }
  button {
    width: $mediumBtnWidth;
    height: $mediumBtnHeight;
    border-radius: $innerBorderRadius;
    padding: $normalBtnPadding;
  }
  .el-dialog__title {
    font-weight: 700;
  }
}
</style>
