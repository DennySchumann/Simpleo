import {Router, Request, Response, NextFunction} from 'express';
import Media from '../models/media';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class MediaRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const mediaRoutes = new MediaRouter();
mediaRoutes.routes();

export default mediaRoutes.router;