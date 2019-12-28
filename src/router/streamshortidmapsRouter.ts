import {Router, Request, Response, NextFunction} from 'express';
import Streamshortidmaps from '../models/streamshortidmaps';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class StreamshortidmapsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const streamshortidmapsRoutes = new StreamshortidmapsRouter();
streamshortidmapsRoutes.routes();

export default streamshortidmapsRoutes.router;