import {Router, Request, Response, NextFunction} from 'express';
import Transcodertemplates from '../models/transcodertemplates';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class TranscodertemplatesRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const transcodertemplatesRoutes = new TranscodertemplatesRouter();
transcodertemplatesRoutes.routes();

export default transcodertemplatesRoutes.router;