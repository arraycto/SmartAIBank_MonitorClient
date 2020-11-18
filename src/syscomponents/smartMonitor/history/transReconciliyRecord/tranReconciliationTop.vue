  <template>
  <div>
    <div class="top">
      <el-row :gutter="10">
        <el-col :span="4.5">
          <span class="top-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机构</span>
          <el-select
            v-model="orgId"
            size="mini"
            placeholder="请选择"
            class="top-select top-select-width"
            filterable
            @change="branchIdChange"
          >
            <el-option
              v-for="item in orglist"
              :key="item.branchNo"
              :label="item.branchNo+'-'+item.branchName"
              :value="item.branchNo"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4.5">
          <span class="top-text">设备类型</span>
          <el-select
            v-model="devType"
            size="mini"
            placeholder="请选择"
            class="top-select top-select-width"
            @change="devChange"
          >
            <el-option
              v-for="item in equipTypelist"
              :key="item.devClassKey"
              :label="item.devClassName"
              :value="item.devClassKey"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4.5">
          <span class="top-text">设备编号</span>
          <el-select
            v-model="devId"
            size="mini"
            placeholder="请选择"
            class="top-select top-select-width"
          >
            <el-option
              v-for="item in deviceNoList"
              :key="item.deviceId"
              :label="item.deviceId"
              :value="item.deviceId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6.5">
          <span class="top-text">时间</span>
          <el-date-picker
            v-model="startDate"
            type="date"
            size="mini"
            placeholder="开始时间"
            :picker-options="{disabledDate: time => time.getTime() > Date.now()- 3600 * 1000 * 24 || time.getTime() < new Date(this.startTranDate).getTime()-3600*1000*24}"
            class="top-date-width date-style"
          ></el-date-picker>
          <el-date-picker
            v-model="endDate"
            type="date"
            size="mini"
            placeholder="结束时间"
            :picker-options="{disabledDate: time => time.getTime() > Date.now()- 3600 * 1000 * 24 || time.getTime() < new Date(this.startTranDate).getTime()-3600*1000*24}"
            class="top-date-width date-style"
          ></el-date-picker>
        </el-col>
        <el-col :span="4">
          <div class="top-btn">
            <el-button type="primary" size="mini" @click="queryBtnOnClick">查询</el-button>
            <el-button size="mini" @click="reset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <tranReconciliationTable :tableList="tableList" :totalSize="totalSize"></tranReconciliationTable>
  </div>
  </template>
