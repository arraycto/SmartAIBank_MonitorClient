<template>
<div>
  <div class="device-table-content">
    <el-table
      ref="multipleTable"
      :data="qualityList"
      tooltip-effect="dark"
      style="width: 100%;border-radius: 8px;"
      :header-cell-style="theadClassName"
      stripe
      @sort-change="getSortChange"
    >
    <el-table-column  min-width="63">
    </el-table-column>
    <el-table-column  label="网点名称" min-width="170">
        <template slot-scope="scope">
          <div class="qualityList-branchName-color" @click="entQuality(scope.row.branchNo)">{{scope.row.branchName}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="qualityLevel" label="等级"  sortable ="custom" min-width="75">
          <template slot-scope="scope">
            <el-row :gutter="20">
             <el-col v-bind:class="{
            'core-quality-height':scope.row.qualityLevel === '优',
            'core-quality-center':scope.row.qualityLevel === '良',
            'core-quality-low':scope.row.qualityLevel === '中',
            'core-quality-bottom':scope.row.qualityLevel === '差',
            }" :span="4" v-show="scope.row.qualityLevel!==this.rate">
                <circle-panel/>
                <!-- <circlePanel ></circlePanel> -->
              </el-col>
              <el-col :span="scope.row.qualityLevel!==this.rate?4:24">
                <div  v-bind:class="{
            'core-quality-height':scope.row.qualityLevel === '优',
            'core-quality-center':scope.row.qualityLevel === '良',
            'core-quality-low':scope.row.qualityLevel === '中',
            'core-quality-bottom':scope.row.qualityLevel === '差',
            }">{{ scope.row.qualityLevel!==this.rate?scope.row.qualityLevel:'—'+' '+'—'}}</div>
              </el-col>
            </el-row>
          </template>
      </el-table-column>
      <el-table-column prop="evaluateRate" label="评价率" sortable ="custom" min-width="88">
        <template slot-scope="scope">
          {{scope.row.evaluateRate!==this.rate?scope.row.evaluateRate+'%':'—'+' '+'—'}}
         </template>
      </el-table-column>
      <el-table-column prop="evaluateGoodRate" label="好评率" min-width="88"  sortable ="custom">
        <template slot-scope="scope">
          {{scope.row.evaluateGoodRate!==this.rate?scope.row.evaluateGoodRate +'%':'—'+' '+'—'}}
         </template>
      </el-table-column>
      <el-table-column prop="evaluateMidRate" label="中评率" sortable ="custom" min-width="88">
        <template slot-scope="scope">
          {{scope.row.evaluateMidRate!==this.rate?scope.row.evaluateMidRate+'%':'—'+' '+'—'}}
         </template>
      </el-table-column>
      <el-table-column prop="evaluateBadRate" label="差评率" sortable ="custom" min-width="88">
        <template slot-scope="scope">
          {{scope.row.evaluateBadRate!==this.rate?scope.row.evaluateBadRate+'%':'—'+' '+'—'}}
         </template>
      </el-table-column>
      <el-table-column prop="customerRate" label="客户身份识别率" min-width="145" sortable ="custom">
        <template slot-scope="scope">
          {{scope.row.customerRate!==this.rate?scope.row.customerRate+'%':'—'+' '+'—'}}
         </template>
      </el-table-column>
      <el-table-column prop="evaluateBadCount" label="差评数" min-width="88" sortable ="custom">
        <template slot-scope="scope">
          {{scope.row.evaluateBadCount}}
         </template>
      </el-table-column>
      <div slot="empty">
        <occupied  height='height:52.8vh' explain='暂无数据'/>
      </div>
    </el-table>
  </div>
</div>
</template>

<script>
import circlePanel from '@/syscomponents/smartMonitor/monitor/busyDegree/smallCirclePanel'
import occupied from '@/components/Occupied/occupied'
export default {
  name: 'coreQualityTable',
  components: {
    circlePanel, occupied
  },
  data: function () {
    return {
      rate: undefined
    }
  },
  mounted () {
  },
  props: {
    qualityList: Array
  },
  watch: {
  },
  methods: {
    // 调整级别不同调整显示颜色
    // tableRowClassName ({ row, column, rowIndex, columnIndex }) {
    // //   console.log(row.qualityLevel + '' + columnIndex)
    //   if (row.qualityLevel === '优' && columnIndex === 2) {
    //     console.log(row.qualityLevel)
    //     return 'core-quality-height'
    //   } else if (row.qualityLevel === '良' && columnIndex === 2) {
    //     console.log(row.qualityLevel)
    //     return 'core-quality-center'
    //   } else if (row.qualityLevel === '中' && columnIndex === 2) {
    //     console.log(row.qualityLevel)
    //     return 'core-quality-low'
    //   } else if (row.qualityLevel === '差' && columnIndex === 2) {
    //     console.log(row.qualityLevel)
    //     return 'core-quality-bottom'
    //   } else {
    //     return ''
    //   }
    // },
    // 获取排序参数
    getSortChange (column) {
      if (column.order === 'ascending') {
        this.sortOrder = 'ASC'
        const orderColumn = column.prop + ' ' + this.sortOrder
        this.$emit('getOrderColumn', orderColumn)
      } else if (column.order === 'descending') {
        this.sortOrder = 'DESC'
        const orderColumn = column.prop + ' ' + this.sortOrder
        this.$emit('getOrderColumn', orderColumn)
      }
    },
    entQuality (id) { // 点击跳转支行
      var dataTime = parseInt(new Date().getTime())
      this.$store.commit('monitor/settableBranchId', id + dataTime)
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
<style rel="stylesheet/scss" lang="scss">
.device-table-content{
  min-height:52.8vh;
  background-color:transparent;
}
.core-quality-height{
  color: #DB5B73;
}
.core-quality-center{
  color: #F5A623;
}
.core-quality-low{
  color: #258AFF;
}
.core-quality-bottom{
  color: #55CFB4;
}
.qualityList-branchName-color{
    color:#258AFF;
    cursor: pointer;
}
</style>

