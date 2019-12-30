import {Router, Request, Response, NextFunction} from 'express';
import User from '../models/user';
import {Helper} from '../helper/helper';

class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * Search one user from MongoDB and send it to the Client
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getOneUser(req: Request, res: Response): void {
        const _id: String = req.params._id;

        User.findOne({"_id": _id})
            .then(data => {

                res.json({
                    data
                });
            }).catch(err => {
            if (err.name === 'CastError') res.statusCode = 404;
            res.json({
                err
            })
        })
    }

    /**
     * Search user from MongoDB
     * advanced search can be done with specific queries
     * for example /user?limit=10&sort=tag_sort&order=asc
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getUser(req: Request, res: Response): void {
        let sortBy = Helper.getSort(req.query);
        let area = Helper.getLimit(req.query);

        User.find(req.query)
            .skip(area.offset)
            .limit(area.limit)
            .sort(sortBy)
            .then(data => {
                if (data.length == 0) {
                    res.statusCode = 404;
                    throw new Error()
                        .message = 'Data not found or field do not exist!';
                }

                res.json({
                    data
                });
            }).catch(err => {
            res.json({
                err
            })
        })
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
        this.router.get('/:_id', this.getOneUser);
        this.router.get('/', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:_id', this.updateUser);
        this.router.delete('/:_id', this.deleteUser);
    }
}

//export
const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;