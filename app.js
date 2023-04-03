require("dotenv").config()
const morgan = require('morgan');
const express = require("express")
const app = express()
const cors = require('cors');

const apiRouter = require("./api")

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Api router');
  res.end();
})

app.use("/api", apiRouter);

module.exports = app
const PORT = process.env.PORT || 3000;
const apiRouter = require("./api")
app.use("/api", apiRouter)
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.use('/dist', (express.static(path.join(__dirname, 'dist'))));

app.listen(PORT, (err) => {
  if (err) console.log("problem with server")
  console.log("listening on port ${PORT}")
})

app.use((err, req, res, next) => {
  res.send({
    name: err.name,
    message: err.message
  })
})

app.use("/api", apiRouter);

module.exports = app;
