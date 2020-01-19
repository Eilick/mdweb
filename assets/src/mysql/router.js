import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/mysql/Home'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
    ]
})
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
export default router;
