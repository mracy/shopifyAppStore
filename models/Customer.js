const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  customerId: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  addresses: [
    {
      id: String,
      address1: String,
      address2: String,
      city: String,
      province: String,
      country: String,
      zip: String,
      phone: String,
      _id: Schema.Types.ObjectId
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  ordersCount: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  tags: [String],
  note: String,
  verifiedEmail: { type: Boolean, default: false },
  acceptsMarketing: { type: Boolean, default: false },
  lastOrderId: String,
  lastOrderName: String,
  purchasedProducts: [String],
  __v: { type: Number, select: false }
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
