import echarts from 'echarts'
export default {
  // 业务总量option
  businessOption (xData, queueTimerData, averageTimerData, showData, rateData) {
    return {
      'grid': {
        'left': '15',
        'right': '20',
        'top': '40',
        'height': '180',
        'containLabel': true
      },
      'legend': { // 图例组件
        'left': '20px',
        'orient': 'horizontal',
        'itemWidth': 20, // 图例标记的图形宽度
        'itemHeight': 8,
        'itemGap': 30,
        'data': showData,
        'textStyle': {
          'color': '#9B9B9B',
          'fontSize': '12'
        }
      },
      'tooltip': {// 提示框组件
        'show': true,
        'trigger': 'axis',
        'textStyle': {
          'align': 'left'
        },
        formatter: function (params) {
          var result = ''
          if (params.length > 0 && params[0].axisValue) {
            result += params[0].axisValue + '</br>'
          }
          params.forEach(function (item) {
            if (item.seriesName === '环比') {
              if (item.value === 'null') {
                result +=  '<span style="margin-left:1rem">' + item.seriesName + '</span>' + '：' + '----' + '</br>'
              } else {
                if (item.value > 0) {
                  result += '<span style="margin-left:1rem">' + item.seriesName + '</span>' + '：' + '<span style="color:#FF0033;font-weight: 700;">' + item.value + '% ↑' + '</span>' + '</br>'
                } else if (item.value < 0) {
                  result += '<span style="margin-left:1rem">' + item.seriesName + '</span>' + '：' + '<span style="color:#50E3C2;">' + item.value + '% ↓' + '</span>' + '</br>'
                } else {
                  result +=  '<span style="margin-left:1rem">' + item.seriesName + '</span>' + '：' + '0.00%' + '</br>'
                }
              }
            } else {
              if (item.value || item.value === 0) {
                result += item.marker + item.seriesName + '：' + item.value + '笔' + '</br>'
              }
            }
          })
          return result
        }
      },
      'xAxis': {
        'type': 'category',
        'boundaryGap': false,
        'data': xData,
        'axisLine': { // 取消坐标线
          'show': false
        },
        'axisTick': { // 取消坐标刻度
          'show': false
        },
        'axisLabel': { // 坐标轴刻度标签的相关设置
          'color': '#9B9B9B',
          'fontSize': '10'
        }
      },
      'yAxis': {
        'type': 'value',
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
      },
      'series': [{
        'name': '业务总量',
        'type': 'line',
        'smooth': true, // 是否平滑曲线显示
        'symbol': 'emptyCircle', // 标记的图形
        'symbolSize': 5, // 标记的大小
        'sampling': 'average',
        'itemStyle': { // 折线拐点标志的样式
          'normal': {
            'color': '#5AA6FF'
          }
        },
        'lineStyle': { // 线条样式
          'normal': {
            'color': '#5AA6FF',
            'width': 1
          }
        },
        'stack': 'a',
        'areaStyle': { // 区域填充样式
          'normal': {
            'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              'offset': 0,
              'color': '#5AA6FF'
            }, {
              'offset': 1,
              'color': '#fff'
            }])
          }
        },
        'data': queueTimerData
      },
      {
        'name': '全行平均',
        'type': 'line',
        'smooth': true,
        'symbol': 'emptyCircle',
        'color': '#FFCD00',
        'lineStyle': {
          'normal': {
            'color': '#FFCD00',
            'width': 1,
            'type': 'dashed'
          }
        },
        'data': averageTimerData
      },
      {
        'name': '环比',
        'type': 'line',
        'barWidth': '20px',
        'symbol': 'none',
        'data': rateData,
        'color': 'transparent'
      }
      ]

    }
  },
  // 交易平均处理时长option
  durationOption (xData, queueTimerData, averageTimerData, showData, rateData) {
    return {
      'grid': {
        'left': '15',
        'right': '20',
        'top': '40',
        'height': '180',
        'containLabel': true
      },
      'legend': { // 图例组件
        'left': '20px',
        'orient': 'horizontal',
        'itemWidth': 20, // 图例标记的图形宽度
        'itemHeight': 8,
        'itemGap': 30,
        'data': showData,
        'textStyle': {
          'color': ' #9B9B9B',
          'fontSize': '12'
        }
      },
      'tooltip': {// 提示框组件
        'show': true,
        'trigger': 'axis',
        'textStyle': {
          'align': 'left'
        },
        formatter: function (params) {
          var result = ''
          if (params.length > 0 && params[0].axisValue) {
            result += params[0].axisValue + '</br>'
          }
          params.forEach(function (item) {
            if (item.seriesName === '环比') {
              if (item.value === 'null') {
                result +=  '<span style="margin-left:1rem">' + item.seriesName + '</span>' + '：' + '----' + '</br>'
              } else {
                if (item.value > 0) {
                  result += '<span style="margin-left:1rem">' + item.seriesName + '</span>' + '：' + '<span style="color:#FF0033;font-weight: 700;">' + item.value + '% ↑' + '</span>' + '</br>'
                } else if (item.value < 0) {
                  result += '<span style="margin-left:1rem">' + item.seriesName + '</span>' + '：' + '<span style="color:#50E3C2;">' + item.value + '% ↓' + '</span>' + '</br>'
                } else {
                  result +=  '<span style="margin-left:1rem">' + item.seriesName + '</span>' + '：' + '0.00%' + '</br>'
                }
              }
            } else {
              if (item.value || item.value === 0) {
                result += item.marker + item.seriesName + '：' + item.value + '分钟' + '</br>'
              }
            }
          })
          return result
        }
      },
      'xAxis': {
        'type': 'category',
        'boundaryGap': false,
        'data': xData,
        'axisLine': { // 取消坐标线
          'show': false
        },
        'axisTick': { // 取消坐标刻度
          'show': false
        },
        'axisLabel': { // 坐标轴刻度标签的相关设置
          'color': '#9B9B9B',
          'fontSize': '10'
        }
      },
      'yAxis': {
        'type': 'value',
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
      },
      'series': [{
        'name': '交易平均处理时长',
        'type': 'line',
        'smooth': true, // 是否平滑曲线显示
        'symbol': 'emptyCircle', // 标记的图形
        'symbolSize': 5, // 标记的大小
        'sampling': 'average',
        'color': '#5AA6FF',
        'itemStyle': { // 折线拐点标志的样式
          'normal': {
            'color': '#5AA6FF'
          }
        },
        'lineStyle': { // 线条样式
          'normal': {
            'color': '#5AA6FF',
            'width': 1
          }
        },
        'stack': 'a',
        'areaStyle': { // 区域填充样式
          'normal': {
            'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              'offset': 0,
              'color': '#5AA6FF'
            }, {
              'offset': 1,
              'color': '#fff'
            }])
          }
        },
        'data': queueTimerData
      },
      {
        'name': '全行平均',
        'type': 'line',
        'smooth': true,
        'symbol': 'emptyCircle',
        'color': '#FFCD00',
        'lineStyle': {
          'normal': {
            'color': '#FFCD00',
            'width': 1,
            'type': 'dashed'
          }
        },
        'data': averageTimerData
      },
      {
        'name': '环比',
        'type': 'line',
        'barWidth': '20px',
        'symbol': 'none',
        'data': rateData,
        'color': 'transparent'
      }
      ]

    }
  },
  // 排队 个支行柱状排行option
  businessBarOption (xData, branchWaitData, defaultData, titleText, seriesName, showRatioData, showRankData) {
    return {
      'color': ['#258AFF'],
      'title': {
        'text': titleText,
        'textStyle': {
          'color': '#4A4A4A',
          'fontSize': '16',
          'fontWeight': '600'
        }
      },
      'legend': {
        // 图例组件
        'right': '20px',
        'orient': 'horizontal',
        'itemWidth': 20, // 图例标记的图形宽度
        'itemHeight': 8,
        'itemGap': 30,
        'data': [
          { 'name': '排队等待时长', 'icon': 'circle' },
          {
            'name': '全行平均',
            'icon': 'image:// data:image/png;base64,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'
          }
        ],
        'textStyle': {
          'color': ' #9B9B9B',
          'fontSize': '12'
        }
      },
      'tooltip': {
        'show': true,
        'trigger': 'axis',
        'textStyle': {
          'align': 'left'
        },
        formatter: function (params) {
          var result = ''
          params.forEach(function (item) {
            switch (item.seriesIndex) {
            case 0:
              break
            case 1:
              if (seriesName === '业务总量') {
                result += item.name + '：' + item.value + '笔' + '</br>'
              } else if (seriesName === '交易平均处理时长') {
                result += item.name + '：' + parseFloat(item.value).toFixed(2) + '分钟' + '</br>'
              } else {
                result += item.name + '：' + parseFloat(item.value).toFixed(2) + '</br>'
              }
              break
            case 2:
              var valueFloat = parseFloat(item.value) * 100
              if (item.value === 'noRate') {
                result += item.seriesName + '：' + '----' + '</br>'
              } else if (valueFloat > 0) {
                result += item.seriesName + '：' + '<span style="color:#FF0033;font-weight: 700;">' + valueFloat.toFixed(2) + '%  ↑' + '</span>' + '</br>'
              } else if (valueFloat < 0) {
                result += item.seriesName + '：' + '<span style="color:#50E3C2">' + valueFloat.toFixed(2) + '%  ↓' + '</span>' + '</br>'
              } else {
                result += item.seriesName + '：' + '0.00%' + '</br>'
              }
              break
            case 3:
              result += item.seriesName + '：' + item.value + '</br>'
              break
            }
          })
          return result
        }
      },
      'grid': {
        'left': '10',
        'right': '80',
        'bottom': '10',
        'containLabel': true
      },
      'xAxis': {
        'type': 'category',
        'triggerEvent': true,
        'data': xData,
        'axisLine': {
          // 取消坐标线
          'show': true,
          'lineStyle': {
            'color': '#E4E4E4'
          }
        },
        'axisTick': {
          // 取消坐标刻度
          'show': false
        },
        'axisLabel': {
          // 坐标轴刻度标签的相关设置
          'color': '#9B9B9B',
          'fontSize': '12',
          'rotate': 20,
          'margin': 20
        }
      },
      'yAxis': {
        'type': 'value',
        'min': 0,
        'axisLine': {
          // 取消坐标线
          'show': false
        },
        'axisTick': {
          // 取消坐标刻度
          'show': false
        },
        'splitLine': {
          // Y坐标刻度标记线
          'show': false
        },
        'axisLabel': {
          // 坐标轴刻度标签的相关设置
          'color': '#9B9B9B',
          'fontSize': '12'
        }
      },
      'series': [{
        'name': '全行平均',
        'type': 'bar',
        'barWidth': '10px',
        'itemStyle': {
          'color': 'rgba(0,0,0,0.05)',
          'barBorderRadius': 10
        },
        'barGap': '-100%',
        'barCategoryGap': '40%',
        'data': defaultData,
        'animation': false
      },
      {
        'name': seriesName,
        'type': 'bar',
        'barWidth': '10px',
        'data': branchWaitData,
        'markLine': {
          'symbol': 'none',
          'data': [{ 'type': 'average', 'name': '平均值' }],
          'label': {
            'position': 'end',
            'formatter': function (params) {
              var result = ''
              if (seriesName === '业务总量') {
                result += params.value + '笔'
              } else if (seriesName === '交易平均处理时长') {
                result += params.value + '分钟'
              } else {
                result += params.value + '分钟'
              }
              return result
            }
          },
          'lineStyle': {
            'color': '#FFB127'
          }
        },
        'itemStyle': {
          'color': new echarts.graphic.LinearGradient(
            0, 0, 0, 1, [
              { 'offset': 0, 'color': '#77B6FF' },
              { 'offset': 0.5, 'color': '#4D9FFF' },
              { 'offset': 1, 'color': '#258AFF' }
            ]
          ),
          'barBorderRadius': 10
        }
      },
      {
        'name': '环比',
        'type': 'bar',
        'barWidth': '10px',
        'symbol': 'none',
        'data': showRatioData,
        'color': 'transparent'
      },
      {
        'name': '排名',
        'type': 'bar',
        'barWidth': '10px',
        'data': showRankData,
        'color': 'transparent'
      }
      ]
    }
  },
  // 交易业务总量和高频交易处理时长柱状图option
  dealStatisticsBarOption (showTitle, xData, tradeNumArr, disposeTimeList, allDealAverageList, allDisposeAverageList) {
    return {
      'color': ['#258AFF'],
      'title': {
        'text': showTitle,
        'textStyle': {
          'color': '#9B9B9B',
          'fontSize': '12',
          'fontWeight': 'normal'
        }
      },
      'legend': {
        // 图例组件
        'right': '20px',
        'orient': 'horizontal',
        'itemWidth': 20, // 图例标记的图形宽度
        'itemHeight': 8,
        'itemGap': 30,
        'data': [
          { 'name': '交易笔数', 'icon': 'circle' },
          {
            'name': '全行笔数平均',
            'icon': 'image:// data:image/png;base64,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'
          },
          { 'name': '平均处理时长', 'icon': 'circle' },
          {
            'name': '全行处理平均',
            'icon': 'image:// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAOCAYAAABO3B6yAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAACSSURBVEhL7VQhEsMwDJO7XxQO7nVFAyUFJSP73GBh0R6xqyu57o2Um0S5nBVZSUQScwKF6LKWoQVoAew7/BwGOOeWYv++JQPW5waPQQPjqmp1f/2zLyMVnaFhJMGBx0yS+ExU2DvviadH3skv6DGalFNIaCU95Nilay7AA4ymsF0ajuDRC2+q7R/IWoYWoDgAsAN5MTNhMSUYAAAAAABJRU5ErkJggg=='
          }
        ],
        'textStyle': {
          'color': ' #9B9B9B',
          'fontSize': '12'
        }
      },
      'tooltip': {
        'trigger': 'axis',
        'textStyle': {
          'align': 'left'
        },
        formatter: function (params) {
          var result = ''
          if (params.length > 0 && params[0].axisValue) {
            result += params[0].axisValue + '</br>'
          }
          params.forEach(function (item) {
            switch (item.seriesIndex) {
            case 0:
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#499DFF;"></span>' + item.seriesName + '：' + (item.value || 0) + '笔' + '</br>'
              break
            case 1:
              result += item.marker + item.seriesName + '：' + (item.value || 0) + '笔' + '</br>'
              break
            case 2:
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#41DCB9;"></span>' + item.seriesName + '：' + (item.value || 0) + '分钟' + '</br>'
              break
            case 3:
              result += item.marker + item.seriesName + '：' + (item.value || 0) + '分钟' + '</br>'
              break
            }
          })
          return result
        }
      },
      'grid': {
        'left': '10',
        'right': '10',
        'bottom': '0',
        'top': '60',
        'containLabel': true
      },
      'xAxis': {
        'type': 'category',
        'data': xData,
        'axisLine': {
          // 取消坐标线
          'show': true,
          'lineStyle': {
            'color': '#E4E4E4'
          }
        },
        'axisTick': {
          // 取消坐标刻度
          'show': false
        },
        'axisLabel': {
          // 坐标轴刻度标签的相关设置
          'color': '#9B9B9B',
          'fontSize': '12',
          'rotate': 25,
          'margin': 15
        }
      },
      'yAxis': [
        {
          'type': 'value',
          'min': 0,
          'name': '笔           ',
          'position': 'left',
          'axisLine': {
            // 取消坐标线
            'show': false,
            'lineStyle': {
              'color': '#9B9B9B'
            }
          },
          'axisTick': {
            // 取消坐标刻度
            'show': false
          },
          'splitLine': {
            // Y坐标刻度标记线
            'show': true,
            'lineStyle': {
              'color': '#F1F1F1',
              'width': 0.5,
              'type': 'dashed'
            }
          },
          'axisLabel': {
            // 坐标轴刻度标签的相关设置
            'color': '#9B9B9B',
            'fontSize': '12'
          }
        },
        {
          'type': 'value',
          'name': '        分钟',
          'position': 'right',
          'axisLine': {
            // 取消坐标线
            'show': false,
            'lineStyle': {
              'color': '#9B9B9B'
            }
          },
          'axisTick': {
            // 取消坐标刻度
            'show': false
          },
          'splitLine': {
            // Y坐标刻度标记线
            'show': false
          },
          'axisLabel': {
            // 坐标轴刻度标签的相关设置
            'color': '#9B9B9B',
            'fontSize': '12'
          }
        }
      ],
      'series': [
        {
          'name': '交易笔数',
          'type': 'bar',
          'barWidth': '12px',
          'data': tradeNumArr,
          'yAxisIndex': 0,
          'color': '#77B6FF',
          'itemStyle': {
            'color': new echarts.graphic.LinearGradient(
              0, 0, 0, 1, [
                { 'offset': 0, 'color': '#77B6FF' },
                { 'offset': 1, 'color': '#258AFF' }
              ]
            ),
            'barBorderRadius': 10
          }
        },
        {
          'name': '全行笔数平均',
          'type': 'line',
          'smooth': true,
          'symbol': 'none',
          'color': '#FFCD00',
          'yAxisIndex': 0,
          'lineStyle': {
            'normal': {
              'color': '#FFCD00',
              'width': 1,
              'type': 'dashed'
            }
          },
          'data': allDealAverageList
        },
        {
          'name': '平均处理时长',
          'type': 'bar',
          'barWidth': '12px',
          'data': disposeTimeList,
          'yAxisIndex': 1,
          'color': '#29D9B1',
          'itemStyle': {
            'color': new echarts.graphic.LinearGradient(
              0, 0, 0, 1, [
                { 'offset': 0, 'color': '#77E2CA' },
                { 'offset': 1, 'color': '#29D9B1' }
              ]
            ),
            'barBorderRadius': 10
          }
        },
        {
          'name': '全行处理平均',
          'type': 'line',
          'smooth': true,
          'symbol': 'none',
          'color': '#E970FC',
          'yAxisIndex': 1,
          'lineStyle': {
            'normal': {
              'color': '#E970FC',
              'width': 1,
              'type': 'dashed'
            }
          },
          'data': allDisposeAverageList
        }
      ]
    }
  },
  // 每一个交易线性图表
  deallinerOption (xData, tradeNumArr, disposeTimeList, allDealAverageList, allDisposeAverageList, tradeNumRatio, handleTimeRatio, fastHandleTime) {
    return {
      'color': ['#258AFF'],
      'title': {
        'text': '流水查询打印',
        'textStyle': {
          'color': '#FFFFFF',
          'fontSize': '18',
          'fontWeight': '600'
        }
      },
      'grid': {
        'left': '10',
        'right': '15',
        'bottom': '0',
        'top': '40',
        'containLabel': true
      },
      'tooltip': {
        'trigger': 'axis',
        'position': function (pos, params, dom, rect, size) {
          // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
          var obj = { top: 60 }
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
          return obj
        },
        'textStyle': {
          'align': 'left'
        },
        formatter: function (params) {
          var result = ''
          params.forEach(function (item) {
            switch (item.seriesIndex) {
            case 0:
            case 2:
              result += item.marker + item.seriesName + '：' + item.value + '笔' + '</br>'
              break
            case 1:
            case 4:
              var valueFloat = parseFloat(item.value) * 100
              if (item.value === 'noRate') {
                result += '<span style="margin-left:1rem"></span>' + item.seriesName + '：' + '----' + '</br>'
              } else if (valueFloat > 0) {
                result += '<span style="margin-left:1rem"></span>' + item.seriesName + '：' + '<span style="color:#FF0033;font-weight: 700;">' + valueFloat.toFixed(2) + '%  ↑' + '</span>' + '</br>'
              } else if (valueFloat < 0)  {
                result += '<span style="margin-left:1rem"></span>' + item.seriesName + '：' + '<span style="color:#50E3C2">' + valueFloat.toFixed(2) + '%  ↓' + '</span>' + '</br>'
              } else {
                result += '<span style="margin-left:1rem"></span>' + item.seriesName + '：' + '0.00%' + '</br>'
              }
              break
            case 3:
            case 5:
              result += item.marker + item.seriesName + '：' + item.value + '分钟' + '</br>'
              break
            case 6:
              result += '<span style="margin-left:1rem"></span>' + item.seriesName + '：' + item.value + '分钟' + '</br>'
              break
            }
          })
          return result
        }
      },
      'xAxis': {
        'type': 'category',
        'boundaryGap': false,
        'data': xData,
        'axisLine': {
          // 取消坐标线
          'show': true,
          'lineStyle': {
            'color': '#E4E4E4'
          }
        },
        'axisTick': {
          // 取消坐标刻度
          'show': false
        },
        'axisLabel': {
          // 坐标轴刻度标签的相关设置
          'color': '#FFFFFF',
          'fontSize': '10',
          'rotate': 50
        }
      },
      'yAxis': {
        'type': 'value',
        'min': 0,
        'position': 'left',
        'axisLine': {
          // 取消坐标线
          'show': false
        },
        'axisTick': {
          // 取消坐标刻度
          'show': false
        },
        'splitLine': {
          // Y坐标刻度标记线
          'show': true,
          'lineStyle': {
            'color': '#3B5D86',
            'width': 0.8,
            'type': 'dashed'
          }
        },
        'axisLabel': {
          // 坐标轴刻度标签的相关设置
          'color': '#FFFFFF',
          'fontSize': '10'
        }
      },
      'series': [
        {
          'name': '交易笔数',
          'type': 'line',
          'smooth': true, // 是否平滑曲线显示
          'symbol': 'emptyCircle', // 标记的图形
          'symbolSize': 5, // 标记的大小
          'sampling': 'average',
          'color': '#258AFF',
          'itemStyle': { // 折线拐点标志的样式
            'normal': {
              'color': '#258AFF'
            }
          },
          'lineStyle': { // 线条样式
            'normal': {
              'color': '#258AFF',
              'width': 2
            }
          },
          'stack': 'a',
          'areaStyle': { // 区域填充样式
            'normal': {
              'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                'offset': 0,
                'color': '#258AFF'
              }, {
                'offset': 0.8,
                'color': '#00316A'
              }, {
                'offset': 1,
                'color': '#00316A'
              }])
            }
          },
          'data': tradeNumArr
        },
        {
          'name': '环比',
          'type': 'line',
          'smooth': true,
          'symbol': 'none',
          'showSymbol': false, // 不显示symbol
          'lineStyle': {
            'width': 0, // 线宽是0
            'color': 'rgba(0, 0, 0, 0)' // 线的颜色是透明的
          },
          'data': tradeNumRatio
        },
        {
          'name': '全行平均',
          'type': 'line',
          'smooth': true,
          'symbol': 'emptyCircle',
          'color': '#FFCD00',
          'lineStyle': {
            'normal': {
              'color': '#FFCD00',
              'width': 1.5,
              'type': 'dashed'
            }
          },
          'data': disposeTimeList
        },
        {
          'name': '平均处理时长',
          'type': 'line',
          'smooth': true, // 是否平滑曲线显示
          'symbol': 'emptyCircle', // 标记的图形
          'symbolSize': 5, // 标记的大小
          'sampling': 'average',
          'color': '#29D9B1',
          'itemStyle': { // 折线拐点标志的样式
            'normal': {
              'color': '#29D9B1'
            }
          },
          'lineStyle': { // 线条样式
            'normal': {
              'color': '#29D9B1',
              'width': 2
            }
          },
          'stack': 'a',
          'areaStyle': { // 区域填充样式
            'normal': {
              'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                'offset': 0,
                'color': '#29D9B1'
              }, {
                'offset': 0.8,
                'color': '#00316A'
              }, {
                'offset': 1,
                'color': '#00316A'
              }])
            }
          },
          'data': allDealAverageList
        },
        {
          'name': '环比',
          'type': 'line',
          'smooth': true,
          'symbol': 'none',
          'showSymbol': false, // 不显示symbol
          'lineStyle': {
            'width': 0, // 线宽是0
            'color': 'rgba(0, 0, 0, 0)' // 线的颜色是透明的
          },
          'data': handleTimeRatio
        },
        {
          'name': '全行平均',
          'type': 'line',
          'smooth': true,
          'symbol': 'emptyCircle',
          'color': '#E970FC',
          'lineStyle': {
            'normal': {
              'color': '#E970FC',
              'width': 1.5,
              'type': 'dashed'
            }
          },
          'data': allDisposeAverageList
        },
        {
          'name': '最快处理时长',
          'type': 'line',
          'smooth': true,
          'symbol': 'none',
          'showSymbol': false, // 不显示symbol
          'lineStyle': {
            'width': 0, // 线宽是0
            'color': 'rgba(0, 0, 0, 0)' // 线的颜色是透明的
          },
          'data': fastHandleTime
        }
      ]
    }
  }
}