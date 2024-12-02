<template>
  <q-card class="mydialog">
    <br />
    <div align="center">
      <label class="title2"> Les produits commandées </label>
    </div>
    <q-separator style="width:550px;" color="black" />
    <br />
    <br />
    <q-table
      :data="produit"
      :columns="columns"
      row-key="_id"
      grid
      hide-header
      hide-pagination
    >
      <template #item="props">
        <q-card class="mycard">
          <q-card-section horizontal>
            <img
              v-if="produitImage[props.row.produit]"
              class="myimg"
              :src="produitImage[props.row.produit]"
            />
            <img v-else class="myimg" src="~assets/manquante.jpg" />
            <q-separator color="white" vertical />
            <q-card-section horizontal>
              <q-list dense class="mylist">
                <!-- <q-item>
                  <q-item-section avatar>
                    <q-item-label caption> Code</q-item-label>
                  </q-item-section>
                  <q-item-section class="absolute-center">
                    <q-item-label>{{ props.row.code }}</q-item-label>
                  </q-item-section>
                </q-item> -->

                <q-item>
                  <q-item-section avatar>
                    <q-item-label caption> Nom</q-item-label>
                  </q-item-section>
                  <q-item-section class="absolute-center">
                    <q-item-label>{{
                      produits[props.row.produit]
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-item-label caption>Categorie</q-item-label>
                  </q-item-section>
                  <q-item-section class="absolute-center">
                    <q-item-label>
                      {{ categories[produitsCategorie[props.row.produit]] }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-item-label caption> Quantité</q-item-label>
                  </q-item-section>
                  <q-item-section class="absolute-center">
                    <q-item-label>{{ props.row.quantite }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-item-label caption> Prix</q-item-label>
                  </q-item-section>
                  <q-item-section class="absolute-center">
                    <q-item-label>{{ props.row.prix }} TND</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <!-- <q-separator vertical /> -->

              <!-- <q-item-section> -->
                <!-- <q-scroll-area
                  class="myscroll2"
                  :thumb-style="thumbStyle"
                  :bar-style="barStyle"
                >
                  <q-item-section avatar top>
                    <q-item-label
                      style="margin-left:30px;font-weight:bold"
                      caption
                    >
                      Services</q-item-label
                    >
                  </q-item-section>
                  <q-separator horizontal style="margin-left:-120px" />

                  <br /> -->
                  <!-- <span v-for="item in props.row.services" :key="item._id">
                    <div align="center">
                      <span> {{ services[item] }} </span>
                    </div>
                  </span> -->
                <!-- </q-scroll-area> -->
              <!-- </q-item-section> -->
            </q-card-section>
          </q-card-section>
        </q-card>
      </template>
    </q-table>
    <br />
    <div align="center">
      <q-btn
        glossy
        dense
        label="Fermer"
        style="width:100px"
        no-caps
        rounded
        color="red"
        @click="closeDialog()"
      />
    </div>
  </q-card>
</template>
<script>
export default {
  props: ["produit"],
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
      produitsCategorie: [],
      produitCommande: [],
      categories: [],
      // services: [],
      produits: [],
      produitImage: [],
      columns: [
        {
          name: "nom",
          label: "Nom",
          align: "center",
          field: "nom"
        },
        {
          name: "code",
          label: "Code",
          align: "center",
          field: "code"
        },
        {
          name: "etat",
          field: "etat",
          label: "Etat",
          align: "center"
        },
        {
          name: "imageUrl",
          label: "imageUrl",
          align: "center",
          field: "imageUrl"
        },

        {
          name: "description",
          align: "center",
          label: "Descriotion",
          field: "description"
        },

        {
          name: "imageUrl",
          label: "imageUrl (g)",
          align: "center",
          field: "imageUrl"
        },
        {
          name: "categorie",
          label: "Categorie",
          align: "center",
          field: "categorie"
        },
        // {
        //   name: "service",
        //   label: "Service",
        //   align: "center",
        //   field: "service"
        // },
        {
          name: "prix",
          label: "Prix",
          align: "center",
          field: "prix"
        }
      ]
    };
  },
  methods: {
    async getAllProducts() {
      let res = await this.$axios.get("/produit");
      let produits = {};
      res.data.forEach(el => {
        produits[el._id] = el.nom;
      });
      this.produits = { ...produits };
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
    async getAllProductsCategorie() {
      let res = await this.$axios.get("/produit");
      let produitsCategorie = {};
      res.data.forEach(el => {
        produitsCategorie[el._id] = el.categorie;
      });
      this.produitsCategorie = { ...produitsCategorie };
    },
    async getAllImageProducts() {
      let res = await this.$axios.get("/produit");
      let produitImage = {};
      res.data.forEach(el => {
        produitImage[el._id] = el.imageUrl;
      });
      this.produitImage = { ...produitImage };
    },
    closeDialog() {
      this.$emit("closeDialog");
    }
  },
  async mounted() {
    //  console.log("produits", this.produit);
    // this.produitCommande = { ...this.produit };
    // console.log(this.produitCommande);
    // await this.getAllServices();
    await this.getAllImageProducts();
    await this.getAllCategories();
    await this.getAllProductsCategorie();
    await this.getAllProducts();
  }
};
</script>

<style scoped>
.mydialog {
  min-width: 600px;
  padding: 20px;
  height: 600px;
  background: white;
}
.mydiv {
  margin-left: 150px;
  width: 300px;
}

h4 {
  font-family: monospace;
  font-size: 2em;
  color: darkblue;
  align-self: center;
  width: 600px;
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
.mycard {
  width: 517px;
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
  margin-left: -10px;
  margin-top: 17px;
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
  width: 120px;
  border: 5px;
  padding: 0.5rem;
  background-color: #ffffff;
}

.closebtn:hover {
  transform: translateY(4px);
}

.title2 {
  font-weight: bold;
  font-size: larger;
  font-family: "Arial Narrow Bold", sans-serif;
}
</style>
