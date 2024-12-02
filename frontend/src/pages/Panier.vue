<template>
  <q-page vertical class="q-pa-lg">
    <br />
    <div align="center">
      <h4>
        Gestion des Commandes
      </h4>
    </div>

    <div class="absolute-center">
      <q-scroll-area
        class="myscroll"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
      >
        <q-table
          v-if="Panier && Panier.length > 0"
          :data="Panier"
          row-key="_id"
          grid
          selection="multiple"
          :pagination.sync="pagination"
          :selected.sync="selected"
          hide-header
          hide-pagination
        >
          <template #item="props">
            <q-card
              class="mycard"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card-section
                horizontal
                :class="props.selected ? 'bg-grey-3' : ''"
              >
                <img
                  v-if="props.row.imageUrl"
                  class="myimg"
                  :src="props.row.imageUrl"
                />
                <img v-else class="myimg" src="~assets/manquante.jpg" />
                <q-separator vertical />

                <q-card-section horizontal>
                  <q-list dense class="mylist">
                    <q-item>
                      <q-item-section avatar>
                        <q-item-label caption> Prix </q-item-label>
                      </q-item-section>
                      <q-item-section class="absolute-center">
                        <q-item-label>{{ props.row.prix * Panier[props.pageIndex].quantity }} TND</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-separator horizontal />
                    <q-item>
                      <q-item-section avatar>
                        <q-item-label caption> Nom</q-item-label>
                      </q-item-section>
                      <q-item-section class="absolute-center">
                        <q-item-label>{{ props.row.nom }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-separator horizontal />
                    <q-item>
                      <q-item-section avatar>
                        <q-item-label caption>Categorie</q-item-label>
                      </q-item-section>
                      <q-item-section class="absolute-center">
                        <q-item-label>
                          {{ categories[props.row.categorie] }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator horizontal />
                    <q-item>
                      <q-item-section avatar>
                        <q-item-label caption></q-item-label>
                      </q-item-section>

                      <q-item-section class="absolute-center">
                        <q-item-label
                          ><q-badge
                            :class="
                              props.row.etat === 'Actif'
                                ? 'actifcss'
                                : 'inactifcss'
                            "
                            >{{ props.row.etat }}</q-badge
                          ></q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <q-separator vertical />

                  <!-- <q-item-section>
                    <q-scroll-area
                      class="myscroll2"
                      :thumb-style="thumbStyle"
                      :bar-style="barStyle"
                    >
                      <q-item-section avatar top>
                        <q-item-label
                          style="margin-left:53px;font-weight:bold"
                          caption
                        >
                          Services</q-item-label
                        >
                      </q-item-section>
                      <q-separator horizontal />
                      <span v-for="item in props.row.services" :key="item._id">
                        <span v-if="services[item.service]">
                          <q-checkbox
                            :value="item.checked || false"
                            @input="
                              setServiceCheckedForService(
                                props.pageIndex,
                                item._id,
                                !item.checked
                              )
                            "
                          />

                          <span> {{ services[item.service] }} </span>
                          <span>
                            <q-input
                              dense
                              readonly
                              style="width:150px;"
                              v-model="item.prix"
                              type="number"
                              outlined
                              label="Prix (TND) "
                            >
                              <template v-slot:prepend>
                                <div
                                  class="row items-center all-pointer-events"
                                >
                                  <q-icon
                                    class="q-mr-xs"
                                    color="secondary"
                                    size="16px"
                                    name="attach_money"
                                  />
                                </div>
                              </template>
                            </q-input>
                          </span>
                        </span>
                      </span>
                    </q-scroll-area>
                  </q-item-section> -->

                  <q-separator vertical />
                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Quantité</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-input
                        type="number"
                        min="0"
                        v-model="Panier[props.pageIndex].quantity"
                        style="width:80px;margin-top:20px"
                        outlined
                        dense
                        color="secondary"
                        lazy-rules
                        :rules="[
                          val => (val && val > 0) || 'Champ incorrect !!'
                        ]"
                      />
                    </q-item-section>
                  </q-item>

                  <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn
                        size="12px"
                        flat
                        round
                        style="margin-left:-27px"
                        icon="delete_forever"
                        @click="deleteFromPanier(props.row)"
                        color="red-6"
                      />
                    </div>
                  </q-item-section>
                </q-card-section>
              </q-card-section>
            </q-card>
          </template>
        </q-table>
        <div v-else>
          <div align="center">
            <q-img
              style="width:250px;height:250px"
              src="https://png.pngtree.com/png-vector/20190703/ourmid/pngtree-shopping-bag-icon-in-trendy-style-isolated-background-png-image_1536177.jpg"
            />
          </div>
          <div class="panierVide" align="center">
            <label>
              Vous n'avez encore rien choisi pour votre commande. 
            </label>
          </div>
          <br />
          <div align="center">
            <q-btn
              label="Passer une commande"
              glossy
              icon-right="shopping_bag"
              style="background-color:#F1C90F;color:white;width:320px"
              to="/commander"
            />
          </div>
        </div>
      </q-scroll-area>
      <div v-if="Panier && Panier.length > 0" align="center">
        <q-btn
          glossy
          class="valider"
          size="15px"
          style="width:350px;margin-bottom:-100px"
          icon-right="shopping_cart"
          color="green"
          @click="ValiderCommande()"
          label="Valider la commande"
        />
      </div>
    </div>
    <br />

    <div
      class="fixed-bottom-left, absolute-bottom-left"
      style="margin-bottom:50px; margin-left:40px"
    >
      <h5 v-if="Panier && Panier.length > 0">
        <router-link to="/commander">continuer mes commandes</router-link>
      </h5>
    </div>
    <q-dialog v-model="editDialog" v-if="editDialog">
      <commande-form />
    </q-dialog>
  </q-page>
</template>

<script>
import CommandeForm from "src/components/Forms/CommandeForm.vue";
export default {
  components: { CommandeForm },

  name: "Panier",
  data() {
    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2
      },
      pagination: {
        page: 1,
        rowsPerPage: 100
      },
      selected: [],
      editDialog: false,
      filter: "",
      categories: [],
      // services: [],
      // checkedServices: [],
      Panier: []
    };
  },

  methods: {
    // setServiceCheckedForService(index, serviceId, val) {
    //   this.Panier[index].services = this.Panier[index].services.map(service => {
    //     if (service._id === serviceId) {
    //       service.checked = val;
    //       this.Panier[index].checked = val;
    //     }
    //     return service;
    //   });
    // },

    ValiderCommande() {
      // localStorage.setItem("panier", JSON.stringify(this.Panier));

      // let test = 0;
      // this.Panier.forEach(el => {
      //   if (el.checked) {
      //     test = test + 1;
      //   }
      // });
      // if (test >= this.Panier.length) {
        localStorage.setItem("panier", JSON.stringify(this.Panier));
        this.editDialog = true;
      // } else {
      //   return this.$q.notify({
      //     color: "red",
      //     message: "Sélectionner au moins un service pour chaque produit"
      //   });
      // }
    },
    deleteFromPanier(_id) {
      //  console.log(_id);
      this.Panier.splice(this.Panier.indexOf(_id), 1);
      localStorage.setItem("panier", JSON.stringify(this.Panier));
      window.location.reload(true);
    },
    async getAllCategories() {
      let res = await this.$axios.get("/categorie");
      let categories = {};
      res.data.forEach(el => {
        categories[el._id] = el.nom;
      });
      this.categories = { ...categories };
    },

    // async getAllServices() {
    //   let res = await this.$axios.get("/service");
    //   let services = {};
    //   res.data.forEach(el => {
    //     services[el._id] = el.nom;
    //   });
    //   this.services = { ...services };
    // },

    getPanier() {
      this.Panier = JSON.parse(localStorage.getItem("panier"));
      // return console.log("Panier :", this.Panier);
    }
  },

  async mounted() {
    await this.getPanier();

    await this.getAllCategories();
    // await this.getAllServices();
  }
};
</script>
<style scoped>
.mydiv {
  margin-left: 150px;
  width: 300px;
}
.searchy {
  max-width: 250px;
  border: 1px solid black;
}

