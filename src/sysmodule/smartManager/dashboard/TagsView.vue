<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :key="tag.path"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ tag.title }}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">{{ $t('tagsView.refresh') }}</li>
      <li @click="closeSelectedTag(selectedTag)">{{ $t('tagsView.close') }}</li>
      <li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags">{{ $t('tagsView.closeAll') }}</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
// import { generateTitle } from '@/utils/i18n'

export default {
  components: { ScrollPane },
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      visitedViews: []
    }
  },
  computed: {
  //   visitedViews () {
  //     return this.$store.state.manager.visitedViews
  //   }
  },
  watch: {
    $route () {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    },
    '$store.state.manager.visitedViews': function (newValue, oldValue) {
      this.currentViews()
    },
    '$store.state.manager.bankLevel': function (newValue, oldValue) {
      this.currentViews()
    },
    '$store.state.manager.orgId': function (newValue, oldValue) {
      this.moveToCurrentTag()
    }

  },
  mounted () {
    this.addViewTags()
    this.currentViews()
  },
  methods: {
    // generateTitle, // generateTitle by vue-i18n
    isActive (route) {
      return route.path === this.$route.path
    },
    addViewTags () {
      const { name } = this.$route
      if (name && name !== 'dashboard') {
        this.$store.dispatch('manager/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag () {
      const me = this
      const tags = me.$refs.tag
      me.$nextTick(() => {
        if (undefined !== tags) {
          for (const tag of tags) {
            if (tag.to.path === me.$route.path) {
              me.$refs.scrollPane.moveToTarget(tag)
              // when query is different then update
              // if (tag.to.fullPath !== me.$route.fullPath) {
              me.$store.dispatch('manager/updateVisitedView', me.$route)
              // }
              break
            }
          }
        }
      })
    },
    refreshSelectedTag (view) {
      const me = this
      me.$store.dispatch('manager/delCachedView', view).then(() => {
        const { fullPath } = view
        me.$nextTick(() => {
          me.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag (view) {
      this.$store.dispatch('manager/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags () {
      this.$store.dispatch('manager/delAllViews')
      this.$router.push('/')
    },
    openMenu (tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY

      this.visible = true
      this.selectedTag = tag
    },
    closeMenu () {
      this.visible = false
    },
    // 显示的views按照所选行级别展示
    currentViews () {
      var visitedViews = this.$store.state.manager.visitedViews
      var currViews = []
      visitedViews.map((item) => {
        currViews.push(item)
      })
      this.visitedViews = currViews
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
.tags-view-container {
  position: absolute;
  height: 34px;
  width: 100%;
  background: #f2f3f7;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: $menuBg;
        color: #fff;
        border-color: $menuBg;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    float: left;
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
