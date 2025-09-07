import { Router } from 'express';

import maintenanceRouter from './maintenance/routes';
import authRouter from './auth/routes';
import tripRouter from './trip/routes';

export const routers: Router[] = [maintenanceRouter, authRouter, tripRouter];
