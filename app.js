require("dotenv").config()
const express = require("express")
const app = express()

// Setup your Middleware and API Router here

module.exports = app;

//add middleware and figure out wtf that is
//user
app.get('/users/register', (req, res) => {
  res.send(`
<h1>user register<h1/>
<form methood="POST">
<input type="text" name="userName" placeholder="Username" />
<input type="password" name="password" placeholder="password" />
<button type="submit">Submit</button>
</form>
`)
});

app.post("/users/register", () => {
  res.send(`
  `)
});

app.post("/users/login", () => {
  res.send(`
  `)
});

app.get("/health", () => {
  res.send(`
  `)
});

//must be logged in
app.get("/users/me", () => {
  res.send(`
  `)
});
app.get("/users/:username/routines", () => {
  res.send(`
  `)
});

//activites
app.get("/activities", () => {
  res.send(`
  `)
});

//must be logged in
app.post("/activities", () => {
  res.send(`
  `)
});

//patch activities/:activityId

app.get("/activities/:activityId/routines", () => {
  res.send(`
  `)
});

//routines

app.get("/routines", () => {
  res.send(`
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