<template>
    <div class="core-busy-wait-customer">
      <div class="core-busy-wait-customer-top"  v-bind:class="{'core-busy-wait-customer-top-borderBottom':tableData1.length>0}">
        <el-table
        :row-style="rowHeight"
        :cell-style="{padding:'0px'}"
        :show-header="false"
        :data="tableData"
        style="width: 100%"
        stripe
        size="small">
          <el-table-column prop="id,name,num">
            <template slot-scope="scope">
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div>
                      <img src="@/assets/smartOperate/survey/gold.png" v-if="scope.row.rankNo === 1" alt="" width="20" height="25" />
                      <img src="@/assets/smartOperate/survey/silver.png" v-if="scope.row.rankNo === 2" alt="" width="20" height="25"/>
                      <img src="@/assets/smartOperate/survey/copper.png" v-if="scope.row.rankNo === 3" alt="" width="20" height="25"/>
                    </div>
                    <div v-if="scope.row.rankNo > 3" class="core-busy-wait-customer-sort">{{scope.row.rankNo}}</div>
                  </el-col>
                  <el-col :span="15">
                    <div>{{scope.row.branchName}}</div>
                  </el-col>
                  <el-col :span="5">
                    <div v-if="queryCondition==='1'">{{scope.row.waitingCustomers}}人</div>
                    <div v-if="queryCondition==='2'">{{scope.row.avgWaitingTime}}分钟</div>
                  </el-col>
                </el-row>
         </template>
          </el-table-column>
        </el-table>
      </div>
      <!--bottom -->
      <div class="core-busy-wait-customer-bottom" v-if="tableData1.length>0">
        <el-table
        :row-style="rowHeight"
        :cell-style="{padding:'0px'}"
        :show-header="false"
        :data="tableData1"
        style="width: 100%"
        stripe
        size="small">
          <el-table-column prop="id,name,num">
            <template slot-scope="scope">
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div class="core-busy-wait-customer-bottomSort">{{scope.row.rankNo}}</div>
                  </el-col>
                  <el-col :span="15">
                    <div>{{scope.row.branchName}}</div>
                  </el-col>
                  <el-col :span="5">
                    <div v-if="queryCondition==='1'">{{scope.row.waitingCustomers}}</div>
                    <div v-if="queryCondition==='2'">{{scope.row.avgWaitingTime}}分钟</div>
                  </el-col>
                </el-row>
         </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script>
import services from '../../../../services'
export default {
  name: 'coreBusyWaitCustomer',
  data () {
    return {
      tableData: [],
      tableData1: [],
      rowHeight: { height: '40px' }, // 表格行高度
      currIcon: null
    }
  },
  props: { queryCondition: String, branchId: String },
  watch: {
    queryCondition (val) {
      this.getTableList(this.branchId, val)
    },
    branchId (val) {
      this.getTableList(val, this.queryCondition)
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.getTableList(this.branchId, this.queryCondition)
    }
  },
  components: {

  },

  mounted () {
    // this.getTableList()
  },
  methods: {
    // 获取列表数据
    getTableList: async function (branchId, queryCondition) {
      // this.tableData = topBottom.topList || []
      // this.tableData1 = topBottom.bottomList || []
      try {
        var self = this
        const list = await services.api.monitor.monitorBusy.getBusynessRankInfo(branchId, queryCondition)
        this.tableData = list.topList || []
        this.tableData1 = list.bottomList || []
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
@import "@/styles/standard-common.scss";
.core-busy-wait-customer{
  border-top: 1px solid #E9E9E9;
}
.core-busy-wait-customer-top{
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
}
.core-busy-wait-customer-sort{
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #D0021B;
  margin-left: 5px;
}
.core-busy-wait-customer-bottom{
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.core-busy-wait-customer-top-borderBottom{
  border-bottom: 2px dashed #A5BFDE;
}
.core-busy-wait-customer-bottomSort{
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #34D0AD;
  letter-spacing: 0;
  margin-left: 5px;
}
</style>



