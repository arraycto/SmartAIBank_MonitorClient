<template>
  <div class="coer-busy-left">
    <div class="coer-busy-left-top">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="coer-busy-left-top-abnormal">
            <el-row>
              <span class="coer-busy-left-top-laber">等待客户数(人)</span>
              <span class="coer-busy-left-top-num">{{busyGather.waitingCustomers}}</span>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="coer-busy-left-top-abnormal">
            <el-row>
              <span class="coer-busy-left-top-laber">窗口平均等待客户数(人)</span>
              <span class="coer-busy-left-top-num">{{busyGather.avgWindowWaitingCustomers}}</span>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="coer-busy-left-top-abnormal">
            <el-row>
              <span class="coer-busy-left-top-laber">客户平均等待时间(分钟)</span>
              <span class="coer-busy-left-top-num">{{busyGather.avgWaitingTime}}</span>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="coer-busy-left-top-abnormal" v-if="iconShow">
            <div class="coer-busy-left-top-icon">
              <el-button circle size="mini" class="coer-busy-left-top-button" @click="clickOrgICon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#dcfs-wangdian" />
                </svg>
              </el-button>
            </div>
            <el-row>
              <span class="coer-busy-left-top-laber">客户最长等待时间(分钟)</span>
              <span class="coer-busy-left-top-num">{{busyGather.maxWaitingTime}}</span>
            </el-row>
          </div>
          <div class="coer-busy-left-top-maxWaitBranch" v-if="!iconShow">
            <div class="coer-busy-left-top-maxWaitBranch-icon">
              <el-button
                circle
                size="mini"
                class="coer-busy-left-top-maxWaitBranch-button"
                @click="clickMaxWaitTimeICon"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#dcfs-shijian" />
                </svg>
              </el-button>
            </div>
            <el-row>
              <span class="coer-busy-left-top-maxWait-laber">客户最长等待时间所属网点</span>
              <span class="coer-busy-left-top-maxWait-num">
                <span v-show="false">{{busyGather.maxWaitingTimeBranchId}}</span>
                <a
                  href="#"
                  @click="getmaxWaitingTime(busyGather.maxWaitingTimeBranchId)"
                >{{busyGather.maxWaitingTimeBranchName}}</a>
              </span>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div class="coer-busy-left-top-under">
        <el-row :gutter="10">
          <el-col :span="4" class="coer-busy-left-top-cow" @click.native="clickAll">
            <!-- <div class="coer-busy-left-top-line "></div> -->
            <div class="coer-busy-left-top-cow-shadow">
              <circlePanel class="equip-type-all" ref="circlePanel" :circleData="circleData[0]"></circlePanel>
              <div
                class="coer-busy-left-top-under-icon"
                v-bind:class="{'core-equip-status':allClick}"
              ></div>
            </div>
          </el-col>
          <el-col :span="4" class="coer-busy-left-top-cow" @click.native="clickSaturation">
            <div class="coer-busy-left-top-leftline linear"></div>

            <div class="coer-busy-left-top-line linear"></div>
            <div class="coer-busy-left-top-cow-shadow">
              <circlePanel class="equip-type-all" ref="circlePanel" :circleData="circleData[1]"></circlePanel>
              <div
                class="coer-busy-left-top-under-icon"
                v-bind:class="{'core-equip-status':saturationClick}"
              ></div>
            </div>
          </el-col>
          <el-col :span="4" class="coer-busy-left-top-cow" @click.native="clickBusy">
            <!-- <div class="coer-busy-left-top-leftline"></div>
            <div class="coer-busy-left-top-line"></div>-->
            <div class="coer-busy-left-top-cow-shadow">
              <circlePanel class="equip-type-all" ref="circlePanel" :circleData="circleData[2]"></circlePanel>
              <div
                class="coer-busy-left-top-under-icon"
                v-bind:class="{'core-equip-status':busyClick}"
              ></div>
            </div>
          </el-col>
          <el-col :span="4" class="coer-busy-left-top-cow" @click.native="clickNomal">
            <div class="coer-busy-left-top-leftline linear"></div>
            <div class="coer-busy-left-top-line linear"></div>
            <div class="coer-busy-left-top-cow-shadow">
              <circlePanel class="equip-type-all" ref="circlePanel" :circleData="circleData[3]"></circlePanel>
              <div
                class="coer-busy-left-top-under-icon"
                v-bind:class="{'core-equip-status':nomalClick}"
              ></div>
            </div>
          </el-col>
          <el-col :span="4" class="coer-busy-left-top-cow" @click.native="clickFree">
            <!-- <div class="coer-busy-left-top-leftline"></div>
            <div class="coer-busy-left-top-line"></div>-->
            <div class="coer-busy-left-top-cow-shadow">
              <circlePanel class="equip-type-all" ref="circlePanel" :circleData="circleData[4]"></circlePanel>
              <div
                class="coer-busy-left-top-under-icon"
                v-bind:class="{'core-equip-status':freeClick}"
              ></div>
            </div>
          </el-col>
          <el-col :span="4" class="coer-busy-left-top-cow" @click.native="clickNotOpear">
            <div class="coer-busy-left-top-leftline linear"></div>
            <div class="coer-busy-left-top-cow-shadow">
              <circlePanel ref="circlePanel" :circleData="circleData[5]"></circlePanel>
              <div
                class="coer-busy-left-top-under-icon"
                v-bind:class="{'core-equip-status':notOpearClick}"
              ></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="coer-busy-left-top-total">共{{total}}条记录</div>
    <div class="coer-busy-left-top-bottom-table">
      <coreBusyTable
        ref="coreBusyTable"
        :busyStatus="busyStatus"
        :branchId="branchId"
        v-on:totalSize="gettotal"
      ></coreBusyTable>
    </div>
  </div>
