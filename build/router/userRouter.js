"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const helper_1 = require("../helper/helper");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * Check token and mark email as verified
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    verifyEmail(req, res) {
        const token = req.params.token;
        const email = req.body.email;
        user_1.default.findOne({ email })
            .then(data => {
            // TODO: check token
            res.json({
                data
            });
        }).catch((err) => {
            if (err.name === 'CastError')
                res.statusCode = 404;
            if (err.name === 'MongoError')
                res.statusCode = 500;
            res.json({
                err
            });
        });
    }
    /**
     * Authenticate user credentials and send generated JWT to the client
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    userLogin(req, res) {
        const unauthenticatedCallback = function (err) {
            if (err) {
                console.log('Error:', err);
            }
            res.statusCode = 401;
            res.json({
                err: 'Email or password wrong!'
            });
        };
        const email = req.body.email;
        user_1.default.findOne({ email })
            .then(data => {
            // @ts-ignore
            helper_1.Helper.verifyPassword(req.body.password, data.password)
                .then(success => {
                if (success) {
                    res.json({
                        _id: data._id,
                        jwt: "Kommt noch."
                    });
                }
                else {
                    unauthenticatedCallback(null);
                }
            }).catch(unauthenticatedCallback);
        }).catch(unauthenticatedCallback);
    }
    /**
     * create one user object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    createUser(req, res) {
        let user = null;
        try {
            user = new user_1.default(req.body);
        }
        catch (e) {
            console.log(e);
        }
        user.save()
            .then((data) => {
            res.status(res.statusCode)
                .send({
                data
            });
        }).catch((err) => {
            if (err.name === 'ValidationError')
                res.statusCode = 400;
            if (err.name === 'MongoError')
                res.statusCode = 500;
            res.status(res.statusCode)
                .send({
                err
            });
        });
    }
    /**
     * update one user object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    updateUser(req, res) {
        const _id = req.params._id;
        // TODO: verify body.password and hash body.new_password if it's present
        user_1.default.findOneAndUpdate({ _id }, req.body)
            .then((data) => {
            res.json({
                data
            });
        }).catch((err) => {
            if (err.name === 'CastError')
                res.statusCode = 404;
            if (err.name === 'MongoError')
                res.statusCode = 500;
            res.json({
                err
            });
        });
    }
    /**
     * delete one user one MongoDB, with the _id in the query
     *
     * @param req: contains an http request, with an header
     * @param res: return an status code or an error
     */
    deleteUser(req, res) {
        const _id = req.params._id;
        user_1.default.findOneAndRemove({ _id }) //field name: value
            .then((data) => {
            res.json({
                data
            });
        }).catch((err) => {
            if (err.name === 'CastError')
                res.statusCode = 404;
            res.json({
                err
            });
        });
    }
    routes() {
        this.router.get('/verify/:token', this.verifyEmail);
        this.router.post('/login', this.userLogin);
        this.router.post('/', this.createUser);
        this.router.put('/:_id', this.updateUser);
        this.router.delete('/:_id', this.deleteUser);
    }
}
//export
const userRoutes = new UserRouter();
userRoutes.routes();
exports.default = userRoutes.router;
