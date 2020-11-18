<template>
  <div class="org-manage-main-content">
    <el-row class="row-padding">
      <el-col :span="24">
        <div class="top-button-style">
          <el-button type="primary" @click="queryOrgMsg">查询</el-button>
          <el-button @click="resetContidion">重置</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="title-padding">
      <el-col :span="24">
        <div class="trade-name">机构信息维护</div>
      </el-col>
    </el-row>
    <el-row class="query-contidion-area row-padding">
      <el-col :span="4" :offset="1">
        <div>
          <nobr>
            <label>机构代号</label>
            <el-input v-model="queryOrgId" placeholder="请输入" class="input-magin"></el-input>
          </nobr>
        </div>
      </el-col>
      <el-col :span="5" class="query-contion-magin">
        <div>
          <nobr>
            <label>机构中文名称</label>
            <el-input v-model="queryOrgName" placeholder="请输入" class="input-special-magin"></el-input>
          </nobr>
        </div>
      </el-col>
      <el-col :span="4" class="query-contion-magin">
        <div>
          <nobr>
            <label>机构级别</label>
            <el-select v-model="queryOrgLevel" placeholder="请选择" class="input-magin">
              <el-option
                v-for="item in orgLevelList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </nobr>
        </div>
      </el-col>
      <el-col :span="4" class="query-contion-magin">
        <div>
          <nobr>
            <label>机构类型</label>
            <el-select v-model="queryOrgType" placeholder="请选择" class="input-magin">
              <el-option
                v-for="item in orgTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </nobr>
        </div>
      </el-col>
    </el-row>
    <el-row class="magin-15">
      <el-col :span="24">
        <div class="separate-line"></div>
      </el-col>
    </el-row>
    <el-row class="row-padding magin-10">
      <el-col :span="24">
        <div>
          <el-button type="primary" icon="el-icon-document" @click="addNewItem" class="add-new-btn">新建</el-button>
        </div>
      </el-col>
    </el-row>
    <orgTable ref="dataTable"></orgTable>
    <orgDialog ref="addDialog" @needQueryData="queryOrgInfo()"></orgDialog>
  </div>
</template>

<script>
import orgTable from '@/syscomponents/smartManager/orgManage/orgManageTable'
import orgDialog from '@/syscomponents/smartManager/orgManage/orgManageDialog'
import services from '../../../../services'
export default {
  name: 'org_manager',
  data: function () {
    return {
      // 机构代号
      queryOrgId: '',
      // 机构中文名称
      queryOrgName: '',
      // 机构级别
      queryOrgLevel: '',
      orgLevelList: [],
      // 机构类型
      queryOrgType: '',
      orgTypeList: []
    }
  },
  mounted () {
    this.getArguService()
  },
  activated () {},
  components: {
    orgTable,
    orgDialog
  },
  methods: {
    // 新建
    addNewItem: function () {
      this.$refs.addDialog.addNewItem()
    },
    // 查询
    queryOrgMsg: function () {
      this.$refs.dataTable.queryOrgInfo(this.queryOrgId, this.queryOrgName, this.queryOrgLevel, this.queryOrgType)
    },
    // 重置
    resetContidion: function () {
      this.queryOrgId = ''
      this.queryOrgName = ''
      this.queryOrgLevel = ''
      this.queryOrgType = ''
    },
    getArguService: async function () {
      var self = this
      try {
        const arguResult = await services.api.base.common.getSpareData()
        self.orgLevelList = arguResult.orgLevelList || []
        self.orgTypeList = arguResult.orgTypeList || []
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    }
  },
  watch: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/smartManager/commom-manager.scss";
.org-manage-main-content {
    background-color: #fff;
    button {
      width: $mediumBtnWidth;
      height: $mediumBtnHeight;
      border-radius: $btnBorderRadius;
      padding: $normalBtnPadding;
    }
    .add-new-btn{
      padding: $paddBtnPadding;
    }
    .row-padding {
      padding: 0.5rem 1rem 0 2rem;
    }
    .title-padding {
      padding: 0 0 0 2rem;
    }
    .top-button-style {
       display: flex;
       display: -webkit-flex;
       justify-content: flex-end;
    }
    .trade-name {
      font-size: $fontSize18;
      color: $oneFontColor;
      font-weight: 600;
    }
    .query-contidion-area {
        padding-top: $formItemPadding;
    }
    .input-magin {
      width: 70%;
      margin-left: $formLabelInputMagin;
    }
    .input-special-magin {
      width: 66%;
      margin-left: $formLabelInputMagin;
    }
    .separate-line {
      border-bottom: 5px solid #F6F6F6;
    }
    .query-contion-magin {
      margin-left: $queryItemMagin;
    }
    .magin-10 {
      margin-top:10px;
    }
    .magin-15 {
        margin-top:15px;
      }
    label {
      font-size: $fontSize14;
      color: $twoFontColor;
    }
  }
</style>
