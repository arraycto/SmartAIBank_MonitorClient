<template>
  <div class="user-dialog-content">
    <transition name="dialog">
      <el-dialog :title="dialogTitle" :visible.sync="isShowdialog" width="30%" top="0" fullscreen :close-on-click-modal="false">
        <div class="border-style"></div>
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree :data="data" show-checkbox node-key="id" :filter-node-method="filterNode" :props="defaultProps" ref="tree"></el-tree>
        <div id="bottomBoder" class="border-style"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowdialog = false">取 消</el-button>
          <el-button type="primary" :disabled="true">保 存</el-button>
        </span>
      </el-dialog>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'userRoleDialog',
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  data () {
    return {
      // 标题（新增，修改）
      dialogTitle: '',
      // 是否显示侧滑框
      isShowdialog: false,
      // 关键字
      filterText: '',
      data: [{
        id: 'system1',
        name: '系统1',
        rolelist: [{
          id: 'role1',
          name: '角色1'
        }, {
          id: 'role2',
          name: '角色2'
        }]
      }, {
        id: 'system2',
        name: '系统2',
        rolelist: [{
          id: 'role1',
          label: '角色1'
        }, {
          id: 'role2',
          label: '角色2'
        }]
      }],
      defaultProps: {
        children: 'rolelist',
        label: 'name' || 'label'
      }

    }
  },
  mounted () {
  },
  methods: {
    //
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 用户角色设置
    roleItem: function () {
      this.dialogTitle = '用户角色设置'
      this.isShowdialog = true
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss">
@import "@/styles/smartManager/commom-manager.scss";
.user-dialog-content {
  .el-dialog__wrapper {
    left: 70%;
  }
  .el-dialog__wrapper > div:first-child{
    min-width: 36rem;
  }
  .el-dialog__header span {
    font-size: $fontSize16;
    font-weight: 700;
  }
  .border-style {
    border-bottom: 3px solid #f6f6f6;
  }
   #bottomBoder {
    padding: 42% 0 0 0;
  }
   .el-dialog__title {
    font-weight: 700;
  }
}
</style>
