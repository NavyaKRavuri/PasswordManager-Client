import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // lazy-loaded
      component: () => import('./components/Dashboard.vue')
    },
    { 
      path: '/website/:websiteId', 
      name: 'ManageWebsite',
      component: () => import('./components/Website/Manage.vue'),
      props: true,
    },
    {
      path: '/:catchAll(.*)*',
      name: "PageNotFound",
      component: () => import('./components/PageNotFound.vue'),
    },
  ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('login');
    } else {
      next();
    }
});



