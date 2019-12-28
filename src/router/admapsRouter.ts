import {Router, Request, Response, NextFunction} from 'express';
import Admaps from '../models/admaps';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class AdmapsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const admapsRoutes = new AdmapsRouter();
admapsRoutes.routes();

export default admapsRoutes.router;