import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/users/Login.vue";
import Register from "./components/users/Register.vue";

// import ProductOverview from './components/Products/ProductOverview.vue';
import MyAccountsOverview from "./components/bankaccounts/MyAccountsOverview.vue";
import AllAccountsOverview from "./components/bankaccounts/Employee/AllAccountsOverview.vue";
import AccountDetail from "./components/bankaccounts/Employee/AccountDetail.vue";
import AccountEdit from "./components/bankaccounts/Employee/AccountEdit.vue";
import AccountCreate from "./components/bankaccounts/Employee/AccountCreate.vue";
import UserList from "./components/users/employee/UserList.vue";
import UserEdit from "./components/users/employee/UserEdit.vue";
import ChangePassword from "./components/users/ChangePassword.vue";
import PrimaryTransactions from "./components/Transactions/PrimaryTransactions.vue";
import SavingTransactions from "./components/Transactions/SavingTransactions.vue";
import TransactionAdmin from "./components/Transactions/TransactionAdmin.vue"

import NoAccess from "./components/NoAccess.vue";

// lazy-loaded
const Profile = () => import("./components/users/Profile.vue");
const routes = [
  {
    path: "/",
    name: "/",
    component: MyAccountsOverview,
  },
  {
    path: "/bankaccountmanagement",
    name: "/bankaccountmanagement",
    component: AllAccountsOverview,
  },
  {
    path: "/usermanagement",
    name: "/usermanagement",
    component: UserList,
  },
  {
    path: "/usermanagement/:id",
    component: UserEdit,
    props: true,
  },
  {
    path: "/accountcreate",
    name: "/accountcreate",
    component: AccountCreate,
  },
  {
    path: "/accountdetails/:id",
    component: AccountDetail,
    props: true,
  },
  {
    path: "/accountedit/:id",
    component: AccountEdit,
    props: true,
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
    path: "/changepassword",
    name: "/changepassword",
    component: ChangePassword,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/primary-transactions",
    name: "Primary Transactions",
    component: PrimaryTransactions,

  },
  {
    path: "/saving-transactions",
    name: "Saving Transactions",
    component: SavingTransactions,
  },
  {
    path: "/transaction-admin",
    name: "TransactionAdmin",
    component: TransactionAdmin
  },
  {
    path: "/noaccess",
    name: "NoAccess",
    component: NoAccess,
  },
  {
    path: "/*",
    component: NoAccess
  },
  
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/noaccess"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("userObject");
  const employeePages = [
    "/bankaccountmanagement",
    "/accountcreate",
    "/accountdetails",
    "/accountdetails/:id",
    "/accountedit/:id",
    "/usermanagement",
    "/usermanagement/:id",
  ];

  const adminRequired = employeePages.includes(to.path);

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    if (!adminRequired) {
      next();
    } else {
      const userObject = JSON.parse(localStorage.getItem("userObject"));

      if (userObject) {
        if (
          userObject.role.filter((role) => role.name === "ROLE_EMPLOYEE")
            .length > 0
        ) {
          next();
        } else {
          next("/noaccess");
        }
      } else {
        next("/noaccess");
      }
    }
  }
});

export default router;
