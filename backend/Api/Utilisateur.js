const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
//const User = require("../DB/User");
const utilisateurs = require("../models/Utilisateur");
const config = require("../routes/config");
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
  let date = new Date()
    .toISOString()
    .replace(/T/, " ") // replace T with a space
    .replace(/\..+/, ""); // delete the dot and everything after
  let Users = {};
  Users.nom = nom;
  Users.prenom = prenom;
  Users.genre = genre;
  Users.rue = rue;
  Users.ville = ville;
  Users.date_naissance = date_naissance;
  Users.email = email;
  Users.code_postal = code_postal;
  Users.telephone = telephone;
  Users.imageUrl = imageUrl;
  Users.etat = etat;
  Users.createdAt = date;

  let UsersModel = new utilisateurs(Users);
  await UsersModel.save();
  res.json(UsersModel);
});

//Login
route.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await utilisateurs.findByCredentials(email, password);
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
  //   if (user) {
  //     return res.status(200).json({ succes: "Login " });
  //   } else {
  //     return res.status(200).json({ error: "failed " });
  //   }
  // } catch (error) {
  //   return res
  //     .status(401)
  //     .json({ error: "Login failed! Check authentication credentials" });
  // }
});

route.post("/register", async (req, res) => {
  try {
    let sameEmail = await utilisateurs.find({ email: req.body.email });
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
      isAdmin,
    } = req.body;
    let date = new Date()
      .toISOString()
      .replace(/T/, " ") // replace T with a space
      .replace(/\..+/, ""); // delete the dot and everything after
    await bcrypt.hash(password, 8).then((hashedPassword) => {
      const Utilisateurs = {};
      Utilisateurs.nom = nom;
      Utilisateurs.prenom = prenom;
      Utilisateurs.email = email;
      Utilisateurs.password = hashedPassword;
      Utilisateurs.code_postal = code_postal;
      Utilisateurs.rue = rue;
      Utilisateurs.ville = ville;
      Utilisateurs.genre = genre;
      Utilisateurs.date_naissance = date_naissance;
      Utilisateurs.telephone = telephone;
      Utilisateurs.imageUrl = imageUrl;
      Utilisateurs.etat = etat;
      Utilisateurs.createdAt = date;
      Utilisateurs.isAdmin = true;
      Utilisateurs.isClient = false;
      let utilisateursModel = new utilisateurs(Utilisateurs);
      utilisateursModel.save();
      res.json(utilisateursModel);
    });
  } catch (err) {
    res.json(err, "err");
  }
});

route.post("/register-client", async (req, res) => {
  try {
    let sameEmail = await utilisateurs.find({ email: req.body.email });
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
      .replace(/\..+/, ""); // delete the dot and everything after
    await bcrypt.hash(password, 8).then((hashedPassword) => {
      const Utilisateurs = {};
      Utilisateurs.nom = nom;
      Utilisateurs.prenom = prenom;
      Utilisateurs.email = email;
      Utilisateurs.password = hashedPassword;
      Utilisateurs.code_postal = code_postal;
      Utilisateurs.rue = rue;
      Utilisateurs.ville = ville;
      Utilisateurs.genre = genre;
      Utilisateurs.date_naissance = date_naissance;
      Utilisateurs.telephone = telephone;
      Utilisateurs.imageUrl = imageUrl;
      Utilisateurs.etat = etat;
      Utilisateurs.createdAt = date;
      Utilisateurs.isAdmin = false;
      Utilisateurs.isClient = true;
      let utilisateursModel = new utilisateurs(Utilisateurs);
      utilisateursModel.save();
      res.json(utilisateursModel);
    });
  } catch (err) {
    res.json(err, "err");
  }
});

route.get("/", async (req, res) => {
  const Utilisateurs = await utilisateurs.find();
  console.log(Utilisateurs);
  res.json(Utilisateurs);
});


route.get("/:id", async (req, res) => {
  const Utilisateurs = await utilisateurs.findById({ _id: req.params.id });
  res.json(Utilisateurs);
});

//supprimer client
route.delete("/delete/:id", async (req, res) => {
  const result = await utilisateurs.findByIdAndDelete({ _id: req.params.id });
  res.json(result);
});

route.patch("/update/:id", async (req, res) => {
  // let sameEmail = await utilisateurs.find({ email: req.body.code });
  // if (sameEmail.length >= 2) {
  try {
    const _id = req.params.id;
    const results = await utilisateurs.findByIdAndUpdate(_id, req.body);
    res.send(results);
  } catch (err) {
    res.status(400).send(err);
  }
  // }
});
route.patch("/update-password/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await utilisateurs.findByIdAndUpdate(_id, req.body);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = route;
