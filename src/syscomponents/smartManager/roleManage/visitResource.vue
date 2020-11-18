<template>
    <div class="visit-resource-content" :style="{width:width}">
      <div class="heade-content">
          <font>设置可访问资源及访问方式</font>
          <i class="new-editor-close el-icon-close" @click="$emit('handle-resoure')"></i>
      </div>
      <div class="middle-content">
            <div class="left-resource-content">
              <div class="heade-content">
                <el-checkbox @change="onLeftAllChange" v-model="leftAllChecked" :disabled="!primevalResourceList.length>0">资源树</el-checkbox>
              </div>
              <div class="tree-content">
                <el-tree
                  :data="leftTrees.resourceList"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="leftTrees.defaultExpandedKeys"
                  :expand-on-click-node="false"
                  :render-content="leftRenderContent"
                  @check="onLeftCheck"
                  ref="leftResource">
                </el-tree>
              </div>

            </div>
            <div class="middle-transform-content">
              <button class="to-right-btn" @click="onToRightClick" :disabled="!usableResource.length>0"><i class="el-icon-arrow-right"></i></button>
              <button class="to-left-btn" @click="onToLeftClick" :disabled="!removeResource.length>0"><i class="el-icon-arrow-left"></i></button>
            </div>
            <div class="right-resource-content">
              <div class="heade-content">
                <el-checkbox @change="onRightAllChange" v-model="rightAllChecked" :disabled="!usableResource.length>0">可操作资源列表</el-checkbox>
              </div>
              <div class="tree-content">
                <el-tree
                    :data="rightTrees.resourceList"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
                    :render-content="leftRenderContent"
                    @check="onRightCheck"
                    ref="rightResource">
                  </el-tree>
              </div>
            </div>
      </div>
      <div class="footer-bottom">
        <el-button size="mini" @click="$emit('handle-resoure', false)">取消</el-button>
        <el-button size="mini" type="primary" @click="onAffirmClick">确定</el-button>
      </div>
    </div>
