const express = require("express")
const cors = require("cors")
const connectToDb = require("./db/db")
const app = express()
app.use(cors())
connectToDb()
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

