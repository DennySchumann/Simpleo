"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/**
 * only the structures are completed
 *
 * TODO: create all router methodes
 */
class VodtempsRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
    }
}
//export
const vodtempsRoutes = new VodtempsRouter();
vodtempsRoutes.routes();
exports.default = vodtempsRoutes.router;
