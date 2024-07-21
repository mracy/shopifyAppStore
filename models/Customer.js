const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  customerId: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  addresses: [
    {
      id: { type: String },
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      province: { type: String },
      country: { type: String },
      zip: { type: String },
      phone: { type: String }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  ordersCount: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  tags: [String],
  note: { type: String, default: "" },
  verifiedEmail: { type: Boolean, default: false },
  acceptsMarketing: { type: Boolean, default: false },
  lastOrderId: { type: Schema.Types.ObjectId, ref: 'Order', default: null },
  lastOrderName: { type: String, default: "" },
  purchasedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
