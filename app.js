
require("dotenv").config()
const morgan = require('morgan');
const express = require("express")
const app = express()
const cors = require('cors');
const path = require("path");
const client = require("./db/client")
const apiRouter = require("./api")
const bodyParser = require("body-parser")

// app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.use("/api", apiRouter);
app.use(morgan('dev'));

app.use((err, req, res, next) => {
  res.send({
    name: err.name,
    message: err.message
  })
})

app.use((req, res, next) => {
  res.status(404).send({ message: "Request failed with status code 404" });
});

client.connect()
module.exports = app;
