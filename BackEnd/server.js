import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const port = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose.set('strictQuery', true); //disable warning for depracations

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    app.listen(port, (req, res) => {
      console.log(`App is listening to server: ${port}`);
    });
    // console.log(con.connections) //console log the details of the connection
    // console.log('MongoDb Connected')
  })
  .catch((error) => {
    console.log(`Did not connect : ${error}`);
  });

// app.listen(port, (req, res)=>{
//   console.log(`App is listening to port: ${port}`)
// })
