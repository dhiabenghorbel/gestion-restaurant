const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../routes/config");

const utilisateurs = new Schema({
  createdAt: { type: String },
  nom: { type: String },
  prenom: { type: String },
  email: { type: String },
  password: { type: String },
  genre: { type: String },
  date_naissance: { type: String },
  telephone: { type: String },
  imageUrl: { type: String },
  ville: { type: String },
  rue: { type: String },
  code_postal: { type: String },
  etat: { type: String },
  isAdmin: { type: Boolean },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

utilisateurs.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id, email: user.email }, config.secret);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

utilisateurs.statics.findByCredentials = async (email, password) => {
  const user = await Utilisateurs.findOne({ email });
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!user || !isPasswordMatch) {
    console.log("err");
  } else if (user && isPasswordMatch) {
    return user;
  }
};
module.exports = Utilisateurs = mongoose.model("Utilisateurs", utilisateurs);
