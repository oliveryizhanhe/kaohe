import router from "@/router/index.js";

const state = {
    
    visitedViews: [],
    cachedViews: [],
    isShowTags: true 
};

const mutations = {
    ADD_VIEW(state, newRoute) {
        let isExist1 = state.visitedViews.some((item) => {
            return newRoute.name == item.name
        })
        if (!isExist1) {
            state.visitedViews.push({
                path: newRoute.path,
                name: newRoute.name,
                title: newRoute.meta.title
            })
        }
        let isExist2 = state.cachedViews.includes(newRoute.name)
       
        if (!isExist2 & newRoute.meta.keepAlive) {
            state.cachedViews.push(newRoute.name)
        }
    },
    DELETE_VIEW(state, { name, isCurrent }) {
        
        let i = state.visitedViews.findIndex((item) => {
            return item.name == name
        })
        if (isCurrent) {
            if (i == 0) {
                router.push({ path: "/" })
            } else {
                router.push({
                    path: state.visitedViews[i - 1].path
                })
            }
        }
        state.visitedViews.splice(i, 1)
        let isInner = state.cachedViews.includes(name)
        if (isInner) { 
            let j = state.cachedViews.findIndex((item) => {
                return item == name
            })
            state.cachedViews.splice(j)
        }

    },
    DELETE_ALLVIEW(state) {
        state.visitedViews = []
        state.cachedViews = []
        router.replace({
            path: '/'
        })
    },
    DELETE_OTHERVIEW(state, { name }) {
       
        let i = state.visitedViews.findIndex((item) => {
            return item.name == name
        })
        let keepObj = { ...state.visitedViews[i] }
        state.visitedViews = [keepObj] 
        router.push({ path: keepObj.path }) 
        
        if (state.cachedViews.includes(name)) { 
            state.cachedViews = [name]
        } else {
            state.cachedViews = [] 
        }
    }
}

const actions = {
    add_view({ commit }, newRoute) {
        commit("ADD_VIEW", newRoute);
    },
    delete_view({ commit }, name) {
        commit("DELETE_VIEW", name);
    },
    delete_allview({ commit }) {
        commit("DELETE_ALLVIEW")
    },
    delete_otherview({ commit }, name) {
        commit("DELETE_OTHERVIEW", name)
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
};