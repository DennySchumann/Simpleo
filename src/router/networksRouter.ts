import {Router, Request, Response, NextFunction} from 'express';
import Networks from '../models/networks';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class NetworksRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const networksRoutes = new NetworksRouter();
networksRoutes.routes();

export default networksRoutes.router;