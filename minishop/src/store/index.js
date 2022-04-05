import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    token: "",
    currentUser: "",
    isLogin: false,
    cartCount: 0
}

const actions = {
    setUser({ commit }, user) {
        commit("userStatus", user)
    },
    setCartCount({commit}, cartCount) {
        commit("cartCount", cartCount)
    }
}

const mutations = {
    userStatus(state, user) {
        // 已登录
        if (user) {
            state.currentUser = user
            state.isLogin = true
            state.token = user.token
        } else if (user == null) {
            // 登出时清空sessionStorage
            sessionStorage.setItem("username", null)
            sessionStorage.setItem("token", "")
            state.currentUser = null
            state.isLogin = false
            state.token = ""
        }
    },
    cartCount(state, cartCount) {
        state.cartCount = cartCount
    }
}

const getters = {
    currentUser(state) {
        return state.currentUser
    },
    isLogin(state) {
        return state.isLogin
    },
    cartCount(state) {
        return state.cartCount
    }
}

// 生成vuex实例
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})