<template>
    <div class="core-quality-wait-customer">
      <div class="core-quality-wait-customer-top"  v-bind:class="{'core-quality-wait-customer-top-borderBottom':queryRanklist.topTen.length>0}">
        <el-table
        :row-style="rowHeight"
        :cell-style="{padding:'0px'}"
        :show-header="false"
        :data="topData"
        style="width: 100%"
        stripe
        size="small">
          <el-table-column prop="branchName,evaluateRate">
            <template slot-scope="scope">
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div>
                      <img src="@/assets/smartOperate/survey/gold.png" v-if="scope.row.rowNum === 1" alt="" width="20" height="25" />
                      <img src="@/assets/smartOperate/survey/silver.png" v-if="scope.row.rowNum === 2" alt="" width="20" height="25" />
                      <img src="@/assets/smartOperate/survey/copper.png" v-if="scope.row.rowNum === 3" alt="" width="20" height="25"/>
                    </div>
                    <div v-if="scope.row.rowNum > 3" class="core-quality-wait-customer-sort">{{scope.row.rowNum}}</div>
                  </el-col>
                  <el-col :span="14" >
                    <div :class="scope.row.rowNum<4?'margin1':'margin2'">{{scope.row.branchName}}</div>
                  </el-col>
                  <el-col :span="6" :push="1" :class="scope.row.rowNum<4?'margin1':'margin2'">
                    <div>{{scope.row.evaluateRate!==this.rate?scope.row.evaluateRate+'%':'—'+' '+'—'}}</div>
                  </el-col>
                </el-row>
         </template>
          </el-table-column>
        </el-table>
      </div>
      <!--bottom -->
      <div class="core-quality-wait-customer-bottom" v-if="queryRanklist.bottomTen.length>0">
        <el-table
        :row-style="rowHeight"
        :cell-style="{padding:'0px'}"
        :show-header="false"
        :data="bottomData"
        style="width: 100%"
        stripe
        size="small">
          <el-table-column prop="id,name,num">
            <template slot-scope="scope">
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div class="core-quality-wait-customer-bottomSort">{{scope.row.rowNum}}</div>
                  </el-col>
                  <el-col :span="14">
                    <div>{{scope.row.branchName}}</div>
                  </el-col>
                  <el-col :span="6" :push="1">
                    <div >{{scope.row.evaluateRate!==this.rate?scope.row.evaluateRate+'%':'—'+' '+'—'}}</div>
                  </el-col>
                </el-row>
         </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script>
export default {
  name: 'coreQualityBranchRank',
  data () {
    return {
      topData: [],
      bottomData: [],
      rowHeight: { height: '45px' }, // 表格行高度
      currIcon: null,
      rate: undefined
    }
  },
  props: {
    queryRanklist: {
      type: Object
    },
    topIndex: Number
  },
  watch: {
    queryRanklist (val) {
      this.topData = val.topTen
      this.bottomData = val.bottomTen
      // console.log(JSON.stringify(val))// eslint-disable-line
    }
  },
  components: {

  },
  mounted () {

  },
  methods: {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.core-quality-wait-customer{
  border-top: 1px solid #E9E9E9;
  // height:73.6vh;
}
.core-quality-wait-customer-top{
  // padding-left: 0.5rem;
  // padding-right: 0.5rem;
  padding-top: 0.5rem;
}
.core-quality-wait-customer-sort{
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #D0021B;
  margin-left: 5px;
}
// .core-quality-wait-customer-bottom{
  // padding-left: 0.5rem;
  // padding-right: 0.5rem;
// }
.core-quality-wait-customer-top-borderBottom{
  border-bottom: 2px dashed #A5BFDE;
}
.core-quality-wait-customer-bottomSort{
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #34D0AD;
  letter-spacing: 0;
  margin-left: 5px;
}
.margin1{
  margin-top: 5px;
}
.margin2{
  margin-top: 0px;
}
</style>



