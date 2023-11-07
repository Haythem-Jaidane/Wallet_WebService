import express from 'express';
import mongoose from 'mongoose';

import walletRoute from "./routes/Wallet.js"
import transactionRoute from "./routes/Transaction.js"
import subscriptionRoute from "./routes/Subscription.js"

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'pharmaLink';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());


app.use("/wallet",walletRoute)
app.use("/transaction",transactionRoute)
app.use("/subscription",subscriptionRoute)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});