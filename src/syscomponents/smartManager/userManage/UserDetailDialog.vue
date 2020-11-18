<template>
  <div class="user-dialog-content">
    <transition name="detaidialog">
      <el-dialog title="用户详情信息" :visible.sync="isShowdialog" width="30%" top="0" fullscreen :close-on-click-modal="false">
        <div class="border-style"></div>
         <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              用户代号
            </span>
            <el-input id="userid" v-model="userid" placeholder class="input-style" :disabled="true" ></el-input>
          </nobr>
        </div>
          <div class="item-padding">
            <nobr>
              <span>
                <span class="must-input">*</span>
                用户名称
              </span>
              <el-input id="name" v-model="name" placeholder class="input-style" :disabled="true" ></el-input>
            </nobr>
          </div>
          <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              用户类型
            </span>
            <el-select v-model="selectedType" class="input-style" :disabled="true" >
              <el-option
                v-for="item in userTypeArray"
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
              性别
            </span>
            <el-select v-model="sex" class="input-style" :disabled="true" >
              <el-option
                v-for="item in sexArray"
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
              手机号码
            </span>
            <el-input v-model="mobileCountry" placeholder="国家代码" class="mobile-first-item" :disabled="true" ></el-input>
            <el-input id="mobileNo" v-model="mobileNo" placeholder="手机号码" class="mobile-second-item" :disabled="true" ></el-input>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              所属机构
            </span>
            <el-select v-model="org" class="input-style" :disabled="true" >
              <el-option
                v-for="item in orgArray"
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
              所属部门
            </span>
            <el-select v-model="department" class="input-style" :disabled="true" >
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
            <el-select v-model="medium" class="input-style" :disabled="true" >
              <el-option
                v-for="item in mediumArray"
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
              用户角色
            </span>
            <el-input id="userRole" v-model="userRole" placeholder class="input-style-role" :disabled="true" ></el-input>
            <el-button type="primary" @click="editRole">查看</el-button>
          </nobr>
        </div>
        <div id="bottomBoder" class="border-style"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowdialog = false">取 消</el-button>
          <el-button type="primary" @click="isShowdialog = false">确定</el-button>
        </span>
      </el-dialog>
    </transition>
  </div>
</template>
<script>
import services from '../../../services'
export default {
  name: 'orgManageDialog',
  data () {
    return {
      // 机构代号
      userid: '',
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
      userRole: []
    }
  },
  mounted () {
    this.getSpareData()
  },
  methods: {
    getSpareData: async function () {
      var self = this
      try {
        const arguResult = await services.api.base.commonQuery.getSpareData()
        self.userTypeArray = arguResult.orgLevelList || [] // 获取用户类型备选数据需要重新定义
        self.sexArray = arguResult.orgLevelList || [] // 获取性别备选数据需要重新定义
        self.orgArray = arguResult.orgLevelList || [] // 获取机构备选数据需要重新定义
        self.departmentArray = arguResult.orgLevelList || [] // 获取部门备选数据需要重新定义
        self.mediumArray = arguResult.orgLevelList || [] // 获取介质备选数据需要重新定义
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    editRole () {

    },
    // 用户信息详情
    detaiItem: async function (showData) {
      try {
        var queryResult
        // const queryResult = await services.api.base.user.get(showData)
        this.isShowdialog = true
        // 编辑状态 不允许修改机构代号
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
        this.userRole = queryResult.userType || []
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    }
  },
  computed: {
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
    width:15%;
    margin-left: $formLabelInputMagin;
  }
  .mobile-second-item {
    width:65%;
  }
  .mobile-first-item input{
    border-radius: 5px 0 0 5px;
  }
  .phone-second-item input{
    border-radius: 0 5px 5px 0;
  }
  .input-style-role {
    margin-left: $formLabelInputMagin;
    width: 60%;
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
