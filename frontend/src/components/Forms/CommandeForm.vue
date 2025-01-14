<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md bg-white text-black" @submit="onAdd()" ref="myForm">
      <br />
      <label class="title2"> Finaliser la commande </label>
      <q-separator style="width: 450px" color="black" />
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
            style="width: 250px; margin-left: -120px"
            label="Moyen de paiement"
            outlined
            color="secondary"
            v-model="commande.MoyenPaiement"
            :options="optionsPaiement"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Champ vide ']"
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
        <!-- <q-item-section>
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
        </q-item-section> -->
        <label class="title"> Prix à payer : </label>
        <q-item-section>
          <q-input
            readonly
            hint="Prix total"
            style="width: 220px; margin-left: 20px; margin-top: -15px"
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

      <div  v-if="this.userdata.isAdmin">
        <label class="title"> Choisir le client : </label>
        <select v-model="commande.client">
          <option v-for="cl in clients" :key="cl._id" :value="cl._id">
            {{ cl.nom }} {{ cl.prenom }}
          </option>
        </select>
      </div>
      <br />
      <br />
      <!-- <div>
        <label class="title"> cochez si la commande est avec livraison ! </label>
        <q-checkbox v-model="liv_checked" />
      </div> -->
      <br />
      <!-- <div v-if="liv_checked">
        <label class="title"> Choisir le livreur : </label>
        <select v-model="commande.livrer_par">
          <option v-for="liv in this.livreurs" :key="liv._id" :value="liv._id">
            {{ liv.nom }} {{ liv.prenom }}
          </option>
        </select>
        <br />
        <br />
        <br />
      </div> -->
      <div>
        <label class="title"> cochez si vous voulez donner votre avis ! </label>
        <q-checkbox v-model="feedback_checked" />
      </div>
      <br />
      <div v-if="feedback_checked">
        <label class="title"> vous etes satisfait ? </label>
        <q-btn
          @click="addSatisfaction('satisfied')"
          style="margin-right: 15px;margin-left: 10px"
          glossy
          icon="sentiment_very_satisfied"
          :color="this.satisfactionClient === 'satisfied' ? 'green' : 'grey'"
          />
        <q-btn
          @click="addSatisfaction('neutral')"
          style="margin-right: 15px"
          glossy
          icon="sentiment_neutral"
          :color="this.satisfactionClient === 'neutral' ? 'yellow' : 'grey'"
          />
        <q-btn
          @click="addSatisfaction('dissatisfied')"
          style="margin-right: 10px"
          glossy
          icon="sentiment_very_dissatisfied"
          :color="this.satisfactionClient === 'dissatisfied' ? 'red' : 'grey'"
          />
        <q-input
          filled
          type="textarea"
          outlined
          color="grey-8"
          class="q-my-md"
          label="Entrez votre feedback ici"
          v-model="feedbackText"
          style="width: 400px"
        />
      </div>
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
import VueJwtDecode from "vue-jwt-decode";
export default {
  data() {
    return {
      satisfactionClient: 'neutral',
      clients: [],
      optionsPaiement: ["Espéces", "Chéque Bancaire", "Carte Bancaire"],
      prixTotal: 0,
      commande: {},
      userdata: [],
      userId:null,
      feedbackText:null,
      prix: 0,
      // liv_checked: false,
      feedback_checked: false,
      produitPanier: {},
      // dateLiv: null,
    };
  },

  methods: {
    async getUser() {
      let token = localStorage.getItem("token");
      let decoded = VueJwtDecode.decode(token);
      let user = decoded;
      // console.log(this.user);
      this.userId =  user._id;
      // console.log(this.userId);
    },
    async getUserData() {
      let res = await this.$axios.get(`/utilisateur/${this.userId}`);
      this.userdata = res.data;
    },
    editDate() {
      const current = new Date();
      this.dateLiv = `${current.getFullYear()}-${current.getMonth() + 1}-${
        current.getDate() + 2
      } `;
      return this.dateLiv;
    },
    CalculPrix() {
      let panier = JSON.parse(localStorage.getItem("panier"));
      panier.forEach((element) => {
        this.prix =
          this.prix + parseFloat(element.prix) * parseInt(element.quantity);
      });
      // this.prix = this.prix * parseInt(element.quantity);
      this.prixTotal = this.prix;
      this.prix = 0;
      //console.log("prix : ", this.prixTotal);
      return this.prixTotal;
    },
    // prixRest() {
    //   return (this.rest = this.prixTotal - this.avance);
    // },

    ajoutProd() {
      let comm = [];
      let prix = 0;
      let panier = JSON.parse(localStorage.getItem("panier"));
      panier.forEach((element) => {
        let produits = {};
        produits.produit = element._id;
        produits.quantite = element.quantity;
        produits.prix = element.prix;
        prix = 0;
        comm.push(produits);
      });
      if(this.userdata.isClient) {
        this.commande.client = this.userdata ;
      }
      this.commande.produits = comm;
      this.commande.prixTotal = this.prixTotal;
      this.commande.feedbackClient = this.feedbackText;
      this.commande.satisfactionClient = this.satisfactionClient;
    },
    async getAllClients() {
      let res = await this.$axios.get("/utilisateur");
      this.clients = res.data;
    },
    async onAdd() {
      let isClient = false;
      if (this.userdata.isClient) {
        isClient = true;
      }
      this.ajoutProd();
      if (isClient || this.commande.client) {
        this.$refs.myForm.validate().then(async (success) => {
          if (success) {
            let res = await this.$axios.post(`/commande`, {
              ...this.commande,
            });
            // window.location.reload(true);
            localStorage.removeItem("panier");
            this.$router.push("/mes-commandes");
            return this.$q.notify({
              color: "green",
              message: "Commande enregistrée avec succées",
            });
            //this.$emit("updated");
          }
        });
      } else {
        return this.$q.notify({
          color: "red",
          message: "Veuillez remplir tous les champs",
        });
      }
    },

    onCancel() {
      this.$emit("closeDialog");
    },
    addSatisfaction(satisfaction) {
      this.satisfactionClient = satisfaction;
    }
  },
  computed() {
    this.prixRest();
  },
  async mounted() {
    // this.produitPanier = { ...this.panier };
    //   this.prixTotal = { ...this.prix };
    await this.editDate();
    await this.getAllClients();
    await this.getUser();
    await this.getUserData();
    await this.CalculPrix();
  },
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
