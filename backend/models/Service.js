const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const services = new Schema({
  code: { type: String, required: true },
  nom: { type: String, required: true },
  prix: { type: String },
  imageUrl: { type: String },
  etat: { type: String, required: true },
});

module.exports = mongoose.model("Service", services);
