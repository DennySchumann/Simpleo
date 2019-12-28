import {Router, Request, Response, NextFunction} from 'express';
import Playlists from '../models/playlists';
import {Helper} from '../helper/helper';

/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class PlaylistsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
    }
}

//export
const playlistsRoutes = new PlaylistsRouter();
playlistsRoutes.routes();

export default playlistsRoutes.router;