const mongoose = require("mongoose");
const { schema } = require("./registration");

const paymentSchema = new mongoose.Schema({
    
})
const Payment = mongoose.model("payment", paymentSchema);
module.exports = Payment;
