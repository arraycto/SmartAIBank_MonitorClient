<template>
  <div class="height-100">
    <el-row :gutter="20" class="row-style">
      <el-col :span="10">
        <div class="message-align">
          {{itemName}}
        </div>
      </el-col>
      <el-col :span="10">
        <div :id="id" class="moving-line-scale"> </div>
      </el-col>
      <el-col :span="3" class="num-align">
        <span class="emphasize-font">{{itemValue}}</span>人
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'custMovingLineDetail',
  props: {
    itemName: {
      type: String
    },
    itemValue: {
      type: Number
    },
    itemIndex: {
      type: Number
    },
    maxItem: {
      type: Number
    }
  },
  data () {
    return {
      // 计算当前数值占最高数值的百分比
      returnScale: this.itemValue / this.maxItem,
      id: 'calScale' + this.itemIndex
    }
  },
  mounted () {
    // 计算比例
    document.getElementById(this.id).style.width = 100 * this.returnScale + '%'
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '@/styles/variables.scss';
  .height-100 {
    height: 100%;
  }
  .row-style {
    height:4rem;
    display:flex;
    align-items: center;
    .message-align {
      text-align: left;
    }
  }
  .num-align {
    text-align: right;
  }
  .emphasize-font {
    font-size: 24px;
    color: #268BFF;
    font-weight: 700;
  }
</style>

