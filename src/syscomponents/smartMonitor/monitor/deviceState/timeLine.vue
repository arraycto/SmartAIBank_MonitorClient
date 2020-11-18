<template>
  <div class="wrapper" v-if="operadetail&&operadetail!=null&&operadetail!=''">
    <ul class="timeline">
      <li v-for="(item,index) in operadetail" :key="index">
        <div class="day" v-if="item.operationDate!=yesterdayStr&&index==0">
          <span>
            <b>今天</b>
          </span>
        </div>
        <div class="day" v-if="null!=item.flag">
          <span>
            <b>昨天</b>
          </span>
        </div>
        <span class="time">{{item.operationTime}}</span>
        <h4 class="time-line-status-user">
          {{item.operatorName}}
          <span class="time-line-status-user-context">{{item.operationContent}}</span>
        </h4>
        <span
          class="time-line-status"
          v-bind:class="{ 'nomal-font-color':item.operationResultId === '4'
            ||item.operationResultId === '3'
            ||item.operationResultId === '2'
            ||item.operationResultId === '1',
             'fail-font-color':item.operationResultId === '5' }"
        >
          {{item.operationResultDesc}}
          <span
            v-if="item.operationResultId === '4'
                ||item.operationResultId === '3'
                ||item.operationResultId === '2'
                ||item.operationResultId === '1'"
          >
            <i class="el-icon-check"></i>
          </span>
          <span v-if="item.operationResultId === '5'">
            <i class="el-icon-close"></i>
          </span>
        </span>
      </li>
    </ul>
  </div>
  <occupied v-else height="600px" explain="暂无数据" />
</template>

<script>
import occupied from '@/components/Occupied/occupied'
export default {
  name: 'timeline',
  data () {
    return {
      yesterdayStr: '',
      todayStr: ''
    }
  },
  components: {
    occupied
  },
  props: {
    operadetail: {
      type: Array,
      default: function () {
        return [
          {
            operationTime: '12:20:21',
            operatorName: 'addd',
            operationContent: '发送服务',
            operationResultDesc: '执成功',
            operationDate: '20190702'
          },
          {
            operationTime: '12:20:21',
            operatorName: 'addd',
            operationContent: '发送服务',
            operationResultDesc: '执成功',
            operationDate: '20190702'
          },
          {
            operationTime: '12:20:21',
            operatorName: '333',
            operationContent: '发送服务',
            operationResultDesc: '执成功',
            operationDate: '20190701'
          },
          {
            operationTime: '12:20:21',
            operatorName: '123',
            operationContent: '发送服务',
            operationResultDesc: '执成功',
            operationDate: '20190701'
          }
        ]
      }
    }
  },
  watch: {
    operadetail (obj) {
      this.getYesterDay()
    }
  },
  mounted () {

  },
  methods: {
    getYesterDay: async function () {
      var curDate = new Date()
      var preDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000)
      var year = preDate.getFullYear()
      var month = preDate.getMonth() + 1
      var strDate = preDate.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      } else {
        month = month.toString()
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      } else {
        strDate = strDate.toString()
      }

      this.yesterdayStr = year + month + strDate
      var isFist = true
      this.operadetail.map((item, index) => {
        if (item.operationDate === this.yesterdayStr) {
          if (isFist) {
            this.operadetail[index]['flag'] = 'yesterday'
            isFist = false
          }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.timeline li .day {
  font-size: 18px;

  font-family: PingFangSC-Semibold;
  color: #333333;
  letter-spacing: 0;
  float: left;
  margin-left: -5.6rem;
  margin-top: -1.3rem;
}
.timeline {
  width: 100%;
  height: auto;
  margin: 20px auto;
  padding-bottom: 1rem;
  list-style: none;
}
.timeline li {
  position: relative;
  padding-left: 100px;
}

.timeline li h4 {
  color: #4a4a4a;
  font-size: 16px;
  margin-bottom: 1rem;
  font-family: PingFangSC-Semibold;
  height: 16px;
  padding-top: 7px;
}
.timeline li h4 span {
  color: #000000;
  font-size: 14px;
  margin-bottom: 0.8rem;
  margin-left: 10px;
  font-family: PingFangSC-Regular;
}
.timeline li h4:before {
  content: "";
  display: block;
  position: absolute;
  width: 15px;
  height: 15px;
  left: 0;
  margin-left: 65px;
  top: 10px;
  background: #258aff;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  border-radius: 100%;
  background-size: 10px 10px;
}
.timeline li h4:after {
  content: "";
  display: block;
  position: absolute;
  width: 2px;
  height: 100%;
  background: #d8d8d8;
  left: 0;
  top: 27px;
  margin-left: 71px;
}
.timeline li p {
  width: 100%;
  height: auto;
  background: #f4f4f4;
  padding: 0.8rem 1.5rem 1.5rem 0.8rem;
  color: #272b3e;
  font-size: 14px;
  line-height: 140%;
}
.timeline li .time {
  position: absolute;
  left: -17px;
  font-size: 16px;
  margin-top: 10px;
}

//执行成功字体样式
.nomal-font-color {
  color: #55cfb4;
}
//执行失败字体样式
.fail-font-color {
  color: #ec4545;
}
.time-line-status-user {
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
}
.time-line-status-user-context {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #4a4a4a;
  letter-spacing: 0;
  line-height: 22px;
}
</style>
