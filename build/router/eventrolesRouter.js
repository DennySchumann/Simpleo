"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventroles_1 = require("../models/eventroles");
const helper_1 = require("../helper/helper");
class EventrolesRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * Search one eventrole from MongoDB and send it to the Client
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    getOneEventroles(req, res) {
        const _id = req.params._id;
        eventroles_1.default.findOne({ "_id": _id })
            .then(data => {
            res.json({
                data
            });
        }).catch(err => {
            if (err.name === 'CastError')
                res.statusCode = 404;
            res.json({
                err
            });
        });
    }
    /**
     * Search  eventroles from MongoDB
     * advanced search can be done with specific queries
     * for example /events?limit=10&sort=tag_sort&order=asc
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    getEventroless(req, res) {
        let sortBy = helper_1.Helper.getSort(req.query);
        let area = helper_1.Helper.getLimit(req.query);
        eventroles_1.default.find(req.query)
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
            });
        });
    }
    /**
     * create one eventrole object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    createEventroles(req, res) {
        let eventrole = null;
        try {
            eventrole = new eventroles_1.default(req.body);
        }
        catch (e) {
            console.log(e);
        }
        eventrole.save()
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
     * update one eventrole object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    updateEventroles(req, res) {
        const _id = req.params._id;
        eventroles_1.default.findOneAndUpdate({ _id }, req.body)
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
     * delete one eventrole one MongoDB, with the _id in the query
     *
     * @param req: contains an http request, with an header
     * @param res: return an status code or an error
     */
    deleteEventroles(req, res) {
        const _id = req.params._id;
        eventroles_1.default.findOneAndRemove({ _id }) //field name: value
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
    /**
     * includes all URL routes, which can be used
     */
    routes() {
        this.router.get('/:_id', this.getOneEventroles);
        this.router.get('/', this.getEventroless);
        this.router.post('/', this.createEventroles);
        this.router.put('/:_id', this.updateEventroles);
        this.router.delete('/:_id', this.deleteEventroles);
    }
}
//export
const eventrolesRoutes = new EventrolesRouter();
eventrolesRoutes.routes();
exports.default = eventrolesRoutes.router;
