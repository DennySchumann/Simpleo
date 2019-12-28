import {Router, Request, Response, NextFunction} from 'express';
import Users from '../models/users';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class UsersRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const usersRoutes = new UsersRouter();
usersRoutes.routes();

export default usersRoutes.router;