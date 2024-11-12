const express = require("express");
const mongoose = require("mongoose");
const clients = require("../models/Client");
const route = express.Router();

route.post("/", async (req, res) => {
  try {
    let sameEmail = await clients.find({ email: req.body.email });
    if (sameEmail.length >= 1) {
      return res.status(409).json({
        message: "email already in use",
      });
    }
    const {
      nom,
      prenom,
      genre,
      date_naissance,
      email,
      rue,
      ville,
      code_postal,
      telephone,
      imageUrl,
      etat,
    } = req.body;
    let date = new Date()
      .toISOString()
      .replace(/T/, " ") // replace T with a space
      .replace(/\..+/, ""); // delete the dot and everything after
    let Clients = {};
    Clients.nom = nom;
    Clients.prenom = prenom;
    Clients.genre = genre;
    Clients.rue = rue;
    Clients.ville = ville;
    Clients.date_naissance = date_naissance;
    Clients.email = email;
    Clients.code_postal = code_postal;
    Clients.telephone = telephone;
    Clients.imageUrl = imageUrl;
    Clients.etat = etat;
    Clients.createdAt = date;

    let clientsModel = new clients(Clients);
    await clientsModel.save();
    res.json(clientsModel);
  } catch (err) {
    res.json(err, "err");
  }
});

route.get("/", async (req, res) => {
  const Clients = await clients.find();
  res.json(Clients);
});

route.get("/:id", async (req, res) => {
  const Clients = await clients.findById({ _id: req.params.id });
  res.json(Clients);
});

//supprimer client
route.delete("/delete/:id", async (req, res) => {
  const result = await clients.findByIdAndDelete({ _id: req.params.id });
  res.json(result);
});

route.patch("/update/:id", async (req, res) => {
  // let sameEmail = await clients.find({ email: req.body.code });
  // if (sameEmail.length >= 2) {
  try {
    const _id = req.params.id;
    const results = await clients.findByIdAndUpdate(_id, req.body);
    res.send(results);
  } catch (err) {
    res.status(400).send(err);
  }
  // }
});
module.exports = route;
