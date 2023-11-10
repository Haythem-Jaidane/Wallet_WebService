import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";

import MedicalEquipment  from './routes/Medical_equipment.js';
import Prescription from './routes/Prescription.js';
import Stock from './routes/Stock.js';
import walletRoute from "./routes/Wallet.js"
import transactionRoute from "./routes/Transaction.js"
import subscriptionRoute from "./routes/Subscription.js"
import MedicalDocuments from './routes/MedicalDocuments.js';
import Notification from './routes/Notification.js';
import UserRoute from './routes/User.js';

dotenv.config();

const app = express();

const port = process.env.PORT;
const databaseName = process.env.DATABASE_NAME;
const host = process.env.HOST

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());
/*app.use(express.urlencoded({ extended: false }));*/
app.use(cors());

app.use('/medical_documents', MedicalDocuments);
app.use('/notification', Notification);
app.use('/medical_equipment', MedicalEquipment);
app.use('/prescription', Prescription);
app.use('/stock',Stock);
app.use("/wallet",walletRoute)
app.use("/transaction",transactionRoute)
app.use("/subscription",subscriptionRoute)
app.use("/users",UserRoute)

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
