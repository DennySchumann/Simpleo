import {Router, Request, Response, NextFunction} from 'express';
import Packages from '../models/packages';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class PackagesRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const packagesRoutes = new PackagesRouter();
packagesRoutes.routes();

export default packagesRoutes.router;