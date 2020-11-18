<template>
<div class="entitycard-content">
  <!-- <div v-show="dataShow"  :class="(index+5)%5===0?'entitycard-layput-left entitycard-layput':(index+5)%5===4?'entitycard-layput-right entitycard-layput':'entitycard-layput entitycard-layput-center'"
    v-for="(item,index) in cardData" :key="index"> -->
  <div v-show="dataShow"  class="entitycard-layput entitycard-layput-center"
    v-for="(item,index) in cardData" :key="index">
  <!-- <div class="entitycard-layput entitycard-layput-center" v-for="item in 9" :key="item"> -->
    <el-row style="margin-top:0.7rem">
      <el-col :span="9">
        <div :class="item.gender==='F'?'entitycard-div':'entitycard-nv-div '"></div>
      </el-col>
      <el-col :span="15">
        <el-row class="name">
          姓名：{{item.userName}}
          <div v-show="index>2?true:false" class="entitycard-amou">{{index+1}}</div>
          <img src="@/assets/smartOperate/survey/gold.png" class="entitycard-img" v-show="index === 0?true:false"/>
          <img src="@/assets/smartOperate/survey/silver.png" class="entitycard-img" v-show="index === 1?true:false"/>
          <img src="@/assets/smartOperate/survey/copper.png" class="entitycard-img" v-show="index === 2?true:false"/>
        </el-row>
        <el-row class="name names">
          编号：{{item.userId}}
        </el-row>
      </el-col>
  </el-row>
  <el-row style="margin-top:0.4rem;">
      <el-col :span="9">
        <div :class="item.userStatus==='在线'?'entitycard-panel-color':'entitycard-panel'">
          <i class="iconx" :class="item.userStatus==='在线'?'icon-dcfs dcfs-zaixian':'icon-dcfs dcfs-lixian'">
            <span style="font-size:14px;">&nbsp;{{item.userStatus}}</span>
          </i>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="entitycard-assess" :class="queryType === 'eva'?'color2 ':'color1'">
          评价率：{{item.evaluateRate!==rate?item.evaluateRate+'%':'-'+''+'-'}}&nbsp;({{item.evaluateBank?'No.'+item.evaluateBank:'-'+''+'-'}})
        </div>
        <div class="entitycard-assess" :class="queryType === 'good'?'color2':'color1'">
          好评率：{{item.positiveRate!==rate?item.positiveRate+'%':'-'+''+'-'}}&nbsp;({{item.positiveBank?'No.'+item.positiveBank:'-'+''+'-'}})
        </div>
        <div class="entitycard-assess" :class="queryType === 'good'?'color2':'color1'">
          中评率：{{item.evaluateMidRate!==rate?item.evaluateMidRate+'%':'-'+''+'-'}}&nbsp;({{item.evaluateMidBank?'No.'+item.evaluateMidBank:'-'+''+'-'}})
        </div>
        <div class="entitycard-assess" :class="queryType === 'bad'?'color2':'color1'">
          差评率：{{item.negativeRate!==rate?item.negativeRate+'%':'-'+''+'-'}}&nbsp;({{item.negativeBank?'No.'+item.negativeBank:'-'+''+'-'}})
        </div>
        <div v-show="item.negativeCount>0?true:false">
        <!-- <div class="entitycard-tap" v-show="true"> -->
          <el-popover
            placement="right-start"
            :visible-arrow="false"
            width="450"
            size = "mini"
            trigger="click">
            <el-table :data="gridData"
              :stripe = "true"
              :header-cell-style="{background:'#4A4A4A'}">
              <el-table-column min-width="60" property="rowNum" align="center" label="序号"></el-table-column>
              <el-table-column min-width="100" property="yearTime,dayTime" align="center" label="时间">
                <template slot-scope="scope">
                 &nbsp;&nbsp;&nbsp;{{scope.row.yearTime}}<br/>{{scope.row.dayTime}}
                </template>
              </el-table-column>
              <el-table-column min-width="100" property="customerName" align="center" label="客户名称"></el-table-column>
              <el-table-column min-width="140" property="phone" align="center" label="客户联系方式"></el-table-column>
            </el-table>
            <div id="negativeCount" slot="reference" class="colors" @click="getBadInfo(item.userId)">差评数：{{item.negativeCount}}</div>
          </el-popover>
        </div>
      </el-col>
    </el-row>
  </div>
  <div v-show="noData" class="nodata">
    <occupied height='80vh' explain='暂无数据'/>
  </div>
