<template>
  <q-page class="q-pa-lg">
    <div>
      <h4>Gestion des services</h4>
    </div>
    <q-separator style="margin-bottom:10px;" color="black" />
    <br />

    <div>
      <div>
        <q-btn
          glossy
          rounded
          dense
          :disable="selected.length > 0"
          style="margin-left:30px;padding-right:10px"
          icon="add_circle_outline"
          @click="addService()"
          v-close-popup
          label="Ajouter un service "
          color="blue-10"
          class="shadowbutton"
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
          @click="EditService()"
          class="transform"
          :disable="!selected.length || selected.length > 1"
        ></q-btn>
        <q-btn
          align="right"
          size="13px"
          glossy
          class="transform"
          rounded
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
            >êtes-vous sûr de vouloir supprimer le service sélectionné ?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn dense rounded flat label="Annuler" color="red" v-close-popup />
          <q-btn
            glossy
            dense
            no-caps
            icon-right="delete_forever"
            @click="deleteService()"
            label="Supprimer"
            color="red"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <br />
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
      :data="services"
      :columns="columns"
      row-key="_id"
      grid
      selection="single"
      :selected.sync="selected"
      :pagination.sync="pagination"
      hide-pagination
      hide-bottom
      hide-header
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

                <q-list>
                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Code</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label>{{ props.row.code }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal />
                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Nom</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label>{{ props.row.nom }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal />

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
                  <!-- <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Prix</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label>{{ props.row.prix }}</q-item-label>
                    </q-item-section>
                  </q-item> -->
                  <q-separator horizontal />
                </q-list>
              </q-card>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>

    <div class="q-pa-md row items-start q-gutter-md"></div>

    <q-dialog v-model="editDialog" v-if="editDialog">
      <service-form
        :service="selected[0]"
        @updated="getAll"
        @closeDialog="editDialog = false"
      />
    </q-dialog>
    <div class="absolute-bottom q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="blue-10"
        class="pagin"
        size="sm"
        :max="pagesNumber"
      />
    </div>
  </q-page>
</template>
<script>
import ServiceForm from "src/components/Forms/ServiceForm.vue";
export default {
  components: { ServiceForm },
  name: "Services",
  data() {
    return {
      pagination: {
        rowsPerPage: 5,
        page: 1
      },
      filter: "",
      //categories: [],
      etatcss: true,
      expanded: false,
      confirm: false,
      services: [],
      selected: [],
      // filter: "",

      columns: [
        {
          name: "_id",
          label: "Id",
          align: "center",
          field: "_id"
        },
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
        }
      ],
      editDialog: false
    };
  },
  methods: {
    async getAll() {
      let res = await this.$axios.get("/service");
      this.services = res.data;
    },
    addService() {
      if (this.selected[0]) {
        return this.$q.notify({
          color: "warning",
          message: "service selected"
        });
      } else {
        this.editDialog = true;
      }
    },
    async deleteService() {
      // await this.selected.forEach(element => {
      //   this.$axios.delete(`/categorie/delete/${element._id}`);
      // });
      let res = await this.$axios.delete(
        `/service/delete/${this.selected[0]._id}`
      );
      return (
        this.$q.notify({
          color: "red",
          message: "Service supprimée"
        }),
        await this.getAll(),
        (this.selected = [])
      );
    },

    EditService() {
      console.log(this.selected);
      if (!this.selected[0]._id) {
        return this.$q.notify({
          color: "warning",
          message: "no Service selected"
        });
      }
      this.editDialog = true;
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.services.length / this.pagination.rowsPerPage);
    }
  },
  watch: {},
  async mounted() {
    await this.getAll();
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
  width: 230px;
  height: 200px;
  margin-right: 20px;
}
.actifcss {
  background-color: green;

  color: white;
}
.inactifcss {
  background-color: red;
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
  margin-bottom: 170px;
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
</style>
