import {Router, Request, Response, NextFunction} from 'express';
import Socialmediatasks from '../models/socialmediatasks';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class SocialmediatasksRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const socialmediatasksRoutes = new SocialmediatasksRouter();
socialmediatasksRoutes.routes();

export default socialmediatasksRoutes.router;