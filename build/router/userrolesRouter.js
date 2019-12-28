"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class UserrolesRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
    }
}
//export
const userrolesRoutes = new UserrolesRouter();
userrolesRoutes.routes();
exports.default = userrolesRoutes.router;
