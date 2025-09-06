import express from 'express';
import { routers } from './modules';
import { env } from '@/config/environment';
import { sessionMiddleware } from './middlewares/session.middleware';

const app = express();
const port = env.SERVER_PORT;

app.use(sessionMiddleware());

app.use(routers);

app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
});
