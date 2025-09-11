import { Router } from 'express';

import maintenanceRouter from './maintenance/routes';
import authRouter from './auth/routes';
import tripRouter from './trip/routes';
import documentRouter from './document/routes';

export const routers: Router[] = [maintenanceRouter, authRouter, tripRouter, documentRouter];
