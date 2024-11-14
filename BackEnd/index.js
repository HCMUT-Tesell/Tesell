import express from 'express'
import dotevn from 'dotenv'
import { connectDB } from './config/db.js'
import userRoute from './routes/user.route.js'

dotevn.config();

const app = express()
const port = process.env.PORT || 8000

app.use(express.json()) // Allow us to accept JSON data in res.body

app.get('/', (req, res) => {
  res.send('Hello World!')
  // res.send('Hello World! test nodemon')
})

app.use("/api/users", userRoute)

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port http://localhost:${port}`)
})


