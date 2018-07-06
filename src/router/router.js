import Main from '@/views/comentryfile/main/Main.vue';
import Index from '@/views/comentryfile/index/Index.vue';
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/components/login/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/components/error/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/components/error/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/components/error/500.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/components/main/lock/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/main',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home', title: {i18n: '综合展示'}, name: 'home', component: () => import('@/views/components/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/components/myself/myself.vue') },
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/components/message/message.vue') },
        { path: 'order/:order_id/:user_name', title: '订单详情', name: 'order-info', component: () => import('@/views/comexample/routerPage/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/comexample/routerPage/component/shopping-info.vue') } // 用于展示带参路由
    ]
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const entryRouter = {
    path: '/',
    name: 'entryRouter',
    redirect: '/index',
    component: Index,
    children: [
        { path: 'index', title: {i18n: '首页'}, name: 'index', component: () => import('@/views/components/home/home.vue')}
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
	{
        path: '/biaoge',
        icon: 'social-buffer',
        name: 'biaoge',
        title: 'Tab-Table组件',
        component: Main,
        children: [
           	{path: 'tab',icon: 'compose',name: 'tab',access: 0,title: 'Tab切换案例',component: () => import('@/views/comexample/tab-table/tab/tab.vue')},
        	{path: 'table',icon: 'compose',name: 'table',access: 0,title: '表格案例展示',component: () => import('@/views/comexample/tab-table/table/table.vue')},
           	{path: 'tabtable',icon: 'compose',name: 'tabtable',access: 0,title: 'tab表格切换案例',component: () => import('@/views/comexample/tab-table/tabTable/tabTable.vue')}
        ]
	},
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    entryRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
