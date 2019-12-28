"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the liveanalytics
 * TODO: complete the schema
 */
let liveanalytics_Schema = new mongoose_1.Schema({});
exports.default = mongoose_1.model('liveanalytics', liveanalytics_Schema);
