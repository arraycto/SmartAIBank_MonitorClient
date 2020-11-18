<template>
    <el-button @click.stop="excelExport()" class="derive-btn" plain size="mini">报表导出
    </el-button>
</template>
<script>
var clientConfig = window.DCSpace.sysConfig
var baseUrl = clientConfig.serveUrl
var axios = require('axios')
export default {
  data: function () {
    return {

    }
  },
  mounted () {

  },
  components: {
  },
  props: {
    tableParams: Object,
    branchId: String,
    buttonId: String
  },
  methods: {
    // 文件下载
    async excelExport () {
      const self = this
      let getUrl
      if (this.buttonId === 'errorAccount') {
        getUrl = baseUrl + `api/v1/history/report/excel/errorAccount/page/${this.branchId}`
      } else if (this.buttonId === 'deviceOperation') {
        getUrl = baseUrl + `api/v1/history/report/excel/${this.branchId}`
      } else if (this.buttonId === 'deviceTrouble') {
        getUrl = baseUrl + `api/v1/history/report/excel/peripheral/fault-rate/gather/${this.branchId}`
      } else if (this.buttonId === 'tranQuality') {
        getUrl = baseUrl + `api/v1/history/report/excel/tranQuality/page`
      } else if (this.buttonId === 'tickertape') {
        getUrl = baseUrl + `api/v1/history/report/excel/equipment/supplies/${this.branchId}`
      } else if (this.buttonId === 'deviceTroubleDetial') {
        getUrl = baseUrl + `api/v1/history/report/export/peripheral/detail/${this.branchId}`
      } else if (this.buttonId === 'faulHand') {
        getUrl = baseUrl + `api/v1/history/report/excel/managers/fault-handling-speed/${this.branchId}`
      } else if (this.buttonId === 'satisfactionTeller') {
        getUrl = baseUrl + `api/v1/history/report/excel/satisfactionTeller/page/${this.branchId}`
      } else if (this.buttonId === 'satisfactionOrgReport') {
        getUrl = baseUrl + `api/v1/history/report/excel/satisfactionOrgReport/page/${this.branchId}`
      } else if (this.buttonId === 'tradeTimeZH') {
        getUrl = baseUrl + `api/v1/history/report/excel/zhview/tradetimes/${this.branchId}`
      } else if (this.buttonId === 'tradeTimeLeader') {
        getUrl = baseUrl + `api/v1/history/report/excel/leaderview/tradetime/${this.branchId}`
      } else if (this.buttonId === 'coreQuWaitTime') {
        getUrl = baseUrl + `api/v1/history/report/excel/coreBankQu/waittime/${this.branchId}`
      } else if (this.buttonId === 'tradetimecounterclerkReport') {
        getUrl = baseUrl + `api/v1/history/report/excel/counterclerk/tradetime/${this.branchId}`
      } else if (this.buttonId === 'tradeTimeBranchReport') {
        getUrl = baseUrl + `api/v1/history/report/excel/Branch/tradetime/${this.branchId}`
      } else if (this.buttonId === 'serviceTimeReport') {
        getUrl = baseUrl + `api/v1/history/report/excel/time/service/${this.branchId}`
      } else if (this.buttonId === 'waittingTimebranchReport') {
        getUrl = baseUrl + `api/v1/history/report/excel/branch/waittingtime/${this.branchId}`
      } else if (this.buttonId === 'clientflowreport') {
        getUrl = baseUrl + `api/v1/history/report/excel/branch/waittingtime/${this.branchId}`
      } 
      // console.log(getUrl)
      self.exportExcel(getUrl, self.tableParams)
    },


    // 报表导出实际调用方法
    exportExcel (url, options = {}) {
      const self = this
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: url, // 请求地址
          data: options, // 参数
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'token': sessionStorage.httpToken
          },
          responseType: 'blob' // 表明返回服务器返回的数据类型
        }).then(
          response => {
            // console.log(response.headers)
            resolve(response.data)
            const blob = new Blob([response.data], {
              type: 'application/octet-stream'
            })
            // const fileName = Date.parse(new Date()) + '.xlsx'

            var fileName = response.headers['content-disposition'].split(';')[1].split('filename=')[1]
            var fileNameUnicode = response.headers['content-disposition'].split('filename*=')[1]
            if (fileNameUnicode) { // 当存在 filename* 时，取filename* 并进行解码（为了解决中文乱码问题）
              fileName = decodeURIComponent(fileNameUnicode.split("''")[1])
            }

            if (window.navigator.msSaveOrOpenBlob) {
              // console.log(2)
              navigator.msSaveBlob(blob, fileName)
            } else {
              // console.log(3)
              var link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = fileName
              link.click()
              // 释放内存
              window.URL.revokeObjectURL(link.href)
            }
          }
        ).catch(function (errors) {
          self.$message({
            message: errors.message,
            type: 'error'
          })
        })
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.derive-btn{
      background-color: #F5A623;
      color: #fff;
      border-radius: 0.2rem;
    }
</style>
