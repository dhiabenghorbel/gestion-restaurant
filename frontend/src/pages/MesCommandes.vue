<template>
  <q-page class="q-pa-lg">
    <!-- <q-card-section class="bg-primary text-white">-->
    <h4>Liste des commandes</h4>
    <!-- </q-card-section> -->
    <q-separator style="margin-bottom:10px;" color="black" />
    <br />
    <div>
      <q-btn
        glossy
        rounded
        dense
        icon-right="send"
        style="margin-left:30px;padding-left:6px"
        icon="reorder"
        to="/commander"
        class="shadowbutton"
        v-close-popup
        label="Passer une commande"
        color="blue-10"
      />
    </div>
    <br />
    <br />

    <template class="q-pa-md">
      <q-table
        :data="commandes"
        :columns="columns"
        row-key="_id"
        :pagination.sync="pagination"
        :filter="filter"
        title="Liste des commandes"
        separator="cell"
        hide-pagination
        hide-bottom
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="client" :props="props">
              {{ NomClients[props.row.client] }}
              {{ PrenomClients[props.row.client] }}
            </q-td>
            <!-- <q-td key="avance" :props="props">
              {{ props.row.avance }} TND
            </q-td>
            <q-td key="rest" :props="props"> {{ props.row.rest }} TND </q-td> -->
            <q-td key="prixTotal" :props="props"
              >{{ props.row.prixTotal }} TND</q-td
            >
            <q-td key="MoyenPaiement" :props="props">{{
              props.row.MoyenPaiement
            }}</q-td>
            <!-- <q-td key="etatPaiement" :props="props">{{
              props.row.etatPaiement
            }}</q-td> -->
            <q-td key="livrer_par" :props="props"
              >{{ NomLivreurs[props.row.livrer_par] }}
              {{ PrenomLivreurs[props.row.livrer_par] }}
            </q-td>
            <q-td key="etatLivraison" :props="props">{{
              props.row.etatLivraison
            }}</q-td>
            <!-- <q-td key="dateLivraison" :props="props">{{
              props.row.dateLivraison
            }}</q-td> -->
            <q-td key="produits" :props="props"
              ><q-btn
                @click="
                  show_dialog = true;
                  productToShow = props.row.produits;
                "
                color="blue"
                label="voir les produits"
                size="sm"
                no-caps
              >
              </q-btn>
            </q-td>
            <q-td key="facture" :props="props"
              ><q-btn
                color="blue"
                label="imprimer facture"
                size="sm"
                no-caps
                @click="PrintElem(props.row._id)"
              />
            </q-td>
            <q-td key="Action" :props="props"
              ><q-btn
                @click="
                  delete_dialog = true;
                  productToDelete = props.row._id;
                "
                color="red"
                icon-right="delete_forever"
                size="sm"
                no-caps
              />
              <q-btn
                @click="
                  update_dialog = true;
                  productToUpdate = props.row;
                "
                style="margin-left:5px"
                color="green"
                icon="check"
                size="sm"
                no-caps
              />
            </q-td>
            <to-print
              :toPrint="props.row"
              class="print-only"
              :id="props.row._id"
              :key="props.row._id"
            />
          </q-tr>
        </template>
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
        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Aucune commande trouvée... {{ message }}</span>
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

      <div class="row justify-center q-mt-md" style="margin-top:30px">
        <q-pagination
          v-model="pagination.page"
          color="blue-10"
          :max="pagesNumber"
          size="sm"
        />
      </div>
    </template>
    <q-dialog v-model="show_dialog">
      <produits-commande
        :produit="productToShow"
        @closeDialog="show_dialog = false"
      />
    </q-dialog>
    <q-dialog v-model="update_dialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="reorder"
            size="70px"
            color="white"
            text-color="secondary"
          />

          <span class="q-ml-sm"
            >êtes-vous sûr que la commande a été bien livrée ?
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
            icon-right="check"
            @click="updateCommande(productToUpdate)"
            label="Confirmer"
            color="green"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="delete_dialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="reorder"
            size="70px"
            color="white"
            text-color="secondary"
          />

          <span class="q-ml-sm"
            >êtes-vous sûr de vouloir supprimer la commande ?
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
            @click="deleteCommande(productToDelete)"
            label="Supprimer"
            color="red"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import ProduitsCommande from "src/components/ProduitsCommande.vue";

