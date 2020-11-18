import echarts from 'echarts'
export default {
  // 排队每月平均排队时长option
  entityMonthOption (xData, queueTimerData, averageTimerData, showData, rateData) {
    return {
      'grid': {
        'left': '15',
        'right': '20',
        'top': '40',
        'height': '80%',
        'containLabel': true
      },
      'legend': {// 图例组件
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
              result += item.marker + item.seriesName + '：' + item.value + '分钟' + '</br>'
            }
          })
          return result
        }
      },
      'xAxis': {
        'type': 'category',
        'boundaryGap': false,
        'data': xData,
        'axisLine': {// 取消坐标线
          'show': false
        },
        'axisTick': {// 取消坐标刻度
          'show': false
        },
        'axisLabel': {// 坐标轴刻度标签的相关设置
          'color': '#9B9B9B',
          'fontSize': '10'
        }
      },
      'yAxis': {
        'type': 'value',
        'min': 0,
        'axisLine': {// 取消坐标线
          'show': false
        },
        'axisTick': {// 取消坐标刻度
          'show': false
        },
        'splitLine': {// Y坐标刻度标记线
          'show': true,
          'lineStyle': {
            'color': '#F1F1F1',
            'width': 1,
            'type': 'dashed'
          }
        },
        'axisLabel': {// 坐标轴刻度标签的相关设置
          'color': '#9B9B9B',
          'fontSize': '12'
        }
      },
      'series': [
        {
          'name': '排队等待时长',
          'type': 'line',
          'smooth': true, // 是否平滑曲线显示
          'symbol': 'emptyCircle', // 标记的图形
          'symbolSize': 5, // 标记的大小
          'sampling': 'average',
          'color': '#5AA6FF',
          'itemStyle': {// 折线拐点标志的样式
            'normal': {
              'color': '#5AA6FF'
            }
          },
          'lineStyle': {// 线条样式
            'normal': {
              'color': '#5AA6FF',
              'width': 1
            }
          },
          'stack': 'a',
          'areaStyle': {// 区域填充样式
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
  // 排队 几分钟排队时长圆形图表的option
  entityMinuteOption (legendData, pieData) {
    return {
      'tooltip': {
        'trigger': 'item',
        'formatter': function (params) {
          if (params.name !== '时长') {
            var result = params.name + '：' + params.value + '(' + params.percent + '%)'
            return result
          }
        }
      },
      'legend': {
        'x': 'center',
        'y': 'bottom',
        'itemGap': 20,
        'itemWidth': 10, // 图例标记的图形宽度
        'itemHeight': 10,
        'textStyle': {
          'color': ' #4A4A4A',
          'fontSize': '12'
        },
        'data': legendData
      },
      'calculable': true,
      'color': ['#60A9FE', '#E97272', '#E9B437', '#876CE8'],
      'series': [
        {
          'name': '',
          'type': 'pie',
          'radius': ['30%', '60%'],
          'startAngle': 125,
          'avoidLabelOverlap': true,
          'label': {
            'show': true,
            'formatter': ['{sectionStyle|{b}}', '', '{percentStyle|{d}%}'].join('\n'),
            'rich': {
              'percentStyle': {
                'fontSize': 18,
                'fontWeight': '700'
              },
              'sectionStyle': {
                'fontSize': 14
              }
            }
          },
          'labelLine': {
            'normal': {
              'show': true
            },
            'emphasis': {
              'show': true
            }
          },
          'data': pieData
        },
        {
          'name': '',
          'type': 'pie',
          'radius': ['30%', '37%'],
          'legendHoverLink': false,
          'hoverAnimation': false,
          'itemStyle': {
            'normal': {
              'color': 'rgba(0,0,0,0.1)',
              'label': {
                'show': false
              }
            }
          },
          'data': [{ 'value': 1, 'name': '时长' }]
        },
        {
          'name': '',
          'type': 'pie',
          'radius': ['0', '30%'],
          'legendHoverLink': false,
          'hoverAnimation': false,
          'itemStyle': {
            'normal': {
              'color': '#FFFFFF',
              'label': {
                'show': true,
                'position': 'center',
                'formatter': function () {
                  return '时长'
                },
                'textStyle': {
                  'fontSize': 16,
                  'color': '#4A4A4A'
                }
              },
              'labelLine': {
                'show': false
              }
            }
          },
          'data': [{ 'value': 1, 'name': '时长' }]
        }
      ]

    }
  },
  // 排队 客户类型线性图表option
  entityCustomerTypeLineOption (queueTimerData, averageTimerData, rateData) {
    return {
      'grid': {
        'left': '0',
        'right': '0',
        'top': '40',
        'bottom': '10',
        'containLabel': true
      },
      'tooltip': {// 提示框组件
        'show': true,
        'trigger': 'axis',
        'textStyle': {
          'align': 'left'
        },
        formatter: function (params) {
          var result = ''
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
              result += item.marker + item.seriesName + '：' + item.value + '分钟' + '</br>'
            }
          })
          return result
        }
      },
      'xAxis': {
        'type': 'category',
        'boundaryGap': false,
        'data': queueTimerData,
        'show': false
      },

      'yAxis': {
        'type': 'value',
        'min': 0,
        'show': false
      },
      'series': [
        {
          'name': '排队等待时长',
          'type': 'line',
          'smooth': true, // 是否平滑曲线显示
          'symbol': 'emptyCircle', // 标记的图形
          'symbolSize': 2, // 标记的大小
          'color': '#5AA6FF',
          'itemStyle': {
            // 折线拐点标志的样式
            'normal': {
              'color': '#5AA6FF'
            }
          },
          'lineStyle': {
            // 线条样式
            'normal': {
              'color': '#5AA6FF',
              'width': 1
            }
          },
          'stack': 'a',
          'areaStyle': {
            // 区域填充样式
            'normal': {
              'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  'offset': 0,
                  'color': '#5AA6FF'
                },
                {
                  'offset': 1,
                  'color': '#fff'
                }
              ])
            }
          },
          'data': queueTimerData
        },
        {
          'name': '全行平均',
          'type': 'line',
          'smooth': true,
          'symbol': 'emptyCircle', // 标记的图形
          'symbolSize': 2, // 标记的大小
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
  // 排队 客户类型饼图表option
  entityCustomerTypePieOption (waitTimeData) {
    return {
      'tooltip': {
        'trigger': 'item',
        'formatter': function (params) {
          if (params.name !== '时长') {
            var result = params.name + '：' + params.value + '(' + params.percent + '%)'
            return result
          }
        }
      },
      'calculable': true,
      'color': ['#60A9FE', '#E97272', '#E9B437', '#876CE8'],
      'series': [
        {
          'name': '',
          'type': 'pie',
          'radius': ['35%', '50%'],
          'label': {
            'show': true,
            'position': 'outside',
            'color': '#000000',
            'fontSize': 12,
            'formatter': function (arg) {
              return Math.round(arg.percent) + '%'
            }
          },
          'labelLine': {
            'show': false,
            'length': 5,
            'length2': 0
          },
          'data': waitTimeData
        },
        {
          'name': '',
          'type': 'pie',
          'radius': ['35%', '40%'],
          'legendHoverLink': false,
          'hoverAnimation': false,
          'startAngle': 125,
          'itemStyle': {
            'normal': {
              'color': 'rgba(0,0,0,0.1)',
              'label': {
                'show': false
              }
            }
          },
          'data': [{ 'value': 1, 'name': '时长' }]
        }
      ]

    }
  },
  // 排队 个支行柱状排行option
  entityBranchBarOption (xData, branchWaitData, defaultData, showRatioQueue, showRankQueue) {
    return {
      'color': ['#258AFF'],
      'title': {
        'text': '排队等待时长排名',
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
            'icon':
                            'image:// data:image/png;base64,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'
          }
        ],
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
          params.forEach(function (item) {
            switch (item.seriesIndex) {
            case 0:
              break
            case 1:
              result += item.name + '：' + item.value + '分钟' + '</br>'
              break
            case 2:
              var valueFloat = parseFloat(item.value) * 100
              if (item.value === 'noRate') {
                result += item.seriesName + '：' + '----' + '</br>'
              } else if (valueFloat > 0) {
                result += item.seriesName + '：' + '<span style="color:#FF0033;font-weight:700;">' + valueFloat.toFixed(2) + '%  ↑' + '</span>' + '</br>'
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
          'fontSize': '12'
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
      'series': [
        {
          'name': '全行平均',
          'type': 'bar',
          'barWidth': '20px',
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
          'name': '排队等待时长',
          'type': 'bar',
          'barWidth': '20px',
          'data': branchWaitData,
          'color': '#FFB127',
          'markLine': {
            'symbol': 'none',
            'data': [{ 'type': 'average', 'name': '平均值' }],
            'label': {
              'position': 'end',
              'formatter': '{c}  分钟'
            },
            'lineStyle': {
              'color': '#FFB127'
            }
          },
          'itemStyle': {
            'color': new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
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
          'symbol': 'none',
          'barWidth': '20px',
          'data': showRatioQueue,
          'color': 'transparent'
        },
        {
          'name': '排名',
          'type': 'bar',
          'barWidth': '20px',
          'data': showRankQueue,
          'color': 'transparent'
        }
      ]
    }
  },
  // 各时段排队时长option
  entityTimeFrameOption (xData, queueTimerData) {
    return {
      'grid': {
        'left': '10',
        'right': '10',
        'bottom': '10',
        'containLabel': true
      },
      'title': {
        'text': '各时段排队等待时长',
        'textStyle': {
          'color': '#4A4A4A',
          'fontSize': '16',
          'fontWeight': '600'
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
            if (item.value || item.value === 0) {
              result += item.marker + item.seriesName + '：' + item.value + '分钟' + '</br>'
            }
          })
          return result
        }
      },
      'xAxis': {
        'type': 'category',
        'boundaryGap': true,
        'data': xData,
        'axisLine': {// 取消坐标线
          'show': false
        },
        'axisTick': {// 取消坐标刻度
          'show': false
        },
        'axisLabel': {// 坐标轴刻度标签的相关设置
          'color': '#9B9B9B',
          'fontSize': '12'
        }
      },
      'yAxis': {
        'type': 'value',
        'min': 0,
        'axisLine': {// 取消坐标线
          'show': false
        },
        'axisTick': {// 取消坐标刻度
          'show': false
        },
        'splitLine': {// Y坐标刻度标记线
          'show': true,
          'lineStyle': {
            'color': '#F1F1F1',
            'width': 1,
            'type': 'dashed'
          }
        },
        'axisLabel': {// 坐标轴刻度标签的相关设置
          'color': '#9B9B9B',
          'fontSize': '12'
        }
      },
      'series': [
        {
          'name': '排队等待时长',
          'type': 'line',
          'smooth': true, // 是否平滑曲线显示
          'symbol': 'emptyCircle', // 标记的图形
          'symbolSize': 5, // 标记的大小
          'sampling': 'average',
          'itemStyle': {// 折线拐点标志的样式
            'normal': {
              'color': '#5AA6FF'
            }
          },
          'lineStyle': {// 线条样式
            'normal': {
              'color': '#5AA6FF',
              'width': 3
            }
          },
          'areaStyle': {
            // 区域填充样式
            'normal': {
              'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  'offset': 0,
                  'color': '#5AA6FF'
                },
                {
                  'offset': 1,
                  'color': '#fff'
                }
              ])
            }
          },
          'data': queueTimerData
        }
      ]

    }
  }
}
