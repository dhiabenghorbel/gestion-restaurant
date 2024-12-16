const routes = [
  {
    path: "/home",
    meta: {
      requiresAuth: true
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // {
      //   path: "",
      //   component: () => import("pages/Index.vue"),
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      {
        path: "/Profile",
        component: () => import("src/pages/auth/Profile.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/client",
        component: () => import("src/pages/Clients.vue"),
        meta: {
          requiresAuth: true
        }
      },

      // {
      //   path: "/livreur",
      //   component: () => import("src/pages/Livreur.vue"),
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      {
        path: "/user",
        component: () => import("src/pages/Users.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/panier",
        component: () => import("src/pages/Panier.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/commander",
        component: () => import("src/pages/Commander.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/mes-commandes",
        component: () => import("src/pages/MesCommandes.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/produit",
        component: () => import("src/pages/Produits.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/categorie",
        component: () => import("src/pages/Categories.vue"),
        meta: {
          requiresAuth: true
        }
      }
      // {
      //   path: "/service",
      //   component: () => import("src/pages/Services.vue"),
      //   meta: {
      //     requiresAuth: true
      //   }
      // }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    redirect: "/Profile",
    meta: {
      requiresAuth: true
    }
    //component: () => import("pages/Error404.vue")
  },

  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "/login",
        component: () => import("src/pages/auth/LoginUser.vue")
      },

      // {
      //   path: "/register",
      //   component: () => import("src/pages/auth/RegisterUser.vue")
      // },
      {
        path: "/Profile",
        alias: "/",

        component: () => import("src/pages/auth/Profile.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }

  // Router.beforeEach((to, from, next) => {
  //   if (to.matched.some(record => record.meta.requiresAuth)) {
  //     if (localStorage.getItem("jwt") == null) {
  //       next({
  //         path: "/login"
  //       });
  //     } else {
  //       next();
  //     }
  //   } else {
  //     next();
  //   }
  // });
];
export default routes;
