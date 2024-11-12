<template>
  <q-page class="q-pa-lg">
    <q-item>
      <q-item-section>
        <h4>Passer votre commande</h4>
      </q-item-section>

      <q-item-section>
        <div align="right">
          <q-input
            class="searchy"
            dense
            v-model="filter"
            placeholder="  Chercher...."
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </q-item-section>
    </q-item>
    <q-separator style="margin-bottom:10px;" color="black" />
    <q-item-section>
      <div align="right">
        <q-btn
          to="/panier"
          dense
          glossy
          style="padding:2px;width:150px;height:35px;margin-right:25px"
          color="secondary"
          icon-right="shopping_cart"
          size="15px"
        >
          Panier
        </q-btn>
      </div>
    </q-item-section>

    <label class="title">
      Filtrer par Catégorie :
    </label>
    <q-table
      :data="cat"
      row-key="_id"
      id="toPrint"
      grid
      selection="single"
      :pagination.sync="paginationCat"
      hide-pagination
      hide-header
    >
      <template #item="props">
        <div>
          <q-list>
            <q-card class="catservcard" @click="changeCatName(props.row.nom)">
              <q-img class="catservcard" :src="props.row.imageUrl">
                <div class="absolute-bottom text-subtitle text-center">
                  {{ props.row.nom }}
                </div>
              </q-img>
            </q-card>
            <div class="row absolute-bottom q-mt-md">
              <q-pagination
                v-model="paginationCat.page"
                color="blue-10"
                class="pagin"
                :max="pagesNumberCat"
                size="sm"
              />
            </div>
          </q-list>
        </div>
      </template>
    </q-table>
    <!-- Categories -->
    <br />

    <!-- Services -->

    <q-table
      :filter="filter"
      :data="produits"
      row-key="_id"
      grid
      selection="multiple"
      :selected.sync="selected"
      :pagination.sync="pagination"
      hide-header
      hide-pagination
    >
      <template #item="props">
        <div
          style="margin:50px;margin-left:30px"
          v-if="categories[props.row.categorie] === catName"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card class="mycard" :class="props.selected ? 'bg-grey-3' : ''">
            <q-list dense>
              <q-card :class="props.selected ? 'bg-grey-3' : ''">
                <q-card-section horizontal>
                  <q-img
                    v-if="props.row.imageUrl"
                    class="image"
                    :src="props.row.imageUrl"
                  >
                    <div class="absolute-bottom text-subtitle text-center">
                      {{ props.row.nom }}
                    </div>
                  </q-img>
                  <q-img v-else class="image" src="~assets/manquante.jpg">
                    <div class="absolute-bottom text-subtitle text-center">
                      {{ props.row.nom }}
                    </div>
                  </q-img>
                </q-card-section>
                <q-separator horizontal />
                <q-btn
                  @click="ajoutPanier(props.row)"
                  size="10.99px"
                  glossy
                  style="width:100%;height:100%"
                  icon-right="add_shopping_cart"
                  color="green"
                  label="Ajouter au panier"
                />
              </q-card>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>

    <br />
    <br />
    <br />
    <br />
    <div class="row absolute-bottom q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="blue-10"
        class="pagin"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </q-page>
