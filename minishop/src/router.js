import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
import Product from './pages/product'
import Detail from './pages/detail'
import Login from './pages/login'
import Register from './pages/register'
import Buy from './pages/buy'
import Success from './pages/success'
import Cart from './pages/cart'
import Order from './pages/order'
import OrderList from './pages/orderList'
import OrderConfirm from './pages/orderConfirm'
import OrderPay from './pages/orderPay'
import Search from './pages/search'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: Index,
                }, {
                    path: '/product/:id',
                    name: 'product',
                    component: Product,
                }, {
                    path: '/detail/:id',
                    name: 'detail',
                    component: Detail,
                },{
                    path: '/list',
                    name: 'order-list',
                    component: OrderList
                }, 
                {
                    path: '/search',
                    name: 'search',
                    component: Search
                }, 
            ]
        }, {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/register',
            name: 'register',
            component: Register
        }, {
            path: '/buy',
            name: 'buy',
            component: Buy,
            redirect: '/success',
            children: [
                {
                    path: '/success',
                    name: 'success',
                    component: Success
                }, {
                    path: '/cart',
                    name: 'cart',
                    component: Cart
                },
            ]
        }, {
            path: '/order',
            name: 'order',
            component: Order,
            children: [
                {
                    path: '/confirm',
                    name: 'order-confirm',
                    component: OrderConfirm
                }, {
                    path: '/pay',
                    name: 'order-pay',
                    component: OrderPay
                }
            ]
        }
    ]
})

// 路由导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/index' || from.path === '/index' || from.path === '/') {
        next()
    } else {
        let token = sessionStorage.getItem("token")
        if (token === null || token === '') {
            next('/login')
        } else {
            if ((from.path === '/login' && to.path === '/login')) {
                next('/')
            } else {
                next()
            }
        }
    }
})

// 解决路由跳转不回到顶部问题
router.afterEach(() => {
    document.documentElement.scrollTop = 0;
})



export default router