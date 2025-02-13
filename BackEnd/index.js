import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';

import initRouter from './routes/index.js';


dotenv.config();
const app = express()
const port = process.env.PORT || 8000
//Middleware
app.use(express.json()) // Allow us to accept JSON data in res.body
app.use(cors());
app.use(express.urlencoded({ extended: true }));  // Xử lý dữ liệu URL encoded
app.use(bodyParser.json());


// init Router
initRouter(app);

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello world, im testing Jenkins')
})



