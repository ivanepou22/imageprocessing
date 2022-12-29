import imageMiddleware, { resizeImage } from '../middleware';
import { Request, Response, NextFunction } from 'express';

describe('Image Middleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = jasmine.createSpy('next');
  });

  it('1.1: Should return a 404 status code and error message if the requested image is not found', async () => {
    req.query = { width: '100', height: '100', filename: 'non-existent-image' };
    res.status = jasmine.createSpy('status').and.returnValue(res);
    res.send = jasmine.createSpy('send');

    await imageMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(
      'Image was not found please try again with another image name.'
    );
  });

  it('1.2: Should send the requested image to the client if it is found in the "images/thumb" folder', async () => {
    req.query = { width: '200', height: '200', filename: 'fjord' };
    res.sendFile = jasmine
      .createSpy('sendFile')
      .and.returnValue(Promise.resolve());

    await imageMiddleware(req, res, next);

    expect(res.sendFile).toHaveBeenCalled();
  });
});

describe('Image Processing', () => {
  it('2.1 Expect resizeImage function to not throw an error', async (): Promise<void> => {
    //Define the name for the image be resized
    const imageName = `palmtunnel`;
    //Attempt to resize the image based on the user sizes
    await resizeImage(imageName, 100, 100);
  });

  it('2.2 Expect resizeImage function to throw an error', async (): Promise<void> => {
    //Define the path for the file to be resized
    const filename: string = 'image-not-found';

    let error;

    try {
      //Attempt to resize the image based on the user sizes
      await resizeImage(filename, 100, 100);
    } catch (e) {
      error = e;
    }
    //Define the expected error
    const definedError = new Error('Image was not resized Successfully');
    expect(error).toEqual(definedError);
  });
});
