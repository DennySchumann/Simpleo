"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the vouchers
 * TODO: complete the schema
 */
let vouchers_Schema = new mongoose_1.Schema({});
exports.default = mongoose_1.model('vouchers', vouchers_Schema);
