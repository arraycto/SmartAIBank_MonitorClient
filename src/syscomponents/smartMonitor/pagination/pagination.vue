<template>
    <div class="pagination-content" :style="{position:position}">
            <el-pagination
                :background = "background"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                :layout="layout"
                :total="total">
                <div class="slot-span"> </div>
            </el-pagination>
        </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    background: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: function () {
        return [10, 30, 50, 100]
      }
    },
    layout: {
      type: String,
      default: 'prev, pager, next, jumper, slot, sizes'
    },
    position: {
      type: String,
      default: 'relative'
    }
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    // 每页条数
    handleSizeChange (val) {
      this.$emit('size-change', val)
    },
    // 当前页数
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pagination-content{
    width: 100%;
    text-align: right;
    margin-top: 15px;
    bottom: 10px;
    right: 0px;
    .el-pagination{
        padding: 2px 0px 2px 5px;
    }
    .slot-span{
        display: inline-block;
        width: 20px;
    }

}
</style>


