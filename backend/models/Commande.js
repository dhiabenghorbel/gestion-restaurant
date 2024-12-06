const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commandes = new Schema({
  createdAt: { type: String },
  client: { type: Schema.Types.ObjectId, ref: "Client" },
  importer_par: { type: Schema.Types.ObjectId, ref: "Livreur" },
  livrer_par: { type: Schema.Types.ObjectId, ref: "Livreur" },
  prixTotal: { type: String },
  etatLivraison: { type: String },
  feedbackClient: { type: String },
  MoyenPaiement: { type: String },
  produits: [
    {
      produit: {
        type: Schema.Types.ObjectId,
        ref: "Produit",
      },
      quantite: { type: String },
      // services: [
      //   {
      //     type: Schema.Types.ObjectId,
      //     ref: "Service",
      //   },
      // ],
      prix: { type: String },
    },
  ],
});

module.exports = mongoose.model("commandes", commandes);
