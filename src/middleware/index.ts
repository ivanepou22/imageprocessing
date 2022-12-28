import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

const imageMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const width = req.query.width as unknown as number;
  const height = req.query.height as unknown as number;
  const filename = req.query.filename as string;

  //original Image path
  const orImageFilePath: string = `${__dirname}/../images/full/${filename}.jpg`;
  //Already resized image path
  const thumbImageFilePath: string = `${__dirname}/../images/thumb/${filename}_${width}x${height}.jpg`;

  // Check if the requested image exists in the "images/thumb" folder
  try {
    await fsPromises.access(thumbImageFilePath, fs.constants.F_OK);
    // The image exists, so send it back to the client as a response
    res.sendFile(path.resolve(thumbImageFilePath), (err) => {
      if (err) {
        throw new Error(
          'Server cannot serve you at the moment try again later'
        );
      }
    });
  } catch (err) {
    // The image does not exist, so check if the original image exists in the "images/full"
    try {
      await fsPromises.access(orImageFilePath, fs.constants.F_OK);
      // The original image exists, so resize it using the "sharp" library
      await resizeImage(filename, width, height, res);
    } catch (error) {
      // The original image does not exist, so return an error to the client
      res.status(404);
    }
  }
};

export const resizeImage = async (
  filename: string,
  imageWidth: number,
  imageHeight: number,
  res: Response
) => {
  const filePath: string = `${__dirname}/../images/full/${filename}.jpg`;
  const resizedFilePath: string = `${__dirname}/../images/thumb/${filename}_${imageWidth}x${imageHeight}.jpg`;

  //use sharp library to resize the image
  try {
    const outputBuffer = await sharp(filePath)
      .resize(imageWidth / 1, imageHeight / 1)
      .jpeg()
      .toBuffer();

    // Save the resized image to the "images/thumb" folder
    await fsPromises.writeFile(resizedFilePath, outputBuffer);

    // Set the content type and send the image back to the client as a response
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(outputBuffer);
  } catch (error) {
    throw new Error('Image was not resized');
  }
};

export default imageMiddleware;
