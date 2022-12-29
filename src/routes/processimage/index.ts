import express from 'express';
import imageMiddleware from '../../middleware';
const processImage = express.Router();

processImage.get(
  '/',
  imageMiddleware,
  async (req: express.Request, res: express.Response): Promise<void> => {
    res.send('Image retrieved successfully');
  }
);

export default processImage;
