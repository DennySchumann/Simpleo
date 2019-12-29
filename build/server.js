"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const eventsRouter_1 = require("./router/eventsRouter");
/**
 * This class create a server, which is used in index
 */
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    /**
     * this function creates the middleware
     */
    config() {
        //set up mongoose
        dotenv.config();
        mongoose.set("useNewUrlParser", true);
        mongoose.set("useUnifiedTopology", true);
        mongoose.set("useCreateIndex", true);
        mongoose.set("useFindAndModify", false);
        console.log("MONGODB_URI type:", typeof process.env.MONGODB_URI);
        console.log("MONGODB_URI length:", process.env.MONGODB_URI.length);
        mongoose.connect(process.env.MONGODB_URI);
        //server config / middleware
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }
    /**
     * includes all URL routes, which can be used
     */
    routes() {
        let router = express.Router();
        this.app.use('/api/v1', router);
        router.use('/events', eventsRouter_1.default);
    }
}
//export
exports.default = new Server().app;