import { exportFile } from "quasar";
import ToPrint from "src/components/ToPrint.vue";

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
  name: "Commandes",
  components: { ProduitsCommande, ToPrint },
  data() {
    return {
      //addShow: false,
      delete_dialog: false,
      // Preview Modal
      productToShow: null,
      productToDelete: null,
      productToUpdate: null,
      show_dialog: false,
      //
      pagination: {
        sortBy: "createdAt",
        page: 1,
        descending: true,
        rowsPerPage: 10
      },
      filter: "",
      selected: [],
      commandes: [],
      NomClients: [],
      PrenomClients: [],
      NomLivreurs: [],
      PrenomLivreurs: [],
      update_dialog: false,
      confirm: false,
      columns: [
        {
          name: "createdAt",
          label: "Date de création",
          align: "center",
          field: "createdAt"
        },
        {
          name: "client",
          label: "Client",
          align: "center",
          field: "client"
        },
        // {
        //   name: "avance",
        //   label: "Prix d'avance",
        //   align: "center",
        //   field: "avance"
        // },
        // {
        //   name: "rest",
        //   field: "rest",
        //   label: "Rest à payer",
        //   align: "center"
        // },
        {
          name: "prixTotal",
          label: "Prix total",
          align: "center",
          field: "prixTotal"
        },
        {
          name: "MoyenPaiement",
          label: "Moyen de paiement",
          align: "center",
          field: "MoyenPaiement"
        },
        // {
        //   name: "etatPaiement",
        //   align: "center",
        //   label: "Etat de paiement",
        //   field: "etatPaiement"
        // },
        {
          name: "livrer_par",
          label: "Livreur",
          align: "center",
          field: "livrer_par"
        },
        {
          name: "etatLivraison",
          label: "Etat de livraison",
          align: "center",
          field: "etatLivraison"
        },
        // {
        //   name: "dateLivraison",
        //   label: "Date de livraison",
        //   align: "center",
        //   field: "dateLivraison"
        // },

        {
          name: "produits",
          label: "Produits commandés",
          align: "center",
          field: "produits"
        },
        {
          name: "facture",
          label: "Facture",
          align: "center",
          field: "facture"
        },
        {
          name: "Action",
          label: "Action",
          align: "center",
          field: "Action"
        }
      ]
    };
  },

  methods: {
    PrintElem(id) {
      var mywindow = window.open("Print", "PRINT", "height=700,width=1300");

      mywindow.document.write(
        "<html><head><title>" + document.title + "</title>"
      );
      mywindow.document.write("</head><body > <br/> <br/>");

      mywindow.document.write(
        "<h1 align='center'>" + "BISTRO-VINTAGE.TN" + "</h1>"
      );

      mywindow.document.write(
        "<h4 align='center'>" +
          "05, Rue du Huron les Berges du Lac" +
          "<br/>" +
          "Tél : 24568974 Fax: 71954681" +
          "<br/>" +
          "Email : bistrovintagetn@gmail.com" +
          "</h4>"
      );
      mywindow.document.write(document.getElementById(id).innerHTML);
      mywindow.document.write(
        "<h1 align='center'>" + "MERCI POUR VOTRE CONFIANCE" + "</h1>"
      );
      mywindow.document.write("</body></html>");

      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/

      mywindow.print();
      mywindow.close();

      return true;
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.commandes.map(row =>
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
    async getAllNomClients() {
      let res = await this.$axios.get("/client");
      let NomClients = {};
      res.data.forEach(el => {
        NomClients[el._id] = el.nom;
      });
      this.NomClients = { ...NomClients };
    },

    async getAllNomLivreurs() {
      let res = await this.$axios.get("/livreur");
      let NomLivreurs = {};
      res.data.forEach(el => {
        NomLivreurs[el._id] = el.nom;
      });
      this.NomLivreurs = { ...NomLivreurs };
    },
    async getAllPrenomClients() {
      let res = await this.$axios.get("/client");
      let PrenomClients = {};
      res.data.forEach(el => {
        PrenomClients[el._id] = el.prenom;
      });
      this.PrenomClients = { ...PrenomClients };
    },

    async getAllPrenomLivreurs() {
      let res = await this.$axios.get("/livreur");
      let PrenomLivreurs = {};
      res.data.forEach(el => {
        PrenomLivreurs[el._id] = el.prenom;
      });
      this.PrenomLivreurs = { ...PrenomLivreurs };
    },
    async getAll() {
      let res = await this.$axios.get("/commande");
      this.commandes = res.data;
    },

    async deleteCommande(id_commande) {
      let res = await this.$axios.delete(`/commande/delete/${id_commande}`);
      if (res.status === 200) {
        return (
          this.$q.notify({
            color: "red",
            message: "Commande Supprimé"
          }),
          await this.getAll()

          // window.location.reload(true)
        );
      }
    },
    async updateCommande(Commandedata) {
      Commandedata.etatLivraison = "Livrée";
      // Commandedata.etatPaiement = "Payée";
      let res = await this.$axios.patch(
        `/commande/update/${Commandedata._id}`,
        {
          ...Commandedata
        }
      );
      return (
        this.$q.notify({
          color: "green",
          message: "Commande confirmer"
        }),
        this.getAll()
        //window.location.reload(true)
      );
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.commandes.length / this.pagination.rowsPerPage);
    }
  },
  watch: {},
  async created() {
    await this.getAll();
    //console.log(this.commandes);

    await this.getAllNomClients();
    await this.getAllNomLivreurs();
    await this.getAllPrenomClients();
    await this.getAllPrenomLivreurs();
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
