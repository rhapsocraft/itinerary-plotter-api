import { GoogleAccount } from '@/db/types';

declare global {
  namespace Express {
    export interface Request {
      user: GoogleAccount;
    }
  }
}
