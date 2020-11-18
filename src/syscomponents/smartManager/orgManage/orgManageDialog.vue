<template>
  <div class="org-dialog-content">
    <transition name="dialog">
      <el-dialog :title="dialogTitle" :visible.sync="isShowdialog" width="30%" top="0" fullscreen :close-on-click-modal="false">
        <div class="border-style"></div>
        <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              机构代号
            </span>
            <el-input id="orgid" v-model="orgid" placeholder class="input-style" :disabled="isEdit" @blur="validateInput('orgid','机构代号','orgIdMsg','queryOrgById')"></el-input>
          </nobr>
        </div>
        <div class="error-msg">{{orgIdMsg}}</div>
        <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              机构中文名称
            </span>
            <el-input id="name" v-model="name" placeholder class="input-style" @blur="validateInput('name','机构中文名称','nameMsg')"></el-input>
          </nobr>
        </div>
        <div class="error-msg">{{nameMsg}}</div>
        <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              办公电话
            </span>
            <el-input v-model="phoneCountry" class="phone-first-item"></el-input>
            <el-input v-model="phoneArea" placeholder="区号" class="phone-second-item"></el-input>
            <el-input id="phoneNo" v-model="phoneNo" placeholder="座机号码" class="phone-thrid-item" @blur="validateInput('phoneNo','座机号码','phoneNoMsg')"></el-input>
            <el-input v-model="phoneSubNo" placeholder="分机号" class="phone-forth-item"></el-input>
          </nobr>
        </div>
        <div class="error-msg">{{phoneNoMsg}}</div>
        <div class="address-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              通讯地址
            </span>
            <el-cascader class="input-style" :options="addressSpareArray" v-model="selectedOptions" placeholder="请选择省市区"></el-cascader>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span></span>
            <el-input id="address" v-model="address" placeholder="请输入街道名、小区、楼栋号、单元号" class="input-style" @blur="validateInput('address','详细地址','addressMsg')"></el-input>
          </nobr>
        </div>
        <div class="error-msg">{{addressMsg}}</div>
        <div class="item-padding">
          <nobr>
            <span>
              <span class="must-input">*</span>
              机构类型
            </span>
            <el-select v-model="selectedType" class="input-style" @change="orgTypeChange">
              <el-option
                v-for="item in orgTypeArray"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span style>
              <span class="must-input">*</span>
              机构级别
            </span>
            <el-select v-model="selectedLevel" class="input-style" @change="setBusinessSup">
              <el-option
                v-for="item in orgLevelArray"
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
              报表查询级别
            </span>
            <el-select v-model="reportLevel" class="input-style" :disabled="isNotManDep">
              <el-option
                v-for="item in orgReportLevelArray"
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
              业务管理上级
            </span>
            <el-select v-model="businessSuperior" class="input-style">
              <el-option
                v-for="item in businessSupArray"
                :key="item.key"
                :label="item.orgNameCn"
                :value="item.orgId"
              ></el-option>
            </el-select>
          </nobr>
        </div>
        <div class="item-padding">
          <nobr>
            <span>账务机构</span>
            <el-select v-model="accountOrg" class="input-style">
              <el-option
                v-for="item in accountOrgArray"
                :key="item.key"
                :label="item.orgNameCn"
                :value="item.orgId"
              ></el-option>
            </el-select>
          </nobr>
        </div>
        <div id="bottomBoder" class="border-style"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowdialog = false">取 消</el-button>
          <el-button type="primary" @click="submitData" :disabled="isSaveUseable">保 存</el-button>
        </span>
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import services from '../../../services'
import base from '@/common/base'
import addressDataList from '@/spareData/address.json'
export default {
  name: 'orgManageDialog',
  data () {
    return {
      flag: false,
      // 机构代号只允许新建，不允许编辑
      isEdit: false,
      // 是否显示侧滑框
      isShowdialog: false,
      isNotManDep: false,
      // 机构代号
      orgid: '',
      // 机构中文名称
      name: '',
      // 机构级别
      selectedLevel: '',
      orgLevelArray: [],
      // 机构类型
      selectedType: '',
      orgTypeArray: [],
      // 办公电话
      phoneCountry: '',
      phoneArea: '',
      phoneNo: '',
      phoneSubNo: '',
      // 通讯地址
      address: '',
      // 报表级别
      reportLevel: '',
      // 报表级别列表
      orgReportLevelArray: [],
      // 业务上级
      businessSuperior: '',
      // 业务上级列表
      businessSupArray: [],
      // 账务机构
      accountOrg: '',
      accountOrgArray: [],
      // 修改/新增
      dialogTitle: '',
      // 选择的省市区
      selectedOptions: [],
      addressSpareArray: addressDataList.address,
      // 错误提示
      orgIdMsg: '',
      nameMsg: '',
      phoneNoMsg: '',
      addressMsg: ''
    }
  },
  mounted () {
    this.getSpareData()
  },
  methods: {
    // 新增机构
    addNewItem: function () {
      this.isShowdialog = true
      this.isEdit = false
      this.dialogTitle = '新建用户信息'
      // 初始化所有数据
      this.orgid = ''
      this.name = ''
      this.phoneCountry = '86'
      this.phoneArea = ''
      this.phoneNo = ''
      this.phoneSubNo = ''
      this.selectedOptions = []
      this.address = ''
      this.selectedType = ''
      this.selectedLevel = ''
      this.reportLevel = ''
      this.businessSuperior = ''
      this.accountOrg = ''
      this.accountOrgArray = []
      this.orgIdMsg = ''
      this.nameMsg = ''
      this.phoneNoMsg = ''
      this.addressMsg = ''
      if (document.getElementById('orgid') !== null) {
        document.getElementById('orgid').style.borderColor = '#dcdfe6'
        document.getElementById('name').style.borderColor = '#dcdfe6'
        document.getElementById('phoneNo').style.borderColor = '#dcdfe6'
        document.getElementById('address').style.borderColor = '#dcdfe6'
      }
    },
    // 编辑机构
    editItem: function (showData) {
      this.isShowdialog = true
      // 编辑状态 不允许修改机构代号
      this.isEdit = true
      this.dialogTitle = '修改用户信息'
      // 返显查询数据
      this.orgid = showData.orgId || ''
      this.name = showData.orgNameCn || ''
      // 拉取业务上级等备选数据
      this.setBusinessSup(showData.orgLevelId)
      this.orgTypeChange(showData.orgTypeId)
      this.phoneCountry = showData.phoneCountry || ''
      this.phoneArea = showData.phoneArea || ''
      this.phoneNo = showData.phoneNo || ''
      this.phoneSubNo = showData.phoneSubNo || ''
      this.selectedOptions = [showData.addressProvince, showData.addressCounty, showData.addressCity]
      this.address = showData.address || ''
      this.selectedType = showData.orgTypeId || ''
      this.selectedLevel = showData.orgLevelId || ''
      this.reportLevel = showData.reportSuperior || ''
      this.businessSuperior = showData.querySuperior || ''
      this.accountOrg = showData.accountSuperior || ''
    },
    // 获取备选数据
    getSpareData: async function () {
      var self = this
      try {
        const arguResult = await services.api.base.common.getSpareData()
        self.orgLevelArray = arguResult.orgLevelList || []
        self.orgTypeArray = arguResult.orgTypeList || []
        // self.addressSpareArray = arguResult.province || []
        self.orgReportLevelArray = arguResult.reportLevelList || []
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 新增、修改，提交数据
    submitData: async function () {
      var self = this
      // 增加机构
      try {
        var submitData = new services.bean.manage.OrgInfoDomain({
          'orgId': self.orgid,
          'orgNameCn': self.name,
          'phoneCountry': self.phoneCountry,
          'phoneArea': self.phoneArea,
          'phoneNo': self.phoneNo,
          'phoneSubNo': self.phoneSubNo,
          'addressProvince': self.selectedOptions[0],
          'addressCounty': self.selectedOptions[1],
          'addressCity': self.selectedOptions[2],
          'address': self.address,
          'orgTypeId': self.selectedType,
          'orgLevelId': self.selectedLevel,
          'mediumTypeId': '1',
          'addressCountry': 'CHN',
          'reportSuperior': self.reportLevel,
          'querySuperior': self.businessSuperior,
          'accountSuperior': self.accountOrg,
          'orgStatusTypeId': '1'
        })
        if (self.isEdit) {
          await services.api.manage.orgInfo.update(self.orgid, submitData)
        } else {
          await services.api.manage.orgInfo.add(submitData)
        }
        this.$emit('needQueryData')
        self.isShowdialog = false
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 切换机构级别更新业务上级下拉
    setBusinessSup: async function (val) {
      var self = this
      try {
        self.businessSupArray = []
        self.businessSupArray = await services.api.manage.orgInfo.selectQuerySuperior(val)
        if (self.selectedType !== '4') {
          self.isNotManDep = true
          self.reportLevel = val
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 校验数据
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
    // 查询机构号是否重复
    queryOrgById: async function () {
      var self = this
      var queryData = {
        'id': self.orgid,
        'name': '',
        'type': '',
        'level': '',
        'userOrgId': base.getStore({ 'key': 'orgId' })
      }
      try {
        const queryResult = await services.api.base.org.selectByPage(queryData, 0, 1)
        if (queryResult.list && queryResult.list.length > 0) {
          this.orgIdMsg = '该机构号已存在'
          document.getElementById('orgid').style.borderColor = '#ED5013'
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 机构类型改变
    orgTypeChange: async function (val) {
      var self = this
      self.accountOrgArray = []
      if (val === '1') {
        self.accountOrgArray = [{ 'orgId': self.orgid, 'orgNameCn': self.name }]
      } else {
        try {
          self.accountOrgArray = await services.api.manage.orgInfo.selectAccountSuperior(val)
        } catch (err) {
          self.$message({
            message: err.message,
            type: 'error'
          })
        }
      }
      // 如果不为管理机构部门
      if (val !== '4') {
        self.reportLevel = self.selectedLevel
        self.isNotManDep = true
      } else {
        self.isNotManDep = false
      }
    }
  },
  watch: {
    name: function (val) {
      if (this.selectedType === '1') {
        this.accountOrgArray = [{ 'orgId': this.orgid, 'orgNameCn': val }]
      }
    }
  },
  computed: {
    isSaveUseable: function () {
      if (this.orgid === '' || this.name === '' || this.selectedLevel === '' || this.selectedType === '' ||
        this.phoneNo === '' || this.address === '' || this.reportLevel === '' || this.businessSuperior === '' || this.selectedOptions === 0 || this.orgIdMsg !== '') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "@/styles/smartManager/commom-manager.scss";
.org-dialog-content {
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
  button {
    width: $mediumBtnWidth;
    height: $mediumBtnHeight;
    border-radius: $innerBorderRadius;
    padding: $normalBtnPadding;
  }
  .phone-area {
    float: left;
  }
  .input-style {
    margin-left: $formLabelInputMagin;
    width: 80%;
  }
  .border-style {
    border-bottom: 3px solid #f6f6f6;
  }
  .item-padding {
    padding-top: $formItemPadding;
  }
  .address-padding {
    padding-top: 1.5rem;
  }
  #bottomBoder {
    padding: 42% 0 0 0;
  }
  .error-msg {
    color: $redColor;
    font-size: 10px;
    margin: 0 6.8rem;
  }
  nobr > span {
    display: inline-block;
    width: 6rem;
    text-align: right;
  }
  .must-input {
    color: $redColor;
  }
  .phone-first-item {
    width:15%;
    margin-left: $formLabelInputMagin;
  }
  .phone-second-item {
    width:15%;
  }
  .phone-thrid-item {
    width:30%;
  }
  .phone-forth-item {
    width:20%;
  }
  .phone-first-item input{
    border-radius: 5px 0 0 5px;
  }
  .phone-second-item input{
    border-radius: 0;
  }
  .phone-thrid-item input{
    border-radius: 0;
  }
  .phone-forth-item input{
    border-radius: 0 5px 5px 0;
  }
  .el-dialog__title {
    font-weight: 700;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
}
@keyframes dialog-fade-in {
  0% {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
}
</style>

