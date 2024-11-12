const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = new Schema({
  code: { type: String },
  nom: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  etat: { type: String },
});

module.exports = mongoose.model("Categorie", categories);
