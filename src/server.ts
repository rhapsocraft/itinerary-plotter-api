import express from 'express';
import { routers } from './modules';
import { env } from '@/config/environment';
import { sessionMiddleware } from './middlewares/session.middleware';
import { passportMiddleWare } from './middlewares/passport.middleware';

const port = env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(sessionMiddleware());
app.use(passportMiddleWare());

app.use(routers);

app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
});