</div>
</template>
<script>
import services from '../../../../services'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'
export default {
  name: 'serviceQualityEntityCard',
  data: function () {
    return {
      branchNo: '',
      dataShow: true,
      noData: false,
      queryType: 'eva',  // 查询类型
      cardData: [], // 卡片信息备选容器
      gridData: [], // 列表信息备选容器
      rate: undefined
    }
  },
  components: { occupied
  },
  props: {
    topIndex: {
      type: Number,
      default: 1
    }
  },
  mounted () {
    this.branchNo = base.getStore({ key: 'orgId' })
    this.query()
  },
  methods: {
    iterationDate () {
      if (this.cardData) {
        for (let index = 0; index < this.cardData.length; index++) {
          if (this.cardData[index].userStatus === '1') {
            this.cardData[index].userStatus = '在线'
          } else {
            this.cardData[index].userStatus = '离线'
          }
        }
      }
    },
    query: async function () {
      try {
        const data = await services.api.monitor.monitorQuality.getBranchQualityUser(this.branchNo, this.queryType)
        if (JSON.stringify(data) !== '[]') {
        //   console.log(JSON.stringify(data))
          this.dataShow = true
          this.noData = false
          this.cardData = data
          this.iterationDate()
        } else {
          this.dataShow = false
          this.noData = true
        }
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    getBadInfo: async function (userId) {
      try {
        const data = await services.api.monitor.monitorQuality.getNegativeCustomerIno(userId)
        if (data) {
          data.map((item, index) => {
            if (item.customerName === this.rate) {
              item.customerName = '——' + ' ' + '——'
            }
            if (item.phone === this.rate) {
              item.phone = '——' + ' ' + '——'
            }
            const yearTime = item.time.substring(0, 10)
            const dayTime = item.time.slice(10)
            item['yearTime'] = yearTime
            item['dayTime'] = dayTime
            console.log(dayTime)
            item.rowNum = index + 1
          })
          this.gridData = data
        }
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    }
  },
  watch: {
    topIndex (val) {
    //   console.log('index' + val)
      if (val === 1) {
        this.queryType = 'eva'
      } else if (val === 2) {
        this.queryType = 'good'
      } else if (val === 3) {
        this.queryType = 'mid'
      } else if (val === 4) {
        this.queryType = 'bad'
      }
      this.query()
    },
    '$store.state.monitor.tableBranchId': function (value) {
      if (this.$store.state.monitor.tableBranchId != null) {
        this.branchNo = value.substring(0, value.length - 13)
        this.query()
      }
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.query()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.entitycard-content {
    min-height: calc(60vh);
    background-color:transparent;
}
.entitycard-nodata{
    min-height: calc(100vh);
    // margin-bottom: calc(2vh)
}
@media screen and (min-width:1366px) {
  .entitycard-layput{
    background: #FFFFFF;
    box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
    border-radius: 0.2rem;
    height: 12rem;
    float: left;
    width: 18.7%;
    margin-bottom:2.5%;
    margin-top: -1.5%;
  }
  .entitycard-layput-center{
    margin-left: 0.65%;
    margin-right: 0.65%;
  }
  .entitycard-layput-right{
    margin-right: 0%;
    margin-left: 0.625%;
  }
  .entitycard-layput-left{
    margin-left: 0%;
    margin-right: 0.625%;
  }
}
@media screen and (max-width:1366px) {
  .entitycard-layput{
    background: #FFFFFF;
    box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
    border-radius: 0.2rem;
    height: 12rem;
    float: left;
    width: 24%;
    margin-bottom:2.5%;
    margin-top: -1.5%;
  }
  .entitycard-layput-center{
    margin-left: 0.5%;
    margin-right: 0.5%;
  }
  .entitycard-layput-right{
    margin-right: 0%;
    margin-left: 0.5%;
  }
  .entitycard-layput-left{
    margin-left: 0%;
    margin-right: 0.5%;
  }
}
.entitycard-div {
  background-image: url('../../../../assets/nan.png');
  background-size: auto;
  background-repeat: no-repeat;
  image-rendering: -webkit-optimize-contrast;
  height: 5rem;
  width:5rem;
  margin: 0 auto ;
}
.entitycard-nv-div {
  background-image: url('../../../../assets/nv.png');
  background-size: auto;
  background-repeat: no-repeat;
  image-rendering: -webkit-optimize-contrast;
  height: 5rem;
  width:5rem;
  margin: 0 auto ;
}
.entitycard-panel{
  display: flex;
  display: -webkit-flex;
  width: 80px;
  height:25px;
  padding-top:0.1rem;
  color: #9B9B9B;
  border: 1px solid #9B9B9B;
  border-radius: 0.8rem;
  font-size: 14px;
  margin: 0 auto ;
}
.entitycard-panel-color{
  display: flex;
  display: -webkit-flex;
  width: 80px;
  height:25px;
  margin-left: 0.4rem;
  padding-top:0.1rem;
  color:#258AFF;
  border: 1px solid #258AFF;
  border-radius: 0.8rem;
  font-size: 14px;
  margin: 0 auto ;
}
.color2{
  color:#258AFF;
}
// @media screen and (max-width:1366px) {
//   .colors{
//     color: #11e21c;
//     font-size: 12px;
//     cursor: pointer;
//     margin-left:0.2rem;
//   }
//   .entitycard-assess{
//     font-family: PingFangSC-Regular;
//     font-size: 12px;
//     letter-spacing: 0;
//     line-height: 20px;
//   }
// }
// @media screen and (min-width:1366px) {
//   .colors{
//     color: #11e21c;
//     font-size: 14px;
//     cursor: pointer;
//     margin-left:0.2rem;
//   }
//   .entitycard-assess{
//     font-family: PingFangSC-Regular;
//     font-size: 14px;
//     letter-spacing: 0;
//     line-height: 20px;
//   }
// }
.colors{
  color: #11e21c;
  font-size: 14px;
  cursor: pointer;
  margin-left:0.2rem;
}
.entitycard-assess{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
}
.color1{
  color: #000000;
}
.entitycard-amou{
  float:right;
  line-height:1.5rem;
  margin-right:0.75rem;
//   margin-top:-0.2rem;
  background: #4A4A4A;
  width:1.5rem;
  color:#FFFFFF;
  border-radius: 0.75rem;
  font-weight: 100;
  text-align:center;
}
.entitycard-img{
 float:right;
 margin-right:0.5rem;
 width: 1.5rem;
 height:1.8rem;
//  margin-top:-0.2rem;
}
.iconx{
  margin:0 auto;
}
.name{
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #333333;
  font-weight: bold;
  letter-spacing: 0;
}
.names{
  margin-top:0.6rem;
}
.entitycard-tap{
  cursor: pointer;
}

</style>
