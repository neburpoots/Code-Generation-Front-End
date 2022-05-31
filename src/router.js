import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/users/Login.vue";
import Register from "./components/users/Register.vue";
import MyOrders from "./components/Orders/users/MyOrders.vue";
import OrderDetail from "./components/Orders/users/OrderDetail.vue";
import ShoppingCart from "./components/Cart/ShoppingCart.vue";
import ThanksForOrdering from "./components/ThanksForOrdering.vue"

import ProductOverview from './components/Products/ProductOverview.vue';
import ProductList from './components/Products/admin/ProductList.vue';
import ProductCreate from './components/Products/admin/ProductCreate.vue';
import ProductEdit from './components/Products/admin/ProductEdit.vue';

import OrderOverview from './components/Orders/admin/OrderOverview.vue';

import NoAccess from './components/NoAccess.vue';

// lazy-loaded
const Profile = () => import("./components/users/Profile.vue")
const routes = [
  {
    path: "/",
    name: "/",
    component: ProductOverview,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/myorders",
    name: "myorders",
    // lazy-loaded
    component: MyOrders,
  },
  { 
    path: '/orderdetail/:id', 
    component: OrderDetail, 
    props: true  
  },
  { 
    path: '/shoppingcart', 
    component: ShoppingCart, 
  },
  { 
    path: '/thanksforordering', 
    name: 'ThanksForOrdering',
    component: ThanksForOrdering, 
    props: true
  },
  { 
    path: '/ordermanagement', 
    name: 'OrderOverview',
    component: OrderOverview, 
  },
  { 
    path: '/productmanagement', 
    name: 'ProductList',
    component: ProductList, 
    props: true
  },
  { 
    path: '/productcreate', 
    name: 'ProductCreate',
    component: ProductCreate, 
  },
  { 
    path: '/noaccess', 
    name: 'NoAccess',
    component: NoAccess
  },
  { 
    path: '/productedit/:id', 
    component: ProductEdit, 
    props: true  
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/', '/shoppingcart', '/noaccess'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('userObject');
    const adminPages = ['/ordermanagement', '/productcreate', '/productmanagement',
    '/productcreate', '/productedit/:id'];

    const adminRequired = adminPages.includes(to.path);

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      if(!adminRequired) {
        next();
      } else {
        const userObject = JSON.parse(localStorage.getItem("userObject"));

        if(userObject) {
          if(userObject.user.is_admin) {
            next();
          } else {
            next('/noaccess')
          }
        } else {
          next('/noaccess')
        }
      }
    }
});

export default router;

