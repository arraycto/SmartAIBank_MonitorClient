<template>
  <div class="org-detail-content">
    <transition name="detailDialog">
      <el-dialog title="机构信息详情" :visible.sync="isShowdialog" width="30%" top="0" fullscreen :close-on-click-modal="false">
        <div class="border-style"></div>
        <div>
          <nobr>
            <span>
              机构代号
            </span>
            <label>{{orgid}}</label>
          </nobr>
        </div>
        <div>
          <nobr>
            <span>
              机构中文名称
            </span>
            <label>{{name}}</label>
          </nobr>
        </div>
        <div>
          <nobr>
            <span>
              办公电话
            </span>
            <label>{{orgPhone}}</label>
          </nobr>
        </div>
        <div>
          <nobr>
            <span>
              通讯地址
            </span>
            <label>{{address}}</label>
          </nobr>
        </div>
        <div>
          <nobr>
            <span>
            </span>
            <label>{{detailAddress}}</label>
          </nobr>
        </div>
        <div>
          <nobr>
            <span>
              机构类型
            </span>
            <label>{{orgType}}</label>
          </nobr>
        </div>
        <div>
          <nobr>
            <span style="">
              机构级别
            </span>
            <label>{{orgLevel}}</label>
          </nobr>
        </div>
        <div>
          <nobr>
            <span>
              报表查询级别
            </span>
            <label>{{reportLevel}}</label>
          </nobr>
        </div>
        <div>
          <nobr>
            <span>
              业务管理上级
            </span>
            <label>{{businessSuperior}}</label>
          </nobr>
        </div>
        <div>
          <nobr>
            <span>
              账务机构
            </span>
            <label>{{accountOrg}}</label>
          </nobr>
        </div>
        <div id="bottomBoder" class="border-style"></div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close">关 闭</el-button>
        </span>
      </el-dialog>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'orgDetailDialog',
  data () {
    return {
      value: '',
      // 是否显示侧滑框
      isShowdialog: false,
      // 机构代号
      orgid: '',
      // 机构中文名称
      name: '',
      // 机构级别
      orgLevel: '',
      // 机构类型
      orgType: '',
      // 办公电话
      orgPhone: '',
      // 通讯地址
      address: '',
      // 报表级别
      reportLevel: '',
      // 业务上级
      businessSuperior: '',
      // 账务机构
      accountOrg: '',
      // 城镇街道地址
      detailAddress: ''
    }
  },
  mounted () {},
  methods: {
    showItem: function (row) {
      this.isShowdialog = true
      // 情况数据
      this.orgid = row.orgId || ''
      this.name = row.orgNameCn || ''
      this.orgPhone = (row.phoneCountry || '') + '-' + (row.phoneArea || '') + '-' + (row.phoneNo || '') + '-' + (row.phoneSubNo || '')
      this.detailAddress = row.address || ''
      this.orgType = row.orgTypeDesc || ''
      this.orgLevel = row.orgLevelDesc || ''
    },
    close: function () {
      this.isShowdialog = false
    }
  },
  watch: {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "@/styles/smartManager/commom-manager.scss";
.org-detail-content {
  .el-dialog__wrapper {
    left: 70%;
  }
  .el-dialog__wrapper > div:first-child {
    min-width: 36rem;
  }
  button {
    width: $mediumBtnWidth;
    height: $mediumBtnHeight;
    border-radius: $innerBorderRadius;
    padding: $normalBtnPadding;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
  .el-dialog__title {
    font-weight: 700;
  }
  .el-dialog__header span {
    font-size: $fontSize16;
    font-weight: 700;
  }
  span ~ label {
    margin-left: 1rem;
    width: 80%;
  }
  .border-style {
    border-bottom: 3px solid #F6F6F6;
  }
  .border-style ~ div {
    padding-top: 1.8rem;
  }
  #bottomBoder {
    padding: 60% 0 0 0;
  }
  nobr > span {
    display: inline-block;
    width: 6rem;
    text-align: right;
  }
}
@keyframes detailDialog-fade-in {
  0% {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes detailDialog-fade-out {
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

