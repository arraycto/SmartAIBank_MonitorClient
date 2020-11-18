<template>
  <div class="coer-quality-left">
    <div class="coer-quality-left-top">
      <div>
        <el-row class="pro-top">
          <el-col class="pro-top-abnormal" :span="6" v-for="(item,indx) in laberData" :key="indx">
            <el-row>
              <el-col>
                <span
                  :class="indx!==3?'pro-top-abnormal-laber':'pro-top-abnormal-labers'"
                >{{item.desc}}</span>
              </el-col>
              <el-col>
                <span
                  :class="item.amount===rate?'pro-top-abnormal-null':indx===3?'pro-top-abnormal-nums':'pro-top-abnormal-num'"
                  class="pro-top-rate"
                >{{item.amount!==rate?item.amount:'—'+' '+'—'}}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="coer-quality-left-top-under">
        <el-row>
          <el-col
            :span="item.span"
            @click.native="clickSaturation(index)"
            v-for="(item,index) in circleData"
            :key="index"
          >
            <el-row>
              <el-col :span="23">
                <circlePanel class="equip-type-all" ref="circlePanel" :circleData="item"></circlePanel>
                <div
                  class="coer-quality-left-top-under-icon"
                  v-bind:class="{'core-equip-status':item.click}"
                ></div>
              </el-col>
              <el-col :span="1">
                <div class="line" v-show="index===5?false:true"></div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="coer-quality-left-top-total">共{{total}}条记录</div>
    <div class="coer-quality-left-top-bottom-table">
      <coreQualityTable
        ref="corequalityTable"
        :qualityList="qualityList"
        @getOrderColumn="getOrderColumn"
      ></coreQualityTable>
    </div>
    <pagination
      class="pagination-item"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      position="relative"
    />
  </div>
</template>

<script>

