import {Router, Request, Response, NextFunction} from 'express';
import Vodanalytics from '../models/vodanalytics';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class VodanalyticsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const vodanalyticsRoutes = new VodanalyticsRouter();
vodanalyticsRoutes.routes();

export default vodanalyticsRoutes.router;