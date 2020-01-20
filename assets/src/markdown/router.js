import Vue from 'vue'
import Router from 'vue-router'

import CreateMd from '@/markdown/Create'

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
    ]
})
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
export default router;
