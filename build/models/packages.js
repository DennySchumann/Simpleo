"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the packages
 * TODO: complete the schema
 */
let packages_Schema = new mongoose_1.Schema({});
exports.default = mongoose_1.model('packages', packages_Schema);
