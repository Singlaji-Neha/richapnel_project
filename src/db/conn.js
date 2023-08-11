const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dotenv = require("dotenv");

dotenv.config();

const db = process.env.MONGODB_URL;
if (!db) {
  console.error("MONGODB_URL environment variable is not set.");
} else {
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log(`Connected to MongoDB`);
    })
    .catch((err) => {
      console.log(`No Connection ${err}`);
    });
}