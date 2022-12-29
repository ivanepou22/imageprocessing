import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

const imageMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
        res
          .status(401)
          .send('Server cannot serve you at the moment try again later');
      }
    });
  } catch (err) {
    // The image does not exist, so check if the original image exists in the "images/full"
    try {
      await fsPromises.access(orImageFilePath, fs.constants.F_OK);
      // The original image exists, so resize it using the "sharp" library
      await resizeImage(filename, width, height);
      res.status(200).sendFile(thumbImageFilePath);
    } catch (error) {
      // The original image does not exist, so return an error to the client
      res
        .status(404)
        .send('Image was not found please try again with another image name.');
    }
  }
};

export const resizeImage = async (
  filename: string,
  imageWidth: number,
  imageHeight: number
): Promise<void> => {
  const filePath: string = `${__dirname}/../images/full/${filename}.jpg`;
  const resizedFilePath: string = `${__dirname}/../images/thumb/${filename}_${imageWidth}x${imageHeight}.jpg`;

  //use sharp library to resize the image
  try {
    await sharp(filePath)
      .resize(imageWidth / 1, imageHeight / 1)
      .jpeg()
      .toFile(resizedFilePath);
  } catch (error) {
    throw new Error('Image was not resized Successfully');
  }
};

export default imageMiddleware;
