import {Router, Request, Response, NextFunction} from 'express';
import Geofences from '../models/geofences';
import {Helper} from '../helper/helper';

class GeofencesRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * Search one geofence from MongoDB and send it to the Client
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getOneGeofence(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Geofences.findOne({"_id": _id})
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
     * Search  geofences from MongoDB
     * advanced search can be done with specific queries
     * for example /events?limit=10&sort=tag_sort&order=asc
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    public getGeofences(req: Request, res: Response): void {
        let sortBy = Helper.getSort(req.query);
        let area = Helper.getLimit(req.query);

        Geofences.find(req.query)
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
     * create one geofence object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public createGeofence(req: Request, res: Response): void {
        let geofence = null;

        try {
            geofence = new Geofences(req.body);
            geofence.validity_begin = geofence.validity_begin ? new Date(geofence.validity_begin) : new Date();
            geofence.validity_end = geofence.validity_end ? new Date(geofence.validity_end) : null;
        } catch (e) {
            console.log(e);
        }

        geofence.save()
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
     * update one geofence object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    public updateGeofence(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Geofences.findOneAndUpdate({_id}, req.body)
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
     * delete one geofence one MongoDB, with the _id in the query
     *
     * @param req: contains an http request, with an header
     * @param res: return an status code or an error
     */
    public deleteGeofence(req: Request, res: Response): void {
        const _id: String = req.params._id;

        Geofences.findOneAndRemove({_id}) //field name: value
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
        this.router.get('/:_id', this.getOneGeofence);
        this.router.get('/', this.getGeofences);
        this.router.post('/', this.createGeofence);
        this.router.put('/:_id', this.updateGeofence);
        this.router.delete('/:_id', this.deleteGeofence);
    }
}

//export
const geofencesRoutes = new GeofencesRouter();
geofencesRoutes.routes();

export default geofencesRoutes.router;