</template>
<script>
import resourceTree from './resourceTree'
import services from '../../../services'
export default {
  name: 'VisitResource',
  props: {
    width: {
      type: String,
      default: '50%'
    },
    isCompile: {
      type: Boolean,
      default: false
    },
    detailsData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      primevalResourceList: [], // 原始资源数据
      leftTrees: {
        resourceList: [], // 资源列表
        defaultExpandedKeys: [], // 默认展开
        checkedKeys: [] // 选中keys
      }, // 左边资源树
      rightTrees: {
        resourceList: [], // 资源列表
        defaultExpandedKeys: [], // 默认展开
        checkedKeys: [] // 选中keys
      }, // 右边资源树
      usableResource: [], // 可操作资源列表
      removeResource: [], // 移除资源
      leftAllChecked: false, // 左边全部资源选中按钮
      rightAllChecked: false// 右边全部资源选中按钮
    }
  },
  mounted () {
    // this.getResourceTree()
    // this.leftResourceTreeData(JSON.parse(JSON.stringify(resourceTree.defaultResource)))
    if (this.isCompile) { // 编辑
      this.setCompileData()
    }
  },
  methods: {
    /**
     * 获取资源树列表数据
     */
    async getResourceTree (systemId, userId) {
      try {
        var self = this
        self.leftResourceTreeData(await services.api.base.resource.selectAccessResourceByUserIdAndSystemId(systemId, userId))
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    /**
     * 设置左边资源树数据
     */
    leftResourceTreeData (result) {
      // 把资源树列表组合成页面需要的数据结构
      this.primevalResourceList = result
      const res = resourceTree.combination(result)
      // 设置默认展开的列表
      const expandedKeys = []
      if (res[0].id) expandedKeys.push(res[0].id)
      if (res[0].children[0].id) expandedKeys.push(res[0].children[0].id)
      this.leftTrees.resourceList = res
      this.leftTrees.defaultExpandedKeys = expandedKeys
    },
    /**
     * 设置编辑的默认数据
     */
    setCompileData () {
      if (this.detailsData && this.detailsData.resources) {
        var checkKeys = []// 设置选中的keys
        this.detailsData.resources.map((item, index) => {
          if (item.operationMode) { // 有可访问权限
            const mode = item.operationMode
            mode.map((item1) => {
              checkKeys.push(item.id + '-' + item1.id)
            })
          }
        })
        this.usableResource = JSON.parse(JSON.stringify(this.detailsData.resources))// 资源赋值给可操作资源列表
        this.leftTrees.checkedKeys = checkKeys
        this.onToRightClick()// 刷新右边菜单
        this.$refs.leftResource.setCheckedKeys(checkKeys)// 设置左边资源对应选中的项
      }
    },
    /**
     * 左边资源树每一条资源树显示样式自定义（树节点的内容区的渲染）
     */
    leftRenderContent (h, { node, data, store }) {
      return (
        <el-tooltip content={data.name} placement='bottom' disabled={data.name.length < 5}>
          <span class='tree-item'>{data.name}</span>
        </el-tooltip>

      )
    },
    /**
     * 左边资源树全选中或取消全选中
     */
    onLeftAllChange (val) {
      if (val) {
        var temArr = []
        this.primevalResourceList.map((item) => {
          temArr.push(item.id)
        })
        this.leftTrees.checkedKeys = temArr// 左边边选中的keys
        this.usableResource = JSON.parse(JSON.stringify(this.primevalResourceList))// 将左边资源全部赋值给右边资源资源列表
        this.$refs.leftResource.setCheckedKeys(temArr)// 左边资源全部选中
      } else {
        this.$refs.leftResource.setCheckedKeys([])// 左边资源全部不选中
      }
    },
    /**
     * 右边资源树全选中或取消全选中
     */
    onRightAllChange (val) {
      if (val) {
        var temArr = []
        this.usableResource.map((item) => {
          temArr.push(item.id)
        })
        this.rightTrees.checkedKeys = temArr// 右边选中的keys
        this.removeResource =  JSON.parse(JSON.stringify(this.usableResource))// 将右边资源全部赋值给可能需要移除的资源列表
        this.$refs.rightResource.setCheckedKeys(temArr)// 右边资源全部选中
      } else {
        this.$refs.rightResource.setCheckedKeys([])// 右边资源全部不选中
      }
    },
    /**
     * 选中资源的监听(左边)
     * 共两个参数，依次为：传递给
     * data 属性的数组中该节点所对应的对象、树目前的选中状态对象；
     * node包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
     */
    onLeftCheck (data, { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }) {
      this.usableResource =  checkedNodes.concat(halfCheckedNodes)// 选中的资源数据
      // this.leftTrees.defaultExpandedKeys = checkedKeys.concat(halfCheckedKeys)
      this.leftTrees.checkedKeys = checkedKeys// 左边选中的keys
      this.leftAllChecked = false
    },
    /**
     * 选中资源的监听(右边)
     * 共两个参数，依次为：传递给
     * data 属性的数组中该节点所对应的对象、树目前的选中状态对象；
     * node包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
     */
    onRightCheck (data, { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }) {
      this.removeResource =  checkedNodes// 选中的资源数据
      this.rightTrees.checkedKeys = checkedKeys.concat(halfCheckedKeys)// 需要移除左边对应的选中项的值
      this.rightAllChecked = false
    },
    // 选中资源移动到可操作资源列表
    onToRightClick () {
      let res = resourceTree.usableCombination(this.usableResource)// 移除资源列表中的资源对应的权限列表
      res = resourceTree.combination(res)// 重新组合成也买展示的数据结构
      // 重新赋值右边的数据
      this.rightTrees.resourceList = res
      this.$refs.rightResource.setCheckedKeys([])// 默认右边一个不选中
    },
    // 可操作资源移除
    onToLeftClick () {
      // 从可用资源列表中移除选中的资源
      var temUsableRes = this.usableResource
      this.removeResource.map((item, index) => {
        this.usableResource.map((item1, index1) => {
          // 可用资源列表中的id和需要移除的资源列表中的id一致就移除可用资源的值
          if (item.id === item1.id) {
            temUsableRes.splice(index1, 1)
          }
        })
      })
      // 从左边资源树种取消右边选中需要移除的选中的资源
      var temLeftCheckedKeys = this.leftTrees.checkedKeys
      this.rightTrees.checkedKeys.map((item, index) => {
        const i = temLeftCheckedKeys.indexOf(item)
        // 右边选中需要移除资源在左边移除选中项
        if (i > -1) {
          this.leftAllChecked = false// 将左边全选修改为未全选状态
          this.rightAllChecked = false// 将右边全选修改为未全选状态
          temLeftCheckedKeys.splice(i, 1)
        }
      })
      this.usableResource = temUsableRes// 更新可用资源数据
      this.onToRightClick()// 重新刷新右边资源（可操作资源）
      this.$refs.leftResource.setCheckedKeys(temLeftCheckedKeys)// 重新设置左边选中的值
      // 需要移除资源变成空
      this.removeResource = []
      this.rightTrees.checkedKeys = []
    },
    /**
     * 确定按钮点击
     */
    onAffirmClick () {
      var aUsableResource = resourceTree.usableCombination(this.usableResource)
      if (aUsableResource && aUsableResource.length > 0) {
        this.$emit('handle-resoure', false, aUsableResource)
      } else {
        this.$message({
          showClose: true,
          message: '请选择可操作资源',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '@/styles/smartManager/commom-manager.scss';
    $padding: 15px;
        .visit-resource-content{
            position: relative;
            display: inline-block;
            margin: 0 auto;
            -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
            box-shadow: 0 1px 3px rgba(0,0,0,.3);
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            width: 50%;
            background-color: white;
            height: 100%;
            z-index: 2002;
            vertical-align: top;
            box-shadow: -8px 0 5px 0 rgba(165,164,164,0.50);
            padding: $padding;
            .footer-bottom{
                position: absolute;
                bottom: $padding;
                right: $padding;
                left: $padding;
                border-top: 1px solid $lineColor;
                padding-top: 10px;
                display: inline-block;
                text-align: right;
            }
            .heade-content{
              width: 100%;
              position: relative;
              font-size: $fontSize18;
              color: $oneFontColor;
              padding: 5px 0px;
              border-bottom: 1px solid $lineColor;
              .new-editor-close{
                position: absolute;
                width: 26px;
                height: 26px;
                padding: 4px;
                right: -4px;
                color: #666666;
                cursor: pointer;
              }
            }
            .middle-content{
              padding-top: $padding;
              height: 90%;
              .left-resource-content{
                display: inline-block;
                width: 44%;
                height: 90%;
                border: 1px solid $lineColor;
                vertical-align: top;
                .heade-content{
                  width: 100%;
                  padding: 5px;
                  font-size: $fontSize14;
                  color: $oneFontColor;
                  border-bottom: 1px solid $lineColor;
                }
                .tree-content{
                  height: 93.5%;
                  overflow-y: auto;
                }

              }
              .middle-transform-content{
                display: inline-block;
                width: 12%;
                height: 90%;
                vertical-align: top;
                padding-top: 45%;
                .to-right-btn{
                  outline: none;
                  width: 80%;
                  margin-left: 10%;
                  border: 1px solid $lineColor;
                  background: #f6f6f6;
                  cursor: pointer;
                }
                .to-left-btn{
                  outline: none;
                  width: 80%;
                  margin-left: 10%;
                  margin-top: 10px;
                  border: 1px solid $lineColor;
                  background: #f6f6f6;
                  cursor: pointer;
                }
              }
              .right-resource-content{
                display: inline-block;
                width: 44%;
                height: 90%;
                border: 1px solid $lineColor;
                vertical-align: top;
                .heade-content{
                  width: 100%;
                  padding: 5px;
                  font-size: $fontSize14;
                  color: $oneFontColor;
                  border-bottom: 1px solid $lineColor;
                }
                .tree-content{
                  height: 93.5%;
                  overflow-y: auto;
                }
              }
            }
        }
</style>


