const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const produits = require("../models/Produit");
const route = express.Router();

//ajouter un produit
route.post("/", async (req, res) => {
  try {
    let sameCode = await produits.find({ code: req.body.code });
    if (sameCode.length >= 1) {
      return res.status(409).json({
        message: "article deja ajouté",
      });
    }
    try {
      let Produit = new produits();
      Produit.code = req.body.code;
      Produit.nom = req.body.nom;
      Produit.description = req.body.description;
      Produit.imageUrl = req.body.imageUrl;
      Produit.etat = req.body.etat;
      // Produit.prix = req.body.prix;
      Produit.categorie = req.body.categorie;
      Produit.services = req.body.services;

      await Produit.save();

      res.json(Produit);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  } catch (err) {
    res.json(err, "err");
  }
});

// lister tous
route.get("/", async (req, res) => {
  const Produits = await produits.find();
  res.json(Produits);
});

//supprimer produit
route.delete("/delete/:id", async (req, res) => {
  const result = await produits.findByIdAndDelete({ _id: req.params.id });
  res.json(result);
});

// lister un produit par id
route.get("/:id", async (req, res) => {
  const Produits = await produits.findById({ _id: req.params.id });
  res.json(Produits);
});

//route.patch("/update/:id", async (req, res) => {
//try {
//const id = req.params.id;
//const updates = req.body;
//const result = await produits.findByIdAndUpdate(id, updates);
//res.send(result);
//res.json(produits);
//} catch (err) {
// console.log(err);
//}
//});
route.patch("/update/:id", async (req, res) => {
  try {
    // let sameCode = await produits.find({ code: req.body.code });
    // if (sameCode.length >= 1) {
    //   return res.status(409).json({
    //     message: "code déja utilisé",
    //   });
    // } else {
    const _id = req.params.id;
    const results = await produits.findByIdAndUpdate(_id, req.body);
    res.send(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = route;
