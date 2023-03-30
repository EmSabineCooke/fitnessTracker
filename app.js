require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000;

const apiRouter = require("./api")
app.use("/api", apiRouter)
// Setup your Middleware and API Router here

app.get('/', (req, res) => {
  res.send('Api router');
  res.end();
})

app.listen(PORT, (err) => {
  if (err) console.log('problem with server')
  console.log(`listening on port ${PORT}`)
})

app.use(express.json());

module.exports = app;