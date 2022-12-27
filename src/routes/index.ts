import express from 'express';
import processImage from './processImage';
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('main api route');
});

routes.use('/images', processImage);

export default routes;
