import express from 'express';
import imageMiddleware from '../../middleware';
const processImage = express.Router();

processImage.get('/', imageMiddleware, async (req, res) => {
  res.send('Image retrieved successfully');
});

export default processImage;
