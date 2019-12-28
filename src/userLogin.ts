import {Router, Request, Response, NextFunction} from 'express';
import Users from "./models/users";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class UserLogin {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * reads the user from the database, compares the password hashes
     * and generates a JWT if they match
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code and JWT or an error
     */
    public login(req: Request, res: Response): void {
        const username: String = req.body.username;

        Users.findOne({"username": username})
            .then(data => {
                console.log(data['password']);
                bcrypt.compare(req.body.password, data['password'], (err, result) => {
                    if (!result) {
                        res.statusCode = 404;
                        res.json({
                           err
                        });
                    } else {
                        jwt.sign({_id: data._id}, "abcdefghijklmnopqrstuvwxyz0123456789", {expiresIn: "1d"}, (err, token) => {
                            if(token){
                                res.statusCode = 200;
                                res.json({
                                    token
                                });
                            } else{
                                res.statusCode = 500;
                                res.json({
                                    err
                                });
                            }
                        });
                    }

                });
            }).catch(err => {
            if (err.name === 'CastError') res.statusCode = 404;

            res.json({
                err
            })
        })
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

export default userLogin.router;