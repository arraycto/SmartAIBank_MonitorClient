export default {
  // 柱状图
  lineColOption (xAxis, yName, array1, array2) {
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
        data: array1
        // [
        //   { name: '广电运通', icon: 'circle' },
        //   { name: '日立', icon: 'circle' },
        //   { name: '浪潮', icon: 'circle' },
        //   { name: '南天', icon: 'circle' },
        //   { name: 'NCR', icon: 'circle' },
        //   { name: '东信', icon: 'circle' }
        // ]
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
          'nameGap': 25,
          // 'max': 100,
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
      'series': array2
      // [
      //   {
      //     'name': '广电运通',
      //     'type': 'bar',
      //     'data': guangdian,
      //     'itemStyle': {
      //       'normal': {
      //         'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //           { offset: 0, color: '#73E9EE' },
      //           { offset: 1, color: '#42DFE6' }
      //         ]
      //         ),
      //         'barBorderRadius': 10
      //       }
      //     },
      //     'barMaxWidth': 10
      //   },
      //   {
      //     'name': '日立',
      //     'type': 'bar',
      //     'data': rili,
      //     'itemStyle': {
      //       'normal': {
      //         'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [ // 渐变
      //           { offset: 0, color: '#77B6FF' },
      //           { offset: 1, color: '#258AFF' }
      //         ]
      //         ),
      //         'barBorderRadius': 10
      //       }
      //     },
      //     'barMaxWidth': 10
      //   },
      //   {
      //     'name': '浪潮',
      //     'type': 'bar',
      //     'data': langchao,
      //     'itemStyle': {
      //       'normal': {
      //         'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //           { offset: 0, color: '#F7D205' },
      //           { offset: 1, color: '#EAB538' }
      //         ]
      //         ),
      //         'barBorderRadius': 10
      //       }
      //     },
      //     'barMaxWidth': 10
      //   },
      //   {
      //     'name': '南天',
      //     'type': 'bar',
      //     'data': nantian,
      //     'itemStyle': {
      //       'normal': {
      //         'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //           { offset: 0, color: '#F7D205' },
      //           { offset: 1, color: '#EAB538' }
      //         ]
      //         ),
      //         'barBorderRadius': 10
      //       }
      //     },
      //     'barMaxWidth': 10
      //   },
      //   {
      //     'name': 'NCR',
      //     'type': 'bar',
      //     'data': NCR,
      //     'itemStyle': {
      //       'normal': {
      //         'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //           { offset: 0, color: '#F7D205' },
      //           { offset: 1, color: '#EAB538' }
      //         ]
      //         ),
      //         'barBorderRadius': 10
      //       }
      //     },
      //     'barMaxWidth': 10
      //   },
      //   {
      //     'name': '东信',
      //     'type': 'bar',
      //     'data': dongxin,
      //     'itemStyle': {
      //       'normal': {
      //         'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //           { offset: 0, color: '#F7D205' },
      //           { offset: 1, color: '#EAB538' }
      //         ]
      //         ),
      //         'barBorderRadius': 10
      //       }
      //     },
      //     'barMaxWidth': 10
      //   }
      // ]

    }
  }
}