</template>

<script>
import services from '../../../../services'
import circlePanel from '@/syscomponents/smartMonitor/monitor/busyDegree/circleIcon'
import coreBusyTable from '@/syscomponents/smartMonitor/monitor/busyDegree/coreBusyTable'
import busyGather from '@/dummy/smartMonitor/busyDegree/busyGather.json'
export default {
  name: 'coreBusyLeft',
  components: { circlePanel, coreBusyTable },
  data () {
    return {
      total: 0, // 数量
      busyGather: {}, // 繁忙度汇总
      busyStatus: '5', // 繁忙度状态
      iconShow: true,
      notOpearClick: false, // 未营业边框显示
      freeClick: false, // 空闲边框显示
      allClick: false, // 点击全部边框显示
      saturationClick: false, // 点击饱和边框显示
      busyClick: false,
      nomalClick: false,
      circleData: [{
        type: 'photo',
        circleContent: 'icon-dcfs dcfs-device-state',
        color: '#258AFF',
        title: '网点总数',
        count: '0',
        unit: '(个)',
        rate: ''
      },
      {
        type: '',
        circleContent: '',
        color: '#EE667F',
        title: '饱和',
        count: '0',
        unit: '',
        rate: '0'
      },
      {
        type: '',
        circleContent: '',
        color: '#F5A623',
        title: '忙碌',
        count: '0',
        unit: '',
        rate: '0'
      },
      {
        type: '',
        circleContent: '',
        color: '#55CFB4',
        title: '正常',
        count: '0',
        unit: '',
        rate: '0'
      },
      {
        type: '',
        circleContent: '',
        color: '#1087FF',
        title: '空闲',
        count: '0',
        unit: '',
        rate: '0'
      },
      {
        type: '',
        circleContent: '',
        color: '#9B9B9B',
        title: '未营业',
        count: '0',
        unit: '',
        rate: '0'
      }]
    }
  },
  props: ['branchId', 'branchStatsType'],
  watch: {
    branchId (val) {
      this.clickAll()
      this.getBusyGather()
    },
    branchStatsType (val) {
      this.clickAll()
      this.getBusyGather()
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.clickAll()
      this.getBusyGather()
    }
  },
  mounted () {
    // this.clickAll()
    // this.getBusyGather()
  },
  methods: {
    // 发送后台服务获取繁忙度汇总信息
    getBusyGather: async function () {
      this.busyGather = busyGather
      try {
        var self = this
        this.busyGather = await services.api.monitor.monitorBusy.selectBusinessGatherInfo(this.branchId, this.branchStatsType)
        this.$set(this.circleData[0], 'count', this.busyGather.totalCount || 0)
        this.$set(this.circleData[1], 'count', this.busyGather.saturationCount || 0)
        this.$set(this.circleData[2], 'count', this.busyGather.busyCount || 0)
        this.$set(this.circleData[3], 'count', this.busyGather.normalCount || 0)
        this.$set(this.circleData[4], 'count', this.busyGather.idleCount || 0)
        this.$set(this.circleData[5], 'count', this.busyGather.unopenedCount || 0)
        this.$set(this.circleData[1], 'rate', parseFloat(this.busyGather.saturationRate || 0).toFixed(2))
        this.$set(this.circleData[2], 'rate', parseFloat(this.busyGather.busyRate || 0).toFixed(2))
        this.$set(this.circleData[3], 'rate', parseFloat(this.busyGather.normalRate || 0).toFixed(2))
        this.$set(this.circleData[4], 'rate', parseFloat(this.busyGather.idleRate || 0).toFixed(2))
        this.$set(this.circleData[5], 'rate', parseFloat(this.busyGather.unopenedRate || 0).toFixed(2))
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 点击未营业
    clickNotOpear () {
      this.notOpearClick = true
      this.freeClick = false
      this.allClick = false
      this.saturationClick = false
      this.busyClick = false
      this.nomalClick = false
      this.busyStatus = '0'
    },
    // 点击空闲
    clickFree () {
      this.notOpearClick = false
      this.freeClick = true
      this.allClick = false
      this.saturationClick = false
      this.busyClick = false
      this.nomalClick = false
      this.busyStatus = '1'
    },
    // 点击全部
    clickAll () {
      this.notOpearClick = false
      this.freeClick = false
      this.allClick = true
      this.saturationClick = false
      this.busyClick = false
      this.nomalClick = false
      this.busyStatus = '5'
    },
    // 点击饱和
    clickSaturation () {
      this.notOpearClick = false
      this.freeClick = false
      this.allClick = false
      this.saturationClick = true
      this.busyClick = false
      this.nomalClick = false
      this.busyStatus = '4'
    },
    // 点击忙绿
    clickBusy () {
      this.notOpearClick = false
      this.freeClick = false
      this.allClick = false
      this.saturationClick = false
      this.busyClick = true
      this.nomalClick = false
      this.busyStatus = '3'
    },
    // 点击正常
    clickNomal () {
      this.notOpearClick = false
      this.freeClick = false
      this.allClick = false
      this.saturationClick = false
      this.busyClick = false
      this.nomalClick = true
      this.busyStatus = '2'
    },
    // 点击机构图标
    clickOrgICon () {
      this.iconShow = false
    },
    // 点击最长等待时间图标
    clickMaxWaitTimeICon () {
      this.iconShow = true
    },
    // 获取总数
    gettotal (val) {
      this.total = val
    },
    getmaxWaitingTime (orgId) {
      var dataTime6 = parseInt(new Date().getTime())
      this.$store.commit('monitor/settableBranchId', orgId + dataTime6)

      // console.log(orgId)
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
@media screen and (min-width: 1367px) and (max-width: 1920px) {
  .coer-busy-left-top {
    background-color: #ffffff;
    padding: 1rem 1rem 0 1rem;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
  }
  .coer-busy-left-top-abnormal {
    position: relative;
    background-image: linear-gradient(-131deg, #6c9dfb 0%, #276bee 100%);
    border-radius: 8px;
    padding: 19px 10px 19px 11px;
    .coer-busy-left-top-icon {
      position: absolute;
      top: 0;
      right: 0;
      height: 29px;
      width: 31px;
      border-radius: 9px 0 9px 24px;
      background-image: linear-gradient(-140deg, #fbd249 4%, #f5a623 94%);
    }
    .coer-busy-left-top-button {
      position: absolute;
      top: 0;
      right: 0;
      height: 20px;
      width: 29px;
      border-radius: 0 0 0 24px;
      background-image: linear-gradient(-140deg, #fbd249 4%, #f5a623 94%);
      border: #fbd249;
      color: #ffffff;
    }
  }
  .coer-busy-left-top-maxWaitBranch {
    position: relative;
    background-image: linear-gradient(-140deg, #efb01c 4%, #f5a623 94%);
    border-radius: 8px;
    padding: 40px 10px 40px 11px;
    .coer-busy-left-top-maxWaitBranch-icon {
      position: absolute;
      top: 0;
      right: 0;
      height: 29px;
      width: 31px;
      border-radius: 0 0 0 24px;
      background-image: linear-gradient(-131deg, #6c9dfb 0%, #276bee 100%);
    }
    .coer-busy-left-top-maxWaitBranch-button {
      position: absolute;
      top: 0;
      right: 0;
      height: 20px;
      width: 29px;
      border-radius: 0 0 0 24px;
      border: #258aff;
      background-image: linear-gradient(-131deg, #6c9dfb 0%, #276bee 100%);
      color: #ffffff;
    }
    .coer-busy-left-top-maxWait-laber {
      position: absolute;
      top: -20px;
      left: 0;
      font-family: PingFangSC-Semibold;
      font-size: 12px;
      color: #ffffff;
      letter-spacing: 0;
      float: left;
    }
    .coer-busy-left-top-maxWait-num {
      position: absolute;
      top: 10px;
      right: 5px;
      font-family: DINAlternate-Bold;
      font-size: 12px;
      color: #ffffff;
      letter-spacing: 0;
    }
  }
  .coer-busy-left-top-laber {
    font-family: PingFangSC-Semibold;
    font-size: $smallFontSize;
    color: #FFFFFF;
    letter-spacing: 0;
    float: left;
    padding-top: 10px;
}
.coer-busy-left-top-num{
  font-family: DINAlternate-Bold;
  font-size: $XXXLargeFontSize;
  color: #FFFFFF;
  letter-spacing: 0;
  float: right;
  margin-right: 1vw;
}

.coer-busy-left-top-total{
  float: right;
  color: $tableFontTotalColor;
  font-size: $XSmallFontSize;
  font-family: $textFontFamily;
  margin-top: 0.5rem;
  margin-right: 1.2rem;
}
.coer-busy-left-top-under{
    padding-top: 1rem;
  }
  .coer-busy-left-top-under-icon {
    padding-bottom: 3rem;
    border-radius: 2px;
    border-bottom: 4px solid;
    border-color: #fff;
  }
  .equip-type-all {
    margin: 0 8%;
  }
  .coer-busy-left-top-cow {
    position: relative;
    .coer-busy-left-top-line {
      position: absolute;
      top:10px;
      right:0;
      height: 3.6vw;
      width: 1px;
      background: linear-gradient(
        top,
        #ffffff 100%,
        #d8d6d6 0%,
        #d8d6d6 100%,
        #ffffff 100%
      );
    }
    .coer-busy-left-top-leftline {
      position: absolute;
      top: 10px;
      left: 0;
      height: 3.6vw;
      width: 1px;
      background: linear-gradient(
        top,
        #ffffff 100%,
        #d8d6d6 0%,
        #d8d6d6 100%,
        #ffffff 100%
      );
      // background: #D8D6D6;
    }
  }
  .coer-busy-left-top-cow-shadow {
    position: relative;
  }
  .coer-busy-left-top-cow:hover .coer-busy-left-top-under-icon {
    // border-bottom: 4px solid #258AFF;
    // border-radius: 2px;
    border-color: #258aff;
    cursor: pointer;
  }
  .coer-busy-left-top-bottom-table {
    margin-top: 2rem;
    background: #ffffff;
    border: 1px solid #dcdbdd;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
  }
  .core-equip-status {
    // border-bottom: 4px solid #258AFF;
    border-color: #258aff;
    // border-radius: 2px;
  }
}
@media screen and (max-width: 1366px) {
  .coer-busy-left-top {
    background-color: #ffffff;
    padding: 1rem 1rem 0 1rem;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
  }
  .coer-busy-left-top-abnormal {
    position: relative;
    background-image: linear-gradient(-131deg, #6c9dfb 0%, #276bee 100%);
    border-radius: 8px;
    padding: 19px 10px 19px 11px;
    .coer-busy-left-top-icon {
      position: absolute;
      top: 0;
      right: 0;
      height: 29px;
      width: 31px;
      border-radius: 9px 0 9px 24px;
      background-image: linear-gradient(-140deg, #fbd249 4%, #f5a623 94%);
    }
    .coer-busy-left-top-button {
      position: absolute;
      top: 0;
      right: 0;
      height: 20px;
      width: 29px;
      border-radius: 0 0 0 24px;
      background-image: linear-gradient(-140deg, #fbd249 4%, #f5a623 94%);
      border: #fbd249;
      color: #ffffff;
    }
  }
  .coer-busy-left-top-maxWaitBranch {
    position: relative;
    background-image: linear-gradient(-140deg, #efb01c 4%, #f5a623 94%);
    border-radius: 8px;
    padding: 36px 10px 37px 11px;
    .coer-busy-left-top-maxWaitBranch-icon {
      position: absolute;
      top: 0;
      right: 0;
      height: 29px;
      width: 31px;
      border-radius: 0 0 0 24px;
      background-image: linear-gradient(-131deg, #6c9dfb 0%, #276bee 100%);
    }
    .coer-busy-left-top-maxWaitBranch-button {
      position: absolute;
      top: 0;
      right: 0;
      height: 20px;
      width: 29px;
      border-radius: 0 0 0 24px;
      border: #258aff;
      background-image: linear-gradient(-131deg, #6c9dfb 0%, #276bee 100%);
      color: #ffffff;
    }
    .coer-busy-left-top-maxWait-laber {
      position: absolute;
      top: -20px;
      left: 0;
      font-family: PingFangSC-Semibold;
      font-size: 12px;
      color: #ffffff;
      letter-spacing: 0;
      float: left;
    }
    .coer-busy-left-top-maxWait-num {
      position: absolute;
      top: 8px;
      right: 5px;
      font-family: DINAlternate-Bold;
      font-size: 12px;
      color: #ffffff;
      letter-spacing: 0;
    }
  }
  .coer-busy-left-top-laber {
    font-family: PingFangSC-Semibold;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: 0;
    float: left;
    padding-top: 10px;
  }
  .coer-busy-left-top-num {
    font-family: DINAlternate-Bold;
    font-size: $XXXLargeFontSize;
    color: #ffffff;
    letter-spacing: 0;
    float: right;
    margin-right: 5px;
  }

  .coer-busy-left-top-total {
    float: right;
    color: $tableFontTotalColor;
    font-size: $XSmallFontSize;
    font-family: $textFontFamily;
    margin-top: 0.5rem;
    margin-right: 1.2rem;
  }
  .coer-busy-left-top-under {
    padding-top: 1rem;
  }
  .coer-busy-left-top-under-icon {
    padding-bottom: 3rem;
    border-radius: 2px;
    border-bottom: 4px solid;
    border-color: #fff;
  }
  .equip-type-all {
    margin: 0 8%;
  }
  .coer-busy-left-top-cow {
    position: relative;
    .coer-busy-left-top-line {
      position: absolute;
      top: 10px;
      right: 0;
      height: 3.6vw;
      width: 1px;
      background: linear-gradient(
        top,
        #ffffff 100%,
        #d8d6d6 0%,
        #d8d6d6 100%,
        #ffffff 100%
      );
    }
    .coer-busy-left-top-leftline {
      position: absolute;
      top: 10px;
      left: 0;
      height: 3.6vw;
      width: 1px;
      background: linear-gradient(
        top,
        #ffffff 100%,
        #d8d6d6 0%,
        #d8d6d6 100%,
        #ffffff 100%
      );
      // background: #D8D6D6;
    }
  }
  .coer-busy-left-top-cow-shadow {
    position: relative;
  }
  .coer-busy-left-top-cow:hover .coer-busy-left-top-under-icon {
    // border-bottom: 4px solid #258AFF;
    // border-radius: 2px;
    border-color: #258aff;
    cursor: pointer;
  }
  .coer-busy-left-top-bottom-table {
    margin-top: 2rem;
    background: #ffffff;
    border: 1px solid #dcdbdd;
    box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
    border-radius: 8px;
  }
  .core-equip-status {
    // border-bottom: 4px solid #258AFF;
    border-color: #258aff;
    // border-radius: 2px;
  }
}
</style>

