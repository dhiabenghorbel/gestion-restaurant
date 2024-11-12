const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//const livreur = require("../DB/livreur");
const livreurs = require("../models/Livreur");
const config = require("../routes/config");
//const livreur = require("../Api/livreur");
const route = express.Router();

route.post("/", async (req, res) => {
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
  let datee = new Date()
    .toISOString()
    .replace(/T/, " ") // replace T with a space
    .replace(/\..+/, ""); // delete the dot and everything after
  let Livreurs = {};
  Livreurs.nom = nom;
  Livreurs.prenom = prenom;
  Livreurs.genre = genre;
  Livreurs.rue = rue;
  Livreurs.ville = ville;
  Livreurs.date_naissance = date_naissance;
  Livreurs.email = email;
  Livreurs.code_postal = code_postal;
  Livreurs.telephone = telephone;
  Livreurs.imageUrl = imageUrl;
  Livreurs.etat = etat;
  Livreurs.createdAt = datee;

  let LivreursModel = new livreurs(Livreurs);
  await LivreursModel.save();
  res.json(LivreursModel);
});
// register livreur
route.post("/register", async (req, res) => {
  try {
    let sameEmail = await livreurs.find({ email: req.body.email });
    if (sameEmail.length >= 1) {
      return res.status(409).json({
        message: "email already in use",
      });
    }
    const {
      nom,
      prenom,
      genre,
      email,
      password,
      date_naissance,
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
      .replace(/\..+/, "");
    await bcrypt.hash(password, 8).then((hashedPassword) => {
      const Livreurs = {};
      Livreurs.nom = nom;
      Livreurs.prenom = prenom;
      Livreurs.genre = genre;
      Livreurs.password = hashedPassword;
      Livreurs.email = email;
      Livreurs.date_naissance = date_naissance;
      Livreurs.rue = rue;
      Livreurs.ville = ville;
      Livreurs.code_postal = code_postal;
      Livreurs.telephone = telephone;
      Livreurs.imageUrl = imageUrl;
      Livreurs.etat = etat;
      Livreurs.createdAt = date;

      let livreursModel = new livreurs(Livreurs);
      livreursModel.save();
      res.json(livreursModel);
    });
  } catch (err) {
    res.json(err, "err");
  }
});

//login livreur
route.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await livreurs.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
});
//read all livreurs

route.get("/", async (req, res) => {
  const Livreurs = await livreurs.find();
  res.json(Livreurs);
});

route.get("/:id", async (req, res) => {
  const Livreurs = await livreurs.findById({ _id: req.params.id });
  res.json(Livreurs);
});

//supprimer livreur
route.delete("/delete/:id", async (req, res) => {
  const result = await livreurs.findByIdAndDelete({ _id: req.params.id });
  res.json(result);
});

//update livreur
route.patch("/update/:id", async (req, res) => {
  // let sameEmail = await livreurs.find({ email: req.body.code });
  // if (sameEmail.length >= 2) {
  try {
    const _id = req.params.id;
    const results = await livreurs.findByIdAndUpdate(_id, req.body);
    res.send(results);
  } catch (err) {
    res.status(400).send(err);
  }
  // }
});
route.patch("/update-profil/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const Livreurs = await livreurs.findByIdAndUpdate(_id, req.body);
    res.send(Livreurs);
  } catch (err) {
    res.status(400).send(err);
  }
});

route.patch("/update-password/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const Livreurs = await livreurs.findByIdAndUpdate(_id, req.body);
    res.send(Livreurs);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = route;
