import {Router, Request, Response, NextFunction} from 'express';
import Userroles from '../models/userroles';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class UserrolesRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const userrolesRoutes = new UserrolesRouter();
userrolesRoutes.routes();

export default userrolesRoutes.router;