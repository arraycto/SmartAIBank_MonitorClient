import base from '@/common/base'
const modules = {
    namespaced: true,
    state: {
        monitorMenuBankLevel:sessionStorage.monitorMenuBankLevel||"core",
        bankLevel: "entity",
        orgId: "",
        board: "",// 看板 home(首页) monitor（监控）warning（预警）history（历史记录）
        monitorPath: '', // 监控历史路径
        warningPath: '', // 预警历史路径
        historyPath: '', // 历史记录历史路径
        warnLeftIndex: '', // 预警-监控左侧菜单栏index
        reportsLeftIndex: '', // 历史记录-报表左侧菜单栏index
        warnAmount: 0,// 预警数量
        underOrg:[],//下属所有机构列表
        interimBankLevel: 'core', // 用于顶部监控页签，左侧页签时使用 具有总行权限切换分行时，临时缓存银行级别
        interimBankId: '', // 用于顶部监控页签，左侧页签时使用  具有总行权限切换分行查看时，缓存支行名
        tableBranchId:'',//缓存繁忙度营业机构
        branchItem:'',//缓存搜索框中的机构对象
        managerBranchId:'',//缓存繁忙度中的管理机构
        branchList:'',//缓存报表所属机构及下属机构
        refreshTime:0,
        orgLevel:'',//登录用户所属机构级别
        orgType:'',//登录用户所属机构类型
        parameter:''
    },
    mutations: {
        // 没有分行看板页面  总分统分为管理机构页面一样  支行单独页面
        setbankLevel(state, msg) {
            if(msg==='entity'){// 非管理机构
                state.monitorBankLevel = msg
                sessionStorage.monitorBankLevel=msg
            }else {// 管理机构
                state.bankLevel = 'core'
                sessionStorage.monitorBankLevel=msg
            }
        },
        setMonitorBankLevel(state, msg) {
            if(msg==='entity'){// 非管理机构

                state.monitorMenuBankLevel = msg
                sessionStorage.monitorMenuBankLevel=msg
            }else {// 管理机构
                state.bankLevel = 'core'
                sessionStorage.monitorMenuBankLevel=msg
            }
        },
        //缓存登录用户所属机构的机构级别
        setOrgLevel(state, msg) {
            state.orgLevel = msg
            sessionStorage.monitorOrgLevel =msg
        },
         //缓存登录用户所属机构的机构类型
         setOrgType(state, msg) {
            state.orgType = msg
            sessionStorage.monitorOrgType =msg
        },
        //缓存报表所属机构及下属机构
        setBranchList(state, msg) {
            state.branchList = msg
            sessionStorage.monitorBranchList =JSON.stringify(msg)
        },
        //缓存营业机构
        settableBranchId(state, msg) {
            state.tableBranchId = msg
            var value = msg.substring(0, msg.length - 13)
            sessionStorage.monitorOrgid=value
        },

        //缓存管理机构
        setManagerBranchId(state, msg) {
            state.managerBranchId = msg
            var value = msg.substring(0, msg.length - 13)
            sessionStorage.monitorOrgid=value
        },


        //缓存定时器刷新数量
        setrefreshTime(state, msg) {
            state.refreshTime = msg
        },


        setBranchItem(state, msg) {
            state.branchItem = msg
        },
        setOrgId(state, msg) {
            state.orgId = msg
        },
        // 更新看板信息
        updateBoard(state, msg){
            state.board = msg
            sessionStorage.board=msg
        },
        setMonitorPath(state, msg){
            state.monitorPath = msg
        },
        setWarningPath(state, msg){
            state.warningPath = msg
        },
        setHistoryPath(state, msg){
            state.historyPath = msg
        },
        setWarnLeftIndex(state, msg){
            state.warnLeftIndex = msg
        },
        setReportsLeftIndex(state, msg){
            state.reportsLeftIndex = msg
        },
        setWarnAmount(state, msg){
            state.warnAmount = msg
        },
        setInterimBankId(state, msg){
            state.interimBankId = msg
        },
        setInterimBankLevel(state, msg){
            state.interimBankLevel = msg
            // sessionStorage.monitorInterimBankLevel=msg
        },
        //获取当前机构的下属机构
        setUnderOrg(state, msg) {
            state.monitorUnderOrg = msg
            sessionStorage.monitorUnderOrg=JSON.stringify(msg)
        },
        setBoardDoor(state, msg){
            state.boardDoor = msg
        },
        setParameter(state, msg){
            state.parameter = msg
        }
    },
    actions: {

    }
}

export default modules
