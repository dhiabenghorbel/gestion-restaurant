<template>
  <div>
    <div align="right">Date facture :{{ currentDate() }}</div>
    <table align="center">
      <tr v-for="([key, val], i) in Object.entries(toPrint)" :key="i">
        <td align="center" v-if="key === 'client'">
          {{ key }} {{ client.nom }} {{ client.prenom }} <br />
          Adresse : {{ client.rue }}, {{ client.ville }} <br />
          {{ client.email }}
        </td>
        <td align="center" v-if="key === 'createdAt'">
          Date de commande : {{ val }}
        </td>
        <!-- <td align="center" v-if="key === 'dateLivraison'">
          Date de livraison : {{ val }}
        </td> -->
        <td align="center" v-if="key === 'livrer_par'">
          livreur : {{ NomLivreurs[val] }} {{ PrenomLivreurs[val] }}
        </td>
      </tr>
    </table>

    <br />
    <q-table
      align="center"
      style="width:800px"
      :data="toPrint.produits"
      :columns="columns"
      row-key="_id"
      title="Liste des produits"
      separator="cell"
      hide-pagination
      hide-bottom
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="produit" :props="props"
            >{{ produit[props.row.produit] }}
          </q-td>
          <q-td key="categorie" :props="props"
            >{{ categorie[categoryProduct[props.row.produit]] }}
          </q-td>
          <q-td key="quantite" :props="props">{{ props.row.quantite }} </q-td>
          <q-td key="prix" :props="props">{{ props.row.prix }} TND</q-td>
        </q-tr>
      </template>
    </q-table>
    <br />
    <table align="center">
      <tr
        align="center"
        v-for="([key, val], i) in Object.entries(toPrint)"
        :key="i"
      >
        <td v-if="key === 'MoyenPaiement'">
          Moyen de paiement : {{ val }} TND
        </td>

        <!-- <td v-if="key === 'avance'">Prix d'avance : {{ val }} TND</td>
        <td v-if="key === 'rest'">Rest à payer : {{ val }} TND</td> -->
        <td v-if="key === 'prixTotal'">
          Total H.T : {{ parseFloat(val) / 1.19 }} TND
          <br />
          Total T.V.A : {{ parseFloat(val) - parseFloat(val) / 1.19 }} TND
          <br />
          Prix Total : {{ val }} TND
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ["toPrint"],
  data() {
    return {
      NomClients: [],
      NomLivreurs: [],
      PrenomClients: [],
      categoryProduct: [],
      VilleClients: [],
      categorie: [],
      date: null,
      produit: [],
      client: [],
      MailClients: [],
      PrenomLivreurs: [],
      columns: [
        {
          name: "produit",
          label: "produit",
          align: "center",
          field: "produit"
        },
        {
          name: "categorie",
          label: "categorie",
          align: "center",
          field: "categorie"
        },
        {
          name: "quantite",
          label: "quantite",
          align: "center",
          field: "quantite"
        },
        {
          name: "prix",
          label: "prix",
          align: "center",
          field: "prix"
        }
      ]
    };
  },
  methods: {
    currentDate() {
      const current = new Date();
      this.date = `${current.getDate()}-${current.getMonth() +
        1}-${current.getFullYear()} / ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
      return this.date;
    },
    async getClientData() {
      let res = await this.$axios.get(`/utilisateur/${this.toPrint.client}`);
      this.client = res.data;
    },
    // async getAllMailClients() {
    //   let res = await this.$axios.get("/client");
    //   let MailClients = {};
    //   res.data.forEach(el => {
    //     MailClients[el._id] = el.email;
    //   });
    //   this.MailClients = { ...MailClients };
    // },
    // async getAllVilleClients() {
    //   let res = await this.$axios.get("/client");
    //   let VilleClients = {};
    //   res.data.forEach(el => {
    //     VilleClients[el._id] = el.ville;
    //   });
    //   this.VilleClients = { ...VilleClients };
    // },
    // async getAllNomClients() {
    //   let res = await this.$axios.get("/client");
    //   let NomClients = {};
    //   res.data.forEach(el => {
    //     NomClients[el._id] = el.nom;
    //   });
    //   this.NomClients = { ...NomClients };
    // },

    // async getAllNomLivreurs() {
    //   let res = await this.$axios.get("/livreur");
    //   let NomLivreurs = {};
    //   res.data.forEach(el => {
    //     NomLivreurs[el._id] = el.nom;
    //   });
    //   this.NomLivreurs = { ...NomLivreurs };
    // },
    // async getAllPrenomClients() {
    //   let res = await this.$axios.get("/client");
    //   let PrenomClients = {};
    //   res.data.forEach(el => {
    //     PrenomClients[el._id] = el.prenom;
    //   });
    //   this.PrenomClients = { ...PrenomClients };
    // },

    // async getAllPrenomLivreurs() {
    //   let res = await this.$axios.get("/livreur");
    //   let PrenomLivreurs = {};
    //   res.data.forEach(el => {
    //     PrenomLivreurs[el._id] = el.prenom;
    //   });
    //   this.PrenomLivreurs = { ...PrenomLivreurs };
    // },
    async getAllCategorieProduct() {
      let res = await this.$axios.get("/produit");
      let categoryProduct = {};
      res.data.forEach(el => {
        categoryProduct[el._id] = el.categorie;
      });
      this.categoryProduct = { ...categoryProduct };
    },
    async getAllCategorie() {
      let res = await this.$axios.get("/categorie");
      let categorie = {};
      res.data.forEach(el => {
        categorie[el._id] = el.nom;
      });
      this.categorie = { ...categorie };
    },
    async getAllProducts() {
      let res = await this.$axios.get("/produit");
      let produit = {};
      res.data.forEach(el => {
        produit[el._id] = el.nom;
      });
      this.produit = { ...produit };
    }
  },
  async mounted() {
    await this.getClientData();
    // this.getAllNomClients();
    // await this.getAllNomLivreurs();
    // this.getAllPrenomClients();
    // await this.getAllPrenomLivreurs();
    // this.getAllVilleClients();
    // this.getAllMailClients();
    await this.getAllCategorieProduct();
    await this.getAllCategorie();
    await this.getAllProducts();
  }
};
</script>
