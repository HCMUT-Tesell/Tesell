import express from 'express'
import dotevn from 'dotenv'
import {connectDB} from './config/db.js'
import User from './models/User.model.js';

dotevn.config();

const app = express()
const port = process.env.PORT || 8000

app.use(express.json()) // Allow us to accept JSON data in res.body

app.get('/', (req, res) => {
  res.send('Hello World!')
  // res.send('Hello World! test nodemon')
})

// SAMPLE CREATE USER API, CAN BE DELETED
app.post('/api/users', async (req, res) => {
  const user = req.body;

  if (!user.email || !user.password) {
    return res.status(400).json({
      success: false,
      message: "Please fully provide email and password"
    })
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      data: newUser
    })
  } catch (error) {
    console.error("Error in CreateUser: ", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }
})
// ##########################################################3

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port http://localhost:${port}`)
})


