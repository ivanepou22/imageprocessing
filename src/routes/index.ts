import express from 'express';
import processImage from './processImage';
const routes = express.Router();

routes.use('/images', processImage);

export default routes;
