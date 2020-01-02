import {Router, Request, Response} from 'express';
import User from '../models/user';
import {Helper} from '../helper/helper';

class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * Check token and mark email as verified
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public verifyEmail(req: Request, res: Response): void {
        const token: String = req.params.token;
        const email: String = req.body.email;

        User.findOne({ email })
            .then(data => {
                // TODO: check token
                res.json({
                    data
                });
            }).catch((err) => {
                if (err.name === 'CastError') res.statusCode = 404;
                if (err.name === 'MongoError') res.statusCode = 500;
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
    public userLogin(req: Request, res: Response): void {
        const unauthenticatedCallback = function(err) {
            if(err) {
                console.log('Error:', err);
            }
            res.statusCode = 401;
            res.json({
                err: 'Email or password wrong!'
            });
        };
        const email: String = req.body.email;

        User.findOne({ email })
            .then(data => {
                // @ts-ignore
                Helper.verifyPassword(req.body.password, data.password)
                    .then(success => {
                        if(success) {
                            res.json({
                                _id: data._id,
                                jwt: "Kommt noch."
                            });
                        } else {
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
    public createUser(req: Request, res: Response): void {
        let user = null;

        try {
            user = new User(req.body);
        } catch (e) {
            console.log(e);
        }

        user.save()
            .then((data) => {
                res.status(res.statusCode)
                    .send({
                        data
                    });
            }).catch((err) => {
                if (err.name === 'ValidationError') res.statusCode = 400;
                if (err.name === 'MongoError') res.statusCode = 500;

                res.status(res.statusCode)
                    .send({
                        err
                    })
            })
    }

    /**
     * update one user object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public updateUser(req: Request, res: Response): void {
        const _id: String = req.params._id;

        // TODO: verify body.password and hash body.new_password if it's present

        User.findOneAndUpdate({_id}, req.body)
            .then((data) => {
                res.json({
                    data
                });
            }).catch((err) => {
                if (err.name === 'CastError') res.statusCode = 404;
                if (err.name === 'MongoError') res.statusCode = 500;
                res.json({
                    err
                })
            })
    }

    /**
     * delete one user one MongoDB, with the _id in the query
     *
     * @param req: contains an http request, with an header
     * @param res: return an status code or an error
     */
    public deleteUser(req: Request, res: Response): void {
        const _id: String = req.params._id;

        User.findOneAndRemove({_id}) //field name: value
            .then((data) => {
                res.json({
                    data
                });
            }).catch((err) => {
                if (err.name === 'CastError') res.statusCode = 404;
                res.json({
                    err
                })
            })
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

export default userRoutes.router;