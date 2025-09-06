import { Router } from 'express';
import maintenanceRouter from './maintenance/routes';

export const routers: Router[] = [maintenanceRouter];
