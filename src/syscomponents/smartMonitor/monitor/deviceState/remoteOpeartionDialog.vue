<template>
  <el-dialog title="远程操作记录"
   :visible.sync="dialogTableVisible"
   fullscreen :close-on-click-modal="false"
   class="remote-view"
   >
   <div>
   <el-row>
     <el-col :span="5">
      <div class="query-condition-laber">
            <nobr>
              <label>操作人员</label>
              <el-select size="small" v-model="operaPerson" placeholder="请选择" class="remote-input-magin" filterable>
                <el-option label="全部" value="notValue"></el-option>
                <el-option
                  v-for="item in operaPersonList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                ></el-option>
              </el-select>
            </nobr>
      </div>
      </el-col>
      <el-col  :span="5">
      <div class="query-condition-laber">
            <nobr>
              <label>设备类型</label>
              <el-select  size="small" v-model="deviceType" placeholder="请选择" class="remote-input-magin" filterable>
                <el-option label="全部" value="notValue"></el-option>
                <el-option
                  v-for="item in deviceTypeList"
                  :key="item.devClassKey"
                  :label="item.devClassName"
                  :value="item.devClassKey"
                ></el-option>
              </el-select>
            </nobr>
      </div>
      </el-col>
      <el-col :span="5">
      <div class="query-condition-laber">
            <nobr>
              <label>设备编号</label>
              <el-input size="small" v-model="deviceNo" placeholder="请选择" class="remote-input-magin"></el-input>
            </nobr>
      </div>
      </el-col>
        <el-col :span="5">
      <div class="query-condition-laber">
            <nobr>
              <label>所属机构</label>
              <el-select size="small" v-model="org" placeholder="请选择" class="remote-input-magin" filterable>
               <el-option label="全部" value="notValue"></el-option>
                <el-option
                  v-for="item in orgList"
                  :key="item.branchNo"
                  :label="item.label"
                  :value="item.branchNo"
                ></el-option>
              </el-select>
            </nobr>
      </div>
      </el-col>
        <el-col :span="4">
      <div class="query-condition-laber">
        <div class="top-button-style">
          <el-button type="primary" @click="queryRemoteBtn">查询</el-button>
          <el-button @click="conditionReset">重置</el-button>
        </div>
      </div>
      </el-col>
   </el-row>
