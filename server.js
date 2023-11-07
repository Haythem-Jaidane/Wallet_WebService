import express from 'express';
import mongoose from 'mongoose';
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


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
