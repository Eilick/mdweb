import Vue from 'vue'
import Router from 'vue-router'

import CreateMd from '@/markdown/Create'
import UpdateMd from '@/markdown/Edit'

import MdDetail from '@/markdown/Detail'
import ImageList from '@/markdown/ImageList'
import TrashMdList from '@/markdown/TrashMdList'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: CreateMd,
        },
        {
            path: '/markdown/create',
            name: 'CreateMd',
            component: CreateMd,
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
        {
            path: '/markdown/images',
            name: 'ImageList',
            component: ImageList,
        },
        {
            path: '/markdown/trash_list',
            name: 'TrashMdList',
            component: TrashMdList,
        },
    ]
})
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
export default router;
