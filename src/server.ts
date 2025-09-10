import express from 'express';
import { routers } from './modules';
import { env } from '@/config/environment';
import { sessionMiddleware } from './middlewares/session.middleware';
import { passportMiddleWare } from './middlewares/passport.middleware';
import { loggingMiddleware } from './middlewares/logging.middleware';
import pc from 'picocolors';

const port = env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(sessionMiddleware());
app.use(passportMiddleWare());

app.use(loggingMiddleware(), routers);

app.listen(port, () => {
  console.info(`${pc.bold(`Server is running on port: ${pc.blue(port)}`)}`);
});
