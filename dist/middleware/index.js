"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const imageMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const width = req.query.width;
    const height = req.query.height;
    const filename = req.query.filename;
    //original Image path
    const orImageFilePath = `${__dirname}/../images/full/${filename}.jpg`;
    //Already resized image path
    const thumbImageFilePath = `${__dirname}/../images/thumb/${filename}_${width}x${height}.jpg`;
    // Check if the requested image exists in the "images/thumb" folder
    try {
        yield fs_1.promises.access(thumbImageFilePath, fs_1.default.constants.F_OK);
        // The image exists, so send it back to the client as a response
        res.sendFile(path_1.default.resolve(thumbImageFilePath), (err) => {
            if (err) {
                res
                    .status(401)
                    .send('Server cannot serve you at the moment try again later');
            }
        });
    }
    catch (err) {
        // The image does not exist, so check if the original image exists in the "images/full"
        try {
            yield fs_1.promises.access(orImageFilePath, fs_1.default.constants.F_OK);
            // The original image exists, so resize it using the "sharp" library
            yield (0, exports.resizeImage)(filename, width, height);
            res.status(200).sendFile(thumbImageFilePath);
        }
        catch (error) {
            // The original image does not exist, so return an error to the client
            res
                .status(404)
                .send('Image was not found please try again with another image name.');
        }
    }
});
const resizeImage = (filename, imageWidth, imageHeight) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = `${__dirname}/../images/full/${filename}.jpg`;
    const resizedFilePath = `${__dirname}/../images/thumb/${filename}_${imageWidth}x${imageHeight}.jpg`;
    //use sharp library to resize the image
    try {
        yield (0, sharp_1.default)(filePath)
            .resize(imageWidth / 1, imageHeight / 1)
            .jpeg()
            .toFile(resizedFilePath);
    }
    catch (error) {
        throw new Error('Image was not resized Successfully');
    }
});
exports.resizeImage = resizeImage;
exports.default = imageMiddleware;
