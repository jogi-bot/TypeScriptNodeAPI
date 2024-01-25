import express, { Request, Response } from "express";
import routes from "./routes/index"
import  bodyParser from 'body-parser';
import dotenv from "dotenv";
import  mongoose from "mongoose";

dotenv.config();

const app = express();


app.use(bodyParser.json())
app.use('/api', routes)

const port = process.env.PORT || 3000;




app.listen(port, async() => {
    const connection = await mongoose.connect('mongodb://localhost:27017/config')
  
    
    
    
  console.log(`Server is running at http://localhost:${port}`);
});