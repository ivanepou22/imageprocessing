import { promises as fsPromises } from 'fs';
import imageMiddleware from '../middleware';

describe('imageMiddleware', () => {
  it('should send the resized image if it exists in the "images/thumb" folder', async () => {
    // Mock the request object
    const req: any = {
      query: {
        width: 200,
        height: 200,
        filename: 'fjord',
      },
    };
    // Mock the response object
    const res: any = {
      sendFile: jasmine.createSpy(),
      status: jasmine.createSpy(),
    };

    // Mock the next function
    const next: any = jasmine.createSpy();

    // Spy on the fsPromises.access function
    spyOn(fsPromises, 'access').and.returnValue(Promise.resolve());

    // Call the imageMiddleware function
    await imageMiddleware(req, res, next);

    // Expect the sendFile function to be called
    expect(res.sendFile).toHaveBeenCalled();

    // Expect the status function not to be called
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should send a 404 error if the original image does not exist in the "images/full" folder', async () => {
    // Mock the request object
    const req: any = {
      query: {
        width: 200,
        height: 200,
        filename: 'test_image',
      },
    };
    // Mock the response object
    const res: any = {
      sendFile: jasmine.createSpy(),
      status: jasmine.createSpy(),
    };

    // Mock the next function
    const next: any = jasmine.createSpy();

    // Spy on the fsPromises.access function and make it throw an error
    spyOn(fsPromises, 'access').and.returnValue(Promise.reject(new Error()));

    // Call the imageMiddleware function
    await imageMiddleware(req, res, next);

    // Expect the sendFile function not to be called
    expect(res.sendFile).not.toHaveBeenCalled();

    // Expect the status function to be called with a 404 status code
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
