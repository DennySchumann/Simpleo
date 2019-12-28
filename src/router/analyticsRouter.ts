import {Router, Request, Response, NextFunction} from 'express';
import Analytics from '../models/analytics';
import {Helper} from '../helper/helper';

class AnalyticsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * Search one analytics from MongoDB and send it to the Client
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getOneAnalytic(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Analytics.findOne({"_id": _id})
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
     * Search  analytics from MongoDB
     * advanced search can be done with specific queries
     * for example /events?limit=10&sort=tag_sort&order=asc
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getAnalytics(req: Request, res: Response): void {
        let sortBy = Helper.getSort(req.query);
        let area = Helper.getLimit(req.query);

        Analytics.find(req.query)
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
     * create one analytics object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public createAnalytic(req: Request, res: Response): void {
        let analytic = null;

        try {
            analytic = new Analytics(req.body);
            analytic.timestamp = Date.now();
        } catch (e) {
            console.log(e);
        }

        analytic.save()
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
     * update one analytics object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public updateAnalytic(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Analytics.findOneAndUpdate({_id}, req.body)
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
     * delete one analytics one MongoDB, with the _id in the query
     *
     * @param req: contains an http request, with an header
     * @param res: return an status code or an error
     */
    public deleteAnalytic(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Analytics.findOneAndRemove({_id}) //field name: value
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
        this.router.get('/:_id', this.getOneAnalytic);
        this.router.get('/', this.getAnalytics);
        this.router.post('/', this.createAnalytic);
        this.router.put('/:_id', this.updateAnalytic);
        this.router.delete('/:_id', this.deleteAnalytic);
    }
}

//export
const analyticsRoutes = new AnalyticsRouter();
analyticsRoutes.routes();

export default analyticsRoutes.router;