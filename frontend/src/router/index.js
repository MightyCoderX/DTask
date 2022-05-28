import { createRouter, createWebHistory } from 'vue-router';

import DashboardView from '@/views/dashboard/DashboardView.vue';
import TasksView from '@/views/dashboard/tasks/TasksView.vue';
import StatsView from '@/views/dashboard/stats/StatsView.vue';
import AccountView from '@/views/dashboard/account/AccountView.vue';
import store from '../store';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:
    [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            meta:
            {
                protected: true
            },
            component: DashboardView,
            redirect: { name: 'Tasks' },
            children:
            [
                {
                    path: 'tasks',
                    name: 'Tasks',
                    component: TasksView
                },
                {
                    path: 'stats',
                    name: 'Stats',
                    component: StatsView
                },
                {
                    path: 'account',
                    name: 'Account',
                    component: AccountView
                }
            ]
        },
        {
            path: '/about',
            name: 'About',
            component: () => import('@/views/AboutView.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/LoginView.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/RegisterView.vue')
        },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: () => import('@/views/404.vue')
        }
    ]
});

router.beforeEach((to, from, next) =>
{
    if(to.matched.some(record => record.meta.protected))
    {
        if(!store.user.authenticated && !localStorage.getItem('token'))
        {
            next({ name: 'Login' });

            return;
        }
    }
    next();
});

export default router;
