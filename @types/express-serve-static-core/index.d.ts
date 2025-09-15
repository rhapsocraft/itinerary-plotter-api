import { GoogleAccount } from '@/db/types';
import session, { SessionData } from 'express-session';

declare global {
  namespace Express {
    export interface Request {
      user: GoogleAccount;
    }
  }
}
