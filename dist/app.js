"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./app/modules/user/user.routes");
const app = (0, express_1.default)();
// application level middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// api initial route
app.get('/', (req, res) => {
    console.log('Hello World!');
    res.json('Hello World!');
});
// api routes
app.use('/api/users', user_routes_1.UserRoutes);
exports.default = app;
