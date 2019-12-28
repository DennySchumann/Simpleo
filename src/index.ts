import * as debug from 'debug';
import * as http from 'http';
import Server from './server';

debug('ts-express:server');


const port = normalizePort(process.env.PORT || 3000);
Server.set('port', port);

console.log(`Server listening on port ${port}`);

/**
 * this block create the server with the address and express server
 */
const server = http.createServer(Server);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * normalized the port
 *
 * @param val: is the port
 */
function normalizePort(val: number | string): number | string | boolean {
    const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    } else if (port >= 0) {
        return port;
    } else {
        return false;
    }
}

/**
 * throws exceptions and log them
 *
 * @param error: is an node error no exception
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * log the server address
 */
function onListening(): void {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}