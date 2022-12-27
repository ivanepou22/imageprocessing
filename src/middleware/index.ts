import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Define the middleware function
const imageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const width = req.query.width as unknown as number;
  const height = req.query.height as unknown as number;
  const filename = req.query.filename as string;

  const orImageFilePath: string = `${__dirname}/../images/full/${filename}.jpg`;
  const thumbImageFilePath: string = `${__dirname}/../images/thumb/${filename}_${width}x${height}.jpg`;
  // Check if the requested image exists in the "images" folder
  fs.access(thumbImageFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      // The image does not exist, so check if the original image exists in the "images" folder
      fs.access(orImageFilePath, fs.constants.F_OK, (error) => {
        if (error) {
          // The original image does not exist, so return an error to the client
          res.status(404).send('Image not found');
        } else {
          // The original image exists, so resize it using the "sharp" library
          resizeImage(filename, width, height, res);
        }
      });
    } else {
      // The image exists, so send it back to the client as a response
      res.sendFile(path.resolve(thumbImageFilePath), (err) => {
        if (err) {
          throw new Error(
            'Server cannot serve you at the moment try again later'
          );
        }
      });
    }
  });
};

const resizeImage = (
  filename: string,
  imageWidth: number,
  imageHeight: number,
  res: Response
) => {
  const filePath: string = `${__dirname}/../images/full/${filename}.jpg`;
  const resizedFilePath: string = `${__dirname}/../images/thumb/${filename}_${imageWidth}x${imageHeight}.jpg`;

  sharp(filePath)
    .resize(imageWidth / 1, imageHeight / 1)
    .jpeg()
    .toBuffer()
    .then((outputBuffer) => {
      // Save the resized image to the "images" folder
      fs.writeFile(resizedFilePath, outputBuffer, (writeError) => {
        if (writeError) {
          throw new Error('Image was not created');
        }
      });
      // Set the content type and send the image back to the client as a response
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(outputBuffer);
    })
    .catch((resizeErr) => {
      if (resizeErr) throw new Error('Image was not resized');
    });
};

export default imageMiddleware;
