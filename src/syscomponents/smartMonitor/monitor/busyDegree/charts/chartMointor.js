import echarts from 'echarts'
export default {
  // 分时段繁忙度统计
  dealStatisticsBarOption (xData, tradeNumArr, allDealAverageList) {
    return {
      'color': ['#258AFF'],
      // 'title': {
      //   'text': showTitle,
      //   'textStyle': {
      //     'color': '#9B9B9B',
      //     'fontSize': '12',
      //     'fontWeight': 'normal'
      //   }
      // },
      'legend': {
        // 图例组件
        'left': 'center',
        'orient': 'horizontal',
        'itemWidth': 20, // 图例标记的图形宽度
        'itemHeight': 8,
        'itemGap': 30,
        'data': [
          { 'name': '抽号人数', 'icon': 'circle' },
          { 'name': '叫号人数', 'icon': 'circle' }
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
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#499DFF;"></span>' + item.seriesName + '：' + item.value + '人' + '</br>'
              break
            case 1:
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F5A623;"></span>' + item.seriesName + '：' + item.value + '人' + '</br>'
              break
            }
          })
          return result
        }
      },
      'grid': {
        'left': '30',
        'right': '20',
        'bottom': '0',
        'top': '30',
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
          'interval': '0', // 强制显示所有刻度
          'rotate': 30,
          'margin': 10
        }
      },
      'yAxis': [
        {
          'type': 'value',
          'min': 0,
          'name': '人数（个）',
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
        }

        // {
        //   'type': 'value',
        //   'name': '             时间（分钟）',
        //   'position': 'right',
        //   'axisLine': {
        //     // 取消坐标线
        //     'show': false,
        //     'lineStyle': {
        //       'color': '#9B9B9B'
        //     }
        //   },
        //   'axisTick': {
        //     // 取消坐标刻度
        //     'show': false
        //   },
        //   'splitLine': {
        //     // Y坐标刻度标记线
        //     'show': false
        //   },
        //   'axisLabel': {
        //     // 坐标轴刻度标签的相关设置
        //     'color': '#9B9B9B',
        //     'fontSize': '12'
        //   }
        // }
      ],
      'series': [
        {
          'name': '抽号人数',
          'type': 'bar',
          'barWidth': '18px',
          'data': tradeNumArr,
          'yAxisIndex': 0,
          'color': '#258AFF',
          'itemStyle': {
            'color': new echarts.graphic.LinearGradient(
              0, 0, 0, 1, [
                { 'offset': 0, 'color': '#77B6FF' },
                { 'offset': 1, 'color': '#258AFF' }
              ]
            ),
            'barBorderRadius': 10
          }
        }, {
          'name': '叫号人数',
          'type': 'bar',
          'barWidth': '18px',
          'data': allDealAverageList,
          'yAxisIndex': 0,
          'color': '#258AFF',
          'itemStyle': {
            'color': new echarts.graphic.LinearGradient(
              0, 0, 0, 1, [
                { offset: 0, color: '#F7B44B' },
                { offset: 1, color: '#F5A623' }
              ]
            ),
            'barBorderRadius': 10
          }
        }
        // {
        //   'name': '排队等待时长',
        //   'type': 'line',
        //   'smooth': true,
        //   'symbol': 'emptyCircle',
        //   'color': '#F5A623',
        //   'yAxisIndex': 0,
        //   'lineStyle': {
        //     'normal': {
        //       'color': '#F5A623',
        //       'width': 1,
        //       'type': 'solid'
        //     }
        //   },
        //   'data': allDealAverageList
        // }
      ]
    }
  },
  circleOption (legendData, pieData, colorlist) {
    return {
      'tooltip': {
        // 'trigger': 'item',
        // 'formatter': function (params) {
        //   if (params.name !== '时长') {
        //     var result = params.name + '：' + params.value + '(' + params.percent + '%)'
        //     return result
        //   }
        // }
      },
      'legend': {
        'show': false,
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
      'color': colorlist, // ['#EE667F', '#F5A623', '#9E7EF7', '#55CFB4', '#1087FF', '#9B9B9B'],
      'series': [
        {
          'name': '',
          'type': 'pie',
          'radius': ['50%', '65%'],
          'startAngle': 125,
          'avoidLabelOverlap': true,
          'label': {
            'show': true,
            'formatter': ['{sectionStyle|{b}}', '', '{percentStyle|{d}%}'].join('\n'),
            'rich': {
              'percentStyle': {
                'fontSize': 14,
                'fontWeight': '700',
                'color': '#000000'
              },
              'sectionStyle': {
                'fontSize': 12,
                'color': '#9B9B9B'
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
          }
          // ,
          // 'data': [{ 'value': 1, 'name': '时长' }]
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
          }
          // ,
          // 'data': [{ 'value': 1, 'name': '时长' }]
        }
      ]
    }
  },
  // 几分钟排队时长圆形的Monitor
  entityMinuteMonitor (legendData, pieData, colorlist) {
    return {
      'tooltip': {
        'trigger': 'item',
        'formatter': function (params) {
          if (params.name) {
            var result = params.name + '：' +  params.value + '人'
            return result
          }
        }
      },
      'calculable': true,
      'color': colorlist,
      'graphic': {
        // echarts饼图中间放字
        'type': 'text',
        'left': '46%',
        'top': '45%',
        'z': 2,
        'style': {
          'text': '时长',
          'textAlign': 'center',
          'fill': '#4A4A4A',
          'font': 'bolder 18px "PingFangSC-Semibold"'
        }
      },
      'series': [
        {
          'name': '',
          'type': 'pie',
          'radius': ['45%', '60%'],
          'startAngle': 125,
          'avoidLabelOverlap': true,
          'label': {
            'show': true,
            'formatter': function (arg) {
              const str = '{sectionStyle|' + arg.data.name + '}\n\n' + '{percentStyle|' + arg.data.percent + '%}'
              return str
            },
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
        }
        // {
        //   'name': '',
        //   'type': 'pie',
        //   'radius': ['0', '30%'],
        //   'legendHoverLink': false,
        //   'hoverAnimation': false,
        //   'itemStyle': {
        //     'normal': {
        //       'color': '#FFFFFF',
        //       'label': {
        //         'show': true,
        //         'position': 'center',
        //         'formatter': function () {
        //           return '时长'
        //         },
        //         'textStyle': {
        //           'fontSize': 16,
        //           'fontWeight': '1000',
        //           'color': '#4A4A4A'
        //         }
        //       },
        //       'labelLine': {
        //         'show': false
        //       }
        //     }
        //   },
        //   'data': [{ 'name': '时长' }]
        // }
      ]

    }
  },
  // 客户类型 饼状图
  entityCustomerTypePieMointor (waitTimeData, colorlist) {
    return {
      'tooltip': {
        'trigger': 'item',
        'formatter': function (params) {
          if (params.name) {
            var result = params.name + '：' + params.value + '人'
            return result
          }
        }
      },
      'calculable': true,
      'color': colorlist,
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
              return arg.data.percent + '%'
            }
          },
          'labelLine': {
            'show': false,
            'length': 5,
            'length2': 0
          },
          'data': waitTimeData
        }
      ]

    }
  },
  // 客户类型线性图表monitor
  entityCustomerTypeLineMonitor (XData, waitTimeList, waitCustomerList) {
    return {
      'legend': {
        // 图例组件
        'bottom': '5%',
        'left': '10%',
        'orient': 'horizontal',
        'itemWidth': 20, // 图例标记的图形宽度
        'itemHeight': 8,
        'itemGap': 15,
        'data': [
          { 'name': '抽号人数', 'icon': 'circle' },
          { 'name': '叫号人数', 'icon': 'circle' }
        ],
        'textStyle': {
          'color': ' #9B9B9B',
          'fontSize': '12'
        }
      },
      'grid': {
        'left': '10',
        'right': '10',
        'top': '30',
        'bottom': '10',
        'containLabel': true
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
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#499DFF;"></span>' + item.seriesName + '：' + item.value + '人' + '</br>'
              break
            case 1:
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F5A623;"></span>' + item.seriesName + '：' + item.value + '人' + '</br>'
              break
            }
          })
          return result
        }
      },
      'xAxis': {
        'type': 'category',
        'data': XData,
        'show': false,
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
          'rotate': 0,
          'margin': 15
        }
      },
      'yAxis': [

        {
          'show': false,
          'type': 'value',
          'min': 0,
          'name': '人数（个）',
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
              'color': '#F1F1F1'
            }
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
          'name': '抽号人数',
          'type': 'bar',
          'barWidth': '8px',
          'data': waitCustomerList,
          'yAxisIndex': 0,
          'color': '#258AFF',
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
          'name': '叫号人数',
          'type': 'bar',
          'barWidth': '8px',
          'data': waitTimeList,
          'yAxisIndex': 0,
          'color': '#258AFF',
          'itemStyle': {
            'color': new echarts.graphic.LinearGradient(
              0, 0, 0, 1, [
                { offset: 0, color: '#F7B44B' },
                { offset: 1, color: '#F5A623' }
              ]
            ),
            'barBorderRadius': 10
          }
        }
        // {
        //   'name': '叫号人数',
        //   'type': 'line',
        //   'smooth': true,
        //   'symbol': 'emptyCircle', // 标记的图形
        //   'color': '#F5A623',
        //   'yAxisIndex': 1,
        //   'lineStyle': {
        //     'normal': {
        //       'color': '#F5A623',
        //       'width': 1,
        //       'type': 'solid'
        //     }
        //   },
        //   'data': waitTimeList
        // }
      ]
    }
  },
  // 业务类型饼状图数据
  typeDistributeMonitor (centerText, colorArray, chartData) {
    return {
      'tooltip': {
        'trigger': 'item',
        'formatter': '{b} : {c}人'
      },
      'color': colorArray,
      'calculable': true,
      'graphic': {
        // echarts饼图中间放字
        'type': 'text',
        'left': '46%',
        'top': '45%',
        'z': 2,
        'style': {
          'text': centerText,
          'textAlign': 'center',
          'fill': '#4A4A4A',
          'font': 'bolder 18px "PingFangSC-Semibold"'
        }
      },
      'series': [
        {
          'startAngle': -145,
          'type': 'pie',
          'radius': [30, 120],
          'center': ['50%', '50%'],
          'roseType': 'area',
          'label': {
            'normal': {
              'position': 'outside',
              'show': true,
              'formatter': ['{sectionStyle|{b}}', '', '{valueStyle|{c}}{percentStyle|人（{d}%）}'].join('\n'),
              'rich': {
                'percentStyle': {
                  'fontSize': 14,
                  'color': '#000000'
                },
                'valueStyle': {
                  'fontSize': 20,
                  'fontWeight': '700',
                  'color': '#000000'
                },
                'sectionStyle': {
                  'fontSize': 14,
                  'color': '#9B9B9B'
                }
              }
            },
            'emphasis': {
              'show': true
            }
          },
          'lableLine': {
            'normal': {
              'show': true
            },
            'emphasis': {
              'show': false
            }
          },
          'data': chartData
        }
      ]
    }
  },
  businessTypeBarMointor (xData, tradeNumArr, allDealAverageList) {
    return {
      'color': ['#258AFF'],
      // 'title': {
      //   'text': showTitle,
      //   'textStyle': {
      //     'color': '#9B9B9B',
      //     'fontSize': '12',
      //     'fontWeight': 'normal'
      //   }
      // },
      'legend': {
        // 图例组件
        'left': 'center',
        'orient': 'horizontal',
        'itemWidth': 20, // 图例标记的图形宽度
        'itemHeight': 8,
        'itemGap': 30,
        'data': [
          { 'name': '接待客户数', 'icon': 'circle' },
          { 'name': '排队等待时长', 'icon': 'circle' }
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
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#499DFF;"></span>' + item.seriesName + '：' + item.value + '人' + '</br>'
              break
            case 1:
              result += item.marker + item.seriesName + '：' + item.value + '分钟' + '</br>'
              break
            }
          })
          return result
        }
      },
      'grid': {
        'left': '20',
        'right': '40',
        'bottom': '0',
        'top': '40',
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
          'interval': '0',
          'rotate': 20,
          'margin': 15
        }
      },
      'yAxis': [
        {
          'type': 'value',
          'min': 0,
          'name': '人数（人）',
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
          'name': '             时间（分钟）',
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
          'name': '接待客户数',
          'type': 'bar',
          'barWidth': '20px',
          'data': tradeNumArr,
          'yAxisIndex': 0,
          'color': '#258AFF',
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
          'name': '排队等待时长',
          'type': 'line',
          'smooth': true,
          'symbol': 'emptyCircle',
          'color': '#F5A623',
          'yAxisIndex': 1,
          'lineStyle': {
            'normal': {
              'color': '#F5A623',
              'width': 1,
              'type': 'solid'
            }
          },
          'data': allDealAverageList
        }
      ]
    }
  }
}
