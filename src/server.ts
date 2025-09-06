import express from 'express';
import dotenv from 'dotenv';
import { routers } from './modules';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(routers);

app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
});
