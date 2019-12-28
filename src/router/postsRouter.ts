import {Router, Request, Response, NextFunction} from 'express';
import Posts from '../models/posts';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class PostsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const postsRoutes = new PostsRouter();
postsRoutes.routes();

export default postsRoutes.router;