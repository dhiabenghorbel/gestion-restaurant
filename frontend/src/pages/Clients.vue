<template>
  <q-page class="q-pa-lg">
    <!-- <q-card-section class="bg-primary text-white">-->
    <h4>Gestion des clients</h4>
    <!-- </q-card-section> -->
    <q-separator style="margin-bottom: 10px" color="black" />
    <br />
    <div>
      <!-- <div>
        <q-btn
          glossy
          rounded
          dense
          class="shadowbutton"
          :disable="selected.length > 0"
          style="margin-left: 30px"
          icon-right="person_add_alt"
          icon="add_circle_outline"
          @click="addClient()"
          v-close-popup
          label="Ajouter un client "
          color="blue-10"
        ></q-btn>
      </div> -->
      <div align="right">
        <q-btn
          align="right"
          class="transform"
          style="margin-right: 30px; background-color: #148f77; color: white"
          size="13px"
          glossy
          icon-right="change_circle"
          label="Modifier"
          @click="EditClient()"
          :disable="!selected.length || selected.length > 1"
        ></q-btn>
        <q-btn
          class="transform"
          align="right"
          size="13px"
          glossy
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
          <q-avatar
            icon="no_accounts"
            size="70px"
            color="white"
            text-color="secondary"
          />

          <span class="q-ml-sm"
            >êtes-vous sûr de vouloir supprimer le client sélectionné ?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            dense
            rounded
            flat
            label="Annuler"
            color="red-4"
            v-close-popup
          />
          <q-btn
            glossy
            dense
            no-caps
            icon-right="delete_forever"
            @click="deleteClient()"
            label="Supprimer"
            color="red"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-space />
    <br />

    <br />
    <br />
    <br />
    <template class="q-pa-md">
      <q-table
        :filter="filter"
        title="Liste des clients"
        separator="cell"
        :data="AllClients"
        :columns="columns"
        row-key="_id"
        selection="single"
        :selected.sync="selected"
        :pagination.sync="pagination"
        hide-pagination
        hide-bottom
        color="secondary"
      >
        <template v-slot:top-right>
          <q-input
            class="searchy"
            dense
            style="margin-right: 25px"
            v-model="filter"
            placeholder="  Chercher...."
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            color="primary"
            icon-right="download"
            label=""
            no-caps
            @click="exportTable"
          />
        </template>
        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Well this is sad... {{ message }}</span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>

        <template>
          <q-btn
            color="primary"
            icon-right="download"
            label=""
            no-caps
            @click="exportTable"
          />
        </template>
      </q-table>
      <div class="row justify-center q-mt-md" style="margin-top: 30px">
        <q-pagination
          v-model="pagination.page"
          color="blue-10"
          :max="pagesNumber"
          size="sm"
        />
      </div>
    </template>
    <q-dialog v-model="editDialog" v-if="editDialog">
      <client-form
        :client="selected[0]"
        @updated="getAll"
        @closeDialog="editDialog = false"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import ClientForm from "src/components/Forms/ClientForm.vue";
import { exportFile } from "quasar";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted
    //.split('"').join('""');
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    //.split('\n').join('\\n')
    .split("\r")
    .join("\\r");

  return `"${formatted}"`;
}
export default {
  components: { ClientForm },

  name: "Clients",
  data() {
    return {
      AllClients:{},
      //addShow: false,
      editDialog: false,
      pagination: {
        sortBy: "createdAt",
        page: 1,
        descending: true,
        rowsPerPage: 8,
      },
      filter: "",
      clients: [],
      selected: [],
      confirm: false,
      columns: [
        {
          name: "nom",
          label: "Nom",
          align: "center",
          field: "nom",
        },
        {
          name: "prenom",
          label: "Prénom",
          align: "center",
          field: "prenom",
        },
        {
          name: "date_naissance",
          field: "date_naissance",
          label: "Date de naissance",
          align: "center",
        },
        { name: "genre", label: "Genre", align: "center", field: "genre" },

        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
        },

        // {
        //  name: "imageUrl",
        //  label: "imageUrl (g)",
        //  align: "center",
        //  field: "imageUrl"
        //},
        {
          name: "ville",
          label: "Ville",
          align: "center",
          field: "ville",
        },
        { name: "rue", label: "Rue", align: "center", field: "rue" },
        {
          name: "code_postal",
          label: "Code Postal",
          align: "center",
          field: "code_postal",
        },

        {
          name: "telephone",
          label: "Téléphone",
          align: "center",
          field: "telephone",
        },
        // {
        //   name: "etat",
        //   label: "Etat",
        //   align: "center",
        //   field: "etat"
        // },
        {
          name: "createdAt",
          label: "Date de création",
          align: "center",
          field: "createdAt",
        },
      ],
    };
  },

  methods: {
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.clients.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },

    async getAll() {
      let res = await this.$axios.get("/utilisateur");
      const clients = [];
      this.utilisateurs = res.data;
      this.utilisateurs.forEach((element) => {
        if (element.isClient === true) {
          clients.push(element);
        }
      });
      this.AllClients = clients;
      console.log(this.AllClients);
    },
    // addClient() {
    //   if (this.selected[0]) {
    //     return this.$q.notify({
    //       color: "warning",
    //       message: "client selected",
    //     });
    //   } else {
    //     //    this.addShow = true;
    //     this.editDialog = true;
    //   }
    // },
    async deleteClient() {
      let res = await this.$axios.delete(
        `/utilisateur/delete/${this.selected[0]._id}`
      );
      return (
        this.$q.notify({
          color: "red",
          message: "Client supprimé",
        }),
        await this.getAll(),
        (this.selected = [])
      );
    },
    EditClient() {
      if (!this.selected[0]._id) {
        return this.$q.notify({
          color: "warning",
          message: "no client selected",
        });
      }
      this.editDialog = true;
    },
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.clients.length / this.pagination.rowsPerPage);
    },
  },
  watch: {},
  async mounted() {
    await this.getAll();
  },
};
</script>
<style scoped>
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
.transform:hover {
  transform: translateY(-3px);
}
.shadowbutton {
  box-shadow: 0 9px #999;
}
.shadowbutton:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
<style lang="sass">

.q-table__top,
thead tr:first-child th
  font-size: 15px,
  color: darkblue,
  font: monospace
</style>
