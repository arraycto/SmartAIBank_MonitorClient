import echarts from 'echarts'
export default {
  // 环形图
  circleOption (legendData, pieData, colorlist) {
    return {
    'tooltip': {
            'trigger': 'item',
            'formatter': function (params) {
              var result =   params.data.rateName + '：' + params.data.percent + '个'
              return result
            }
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
            'normal': {
              'show': true,
              'lineHeight': 20,
              'formatter': ['{sectionStyle|{b}}', '', '{percentStyle|{d}%}'].join('\n'),
              'rich': {
                'percentStyle': {
                  'fontSize': 16,
                  'fontWeight': '700',
                  'color': '#000000'
                },
                'sectionStyle': {
                  'fontSize': 14,
                  'color': '#9B9B9B'
                }
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
  // 首页设备运行-设备类型
  deviceTypeCharts (legendData, pieData, colorlist) {
    return {
      'tooltip': {
        'trigger': 'item',
        'formatter': function (params) {
          var result = params.name + '：' + params.value + '个'
          return result
        }
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
            'normal': {
              'show': true,
              'lineHeight': 20,
              'formatter': ['{sectionStyle|{b}}', '', '{percentStyle|{d}%}'].join('\n'),
              'rich': {
                'percentStyle': {
                  'fontSize': 16,
                  'fontWeight': '700',
                  'color': '#000000'
                },
                'sectionStyle': {
                  'fontSize': 14,
                  'color': '#9B9B9B'
                }
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
  // 含有数量，百分比的环形图
  circleMonitor (legendData, pieData, colorlist) {
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
            'normal': {
              'show': true,
              'lineHeight': 20,
              'formatter': function (arg) {
                const str = '{sectionStyle|' + arg.data.name + '}\n' + '{percentStyle|' + arg.data.percent + '%}'
                return str
              },
              'rich': {
                'percentStyle': {
                  'fontSize': 16,
                  'fontWeight': '700',
                  'color': '#000000'
                },
                'sectionStyle': {
                  'fontSize': 14,
                  'color': '#9B9B9B'
                }
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
  // 首页繁忙度-网点繁忙度分布、整体服务质量分布
  coreBusyDegreeSpreadCharts (legendData, pieData, colorlist) {
    return {
      'tooltip': {
        'trigger': 'item',
        'formatter': function (params) {
          var result = params.name + '：' + params.value + '个'
          return result
        }
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
            'normal': {
              'show': true,
              'lineHeight': 20,
              'formatter': function (arg) {
                const str = '{sectionStyle|' + arg.data.name + '}\n' + '{percentStyle|' + arg.data.percent + '%}'
                return str
              },
              'rich': {
                'percentStyle': {
                  'fontSize': 16,
                  'fontWeight': '700',
                  'color': '#000000'
                },
                'sectionStyle': {
                  'fontSize': 14,
                  'color': '#9B9B9B'
                }
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
  // 首页设备运行
  homedevice (legendData, pieData, colorlist) {
    return {
      'tooltip': {
        'trigger': 'item',
        'formatter': function (params) {
          var result = params.name + '：' + params.value + '个'
          return result
        }
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
            'normal': {
              'show': true,
              'lineHeight': 20,
              'formatter': function (arg) {
                const str = '{sectionStyle|' + arg.data.name + '}\n' + '{percentStyle|' + arg.data.percent + '%}'
                return str
              },
              'rich': {
                'percentStyle': {
                  'fontSize': 16,
                  'fontWeight': '700',
                  'color': '#000000'
                },
                'sectionStyle': {
                  'fontSize': 14,
                  'color': '#9B9B9B'
                }
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
  // 首页交易处理-交易状态
  tranStatusCharts (legendData, pieData, colorlist) {
    return {
      'tooltip': {
        'trigger': 'item',
        'formatter': function (params) {
          var result = params.name + '：' + params.value + '笔'
          return result
        }
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
            'normal': {
              'show': true,
              'lineHeight': 20,
              'formatter': function (arg) {
                const str = '{sectionStyle|' + arg.data.name + '}\n' + '{percentStyle|' + arg.data.percent + '%}'
                return str
              },
              'rich': {
                'percentStyle': {
                  'fontSize': 16,
                  'fontWeight': '700',
                  'color': '#000000'
                },
                'sectionStyle': {
                  'fontSize': 14,
                  'color': '#9B9B9B'
                }
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
  // 折线图
  lineOption (xAxis, tranValue) {
    return {
      'grid': {
        'left': '15',
        'right': '20',
        'top': '40',
        'height': '180',
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
            result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#499DFF;"></span>' + item.seriesName + '：' + item.value + '笔' + '</br>'
          })
          return result
        }
      },
      'xAxis': {
        'type': 'category',
        'boundaryGap': false,
        'data': xAxis,
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
        'name': '总交易数',
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
        'data': tranValue
      }
      ]

    }
  },
  // 折线柱状图
  lineColOption (xAxis, tranValue, barData) {
    return {
      'legend': {
        'textStyle': { // 坐标轴名称文字样式
          'fontFamily': 'PingFangSC-Regular',
          'fontSize': '12',
          'color': '#9B9B9B',
          'letterSpacing': '0'
        },
        'data': [
          {
            'name': '接待客户数',
            'icon': 'circle'
          },
          {
            'name': '排队等待时长',
            'icon': 'circle'
          }
        ]
      },
      'grid': {
        'left': '20',
        'right': '30',
        'top': '40',
        'height': '240',
        'containLabel': true
      },
      'tooltip': {// 提示框组件
        'show': true,
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
          'name': '接待客户数(人)',
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
        },
        {
          'type': 'value',
          'name': '排队等待时长(分钟)',
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
      'series': [{
        'name': '排队等待时长',
        'type': 'line',
        'yAxisIndex': 1, // 代表右侧y轴的数据
        'smooth': true, // 是否平滑曲线显示
        'symbol': 'emptyCircle', // 标记的图形
        'symbolSize': 9, // 标记的大小
        'sampling': 'average',
        'itemStyle': { // 折线拐点标志的样式
          'normal': {
            'color': '#F5A623',
            'borderWidth': 3
          },
          'emphasis': { // hover时的样式
            'borderWidth': 4
          }
        },
        'lineStyle': { // 线条样式
          'normal': {
            'color': '#F5A623',
            'width': 3
          }
        },
        'data': tranValue
      },
      {
        'name': '接待客户数',
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
  },
  //  双柱状图
  doubleBar (xAxis, barData) {
    return {
      'legend': {
        'textStyle': { // 坐标轴名称文字样式
          'fontFamily': 'PingFangSC-Regular',
          'fontSize': '12',
          'color': '#9B9B9B',
          'letterSpacing': '0'
        },
        'data': [
          {
            'name': '抽号人数',
            'icon': 'circle'
          },
          {
            'name': '叫号人数',
            'icon': 'circle'
          }
        ]
      },
      'grid': {
        'left': '10',
        'right': '10',
        'top': '40',
        'height': '250',
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
          'interval': '0', // 强制显示所有刻度
          'rotate': 30
        }
      },
      'yAxis': [
        {
          'type': 'value',
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
          'name': '抽号人数',
          'type': 'bar',
          'data': barData[0],
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
          'barWidth': 15
        },
        {
          'name': '叫号人数',
          'type': 'bar',
          'data': barData[1],
          'itemStyle': {
            'normal': {
              'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#F7B44B' },
                { offset: 1, color: '#F5A623' }
              ]
              ),
              'barBorderRadius': 20
            }
          },
          'barWidth': 15
        }
      ]

    }
  }
}
