"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_1 = require("../models/events");
const helper_1 = require("../helper/helper");
class EventRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getOneEvent(req, res) {
        const _id = req.params._id;
        events_1.default.findOne({ "_id": _id })
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
    getEvents(req, res) {
        let sortBy = helper_1.Helper.getSort(req.query);
        let area = helper_1.Helper.getLimit(req.query);
        events_1.default.find(req.query)
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
    createEvent(req, res) {
        let event = null;
        try {
            event = new events_1.default(req.body);
            event.tag_sort = event.tag_sort ? event.tag_sort.toLowerCase() : event.tag.toLowerCase();
            event.published = event.published ? Date.now() : null;
            event.reset = Date.now();
        }
        catch (e) {
            console.log(e);
        }
        event.save()
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
    updateEvent(req, res) {
        const _id = req.params._id;
        events_1.default.findOneAndUpdate({ _id }, req.body)
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
    deleteEvent(req, res) {
        const _id = req.params._id;
        events_1.default.findOneAndRemove({ _id }) //field name: value
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
    routes() {
        this.router.get('/:_id', this.getOneEvent);
        this.router.get('/', this.getEvents);
        this.router.post('/', this.createEvent);
        this.router.put('/:_id', this.updateEvent);
        this.router.delete('/:_id', this.deleteEvent);
    }
}
//export
const eventRoutes = new EventRouter();
eventRoutes.routes();
exports.default = eventRoutes.router;
