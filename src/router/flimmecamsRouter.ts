import {Router, Request, Response, NextFunction} from 'express';
import Flimmecams from '../models/flimmecams';
import {Helper} from '../helper/helper';

class FlimmecamsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * Search one flimmecam from MongoDB and send it to the Client
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getOneFlimmecam(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Flimmecams.findOne({"_id": _id})
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
     * Search  flimmecams from MongoDB
     * advanced search can be done with specific queries
     * for example /events?limit=10&sort=tag_sort&order=asc
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getFlimmecams(req: Request, res: Response): void {
        let sortBy = Helper.getSort(req.query);
        let area = Helper.getLimit(req.query);

        Flimmecams.find(req.query)
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
     * create one flimmecam object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public createFlimmecam(req: Request, res: Response): void {
        let flimmecam = null;

        try {
            flimmecam = new Flimmecams(req.body);
        } catch (e) {
            console.log(e);
        }

        flimmecam.save()
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
     * update one flimmecam object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public updateFlimmecam(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Flimmecams.findOneAndUpdate({_id}, req.body)
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
     * delete one flimmecam one MongoDB, with the _id in the query
     *
     * @param req: contains an http request, with an header
     * @param res: return an status code or an error
     */
    public deleteFlimmecam(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Flimmecams.findOneAndRemove({_id}) //field name: value
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
        this.router.get('/:_id', this.getOneFlimmecam);
        this.router.get('/', this.getFlimmecams);
        this.router.post('/', this.createFlimmecam);
        this.router.put('/:_id', this.updateFlimmecam);
        this.router.delete('/:_id', this.deleteFlimmecam);
    }
}

//export
const flimmecamsRoutes = new FlimmecamsRouter();
flimmecamsRoutes.routes();

export default flimmecamsRoutes.router;