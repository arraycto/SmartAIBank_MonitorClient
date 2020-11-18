import base from '@/common/base'
const modules = {
    namespaced: true,
    state: {
        visitedViews: [],
        cachedViews: [],
        menus:[],
        accessList:[],
        breadcrumbs:{// 面包屑相关类容
            currBreadcrumb:[],//当前的面包屑
            hisBreadcrumb:{
                'smartManager': ['我的首页']// 默认显示的面包屑类容
            }//以路由的name为key保存对应的面包屑数组 
        },
        //角色资源树的备选数据
        resourceOptional:{
            add:'添加',
            ame:'修改',
            del:'删除',
            que:'查看'
        }
    },
    getters: {
        visitedViews: state => state.visitedViews,
        cachedViews: state => state.cachedViews,
    },
    mutations: {
        setMenus(state, msg) {
          state.menus = msg
        },
        setAccessList(state, msg) {
            state.accessList = msg
        },
        //设置当前数组
        setCurrBreadcrumb(state,curr){
            if(curr instanceof Array){
                state.breadcrumbs.currBreadcrumb = curr
            }else{
                throw new Error("参数必须是数组");  
            } 
        },
        // 往添加对应的历史页面的面包屑
        addBreadcrumb(state,routeName){
            state.breadcrumbs.hisBreadcrumb[routeName] = state.breadcrumbs.currBreadcrumb
        },
        ADD_VISITED_VIEW: (state, view) => {
          if (state.visitedViews.some(v => v.path === view.path)){return}
          // console.log(state.currSys)
          if(state.currSys === 'smartOperate'){
            let orgName = base.findNameFromOrgid(state.menus,state.orgId)
            state.visitedViews.push(
              Object.assign({}, view, {
                title: orgName + view.meta.title.substr(2,view.meta.title.length) || 'no-name'
              })
            )
          } else {
            state.visitedViews.push(
              Object.assign({}, view, {
                title: view.meta.title
              })
            )
          }
        },
        ADD_CACHED_VIEW: (state, view) => {
          if (state.cachedViews.includes(view.name)) return
          if (!view.meta.noCache) {
            state.cachedViews.push(view.name)
          }
        },
    
        DEL_VISITED_VIEW: (state, view) => {
          for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
              state.visitedViews.splice(i, 1)
              break
            }
          }
        },
        DEL_CACHED_VIEW: (state, view) => {
          for (const i of state.cachedViews) {
            if (i === view.name) {
              const index = state.cachedViews.indexOf(i)
              state.cachedViews.splice(index, 1)
              break
            }
          }
        },
    
        DEL_OTHERS_VISITED_VIEWS: (state, view) => {
          for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
              state.visitedViews = state.visitedViews.slice(i, i + 1)
              break
            }
          }
        },
        DEL_OTHERS_CACHED_VIEWS: (state, view) => {
          for (const i of state.cachedViews) {
            if (i === view.name) {
              const index = state.cachedViews.indexOf(i)
              state.cachedViews = state.cachedViews.slice(index, index + 1)
              break
            }
          }
        },
    
        DEL_ALL_VISITED_VIEWS: state => {
          state.visitedViews = []
        },
        DEL_ALL_CACHED_VIEWS: state => {
          state.cachedViews = []
        },
    
        UPDATE_VISITED_VIEW: (state, view) => {
          if(state.currSys === 'smartOperate') {
            for (let v of state.visitedViews) {
              if (v.path === view.path) {
                let orgName = base.findNameFromOrgid(state.menus,state.orgId)
                v = Object.assign(v, view,{
                  title: orgName + view.meta.title.substr(2,view.meta.title.length) || 'no-name'
                })
                break
               }
            }
          } else {
            for (let v of state.visitedViews) {
                if (v.path === view.path) {
                  v = Object.assign(v, view,{
                    title: view.meta.title
                  })
                  break
                 }
              }
          }
        }
    
      },
      actions: {
        addView({ dispatch }, view) {
          dispatch('addVisitedView', view)
          dispatch('addCachedView', view)
        },
        addVisitedView({ commit }, view) {
          commit('ADD_VISITED_VIEW', view)
        },
        addCachedView({ commit }, view) {
          commit('ADD_CACHED_VIEW', view)
        },
    
        delView({ dispatch, state }, view) {
          return new Promise(resolve => {
            dispatch('delVisitedView', view)
            dispatch('delCachedView', view)
            resolve({
              visitedViews: [...state.visitedViews],
              cachedViews: [...state.cachedViews]
            })
          })
        },
        delVisitedView({ commit, state }, view) {
          return new Promise(resolve => {
            commit('DEL_VISITED_VIEW', view)
            resolve([...state.visitedViews])
          })
        },
        delCachedView({ commit, state }, view) {
          return new Promise(resolve => {
            commit('DEL_CACHED_VIEW', view)
            resolve([...state.cachedViews])
          })
        },
    
        delOthersViews({ dispatch, state }, view) {
          return new Promise(resolve => {
            dispatch('delOthersVisitedViews', view)
            dispatch('delOthersCachedViews', view)
            resolve({
              visitedViews: [...state.visitedViews],
              cachedViews: [...state.cachedViews]
            })
          })
        },
        delOthersVisitedViews({ commit, state }, view) {
          return new Promise(resolve => {
            commit('DEL_OTHERS_VISITED_VIEWS', view)
            resolve([...state.visitedViews])
          })
        },
        delOthersCachedViews({ commit, state }, view) {
          return new Promise(resolve => {
            commit('DEL_OTHERS_CACHED_VIEWS', view)
            resolve([...state.cachedViews])
          })
        },
    
        delAllViews({ dispatch, state }, view) {
          return new Promise(resolve => {
            dispatch('delAllVisitedViews', view)
            dispatch('delAllCachedViews', view)
            resolve({
              visitedViews: [...state.visitedViews],
              cachedViews: [...state.cachedViews]
            })
          })
        },
        delAllVisitedViews({ commit, state }) {
          return new Promise(resolve => {
            commit('DEL_ALL_VISITED_VIEWS')
            resolve([...state.visitedViews])
          })
        },
        delAllCachedViews({ commit, state }) {
          return new Promise(resolve => {
            commit('DEL_ALL_CACHED_VIEWS')
            resolve([...state.cachedViews])
          })
        },
    
        updateVisitedView({ commit }, view) {
          commit('UPDATE_VISITED_VIEW', view)
        }
      }
}

export default modules