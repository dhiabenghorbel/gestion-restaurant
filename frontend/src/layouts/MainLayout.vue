<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #1a037e" reveal elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="toolbar-title">
          <div>BISTRO VINTAGE</div>
        </q-toolbar-title>
        <!-- <q-btn
          @click="logUserOut()"
          class="butcol"
          rounded
          glossy
          color="red"
          size="9px"
          style="margin-right:35px"
          icon-right="highlight_off"
          label="Déconnecter"
        /> -->
        <q-btn
          to="/panier"
          flat
          dense
          round
          icon="reorder"
          class="iconitem"
          size="16px"
        />
        <q-btn
          to="/Profile"
          flat
          dense
          round
          icon="account_circle"
          class="iconitem"
          size="17px"
        />
        <q-btn
          @click="confirm = true"
          flat
          dense
          round
          icon="logout"
          class="iconitem"
          size="16px"
        />
        <!-- <q-img
            class="absolute-right"
            style="width: 50px"
            src="~assets/l.png"
          /> -->
        <!--<div>Quasar v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>
    <!-- content-class="bg-dark" -->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-style="background-color: rgba(17, 24, 39,1)	"
    >
      <!-- src="https://wallpapercave.com/wp/wp3404275.jpg" -->

      <q-list>
        <div style="margin-left: 160px; margin-top: 20px">
          <q-btn
            @click="confirm = true"
            class="butcol"
            glossy
            rounded
            no-caps
            v-close-popup
            style="width: 115px"
            size="9px"
            icon-right="logout"
            label="Déconnecter"
          />
        </div>
        <q-dialog v-model="confirm">
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="logout" color="white" text-color="red" />

              <span class="q-ml-sm"
                >êtes-vous sûr de vouloir vous déconnecter ?
              </span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                dense
                rounded
                flat
                no-caps
                label="Annuler"
                color="red"
                v-close-popup
              />
              <q-btn
                glossy
                dense
                no-caps
                icon-right="logout"
                @click="logUserOut()"
                label="Deconnecter"
                color="red"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- <q-img
          src="https://image.freepik.com/vecteurs-libre/papier-peint-abstrait-blanc_23-2148808302.jpg"
          style="height: 180px"
        > -->

        <header class="align">
          <q-avatar size="60px" class="q-mb-sm">
            <img
              v-if="this.userdata && this.userdata.imageUrl"
              style="width: 290px"
              :src="this.userdata.imageUrl"
            />
            <q-img v-else src="~assets/nopic.png" />
          </q-avatar>
          <div class="text">{{ this.userdata.nom }}</div>
          <div class="text">{{ this.userdata.prenom }}</div>
          <div class="text">{{ this.userdata.email }}</div>
        </header>
        <!-- <q-item to="/home" aria-label="" class="qtem">
          <template v-slot:>
            <div class="row items-center all-pointer-events">
              <q-icon
                style="margin-right:30px"
                class="q-mr-xs"
                size="27px"
                name="home"
              />
              Acceuil
            </div>
          </template>
        </q-item> -->
        <!-- </q-img> -->
        <!-- <q-item-label header>
          <q-img src="~assets/.png" />
        </q-item-label> -->
        <q-item to="/profile" aria-label="" class="qtem">
          <template v-slot:>
            <div class="row items-center all-pointer-events">
              <q-icon
                style="margin-right: 31px"
                class="q-mr-xs"
                size="27px"
                name="account_circle"
              />
              Profil
            </div>
          </template>
        </q-item>
        <q-item to="/client" aria-label="" class="qtem">
          <template v-slot:>
            <div class="row items-center all-pointer-events">
              <q-icon
                style="margin-right: 31px"
                class="q-mr-xs"
                size="27px"
                name="supervisor_account"
              />
              Gestion des Clients
            </div>
          </template>
        </q-item>
        <q-separator />
        <q-expansion-item
          v-for="link in essentialLinks"
          :key="link.title"
          group="somegroup"
          :icon="link.icon"
          :label="link.title"
          class="qtem"
        >
          <EssentialLink class="qtem" :links="link.links" />
        </q-expansion-item>

        <q-separator />
        <!-- <q-item to="/commander" aria-label="" class="qtem">
          <template v-slot:>
            <div class="row items-center all-pointer-events">
              <q-icon
                style="margin-right:31px"
                class="q-mr-xs"
                size="28px"
                name="assignment"
              />
              Commander
            </div>
          </template>
        </q-item> -->
        <q-item to="/mes-commandes" aria-label="" class="qtem">
          <template v-slot:>
            <div class="row items-center all-pointer-events">
              <q-icon
                style="margin-right: 31px"
                class="q-mr-xs"
                size="28px"
                name="assignment"
              />
              Liste des Commandes
            </div>
          </template>
        </q-item>
      </q-list>

      <footer>
        <q-img class="alignimg" src="~assets/logobistro2.png" />
      </footer>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import VueJwtDecode from "vue-jwt-decode";

