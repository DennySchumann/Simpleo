"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Post_1 = require("../models/Post");
class PostRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    GetPosts(req, res) {
        Post_1.default.find({})
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    GetPost(req, res) {
    }
    CreatePost(req, res) {
    }
    UpdatePost(req, res) {
    }
    DeletePost(req, res) {
    }
    routes() {
        this.router.get('/', this.GetPosts);
    }
}
//export
const postRoutes = new PostRouter();
postRoutes.routes();
exports.default = postRoutes.router;