</template>
<script>
export default {
  name: "Commander",
  data() {
    return {
      expanded: false,
      pagination: {
        rowsPerPage: 10,
        page: 1
      },
      paginationCat: {
        rowsPerPage: 5,
        page: 1
      },
      // paginationServ: {
      //   rowsPerPage: 3,
      //   page: 1
      // },
      filter: "",
      produits: [],
      categories: [],
      services: [],
      selected: [],
      catName: "Enfant",
      //servName: "Lavage",
      cat: [],
      serv: [],
      panier: [],
      editDialog: false
    };
  },
  methods: {
    ajoutPanier(element) {
      if (JSON.parse(localStorage.getItem("panier"))) {
        this.panier = JSON.parse(localStorage.getItem("panier"));

        // for (let i in this.panier) {
        //   if (element._id === this.panier[i]._id) {
        //     this.ajoutTest = false;
        //   }
        // }
      }
      if (element.etat === "Actif") {
        this.panier.push(element);
        this.panier.forEach(el => {
          el.quantity = 1;
        });

        //  console.log(this.panier);
        localStorage.setItem("panier", JSON.stringify(this.panier));
        return this.$q.notify({
          color: "green",
          message: "Produit ajouté au panier avec succés"
        });
      } else if (element.etat === "Inactif") {
        return this.$q.notify({
          color: "red",
          message: "Produit n'est pas actif pour le moment"
        });
        // } else if (this.ajoutTest === false) {
        //   return this.$q.notify({
        //     color: "red",
        //     message: "Produit déja ajouté"
        //   });
      }
    },
    // changeServName(y) {
    //   this.servName = y;
    // },
    changeCatName(x) {
      this.catName = x;
    },
    async getServices() {
      let res = await this.$axios.get("/service");
      this.serv = res.data;
      //  console.log("Services :", this.serv);
    },
    async getCategories() {
      let res = await this.$axios.get("/categorie");
      this.cat = res.data;
      //  console.log("Categories :", this.cat);
    },
    async getAllCategories() {
      let res = await this.$axios.get("/categorie");
      let categories = {};
      res.data.forEach(el => {
        categories[el._id] = el.nom;
      });
      this.categories = { ...categories };
    },
    async getAll() {
      let res = await this.$axios.get("/produit");
      this.produits = res.data;
      // console.log("Produits :", this.produits);
    },
    async getAllServices() {
      let res = await this.$axios.get("/service");
      let services = {};
      res.data.forEach(el => {
        services[el._id] = el.nom;
      });
      this.services = { ...services };
    },

    getPanier() {
      if (JSON.parse(localStorage.getItem("panier"))) {
        this.panier = JSON.parse(localStorage.getItem("panier"));

        //     this.panier.forEach(el => {
        //       this.QteCmd[el._id] = 1;
        //     });
        //     console.log("qtecmd : ", this.QteCmd);
        //   }
      }
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.produits.length / this.pagination.rowsPerPage);
    },
    // pagesNumberServ() {
    //   return Math.ceil(this.serv.length / this.paginationServ.rowsPerPage);
    // },
    pagesNumberCat() {
      return Math.ceil(this.cat.length / this.paginationCat.rowsPerPage);
    }
  },

  async created() {
    await this.getAllServices();
    await this.getAll();
    await this.getServices();
    await this.getAllCategories();
    await this.getCategories();
    await this.getPanier();
    // await console.log("panier : ", this.panier);
  }
};
</script>
<style scoped>
.image {
  min-width: 180px;
  height: 200px;
}
.restcard {
  width: 200px;
  height: 200px;
}
.mycard {
  width: 200px;
  height: 180px;
  margin-right: 20px;
  margin-top: 70px;
}
.catservcard {
  width: 130px;
  height: 100px;
  margin-right: 20px;
}

.catservcard:hover {
  font-weight: bold;
  border: 3.5px solid #4082c0;
}

.actifcss {
  background-color: green;

  color: white;
}
.inactifcss {
  background-color: red;
  color: white;
}
.searchy {
  max-width: 200px;
  border: solid 1px rgb(224, 224, 224);
}
h4 {
  font-family: monospace;
  font-size: 2em;
  margin-top: 0.5em;
  margin-bottom: 0.15em;
  margin-left: 0;
  margin-right: 0;
  letter-spacing: 3px;
  font-weight: bold;
}
.pagin {
  margin-left: 750px;
  margin-bottom: 20px;
}
.title {
  color: rgb(163, 160, 160);
  font-family: monospace;
}
/* .iconitem {
  color: rgb(5, 100, 5);
}
.iconitem:hover {
  color: rgb(93, 199, 102);
}
.shopicon {
  color: rgb(85, 209, 85);

  background-color: rgb(235, 233, 233);
} */
/* .shopicon:hover {
  color: rgb(93, 199, 102);
  background-color: rgb(231, 255, 231);
} */
</style>