const linksData = [
  {
    title: "Les employés",
    caption: "",
    icon: "supervised_user_circle",
    links: [
      {
        link: "/user",
        title: "Gérants",
        caption: "",
        icon: "account_box",
      },
      {
        link: "/livreur",
        title: "Livreurs",
        caption: "",
        icon: "delivery_dining",
      },
      // {
      //   link: "/client",
      //   title: "Clients",
      //   caption: "",
      //   icon: "person"
      // }
    ],
  },
  {
    title: "Menu",
    caption: "",
    icon: "settings",
    links: [
      {
        link: "/produit",
        title: "Produits",
        caption: "",
        icon: "star",
      },
      {
        link: "/categorie",
        title: "Categories",
        caption: "",
        icon: "map",
      },
      // {
      //   link: "/service",
      //   title: "Services",
      //   caption: "",
      //   icon: "local_laundry_service",
      // },
    ],
  },
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      confirm: false,
      user: [],
      userdata: [],
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },

  created() {
    this.getUser();
    this.getUserData();
  },
  methods: {
    async getUserData() {
      let res = await this.$axios.get(`/utilisateur/${this.userId}`);
      this.userdata = res.data;
      // console.log(this.userdata);
    },
    logUserOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("panier");

      this.$router.push("/login");
    },
    // getUserDetails() {
    //   let token = localStorage.getItem("token");
    //   let user = VueJwtDecode.decode(token);
    //   if (user) {
    //     console.log(user);
    //   } else {
    //     console.log("introuvable");
    //   }
    // },
    async getUser() {
      let token = localStorage.getItem("token");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      // console.log(this.user);
      this.userId = this.user._id;
      // console.log(this.userId);
    },
  },
};
</script>
<style scoped>
.menu:hover {
  transform: translateX(-2px);
}
.alignbut {
  position: right;
}
.alignimg {
  position: absolute;
  bottom: 10px;
  margin-left: 45px;
  margin-bottom: 15px;

  width: 70%;
  border: 3px solid #bd3a96;
}
.align {
  padding: 2em 0.5em;
  text-align: center;
}
.toolbar-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 20px;
  letter-spacing: 5px;
  font-weight: bold;
  color: gainsboro;
}
.text {
  /* text-shadow: 0.5px 0 0 #fff, -0.5px 0 0 #fff, 0 0.5px 0 #fff, 0 -0.5px 0 #fff,
    0.5px 0.5px #fff, -0.5px -1px 0 #fff, 1px -1px 0 #fff, -0.5px 0.5px 0 #fff; */
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 14px;
  font-weight: bold;
  color: #e0e0e0e7;
}
.butcol {
  background-color: red;
  border: 1px solid white;
  font-weight: bolder;
  color: white;
}
.butcol:hover {
  /* background-color: black;
  color: red;
  border: 1px solid red;
  font-weight: bolder; */
  transform: translateY(-3px);
}
.qtem {
  color: rgb(180, 179, 179);
  font-size: 15px;
  font-family: monospace;
  background-color: rgba(17, 24, 39, 1);
  position: relative;
  cursor: pointer;
  border-radius: 0 42px 42px 0;
}
.qtem:hover {
  color: rgb(255, 255, 255);
}
.iconitem {
  color: white;
}
.iconitem:hover {
  background-color: #579c8f;
}

.ss {
  color: rgb(248, 242, 242);
  mix-blend-mode: lighten;
}
</style>
