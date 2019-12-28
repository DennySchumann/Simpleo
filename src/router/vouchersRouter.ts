import {Router, Request, Response, NextFunction} from 'express';
import Vouchers from '../models/vouchers';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class VouchersRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const vouchersRoutes = new VouchersRouter();
vouchersRoutes.routes();

export default vouchersRoutes.router;