"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the flimmecams
 */
let flimmecams_Schema = new mongoose_1.Schema({
    title: String,
    camId: String
});
exports.default = mongoose_1.model('flimmecams', flimmecams_Schema);
