import echarts from 'echarts'
export default {
  // 柱状图
  lineColOption (xAxis, yName, riLiData, guoguang, nantian) {
    return {
      'legend': {
        'bottom': '85%',
        'left': '40%',
        'orient': 'horizontal',
        'borderRadius': 10,
        'itemWidth': 10, // 图例标记的图形宽度
        'itemHeight': 10,
        'itemGap': 15,
        'textStyle': { // 坐标轴名称文字样式
          'fontFamily': 'PingFangSC-Regular',
          'fontSize': '14',
          'color': '#9B9B9B',
          'letterSpacing': '0'
        },
        data: [
          { name: '高', icon: 'circle' },
          { name: '中', icon: 'circle' },
          { name: '低', icon: 'circle' }
        ]
      },
      'grid': {
        'left': 50,
        'right': '30',
        'top': '70',
        'height': '200',
        'containLabel': true
      },
      'tooltip': {// 提示框组件
        'show': false,
        'trigger': 'axis', // 设置提示框会根据坐标轴显示
        'textStyle': {
          'align': 'left'
        },
        'axisPointer': {
          'lineStyle': {// 设置指示器样式
            'color': '#3190FF',
            'width': 2
          }
        }
        // 'formatter': ''  设置提示框内容，目前暂时采用默认
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
          'nameGap': 15,
          // 'max': 25,
          'nameTextStyle': { // 坐标轴名称文字样式
            'fontFamily': 'PingFangSC-Regular',
            'fontSize': '12',
            'color': '#9B9B9B',
            'letterSpacing': '0'
          },
          'min': 0,
          'axisLine': { // 取消坐标线
            'show': false,
            'lineStyle': {
              color: '#9B9B9B'
            }
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
          'name': '高',
          'type': 'bar',
          'data': riLiData,
          'itemStyle': {
            'normal': {
              'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [ // 渐变
                { offset: 0, color: '#77B6FF' },
                { offset: 1, color: '#258AFF' }
              ]
              ),
              'barBorderRadius': 10
            }
          },
          'barWidth': 20 // 柱条的宽度
        },
        {
          'name': '中',
          'type': 'bar',
          'data': guoguang,
          'itemStyle': {
            'normal': {
              'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#73E9EE' },
                { offset: 1, color: '#42DFE6' }
              ]
              ),
              'barBorderRadius': 10
            }
          },
          'barWidth': 20
        },
        {
          'name': '低',
          'type': 'bar',
          'data': nantian,
          'itemStyle': {
            'normal': {
              'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#F7D205' },
                { offset: 1, color: '#EAB538' }
              ]
              ),
              'barBorderRadius': 10
            }
          },
          'barWidth': 20
        }
      ]

    }
  }
}
