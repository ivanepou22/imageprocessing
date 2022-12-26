import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;
//routing

app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

export default app;
