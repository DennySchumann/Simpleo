"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const expressJwt = require("express-jwt");
//import router
const userLogin_1 = require("./userLogin");
// import AdmapsRouter from './router/admapsRouter';
const analyticsRouter_1 = require("./router/analyticsRouter");
const bookingsRouter_1 = require("./router/bookingsRouter");
const configsRouter_1 = require("./router/configsRouter");
const cronschedulesRouter_1 = require("./router/cronschedulesRouter");
const customerrolesRouter_1 = require("./router/customerrolesRouter");
const customersRouter_1 = require("./router/customersRouter");
const eventrolesRouter_1 = require("./router/eventrolesRouter");
const eventsRouter_1 = require("./router/eventsRouter");
const eventsconnectorsRouter_1 = require("./router/eventsconnectorsRouter");
const flimmecamsRouter_1 = require("./router/flimmecamsRouter");
const geofencesRouter_1 = require("./router/geofencesRouter");
const hashtagsRouter_1 = require("./router/hashtagsRouter");
//import LiveanalyticsRouter from './router/liveanalyticsRouter';
const mediaRouter_1 = require("./router/mediaRouter");
const mediaboardsRouter_1 = require("./router/mediaboardsRouter");
const mediaboardtemplatesRouter_1 = require("./router/mediaboardtemplatesRouter");
const networksRouter_1 = require("./router/networksRouter");
const packagesRouter_1 = require("./router/packagesRouter");
const playlistsRouter_1 = require("./router/playlistsRouter");
//import PostsRouter from './router/postsRouter';
const reportsRouter_1 = require("./router/reportsRouter");
const socialmediatasksRouter_1 = require("./router/socialmediatasksRouter");
//import SocialreportsRouter from './router/socialreportsRouter';
const streamshortidmapsRouter_1 = require("./router/streamshortidmapsRouter");
const transcodertasksRouter_1 = require("./router/transcodertasksRouter");
const transcodertemplatesRouter_1 = require("./router/transcodertemplatesRouter");
const userrolesRouter_1 = require("./router/userrolesRouter");
const usersRouter_1 = require("./router/usersRouter");
const vodanalyticsRouter_1 = require("./router/vodanalyticsRouter");
//import VodtempsRouter from './router/vodtempsRouter';
const vouchersRouter_1 = require("./router/vouchersRouter");
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
        const MONGO_URI = 'mongodb://localhost/flimme';
        mongoose.connect(process.env.MONGODB_URI || MONGO_URI);
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
        let useJWT = false;
        this.app.use('/api/v1', router);
        //work in progress
        //sets the Express JWT Middleware if useJWT = true
        //TODO: unless should work, but it doesn't
        if (useJWT) {
            router.use(expressJwt({ secret: "abcdefghijklmnopqrstuvwxyz0123456789" }).unless({ path: ["/userlogin"] }));
        }
        router.use('/userlogin', userLogin_1.default);
        // router.use('/admaps', AdmapsRouter);
        router.use('/analytics', analyticsRouter_1.default);
        router.use('/bookings', bookingsRouter_1.default);
        router.use('/configs', configsRouter_1.default);
        router.use('/cronschedules', cronschedulesRouter_1.default);
        router.use('/customerroles', customerrolesRouter_1.default);
        router.use('/customers', customersRouter_1.default);
        router.use('/eventroles', eventrolesRouter_1.default);
        router.use('/events', eventsRouter_1.default);
        router.use('/eventsconnectors', eventsconnectorsRouter_1.default);
        router.use('/flimmecams', flimmecamsRouter_1.default);
        router.use('/geofences', geofencesRouter_1.default);
        router.use('/hashtags', hashtagsRouter_1.default);
        //router.use('/liveanalytics', LiveanalyticsRouter);
        router.use('/media', mediaRouter_1.default);
        router.use('/mediaboards', mediaboardsRouter_1.default);
        router.use('/mediaboardtemplates', mediaboardtemplatesRouter_1.default);
        router.use('/networks', networksRouter_1.default);
        router.use('/packages', packagesRouter_1.default);
        router.use('/playlists', playlistsRouter_1.default);
        //router.use('/posts', PostsRouter);
        router.use('/reports', reportsRouter_1.default);
        router.use('/socialmediatasks', socialmediatasksRouter_1.default);
        //router.use('/socialreports', SocialreportsRouter);
        router.use('/streamshortidmaps', streamshortidmapsRouter_1.default);
        router.use('/transcodertasks', transcodertasksRouter_1.default);
        router.use('/transcodertemplates', transcodertemplatesRouter_1.default);
        router.use('/userroles', userrolesRouter_1.default);
        router.use('/users', usersRouter_1.default);
        router.use('/vodanalytics', vodanalyticsRouter_1.default);
        //router.use('/vodtemps', VodtempsRouter);
        router.use('/vouchers', vouchersRouter_1.default);
    }
}
//export
exports.default = new Server().app;
