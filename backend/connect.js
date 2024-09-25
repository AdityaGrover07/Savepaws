const mongoose = require("mongoose");

const url = process.env.DB_URL;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//const db = mongoose.connection;

const connectDB = async () => {
  try {
    await mongoose
      .connect(url, connectionParams)
      .then(() => {
        console.log("Connected to database ");
      })
      .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
      });
  } catch (e) {
    console.error(`Error : ${e.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };
