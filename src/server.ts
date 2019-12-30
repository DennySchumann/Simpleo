import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

import UserRouter from './router/userRouter';

/**
 * This class create a server, which is used in index
 */
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    /**
     * this function creates the middleware
     */
    public config() {
        //set up mongoose
        dotenv.config();
        mongoose.set("useNewUrlParser", true);
        mongoose.set("useUnifiedTopology", true);
        mongoose.set("useCreateIndex", true);
        mongoose.set("useFindAndModify", false);
        mongoose.connect(process.env.MONGODB_URI);

        //server config / middleware
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    /**
     * includes all URL routes, which can be used
     */
    routes(): void {
        let router: express.Router = express.Router();

        this.app.use('/api/v1', router);
        router.use('/user', UserRouter);
    }
}

//export
export default new Server().app;