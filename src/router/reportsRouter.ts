import {Router, Request, Response, NextFunction} from 'express';
import Reports from '../models/reports';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class ReportsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const reportsRoutes = new ReportsRouter();
reportsRoutes.routes();

export default reportsRoutes.router;