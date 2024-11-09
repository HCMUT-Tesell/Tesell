const express = require('express')
const app = express()
const port = 8000


// Import Router
const router = require('./routes');

// Init Router
router(app);

// Run app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})