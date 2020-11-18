<template>
  <div class="rankingChart-style">
    <div class="mineRanking">
      <div class="topTitle">
        <font class="panel-font">{{topDesc[rankingData.clickName]}}</font>
        <font class="top-panel-font"> TOP5</font>
      </div>
      <el-row class="topitem"
              :class="[index%2=='0'?'single-color':'double-color']"
              type='flex'
              v-for="(item,index) in rankingData.top5"
              :key="item.branchNo"
              :style="{'animation-delay': index * 0.2 + 's'}">
        <el-col :span="3"
                class="index-style">
          <i v-if="index==0"><img :src="goldImg" /></i>
          <i v-if="index==1"><img :src="silverImg" /></i>
          <i v-if="index==2"><img :src="copperImg" /></i>
          <i v-if="index>2">{{index+1}}</i>
        </el-col>
        <el-col :span="14"
                :style="{'animation-delay': index * 0.1 + 's'}"
                class="orgId-style">
          {{item.branchName}}
        </el-col>
        <el-col :span="5"
                :style="{'animation-delay': index * 0.1 + 's'}"
                class="trannum-style">{{rankingData.clickName == 'quality'? (item.value?(item.value*100).toFixed(2):'0.00'):(item.value?item.value:'0')}}{{numDesc[rankingData.clickName]}}
        </el-col>
        <el-col :span="2"
                :style="{'animation-delay': index * 0.1 + 's'}"
                :class="[item.rate > 0 ?'up-color':'down-color']">{{item.rate > 0 ?'↑':'↓'}}
        </el-col>
      </el-row>
    </div>
    <div class="mineRanking">
      <div class="topTitle">
        <font class="panel-font">{{topDesc[rankingData.clickName]}}</font>
        <font class="bottom-panel-font"> BOTTOM5</font>
      </div>
      <el-row class="topitem"
              :class="[index%2=='0'?
          'single-color':'double-color']"
              type='flex'
              v-for="(item,index) in rankingData.bottom5"
              :key="item.branchNo">
        <el-col :span="3"
                class="index-bottom-style">{{index+1}}
        </el-col>
        <el-col :span="14"
                :style="{'animation-delay': index * 0.1 + 's'}"
                class="orgId-style">
          {{item.branchName}}
        </el-col>
        <el-col :span="5"
                :style="{'animation-delay': index * 0.1 + 's'}"
                class="trannum-style">{{rankingData.clickName == 'quality'? (item.value?(item.value*100).toFixed(2):'0.00'):(item.value?item.value:'0')}}{{numDesc[rankingData.clickName]}}
        </el-col>
        <el-col :span="2"
                :style="{'animation-delay': index * 0.1 + 's'}"
                class="upordown-style"
                :class="[item.rate>0?'up-color':'down-color']">{{item.rate>0?'↑':'↓'}}
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {

  name: 'rankingChart',
  props: {
    chartData: {
      type: Object
    }
  },
  data () {
    return {
      goldImg: require('@/assets/smartOperate/survey/gold.png'),
      silverImg: require('@/assets/smartOperate/survey/silver.png'),
      copperImg: require('@/assets/smartOperate/survey/copper.png'),
      rankingData: this.chartData,
      bottom: false,
      topDesc: {
        'keliu': '接待客户数',
        'paidui': '排队等待时间',
        'efficiency': '交易平均处理时长',
        'quality': '差评率',
        'yingxiao': '预约购买登记数'
      },
      numDesc: {
        'keliu': '人',
        'paidui': '分钟',
        'efficiency': '分钟',
        'quality': '%',
        'yingxiao': '笔'
      }
    }
  },
  watch: {
    chartData: {
      handler (newValue, oldValue) {
        this.rankingData = newValue
      }
    },
    deep: true
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.rankingChart-style {
  width: 100%;
  height: 100%;
  background: #384758;
  border-radius: 10px;
  .topTitle {
    text-align: left;
    margin-left: 1.5rem;
    padding: 1.3vh;
  }
  .mineRanking {
    width: 100%;
  }
  .topitem {
    height: 6.1vh;
    padding: 1.6vh;
  }
  .panel-font {
    font-size: 15px;
    color: white;
    font-weight: 600;
  }
  .top-panel-font {
    font-size: 15px;
    color: #ff0000;
    font-weight: 600;
  }
  .bottom-panel-font {
    font-size: 15px;
    color: #50e3c2;
    font-weight: 600;
  }
  .index-style {
    color: #ff0000;
    text-align: center;
    font-size: 15px;
  }
  .index-bottom-style {
    color: #50e3c2;
    text-align: center;
    font-size: 15px;
  }
  .orgId-style {
    color: white;
    text-align: left;
    font-size: 13px;
    animation: fontChangedLeft 0.5s ease;
  }
  @keyframes fontChangedLeft {
    0% {
      opacity: 0.5;
      transform: translate(-30%, 0);
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fontChangedTop {
    0% {
      opacity: 0.5;
      transform: translate(0, -50%);
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fontChangedRight {
    0% {
      opacity: 0.5;
      transform: translate(50%, 0);
    }
    100% {
      opacity: 1;
    }
  }
  .trannum-style {
    color: white;
    text-align: center;
    font-size: 13px;
    animation: fontChangedLeft 0.2s ease;
  }
  .upordown-style {
    animation: fontChangedLeft 0.2s ease;
  }
  .single-color {
    background: #53677f;
  }
  .double-color {
    background: #3f5671;
  }
  .up-color {
    color: #ff0000;
  }
  .down-color {
    color: #50e3c2;
  }
}
</style>
