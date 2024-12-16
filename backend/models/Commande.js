const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commandes = new Schema({
  createdAt: { type: String },
  client: { type: Schema.Types.ObjectId, ref: "Client" },
  prixTotal: { type: String },
  feedbackClient: { type: String },
  satisfactionClient: { type: String },
  MoyenPaiement: { type: String },
  produits: [
    {
      produit: {
        type: Schema.Types.ObjectId,
        ref: "Produit",
      },
      quantite: { type: String },
      prix: { type: String }
    }
  ]
});

module.exports = mongoose.model("commandes", commandes);
