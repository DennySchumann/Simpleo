"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("./models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserLogin {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * reads the user from the database, compares the password hashes
     * and generates a JWT if they match
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code and JWT or an error
     */
    login(req, res) {
        const username = req.body.username;
        users_1.default.findOne({ "username": username })
            .then(data => {
            console.log(data['password']);
            bcrypt.compare(req.body.password, data['password'], (err, result) => {
                if (!result) {
                    res.statusCode = 404;
                    res.json({
                        err
                    });
                }
                else {
                    jwt.sign({ _id: data._id }, "abcdefghijklmnopqrstuvwxyz0123456789", { expiresIn: "1d" }, (err, token) => {
                        if (token) {
                            res.statusCode = 200;
                            res.json({
                                token
                            });
                        }
                        else {
                            res.statusCode = 500;
                            res.json({
                                err
                            });
                        }
                    });
                }
            });
        }).catch(err => {
            if (err.name === 'CastError')
                res.statusCode = 404;
            res.json({
                err
            });
        });
    }
    /**
     * includes all URL routes, which can be used
     */
    routes() {
        this.router.post('/', this.login);
    }
}
//export
const userLogin = new UserLogin();
userLogin.routes();
exports.default = userLogin.router;
