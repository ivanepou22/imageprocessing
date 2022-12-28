"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const processImage_1 = __importDefault(require("./processImage"));
const routes = express_1.default.Router();
routes.use('/images', processImage_1.default);
exports.default = routes;
