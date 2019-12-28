import {Router, Request, Response, NextFunction} from 'express';
import Customerroles from '../models/customerroles';
import {Helper} from '../helper/helper';

class CustomerrolesRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * Search one customerrole from MongoDB and send it to the Client
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getOneCustomerroles(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Customerroles.findOne({"_id": _id})
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
     * Search  customerroles from MongoDB
     * advanced search can be done with specific queries
     * for example /events?limit=10&sort=tag_sort&order=asc
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getCustomerroless(req: Request, res: Response): void {
        let sortBy = Helper.getSort(req.query);
        let area = Helper.getLimit(req.query);

        Customerroles.find(req.query)
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
     * create one customerrole object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public createCustomerroles(req: Request, res: Response): void {
        let customerrole = null;

        try {
            customerrole = new Customerroles(req.body);
        } catch (e) {
            console.log(e);
        }

        customerrole.save()
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
     * update one customerrole object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public updateCustomerroles(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Customerroles.findOneAndUpdate({_id}, req.body)
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
     * delete one customerrole one MongoDB, with the _id in the query
     *
     * @param req: contains an http request, with an header
     * @param res: return an status code or an error
     */
    public deleteCustomerroles(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Customerroles.findOneAndRemove({_id}) //field name: value
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

    /**
     * includes all URL routes, which can be used
     */
    routes() {
        this.router.get('/:_id', this.getOneCustomerroles);
        this.router.get('/', this.getCustomerroless);
        this.router.post('/', this.createCustomerroles);
        this.router.put('/:_id', this.updateCustomerroles);
        this.router.delete('/:_id', this.deleteCustomerroles);
    }
}

//export
const customerrolesRoutes = new CustomerrolesRouter();
customerrolesRoutes.routes();

export default customerrolesRoutes.router;