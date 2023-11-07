import express from 'express';
import mongoose from 'mongoose';

import MedicalEquipment  from './routes/Medical_equipment.js';
import Prescription from './routes/Prescription.js';
import Stock from './routes/Stock.js';
import walletRoute from "./routes/Wallet.js"
import transactionRoute from "./routes/Transaction.js"
import subscriptionRoute from "./routes/Subscription.js"
import MedicalDocuments from './routes/MedicalDocuments.js';
import Notification from './routes/Notification.js';

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'pharmaLink';

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

app.use('/medical_documents', MedicalDocuments);
app.use('/notification', Notification);
app.use('/medical_equipment', MedicalEquipment);
app.use('/prescription', Prescription);
app.use('/stock',Stock);
app.use("/wallet",walletRoute)
app.use("/transaction",transactionRoute)
app.use("/subscription",subscriptionRoute)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
