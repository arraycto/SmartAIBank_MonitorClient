<template>
  <div class="circle-main-content">
      <div class="left-circle-content" :style="{color: circleData.color}">
          <div v-if="circleData.type === 'text'">
            {{circleData.circleContent}}
          </div>
          <div v-else-if="circleData.type === 'photo'">
            <i :class="circleData.circleContent"></i>
          </div>
          <div v-else-if="circleData.type === 'symbol'" style="font-size:15px;">
            <span v-html="'<svg class=icon aria-hidden=true><use xlink:href='+circleData.circleContent+'></use></svg>'"></span>
          </div>
          <div v-else>
            <div class="solid-circle" :style="{backgroundColor: circleData.color}"></div>
          </div>
      </div>
      <div class="right-title-content">
          <div>
            {{circleData.title}}
          </div>
          <div>
            <span class="number-style">{{circleData.count}}</span>
            <span class="danwei-style">{{circleData.unit}}</span>
            <!-- {{circleData.count}}
            <span>{{circleData.unit}}</span> -->
          </div>
      </div>
  </div>
</template>

<script>
/**
 * 监控圆形公共组件
 * @param {circleData} Object
 * circleData具体的字段有：
 * @param {type} String 类型 'text'代表圆圈中间是文字,'photo'代表圆圈中间是图片，不传或传其他值中间渲染成圆圈
 * @param {circleContent} String|Array 圆圈中间的具体内容，文字可直接传字符串，字体可以这样传:['icon-dcfs', 'dcfs-logout']
 * @param {color} String 圆圈的颜色，例如#EE667F
 * @param {title} String 右侧上方文字描述
 * @param {count} String 右侧下方数量
 * @param {unit} String 数量后面的单位
 */
export default {
  name: 'circlePanel',
  props: {
    circleData: {
      type: Object
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
    .circle-main-content {
      display: flex;
      display: -webkit-flex;
      width: 9rem;
      height: 3rem;
      justify-content: space-between;
      align-items: center;
      .left-circle-content {
        display: flex;
        display: -webkit-flex;
        width: 2rem;
        height: 2rem;
        border: 2px solid;
        border-radius: 25px;
        // box-shadow: inset 0 0 3px 0;
        > div:first-child {
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          align-items: center;
          font-size: 10px;
          width: 100%;
        }
        .solid-circle {
          width:12px;
          height:12px;
          border-radius:25px;
        }
      }
      .right-title-content {
        display: flex;
        display: -webkit-flex;
        width: 6.5rem;
        // height: 3rem;
        flex-direction: column;
        font-size: $XXSmallFontSize;
        font-family: $titleFontFamily;
        color: $threeFontColor;
        div:first-child {
          color:#9B9B9B
        }
        div:last-child {
          // margin-top: 0.5rem;
          font-weight: 700;
        }
        div span{
          font-size: 10px;
        }
        .number-style{
          font-size: $largeFontSize;
          font-family: $numberFontFamily;
          color: $homeTitleColor;
        }
        .danwei-style{
          font-size: $XXSmallFontSize;
          font-family: $titleFontFamily;
          color: $homeTitleColor;
        }
      }
    }
</style>
