"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class CustomerrolesRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
    }
}
//export
const customerrolesRoutes = new CustomerrolesRouter();
customerrolesRoutes.routes();
exports.default = customerrolesRoutes.router;
