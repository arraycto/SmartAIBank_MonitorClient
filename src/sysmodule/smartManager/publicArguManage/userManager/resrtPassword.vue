<template>
    <div class="user-resrtPassword-content">
        <div class="resrtPassword-box">
            <el-row :gutter="20">
                 <el-col :span="12">
                     <div class="user-resrtPassword-title">密码重置</div>
                 </el-col>
            </el-row>

            <el-row :gutter="20">
                 <el-col :span="24">
                    <div class="input-info">
                        <font class="input-text">用户编号：</font>
                        <el-input v-model="queryUserId" maxlength="10" placeholder="请输入"></el-input>
                        <el-button class="quer-btn" size="mini" type="primary" @click="queryClick">查询</el-button>
                    </div>
                 </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="input-info">
                        <font class="input-text">用户名称：</font>
                        <el-input v-model="queryUserName" maxlength="10" readonly="readonly"></el-input>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="user-resrtPassword-btn">
                        <el-button class="cancel-btn" @click="resetClick">取消</el-button>
                        <el-button class="submit-btn" @click="submit">提交</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import pagination from '@/syscomponents/smartManager/pagination/pagination'
import services from '../../../../services'
import base from '@/common/base'
export default {
  name: 'ResrtPassword',
  data: function () {
    return {
      queryUserId: '',
      queryUserName: '',
      orgLevelList: []
    }
  },
  methods: {
    // 取消
    resetClick: function () {
      this.queryUserId = ''
      this.queryUserName = ''
    },
    // 提交
    submit: async function () {
      var self = this
      try {
        var self = this
        await services.api.base.password.resetPwd(base.getStore({ 'key': 'userName' }), base.getStore({ key: 'orgId' }), self.queryUserId)
        self.$message({
          message: '重置成功',
          type: 'success'
        })
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 查询
    queryClick: async function () {
      var self = this
      if (self.queryUserId == base.getStore({ 'key': 'userName' })) {
        self.$message({
          message: '重置密码无法重置本人的密码',
          type: 'error'
        })
      } else {
        try {
          const querResult = await services.api.base.password.getRestPwd(self.queryUserId)
          self.queryUserName = querResult || ''
        } catch (err) {
          self.$message({
            message: err.message,
            type: 'error'
          })
        }
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/smartManager/commom-manager.scss';
.user-resrtPassword-content{
  width: 100%;
  min-height: calc(100vh - 120px);
  background: white;
  padding: $pageMargins;
  border-top-right-radius: $pageBorderRadius;
  border-top-left-radius: $pageBorderRadius;
  .resrtPassword-box{
    width:640px;
    height:300px;
    margin-top:40px;
    margin-left:225px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    .user-resrtPassword-title{
        font-size: $fontSize18;
        color: $oneFontColor;
        font-weight: 600;
        height: 100%;
        padding-left: 20px;
        padding-top: 15px;
    }
    .user-resrtPassword-btn{
        display: flex;
        text-align: right;
        padding-top:65px;
        padding-left:230px;
        .cancel-btn{
            outline: none;
            border-radius: 2px;
            background: white;
            border: 1px solid $lineColor;
            cursor: pointer;
            font-size: $fontSize14;
            font-family: PingFangSC-Semibold;
            color: $twoFontColor;
            padding: 5px 15px;
        }
        .submit-btn{
            outline: non1e;
            background: $themeColor;
            border-radius: 2px;
            border: none;
            cursor: pointer;
            font-size: $fontSize14;
            font-family: PingFangSC-Semibold;
            color: #FFFFFF;
            margin-left: 21px;
            padding: 5px 15px;
        }
    }
    .input-info{
        padding-left:87px;
        padding-top:31px;
       .input-text{
            height:20px;
            width:56px;
            font-family: PingFangSC-Regular;
            letter-spacing: 0;
            font-size: 14px;
            color: #666666;
       }
       .el-input{
            width:320px;
            height:30px;
            border: 1px solid #E5E5E5;
            border-radius: 4px;
            margin-bottom:0px;
        }
        .quer-btn{
            outline: non1e;
            background: $themeColor;
            border-radius: 2px;
            border: none;
            cursor: pointer;
            font-size: $fontSize14;
            font-family: PingFangSC-Semibold;
            color: #FFFFFF;
            margin-left: 21px;
            padding: 5px 15px;
        }
    }
    }
  }
</style>
