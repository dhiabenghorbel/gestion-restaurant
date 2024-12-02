<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #1a037e" elevated>
      <q-toolbar>
        <q-toolbar-title
          ><div class="toolbar-title">BISTRO VINTAGE</div>
        </q-toolbar-title>
        <div class="toolbar-text">CONNEXION</div>
        <!-- <router-link to="/login">Login</router-link>

        <router-link to="/register">Register</router-link> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style scoped>
.toolbar-text {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 17px;
  letter-spacing: 2px;
  font-weight: bold;
  color: rgb(189, 185, 185);
}
.toolbar-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 25px;
  letter-spacing: 5px;
  font-weight: bold;
  color: gainsboro;
}
.q-layout {
  background-color: rgb(235, 232, 232);
  /* background-image: url("https://www.creer-entreprendre.fr/wp-content/uploads/2019/09/.jpg");
  background-repeat: no-repeat;
  background-size: 100%; */
}
a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  border-radius: max;
  padding: 1rem 1rem;
  display: inline-block;
}
a:hover,
a:active,
a.active,
a.router-link-active {
  font-weight: bold;
  color: rgb(221, 127, 142);
  border-color: #ffffff;
  background-color: #1a037e;
}
</style>
