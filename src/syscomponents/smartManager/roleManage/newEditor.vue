<template>
    <div class="new-editor-content" :style="{width:width}">
        <div class="heade-content">
          <font>编辑角色信息</font>
          <i class="new-editor-close el-icon-close" @click="$emit('hidden-dialog')"></i>
        </div>
        <div class="middle-content">
          <div class="input-item">
            <font class="level">*</font>
            <font class="input-explain">角色代号</font>
            <el-input v-model="codeValue" maxlength="10" size="mini" :readOnly="isCompile" placeholder="请输入"></el-input>
          </div>
          <div class="input-item">
            <font class="level">*</font>
            <font class="input-explain">角色名称</font>
            <el-input v-model="nameValue" maxlength="40" size="mini" placeholder="请输入"></el-input>
          </div>
          <div class="input-item">
            <font class="level">*</font>
            <font class="input-explain">所属系统</font>
            <!-- <el-input v-model="systemValue" maxlength="10" size="mini" placeholder="请输入"></el-input> -->
            <el-select v-model="systemValue" placeholder="请选择" maxlength="10" size="mini">
              <el-option
                v-for="item in systemList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </div>
          <div class="input-item">
            <font class="level">*</font>
            <font class="input-explain">角色描述</font>
            <div class="describe-input-content">
              <el-input v-model="describeValue" maxlength="100" type="textarea" :autosize="{ minRows: 2, maxRows: 9}" placeholder="请输入"></el-input>
              <div class="word-hint">{{describeValue.length}}/100</div>
            </div>
          </div>
          <div class="setting-resource">
            <font>可访问资源</font>
            <el-button type="primary" plain  size="mini" @click="onSettingClick" class="setting">设置</el-button>
            <span class="setting-succ" v-if="resourceList.length>0">
              <i class="el-icon-success"></i>&nbsp;设置成功
            </span>
          </div>
        </div>
        <div class="footer-bottom">
            <el-button size="mini" @click="$emit('hidden-dialog')">取消</el-button>
            <el-button size="mini" type="primary" @click="onAffirmClick">确定</el-button>
        </div>
        <!-- 显示可访问资源页面时候遮罩层 -->
        <div class="new-editor-modal" v-if="width!='100%'"></div>
    </div>
</template>
<script>
import services from '../../../services'
export default {
  name: 'NewEditor',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    isCompile: {
      type: Boolean,
      default: false
    },
    detailsData: {
      type: Object,
      default: null
    },
    resourceList: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      codeValue: '',
      nameValue: '',
      systemValue: '',
      systemList: [],
      describeValue: ''

    }
  },
  mounted () {
    this.getSystemId()
    this.initView()// 初始化数据
    this.setTextareaStyle()
  },
  updated () {
    this.setTextareaStyle()
  },
  methods: {
    // 设置资源按钮点击
    onSettingClick () {
      this.$emit('handle-resoure', true)
    },
    // 初始化数据
    initView () {
      this.$nextTick(function () {
        if (this.isCompile) { // 编辑
          this.codeValue = this.detailsData.id
          this.nameValue = this.detailsData.name
          this.systemValue = this.detailsData.systemId
          this.describeValue = this.detailsData.desc
          this.resourceList = this.detailsData.resources
        } else { // 新建
          this.codeValue = ''
          this.nameValue = ''
          this.systemValue = ''
          this.describeValue = ''
        }
      })
    },
    async getSystemId () {
      try {
        var self = this
        const result = await services.api.base.role.selectAccessSystemByUserId(base.getStore({ 'key': 'userName' }))
        self.systemList = result.systems || []
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    setTextareaStyle () {
      this.$nextTick(function () {
        var textareas =  document.getElementsByClassName('el-textarea__inner')
        textareas[0].style.fontSize = '14px'
        textareas[0].style.color = '#666666'
        textareas[0].style.fontFamily = 'Avenir, Helvetica, Arial, sans-serif'
      })
    },
    async onAffirmClick () {
      var self = this
      try {
        if (self.resourceList && self.resourceList.length > 0) {
          const params = new services.bean.base.Role({
            resources: self.resourceList,
            desc: self.describeValue,
            name: self.nameValue,
            id: self.codeValue,
            systemId: self.systemValue
          })
          if (!self.isCompile) {
            await services.api.base.role.add(params)
            self.$message({
              message: '新建成功',
              type: 'success'
            })
            self.$emit('hidden-dialog', true)
          } else {
            await services.api.base.role.update(params, self.codeValue, self.systemValue)
            self.$message({
              message: '更新成功',
              type: 'success'
            })
            self.$emit('hidden-dialog', true)
          }
        } else {
          self.$message({
            message: '请选择可操作资源',
            type: 'warning'
          })
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    }
  },
  watch: {
    'resourceList': {
      handler (value) {
        this.$nextTick(function () {
        })
      },
      deep: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '@/styles/smartManager/commom-manager.scss';
    $padding: 15px;
        .new-editor-content{
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
            box-shadow: -8px 0 5px 0 rgba(144,142,142,0.50);
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
            .new-editor-modal{
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: 0;
                background: rgba(0,0,0,.2);
                z-index: 2003;
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
              margin-top: $padding;
              .input-item{
                font-size: $fontSize14;
                color: $twoFontColor;
                margin-top: 10px;
                .level{
                  color: $redColor;
                }
                .input-explain{
                  margin: 0px 5px;
                }
                .el-input{
                  width: 75%;
                  font-size: $fontSize14;
                }
                .describe-input-content{
                  position: relative;
                  display: inline-block;
                  width: 75%;
                  font-size: $fontSize14;
                  color: $twoFontColor;
                  vertical-align: top;
                  .word-hint{
                    position: absolute;
                    font-size: $fontSize14;
                    color: $threeFontColor;
                    bottom: 2px;
                    right: 7px;
                  }
                }
              }
              .setting-resource{
                margin-top: $padding;
                font-size: $fontSize14;
                color: $twoFontColor ;
                .setting{
                  margin-left: 10px;
                }
                .setting-succ{
                  color: #5DB664;
                  font-size: $fontSize14;
                  margin-left: 10px;
                }
              }
            }
        }

</style>


