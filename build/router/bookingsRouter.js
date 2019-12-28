"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookings_1 = require("../models/bookings");
const helper_1 = require("../helper/helper");
class BookingsRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * Search one booking from MongoDB and send it to the Client
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    getOneBooking(req, res) {
        const _id = req.params._id;
        bookings_1.default.findOne({ "_id": _id })
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
     * Search  bookings from MongoDB
     * advanced search can be done with specific queries
     * for example /events?limit=10&sort=tag_sort&order=asc
     *
     * @param req: contains an http request, with an header
     * @param res: return an object or error message for the client
     */
    getBookings(req, res) {
        let sortBy = helper_1.Helper.getSort(req.query);
        let area = helper_1.Helper.getLimit(req.query);
        bookings_1.default.find(req.query)
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
     * create one booking object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    createBooking(req, res) {
        let booking = null;
        try {
            booking = new bookings_1.default(req.body);
            booking.start = booking.start ? new Date(booking.start) : null;
            booking.end = booking.end ? new Date(booking.end) : null;
        }
        catch (e) {
            console.log(e);
        }
        booking.save()
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
     * update one booking object on the MongoDB, with the params at the body
     * the body params are compared with the model
     *
     * @param req: contains an http request, with an header and body
     * @param res: return an status code or an error
     */
    updateBooking(req, res) {
        const _id = req.params._id;
        bookings_1.default.findOneAndUpdate({ _id }, req.body)
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
     * delete one booking one MongoDB, with the _id in the query
     *
     * @param req: contains an http request, with an header
     * @param res: return an status code or an error
     */
    deleteBooking(req, res) {
        const _id = req.params._id;
        bookings_1.default.findOneAndRemove({ _id }) //field name: value
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
        this.router.get('/:_id', this.getOneBooking);
        this.router.get('/', this.getBookings);
        this.router.post('/', this.createBooking);
        this.router.put('/:_id', this.updateBooking);
        this.router.delete('/:_id', this.deleteBooking);
    }
}
//export
const bookingsRoutes = new BookingsRouter();
bookingsRoutes.routes();
exports.default = bookingsRoutes.router;
