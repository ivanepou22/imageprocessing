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
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importStar(require("../middleware"));
describe('Image Middleware', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {};
        res = {};
        next = jasmine.createSpy('next');
    });
    it('1.1: Should return a 404 status code and error message if the requested image is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        req.query = { width: '100', height: '100', filename: 'non-existent-image' };
        res.status = jasmine.createSpy('status').and.returnValue(res);
        res.send = jasmine.createSpy('send');
        yield (0, middleware_1.default)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Image was not found please try again with another image name.');
    }));
    it('1.2: Should send the requested image to the client if it is found in the "images/thumb" folder', () => __awaiter(void 0, void 0, void 0, function* () {
        req.query = { width: '200', height: '200', filename: 'fjord' };
        res.sendFile = jasmine
            .createSpy('sendFile')
            .and.returnValue(Promise.resolve());
        yield (0, middleware_1.default)(req, res, next);
        expect(res.sendFile).toHaveBeenCalled();
    }));
});
describe('Image Processing', () => {
    it('2.1 Expect resizeImage function to not throw an error', () => __awaiter(void 0, void 0, void 0, function* () {
        //Define the name for the image be resized
        const imageName = `palmtunnel`;
        //Attempt to resize the image based on the user sizes
        yield (0, middleware_1.resizeImage)(imageName, 100, 100);
    }));
    it('2.2 Expect resizeImage function to throw an error', () => __awaiter(void 0, void 0, void 0, function* () {
        //Define the path for the file to be resized
        const filename = 'image-not-found';
        let error;
        try {
            //Attempt to resize the image based on the user sizes
            yield (0, middleware_1.resizeImage)(filename, 100, 100);
        }
        catch (e) {
            error = e;
        }
        //Define the expected error
        const definedError = new Error('Image was not resized Successfully');
        expect(error).toEqual(definedError);
    }));
});
