<template>
  <div class="circle-main-content">
      <div class="left-circle-content" :style="{color: circleData.color}">
          <div v-if="circleData.type === 'text'">
            {{circleData.circleContent}}
          </div>
          <div v-else-if="circleData.type === 'photo'">
            <i :class="circleData.circleContent"></i>
          </div>
          <div v-else>
            <div class="solid-circle" :style="{backgroundColor: circleData.color}"></div>
          </div>
      </div>
      <div class="right-title-content">
          <div class="total" :style="{color: circleData.color}">
            <b>{{circleData.count}}</b>
            <span class="rate" v-if="circleData.rate !==''">&nbsp;&nbsp;(</span>
            <span class="rate">{{circleData.rate}}</span>
            <span class="rate" v-if="circleData.rate !==''">%</span>
            <span class="rate" v-if="circleData.rate !==''">)</span>
          </div>
          <div class="cricle-title">
            {{circleData.title}}
            <span>{{circleData.unit}}</span>
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
 * @param {title} String 右侧下方文字描述
 * @param {count} String 右侧上方数量
 * @param {unit} String 类型后面的单位
 * @param {rate} String 数量后面的占比
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
    .circle-main-content {
      display: flex;
      display: -webkit-flex;
      min-width: 7rem;
      height: 3rem;
      justify-content: space-between;
      align-items: center;
      .left-circle-content {
        display: flex;
        display: -webkit-flex;
        width: 2vw;
        height: 2vw;
        border: 1px solid;
        border-radius: 50%;
        box-shadow: inset 0 0 3px 0;
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
          border-radius:6px;
        }
      }
      .right-title-content {
        display: flex;
        display: -webkit-flex;
        width: 5vw;
        height: 2.7rem;
        flex-direction: column;
        font-size: 16px;
        div:first-child {
          color:#9B9B9B
        }
        div:last-child {
          font-weight: 700;
        }
      }
    }
    .total{
      font-size: 30px;
      margin-left:-12px;
      margin-top:6px;
    }
    .cricle-title{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #9B9B9B;
          letter-spacing: 0;
          margin-left: -12px;
          margin-top:-3px;
    }
    .rate{
      font-size: 14px;
    }
</style>
