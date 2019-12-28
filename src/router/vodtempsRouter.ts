import {Router, Request, Response, NextFunction} from 'express';
import Vodtemps from '../models/vodtemps';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class VodtempsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const vodtempsRoutes = new VodtempsRouter();
vodtempsRoutes.routes();

export default vodtempsRoutes.router;