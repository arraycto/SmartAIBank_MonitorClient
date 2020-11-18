export default {
  // 总行概况雷达图组件option
  coreRadarOption (maxArray, radarArray) {
    return {
      title: {
        show: false
      },
      tooltip: {},
      color: ['#3794EC', '#FFDF13'],
      legend: {
        show: false,
        x: 'center',
        y: 'bottom',
        icon: 'circle',
        data: ['总行概况'],
        textStyle: {
          color: '#000000',
          fontSize: 14,
          fontWeight: 'bolder'
        }
      },
      radar: {
        name: {
          textStyle: {
            color: 'transparent',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: '接待客户数（人）', max: maxArray[0] },
          { name: '预约购买登记数（笔）', max: maxArray[1] },
          { name: '差评率（%）', max: maxArray[2] },
          { name: '交易平均处理时长（分钟）', max: maxArray[3] },
          { name: '排队等待时间（分钟）', max: maxArray[4] }
        ]
      },
      series: [{
        name: '各维度数据概况',
        type: 'radar',
        areaStyle: { normal: {} },
        // 'itemStyle': { 'normal': { 'areaStyle': { 'type': 'default' } } },
        data: [
          {
            value: radarArray,
            name: '总行概况'
          }
        ]
      }]
    }
  },
  // 分行和营业兼管理概况雷达图组件option
  branchRadarOption (maxArray, branchArray, entityArray) {
    return {
      title: {
        show: false
      },
      tooltip: {},
      color: ['#3794EC', '#FFDF13'],
      legend: {
        x: 'center',
        y: 'bottom',
        icon: 'circle',
        data: ['分行概况', '全行平均'],
        textStyle: {
          color: '#000000',
          fontSize: 14,
          fontWeight: 'bolder'
        }
      },
      radar: {
        name: {
          textStyle: {
            color: 'transparent',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: '接待客户数（人）', max: maxArray[0] },
          { name: '预约购买登记数（笔）', max: maxArray[1] },
          { name: '差评率（%）', max: maxArray[2] },
          { name: '交易平均处理时长（分钟）', max: maxArray[3] },
          { name: '排队等待时间（分钟）', max: maxArray[4] }
        ]
      },
      series: [{
        name: '各维度数据概况',
        type: 'radar',
        areaStyle: { normal: {} },
        // 'itemStyle': { 'normal': { 'areaStyle': { 'type': 'default' } } },
        data: [
          {
            value: branchArray,
            name: '分行概况'
          },
          {
            value: entityArray,
            name: '全行平均'
          }
        ]
      }]
    }
  },
  // 支行概况雷达图组件option
  entityRadarOption (maxArray, branchArray, entityArray) {
    return {
      title: {
        show: false
      },
      tooltip: {},
      color: ['#3794EC', '#FFDF13'],
      legend: {
        x: 'center',
        y: 'bottom',
        icon: 'circle',
        data: ['支行概况', '全行平均'],
        textStyle: {
          color: '#000000',
          fontSize: 14,
          fontWeight: 'bolder'
        }
      },
      radar: {
        name: {
          textStyle: {
            color: 'transparent',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: '接待客户数（人）', max: maxArray[0] },
          { name: '预约购买登记数（笔）', max: maxArray[1] },
          { name: '差评率（%）', max: maxArray[2] },
          { name: '交易平均处理时长（分钟）', max: maxArray[3] },
          { name: '排队等待时间（分钟）', max: maxArray[4] }
        ]
      },
      series: [{
        name: '各维度数据概况',
        type: 'radar',
        areaStyle: { normal: {} },
        // 'itemStyle': { 'normal': { 'areaStyle': { 'type': 'default' } } },
        data: [
          {
            value: branchArray,
            name: '支行概况'
          },
          {
            value: entityArray,
            name: '全行平均'
          }
        ]
      }]
    }
  }
}