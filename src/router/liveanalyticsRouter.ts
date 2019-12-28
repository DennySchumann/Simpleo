import {Router, Request, Response, NextFunction} from 'express';
import Liveanalytics from '../models/liveanalytics';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class LiveanalyticsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const liveanalyticsRoutes = new LiveanalyticsRouter();
liveanalyticsRoutes.routes();

export default liveanalyticsRoutes.router;