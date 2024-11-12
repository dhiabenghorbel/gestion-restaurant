<template>
  <q-page class="q-pa-lg">
    <h4>Gestion des produits</h4>
    <q-separator style="margin-bottom:10px;" color="black" />
    <br />

    <div>
      <div>
        <q-btn
          glossy
          rounded
          dense
          class="shadowbutton"
          :disable="selected.length > 0"
          style="margin-left:30px;padding-right:10px"
          icon="add_circle_outline"
          @click="addProduit()"
          v-close-popup
          label="Ajouter un produit "
          color="blue-10"
        ></q-btn>
      </div>
      <div align="right">
        <q-btn
          align="right"
          style="margin-right:30px;background-color:#148F77;color:white"
          size="13px"
          glossy
          icon-right="change_circle"
          label="Modifier"
          class="transform"
          @click="EditProduit()"
          :disable="!selected.length || selected.length > 1"
        ></q-btn>
        <q-btn
          align="right"
          size="13px"
          glossy
          rounded
          class="transform"
          icon="delete_forever"
          v-close-popup
          color="red"
          @click="confirm = true"
          :disable="!selected.length"
        ></q-btn>
      </div>
    </div>
    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_outline" color="white" text-color="red" />

          <span class="q-ml-sm"
            >êtes-vous sûr de vouloir supprimer le produit sélectionné ?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn dense rounded flat label="Annuler" color="red" v-close-popup />
          <q-btn
            glossy
            dense
            no-caps
            icon-right="delete_forever"
            @click="deleteProduit()"
            label="Supprimer"
            color="red"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <br />
    <br />
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
    <br />

    <q-table
      :filter="filter"
      :data="produits"
      :columns="columns"
      row-key="_id"
      grid
      selection="single"
      :selected.sync="selected"
      :pagination.sync="pagination"
      hide-header
      hide-bottom
      hide-pagination
    >
      <template #item="props">
        <div
          style="margin-bottom:250px;margin-left:70px"
          class="mycard"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card class="mycard" :class="props.selected ? 'bg-grey-3' : ''">
            <q-card-section>
              <q-checkbox
                dense
                v-model="props.selected"
                :label="props.row.name"
              />
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-card :class="props.selected ? 'bg-grey-3' : ''">
                <!-- {{ props.row.imageUrl }} -->
                <img
                  v-if="props.row.imageUrl"
                  class="mycard"
                  :src="props.row.imageUrl"
                />
                <img v-else class="mycard" src="~assets/manquante.jpg" />
                <q-separator horizontal />

                <q-list dense>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Code</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label>{{ props.row.code }}</q-item-label>
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
                    <q-scroll-area
                      class="myscr"
                      :thumb-style="thumbStyle"
                      :bar-style="barStyle"
                      :class="props.selected ? 'bg-grey-3' : ''"
                    >
                      <q-item-section style="margin-bottom:-17px;" avatar>
                        <q-item-label caption>Service</q-item-label>
                      </q-item-section>

                      <q-item-section
                        style="margin-left:70px;"
                        v-for="item in props.row.services"
                        :key="item._id"
                      >
                        <span v-if="services[item.service]">
                          <span> {{ services[item.service] }} : </span>
                          <span> {{ item.prix }} TND </span>
                        </span>
                      </q-item-section>
                    </q-scroll-area>
                  </q-item>
                  <q-separator horizontal />

                  <!-- <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Prix</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label
                        >{{ props.row.prix }}
                        <q-space></q-space> Dinars</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal /> -->

                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Etat</q-item-label>
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
                  <!-- <q-separator horizontal />

                  <q-card-actions>
                    <label caption>
                      Description
                    </label>

                    <q-space />

                    <q-btn
                      color="grey"
                      round
                      flat
                      dense
                      :icon="
                        expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                      "
                      @click="expanded = !expanded"
                    />
                  </q-card-actions>
                  <q-slide-transition>
                    <div v-show="expanded">
                      <q-card-section class="text-subitle2">
                        {{ props.row.description }}
                      </q-card-section>
                    </div>
                  </q-slide-transition> -->
                </q-list>
              </q-card>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="editDialog" v-if="editDialog">
      <produit-form
        :produit="selected[0]"
        @updated="getAll"
        @closeDialog="editDialog = false"
      />
    </q-dialog>
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
import ProduitForm from "src/components/Forms/ProduitForm.vue";
export default {
  components: { ProduitForm },
  name: "Produits",
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
      expanded: false,
      pagination: {
        rowsPerPage: 5,
        page: 1
      },
      filter: "",
      produits: [],
      categories: [],
      services: [],
      confirm: false,
      selected: [],
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
        {
          name: "service",
          label: "Service",
          align: "center",
          field: "service"
        },
        {
          name: "prix",
          label: "Prix",
          align: "center",
          field: "prix"
        }
      ],
      editDialog: false
    };
  },
  methods: {
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
      //console.log(this.produits);
    },
    async getAllServices() {
      let res = await this.$axios.get("/service");
      let services = {};
      res.data.forEach(el => {
        services[el._id] = el.nom;
      });
      this.services = { ...services };
    },
    addProduit() {
      if (this.selected[0]) {
        return this.$q.notify({
          color: "warning",
          message: "produit selected"
        });
      } else {
        this.editDialog = true;
      }
    },
    async deleteProduit() {
      // await this.selected.forEach(element => {
      //   this.$axios.delete(`/produit/delete/${element._id}`);
      // });
      let res = await this.$axios.delete(
        `/produit/delete/${this.selected[0]._id}`
      );
      return (
        this.$q.notify({
          color: "red",
          message: "Produit supprimé"
        }),
        await this.getAll(),
        (this.selected = [])
      );
    },
    EditProduit() {
      if (!this.selected[0]._id) {
        return this.$q.notify({
          color: "warning",
          message: "no client selected"
        });
      }
      this.editDialog = true;
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.produits.length / this.pagination.rowsPerPage);
    }
  },
  async created() {
    await this.getAllServices();
    await this.getAll();
    //  await this.getServ();
    await this.getAllCategories();
  }
};

//  async asyncData() {
//   try {
//    let categories = await this.$axios.get("/categorie");
//    let services = await this.$axios.get("/service");
//   const { catResponse, servResponse } = await Promise.all([
//    categories,
//    services
//  ]);
//  console.log(catResponse);

// return {
//   categories: catResponse,
//   services: servResponse
//  };
//  } catch (err) {
//    console.log(err);
//  }
// },
</script>
<style scoped>
.mycard {
  width: 252px;
  height: 220px;
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
  max-width: 250px;
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
  margin-bottom: 30px;
}
.shadowbutton {
  box-shadow: 0 9px #999;
}
.shadowbutton:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.transform:hover {
  transform: translateY(-3px);
}
.myscr {
  height: 36px;
  min-width: 235px;
  background-color: #ffffff;
}
</style>
