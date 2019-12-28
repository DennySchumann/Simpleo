import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as expressJwt from 'express-jwt';

//import router
import UserLogin from './userLogin';
// import AdmapsRouter from './router/admapsRouter';
import AnalyticsRouter from './router/analyticsRouter';
import BookingsRouter from './router/bookingsRouter';
import ConfigsRouter from './router/configsRouter';
import CronschedulesRouter from './router/cronschedulesRouter';
import CustomerrolesRouter from './router/customerrolesRouter';
import CustomersRouter from './router/customersRouter';
import EventrolesRouter from './router/eventrolesRouter';
import EventRouter from './router/eventsRouter';
import EventsconnectorsRouter from './router/eventsconnectorsRouter';
import FlimmecamsRouter from './router/flimmecamsRouter';
import GeofencesRouter from './router/geofencesRouter';
import HashtagsRouter from './router/hashtagsRouter';
//import LiveanalyticsRouter from './router/liveanalyticsRouter';
import MediaRouter from './router/mediaRouter';
import MediaboardsRouter from './router/mediaboardsRouter';
import MediaboardtemplatesRouter from './router/mediaboardtemplatesRouter';
import NetworksRouter from './router/networksRouter';
import PackagesRouter from './router/packagesRouter';
import PlaylistsRouter from './router/playlistsRouter';
//import PostsRouter from './router/postsRouter';
import ReportsRouter from './router/reportsRouter';
import SocialmediatasksRouter from './router/socialmediatasksRouter';
//import SocialreportsRouter from './router/socialreportsRouter';
import StreamshortidmapsRouter from './router/streamshortidmapsRouter';
import TranscodertasksRouter from './router/transcodertasksRouter';
import TranscodertemplatesRouter from './router/transcodertemplatesRouter';
import UserrolesRouter from './router/userrolesRouter';
import UsersRouter from './router/usersRouter';
import VodanalyticsRouter from './router/vodanalyticsRouter';
//import VodtempsRouter from './router/vodtempsRouter';
import VouchersRouter from './router/vouchersRouter';

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
        const MONGO_URI = 'mongodb://localhost/flimme';
        mongoose.connect(process.env.MONGODB_URI || MONGO_URI);

        //server config / middleware
        this.app.use(bodyParser.urlencoded({extended: false}));
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
        let useJWT = false;

        this.app.use('/api/v1', router);

        //work in progress
        //sets the Express JWT Middleware if useJWT = true
        //TODO: unless should work, but it doesn't
        if(useJWT){
            router.use(expressJwt({secret: "abcdefghijklmnopqrstuvwxyz0123456789"}).unless({path: ["/userlogin"]}));
        }

        router.use('/userlogin', UserLogin);
        // router.use('/admaps', AdmapsRouter);
        router.use('/analytics', AnalyticsRouter);
        router.use('/bookings', BookingsRouter);
        router.use('/configs', ConfigsRouter);
        router.use('/cronschedules', CronschedulesRouter);
        router.use('/customerroles', CustomerrolesRouter);
        router.use('/customers', CustomersRouter);
        router.use('/eventroles', EventrolesRouter);
        router.use('/events', EventRouter);
        router.use('/eventsconnectors', EventsconnectorsRouter);
        router.use('/flimmecams', FlimmecamsRouter);
        router.use('/geofences', GeofencesRouter);
        router.use('/hashtags', HashtagsRouter);
        //router.use('/liveanalytics', LiveanalyticsRouter);
        router.use('/media', MediaRouter);
        router.use('/mediaboards', MediaboardsRouter);
        router.use('/mediaboardtemplates', MediaboardtemplatesRouter);
        router.use('/networks', NetworksRouter);
        router.use('/packages', PackagesRouter);
        router.use('/playlists', PlaylistsRouter);
        //router.use('/posts', PostsRouter);
        router.use('/reports', ReportsRouter);
        router.use('/socialmediatasks', SocialmediatasksRouter);
        //router.use('/socialreports', SocialreportsRouter);
        router.use('/streamshortidmaps', StreamshortidmapsRouter);
        router.use('/transcodertasks', TranscodertasksRouter);
        router.use('/transcodertemplates', TranscodertemplatesRouter);
        router.use('/userroles', UserrolesRouter);
        router.use('/users', UsersRouter);
        router.use('/vodanalytics', VodanalyticsRouter);
        //router.use('/vodtemps', VodtempsRouter);
        router.use('/vouchers', VouchersRouter);
    }
}

//export
export default new Server().app;