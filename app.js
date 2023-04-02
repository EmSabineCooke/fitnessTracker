require("dotenv").config()
const express = require("express")
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 4000;

const apiRouter = require("./api")

app.use(cors());
app.use(express.json());


// Setup your Middleware and API Router here

app.get('/', (req, res) => {
  res.send('Api router');
  res.end();
})

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// })

app.use("/api", apiRouter);

module.exports = app