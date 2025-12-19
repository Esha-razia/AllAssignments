import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  items: [
    {
      coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coach"
      },
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
