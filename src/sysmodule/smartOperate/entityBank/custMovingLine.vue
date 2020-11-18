<template>
  <div class="entity-movingLine-main-content">
    <el-row>
      <el-col :span="24">
        <div class="time-select-nav">
          <div class="time-select">
            <time-select></time-select>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="main-show-div" v-if="movingData != null && movingData.length>0">
        <div class="show-title">
            客户动线排名
        </div>
        <div v-for="(item,index) in movingData" :key="item.id">
          <el-row>
            <el-col :span="16" :offset="4">
              <div>
                <movingLine :itemName="item.custDesc" :itemValue="item.routesCount" :itemIndex="index" :maxItem="movingData[0].routesCount"></movingLine>
              </div>
            </el-col>
          </el-row>
        </div>
    </div>
    <div v-else class="occupied-div">
      <occupied explain='暂无排名数据~~'/>
    </div>
  </div>
</template>

<script>
import timeSelect from '@/components/TimeSelect/timeSelect'
import movingLine from '@/syscomponents/smartOperate/Charts/custMovingLineDetail.vue'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'entity_custMovingLine',
  data: function () {
    return {
      movingData: null,
      movingType: {
        A: '自助',
        B: '排队',
        C: '移动厅堂',
        D: '填单',
        E: '高柜',
        F: '低柜'
      }
    }
  },
  mounted () {
    // this.requestMovingLineDetail()
  },
  activated () {
    this.requestMovingLineDetail()
  },
  components: {
    timeSelect,
    movingLine,
    occupied
  },
  methods: {
    // 获取客户动线信息
    requestMovingLineDetail () {
      const selectDateType = this.$store.state.operate.timeRange
      const me = this
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      me.$http.get('custMovingLine', params).then((result) => {
        me.movingData = result.routeList
        if (me.movingData != null) {
          for (let index = 0; index < me.movingData.length; index++) {
            const element = me.movingData[index].custRoutes
            if (element !== null) {
              const elementarr = element.toString().split('')
              let routes = ''
              for (let index = 0; index < elementarr.length; index++) {
                const elementtmp = elementarr[index]
                if (index === 0) {
                  routes =  me.movingType[elementtmp]
                } else {
                  routes = routes + '→' + me.movingType[elementtmp]
                }
              }
              me.$set(me.movingData[index], 'custDesc', routes)
            }
          }
        }
      })
    }
  },
  watch: {
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': {
      handler (newValue, oldValue) {
        if (base.isActivity(this.$options.name)) { this.requestMovingLineDetail() }
      }
    },
    '$store.state.orgId': {
      handler (newValue, oldValue) {
        if (base.isActivity(this.$options.name)) this.requestMovingLineDetail()
      }
    },
    '$store.state.operate.dayDateRange': {
      handler (newValue, oldValue) {
        if (base.isActivity(this.$options.name)) { this.requestMovingLineDetail() }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.entity-movingLine-main-content {
  background: #f2f3f7;
  padding: 0rem 1rem 1rem 1rem;
  width: 100%;
  .el-row {
    margin-top: 15px;
  }
  .main-show-div {
    margin-top:15px;
    min-height:10rem;
    background:#fff;
    border-radius:8px;
    .show-title {
      padding:3.5% 0 3% 16.5%;
      font-size:24px;
      font-weight:600;
      text-align:left;
    }
  }
  .time-select-nav{
    min-height: 25px;
    .time-select{
      position: absolute;
      right: 10px;
    }
  }
  .occupied-div {
    margin-top:15px;
  }
}

</style>
