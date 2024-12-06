const express = require("express");
const mongoose = require("mongoose");
const commandes = require("../models/Commande");
const route = express.Router();

route.post("/", async (req, res) => {
  const {
    client,
    importer_par,
    livrer_par,
    rest,
    prixTotal,
    etatLivraison,
    MoyenPaiement,
    feedbackClient,
    produits,
  } = req.body;
  let date = new Date()
    .toISOString()
    .replace(/T/, " ") // replace T with a space
    .replace(/\..+/, ""); // delete the dot and everything after

  // var produits = {
  //   produit: req.body.produit,
  //   quantite: req.body.quantite,
  // };
  // var date2 = new Date();
  // var yesterday = date  1000 * 60 * 60 * 24 * 2; // current date's milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
  // yesterday = new Date(yesterday);
  let Commandes = {};
  Commandes.client = client;
  Commandes.importer_par = importer_par;
  Commandes.livrer_par = livrer_par;
  Commandes.rest = rest;
  Commandes.prixTotal = prixTotal;
  Commandes.etatLivraison = etatLivraison;
  Commandes.produits = produits;
  Commandes.MoyenPaiement = MoyenPaiement;
  Commandes.feedbackClient = feedbackClient;
  Commandes.createdAt = date;
  // Commandes.dateLivraison = dateLivraison;
  // .toISOString()
  // .replace(/T/, " ") // replace T with a space
  // .replace(/\..+/, "");

  let commandesModel = new commandes(Commandes);
  await commandesModel.save();
  res.json(commandesModel);
});

route.get("/", async (req, res) => {
  const Commandes = await commandes.find();
  res.json(Commandes);
});
route.patch("/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const Commandes = await commandes.findByIdAndUpdate(_id, req.body);
    res.send(Commandes);
  } catch (err) {
    res.status(400).send(err);
  }
});
route.delete("/delete/:id", async (req, res) => {
  const result = await commandes.findByIdAndDelete({ _id: req.params.id });
  res.json(result);
});
module.exports = route;
