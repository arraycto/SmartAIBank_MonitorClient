<template>
  <el-dialog title="对账结果详情"
   :visible.sync="dialogTableVisible"
   fullscreen :close-on-click-modal="false"
   class="remote-view  reconciliation"
   >
    <div class="result-detail">
      <!-- 顶部 -->
      <div class="top-detail">
        <!-- 第一行 -->
        <el-row class="top-first">
          <el-col :span='4' class="top-first-child">设备编号：<span>{{accountInfo.mId}}</span></el-col>
          <el-col :span='5' class="top-first-child">对账时间区间：<span>{{accountInfo.startDate}}</span></el-col>
          <el-col :span='6' class="top-first-child">假钞周期编号：<span>{{accountInfo.periodId}}</span></el-col>
          <el-col :span='5' class="top-first-child">对账结果：<span>{{accountInfo.tranResult}}</span></el-col>
          <el-col :span='4' class="top-first-child">总交易：<span>{{accountInfo.totalCount}}笔</span></el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row class="top-second">
          <el-col :span='4' class="top-first-child">长款金额：<span>{{accountInfo.overMoney}}元</span></el-col>
          <el-col :span='5' class="top-first-child">短款金额：<span>{{accountInfo.shortMoney}}元</span></el-col>
          <el-col :span='6' class="top-first-child">正常交易笔数：<span>{{accountInfo.normalTranSCount}}笔</span></el-col>
          <el-col :span='5' class="top-first-child">异常交易笔数：<span>{{accountInfo.expTranSCount}}笔</span></el-col>
          <el-col :span='4' class="top-first-child">错账交易笔数：<span>{{accountInfo.erTransCount}}笔</span></el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row class="top-third">
          <el-col :span='4' class="top-first-child">正常交易金额：<span>{{accountInfo.normalTransMoney}}元</span></el-col>
          <el-col :span='5' class="top-first-child">异常交易金额：<span>{{accountInfo.expTransMoney}}元</span></el-col>
          <el-col :span='6' class="top-first-child">错账交易金额：<span>{{accountInfo.erTransMoney}}元</span></el-col>
          <el-col :span='5' class="top-first-child"></el-col>
          <el-col :span='4' class="top-first-child"></el-col>
        </el-row>
      </div>
      <!-- 表格数据 -->
      <div class="table-detail">
        <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        :data="tableList"
        style="width: 100%"
        stripe
        :header-cell-style="theadClassName"
        >
        <el-table-column
          prop="tranStatus"
          label="对账结果"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="errorClass"
          label="类型"
          min-width="100">
        </el-table-column>>
        <el-table-column
          prop="tranDate"
          label="交易时间"
          min-width="110">
        </el-table-column>
        <el-table-column
          prop="tranType"
          label="交易类型"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="seqNo"
          label="交易流水号"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="tranAmt"
          label="交易金额"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="tranCardNo"
          label="交易卡号"
          min-width="140">
        </el-table-column>
        <el-table-column
          prop="tranCardType"
          label="卡类型"
          min-width="90">
        </el-table-column>
    </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import base from '@/common/base'
import services from '../../../../services'
export default {
  name: 'reconciliyResultDetail',
  data () {
    return {
      dialogTableVisible: false,
      tableList: [],
      accountInfo: {}
    }
  },
  mounted () {
  },
  props: {
  },
  methods: {
    // 打开远程操作记录页面
    async getDetail (val) {
      const detailPramer = {
        busType: 'A',
        orgId: val.branchId,
        periodId: val.tranCardNo,
        target: '查看详情',
        user: base.getStore({ key: 'userName' })
      }

      var self = this
      self.dialogTableVisible = true
      self.tableList = []
      const tableData = {}
      try {
        const tranReconciliationDetailList = await services.api.monitor.monitorRemote.getAccountInfo(detailPramer)
        const tranReconciliationDetail = JSON.parse(tranReconciliationDetailList)
        if (tranReconciliationDetail != null) {
          if (tranReconciliationDetail.ACCOUNT_INFO) {
          // 错账交易金额
            this.accountInfo.erTransMoney  =  tranReconciliationDetail.ACCOUNT_INFO.ER_TRANS_MONEY
            // 异常交易金额
            this.accountInfo.expTransMoney =  tranReconciliationDetail.ACCOUNT_INFO.WITHDRAWAL_EXP_COUNT
            // 正常交易金额
            this.accountInfo.normalTransMoney  =  tranReconciliationDetail.ACCOUNT_INFO.WITHDRAWAL_NORMAL_COUNT
            // 短款金额
            this.accountInfo.shortMoney  =  tranReconciliationDetail.ACCOUNT_INFO.CASH_SHORT
            // 总交易
            this.accountInfo.totalCount  =  tranReconciliationDetail.ACCOUNT_INFO.TOTAL_COUNT
            // 正常交易笔数
            this.accountInfo.normalTranSCount  =  tranReconciliationDetail.ACCOUNT_INFO.DEPOSIT_NORMAL_COUNT
            // 异常交易笔数
            this.accountInfo.expTranSCount  =  tranReconciliationDetail.ACCOUNT_INFO.DEPOSIT_EXP_COUNT
            // 设备编号
            this.accountInfo.mId  =  tranReconciliationDetail.ACCOUNT_INFO.MID
            // 对账时间区间
            this.accountInfo.startDate  =  tranReconciliationDetail.ACCOUNT_INFO.START_DATE
            this.accountInfo.endDate  =  tranReconciliationDetail.ACCOUNT_INFO.END_DATE
            // 长款金额
            this.accountInfo.overMoney  =  tranReconciliationDetail.ACCOUNT_INFO.CASH_OVER
            // 对账结果
            this.accountInfo.tranResult  =  tranReconciliationDetail.ACCOUNT_INFO.RESULT
            // 加钞周期编号
            this.accountInfo.periodId  =  tranReconciliationDetail.ACCOUNT_INFO.PERIOD_ID
            // 错账交易笔数
            this.accountInfo.erTransCount  =  tranReconciliationDetail.ACCOUNT_INFO.ER_TRANS_COUNT

            if (tranReconciliationDetail.ACCOUNT_INFO.TRAN_LIST.length > 0) {
              tranReconciliationDetail.ACCOUNT_INFO.TRAN_LIST.map((item, index) => {
                tableData.tranStatus = item.TRAN_STATUS
                tableData.errorClass = item.ERROR_CLASS
                tableData.tranDate = item.TRAN_DATE
                tableData.tranType = item.TRAN_TYPE
                tableData.seqNo = item.SEQ_NO
                tableData.tranAmt = item.TRAN_AMT
                tableData.tranCardNo = item.TRAN_CARD_NO
                tableData.tranCardType = item.TRAN_CARD_TYPE
                this.tableList.push(tableData)
              })
            }
          }
        }
      } catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 调整头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333;font-size: 14px;font-family: PingFangSC-Semibold;'
      }
    }


  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.remote-view{
    width: 73%;
    margin-top: 7%;
    margin-left: 21%;
    height: 82%;
    border-radius: 4px;
  }
.top-detail{
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  .top-first{
    // display: flex;
    margin-top: -1rem;

  }
  .top-first-child{
    // flex: 1;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0;
  }
  .top-first-child>span{
    color: #000;
    font-size: 14px;
    font-family: PingFangSC-Semibold;
  }
  .top-second{
    display: flex;
    margin-top: 1rem;

  }
  .top-third{
    display: flex;
    margin-top: 1rem;
  }
}
.table-detail{
  margin-top: 3rem;
  margin-bottom: 2rem;
  border:0.5px solid #ebeef5;
}
</style>
