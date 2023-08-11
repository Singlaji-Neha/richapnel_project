const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  confirmpassword: {
    type: String,
  },
});

const Register = mongoose.model("Register", registerSchema);
module.exports = Register;
