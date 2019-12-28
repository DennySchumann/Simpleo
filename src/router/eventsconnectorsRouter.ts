import {Router, Request, Response, NextFunction} from 'express';
import Eventsconnectors from '../models/eventsconnectors';
import {Helper} from '../helper/helper';

class EventsconnectorsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * Search one event from MongoDB and send it to the Client
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getOneEventsconnector(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Eventsconnectors.findOne({"_id": _id})
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
     * Search  eventsconnectors from MongoDB
     * advanced search can be done with specific queries
     * for example /events?limit=10&sort=tag_sort&order=asc
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getEventsconnectors(req: Request, res: Response): void {
        let sortBy = Helper.getSort(req.query);
        let area = Helper.getLimit(req.query);

        Eventsconnectors.find(req.query)
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
     * create one eventsconnector object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public createEventsconnector(req: Request, res: Response): void {
        let eventsconnector = null;

        try {
            eventsconnector = new Eventsconnectors(req.body);
        } catch (e) {
            console.log(e);
        }

        eventsconnector.save()
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
     * update one eventsconnector object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public updateEventsconnector(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Eventsconnectors.findOneAndUpdate({_id}, req.body)
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
     * delete one eventsconnector one MongoDB, with the _id in the query
     *
     * @param req: contains an http request, with an header
     * @param res: return an status code or an error
     */
    public deleteEventsconnector(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Eventsconnectors.findOneAndRemove({_id}) //field name: value
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
        this.router.get('/:_id', this.getOneEventsconnector);
        this.router.get('/', this.getEventsconnectors);
        this.router.post('/', this.createEventsconnector);
        this.router.put('/:_id', this.updateEventsconnector);
        this.router.delete('/:_id', this.deleteEventsconnector);
    }
}

//export
const eventsconnectorsRoutes = new EventsconnectorsRouter();
eventsconnectorsRoutes.routes();

export default eventsconnectorsRoutes.router;