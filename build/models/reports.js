"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the reports
 * TODO: complete the schema
 */
let reports_Schema = new mongoose_1.Schema({});
exports.default = mongoose_1.model('reports', reports_Schema);
