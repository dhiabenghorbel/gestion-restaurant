const express = require("express");
const mongoose = require("mongoose");
//const User = require("../DB/User");
const services = require("../models/Service");
//const user = require("../Api/User");
const route = express.Router();

route.post("/", async (req, res) => {
  try {
    let sameCode = await services.find({ code: req.body.code });
    if (sameCode.length >= 1) {
      return res.status(409).json({
        message: "article deja ajouté",
      });
    }
    const { code, etat, prix, imageUrl, nom } = req.body;
    let Services = {};
    Services.code = code;
    Services.etat = etat;
    Services.prix = prix;
    Services.imageUrl = imageUrl;
    Services.nom = nom;
    let servicesModel = new services(Services);
    await servicesModel.save();
    res.json(servicesModel);
  } catch (err) {
    res.json(err, "err");
  }
});

route.get("/", async (req, res) => {
  const Services = await services.find();
  res.json(Services);
});

route.get("/:id", async (req, res) => {
  const Services = await services.findById({ _id: req.params.id });
  res.json(Services);
});

//supprimer service
route.delete("/delete/:id", async (req, res) => {
  const result = await services.findByIdAndDelete({ _id: req.params.id });
  res.json(result);
});

route.put("/update/:id", async (req, res) => {
  try {
    // let sameCode = await services.find({ code: req.body.code });
    // if (sameCode.length + 1 > 2) {
    //   return res.status(409).json({
    //     message: "code déja utilisé",
    //   });
    // } else {
    const _id = req.params.id;
    const results = await services.findByIdAndUpdate(_id, req.body);
    res.send(results);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = route;
