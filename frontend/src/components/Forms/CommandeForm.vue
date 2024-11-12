<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md bg-white text-black" @submit="onAdd()" ref="myForm">
      <br />
      <label class="title2">
        Finaliser la commande
      </label>
      <q-separator style="width:450px;" color="black" />
      <label class="title">
        veuillez vous assurer que les informations de la commande<br />
        sont exactes.
      </label>
      <br />
      <br />
      <br />
      <q-item>
        <q-item-section>
          <label class="title"> Paiement : </label>
        </q-item-section>
        <q-item-section>
          <q-select
            dense
            style="width:250px;margin-left:-120px"
            label="Moyen de paiement"
            outlined
            color="secondary"
            v-model="commande.MoyenPaiement"
            :options="optionsPaiement"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide ']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="account_box"
                />
              </div>
            </template>
          </q-select>
        </q-item-section>
      </q-item>
      <br />
      <q-item>
        <q-item-section>
          <q-input
            style="width:150px;"
            dense
            v-model="avance"
            color="secondary"
            type="number"
            label="Prix d'avance (TND)"
            lazy-rules
            :rules="[
              val => (val >= 0 && val <= this.prixTotal) || 'Valeur incorrect'
            ]"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="monetization_on"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>

        <q-item-section style="margin-left:30px">
          <q-input
            readonly
            style="width:120px;"
            color="secondary"
            hint="Rest à payer"
            dense
            :label="prixRest() + ' TND'"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="monetization_on"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
        <q-item-section>
          <q-input
            readonly
            hint="Prix total"
            style="width:120px;"
            dense
            v-model="commande.prixTotal"
            :label="this.prixTotal + ' TND'"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="money"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <br />

      <br />

      <div>
        <label class="title">
          Choisir le client :
        </label>
        <select v-model="commande.client">
          <option v-for="cl in clients" :key="cl._id" :value="cl._id">
            {{ cl.nom }} {{ cl.prenom }}
          </option>
        </select>
      </div>
      <br />
      <!-- <label class="title"> Livreur : </label>
      <br /> -->
      <!-- <br /> -->
      <!-- <div>
        <label class="title">
          Importer par :
        </label>
        <select v-model="commande.importer_par">
          <option v-for="liv in this.livreurs" :key="liv._id" :value="liv._id">
            {{ liv.nom }} {{ liv.prenom }}
          </option>
        </select>
      </div> -->
      <br />
      <div>
        <label class="title">
          cochez si la commande est avec livraison
        </label>
        <q-checkbox v-model="liv_checked" />
      </div>
      <br />
      <div v-if="liv_checked">
        <label class="title">
          Choisir le livreur :
        </label>
        <select v-model="commande.livrer_par">
          <option v-for="liv in this.livreurs" :key="liv._id" :value="liv._id">
            {{ liv.nom }} {{ liv.prenom }}
          </option>
        </select>
        <br />
        <br />
        <label class="title">
          Livraison express à domicile et gratuite<br />
          La durée du livraison : 2 jours
        </label>
        <br />
        <br />
      </div>

      <br />

      <br />
      <div align="center">
        <q-btn
          label="Confirmer"
          style="margin-right: 15px"
          glossy
          icon-right="add_task"
          type="submit"
          color="secondary"
        />

        <q-btn
          @click="onCancel()"
          label="Annuler"
          style="margin-right: 15px"
          rounded
          v-close-popup
          color="red"
        />
      </div>
    </q-form>
  </q-card>
