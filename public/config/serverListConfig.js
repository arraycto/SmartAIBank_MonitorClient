var clientConfig = window.DCSpace.sysConfig
var baseUrl = clientConfig.serveUrl
window.DCSpace.sysConfig.urlList = [{
  'login': {
    'dummy': './dummy/login/login.json',
    'server': baseUrl + 'login'
  },
  'orgTree': {
    'dummy': './dummy/login/orgTree.json',
    'server': baseUrl + 'api/v1/monitor/org/{orgid}'
  },
  'custflow': {
    'dummy': './dummy/smartOperate/custflow/custflow.json',
    'server': baseUrl + 'smartmanager/v1//{orgid}/{branchStatsType}'
  },
  'custflowDetail': {
    'dummy': './dummy/smartOperate/custflow/custflowDetail.json',
    'server': baseUrl + 'api/v1/custflow-detail/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'custflowRank': {
    'dummy': './dummy/smartOperate/custflow/custflowRank.json',
    'server': baseUrl + 'api/v1/custflow-rank/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'surveySum': {
    'dummy': './dummy/smartOperate/survey/surveySum.json',
    'server': baseUrl + 'api/v1/orgsuminfo/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'surveyCustflow': {
    'dummy': './dummy/smartOperate/survey/surveyCustflow.json',
    'server': baseUrl + 'api/v1/custflow/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'surveyQueue': {
    'dummy': './dummy/smartOperate/survey/surveyQueue.json',
    'server': baseUrl + 'api/v1/queue/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'surveyServiceQuality': {
    'dummy': './dummy/smartOperate/survey/surveyServiceQuality.json',
    'server': baseUrl + 'api/v1/service/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'surveyBusiEfficiency': {
    'dummy': './dummy/smartOperate/survey/surveyBusiEfficiency.json',
    'server': baseUrl + 'api/v1/business/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'surveyHallMarket': {
    'dummy': './dummy/smartOperate/survey/surveyHallMarket.json',
    'server': baseUrl + 'api/v1/hallmarket-sum/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'serviceQualityDetail': {
    'dummy': './dummy/smartOperate/serviceQuality/serviceQualityDetail.json',
    'server': baseUrl + 'api/v1/service-quality/{orgid}/{qualityType}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'serviceQualityEntity': {
    'dummy': './dummy/smartOperate/serviceQuality/serviceQualityEntity.json',
    'server': baseUrl + 'api/v1/service-quality-sum/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'queueDetail': {
    'dummy': './dummy/smartOperate/queue/queueDetail.json',
    'server': baseUrl + 'api/v1/queue-detail/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'queueRank': {
    'dummy': './dummy/smartOperate/queue/queueRank.json',
    'server': baseUrl + 'api/v1/queue-rank/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'efficiencyBusiness': {
    'dummy': './dummy/smartOperate/busiEfficiency/efficiencyBusiness.json',
    'server': baseUrl + 'api/v1/busi-efficiency/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'efficiencyBusinessRanking': {
    'dummy': './dummy/smartOperate/busiEfficiency/efficiencyBusinessRanking.json',
    'server': baseUrl + 'api/v1/busi-efficiency-rank/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'highFrequencyTrading': {
    'dummy': './dummy/smartOperate/busiEfficiency/highFrequencyTrading.json',
    'server': baseUrl + 'api/v1/high-frequency-trade/{orgid}/{tradeType}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'timeConsumingTrade': {
    'dummy': './dummy/smartOperate/busiEfficiency/timeConsumingTrade.json',
    'server': baseUrl + 'api/v1/trade-trend/{orgid}/{tradeType}/{dateType}/{timeValue}/{tranFlag}/{branchStatsType}'
  },
  'tradeAverageTime': {
    'dummy': './dummy/smartOperate/bankTeller/tradeAverageTime.json',
    'server': baseUrl + 'api/v1/teller-view/busi-efficiency/tranHandleTime/{orgid}/{dateType}/{timeValue}'
  },
  'frequencyTradeTime': {
    'dummy': './dummy/smartOperate/bankTeller/frequencyTradeTime.json',
    'server': baseUrl + 'api/v1/teller-view/busi-efficiency/TranTop20HandleTime/{orgid}/{dateType}/{timeValue}'
  },
  'serviceQualityTeller': {
    'dummy': './dummy/smartOperate/bankTeller/serviceQuality.json',
    'server': baseUrl + 'api/v1/teller-view/service-quality/{qualityType}/{orgid}/{dateType}/{timeValue}'
  },
  'tellerDetails': {
    'dummy': './dummy/smartOperate/bankTeller/tellerDetails.json',
    'server': baseUrl + 'api/v1/teller-view/personal/{tellerid}/{orgid}/{dateType}/{timeValue}'
  },
  'tradeNumber': {
    'dummy': './dummy/smartOperate/bankTeller/tradeNumber.json',
    'server': baseUrl + 'api/v1/teller-view/busi-efficiency/tranCount/{orgid}/{dateType}/{timeValue}'
  },
  'hallMarketDetail': {
    'dummy': './dummy/smartOperate/hallMarket/hallMarketDetail.json',
    'server': baseUrl + 'api/v1/hallmarket/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'hallMarketRanking': {
    'dummy': './dummy/smartOperate/hallMarket/hallMarketRanking.json',
    'server': baseUrl + 'api/v1/hallmarket-rank/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'hallMarketEntityDetail': {
    'dummy': './dummy/smartOperate/hallMarket/hallMarketEntityDetail.json',
    'server': baseUrl + 'api/v1/hallmarket-user/{orgid}/{tranCode}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'hallMarketCustInfo': {
    'dummy': './dummy/smartOperate/hallMarket/hallMarketCustInfo.json',
    'server': baseUrl + 'api/v1/hallmarket-detail/{orgid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'tellerHallMarketCustInfo': {
    'dummy': './dummy/smartOperate/hallMarket/tellerHallMarketCustInfo.json',
    'server': baseUrl + 'api/v1/hallmarket-detail/{orgid}/{tellerid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'tellerHallMarketDetail': {
    'dummy': './dummy/smartOperate/hallMarket/tellerHallMarketDetail.json',
    'server': baseUrl + 'api/v1/hallmarket-detail/{orgid}/{tellerid}/{dateType}/{timeValue}/{branchStatsType}'
  },
  'custMovingLine': {
    'dummy': './dummy/smartOperate/custMovingLine/custMovingLine.json',
    'server': baseUrl + 'api/v1/cust-routes/{orgid}/{dateType}/{timeValue}'
  },
  'getHttpToken': {
    'server': baseUrl + 'api/v1/tokens/refresh'
  }
}]
