import Vue from 'vue'
import Router from 'vue-router'

import CreateMd from '@/markdown/Create'
import CreateUrl from '@/markdown/CreateUrl'
import UpdateMd from '@/markdown/Edit'

import MdDetail from '@/markdown/Detail'
import MdList from '@/markdown/ArticleList'
import Search from '@/markdown/Search'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: MdList,
        },
        {
            path: '/markdown/create',
            name: 'CreateMd',
            component: CreateMd,
            meta : {
                keepAlive : false,
            }
        },
        {
            path: '/url/create',
            name: 'CreateUrl',
            component: CreateUrl,
            meta : {
                keepAlive : false,
            }
        },
        {
            path: '/markdown/list',
            name: 'MdList',
            component: MdList,
            meta : {
                keepAlive : true,
            }
        },
         {
            path: '/markdown/search',
            name: 'Search',
            component: Search,
            meta : {
                keepAlive : true,
            }
        },
        {
            path: '/markdown/edit/:id',
            name: 'UpdateMd',
            component: UpdateMd,
        },
        {
            path: '/markdown/detail/:id',
            name: 'MdDetail',
            component: MdDetail,
        },
    ]
})
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
export default router;
