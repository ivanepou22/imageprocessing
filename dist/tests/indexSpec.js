"use strict";
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
const fs_1 = require("fs");
const middleware_1 = __importDefault(require("../middleware"));
describe('imageMiddleware', () => {
    it('should send the resized image if it exists in the "images/thumb" folder', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the request object
        const req = {
            query: {
                width: 200,
                height: 200,
                filename: 'fjord',
            },
        };
        // Mock the response object
        const res = {
            sendFile: jasmine.createSpy(),
            status: jasmine.createSpy(),
        };
        // Mock the next function
        const next = jasmine.createSpy();
        // Spy on the fsPromises.access function
        spyOn(fs_1.promises, 'access').and.returnValue(Promise.resolve());
        // Call the imageMiddleware function
        yield (0, middleware_1.default)(req, res, next);
        // Expect the sendFile function to be called
        expect(res.sendFile).toHaveBeenCalled();
        // Expect the status function not to be called
        expect(res.status).not.toHaveBeenCalled();
    }));
    it('should send a 404 error if the original image does not exist in the "images/full" folder', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the request object
        const req = {
            query: {
                width: 200,
                height: 200,
                filename: 'test_image',
            },
        };
        // Mock the response object
        const res = {
            sendFile: jasmine.createSpy(),
            status: jasmine.createSpy(),
        };
        // Mock the next function
        const next = jasmine.createSpy();
        // Spy on the fsPromises.access function and make it throw an error
        spyOn(fs_1.promises, 'access').and.returnValue(Promise.reject(new Error()));
        // Call the imageMiddleware function
        yield (0, middleware_1.default)(req, res, next);
        // Expect the sendFile function not to be called
        expect(res.sendFile).not.toHaveBeenCalled();
        // Expect the status function to be called with a 404 status code
        expect(res.status).toHaveBeenCalledWith(404);
    }));
});
describe('imageMiddleware', () => {
    it('should resize and send back the image if it does not exist in the "images/thumb" folder but the original image does exist in the "images/full" folder', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the request object
        const req = {
            query: {
                width: 100,
                height: 100,
                filename: 'icelandwaterfall',
            },
        };
        // Mock the response object
        const res = jasmine.createSpyObj('res', [
            'setHeader',
            'send',
            'sendFile',
            'status',
        ]);
        // Mock the next function
        const next = jasmine.createSpy();
        // Spy on the fsPromises.access function and make it throw an error for the "images/thumb" folder, but not for the "images/full" folder
        // spyOn(fsPromises, 'access').and.callFake((path: string | Buffer) => {
        //   if (path.toString().includes('thumb')) {
        //     return Promise.reject(new Error());
        //   } else {
        //     return Promise.resolve();
        //   }
        // });
        // Call the imageMiddleware function
        yield (0, middleware_1.default)(req, res, next);
        // Expect the setHeader function to be called with the correct arguments
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'image/jpeg');
        // Expect the send function to be called
        expect(res.send).toHaveBeenCalled();
        // Expect the sendFile function not to be called
        expect(res.sendFile).not.toHaveBeenCalled();
        // Expect the status function not to be called
        expect(res.status).not.toHaveBeenCalled();
    }));
});
