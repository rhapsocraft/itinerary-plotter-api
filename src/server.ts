import express from 'express';
import { routers } from './modules';
import { env } from '@/config/environment';
import { sessionMiddleware } from './middlewares/session.middleware';
import { passportMiddleWare } from './middlewares/passport.middleware';
import { loggingMiddleware } from './middlewares/logging.middleware';
import pc from 'picocolors';
import { corsMiddleware } from './middlewares/cors.middleware';
import cookieParser from 'cookie-parser';

const port = env.SERVER_PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(corsMiddleware());
app.use(sessionMiddleware());
app.use(passportMiddleWare());

app.use(loggingMiddleware(), routers);

app.listen(port, () => {
  console.info(`${pc.bold(`Server is running on port: ${pc.blue(port)}`)}`);
});
