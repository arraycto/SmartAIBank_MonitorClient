(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f23981de"],{"0683":function(t,e,i){var a=i("0d9c");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("499e").default;n("48f722e5",a,!0,{sourceMap:!1,shadowMode:!1})},"0d9c":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"\n.bus-ranking-chart[data-v-421ec570]{width:100%;height:270px;margin-top:10px\n}",""])},"2db2":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"busi-effciency-page-content"},[i("el-row",[i("el-col",{attrs:{span:24}},[i("div",{staticClass:"time-select-nav"},[i("div",{staticClass:"time-select"},[i("time-select")],1)])])],1),i("el-row",{attrs:{gutter:15}},[i("el-col",{attrs:{span:12}},[i("div",{staticClass:"piece-content"},[i("business-chart",{attrs:{"business-data":t.timeGroupBusiSum}})],1)]),i("el-col",{attrs:{span:12}},[i("div",{staticClass:"piece-content"},[i("duration-chart",{attrs:{"duration-data":t.tradeDealAvgTime}})],1)])],1),i("el-row",{attrs:{gutter:15}},[i("el-col",{attrs:{span:12}},[i("div",{staticClass:"piece-content"},[i("bus-ranking-chart",{attrs:{"bus-data":t.busiSumRankTop10List,"chart-id":"businessBarChartId","title-text":"业务总量排名","series-name":"业务总量"}})],1)]),i("el-col",{attrs:{span:12}},[i("div",{staticClass:"piece-content"},[i("bus-ranking-chart",{attrs:{"bus-data":t.dealTimeRannkTop10List,"chart-id":"durationBarChartId","title-text":"交易平均处理时长排名","series-name":"交易平均处理时长"}})],1)])],1)],1)},n=[],s=(i("7f7f"),i("419d")),c=i("1057"),r=i("d05c"),u=i("c05f"),o=i("5e9c"),f={name:"branch_busiEfficiency",data:function(){return{timeGroupBusiSum:null,tradeDealAvgTime:null,busiSumRankTop10List:null,dealTimeRannkTop10List:null}},components:{timeSelect:s["a"],businessChart:c["a"],durationChart:r["a"],busRankingChart:u["a"]},mounted:function(){this.requestEfficiencyBusiness(),this.requestEfficiencyRanking()},activated:function(){this.requestEfficiencyBusiness(),this.requestEfficiencyRanking()},methods:{requestEfficiencyBusiness:function(){var t=this,e=this.$store.state.operate.timeRange,i={orgid:o["a"].getStore({key:"orgId"}),dateType:e,timeValue:"day"===e?this.$store.state.operate.dayDateRange:this.$store.state.operate.timeDate};this.$http.get("efficiencyBusiness",i).then(function(e){t.timeGroupBusiSum=e.businessSum,t.tradeDealAvgTime=e.tradeDealAvgTime})},requestEfficiencyRanking:function(){var t=this,e=this.$store.state.operate.timeRange,i={orgid:o["a"].getStore({key:"orgId"}),dateType:e,timeValue:"day"===e?this.$store.state.operate.dayDateRange:this.$store.state.operate.timeDate};this.$http.get("efficiencyBusinessRanking",i).then(function(e){t.busiSumRankTop10List=e.businessSum.busiSumRankTop10List,t.dealTimeRannkTop10List=e.businessSum.dealTimeRankTop10List})}},watch:{"$store.state.operate.timeRange":function(t,e){o["a"].isActivity(this.$options.name)&&(this.requestEfficiencyBusiness(),this.requestEfficiencyRanking())},"$store.state.orgId":function(t,e){o["a"].isActivity(this.$options.name)&&(this.requestEfficiencyBusiness(),this.requestEfficiencyRanking())},"$store.state.operate.dayDateRange":function(t,e){o["a"].isActivity(this.$options.name)&&(this.requestEfficiencyBusiness(),this.requestEfficiencyRanking())}}},d=f,h=(i("4336"),i("2877")),p=Object(h["a"])(d,a,n,!1,null,"7cff650a",null);p.options.__file="busiEfficiency.vue";e["default"]=p.exports},4336:function(t,e,i){"use strict";var a=i("d677"),n=i.n(a);n.a},6844:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"\n.busi-effciency-page-content[data-v-7cff650a]{width:100%;height:100%;background:#f2f3f7;padding:0 1rem 1rem 1rem\n}\n.busi-effciency-page-content .el-row[data-v-7cff650a]{margin-top:15px\n}\n.busi-effciency-page-content .piece-content[data-v-7cff650a]{background:#fff;min-height:300px;border-radius:4px;padding:10px\n}\n.busi-effciency-page-content .time-select-nav[data-v-7cff650a]{min-height:25px\n}\n.busi-effciency-page-content .time-select-nav .time-select[data-v-7cff650a]{position:absolute;right:10px\n}",""])},c05f:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.busData&&t.busData.length>0?i("div",{staticClass:"bus-ranking-chart",attrs:{id:t.chartId}}):i("occupied",{attrs:{height:"100%",explain:"暂无"+t.seriesName+"数据"}})},n=[],s=i("313e"),c=i.n(s),r=i("719b"),u=i("3280"),o=i("5e9c"),f={name:"busRankingChart",props:{busData:Array,chartId:String,titleText:String,seriesName:String},components:{occupied:u["a"]},data:function(){return{}},mounted:function(){this.busData&&this.busData.length>0&&this.initChart()},methods:{initChart:function(){if(document.getElementById(this.chartId)){var t=c.a.init(document.getElementById(this.chartId)),e=[],i=[],a=[],n=[],s=[],u=0;this.busData.map(function(t){e.push(t.branchName),i.push(t.value),t.rate||0===t.rate?a.push(t.rate):a.push("noRate"),n.push(t.rankNo);var s=parseInt(t.value);s>u&&(u=parseInt(s))}),this.busData.map(function(t){s.push(u+u/6)});var f=r["a"].businessBarOption(e,i,s,this.titleText,this.seriesName,a,n);t.setOption(f,!0),t.on("click",function(t){"xAxis"===t.componentType&&o["a"].rankingChartsClickEvent(t.value)}),window.onresize=function(){t.resize()}}}},watch:{busData:{handler:function(t){this.$nextTick(function(){null!=t&&this.initChart()})},deep:!0}}},d=f,h=(i("cda3"),i("2877")),p=Object(h["a"])(d,a,n,!1,null,"421ec570",null);p.options.__file="busRankingChart.vue";e["a"]=p.exports},cda3:function(t,e,i){"use strict";var a=i("0683"),n=i.n(a);n.a},d677:function(t,e,i){var a=i("6844");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("499e").default;n("bd3d79ee",a,!0,{sourceMap:!1,shadowMode:!1})}}]);