import circlePanel from '@/syscomponents/smartMonitor/monitor/serviceQuality/circleIcon'
import coreQualityTable from '@/syscomponents/smartMonitor/monitor/serviceQuality/coreQualityTable'
import services from '../../../../services'
import base from '@/common/base'
import pagination from '@/syscomponents/smartMonitor/pagination/pagination'
export default {
  name: 'coreQualityLeft',
  components: { circlePanel, coreQualityTable, pagination },
  data () {
    return {
      isManager: true,
      branchId: '', // 机构号
      branchNo: '', // 机构号
      leftTopData: [], // 评价率级别等信息容器
      total: 0, // 数量
      qualityGather: {}, // 服务质量汇总
      qualityStatus: '5', // 服务质量状态
      pageNum: 1,
      pageSize: 10,
      queryType: 5,
      rate: undefined,
      orderColumn: 'qualityLevel DESC',
      laberData: [{
        desc: '评价率(%)',
        amount: null
      }, {
        desc: '好评率(%)',
        amount: null
      }, {
        desc: '中评率(%)',
        amount: null
      },{
        desc: '差评率(%)',
        amount: null
      }, {
        desc: '客户身份识别率(%)',
        amount: null
      }, {
        desc: '差评数(个)',
        amount: 0
      }],
      circleData: [{
        type: 'photo',
        circleContent: 'icon-dcfs dcfs-device-state',
        color: '#258AFF',
        title: '网点总数(个)',
        count: '0',
        rate: '',
        span: 4,
        click: true
      },
      {
        type: '',
        circleContent: '',
        color: '#EE667F',
        title: '优',
        count: '0',
        rate: '0.00',
        span: 4,
        click: false
      },
      {
        type: '',
        circleContent: '',
        color: '#F5A623',
        title: '良',
        count: '0',
        rate: '0.00',
        span: 4,
        click: false
      },
      {
        type: '',
        circleContent: '',
        color: '#1087FF',
        title: '中',
        count: '0',
        rate: '0.00',
        span: 4,
        click: false
      },
      {
        type: '',
        circleContent: '',
        color: '#55CFB4',
        title: '差',
        count: '0',
        unit: '',
        rate: '0.00',
        span: 4,
        click: false
      },
      {
        type: '',
        circleContent: '',
        color: '#9B9B9B',
        title: '未服务',
        count: '0',
        unit: '',
        rate: '0.00',
        span: 4,
        click: false
      }],
      qualityList: []
    }
  },
  mounted () {
    this.branchId = base.getStore({ key: 'orgId' }) // 机构号
    this.branchNo = base.getStore({ key: 'orgId' })
    this.queryTopDate()
    this.queryListInfo()
  },
  methods: {
    getOrderColumn: function (msg) {
      this.orderColumn = msg
      this.queryListInfo()
    },
    // 切换状态页签
    clickSaturation: function (index) {
      for (let idex = 0; idex < this.circleData.length; idex++) {
        this.circleData[idex].click = false
      }
      this.circleData[index].click = true
      switch (index) {
      case 0:
        this.queryType = 5
        break
      case 1:
        this.queryType = 4
        break
      case 2:
        this.queryType = 3
        break
      case 3:
        this.queryType = 2
        break
      case 4:
        this.queryType = 1
        break
      case 5:
        this.queryType = 6
        break
      }
    },
    // 查询服务质量列表信息
    queryListInfo: async function () {
      try {
        // console.log('queryType:' + this.queryType)
        const data = await services.api.monitor.monitorQuality.qualityList(this.branchNo, this.orderColumn, this.pageNum, this.pageSize, this.queryType)
        if (data) {
          this.qualityList = this.iterationDate(data.list)
          this.total = data.total
        }
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    iterationDate (list) {
      if (list !== undefined) {
        for (var index = 0; index < list.length; index++) {
          if (list[index].qualityLevel === '4') {
            list[index].qualityLevel = '优'
          } else if (list[index].qualityLevel === '3') {
            list[index].qualityLevel = '良'
          } else if (list[index].qualityLevel === '2') {
            list[index].qualityLevel = '中'
          } else if (list[index].qualityLevel === '1') {
            list[index].qualityLevel = '差'
          }
        }
      }
      return list
    },
    // querySum: async function () {
    //   try {
    //     const data = await services.api.monitor.monitorQuality.getBranchQualitySum(this.branchNo)
    //     // console.log(this.branchNo)
    //     if (JSON.stringify(data) !== '{}') {
    //       this.laberData[0].customerRate = data.evaluateRate
    //       this.laberData[1].customerRate = data.positiveRate
    //       this.laberData[2].customerRate = data.negativeRate
    //       this.laberData[3].customerRate = data.customerRate
    //       this.laberData[4].customerRate = data.negativeCount
    //     }
    //   } catch (err) {
    //     if (err.message) {
    //       this.$message.error(err.message)
    //     } else {
    //       this.$message.error('未知异常')
    //     }
    //   }
    // },
    queryTopDate: async function () {
      try {
        const data = await services.api.monitor.monitorQuality.qualityRate(this.branchId, this.isManager)
        if (data) {
          this.laberData[0].amount = data.evaluateRate
          this.laberData[1].amount = data.evaluateGoodRate
          this.laberData[2].amount = data.evaluateMidRate
          this.laberData[3].amount = data.evaluateBadRate
          this.laberData[4].amount = data.customerRate
          this.laberData[5].amount = data.evaluateBadCount || 0
          data.statusGoodRate = parseFloat(data.statusGoodRate).toFixed(2)
          data.statusNiceRate = parseFloat(data.statusNiceRate).toFixed(2)
          data.statusMiddleRate = parseFloat(data.statusMiddleRate).toFixed(2)
          data.statusBadRate = parseFloat(data.statusBadRate).toFixed(2)
          data.statusUnDealRate = parseFloat(data.statusUnDealRate).toFixed(2)
          if (data.statusUnDealRate === 'NaN') {
            data.statusUnDealRate = ''
          }
          if (data.statusBadRate === 'NaN') {
            data.statusBadRate = ''
          }
          if (data.statusMiddleRate === 'NaN') {
            data.statusMiddleRate = ''
          }
          if (data.statusNiceRate === 'NaN') {
            data.statusNiceRate = ''
          }
          if (data.statusGoodRate === 'NaN') {
            data.statusGoodRate = ''
          }
          this.circleData[0].count = data.total
          this.circleData[1].count = data.statusGoodCount
          this.circleData[1].rate = data.statusGoodRate
          this.circleData[2].count = data.statusNiceCount
          this.circleData[2].rate = data.statusNiceRate
          this.circleData[3].count = data.statusMiddleCount
          this.circleData[3].rate = data.statusMiddleRate
          this.circleData[4].count = data.statusBadCount
          this.circleData[4].rate = data.statusBadRate
          this.circleData[5].count = data.statusUnDealCount
          this.circleData[5].rate = data.statusUnDealRate
        }
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    // 改变pageSize
    handleSizeChange (val) {
      this.pageSize = val
      //   console.log('pagSize' + this.pageSize)
      this.queryListInfo()
    },
    // 当前页改变
    handleCurrentChange (val) {
      this.pageNum = val
      this.queryListInfo()
    }
  },
  watch: {
    queryType: function (value) {
      this.queryListInfo()
    },
    '$store.state.monitor.managerBranchId': function (value) {
      if (this.$store.state.monitor.managerBranchId != null) {
        this.branchNo = value.substring(0, value.length - 13)
        this.branchId = value.substring(0, value.length - 13)
        this.pageNum = 1
        this.pageSize = 10
        this.queryTopDate()
        this.queryListInfo()
      }
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.queryTopDate()
      this.queryListInfo()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
@media screen and (min-width: 1366px) {
  .coer-quality-left-top {
    background-color: #ffffff;
    padding: 1rem 1rem 0 1rem;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
  }
  .pro-top {
    display: flex;
    justify-content: center;
    padding-left: 1.5%;
    .pro-top-abnormal {
      background-image: linear-gradient(-131deg, #6c9dfb 0%, #276bee 100%);
      min-width: 140px;
      box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
      border-radius: 8px;
      height: 5rem;
      margin-right: 1.5%;
      box-shadow: 0 2px 8px 0;
      &:first-of-type {
        margin-left: -1.5%;
      }
      &:last-of-type {
        margin-right: 0%;
      }
      .pro-top-abnormal-laber {
        position: absolute;
        top: 1.8rem;
        left: 0.8rem;
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        float: left;
      }
      .pro-top-abnormal-labers {
        position: absolute;
        top: 1.2rem;
        left: 0.5rem;
        max-width: 80px;
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        float: left;
      }
      .pro-top-abnormal-num {
        position: relative;
        font-family: DINAlternate-Bold;
        font-size: 22px;
        color: #ffffff;
        letter-spacing: 0;
        margin-right: 0.2rem;
        line-height: 5rem;
        float: right;
      }
      .pro-top-abnormal-nums {
        position: relative;
        font-family: DINAlternate-Bold;
        font-size: 22px;
        color: #ffffff;
        letter-spacing: 0;
        margin-right: 0.2rem;
        line-height: 5rem;
        float: right;
      }
      .pro-top-abnormal-null {
        position: relative;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        margin-right: 0.5rem;
        line-height: 5rem;
        float: right;
      }
    }
  }
  .coer-quality-left-top-total {
    float: right;
    margin-top: 0.5rem;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4a4a4a;
    letter-spacing: 0;
    text-align: right;
  }
  .coer-quality-left-top-under {
    padding-top: 1rem;
    cursor: pointer;
  }
  .coer-quality-left-top-under-icon {
    padding-bottom: 2rem;
  }
  .equip-type-all {
    margin-left: 5%;
  }
  .line {
    width: 1px;
    height: 2.5em;
    margin-top: 1rem;
    background: $lineColor;
  }

  .coer-quality-left-top-bottom-table {
    margin-top: 2rem;
    background: #ffffff;
    border: 1px solid #dcdbdd;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
  }
  .core-equip-status {
    border-bottom: 4px solid #258aff;
    border-radius: 2px;
    margin-left: 12.5%;
    margin-right: 0px;
    &:first-of-type {
      width: 125%;
    }
    &:last-of-type {
      margin-right: 7.5%;
    }
  }
  .block {
    float: right;
    margin-right: -1.2rem;
    margin-top: 1.5rem;
  }
}
@media screen and (min-width: 1367px) and (max-width: 1920px){
  .coer-quality-left-top {
    background-color: #ffffff;
    padding: 1rem 1rem 0 1rem;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
  }
  .pro-top {
    display: flex;
    justify-content: center;
    padding-left: 1.5%;
    .pro-top-abnormal {
      background-image: linear-gradient(-131deg, #6c9dfb 0%, #276bee 100%);
      min-width: 140px;
      box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
      border-radius: 8px;
      height: 5rem;
      margin-right: 1.5%;
      box-shadow: 0 2px 8px 0;
      &:first-of-type {
        margin-left: -1.5%;
      }
      &:last-of-type {
        margin-right: 0%;
      }
      .pro-top-abnormal-laber {
        position: absolute;
        top: 1.8rem;
        left: 0.8rem;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        float: left;
      }
      .pro-top-abnormal-labers {
        position: absolute;
        top: 1.2rem;
        left: 0.5rem;
        max-width: 80px;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        float: left;
      }
      .pro-top-abnormal-num {
        position: relative;
        font-family: DINAlternate-Bold;
        font-size: 28px;
        color: #ffffff;
        letter-spacing: 0;
        margin-right: 0.2rem;
        line-height: 5rem;
        float: right;
      }
      .pro-top-abnormal-nums {
        position: relative;
        font-family: DINAlternate-Bold;
        font-size: 28px;
        color: #ffffff;
        letter-spacing: 0;
        margin-right: 0.2rem;
        line-height: 5rem;
        float: right;
      }
      .pro-top-abnormal-null {
        position: relative;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        margin-right: 0.5rem;
        line-height: 5rem;
        float: right;
      }
    }
  }
  .coer-quality-left-top-total {
    float: right;
    margin-top: 0.5rem;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4a4a4a;
    letter-spacing: 0;
    text-align: right;
  }
  .coer-quality-left-top-under {
    padding-top: 1rem;
    cursor: pointer;
  }
  .coer-quality-left-top-under-icon {
    padding-bottom: 2rem;
  }
  .equip-type-all {
    margin-left: 5%;
  }
  .line {
    width: 1px;
    height: 2.5em;
    margin-top: 1rem;
    background: $lineColor;
  }

  .coer-quality-left-top-bottom-table {
    margin-top: 2rem;
    background: #ffffff;
    border: 1px solid #dcdbdd;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
  }
  .core-equip-status {
    border-bottom: 4px solid #258aff;
    border-radius: 2px;
    margin-left: 12.5%;
    margin-right: 0px;
    &:first-of-type {
      width: 125%;
    }
    &:last-of-type {
      margin-right: 7.5%;
    }
  }
  .block {
    float: right;
    margin-right: -1.2rem;
    margin-top: 1.5rem;
  }
}
</style>