<script>
import services from '../../../../services'
import base from '@/common/base'
import tranReconciliationTable from '@/syscomponents/smartMonitor/history/transReconciliyRecord/tranReconciliationTable'
export default {
  name: 'tranReconciliationTop',
  data: function () {
    return {
      startDate: '',
      endDate: '',
      orgId: '',
      orglist: [], // 机构备选数据容器

      // 设备类型备选数据容器
      equipTypelist: [
        {
          devClassKey: '120000',
          devClassName: '自助存取款机'
        },
        {
          devClassKey: '130000',
          devClassName: '自助终端机'
        }
      ],
      devId: '',
      deviceNoList: [],
      devType: '',
      tableList: [],
      totalSize: 0, // 总数
      currentPage: 1, // 当前页
      pageSize: 10 // 每页条数
    }
  },
  components: {
    tranReconciliationTable
  },
  props: {

  },
  mounted () {
    this.getmonth()
    this.view()
  },
  methods: {
    getmonth: function () {
      let month = 0
      let year = 0
      if (Number(new Date().getMonth()) <= 2) {
        month = 12 - Number(new Date().getMonth())
        year = new Date().getFullYear() - 1
      } else {
        month = Number(new Date().getMonth()) - 2
        year = new Date().getFullYear()
      }
      month = month + 2
      var days = new Date().getDate()
      var day = 0
      if (month === 2) {
        if ((year % 4 === 0 && (year % 100) !== 0) || (year % 400) === 0) {
          day = 29
          if (day > days) {
            day = days
          }
        } else {
          day = 28
          if (day > days) {
            day = days
          }
        }
      } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        day = 30
        if (day > days) {
          day = days
        }
      } else {
        day = 31
        if (day > days) {
          day = days
        }
      }
      if (day < 10) {
        day = '0' + day
      }
      if (month < 10) {
        month = '0' + month
      }
      this.startTranDate = year + '-' + month + '-' + day
    },
    // 查询下拉列表备选数据
    async view () {
      try {
        // this.equipTypelist = await services.api.monitor.monitorCondition.getDevType()
        this.orglist = await services.api.monitor.monitorCondition.getRecordOrgInfo(base.getStore({ key: 'orgId' }))
      } catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    branchIdChange () {
      this.devType = ''
      this.devId = ''
    },
    async devChange () {
      this.devId = ''
      try {
        if (this.orgId !== '') {
          this.deviceNoList = await services.api.monitor.monitorCondition.getDeviceInfo(this.orgId, this.devType)
        } else {
          this.$message({
            message: '请选择机构号'
          })
        }
      }  catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 重置下拉列表及选中值
    reset () {
      this.orgId = ''
      this.devType = ''
      this.devId = ''
      this.startDate = ''
      this.endDate = ''
    },
    // 查询列表数据
    async getTableList (accountRecordParams) {
      this.tableList = []
      try {
        const tranReconciliationList = await services.api.monitor.monitorRemote.getAccountRecord(accountRecordParams)
        const tranReconciliation = JSON.parse(tranReconciliationList)
        if (tranReconciliation != null) {
          if (tranReconciliation.ACCOUNT_INFO) {
            if (tranReconciliation.ACCOUNT_INFO.ACCOUNT_LIST.length > 0) {
              tranReconciliation.ACCOUNT_INFO.ACCOUNT_LIST.map((item, index) => {
                const tableData = {}
                tableData.tranDate = item.TRAN_TIME
                tableData.tranResult = item.ACCOUNT_RESULT
                tableData.tranCardNo = item.PERIOD_ID
                tableData.startDate = item.START_DATE
                tableData.endDate = item.END_DATE
                tableData.deviceId = tranReconciliation.ACCOUNT_INFO.MID
                tableData.devClassName = tranReconciliation.ACCOUNT_INFO.DEVICE_TYPE_NAME
                tableData.branchId = tranReconciliation.ACCOUNT_INFO.BRANCH_NO
                tableData.branchName = tranReconciliation.ACCOUNT_INFO.BRANCH_NAME
                tableData.deviceType = tranReconciliation.ACCOUNT_INFO.DEVICE_TYPE
                tableData.mac = tranReconciliation.ACCOUNT_INFO.MAC
                this.tableList.push(tableData)
              })
              this.totalSize = this.tableList.length
            } else {
              this.$message({
                message: '暂无数据',
                type: 'info'
              })
            }
          }
        }
      } catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 点击查询
    queryBtnOnClick () {
      if (this.endDate !== '' && this.devId !== '' && this.startDate !== '') {
        if (this.endDate < this.startDate) {
          this.$message({
            message: '结束日期不能小于开始日期'

          })
        } else {
          if ((this.endDate - this.startDate) / (24 * 60 * 60 * 1000) > 30) {
            this.$message({
              message: '开始日期与结束日期间隔不能超过30天'
            })
          } else {
            const endTime = this.dateToString(this.endDate)
            const startTime = this.dateToString(this.startDate)
            const queryPrame = {
              endDate: endTime,
              mid: this.devId,
              orgId: this.orgId,
              startDate: startTime,
              user: base.getStore({ key: 'userName' })
            }
            this.getTableList(queryPrame)
          }
        }
      } else {
        if (this.endDate === '') {
          this.$message({
            message: '请选择结束时间'
          })
        } else if (this.startDate === '') {
          this.$message({
            message: '请选择开始时间'
          })
        } else if (this.devId === '') {
          this.$message({
            message: '请选择设备编号'
          })
        } else if (this.devType === '') {
          this.$message({
            message: '请选择设备类型'
          })
        } else if (this.orgId === '') {
          this.$message({
            message: '请选择机构'
          })
        }
      }
    },
    // 日期转字符串
    dateToString: function (date) {
      var year = date.getFullYear()
      var month = (date.getMonth() + 1).toString()
      var day = (date.getDate()).toString()
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      var dateTime = year + month + day
      return dateTime
    }
  }
}
</script>
  <style rel="stylesheet/scss" lang="scss" scoped>
.top {
  background: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(225, 226, 230, 0.5);
  border-radius: 8px;
  padding: 1.15rem 0;
}
.top-time {
  float: right;
  padding-right: 20px;
}
.top-text {
  display: inline-block;
  font-size: 14px;
  line-height: 4rem;
}
.top-select {
  margin-left: 0.5rem;
  width: 10.4vw;
  height: 30px;
}
.top-picker {
  margin-left: 0.5rem;
}
.top-btn {
  float: right;;
  padding-top: 16px;
}
.date-style {
  margin-left: 0.5rem;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 140px;
}
@media screen and (min-width: 1367px) {
  .top-select-width {
    width: 10.4vw;
  }
  .top-date-width {
    width: 150px;
  }
}
@media screen and (max-width: 1366px) {
  .top-select-width {
    width: 120px;
  }
  .top-date-width {
    width: 150px;
  }
}
</style>