h4 {
  font-family: monospace;
  font-size: 2em;
  color: darkblue;
  align-self: center;
  width: 500px;
  padding: 5px;
  letter-spacing: 2px;
  font-weight: bold;
  border: solid 5px darkblue;
}
h5 {
  font-family: monospace;
  font-size: 1.37em;
  margin-top: 0.33em;
  color: #1a037e;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  letter-spacing: 3px;
  font-weight: bold;
}

.priceCard {
  width: 400px;
}
.mycard {
  width: 760px;
  box-shadow: 3 0px 10px rgba(96, 96, 97, 0.39);

  height: 170px;
  margin-right: 20px;
  margin-left: 10px;
  margin-bottom: 20px;
}

.actifcss {
  background-color: green;
  padding-right: 70px;
  padding-left: 70px;
  color: white;
}
.myimg {
  width: 150px;
  margin-left: 15px;
  margin-right: 15px;
  max-height: 150px;
  margin-top: 10px;
}
.mylist {
  width: 210px;
  margin-top: 20px;
}
.myscroll {
  height: 390px;
  width: 800px;
  border: 5px;
  box-shadow: 0 0px 8px rgb(105, 105, 105);
  padding: 0.5rem;
  background-color: #ffffff;
}
.myscroll2 {
  height: 160px;
  width: 170px;
  border: 5px;
  padding: 0.5rem;
  background-color: #ffffff;
}
.total {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: medium;
}
.totalcss {
  font-family: "Times New Roman", Times, serif;
  font-size: small;
  color: gray;
}
.valider:hover {
  transform: translateY(4px);
}
.panierVide {
  font-weight: bold;
  font-size: larger;
  font-family: "Arial Narrow Bold", sans-serif;
}
</style>