</template>
<script>
export default {
  data() {
    return {
      // genreOptions: ["Homme", "Femme"],
      // etatLivraison: ["Livrée", "En cours", "Prète"],
      // etatPaiement: ["Payée", "Non Payée"],
      livreurs: [],
      clients: [],
      optionsPaiement: ["Espéces", "Chéque Bancaire", "Carte Bancaire"],
      prixTotal: 0,
      commande: {},
      rest: 0,
      avance: 0,
      prix: 0,
      liv_checked: false,
      produitPanier: {},
      dateLiv: null
    };
  },

  methods: {
    editDate() {
      const current = new Date();
      this.dateLiv = `${current.getFullYear()}-${current.getMonth() +
        1}-${current.getDate() + 2} `;
      return this.dateLiv;
    },
    CalculPrix() {
      let panier = JSON.parse(localStorage.getItem("panier"));
      panier.forEach(element => {
        element.services.forEach(el => {
          if (el.checked) {
            //  console.log("liste prix :", el.prix);
            this.prix = this.prix + parseFloat(el.prix);
          }
        });
        //console.log("liste quantité :", element.quantity);

        this.prix = this.prix * parseInt(element.quantity);
        //console.log("prix :", this.prix);
        this.prixTotal = this.prixTotal + this.prix;
        this.prix = 0;
      });
      //console.log("prix : ", this.prixTotal);
      return this.prixTotal;
    },
    prixRest() {
      return (this.rest = this.prixTotal - this.avance);
    },

    ajoutProd() {
      let comm = [];
      let prix = 0;
      let panier = JSON.parse(localStorage.getItem("panier"));
      panier.forEach(element => {
        let produits = {};
        let commandeServices = [];
        produits.produit = element._id;
        produits.quantite = element.quantity;
        element.services.forEach(el => {
          if (el && el.checked) {
            prix = prix + parseFloat(el.prix);
            commandeServices.push(el.service);
          }
        });
        produits.prix = prix * parseInt(produits.quantite);
        prix = 0;
        produits.services = commandeServices;
        comm.push(produits);
      });
      this.commande.produits = comm;

      this.commande.rest = this.rest;
      this.commande.avance = this.avance;
      this.commande.prixTotal = this.prixTotal;
      this.commande.dateLivraison = this.dateLiv;
      if (this.rest === 0) {
        this.commande.etatPaiement = "Payer";
      } else {
        this.commande.etatPaiement = "Non Payer";
      }
      if (this.commande.livrer_par) {
        this.commande.etatLivraison = "Non Livrer";
      }
    },
    async getAllClients() {
      let res = await this.$axios.get("/client");
      this.clients = res.data;
    },
    async getAllLivreurs() {
      let res = await this.$axios.get("/livreur");
      this.livreurs = res.data;
    },
    async onAdd() {
      this.ajoutProd();
      if (this.commande.client) {
        this.$refs.myForm.validate().then(async success => {
          if (success) {
            let res = await this.$axios.post(`/commande`, {
              ...this.commande
            });
            // window.location.reload(true);
            localStorage.removeItem("panier");
            this.$router.push("/mes-commandes");
            return this.$q.notify({
              color: "green",
              message: "Commande enregistrée avec succées"
            });
            //this.$emit("updated");
          }
        });
      } else {
        return this.$q.notify({
          color: "red",
          message: "Veuillez remplir tous les champs"
        });
      }
    },

    onCancel() {
      this.$emit("closeDialog");
    }
  },
  computed() {
    this.prixRest();
  },
  async mounted() {
    // this.produitPanier = { ...this.panier };
    //   this.prixTotal = { ...this.prix };
    // await console.log("prix total :", this.prix);
    // await console.log("panier:", this.produitPanier);
    await this.editDate();
    await this.getAllClients();
    await this.getAllLivreurs();
    let panier = JSON.parse(localStorage.getItem("panier"));
    // await console.log("panier :", panier);
    await this.CalculPrix();
    //  console.log(this.prixTotal);
  }
};
</script>
<style scoped>
.title {
  color: gray;
  font-family: monospace;
}
.title2 {
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  font-size: large;
}
.mydialog {
  width: 530px;
  padding: 15px;
  height: 650px;
  background-color: white;
}
select {
  width: 230px;
  height: 35px;
  color: rgb(0, 0, 0);
  border: 1px solid #009688;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
}
</style>
