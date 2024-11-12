const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const produits = new Schema({
  categorie: {
    type: Schema.Types.ObjectId,
    ref: "Categorie",
  },
  // service: [
  //   {
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Service",
  //   },
  //   {
  //     type: String,
  //   },
  // },
  // ],
  services: [
    {
      service: {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
      prix: { type: String },
    },
  ],

  code: { type: String },
  nom: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  etat: { type: String },
  //prix: { type: String },
});

module.exports = mongoose.model("Produit", produits);
