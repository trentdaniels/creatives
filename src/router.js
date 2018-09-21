import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Sstore from "./store";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/Signup.vue")
    },
    {
      path: "/getstarted",
      name: "getstarted",
      component: () => import('./views/UserStart.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/Account/Details.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'edit',
          component: () => import('./views/Account/Edit.vue')
        },
        {
          path: 'delete',
          component:() => import('./views/Account/Delete.vue')
        }
      ]
    }
  ],
  beforeEach(to, from, next) {
    let isLoggedIn = Store.getters.isLoggedIn;
    let needsAuthentication = to.matched.some(route => route.meta.requiresAuth);

    if (needsAuthentication && !isLoggedIn) {
      next("login");
    } else if (!needsAuthentication && isLoggedIn) {
      next();
    } else {
      next();
    }
  }
});
