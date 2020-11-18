import echarts from 'echarts'
export default {
  // 柱状图
  lineColOption (xAxis, yName, barData) {
    return {
      'legend': {
        'textStyle': { // 坐标轴名称文字样式
          'fontFamily': 'PingFangSC-Regular',
          'fontSize': '12',
          'color': '#9B9B9B',
          'letterSpacing': '0'
        }
      },
      'grid': {
        'left': '35',
        'right': '30',
        'top': '40',
        'height': '200',
        'containLabel': true
      },
      'tooltip': {// 提示框组件
        'show': true,
        'formatter': '{b}<br />{c} 小时'
      },
      'xAxis': {
        'type': 'category',
        'boundaryGap': true,
        'data': xAxis,
        'axisLine': { // 取消坐标线
          'show': false
        },
        'axisTick': { // 取消坐标刻度
          'show': false
        },
        'axisLabel': { // 坐标轴刻度标签的相关设置
          'color': '#9B9B9B',
          'fontSize': '10',
          'interval': '0' // 强制显示所有刻度
        }
      },
      'yAxis': [
        {
          'type': 'value',
          'name': yName,
          'nameTextStyle': { // 坐标轴名称文字样式
            'fontFamily': 'PingFangSC-Regular',
            'fontSize': '12',
            'color': '#9B9B9B',
            'letterSpacing': '0'
          },
          'min': 0,
          'axisLine': { // 取消坐标线
            'show': false
          },
          'axisTick': { // 取消坐标刻度
            'show': false
          },
          'splitLine': { // Y坐标刻度标记线
            'show': true,
            'lineStyle': {
              'color': '#F1F1F1',
              'width': 1,
              'type': 'dashed'
            }
          },
          'axisLabel': { // 坐标轴刻度标签的相关设置
            'color': '#9B9B9B',
            'fontSize': '12'
          }
        }
      ],
      'series': [
        {
          'type': 'bar',
          'data': barData,
          'itemStyle': {
            'normal': {
              'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#77B6FF' },
                { offset: 1, color: '#258AFF' }
              ]
              ),
              'barBorderRadius': 20
            }
          },
          'barWidth': 20
        }
      ]

    }
  }
}
