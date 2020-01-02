"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argon2 = require("argon2");
var Helper;
(function (Helper) {
    /**
     * this function create an object with the params sort and order
     * get the params from the query object
     * finally, the variables are deleted from the query
     *
     * @param query: contains the variable sort and order
     *
     * @return an object with the params sort and order
     */
    function getSort(query) {
        let sortBy = {};
        if (query.sort && query.order) {
            const sort = query.sort;
            const order = query.order;
            sortBy[sort] = order;
        }
        delete query.sort;
        delete query.order;
        return sortBy;
    }
    Helper.getSort = getSort;
    /**
     * this function create an object with the params offset and limit
     * get the params from the query object
     * finally, the variables are deleted from the query
     *
     * @param query: contains the variable sort and order
     *
     * @return an object with the params sort and order
     */
    function getLimit(query) {
        let area = {
            offset: 0,
            limit: 999
        };
        if (query.offset && query.limit) {
            area.offset = parseInt(query.offset);
            area.limit = parseInt(query.limit);
        }
        else if (query.limit) {
            area.limit = parseInt(query.limit);
        }
        delete query.offset;
        delete query.limit;
        return area;
    }
    Helper.getLimit = getLimit;
    function sanitizeUserData(data) {
        const userData = { email_verified: false };
        return Object.assign(Object.assign({}, data), userData);
    }
    Helper.sanitizeUserData = sanitizeUserData;
    function hashPassword(passwordPlaintext) {
        return argon2.hash(passwordPlaintext);
    }
    Helper.hashPassword = hashPassword;
    function verifyPassword(passwordHash, passwordPlaintext) {
        return argon2.verify(passwordHash, passwordPlaintext);
    }
    Helper.verifyPassword = verifyPassword;
})(Helper = exports.Helper || (exports.Helper = {}));