</div>
   <div class="remote-table">
  <el-table :data="gridData"
      style="width: 100%;"
      stripe
      size="small"
      max-height="627"
      :header-cell-style="theadClassName">
      <el-table-column property="deviceID" label="设备编号"></el-table-column>
      <el-table-column property="deviceClassName" label="设备类型"></el-table-column>
      <el-table-column property="branchId,branchName" label="所属机构" min-width="180">
        <template slot-scope="scope">
          {{scope.row.branchId}}-{{scope.row.branchName}}
         </template>
      </el-table-column>
      <el-table-column property="operatorName" label="操作人员"></el-table-column>
      <el-table-column property="operationContent" label="操作内容"></el-table-column>
      <el-table-column property="operationTime" label="操作时间" min-width="135"></el-table-column>
      <el-table-column property="operationResultDesc" label="操作结果"></el-table-column>
      <el-table-column property="finishTime" label="结果返回时间" min-width="135"></el-table-column>
      <el-table-column property="branchId,branchName" label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.operationResultId==='4'&&(scope.row.operationInstruction.substring(0,6)==='GETLOG'||scope.row.operationInstruction.substring(0,6)==='GETPIC')" >
          <el-button
                    @click.stop="downPicOrLog(scope.row)"
                    plain size="mini">下载</el-button>
          </div>
         </template>
      </el-table-column>
      <div slot="empty">
          <occupied height='52.4vh' explain='暂无数据'/>
       </div>
    </el-table>
    </div>
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper, sizes"
        :total="totalSize">
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
import base from '@/common/base'
import services from '../../../../services'
import occupied from '@/components/Occupied/occupied'
import http from '../../../../common/service_http'
export default {
  name: '',
  data () {
    return {
      operaPerson: '', // 操作人员
      // 操作人员备选数据
      operaPersonList: [],
      deviceType: '', // 设备类型
      // 设备类型备选数据
      deviceTypeList: [],
      deviceNo: '', // 设备编号
      // 设备型号备选数据
      deviceNoList: [],
      org: '', // 所属机构
      // 所属机构备选数据
      orgList: [],
      gridData: [],
      branch: '',
      dialogTableVisible: false, // 页面是否展示
      currentPage: 1, // 当前页
      pageSize: 10, // 页面大小，
      totalSize: 0, // 总数，
      fileSuffix: ''
    }
  },
  mounted () {
    this.getArguService()
    this.getRemoteAllInfo()
  },
  components: { occupied },
  props: {
    coreBranchId: String // core父组件的机构id，被用于查询备选数据，以及查询列表数据
  },
  watch: {
    totalSize (val) {

    }
  },
  methods: {
    // 打开远程操作记录页面
    getRemoteLog () {
      var self = this
      self.dialogTableVisible = true
      self.getRemoteAllInfo()
    },
    // 获取备选数据
    getArguService: async function () {
      var self = this
      try {
        self.operaPersonList = await services.api.monitor.monitorDevice.selectOperators(base.getStore({ key: 'orgId' }))
        self.deviceTypeList = await services.api.monitor.monitorCondition.getDevType()
        const orgList1 = await services.api.monitor.monitorCondition.getOrgInfo(base.getStore({ key: 'orgId' }))
        orgList1.map((item, index) => {
          var orgid = item.branchNo
          var orgname = item.branchName
          var label = orgid + '-' + orgname
          orgList1[index]['label'] = label
        })
        self.orgList = orgList1
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 重置
    conditionReset () {
      this.operaPerson = null
      this.deviceType = null
      this.deviceNo = null
      this.org = null
      this.getArguService()
    },
    // 点击查询按钮
    queryRemoteBtn: async function () {
      this.currentPage = 1
      this.getRemoteAllInfo()
      if (this.totalSize === 0) {
        this.$message({
          message: '暂无数据',
          type: 'info'
        })
      }
    },
    // 调用服务返回列表数据
    getRemoteAllInfo: async function () {
      var self = this
      if (self.operaPerson === 'notValue') {
        this.operaPerson = ''
      }
      if (self.deviceType === 'notValue') {
        this.deviceType = ''
      }
      if (self.org === 'notValue') {
        this.org = ''
      }
      const remote = {
        operatorId: self.operaPerson,
        deviceClassKey: self.deviceType,
        deviceID: self.deviceNo,
        branchId: self.org
      }
      try {
        const equipment = await services.api.monitor.monitorDevice.selectAllRemoteInfo(base.getStore({ key: 'orgId' }), this.currentPage, this.pageSize, remote)
        self.gridData = equipment.list || []
        self.totalSize = equipment.total || 0
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 每页数量改变
    handleSizeChange (val) {
      this.pageSize = val
      this.getRemoteAllInfo()
    },
    // 当前页改变
    handleCurrentChange (val) {
      this.currentPage = val
      this.getRemoteAllInfo()
    },
    // 调整头部字体样式
    theadClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color: #333;font-size:14px;font-family: PingFangSC-Semibold;;font-weight:normal'
      }
    },
    // 文件下载
    async downPicOrLog (val) {
      var self = this
      let params
      if (val.operationInstruction.substring(0, 6) === 'GETLOG') {
        if (val.deviceClassKey === '100000') {
          const queuePicName = val.finishTime.replace(/-/g, ' ').replace(/:/g, ' ').replace(/\s+/g, '').substring(0, 8)
          params = 'DEVICE_' + val.deviceID + '_' + queuePicName + '.zip'
        } else {
          // 文件名的一部分
          const aa = val.operationInstruction.substring(7).toLowerCase()
          params = val.deviceID + '_' + aa + '.log.gz'
        }
        // const data = await services.api.monitor.fileDownLoad.download(params)
      } else if (val.operationInstruction.substring(0, 6) === 'GETPIC') {
        // 判断是否为排队机
        if (val.deviceClassKey === '100000') {
          const queuePicName = val.finishTime.replace(/-/g, ' ').replace(/:/g, ' ').replace(/\s+/g, '').substring(0, 8)
          params = 'PIC_' + val.deviceID + '_' + queuePicName + '.zip'
        } else {
          // 文件名的一部分
          const picName = val.finishTime.replace(/-/g, ' ').replace(/:/g, ' ').replace(/\s+/g, '')
          params = val.deviceID + '_' + picName + '.jpg'
        }
      }
      const getUrl = `/api/v1/monitor/download`
      const queryParams = {
        params: {
          fileName: params
        },
        responseType: 'blob'
      }
      try {
        const data = await http.get(getUrl, queryParams)
        const blob = new Blob([data], {
          type: 'application/octet-stream'
        })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', params)
        document.body.appendChild(link)
        link.click()
      } catch (err) {
        self.$message({
          message: '文件下载异常, 请检查文件是否存在！',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.remote-view{
    width: 73%;
    margin-top: 7%;
    margin-left: 21%;
    height: 82%;
    border-radius: 4px;
  }
.query-condition-laber{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0;
    text-align: left;
    float: left;
    margin-left: 10px;
    height: 10px;
}
.remote-input-magin {
        width: 105px;
        margin-left: 10px;
}
.el-input--medium .el-input__inner {
    height: 30px;
    line-height: 30px;
}
.remote-table{
  margin-top: 40px;
  margin-right:10px;
  margin-left:10px;
  border: 1px solid #E5E5E5
}
.el-button{
      padding-top: 8px;
      width: 65px;
      height: 30px;
      font-size: 12px;
}
.el-dialog__title{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #333333;
  letter-spacing: 0;
}
.el-row{
  margin-top: -20px;
}
.block{
  float:right;
  margin-top: 15px;
  margin-bottom: 15px
}
</style>
