import {Router, Request, Response, NextFunction} from 'express';
import Mediaboards from '../models/mediaboards';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class MediaboardsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const mediaboardsRoutes = new MediaboardsRouter();
mediaboardsRoutes.routes();

export default mediaboardsRoutes.router;