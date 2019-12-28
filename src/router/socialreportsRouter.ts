import {Router, Request, Response, NextFunction} from 'express';
import Socialreports from '../models/socialreports';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class SocialreportsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const socialreportsRoutes = new SocialreportsRouter();
socialreportsRoutes.routes();

export default socialreportsRoutes.router;