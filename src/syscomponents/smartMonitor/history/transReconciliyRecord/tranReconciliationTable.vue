<template>
  <div class="allwarn">
    <div class="allwarn-top">共{{totalSize}}条记录</div>
    <el-table
      :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
      stripe
      :header-cell-style="theadClassName"
      class="allWarn-table"
    >
      <el-table-column width="20"></el-table-column>
      <el-table-column prop="tranDate" label="发起对账时间" min-width="100"></el-table-column>
      <el-table-column prop="tranResult" label="对账结果" min-width="90"></el-table-column>
      <el-table-column prop="tranCardNo" label="加钞周期编号" min-width="140"></el-table-column>
      <el-table-column prop="startDate" label="开始时间" min-width="90"></el-table-column>
      <el-table-column prop="endDate" label="结束时间" min-width="90"></el-table-column>
      <el-table-column prop="deviceId" label="设备编号" min-width="70"></el-table-column>
      <el-table-column prop="devClassName" label="设备类型" min-width="80"></el-table-column>
      <el-table-column label="所属机构" min-width="110">
        <template slot-scope="scope">
          <div>{{scope.row.branchId}}-{{scope.row.branchName}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="190">
        <template slot-scope="scope">
          <el-button size="mini" @click="openResultDetail(scope.row)" class="reconciliation">对账结果详情</el-button>
          <el-button size="mini" @click="openErrRegisterView(scope.row)" class="WrongAccount">错账处理</el-button>
        </template>
      </el-table-column>
      <div slot="empty">
        <occupied height="52.4vh" explain="暂无数据" />
      </div>
    </el-table>
    <div class="table-pagination-style">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper,sizes"
        :total="totalSize"
        background
      ></el-pagination>
    </div>
    <rusultDetail ref="reconciliyResultDetail"></rusultDetail>
    <errorRegister ref="errorRegister"></errorRegister>
  </div>
</template>
<script>
import rusultDetail from '@/syscomponents/smartMonitor/history/transReconciliyRecord/reconciliyResultDetail'
import errorRegister from '@/syscomponents/smartMonitor/history/transReconciliyRecord/errorRegister'
import occupied from '@/components/Occupied/occupied'
import services from '../../../../services'
export default {
  name: 'tranReconciliationTable',
  data: function () {
    return {
      currentPage: 1, // 当前页
      pageSize: 10 // 每页条数
    }
  },
  components: { rusultDetail, errorRegister, occupied },
  props: {
    tableList: Array,
    totalSize: Number
  },
  methods: {

    // 调整头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333;font-size: 14px;font-family: PingFangSC-Semibold;'
      }
    },
    // 对账详情
    openResultDetail (val) {
      this.$refs.reconciliyResultDetail.getDetail(val)
    },
    // 错账登记
    async openErrRegisterView (val) {
      try {
        const isShow = await services.api.monitor.errorAccount.check(val.tranCardNo)
        // 判断错账登记记错是否存在，存在则不允许登记
        if (!isShow) {
          this.$message({
            message: '错账已处理',
            type: 'info'
          })
        } else {
          this.$refs.errorRegister.openErrView(val)
        }
      } catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 改变pageSize
    handleSizeChange (val) {
      this.pageSize = val
    },
    // 当前页改变
    handleCurrentChange (val) {
      this.currentPage = val
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "@/styles/standard-common.scss";
.allwarn {
  background: transparent;
  .allWarn-table {
    border-radius: 0.5rem;
    .allwarn-leve-height {
      color: $redColor;
    }
    .allwarn-leve-center {
      color: $yellowColor;
    }
    .allwarn-leve-low {
      color: $greenColor;
    }
  }
  .allwarn-top {
    margin: 0.5rem;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4a4a4a;
    letter-spacing: 0;
    text-align: right;
  }
}
.table-pagination-style {
  float: right;
  margin-right: -10px;
  margin-top: 1.5rem;
}
.reconciliation {
  border: 1px solid #258aff;
  border-radius: 2px;
  color: #258aff;
}
.WrongAccount {
  border: 1px solid #55cfb4;
  border-radius: 2px;
  color: #55cfb4;
}
</style>
