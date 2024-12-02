<template>
  <q-page class="q-pa-lg">
    <!-- <q-card-section class="bg-primary text-white">-->
    <h4>Gestion des gérants</h4>
    <q-separator style="margin-bottom:10px;" color="black" />
    <br />

    <div>
      <div>
        <q-btn
          v-if="this.userdata.isAdmin === true"
          glossy
          rounded
          dense
          :disable="selected.length > 0"
          style="margin-left:30px;"
          icon-right="person_add_alt"
          icon="add_circle_outline"
          @click="addUser()"
          v-close-popup
          label="Ajouter un gérant "
          color="blue-10"
          class="shadowbutton"
        ></q-btn>
      </div>
      <div align="right">
        <q-btn
          v-if="userdata.isAdmin === true"
          align="right"
          style="margin-right:30px;background-color:#148F77;color:white"
          size="13px"
          glossy
          icon-right="change_circle"
          label="Modifier"
          @click="EditUser"
          class="transform"
          :disable="!selected.length || selected.length > 1"
        ></q-btn>
        <q-btn
          v-if="this.userdata.isAdmin === true"
          dense
          glossy
          class="transform"
          style="margin-right:25px;"
          label="Changer mot de passe"
          icon-right="password"
          color="yellow-9"
          :disable="!selected.length || selected.length > 1"
          @click="passwordDialog = true"
        />
        <q-btn
          v-if="userdata.isAdmin === true"
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
          <q-avatar
            size="70px"
            icon="no_accounts"
            color="white"
            text-color="secondary"
          />

          <span class="q-ml-sm"
            >êtes-vous sûr de vouloir supprimer le gérant sélectionné ?
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
            @click="deleteUser()"
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
    <div v-if="userdata.isAdmin === true">
      <template class="q-pa-md">
        <q-table
          title="Liste des Gérants"
          :filter="filter"
          separator="cell"
          :data="utilisateurs"
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
              style="margin-right:25px"
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
        </q-table>
        <div class="row justify-center q-mt-md">
          <q-pagination
            v-model="pagination.page"
            color="blue-10"
            :max="pagesNumber"
            size="sm"
          />
        </div>
      </template>
    </div>

    <!--sdsdsdsd-->
    <div v-else>
      <template class="q-pa-md">
        <q-table
          title="Liste des Gérants"
          :filter="filter"
          separator="cell"
          :data="utilisateurs"
          :columns="columns"
          row-key="_id"
          :pagination.sync="pagination"
          hide-pagination
          color="secondary"
        >
          <template v-slot:top-right>
            <q-input
              class="searchy"
              dense
              style="margin-right:25px"
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
        </q-table>
        <div class="row justify-center q-mt-md">
          <q-pagination
            v-model="pagination.page"
            color="blue-10"
            :max="pagesNumber"
            size="sm"
          />
        </div>
      </template>
    </div>

    <q-dialog v-model="editDialog" v-if="editDialog">
      <user-form
        :user="selected[0]"
        @updated="getAll()"
        @closeDialog="editDialog = false"
      />
    </q-dialog>
    <q-dialog v-model="passwordDialog" v-if="passwordDialog">
      <password-change :user="selected[0]" @closeDialog="editDialog = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

import UserForm from "src/components/Forms/UserForm.vue";
import PasswordChange from "src/components/Forms/PasswordChange.vue";

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
  components: { UserForm, PasswordChange },

  name: "Clients",
  data() {
    return {
      editDialog: false,
      confirm: false,
      pagination: {
        sortBy: "createdAt",
        page: 1,
        descending: true,
        rowsPerPage: 8
      },
      filter: "",

      utilisateurs: [],
      selected: [],
      user: [],
      userdata: [],
      gerants: [],
      passwordDialog: false,
      userId: null,
      columns: [
        {
          name: "nom",
          label: "Nom",
          align: "center",
          field: "nom"
        },
        {
          name: "prenom",
          label: "Prénom",
          align: "center",
          field: "prenom"
        },
        {
          name: "date_naissance",
          field: "date_naissance",
          label: "Date de naissance",
          align: "center"
        },
        { name: "genre", label: "Genre", align: "center", field: "genre" },

        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email"
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
          field: "ville"
        },
        { name: "rue", label: "Rue", align: "center", field: "rue" },
        {
          name: "code_postal",
          label: "Code Postal",
          align: "center",
          field: "code_postal"
        },

        {
          name: "telephone",
          label: "Téléphone",
          align: "center",
          field: "telephone"
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
          field: "createdAt"
        }
      ]
    };
  },

  methods: {
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.utilisateurs.map(row =>
            this.columns
              .map(col =>
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
          icon: "warning"
        });
      }
    },

    async getUser() {
      let token = localStorage.getItem("token");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      // console.log("user : ", this.user);
      this.userId = this.user._id;
      //console.log("user id : ", this.userId);
    },
    async getUserData() {
      let res = await this.$axios.get(`/utilisateur/${this.userId}`);
      this.userdata = res.data;
      // console.log(this.userdata);
    },
    async getAll() {
      let res = await this.$axios.get("/utilisateur");
      this.utilisateurs = res.data;
      this.utilisateurs.forEach(element => {
        if (element.email != "administrateur@admin.com") {
          this.gerants.push(element);
        }
      });
      this.utilisateurs = this.gerants;
    },
    addUser() {
      if (this.selected[0]) {
        return this.$q.notify({
          color: "warning",
          message: "utilisateur selected"
        });
      } else {
        //    this.addShow = true;
        this.editDialog = true;
      }
    },
    async deleteUser() {
      let res = await this.$axios.delete(
        `/utilisateur/delete/${this.selected[0]._id}`
      );
      return (
        this.$q.notify({
          color: "red",
          message: "Gérant supprimé"
        }),
        window.location.reload(true)

        // await this.getAll(),
        // (this.selected = [])
      );
    },
    EditUser() {
      this.editDialog = true;
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.utilisateurs.length / this.pagination.rowsPerPage);
    }
  },
  watch: {},
  async mounted() {
    await this.getAll();
    await this.getUser();
    await this.getUserData();
  }
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
<style lang="sass">

.q-table__top,
thead tr:first-child th
  font-size: 15px,
  color: darkblue,
  font: monospace
</style>
