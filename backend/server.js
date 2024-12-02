const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDb = require("./DB/DbConnection");
const cors = require("cors");
const app = express();

connectDb();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//app.use(express.json({ extended: false }));
app.use("/api/produit", require("./Api/Produit"));
app.use("/api/categorie", require("./Api/Categorie"));
// app.use("/api/service", require("./Api/Service"));
app.use("/api/client", require("./Api/Client"));
app.use("/api/livreur", require("./Api/Livreur"));
app.use("/api/utilisateur", require("./Api/Utilisateur"));
app.use("/api/commande", require("./Api/Commande"));

//const port = process.env.port || 3000;

app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server started", 5000);
  }
});
