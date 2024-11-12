const express = require("express");
const mongoose = require("mongoose");
//const User = require("../DB/User");
const categories = require("../models/Categorie");
//const user = require("../Api/User");
const route = express.Router();

route.post("/", async (req, res) => {
  try {
    let sameCode = await categories.find({ code: req.body.code });
    if (sameCode.length >= 1) {
      return res.status(409).json({
        message: "article deja ajouté",
      });
    }
    const { code, etat, description, imageUrl, nom } = req.body;
    let Categories = {};
    Categories.code = code;
    Categories.etat = etat;
    Categories.description = description;
    Categories.imageUrl = imageUrl;
    Categories.nom = nom;
    let categoriesModel = new categories(Categories);
    await categoriesModel.save();
    res.json(categoriesModel);
  } catch (err) {
    res.json(err, "err");
  }
});

route.get("/", async (req, res) => {
  const Categories = await categories.find();
  res.json(Categories);
});

route.get("/:id", async (req, res) => {
  const Categories = await categories.findById({ _id: req.params.id });
  res.json(Categories);
});

//supprimer categorie
route.delete("/delete/:id", async (req, res) => {
  const result = await categories.findByIdAndDelete({ _id: req.params.id });
  res.json(result);
});

route.patch("/update/:id", async (req, res) => {
  try {
    // let sameCode = await categories.find({ code: req.body.code });
    // if (sameCode.length >= 1) {
    //   return res.status(409).json({
    //     message: "code déja utilisé",
    //   });
    // } else {
    const _id = req.params.id;
    const results = await categories.findByIdAndUpdate(_id, req.body);
    res.send(results);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = route;
