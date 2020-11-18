<template>
  <div class="org-table-content">
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="headerStyle"
      border
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="机构代号" width="216">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="name" label="机构名称"></el-table-column>
      <el-table-column prop="levelName" label="机构级别" width="235"></el-table-column>
      <el-table-column prop="typeName" label="机构类型" width="230"></el-table-column>
      <el-table-column prop="busSupName" label="业务管理上级" width="230"></el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            plain
          >编辑</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleDetail(scope.$index, scope.row)"
            plain
          >详情</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleSingleDelete(scope.$index, scope.row)"
            plain
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row v-if="totalNum > 10 ? true: false">
      <el-col :span="22">
        <div class="pagenation-style">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            background
            :page-sizes="[100, 200, 300, 400]"
            :page-size="pagesize"
            layout="prev, pager, next, jumper"
            :total="totalNum"
          ></el-pagination>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="pagenation-style">
          <el-select v-model="pagesize" placeholder="请选择" class="pagenation-magin" @change="reQuery">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <span>确定删除该机构信息吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteOperation">确 定</el-button>
      </span>
    </el-dialog>
    <editDialog ref="editDialog" @needQueryData="queryOrgInfo('currOrgId','currLevelId','currOrgName','currOrgType',true)"></editDialog>
    <detailDialog ref="detailDialog"></detailDialog>
  </div>
</template>

<script>
import editDialog from '@/syscomponents/smartManager/orgManage/orgManageDialog'
import detailDialog from '@/syscomponents/smartManager/orgManage/orgManageDetailDialog'
import services from '../../../services'
import base from '@/common/base'
export default {
  name: 'orgManageTable',
  data () {
    return {
      options: [{
        value: 10,
        label: '10条/页'
      }, {
        value: 30,
        label: '30条/页'
      }, {
        value: 50,
        label: '50条/页'
      }, {
        value: 100,
        label: '100条/页'
      }],
      currentPage: 0,
      // 每页显示多少数据
      pagesize: 10,
      // 删除对话框是否显示
      dialogVisible: false,
      // 绑定的表头样式
      headerStyle: { background: '#fafafa', color: '#000' },
      // 需要删除的记录
      needDeleteData: {},
      tableData: [],
      currOrgId: '',
      currLevelId: '',
      currOrgName: '',
      currOrgType: '',
      totalNum: 0
    }
  },
  mounted () {
  },
  components: {
    editDialog,
    detailDialog
  },
  methods: {
    // 当前页  用于分页器
    handleCurrentChange: function (currPage) {
      this.currentPage = currPage
      this.queryOrgInfo(this.currOrgId, this.currLevelId, this.currOrgName, this.currOrgType, true)
    },
    // 表格中的删除
    handleSingleDelete: function (index, row) {
      this.needDeleteData = {}
      this.dialogVisible = true
      this.needDeleteData = row
    },
    // 发服务删除记录
    deleteOperation: async function () {
      var self = this
      try {
        await services.api.manage.orgInfo.updateStatusById(self.needDeleteData.orgId)
        self.dialogVisible = false
        self.queryOrgInfo(self.currOrgId, self.currLevelId, self.currOrgName, self.currOrgType, true)
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 表格中选中的数据发生变化
    handleSelectionChange: function (val) {
      this.needDeleteData = val
    },
    handleEdit: function (index, row) {
      this.$refs.editDialog.editItem(row)
    },
    handleDetail: function (index, row) {
      this.$refs.detailDialog.showItem(row)
    },
    queryOrgInfo: async function (orgId, orgNameCn, orgLevelId, orgTypeId, isInnerQuery) {
      var self = this
      self.tableData = []
      if (!isInnerQuery) {
        self.currOrgId = orgId
        self.currLevelId = orgLevelId
        self.currOrgName = orgNameCn
        self.currOrgType = orgTypeId
      }
      var queryData = {
        'id': orgId,
        'name': orgNameCn,
        'type': orgTypeId,
        'level': orgLevelId,
        'userOrgId': base.getStore({ 'key': 'orgId' })
      }
      try {
        const queryResult = await services.api.base.org.selectByPage(queryData, self.currentPage, self.pagesize)
        self.tableData = queryResult.list
        self.totalNum = queryResult.total
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    reQuery: function () {
      this.queryOrgInfo(this.currOrgId, this.currLevelId, this.currOrgName, this.currOrgType, true)
    }
  },
  watch: {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "@/styles/smartManager/commom-manager.scss";
.org-table-content {
  padding: 1rem 1rem 0 2rem;
  .el-table thead {
    color: #000;
  }
  .pagenation-style {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    padding: 1rem 0 2rem 0;
  }
  .pagenation-magin{
    width: 80%;
    margin-left: 10px;
  }
  .el-input__icon {
    line-height: 1.875rem !important;
    width: 1.25rem;
  }
  .el-select .el-input__inner {
    margin-top: 0.1rem;
    height: 1.875rem;
    padding-right: 1.25rem;
    font-size: 8px;
  }
  .el-table--border th:first-child .cell,.el-table--border td:first-child .cell {
    padding-left: $tableHeaderPadding;
  }
  .el-table .cell, .el-table th div{
    padding-left: $tableHeaderPadding;
    color: $oneFontColor;
  }
  .el-table--border td {
    border-right: 1px solid $lineColor;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: $tableSelectHover;
  }
  .el-table tr {
    height: $tableRowHeight;
  }
}
</style>

