import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const User = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  fname: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  id_wallet: { type: Number, required: false },
  type    : { type: String, enum: ['Admin', 'Patient', 'Doctor', 'Biologist', 'Delivery man', 'Pharmacist'], required: true },
});

export default model("User",User);