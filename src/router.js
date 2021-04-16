import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/notebook/:id',
            name: 'notebook',
            component: () => import('./views/Notebook.vue')
        },
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '*',
            redirect: { name: 'home' }
        }
    ]
})
