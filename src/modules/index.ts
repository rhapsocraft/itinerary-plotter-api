import { Router } from 'express';

import maintenanceRouter from './maintenance/routes';
import authRouter from './auth/routes';

export const routers: Router[] = [maintenanceRouter, authRouter];
