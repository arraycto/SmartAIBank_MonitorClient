(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70334754"],{"010a":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"cusflow-main-content"},[e("el-row",[e("el-col",{attrs:{span:24}},[e("div",{staticClass:"time-select-nav"},[e("div",{staticClass:"time-select"},[e("time-select")],1)])])],1),e("el-row",{attrs:{gutter:15}},[e("el-col",{staticClass:"height-100",attrs:{span:12}},[e("div",{staticClass:"bg-write customer-number"},[e("customer-num-chart",{attrs:{"chart-data":t.timeGroupCustFlow}})],1)]),e("el-col",{staticClass:"height-100",attrs:{span:12}},[e("div",{staticClass:"bg-write customer-number"},[e("customer-type-chart",{attrs:{"chart-data":t.timePartCustFlowCustType}})],1)])],1),e("el-row",{attrs:{gutter:15}},[e("el-col",{staticClass:"height-100",attrs:{span:8}},[e("div",{staticClass:"bg-write customer-type"},[e("chart",{attrs:{"chart-id":"sexChartId","center-text":"性别","chart-data":t.custFlowPartBySexList,"color-arr":t.sexColorArr}})],1)]),e("el-col",{staticClass:"height-100",attrs:{span:8}},[e("div",{staticClass:"bg-write customer-type"},[e("chart",{attrs:{"chart-id":"ageChartId","center-text":"年龄","chart-data":t.custFlowPartByAgeList,"color-arr":t.ageColorArr}})],1)]),e("el-col",{staticClass:"height-100",attrs:{span:8}},[e("div",{staticClass:"bg-write customer-type"},[e("chart",{attrs:{"chart-id":"propertyCharttId","center-text":"资产","chart-data":t.custFlowPartByAssetsList,"color-arr":t.propertyColorArr}})],1)])],1),e("el-row",{attrs:{gutter:40}},[e("el-col",{staticClass:"height-100",attrs:{span:24}},[e("div",{staticClass:"bg-write"},[e("rank-chart",{attrs:{"m-name":t.$options.name}})],1)])],1)],1)},r=[],o=(e("7f7f"),e("cadf"),e("551c"),e("097d"),e("4543")),i=e("12b3"),n=e("b7f4"),c=e("dac4"),u=e("419d"),l=e("5e9c"),h={name:"core_custflow",data:function(){return{timeGroupCustFlow:null,timePartCustFlowCustType:null,custFlowPartBySexList:[],custFlowPartByAgeList:[],custFlowPartByAssetsList:[],sexColorArr:["#E46C6C","#5295F0","#B1B1B1"],ageColorArr:["#1087FF","#42DFE6","#9E7EF7","#E46C6C","#F7D205","#F5974E","#B1B1B1"],propertyColorArr:["#F96363","#8664F8","#1087FF","#42DFE6","#596ED6","#F5974E","#F7D205","#B1B1B1"]}},mounted:function(){this.requestCustflowDetail()},activated:function(){this.requestCustflowDetail()},components:{chart:o["a"],customerNumChart:i["a"],customerTypeChart:n["a"],rankChart:c["a"],timeSelect:u["a"]},methods:{requestCustflowDetail:function(){var t=this,a=this.$store.state.operate.timeRange,e={orgid:l["a"].getStore({key:"orgId"}),dateType:a,timeValue:"day"===a?this.$store.state.operate.dayDateRange:this.$store.state.operate.timeDate};this.$http.get("custflowDetail",e).then(function(a){var e=t;e.timeGroupCustFlow=a.custFlowInfo,e.timePartCustFlowCustType=a.timePartCustFlow,e.transformArray(a.custFlowPartBySexList,"sex"),e.transformArray(a.custFlowPartByAgeList,"age"),e.transformArray(a.custFlowPartByAssetsList,"assets")})},transformArray:function(t,a){var e=[];t.map(function(t){var a=t.desc,s={value:t.value,name:a};e.push(s)}),"sex"===a?this.custFlowPartBySexList=e:"age"===a?this.custFlowPartByAgeList=e:"assets"===a&&(this.custFlowPartByAssetsList=e)}},watch:{"$store.state.operate.timeRange":function(t,a){l["a"].isActivity(this.$options.name)&&this.requestCustflowDetail()},"$store.state.orgId":function(t,a){l["a"].isActivity(this.$options.name)&&this.requestCustflowDetail()},"$store.state.operate.dayDateRange":function(t,a){l["a"].isActivity(this.$options.name)&&this.requestCustflowDetail()}}},p=h,m=(e("0200"),e("2877")),d=Object(m["a"])(p,s,r,!1,null,"616303aa",null);d.options.__file="custflow.vue";a["default"]=d.exports},"0200":function(t,a,e){"use strict";var s=e("8afe"),r=e.n(s);r.a},"321b":function(t,a,e){"use strict";var s=e("719a"),r=e.n(s);r.a},"3ae9":function(t,a,e){a=t.exports=e("2350")(!1),a.push([t.i,"\n.branch-num-compare[data-v-087264aa]{width:100%;height:15rem;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box\n}",""])},"719a":function(t,a,e){var s=e("3ae9");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var r=e("499e").default;r("554c55c4",s,!0,{sourceMap:!1,shadowMode:!1})},"8afe":function(t,a,e){var s=e("b995");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var r=e("499e").default;r("2a7f282b",s,!0,{sourceMap:!1,shadowMode:!1})},b995:function(t,a,e){a=t.exports=e("2350")(!1),a.push([t.i,"\n.cusflow-main-content[data-v-616303aa]{background:#f2f3f7;padding:0 1rem 1rem 1rem\n}\n.cusflow-main-content .el-row[data-v-616303aa]{margin-top:15px\n}\n.cusflow-main-content .customer-number[data-v-616303aa]{height:18.75rem\n}\n.cusflow-main-content .customer-type[data-v-616303aa]{height:13.75rem;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box\n}\n.cusflow-main-content .bg-write[data-v-616303aa]{background:#fff;border-radius:8px\n}\n.cusflow-main-content .height-100[data-v-616303aa]{height:100%\n}\n.cusflow-main-content .time-select-nav[data-v-616303aa]{min-height:1.56rem\n}\n.cusflow-main-content .time-select-nav .time-select[data-v-616303aa]{position:absolute;right:10px\n}",""])},dac4:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return null!=t.custFlowTop10List&&t.custFlowTop10List.length>0?e("div",{staticClass:"branch-num-compare",attrs:{id:"branchRankingId"}}):e("occupied",{attrs:{height:"15rem",explain:"暂无接待客户数排名数据"}})},r=[],o=e("313e"),i=e.n(o),n=e("3280"),c=e("0de3"),u=e("5e9c"),l={name:"branchRankingChart",components:{occupied:n["a"]},props:["mName"],data:function(){return{custFlowTop10List:[]}},mounted:function(){this.requestCustflowRank()},activated:function(){this.requestCustflowRank()},methods:{requestCustflowRank:function(){var t=this,a=this.$store.state.operate.timeRange,e={orgid:u["a"].getStore({key:"orgId"}),dateType:a,timeValue:"day"===a?this.$store.state.operate.dayDateRange:this.$store.state.operate.timeDate};this.$http.get("custflowRank",e).then(function(a){t.custFlowTop10List=a.list,t.custFlowTop10List&&t.$nextTick(function(){this.initChart(this.custFlowTop10List)})})},initChart:function(t){if(document.getElementById("branchRankingId")){var a=i.a.init(document.getElementById("branchRankingId")),e=[],s=[],r=[],o=[],n=[],l=0;t.map(function(t){e.push(t.branchName);var a=parseInt(t.value);a>l&&(l=a),r.push(t.value),t.rate||0===t.rate?o.push(t.rate):o.push("noRate"),n.push(t.rankNo)}),t.map(function(t){s.push(l+l/3)});var h=c["a"].branchNumCompareOption(e,r,s,o,n);a.setOption(h,!0),a.on("click",function(t){"xAxis"===t.componentType&&u["a"].rankingChartsClickEvent(t.value)}),window.onresize=function(){a.resize()}}}},watch:{"$store.state.operate.timeRange":function(t,a){u["a"].isActivity(this.mName)&&this.requestCustflowRank()},"$store.state.orgId":function(t,a){u["a"].isActivity(this.mName)&&this.requestCustflowRank()},"$store.state.operate.dayDateRange":function(t,a){u["a"].isActivity(this.mName)&&this.requestCustflowRank()}}},h=l,p=(e("321b"),e("2877")),m=Object(p["a"])(h,s,r,!1,null,"087264aa",null);m.options.__file="branchNumCompare.vue";a["a"]=m.exports}}]);