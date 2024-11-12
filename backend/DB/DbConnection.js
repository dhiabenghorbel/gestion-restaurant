const mongoose = require("mongoose");
const URI = "mongodb+srv://dhiabenghorbel97:jJEKf1ylccoD82hb@dbproject.hndnanr.mongodb.net/store?retryWrites=true&w=majority";
 const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
module.exports = connectDb;
