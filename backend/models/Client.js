const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clients = new Schema({
  createdAt: { type: String },
  nom: { type: String },
  prenom: { type: String },
  genre: { type: String },
  date_naissance: { type: String },
  email: { type: String },
  telephone: { type: String },
  imageUrl: { type: String },
  ville: {
    type: String,
  },
  rue: {
    type: String,
  },
  code_postal: {
    type: String,
  },
  etat: { type: String },
});

module.exports = mongoose.model("clients", clients);
