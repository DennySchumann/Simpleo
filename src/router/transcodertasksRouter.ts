import {Router, Request, Response, NextFunction} from 'express';
import Transcodertasks from '../models/transcodertasks';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class TranscodertasksRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const transcodertasksRoutes = new TranscodertasksRouter();
transcodertasksRoutes.routes();

export default transcodertasksRoutes.router;