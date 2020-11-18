<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'calc(100vh - 110px)'
    },
    option:{
      type:Object,
      default() {
        return {
            title: {
                show:false,
                text: '基础雷达图'
            },
            tooltip: {},
            color: ['#ADC6E2'],
            legend: {
                show: false,
                data: ['预算分配（Allocated Budget）']
            },
            radar: {
                // shape: 'circle',
                name: {
                    show:false,
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                }
                },
                indicator: [
                { name: '销售（sales）', max: 6500},
                { name: '管理（Administration）', max: 16000},
                { name: '信息技术（Information Techology）', max: 30000},
                { name: '客服（Customer Support）', max: 38000},
                { name: '研发（Development）', max: 52000}
                ]
            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data : [
                    {
                        value : [4300, 10000, 28000, 35000, 50000],
                        name : '预算分配（Allocated Budget）'
                    }
                ]
            }]
            }
      }
     }
  },
  data() {
    return {
      chart:null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.option);
    }
  }
}
</script>
