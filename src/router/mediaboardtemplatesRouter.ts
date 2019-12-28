import {Router, Request, Response, NextFunction} from 'express';
import Mediaboardtemplates from '../models/mediaboardtemplates';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class MediaboardtemplatesRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const mediaboardtemplatesRoutes = new MediaboardtemplatesRouter();
mediaboardtemplatesRoutes.routes();

export default mediaboardtemplatesRoutes.router;