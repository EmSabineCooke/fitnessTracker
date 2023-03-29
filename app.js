require("dotenv").config()
const express = require("express")
const app = express()

const apiRouter = require("./api")
// Setup your Middleware and API Router here

module.exports = app;


app.get('/', (req, res) => {
  res.send(`
  <h1>Fitness Tracker</h1>`)
})

app.get('/api/users/login', (req, res) => {
  res.send(`
<h1>user register<h1/>
<form methood="POST">
<input type="text" name="userName" placeholder="Username" />
<input type="password" name="password" placeholder="password" />
<button type="submit">Submit</button>
</form>
`)
});

app.post("/users/register", (req, res) => {
  res.send(`
  <h1>Login<h1/>
<form methood="POST">
<input type="text" name="userName" placeholder="Username" />
<input type="password" name="password" placeholder="password" />
<input type="password" name="confirmPassword" placeholder="Confirm Password" />
<button type="submit">Submit</button>
</form>
  `)
});

app.get("/health", (req, res) => {
  res.send(`
  <h1>Health</h1>
  `)
});

//must be logged in
app.get("/users/me", (req, res) => {
  res.send(`
  <h1>My Profile</h1>
  `)
});

app.get("/users/:username/routines", (req, res) => {
  res.send(`
  <h1>My Routines</h1>
  `)
});

//activites
app.get("/activities", (req, res) => {
  res.send(`
  <h1>Activities</h1>
  `)
});

//must be logged in
app.post("/activities", () => {
  res.send(`
  `)
});

//patch activities/:activityId

app.get("/activities/:activityId/routines", (req, res) => {
  res.send(`
  <h1>activity id/routines</h1>
  `)
});

//routines

app.get("/routines", (req, res) => {
  res.send(`
  <h1>My Routines</h1>
  `)
});

//must be logged in
app.post("/routines", () => {
  res.send(`
  `)
});

//PATCH /routines/:routineId

//DELETE / routines /: routineId

app.post("/routines/:routineId/activities", () => {
  res.send(`
  `)
});

//routine activities

//PATCH /routine_activities/:routineActivityId
//DELETE /routine_activities/:routineActivityId