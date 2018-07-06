import {otherRouter, entryRouter, appRouter} from '@/router/router';
import Util from '@/libs/util';
import Vue from 'vue';

const app = {
    state: {
        cachePage: [],			// ...标签路由数组
        isFullScreen: false,	// ...是否全屏展示
        openedSubmenuArr: [],	// 要展开的菜单数组
        menuTheme: 'dark',		// ...主题颜色：'dark'、'light'
        themeColor: '',			// ...字体颜色：blue、green、yellow、red
        pageOpenedList: [{		// ...打开的页面的页面对象(显示打开的页面的列表)
            title: '首页',
            path: '/',
            name: 'index'
        }],
        currentPageName: '',
        currentPath: [
            {
                title: '首页',
                path: '/',
                name: 'index'
            }
        ], // 面包屑数组
        menuList: [],
        routers: [
            otherRouter,
            entryRouter,
            ...appRouter
        ],
        tagsList: [...otherRouter.children],
        messageCount: 0,
        stateList:[],//用来保存左侧菜单跳转数据
        dontCache: ['text-editor', 'artical-publish'],// 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
        currentView:{index:0,obj:null}
    },
    mutations: {
    	//nav导航状态管理
    	setViews(state,view){
    		state.currentView = view;
    	},
    	// ...测试这个方法：this.$store.commit('这里的方法名');
    	testCommit () {
            console.log("哈哈哈，果然，直接被调用了，使用方法：this.$store.commit('testCommit');")
        },
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        //保存左侧菜单传输的数据
         getStateList(state,stateList){
             for(var i=0;i<state.stateList.length;i++){
                 if(state.stateList[i].tabName==stateList.tabName) return
             }
             state.stateList.push(stateList);
         },
        // ...判断菜单权限过滤
        updateMenulist (state) {
            let accessCode = parseInt(sessionStorage.access);
            let menuList = [];
            appRouter.forEach((item, index) => {
                if (item.access !== undefined) {
                    if (Util.showThisRoute(item.access, accessCode)) {
                        if (item.children.length === 1) {
                            menuList.push(item);
                        } else {
                            let len = menuList.push(item);
                            let childrenArr = [];
                            childrenArr = item.children.filter(child => {
                                if (child.access !== undefined) {
                                    if (child.access <= accessCode) {
                                        return child;
                                    }
                                } else {
                                    return child;
                                }
                            });
                            menuList[len - 1].children = childrenArr;
                        }
                    }
                } else {
                    if (item.children.length === 1) {
                        menuList.push(item);
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = [];
                        childrenArr = item.children.filter(child => {
                            if (child.access !== undefined) {
                                if (Util.showThisRoute(child.access, accessCode)) {
                                    return child;
                                }
                            } else {
                                return child;
                            }
                        });
                        if (childrenArr === undefined || childrenArr.length === 0) {
                            menuList.splice(len - 1, 1);
                        } else {
                            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                            handledItem.children = childrenArr;
                            menuList.splice(len - 1, 1, handledItem);
                        }
                    }
                }
            });
            state.menuList = menuList;
        },
        // ...设置主题颜色
        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme (state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage (state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage (state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags (state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        // ...显示打开的页面的列表
        setOpenedList (state) {
        	let list = localStorage.pageOpenedList;
            state.pageOpenedList = list ? JSON.parse(list) : [otherRouter.children[0]];
        },
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },
        setAvator (state, path) {
            localStorage.avatorImgPath = path;
        },
        clearOpenedSubmenu (state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount (state, count) {
            state.messageCount = count;
        },
        increateTag (state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        }
    }
};

export default app;
