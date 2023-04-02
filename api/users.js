/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { createUser, getUserByUsername } = require("../db/users");
const jwt = require('jsonwebtoken');


// POST /api/users/register

router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    if (password.length < 8) {
        next({
            name: "PasswordLengthError",
            message: "Password must be at least 8 characters long"
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
        console.log("USERCHECK", userCheck);
        if(userCheck) {
            next({
                name: "UserExistsError",
                message: "A user with that username already exists"
            });
        }
        
            const user = await createUser({ username, password });
            console.log("USER OBJ", user);
            // const token = jwt.sign({
            //     id: user.id,
            //     username
            // }, process.ENV.JWT_SECRET, {
            //     expiresIn: '1w'
            // });
            // console.log("TOKEN", token);

            // res.send({
            //     message: "Sign up was successful",
            //     token: token,
            //     user: user
            // });
    } catch ({name, message}) {
        next({name, message});
    }


});

// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
