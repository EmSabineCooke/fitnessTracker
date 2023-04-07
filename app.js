require("dotenv").config()
const morgan = require('morgan');
const express = require("express")
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const path = require("path"); 

const apiRouter = require("./api")

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Api router');
  res.end();
})

app.use("/api", apiRouter);

module.exports = app
app.use("/api", apiRouter)
app.use(morgan('dev'));
app.use(express.json());

// Setup your Middleware and API Router here

app.use('/dist', (express.static(path.join(__dirname, 'dist'))));

app.use((err, req, res, next) => {
  res.send({
    name: err.name,
    message: err.message
  })
})

app.use("/api", apiRouter);

app.use((req, res, next) => {
  res.status(404).send({message: "Request failed with status code 404"});
});

module.exports = app;
