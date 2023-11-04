import express from 'express';
import mongoose from 'mongoose';

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


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});