/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { createUser, getUserByUsername, getUserById } = require("../db/users");
const { getPublicRoutinesByUser, getAllRoutinesByUser } = require("../db/routines");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");


// POST /api/users/register

router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    if (password.length < 8) {
        res.send({
            error: "PasswordTooShort",
            name: "PasswordLengthError",
            message: "Password Too Short!"
        });
    }
    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "You must supply both a username and a password"
        });
    }

    try {
        const userCheck = await getUserByUsername(username);
        if(userCheck) {
            res.send({
                error: "UserDoesNotExist",
                name: "UserDoesNotExistError",
                message: `User ${userCheck.username} is already taken.`
            });
        }
        
            const user = await createUser({ username, password });
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);

            res.send({
                message: "Sign up was successful",
                token: token,
                user: user
            });
    } catch ({name, message}) {
        next({name, message});
    }


});

// POST /api/users/login

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const userCheck = await getUserByUsername(username);
        const passwordMatches = await bcrypt.compare(password, userCheck.password);
        if(passwordMatches) {
            const token = jwt.sign({ id: userCheck.id, username: userCheck.username }, JWT_SECRET);
            res.send({
                message: "you're logged in!",
                token: token,
                user: userCheck
            })
        } else {
            res.send( {message: "Username or password incorrect"});
        }
    } catch (error) {
        next(error);
    }


});

// GET /api/users/me

router.get('/me', async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('authorization');
    if(!auth) {
        res.status(401).send({error: "NotLoggedIn", message: "You must be logged in to perform this action", name: "NotLoggedInError"});
    } else if(auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        const { id } =  jwt.verify(token, JWT_SECRET);
        if (id) {
            try {
                const me = await getUserById(id);
                res.send(me);
            } catch ({name, message}) {
                next({name, message});
            }
    }
}
});

// GET /api/users/:username/routines

router.get('/:username/routines', async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('authorization');
    const { username } = req.params;
    console.log(username);
    if(!auth) {
        const result = await getPublicRoutinesByUser(username);
        res.send(result);
    } else {
        const token = auth.slice(prefix.length);
        const { id } =  jwt.verify(token, JWT_SECRET);
        if(id) {
            const response = await getAllRoutinesByUser(username);
            res.send(response);
        }
    }
})

module.exports = router;
