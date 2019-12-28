import {Router, Request, Response, NextFunction} from 'express';
import Cronschedules from '../models/cronschedules';
import {Helper} from '../helper/helper';

class CronschedulesRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * Search one cronschedule from MongoDB and send it to the Client
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getOneCronschedules(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Cronschedules.findOne({"_id": _id})
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
     * Search  cronschedules from MongoDB
     * advanced search can be done with specific queries
     * for example /events?limit=10&sort=tag_sort&order=asc
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getCronscheduless(req: Request, res: Response): void {
        let sortBy = Helper.getSort(req.query);
        let area = Helper.getLimit(req.query);

        Cronschedules.find(req.query)
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
     * create one cronschedule object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public createCronschedules(req: Request, res: Response): void {
        let cronschedules = null;

        try {
            cronschedules = new Cronschedules(req.body);
            cronschedules.dateCreated = new Date();
        } catch (e) {
            console.log(e);
        }

        cronschedules.save()
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
     * update one cronschedule object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public updateCronschedules(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Cronschedules.findOneAndUpdate({_id}, req.body)
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
     * delete one cronschedule one MongoDB, with the _id in the query
     *
     * @param req: contains an http request, with an header
     * @param res: return an status code or an error
     */
    public deleteCronschedules(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Cronschedules.findOneAndRemove({_id}) //field name: value
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
        this.router.get('/:_id', this.getOneCronschedules);
        this.router.get('/', this.getCronscheduless);
        this.router.post('/', this.createCronschedules);
        this.router.put('/:_id', this.updateCronschedules);
        this.router.delete('/:_id', this.deleteCronschedules);
    }
}

//export
const cronschedulesRoutes = new CronschedulesRouter();
cronschedulesRoutes.routes();

export default cronschedulesRoutes.router;